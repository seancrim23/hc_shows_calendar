package server

import (
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"os"
	"strings"

	"hc_shows_backend/models"
	"hc_shows_backend/services"
	"hc_shows_backend/utils"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

//TODO FIGURE OUT SOME SOLUTION FOR ERROR HANDLING
//MAYBE CODE OUT BASIC ERROR HANDLING THEN SEE IF I CAN
//COMBINE CODE
//WHAT ERROR CODES FIT FOR WHAT ENDPOINTS

type HCShowCalendarServer struct {
	service services.HCShowCalendarService
	http.Handler
}

func NewHCShowCalendarServer(service services.HCShowCalendarService) (*HCShowCalendarServer, error) {
	h := new(HCShowCalendarServer)

	h.service = service

	r := mux.NewRouter()
	r.HandleFunc("/health", h.healthCheck).Methods("GET")

	r.HandleFunc("/show", h.getShows).Methods("GET")
	r.HandleFunc("/show", h.createShow).Methods("POST") //token
	r.HandleFunc("/show/{id}", h.getShow).Methods("GET")
	r.HandleFunc("/show/{id}", h.updateShow).Methods("PUT")    //token
	r.HandleFunc("/show/{id}", h.deleteShow).Methods("DELETE") //token

	r.HandleFunc("/auth", h.authUser).Methods("POST")

	r.HandleFunc("/user", h.createUser).Methods("POST") //token
	r.HandleFunc("/user/{id}", h.getUser).Methods("GET")
	r.HandleFunc("/user/{id}", h.updateUser).Methods("PUT")    // token
	r.HandleFunc("/user/{id}", h.deleteUser).Methods("DELETE") //token

	handler := cors.New(cors.Options{
		AllowedOrigins: []string{os.Getenv(utils.ALLOWED_ORIGINS)},
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders: []string{"Authorization", "Content-Type"},
		Debug:          false,
	}).Handler(r)

	h.Handler = handler

	return h, nil
}

func (h *HCShowCalendarServer) getShow(w http.ResponseWriter, r *http.Request) {
	var code = 200
	var err error

	showId := mux.Vars(r)["id"]
	//TODO perform input validation
	if showId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}

	show, err := h.service.GetShow(showId)
	//determine what type of error and change code and return according error message
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}
	if show == nil {
		code = 404
		utils.RespondWithError(w, code, errors.New("cannot find show").Error())
		return
	}

	utils.RespondWithJSON(w, code, show)
}

func (h *HCShowCalendarServer) getShows(w http.ResponseWriter, r *http.Request) {
	var code = 200
	var err error
	showQueryFilters := make(map[string]string)
	params := r.URL.Query()

	if len(params) > 0 {
		for k, v := range params {
			if _, ok := utils.ValidShowQueryFilters[strings.ToLower(k)]; ok {
				showQueryFilters[k] = v[0]
			}
		}
	}

	shows, err := h.service.GetShows(showQueryFilters)
	//TODO build out something to parse errors and deliver error codes
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, shows)
}

func (h *HCShowCalendarServer) createShow(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var code = 201
	var err error
	var show models.Show

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &show)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	s, err := h.service.CreateShow(show)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, s)
}

func (h *HCShowCalendarServer) updateShow(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var code = 200
	var err error
	var show models.Show

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &show)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	showId := mux.Vars(r)["id"]
	if showId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}
	//perform input validation

	s, err := h.service.UpdateShow(showId, show)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, s)
}

func (h *HCShowCalendarServer) deleteShow(w http.ResponseWriter, r *http.Request) {
	var response interface{}
	var code = 200
	var err error

	showId := mux.Vars(r)["id"]
	if showId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}
	//perform input validation

	err = h.service.DeleteShow(showId)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, response)
}

func (h *HCShowCalendarServer) createUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var code = 201
	var err error
	var user models.User

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &user)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	u, err := h.service.CreateUser(user)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, u)
}

func (h *HCShowCalendarServer) authUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var code = 200
	var err error
	var u models.User

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &u)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	t, err := h.service.AuthUser(u)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}
	utils.RespondWithJSON(w, code, map[string]string{"token": t})
}

// do i need to expand this to search by username?
// maybe in the future
func (h *HCShowCalendarServer) getUser(w http.ResponseWriter, r *http.Request) {
	var code = 200
	var err error

	userId := mux.Vars(r)["id"]
	//TODO perform input validation
	if userId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}

	user, err := h.service.GetUser(userId)
	//determine what type of error and change code and return according error message
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}
	if user == nil {
		code = 404
		utils.RespondWithError(w, code, errors.New("cannot find user").Error())
		return
	}

	utils.RespondWithJSON(w, code, user)
}

func (h *HCShowCalendarServer) updateUser(w http.ResponseWriter, r *http.Request) {
	defer r.Body.Close()
	var code = 200
	var err error
	var user models.User

	reqBody, err := io.ReadAll(r.Body)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &user)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	userId := mux.Vars(r)["id"]
	//perform input validation
	if userId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}

	u, err := h.service.UpdateUser(userId, user)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, u)
}

func (h *HCShowCalendarServer) deleteUser(w http.ResponseWriter, r *http.Request) {
	var response interface{}
	var code = 200
	var err error

	userId := mux.Vars(r)["id"]
	//perform input validation
	if userId == "" {
		code = 400
		utils.RespondWithError(w, code, errors.New("no id passed to request").Error())
		return
	}

	err = h.service.DeleteUser(userId)
	if err != nil {
		code = 500
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, response)
}

func (h *HCShowCalendarServer) healthCheck(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	//could ping the db / server here to check true health status
	io.WriteString(w, `{"alive": true}`)
}
