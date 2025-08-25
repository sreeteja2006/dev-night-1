package routes

import (
	"devnight/1/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(server *gin.Engine) {
	server.POST("/signup", Signup)
	server.POST("/login", Login)

	server.GET("/auctions", GetAuctions)
	server.GET("/auctions/:id", GetAuction)
	server.GET("/auctions/:id/bids", GetAuctionBids)


	authenticated := server.Group("/")
	authenticated.Use(middleware.Authenticate)
	authenticated.POST("/auctions", CreateAuction)
	authenticated.POST("/auctions/:id/bids", PlaceBid)
}
