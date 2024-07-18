package models

import "time"

type VerificationDataType int

const (
	MailConfirmation VerificationDataType = iota + 1
	PassReset
)

// verification holds the verification info for a user creating their account
type Verification struct {
	Email     string
	Code      string
	ExpiresAt time.Time
	Type      VerificationDataType
}
