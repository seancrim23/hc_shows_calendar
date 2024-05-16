package server

import (
	"hc_shows_backend/models"
	"net/http"
	"net/http/httptest"
	"testing"
	"time"
)

type StubHCShowCalendarService struct {
	GetShowsFunc func(showQueryFilters map[string]string) (*[]models.Show, error)
	shows        []models.Show
	users        []models.User
}

// set up the mock service with a bunch of users and shows?
func NewStubHCShowCalendarService() *StubHCShowCalendarService {
	testUser1 := models.User{
		Username: "coolpromoter123",
		Email:    "coolpromoter123@hotmail.com",
		Hash:     "reallycoolpassword45",
	}
	testUser2 := models.User{
		Username: "promotercool456",
		Email:    "promotercool456@hotmail.com",
		Hash:     "anotherreallycoolpassword",
	}

	testShow1 := models.Show{
		Id:       "abc123",
		Lineup:   models.Lineup{"cool band 1", "cool band 2", "cool band 3", "cool band 4"},
		Date:     time.Date(2009, time.November, 10, 23, 0, 0, 0, time.UTC),
		State:    "MD",
		City:     "Baltimore",
		Venue:    "Charlie's Chowder Chapel",
		Address:  "123 Chowder Avenue",
		Promoter: testUser1,
	}

	testShow2 := models.Show{
		Id:       "xyz123",
		Lineup:   models.Lineup{"cool band 1", "cool band 2", "cool band 3", "cool band 4"},
		Date:     time.Date(2020, time.November, 10, 23, 0, 0, 0, time.UTC),
		State:    "PA",
		City:     "Philadelphia",
		Venue:    "Paul's Pizza Paradise",
		Address:  "123 Pizza Street",
		Promoter: testUser2,
	}

	testShow3 := models.Show{
		Id:       "abc456",
		Lineup:   models.Lineup{"cool band 1", "cool band 2", "cool band 3", "cool band 4"},
		Date:     time.Date(2000, time.July, 10, 23, 0, 0, 0, time.UTC),
		State:    "CT",
		City:     "New Haven",
		Venue:    "Dan's Diabolical Donuts",
		Address:  "123 Donut Lane",
		Promoter: testUser1,
	}

	testUsers := []models.User{testUser1, testUser2}
	testShows := []models.Show{testShow1, testShow2, testShow3}

	return &StubHCShowCalendarService{shows: testShows, users: testUsers}
}

// need a get all
// determine error codes too
func (s *StubHCShowCalendarService) GetShows(showQueryFilters map[string]string) (*[]models.Show, error) {
	return s.GetShowsFunc(showQueryFilters)
}

func TestGetShows(t *testing.T) {
	t.Run("can get all shows when no filters passed", func(t *testing.T) {
		service := NewStubHCShowCalendarService()
		expectedShows := service.shows
		service.GetShowsFunc = func(showQueryFilters map[string]string) (*[]models.Show, error) {
			return &expectedShows, nil
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodGet, "/", nil)
		res := httptest.NewRecorder()

		server.getShows(res, req)

		assertStatus(t, res.Code, http.StatusOK)
	})
}

func (s *StubHCShowCalendarService) GetShow(id string) (*models.Show, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) CreateShow(show models.Show) (*models.Show, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) UpdateShow(id string, show models.Show) (*models.Show, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) DeleteShow(id string) error {
	return nil
}

func (s *StubHCShowCalendarService) GetUser(id string) (*models.User, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) CreateUser(user models.User) (*models.User, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) UpdateUser(id string, user models.User) (*models.User, error) {
	return nil, nil
}

func (s *StubHCShowCalendarService) DeleteUser(id string) error {
	return nil
}

func (s *StubHCShowCalendarService) AuthUser(user models.User) (string, error) {
	return "", nil
}

func assertStatus(t testing.TB, got, want int) {
	t.Helper()
	if got != want {
		t.Errorf("did not get correct status, got %d, want %d", got, want)
	}
}
