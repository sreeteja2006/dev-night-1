package models

import (
	"devnight/1/db"
	"devnight/1/utils"
	"errors"
)

type User struct {
	Userid    int64
	Username  string
	Password  string
	Email     string
	Address   string
	MobileNum int64
}

func (u *User) AddUser() error {
	query := `INSERT INTO users (username, password,email,address,mobilenum) VALUES(?,?,?,?,?)`
	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	hashpassword, err := utils.HashPassword(u.Password)
	if err != nil {
		return err
	}

	result, err := stmt.Exec(u.Email, hashpassword)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return err
	}

	u.Userid = id
	return nil
}
func (u *User) ValidateCredentials() error {
	query := `SELECT id,password FROM users WHERE email =?`
	row := db.DB.QueryRow(query, u.Email)

	var retreivedPassword string
	err := row.Scan(&u.Userid, &retreivedPassword)

	if err != nil {
		return errors.New("credentials Invalid")
	}

	passwordIsValid := utils.CheckPasswordHash(u.Password, retreivedPassword)
	if !passwordIsValid {
		return errors.New("credentials Invalid")
	}

	return nil

}
