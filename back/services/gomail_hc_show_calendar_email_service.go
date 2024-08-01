package services

import (
	"bytes"
	"errors"
	"fmt"
	"hc_shows_backend/utils"
	"os"
	"text/template"

	"gopkg.in/gomail.v2"
)

// gomail implementation of email service interface
type GomailHcShowCalendarEmailService struct{}

// tbd if anything needs to be injected into this service on creation
func NewGomailHcShowCalendarEmailService() *GomailHcShowCalendarEmailService {
	return &GomailHcShowCalendarEmailService{}
}

func (g *GomailHcShowCalendarEmailService) CreateMail(mailReq *Mail) (*gomail.Message, error) {
	m := gomail.NewMessage()
	m.SetHeader(utils.FROM, mailReq.from)
	m.SetHeader(utils.TO, mailReq.to...)
	m.SetHeader(utils.SUBJECT, mailReq.subject)

	var emailBody = ""
	var err error
	switch mailReq.mtype {
	case MailConfirmation:
		emailBody, err = buildEmailBody(mailTemplateLocations[MailConfirmation], *mailReq.data)
	case PassReset:
		emailBody, err = buildEmailBody(mailTemplateLocations[PassReset], *mailReq.data)
	default:
		fmt.Println("email type is required")
		return nil, errors.New("invalid email type")
	}

	if err != nil {
		fmt.Println("error creating mail")
		return nil, err
	}

	m.SetBody(utils.TEXT_HTML, emailBody)

	return m, nil
}

func (g *GomailHcShowCalendarEmailService) SendMail(mailReq *Mail) error {
	m, err := g.CreateMail(mailReq)
	if err != nil {
		fmt.Println("error creating mail")
		fmt.Println(err)
		return err
	}

	d := gomail.NewDialer(utils.GMAIL_SMTP, utils.GMAIL_SMTP_PORT, utils.MY_EMAIL, os.Getenv(utils.GMAIL_AUTH))
	err = d.DialAndSend(m)
	if err != nil {
		fmt.Println("error dialing and sending")
		fmt.Println(err)
		return err
	}

	return nil
}

// TODO do i need this AND createmail?
// this creates an actual mail object
// createmail creates the gomail specific email to be sent...
func (g *GomailHcShowCalendarEmailService) NewMail(from string, to []string, subject string, mailType MailType, data *MailData) *Mail {
	return &Mail{
		from:    from,
		to:      to,
		subject: subject,
		mtype:   mailType,
		data:    data,
	}
}

func buildEmailBody(templatePath string, mailData MailData) (string, error) {
	var body bytes.Buffer
	t, err := template.ParseFiles(templatePath)
	if err != nil {
		fmt.Println(err)
		return "", err
	}
	t.Execute(&body, mailData)
	return body.String(), nil
}

var mailTemplateLocations = map[MailType]string{
	MailConfirmation: "C:/development/hc_shows_calendar/back/templates/confirm_mail.html",
	PassReset:        "C:/development/hc_shows_calendar/back/templates/password_reset.html",
}
