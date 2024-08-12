package utils

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt"
)

var SECRET_KEY = []byte(os.Getenv(SITE_KEY))

type UserIDKey struct{}

// TODO modify to support various token types
type TokenCustomClaims struct {
	Username string
	jwt.StandardClaims
}

func GenerateToken(userName string) (string, error) {
	claims := TokenCustomClaims{
		userName,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

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
		u, err := validateToken(splitAuth[1])
		if err != nil {
			RespondWithError(w, 400, err.Error())
			return
		}
		//add username to context for use in next
		fmt.Println(u)
		ctx := context.WithValue(r.Context(), UserIDKey{}, u)
		r = r.WithContext(ctx)

		next(w, r)
	}
}

func validateToken(tokenString string) (string, error) {
	token, err := jwt.ParseWithClaims(tokenString, &TokenCustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})

	if err != nil {
		return "", err
	}

	claims, ok := token.Claims.(*TokenCustomClaims)
	if !ok || !token.Valid || claims.Username == "" {
		return "", fmt.Errorf("invalid token")
	}

	return claims.Username, nil
}
