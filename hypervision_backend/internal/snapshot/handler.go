// internal/snapshot/handler.go
package snapshot

import (
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
)

func Get(c *gin.Context) {
	boardId := c.Param("id")

	data, _, err := db.Client.
		From("board_snapshots").
		Select("*", "", false).
		Eq("board_id", boardId).
		Order("updated_at", &postgrest.OrderOpts{Ascending: false}).
		Limit(1, "").
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "snapshot not found"})
		return
	}

	c.JSON(http.StatusOK, data)
}
