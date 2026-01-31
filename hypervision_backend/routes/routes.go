// routes/routes.go
package routes

import (
	"github.com/gin-gonic/gin"

	"hypervision_backend/internal/accesslinks"
	"hypervision_backend/internal/auth"
	"hypervision_backend/internal/boards"
	"hypervision_backend/internal/businessunits"
	"hypervision_backend/internal/clients"
	"hypervision_backend/internal/collaborators"
	"hypervision_backend/internal/snapshot"
	"hypervision_backend/internal/workflows"
)

func Register(r *gin.Engine) {
	// Authenticated routes
	api := r.Group("/api")
	api.Use(auth.RequireAuth())

	// ============ NEW HIERARCHY ROUTES ============

	// Clients
	api.POST("/clients", clients.Create)
	api.GET("/clients", clients.List)
	api.GET("/clients/:id", clients.Get)
	api.DELETE("/clients/:id", clients.Delete)

	// Business Units (nested under clients)
	api.POST("/clients/:clientId/business-units", businessunits.Create)
	api.GET("/clients/:clientId/business-units", businessunits.List)
	api.GET("/business-units/:buId", businessunits.Get)
	api.DELETE("/business-units/:buId", businessunits.Delete)

	// BU Sharing
	api.POST("/business-units/:buId/share", businessunits.Share)
	api.GET("/business-units/:buId/collaborators", businessunits.ListCollaborators)
	api.DELETE("/business-units/:buId/share/:userId", businessunits.RemoveCollaborator)

	// Workflows (nested under business units)
	api.POST("/business-units/:buId/workflows", workflows.Create)
	api.GET("/business-units/:buId/workflows", workflows.List)
	api.GET("/workflows/:id", workflows.Get)
	api.PUT("/workflows/:id", workflows.Update)
	api.DELETE("/workflows/:id", workflows.Delete)

	// ============ LEGACY BOARD ROUTES (keep for now) ============

	api.POST("/boards", boards.Create)
	api.GET("/boards", boards.List)
	api.GET("/boards/:id", boards.Get)
	api.DELETE("/boards/:id", boards.Delete)

	api.POST("/boards/:id/share", collaborators.Share)
	api.GET("/boards/:id/collaborators", collaborators.List)

	// Snapshot routes
	api.GET("/boards/:id/snapshot", snapshot.Get)
	api.PUT("/boards/:id/snapshot", snapshot.Save)

	// Access links management (authenticated)
	api.POST("/boards/:id/links", accesslinks.Create)
	api.GET("/boards/:id/links", accesslinks.List)
	api.DELETE("/boards/:id/links/:linkId", accesslinks.Revoke)

	// Public routes (no auth required)
	public := r.Group("/api/public")
	public.POST("/links/:linkId/verify", accesslinks.Verify)
	public.GET("/links/:linkId/board", accesslinks.GetPublicBoard)
}
