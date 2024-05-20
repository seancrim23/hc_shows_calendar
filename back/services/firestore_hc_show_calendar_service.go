package services

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"strings"

	"hc_shows_backend/models"
	"hc_shows_backend/utils"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
	"github.com/fatih/structs"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/api/iterator"
)

// add variable to hold the db connection
// tbd any other variables that may be needed for the service
type FirestoreHCShowCalendarService struct {
	database *firestore.Client
	ctx      context.Context
}

func NewFirestoreHCShowCalendarService() (*FirestoreHCShowCalendarService, func(), error) {
	ctx := context.Background()

	if value := os.Getenv(utils.FIRESTORE_EMULATOR_HOST); value != "" {
		fmt.Println("using firestore emulator: " + value)
	}

	conf := &firebase.Config{ProjectID: os.Getenv(utils.GCP_PROJECT_ID)}
	app, err := firebase.NewApp(ctx, conf)
	if err != nil {
		fmt.Println("error making new firebase app: ", err)
		return nil, nil, err
	}
	database, err := app.Firestore(ctx)
	if err != nil {
		fmt.Println("error making firestore connection: ", err)
		return nil, nil, err
	}

	closeFunc := func() {
		database.Close()
	}

	return &FirestoreHCShowCalendarService{database: database, ctx: ctx}, closeFunc, nil
}

// TODO pagination at some point?
func (f *FirestoreHCShowCalendarService) GetShows(showQueryFilters map[string]string) (*[]models.Show, error) {
	var shows []models.Show
	var s models.Show
	var q firestore.Query
	//TODO make sure this works?
	//Maybe will have to expand query filters to an object at some point...
	collection := f.database.Collection(utils.SHOW_COLLECTION)
	index := 0
	for k, v := range showQueryFilters {
		if index == 0 {
			q = collection.Where(k, "==", v)
		} else {
			q = q.Where(k, "==", v)
		}
		index++
	}
	iter := q.Documents(f.ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println("error iterating over results")
			return nil, err
		}
		err = doc.DataTo(&s)
		if err != nil {
			fmt.Println("error getting all shows")
			fmt.Println(err)
			return nil, errors.New("error getting all shows")
		}
		shows = append(shows, s)
	}
	return &shows, nil
}

func (f *FirestoreHCShowCalendarService) GetShow(id string) (*models.Show, error) {
	fmt.Println("getting show with id " + id)
	dsnap, err := f.database.Collection(utils.SHOW_COLLECTION).Doc(id).Get(f.ctx)
	if err != nil {
		fmt.Println("error getting show")
		fmt.Println(err)
		return nil, errors.New("error getting show")
	}
	var s models.Show
	err = dsnap.DataTo(&s)
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("error getting post")
	}
	fmt.Printf("Document data: %#v\n", s)
	return &s, nil
}

func (f *FirestoreHCShowCalendarService) CreateShow(show models.Show) (*models.Show, error) {
	newShowId := uuid.New()
	show.Id = newShowId.String()
	_, err := f.database.Collection(utils.SHOW_COLLECTION).Doc(newShowId.String()).Set(f.ctx, show)
	if err != nil {
		fmt.Println("error creating show")
		fmt.Println(err)
		return nil, errors.New("error creating show")
	}
	return &show, nil
}

func (f *FirestoreHCShowCalendarService) UpdateShow(id string, show models.Show) (*models.Show, error) {
	fmt.Println("updating values for show " + id)
	showFirestoreUpdateData := buildShowFirestoreUpdateData(show)
	_, err := f.database.Collection(utils.SHOW_COLLECTION).Doc(id).Update(f.ctx, showFirestoreUpdateData)
	if err != nil {
		fmt.Println("error updating show")
		fmt.Println(err)
		return nil, errors.New("error updating show")
	}
	b, _ := json.Marshal(show)
	fmt.Println("successful show update: " + string(b))
	return &show, nil
}

// TODO this whole function kinda sucks but works so make it better sometime
// is there a better way to get data from a request -> validate -> pass to update?
func buildShowFirestoreUpdateData(show models.Show) []firestore.Update {
	fireStoreUpdates := []firestore.Update{}
	//i dont like this but i dont think i have a better choice to
	//turn my go struct into something firestore will like
	showTempGenericMap := structs.Map(show)
	for i, v := range showTempGenericMap {
		//TODO UPDATE THESE ACCORDINGLY!!!
		//id and date should never change
		//dont add to update if field is empty
		if strings.ToLower(i) != "id" && strings.ToLower(i) != "date" {
			if v.(string) != "" {
				fireStoreUpdates = append(fireStoreUpdates, firestore.Update{Path: strings.ToLower(i), Value: v})
			}
		}
	}
	return fireStoreUpdates
}

func (f *FirestoreHCShowCalendarService) DeleteShow(id string) error {
	fmt.Println("deleting show with id... " + id)
	_, err := f.database.Collection(utils.SHOW_COLLECTION).Doc(id).Delete(f.ctx)
	if err != nil {
		fmt.Println("error deleting show")
		fmt.Println(err)
		return errors.New("error deleting show")
	}
	fmt.Println("successful delete of id: " + id)
	return nil
}

func (f *FirestoreHCShowCalendarService) GetUser(id string) (*models.User, error) {
	fmt.Println("getting user with id " + id)
	dsnap, err := f.database.Collection(utils.USER_COLLECTION).Doc(id).Get(f.ctx)
	if err != nil {
		fmt.Println("error getting user")
		fmt.Println(err)
		return nil, errors.New("error getting user")
	}
	var u models.User
	err = dsnap.DataTo(&u)
	if err != nil {
		fmt.Println(err)
		return nil, errors.New("error getting user")
	}
	fmt.Printf("Document data: %#v\n", u)
	return &u, nil
}

// TODO GENERATE A TOKEN FOR A USER
func (f *FirestoreHCShowCalendarService) CreateUser(user models.User) (*models.User, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Pass), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("error generating password hash")
		fmt.Println(err)
		return nil, err
	}
	//not sure if this is a weird way to do it
	//but will guarantee no possible plain text pass in db
	u := models.User{Username: user.Username, Hash: string(hashedPassword), Email: user.Email}
	newUserId := uuid.New()
	_, err = f.database.Collection(utils.USER_COLLECTION).Doc(newUserId.String()).Set(f.ctx, u)
	if err != nil {
		fmt.Println("some sort of error building the add query from firestore")
		fmt.Println(err)
		return nil, err
	}
	return &user, nil
}

func (f *FirestoreHCShowCalendarService) UpdateUser(id string, user models.User) (*models.User, error) {
	fmt.Println("updating values for user " + id)
	userFirestoreUpdateData := buildUserFirestoreUpdateData(user)
	_, err := f.database.Collection(utils.USER_COLLECTION).Doc(id).Update(f.ctx, userFirestoreUpdateData)
	if err != nil {
		fmt.Println("error updating user")
		fmt.Println(err)
		return nil, errors.New("error updating user")
	}
	b, _ := json.Marshal(user)
	fmt.Println("successful user update: " + string(b))
	return &user, nil
}

// TODO this whole function kinda sucks but works so make it better sometime
// is there a better way to get data from a request -> validate -> pass to update?
func buildUserFirestoreUpdateData(user models.User) []firestore.Update {
	fireStoreUpdates := []firestore.Update{}
	//i dont like this but i dont think i have a better choice to
	//turn my go struct into something firestore will like
	userTempGenericMap := structs.Map(user)
	for i, v := range userTempGenericMap {
		//TODO UPDATE AS NEEDED FOR USER!!!
		//id and date should never change
		//dont add to update if field is empty
		if strings.ToLower(i) != "id" && strings.ToLower(i) != "date" {
			if v.(string) != "" {
				fireStoreUpdates = append(fireStoreUpdates, firestore.Update{Path: strings.ToLower(i), Value: v})
			}
		}
	}
	return fireStoreUpdates
}

func (f *FirestoreHCShowCalendarService) DeleteUser(id string) error {
	fmt.Println("deleting user with id... " + id)
	_, err := f.database.Collection(utils.USER_COLLECTION).Doc(id).Delete(f.ctx)
	if err != nil {
		fmt.Println("error deleting user")
		fmt.Println(err)
		return errors.New("error deleting user")
	}
	fmt.Println("successful delete of id: " + id)
	return nil
}

func (f *FirestoreHCShowCalendarService) AuthUser(user models.User) (string, error) {
	var u models.User
	iter := f.database.Collection(utils.USER_COLLECTION).Where("username", "==", user.Username).Documents(f.ctx)
	for {
		doc, err := iter.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			fmt.Println(err)
			return "", err
		}
		err = doc.DataTo(&u)
		if err != nil {
			fmt.Println(err)
			return "", err
		}
	}
	if u.Username == "" {
		fmt.Println("user does not exist")
		return "", errors.New("failed login")
	}

	err := bcrypt.CompareHashAndPassword([]byte(u.Hash), []byte(user.Pass))
	if err != nil {
		//probably dont want this to tell too much
		fmt.Println("password does not match")
		fmt.Println(err)
		return "", errors.New("failed login")
	}

	t, err := utils.GenerateToken(u.Username)
	if err != nil {
		fmt.Println("error generating access token")
		fmt.Println(err)
		return "", err
	}

	return t, nil
}
