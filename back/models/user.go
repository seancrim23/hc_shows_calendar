package models

// really only need users to store anyone with elevated privileges...
// TODO what do we want to store for a promoter?
type User struct {
	Id       string `json:"id" firestore:"id"`
	Username string `json:"username" firestore:"username"`
	Hash     string `json:"hash" firestore:"hash"`
	Email    string `json:"email" firestore:"email"`
	//using this as a helper - should never actually exist in a db
	Pass string `json:"pass" firestore:"pass,omitempty"`
}
