package utils

import (
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
)

var SECRET_KEY = []byte(os.Getenv(SITE_KEY))

func GenerateToken(userName string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": userName,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(SECRET_KEY)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func WithToken(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authString := r.Header.Get("Authorization")
		if authString == "" {
			RespondWithError(w, http.StatusUnauthorized, "Missing authorization header")
			return
		}
		splitAuth := strings.Fields(authString)
		_, err := validateToken(splitAuth[1])
		if err != nil {
			RespondWithError(w, 400, err.Error())
			return
		}
		next(w, r)
	}
}

func validateToken(tokenString string) (interface{}, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	return token, nil
}
