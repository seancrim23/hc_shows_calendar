package services

import (
	"context"
	"fmt"
	"hc_shows_backend/models"
	"hc_shows_backend/utils"
	"log"
	"os"
	"os/exec"
	"testing"
	"time"
)

var testUser = models.User{
	Id:       "user123",
	Username: "coolpromoter123",
	Email:    "coolpromoter123@hotmail.com",
	Hash:     "reallycoolpassword45",
}

var testShow = models.Show{
	Id:       "abc123",
	Lineup:   models.Lineup{"cool band 1", "cool band 2", "cool band 3", "cool band 4"},
	Date:     time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC),
	State:    "MD",
	City:     "Baltimore",
	Venue:    "Charlie's Chowder Chapel",
	Address:  "123 Chowder Avenue",
	Promoter: testUser,
}

// better way to do this would be start the firestore emulator command
// wait until it is set up
// run the tests
// clean up
func TestMain(m *testing.M) {
	os.Setenv(utils.FIRESTORE_EMULATOR_HOST, utils.LOCALHOST+":"+utils.FIRESTORE_EMULATOR_PORT)
	os.Setenv(utils.GCP_PROJECT_ID, "my-site-back")
	go setupTests()
	//sleep to ensure the emulator starts...
	time.Sleep(5 * time.Second)
	loadTestData()
	code := m.Run()
	cleanupTests()
	os.Exit(code)
}

func setupTests() {
	fmt.Println("setting up tests")
	cmd := exec.CommandContext(context.Background(), "gcloud", "emulators", "firestore", "start", "--host-port="+utils.LOCALHOST+":"+utils.FIRESTORE_EMULATOR_PORT)
	//this command blocks... maybe make this a go routine too?
	//look into if there's any way i can make it not block
	err := cmd.Run()
	if err != nil {
		log.Fatal(err)
	}
}

func loadTestData() {
	fmt.Println("loading test data...")
	service, close, err := NewFirestoreHCShowCalendarService()
	defer close()
	if err != nil {
		fmt.Println("failure setting up test data...")
		log.Fatal(err)
	}

	_, err = service.CreateUser(testUser)
	if err != nil {
		fmt.Println("failure setting up test user data...")
		log.Fatal(err)
	}
	_, err = service.CreateShow(testShow)
	if err != nil {
		fmt.Println("failure setting up test show data...")
		log.Fatal(err)
	}
}

func cleanupTests() {
	fmt.Println("cleaning up tests")
	cmd := exec.Command("curl", "-d", "''", utils.LOCALHOST+":"+utils.FIRESTORE_EMULATOR_PORT+"/shutdown")
	if err := cmd.Run(); err != nil {
		log.Fatal(err)
	}
}

func TestGetShows(t *testing.T) {

}

func TestGetShow(t *testing.T) {
	service, close, err := NewFirestoreHCShowCalendarService()
	defer close()
	if err != nil {
		fmt.Println("failure starting service...")
		log.Fatal(err)
	}

	show, err := service.GetShow(testShow.Id)
	if err != nil {
		fmt.Println("failure getting test show data...")
		log.Fatal(err)
	}
	fmt.Println(show)
}

func TestCreateShow(t *testing.T) {

}

func TestUpdateShow(t *testing.T) {

}

func TestDeleteShow(t *testing.T) {

}

func TestGetUser(t *testing.T) {

}

func TestCreateUser(t *testing.T) {

}

func TestUpdateUser(t *testing.T) {

}

func TestDeleteUser(t *testing.T) {

}

func TestAuthUser(t *testing.T) {

}
