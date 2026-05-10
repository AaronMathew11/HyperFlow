// internal/collaborators/handler.go
package collaborators

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"hypervision_backend/internal/db"
)

type ShareReq struct {
	UserID string `json:"userId"`
	Role   string `json:"role"` // editor/viewer
}

func Share(c *gin.Context) {
	boardId := c.Param("id")
	var req ShareReq

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, _, err := db.Client.
		From("board_permissions").
		Insert(map[string]interface{}{
			"board_id": boardId,
			"user_id":  req.UserID,
			"role":     req.Role,
		}, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

func List(c *gin.Context) {
	boardId := c.Param("id")

	data, _, err := db.Client.
		From("board_permissions").
		Select("*", "", false).
		Eq("board_id", boardId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}
