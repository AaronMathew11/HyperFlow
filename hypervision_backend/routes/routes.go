// routes/routes.go
package routes

import (
	"github.com/gin-gonic/gin"

	"hypervision_backend/internal/auth"
	"hypervision_backend/internal/boards"
	"hypervision_backend/internal/collaborators"
	"hypervision_backend/internal/snapshot"
)

func Register(r *gin.Engine) {
	api := r.Group("/api")
	api.Use(auth.RequireAuth())

	api.POST("/boards", boards.Create)
	api.GET("/boards", boards.List)
	api.GET("/boards/:id", boards.Get)
	api.DELETE("/boards/:id", boards.Delete)

	api.POST("/boards/:id/share", collaborators.Share)
	api.GET("/boards/:id/collaborators", collaborators.List)

	api.GET("/boards/:id/snapshot", snapshot.Get)
	api.PUT("/boards/:id/snapshot", snapshot.Save)
}
