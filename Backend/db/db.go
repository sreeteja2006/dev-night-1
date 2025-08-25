package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

var DB *sql.DB

func InitDB() {
	var err error
	DB, err = sql.Open("sqlite3", "api.db")
	if err != nil {
		log.Fatalf("Could not connect to the database: %v", err)
	}

	DB.SetMaxOpenConns(10)
	DB.SetMaxIdleConns(5)

	createTables()
}

func createTables() {
	createUserTable := `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        address TEXT NOT NULL,
        mobile_num TEXT NOT NULL
    )`

	_, err := DB.Exec(createUserTable)
	if err != nil {
		log.Fatalf("Could not create 'users' table: %v", err)
	}

	createAuctionTable := `
	CREATE TABLE IF NOT EXISTS auctions(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		title TEXT NOT NULL,
		description TEXT NOT NULL,
		image_url TEXT,
		starting_bid REAL NOT NULL,
		current_bid REAL NOT NULL,
		start_time TEXT NOT NULL,
		end_time TEXT NOT NULL,
		seller_id INTEGER NOT NULL,
		winner_id INTEGER,
		status TEXT DEFAULT 'active',
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (seller_id) REFERENCES users(id),
		FOREIGN KEY (winner_id) REFERENCES users(id)
	)`

	_, err = DB.Exec(createAuctionTable)
	if err != nil {
		log.Fatalf("Could not create 'auctions' table: %v", err)
	}

	createBidsTable := `
	CREATE TABLE IF NOT EXISTS bids(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		auction_id INTEGER NOT NULL,
		bidder_id INTEGER NOT NULL,
		bid_amount REAL NOT NULL,
		bid_time DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (auction_id) REFERENCES auctions(id),
		FOREIGN KEY (bidder_id) REFERENCES users(id)
	)`

	_, err = DB.Exec(createBidsTable)
	if err != nil {
		log.Fatalf("Could not create 'bids' table: %v", err)
	}
}
