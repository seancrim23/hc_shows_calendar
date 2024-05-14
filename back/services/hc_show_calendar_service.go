package services

import "hc_shows_backend/models"

//the hc show calendar service will contain all functions that
//will interact with the database

// this is created as an interface so we can implement different db connections
// and their respective functions as needed
type HCShowCalendarService interface {
	//GetShows will probably be a big func at some point
	//need to be able to pass filters and handle lots of queries
	//pagination needed for get shows too
	GetShows() (*[]models.Show, error)
	GetShow(string) (*models.Show, error)
	CreateShow(models.Show) (*models.Show, error)
	UpdateShow(string, models.Show) (*models.Show, error)
	DeleteShow(string) error

	GetUser(string) (*models.User, error)
	CreateUser(models.User) (*models.User, error)
	UpdateUser(string, models.User) (models.User, error)
	DeleteUser(string) error
}
