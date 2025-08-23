package routes

import "github.com/gin-gonic/gin"

func RegisterRoutes(server *gin.Engine){
	server.POST("/login")
	server.POST("/signup")
	server.POST("/auctions")
	server.GET("/auctions")


}