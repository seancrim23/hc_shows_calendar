package stores

import "hc_shows_backend/models"

// hcshowcalendarstore will interact with the database for
// all data that is used in the application

// set up so that implementations for these db functions can be made for any possible DB needed
type HCShowCalendarStore interface {
	GetShows() []models.Show
	GetShow(id string) (models.Show, error)
	CreateShow() error
	UpdateShow() (models.Show, error)
	DeleteShow() error

	GetUser(id string) (models.User, error)
	CreateUser() models.User
	UpdateUser() (models.User, error)
	DeleteUser() error
}
