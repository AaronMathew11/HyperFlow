// internal/snapshot/handler.go
package snapshot

import (
	"encoding/json"
	"net/http"
	"time"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
)

type SaveSnapshotReq struct {
	Nodes       []interface{} `json:"nodes"`
	Edges       []interface{} `json:"edges"`
	FlowInputs  string        `json:"flowInputs"`
	FlowOutputs string        `json:"flowOutputs"`
}

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

func Save(c *gin.Context) {
	boardId := c.Param("id")
	userId := c.GetString("userId")

	// Verify user has access to this board (owner or editor permission)
	boardData, _, err := db.Client.
		From("board").
		Select("owner_id", "", false).
		Eq("id", boardId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "board not found"})
		return
	}

	var board map[string]interface{}
	if err := json.Unmarshal(boardData, &board); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse board"})
		return
	}

	ownerId, _ := board["owner_id"].(string)

	// Check if user is owner or has editor permission
	if ownerId != userId {
		permData, _, err := db.Client.
			From("board_permissions").
			Select("role", "", false).
			Eq("board_id", boardId).
			Eq("user_id", userId).
			Eq("role", "editor").
			Execute()

		if err != nil || string(permData) == "[]" {
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to edit this board"})
			return
		}
	}

	var req SaveSnapshotReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	snapshotData := map[string]interface{}{
		"nodes":       req.Nodes,
		"edges":       req.Edges,
		"flowInputs":  req.FlowInputs,
		"flowOutputs": req.FlowOutputs,
	}

	now := time.Now().UTC().Format(time.RFC3339)

	// Use upsert to insert or update the snapshot
	_, _, err = db.Client.
		From("board_snapshots").
		Upsert(map[string]interface{}{
			"board_id":   boardId,
			"version":    1,
			"data":       snapshotData,
			"updated_at": now,
		}, "board_id", "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to save snapshot: " + err.Error()})
		return
	}

	// Also update the board's updated_at timestamp
	_, _, _ = db.Client.
		From("board").
		Update(map[string]interface{}{
			"updated_at": now,
		}, "", "").
		Eq("id", boardId).
		Execute()

	c.JSON(http.StatusOK, gin.H{
		"message":    "snapshot saved successfully",
		"updated_at": now,
	})
}
