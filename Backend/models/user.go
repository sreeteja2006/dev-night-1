package models

import (
	"devnight/1/db"
	"devnight/1/utils"
	"errors"
)

type User struct {
	ID        int64  `json:"id"`
	Username  string `json:"username" `
	Email     string `json:"email"`
	Password  string `json:"password" `
	Address   string `json:"address" `
	MobileNum string `json:"mobile_num"`
}

func (u *User) AddUser() error {
	hashedPassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}

	query := "INSERT INTO users(username, email, password, address, mobile_num) VALUES (?, ?, ?, ?, ?)"
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(u.Username, u.Email, hashedPassword, u.Address, u.MobileNum)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	u.ID = id
	return err
}

func (u *User) ValidateCredentials() error {
	query := "SELECT id, password FROM users WHERE email = ?"
	row := db.DB.QueryRow(query, u.Email)

	var retrievedPassword string
	err := row.Scan(&u.ID, &retrievedPassword)
	if err != nil {
		return errors.New("invalid credentials")
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, retrievedPassword)
	if !passwordIsValid {
		return errors.New("invalid credentials")
	}

	return nil
}
