package db

import (
	"database/sql"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func  InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "api.db")

	if err != nil {
		panic("could not open the database")
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()

}
func createTables() {

	createUserTable :=`
	CREATE TABLE IF NOT EXISTS users(
	userid INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	address TEXT NOT NULL,
	phonenumber INTEGER
	)`

	_, err := DB.Exec(createUserTable)
	if err != nil {
		panic("Could not create tables")
	}

	

}
