package calendar

import "net/http"

type HCShowCalendarServer struct {
	store HCShowCalendarStore
	http.Handler
}

func NewHCShowCalendarServer(store HCShowCalendarStore) (*HCShowCalendarServer, error) {
	h := new(HCShowCalendarServer)

	h.store = store

	//add routes

	return h, nil
}
