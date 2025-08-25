package routes

import (
	"devnight/1/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func CreateAuction(context *gin.Context) {
	var auction models.Auction

	err := context.ShouldBindJSON(&auction)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err.Error()})
		return
	}

	userId := context.GetInt64("userId")
	auction.SellerID = userId

	err = auction.Save()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not create auction.", "error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Auction created successfully!", "auction": auction})
}

func GetAuctions(context *gin.Context) {
	auctions, err := models.GetAllAuctions()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch auctions.", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"auctions": auctions})
}

func GetAuction(context *gin.Context) {
	auctionId, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse auction id."})
		return
	}

	auction, err := models.GetAuctionByID(auctionId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch auction."})
		return
	}

	context.JSON(http.StatusOK, gin.H{"auction": auction})
}

func PlaceBid(context *gin.Context) {

	auctionId, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse auction id."})
		return
	}

	var bidRequest struct {
		BidAmount float64 `json:"bid_amount" binding:"required"`
	}

	err = context.ShouldBindJSON(&bidRequest)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse request data.", "error": err.Error()})
		return
	}

	userId := context.GetInt64("userId")

	bid := models.Bid{
		AuctionID: auctionId,
		BidderID:  userId,
		BidAmount: bidRequest.BidAmount,
	}


	auction, err := models.GetAuctionByID(bid.AuctionID)
	if err != nil {
		context.JSON(http.StatusNotFound, gin.H{"message": "Auction not found."})
		return
	}


	if bid.BidAmount <= auction.CurrentBid {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Bid must be higher than current bid."})
		return
	}


	if auction.Status != "active" {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Auction is not active."})
		return
	}

	err = bid.Save()
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not place bid.", "error": err.Error()})
		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": "Bid placed successfully!", "bid": bid})
}

func GetAuctionBids(context *gin.Context) {
	auctionId, err := strconv.ParseInt(context.Param("id"), 10, 64)
	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"message": "Could not parse auction id."})
		return
	}

	bids, err := models.GetBidsByAuctionID(auctionId)
	if err != nil {
		context.JSON(http.StatusInternalServerError, gin.H{"message": "Could not fetch bids.", "error": err.Error()})
		return
	}

	context.JSON(http.StatusOK, gin.H{"bids": bids})
}
