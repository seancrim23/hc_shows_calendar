package server

import (
	"bytes"
	"encoding/json"
	"errors"
	"hc_shows_backend/models"
	"io"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
	"time"

	"github.com/gorilla/mux"
)

type StubHCShowCalendarService struct {
	GetShowsFunc   func(showQueryFilters map[string]string) (*[]models.Show, error)
	GetShowFunc    func(id string) (*models.Show, error)
	CreateShowFunc func(show models.Show) (*models.Show, error)
	shows          []models.Show
	users          []models.User
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

		req := httptest.NewRequest(http.MethodGet, "/show", nil)
		res := httptest.NewRecorder()

		server.getShows(res, req)

		assertStatus(t, res.Code, http.StatusOK)

		var showsResponse []models.Show
		resBody, _ := io.ReadAll(res.Body)
		_ = json.Unmarshal(resBody, &showsResponse)

		if len(showsResponse) != 3 {
			t.Fatalf("expected 3 shows in response but got %d", len(showsResponse))
		}
	})

	//TODO build out better error handling for service and update testing and handlers accordingly
	t.Run("returns 400 bad request if error is thrown", func(t *testing.T) {
		service := NewStubHCShowCalendarService()

		service.GetShowsFunc = func(showQueryFilters map[string]string) (*[]models.Show, error) {
			return nil, errors.New("make me more meaningful please")
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodGet, "/show", nil)
		res := httptest.NewRecorder()

		server.getShows(res, req)

		assertStatus(t, res.Code, http.StatusBadRequest)
	})
}

func (s *StubHCShowCalendarService) GetShow(id string) (*models.Show, error) {
	return s.GetShowFunc(id)
}

func TestGetShow(t *testing.T) {
	t.Run("gets correct show when id passed in", func(t *testing.T) {
		service := NewStubHCShowCalendarService()
		expectedShow := service.shows[0]
		service.GetShowFunc = func(id string) (*models.Show, error) {
			return &expectedShow, nil
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodGet, "/show/"+expectedShow.Id, nil)
		req = mux.SetURLVars(req, map[string]string{"id": expectedShow.Id})
		res := httptest.NewRecorder()

		server.getShow(res, req)

		assertStatus(t, res.Code, http.StatusOK)

		showResponse := responseToShow(res.Body)

		if showResponse.Id != expectedShow.Id {
			t.Fatalf("expected id of %q in response but got %q", expectedShow.Id, showResponse.Id)
		}

		if !reflect.DeepEqual(showResponse, expectedShow) {
			t.Errorf("the show %+v was not what was expected %+v", showResponse, expectedShow)
		}
	})

	//TODO build out better error handling for service and update testing and handlers accordingly
	t.Run("returns 400 bad request if no user id passed in", func(t *testing.T) {
		service := NewStubHCShowCalendarService()

		service.GetShowFunc = func(id string) (*models.Show, error) {
			return nil, errors.New("bad request")
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodGet, "/show", nil)
		res := httptest.NewRecorder()

		server.getShow(res, req)

		assertStatus(t, res.Code, http.StatusBadRequest)
	})

	t.Run("returns 404 not found if no show found for id", func(t *testing.T) {
		service := NewStubHCShowCalendarService()

		service.GetShowFunc = func(id string) (*models.Show, error) {
			return nil, nil
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodGet, "/show", nil)
		res := httptest.NewRecorder()

		server.getShow(res, req)

		assertStatus(t, res.Code, http.StatusNotFound)
	})
}

func (s *StubHCShowCalendarService) CreateShow(show models.Show) (*models.Show, error) {
	s.shows = append(s.shows, show)
	return s.CreateShowFunc(show)
}

func TestCreateShow(t *testing.T) {
	t.Run("can create shows with valid show data", func(t *testing.T) {
		service := &StubHCShowCalendarService{
			shows: []models.Show{},
			users: []models.User{},
		}
		expectedShow := models.Show{
			Id:   "coolshow123",
			City: "Baltimore",
		}

		service.CreateShowFunc = func(show models.Show) (*models.Show, error) {
			return &expectedShow, nil
		}

		server, _ := NewHCShowCalendarServer(service)

		req := httptest.NewRequest(http.MethodPost, "/show", showToJSON(expectedShow))
		res := httptest.NewRecorder()

		server.createShow(res, req)

		assertStatus(t, res.Code, http.StatusCreated)

		showResponse := responseToShow(res.Body)

		if !reflect.DeepEqual(showResponse, expectedShow) {
			t.Errorf("the show create api call response %+v was not what was expected %+v", showResponse, expectedShow)
		}

		if len(service.shows) != 1 {
			t.Fatalf("expected 1 show added but got %d", len(service.shows))
		}

		if !reflect.DeepEqual(service.shows[0], expectedShow) {
			t.Errorf("the show created %+v was not what was expected %+v", service.shows[0], expectedShow)
		}

	})
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

func showToJSON(show models.Show) io.Reader {
	b, _ := json.Marshal(show)
	return bytes.NewReader(b)
}

func responseToShow(responseBody *bytes.Buffer) models.Show {
	var showResponse models.Show
	resBody, _ := io.ReadAll(responseBody)
	_ = json.Unmarshal(resBody, &showResponse)
	return showResponse
}
