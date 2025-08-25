package models

import (
	"devnight/1/db"
	"time"
)

type Auction struct {
	ID          int64     `json:"id"`
	Title       string    `json:"title" binding:"required"`
	Description string    `json:"description" binding:"required"`
	ImageURL    string    `json:"image_url"`
	StartingBid float64   `json:"starting_bid" binding:"required"`
	CurrentBid  float64   `json:"current_bid"`
	StartTime   string    `json:"start_time" binding:"required"`
	EndTime     string    `json:"end_time" binding:"required"`
	SellerID    int64     `json:"seller_id"`
	WinnerID    *int64    `json:"winner_id"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

type Bid struct {
	ID        int64     `json:"id"`
	AuctionID int64     `json:"auction_id"`
	BidderID  int64     `json:"bidder_id"`
	BidAmount float64   `json:"bid_amount"`
	BidTime   time.Time `json:"bid_time"`
}

func (a *Auction) Save() error {
	query := `INSERT INTO auctions(title, description, image_url, starting_bid, current_bid, start_time, end_time, seller_id) 
			  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	a.CurrentBid = a.StartingBid
	result, err := stmt.Exec(a.Title, a.Description, a.ImageURL, a.StartingBid, a.CurrentBid, a.StartTime, a.EndTime, a.SellerID)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	a.ID = id
	return err
}

func GetAllAuctions() ([]Auction, error) {
	query := `SELECT id, title, description, image_url, starting_bid, current_bid, start_time, end_time, seller_id, winner_id, status, created_at 
			  FROM auctions ORDER BY created_at DESC`

	rows, err := db.DB.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var auctions []Auction
	for rows.Next() {
		var auction Auction
		err := rows.Scan(&auction.ID, &auction.Title, &auction.Description, &auction.ImageURL,
			&auction.StartingBid, &auction.CurrentBid, &auction.StartTime, &auction.EndTime,
			&auction.SellerID, &auction.WinnerID, &auction.Status, &auction.CreatedAt)
		if err != nil {
			return nil, err
		}
		auctions = append(auctions, auction)
	}
	return auctions, nil
}

func GetAuctionByID(id int64) (*Auction, error) {
	query := `SELECT id, title, description, image_url, starting_bid, current_bid, start_time, end_time, seller_id, winner_id, status, created_at 
			  FROM auctions WHERE id = ?`

	var auction Auction
	err := db.DB.QueryRow(query, id).Scan(&auction.ID, &auction.Title, &auction.Description, &auction.ImageURL,
		&auction.StartingBid, &auction.CurrentBid, &auction.StartTime, &auction.EndTime,
		&auction.SellerID, &auction.WinnerID, &auction.Status, &auction.CreatedAt)
	if err != nil {
		return nil, err
	}
	return &auction, nil
}

func (b *Bid) Save() error {
	query := `INSERT INTO bids(auction_id, bidder_id, bid_amount) VALUES (?, ?, ?)`

	stmt, err := db.DB.Prepare(query)
	if err != nil {
		return err
	}
	defer stmt.Close()

	result, err := stmt.Exec(b.AuctionID, b.BidderID, b.BidAmount)
	if err != nil {
		return err
	}

	id, err := result.LastInsertId()
	b.ID = id

	updateQuery := `UPDATE auctions SET current_bid = ? WHERE id = ?`
	_, err = db.DB.Exec(updateQuery, b.BidAmount, b.AuctionID)

	return err
}

func GetBidsByAuctionID(auctionID int64) ([]Bid, error) {
	query := `SELECT id, auction_id, bidder_id, bid_amount, bid_time FROM bids WHERE auction_id = ? ORDER BY bid_time DESC`

	rows, err := db.DB.Query(query, auctionID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var bids []Bid
	for rows.Next() {
		var bid Bid
		err := rows.Scan(&bid.ID, &bid.AuctionID, &bid.BidderID, &bid.BidAmount, &bid.BidTime)
		if err != nil {
			return nil, err
		}
		bids = append(bids, bid)
	}
	return bids, nil
}
