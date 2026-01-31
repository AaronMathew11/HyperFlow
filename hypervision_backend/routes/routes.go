// routes/routes.go
package routes

import (
	"github.com/gin-gonic/gin"

	"hypervision_backend/internal/accesslinks"
	"hypervision_backend/internal/auth"
	"hypervision_backend/internal/boards"
	"hypervision_backend/internal/collaborators"
	"hypervision_backend/internal/snapshot"
)

func Register(r *gin.Engine) {
	// Authenticated routes
	api := r.Group("/api")
	api.Use(auth.RequireAuth())

	api.POST("/boards", boards.Create)
	api.GET("/boards", boards.List)
	api.GET("/boards/:id", boards.Get)
	api.DELETE("/boards/:id", boards.Delete)

	api.POST("/boards/:id/share", collaborators.Share)
	api.GET("/boards/:id/collaborators", collaborators.List)

	api.GET("/boards/:id/snapshot", snapshot.Get)

	// Access links management (authenticated)
	api.POST("/boards/:id/links", accesslinks.Create)
	api.GET("/boards/:id/links", accesslinks.List)
	api.DELETE("/boards/:id/links/:linkId", accesslinks.Revoke)

	// Public routes (no auth required)
	public := r.Group("/api/public")
	public.POST("/links/:linkId/verify", accesslinks.Verify)
	public.GET("/links/:linkId/board", accesslinks.GetPublicBoard)
}
