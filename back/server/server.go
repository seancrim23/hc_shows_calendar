package server

import (
	"encoding/json"
	"io"
	"io/ioutil"
	"net/http"
	"os"

	"hc_shows_backend/models"
	"hc_shows_backend/services"
	"hc_shows_backend/utils"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

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

	r.HandleFunc("/user", h.Auth)
	r.HandleFunc("/user", h.createUser).Methods("PUT") //token
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
	var code int
	var err error

	showId := mux.Vars(r)["id"]
	//TODO perform input validation

	show, err := h.service.GetShow(showId)
	//determine what type of error and change code and return according error message
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, show)
}

func (h *HCShowCalendarServer) getShows(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error

	//needs to extract any filters from the url and pass them to the function
	//grab from url and modify to map?
	//create type of showFilters map[string]string?

	shows, err := h.service.GetShows()
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, shows)
}

func (h *HCShowCalendarServer) createShow(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error
	var show models.Show

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &show)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}

	s, err := h.service.CreateShow(show)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, s)
}

func (h *HCShowCalendarServer) updateShow(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error
	var show models.Show

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &show)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}

	showId := mux.Vars(r)["id"]
	//perform input validation

	s, err := h.service.UpdateShow(showId, show)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, s)
}

func (h *HCShowCalendarServer) deleteShow(w http.ResponseWriter, r *http.Request) {
	var response interface{}
	var code int
	var err error

	showId := mux.Vars(r)["id"]
	//perform input validation

	err = h.service.DeleteShow(showId)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, response)
}

func (h *HCShowCalendarServer) createUser(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error
	var user models.User

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &user)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}

	u, err := h.service.CreateUser(user)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, u)
}

func (h *HCShowCalendarServer) authUser(w http.ResponseWriter, r *http.Request) {
	var response string
	var code int
	var err error
	var u models.User

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		util.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &u)
	if err != nil {
		code = 400
		util.RespondWithError(w, code, err.Error())
		return
	}
	t, err = h.service.AuthUser(u)
	if err != nil {
		code = 400
		util.RespondWithError(w, code, err.Error())
		return
	}
	util.RespondWithJSON(w, code, map[string]string{"token": t})
}

func (h *HCShowCalendarServer) getUser(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error

	userId := mux.Vars(r)["id"]
	//TODO perform input validation

	user, err := h.service.GetUser(userId)
	//determine what type of error and change code and return according error message
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, user)
}

func (h *HCShowCalendarServer) updateUser(w http.ResponseWriter, r *http.Request) {
	var code int
	var err error
	var user models.User

	reqBody, err := ioutil.ReadAll(r.Body)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}
	err = json.Unmarshal(reqBody, &user)
	if err != nil {
		utils.RespondWithError(w, code, err.Error())
		return
	}

	userId := mux.Vars(r)["id"]
	//perform input validation

	u, err := h.service.UpdateUser(userId, user)
	if err != nil {
		code = 400
		utils.RespondWithError(w, code, err.Error())
		return
	}

	utils.RespondWithJSON(w, code, u)
}

func (h *HCShowCalendarServer) deleteUser(w http.ResponseWriter, r *http.Request) {
	var response interface{}
	var code int
	var err error

	userId := mux.Vars(r)["id"]
	//perform input validation

	err = h.service.DeleteUser(userId)
	if err != nil {
		code = 400
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
