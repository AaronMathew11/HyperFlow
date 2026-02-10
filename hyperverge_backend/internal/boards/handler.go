// internal/boards/handler.go
package boards

import (
	"encoding/json"
	"fmt"
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateBoardReq struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type FlowData struct {
	Nodes       []interface{} `json:"nodes"`
	Edges       []interface{} `json:"edges"`
	FlowInputs  string        `json:"flowInputs"`
	FlowOutputs string        `json:"flowOutputs"`
}

type BoardResponse struct {
	ID          string   `json:"id"`
	Name        string   `json:"name"`
	Description string   `json:"description"`
	UserID      string   `json:"user_id"`
	FlowData    FlowData `json:"flow_data"`
	CreatedAt   string   `json:"created_at"`
	UpdatedAt   string   `json:"updated_at"`
}

func Create(c *gin.Context) {
	var req CreateBoardReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := c.GetString("userId")

	data, _, err := db.Client.
		From("board").
		Insert(map[string]interface{}{
			"name":        req.Title,
			"owner_id":    userId,
			"description": req.Description,
		}, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var dbResult []map[string]interface{}
	if err := json.Unmarshal(data, &dbResult); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response"})
		return
	}

	if len(dbResult) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no board created"})
		return
	}

	board := dbResult[0]
	response := BoardResponse{
		ID:          getString(board, "id"),
		Name:        getString(board, "name"),
		Description: getString(board, "description"),
		UserID:      getString(board, "owner_id"),
		FlowData: FlowData{
			Nodes:       []interface{}{},
			Edges:       []interface{}{},
			FlowInputs:  "",
			FlowOutputs: "",
		},
		CreatedAt: getString(board, "created_at"),
		UpdatedAt: getString(board, "updated_at"),
	}

	c.JSON(http.StatusCreated, response)
}

func getString(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func List(c *gin.Context) {
	userId := c.GetString("userId")
	fmt.Println(userId)

	// Get boards owned by user
	ownedData, _, err := db.Client.
		From("board").
		Select("*", "", false).
		Eq("owner_id", userId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var ownedBoards []map[string]interface{}
	if err := json.Unmarshal(ownedData, &ownedBoards); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse owned boards"})
		return
	}

	// Get boards shared with user via permissions
	permData, _, err := db.Client.
		From("board_permissions").
		Select("board_id", "", false).
		Eq("user_id", userId).
		Execute()

	if err != nil {
		// If no permissions found, just return owned boards
		c.JSON(http.StatusOK, ownedBoards)
		return
	}

	var permissions []map[string]interface{}
	if err := json.Unmarshal(permData, &permissions); err != nil {
		// If parsing fails, just return owned boards
		c.JSON(http.StatusOK, ownedBoards)
		return
	}

	// Get shared boards
	boardIds := make([]string, 0)
	for _, perm := range permissions {
		if boardId, ok := perm["board_id"].(string); ok {
			boardIds = append(boardIds, boardId)
		}
	}

	if len(boardIds) > 0 {
		// Fetch shared boards
		sharedData, _, err := db.Client.
			From("board").
			Select("*", "", false).
			In("id", boardIds).
			Execute()

		if err == nil {
			var sharedBoards []map[string]interface{}
			if err := json.Unmarshal(sharedData, &sharedBoards); err == nil {
				// Merge owned and shared boards
				ownedBoards = append(ownedBoards, sharedBoards...)
			}
		}
	}

	c.JSON(http.StatusOK, ownedBoards)
}

func Get(c *gin.Context) {
	boardId := c.Param("id")

	data, _, err := db.Client.
		From("board").
		Select("*", "", false).
		Eq("id", boardId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "board not found"})
		return
	}

	var result map[string]interface{}
	if err := json.Unmarshal(data, &result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func Delete(c *gin.Context) {
	boardId := c.Param("id")
	userId := c.GetString("userId")

	_, _, err := db.Client.
		From("board").
		Delete("", "").
		Eq("id", boardId).
		Eq("owner_id", userId).
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not allowed"})
		return
	}

	c.Status(http.StatusNoContent)
}
