package services

import (
	"context"
	"fmt"
	"os"

	"hc_shows_backend/models"

	"cloud.google.com/go/firestore"
	firebase "firebase.google.com/go"
)

// add variable to hold the db connection
// tbd any other variables that may be needed for the service
type FirestoreHCShowCalendarService struct {
	database *firestore.Client
}

func NewFirestoreHCShowCalendarService() (*FirestoreHCShowCalendarService, func(), error) {
	ctx := context.Background()

	if value := os.Getenv("FIRESTORE_EMULATOR_HOST"); value != "" {
		fmt.Println("using firestore emulator: " + value)
	}

	conf := &firebase.Config{ProjectID: os.Getenv("GCP_PROJECT_ID")}
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

	return &FirestoreHCShowCalendarService{database: database}, closeFunc, nil
}

// TODO implement all service functions...
func (f *FirestoreHCShowCalendarService) GetShows() (*[]models.Show, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) GetShow(id string) (*models.Show, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) CreateShow(show models.Show) (*models.Show, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) UpdateShow(id string, show models.Show) (*models.Show, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) DeleteShow(id string) error {
	return nil
}

func (f *FirestoreHCShowCalendarService) GetUser(id string) (*models.User, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) CreateUser(user models.User) (*models.User, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) UpdateUser(id string, user models.User) (*models.User, error) {
	return nil, nil
}

func (f *FirestoreHCShowCalendarService) DeleteUser(id string) error {
	return nil
}
