package models

// really only need users to store anyone with elevated privileges...
// TODO what do we want to store for a promoter?
type User struct {
	//username will be unique and serve as id
	Username string `json:"username" firestore:"username"`
	//Hash     string `json:"hash" firestore:"hash"`
	Email string `json:"email" firestore:"email"`
	//plain text should never exist in a DB
	Password string `json:"password" firestore:"password,omitempty"`
}
