package routes

import (
	"devnight/1/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	// Auth routes
	server.POST("/signup", Signup)
	server.POST("/login", Login)

	// Public auction routes
	server.GET("/auctions", GetAuctions)
	server.GET("/auctions/:id", GetAuction)
	server.GET("/auctions/:id/bids", GetAuctionBids)

	// Protected routes
	authenticated := server.Group("/")
	authenticated.Use(middleware.Authenticate)
	authenticated.POST("/auctions", CreateAuction)
	authenticated.POST("/auctions/:id/bids", PlaceBid)
}
