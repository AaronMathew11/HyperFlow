package accesslinks

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateLinkReq struct {
	Role      string `json:"role"`      // "viewer" or "editor"
	ExpiresIn *int   `json:"expiresIn"` // Optional: hours until expiration
}

type CreateLinkResponse struct {
	LinkID    string  `json:"linkId"`
	Password  string  `json:"password"` // Plain text - returned ONCE
	ExpiresAt *string `json:"expiresAt"`
	ShareURL  string  `json:"shareUrl"`
}

type AccessLink struct {
	ID        string  `json:"id"`
	BoardID   string  `json:"board_id"`
	Role      string  `json:"role"`
	ExpiresAt *string `json:"expires_at"`
	CreatedAt string  `json:"created_at"`
}

type VerifyPasswordReq struct {
	Password string `json:"password"`
}

type VerifyResponse struct {
	BoardID string `json:"boardId"`
	Role    string `json:"role"`
}

// Create generates a new shareable link with password protection
func Create(c *gin.Context) {
	boardId := c.Param("id")
	userId := c.GetString("userId")

	// Verify user owns the board or has editor permissions
	if !canManageBoard(boardId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to share this board"})
		return
	}

	var req CreateLinkReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate role
	if req.Role != "viewer" && req.Role != "editor" {
		req.Role = "viewer" // Default to viewer
	}

	// Generate random password
	password, err := GeneratePassword(12)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate password"})
		return
	}

	// Hash the password
	passwordHash, err := HashPassword(password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	// Calculate expiration time if provided
	var expiresAt *string
	insertData := map[string]interface{}{
		"board_id":      boardId,
		"role":          req.Role,
		"password_hash": passwordHash,
	}

	if req.ExpiresIn != nil && *req.ExpiresIn > 0 {
		expTime := time.Now().Add(time.Duration(*req.ExpiresIn) * time.Hour)
		expStr := expTime.Format(time.RFC3339)
		expiresAt = &expStr
		insertData["expires_at"] = expStr
	}

	// Insert into database
	data, _, err := db.Client.
		From("board_access_links").
		Insert(insertData, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create link"})
		return
	}

	var dbResult []map[string]interface{}
	if err := json.Unmarshal(data, &dbResult); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response"})
		return
	}

	if len(dbResult) == 0 {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no link created"})
		return
	}

	linkId := getString(dbResult[0], "id")

	// Build share URL
	frontendURL := os.Getenv("FRONTEND_URL")
	if frontendURL == "" {
		frontendURL = "http://localhost:5173"
	}
	shareURL := frontendURL + "/share/" + linkId

	c.JSON(http.StatusCreated, CreateLinkResponse{
		LinkID:    linkId,
		Password:  password, // Plain password - only time it's shown
		ExpiresAt: expiresAt,
		ShareURL:  shareURL,
	})
}

// List returns all access links for a board
func List(c *gin.Context) {
	boardId := c.Param("id")
	userId := c.GetString("userId")

	// Verify user can manage this board
	if !canManageBoard(boardId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	data, _, err := db.Client.
		From("board_access_links").
		Select("id, board_id, role, expires_at, created_at", "", false).
		Eq("board_id", boardId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var links []AccessLink
	if err := json.Unmarshal(data, &links); err != nil {
		c.JSON(http.StatusOK, []AccessLink{})
		return
	}

	c.JSON(http.StatusOK, links)
}

// Revoke deletes an access link
func Revoke(c *gin.Context) {
	boardId := c.Param("id")
	linkId := c.Param("linkId")
	userId := c.GetString("userId")

	// Verify user can manage this board
	if !canManageBoard(boardId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	_, _, err := db.Client.
		From("board_access_links").
		Delete("", "").
		Eq("id", linkId).
		Eq("board_id", boardId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to revoke link"})
		return
	}

	c.Status(http.StatusNoContent)
}

// Verify validates the password for a link (PUBLIC - no auth required)
func Verify(c *gin.Context) {
	linkId := c.Param("linkId")

	var req VerifyPasswordReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is required"})
		return
	}

	// Fetch the link
	data, _, err := db.Client.
		From("board_access_links").
		Select("*", "", false).
		Eq("id", linkId).
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	var linkResults []map[string]interface{}
	if err := json.Unmarshal(data, &linkResults); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse link"})
		return
	}

	if len(linkResults) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	link := linkResults[0]

	// Check expiration
	if expiresAt, ok := link["expires_at"].(string); ok && expiresAt != "" {
		expTime, err := time.Parse(time.RFC3339, expiresAt)
		if err == nil && time.Now().After(expTime) {
			c.JSON(http.StatusGone, gin.H{"error": "link has expired"})
			return
		}
	}

	// Verify password
	passwordHash := getString(link, "password_hash")
	if !VerifyPassword(req.Password, passwordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid password"})
		return
	}

	boardId := getString(link, "board_id")
	role := getString(link, "role")

	c.JSON(http.StatusOK, VerifyResponse{
		BoardID: boardId,
		Role:    role,
	})
}

// GetPublicBoard fetches board data for a verified link (PUBLIC - no auth required)
func GetPublicBoard(c *gin.Context) {
	linkId := c.Param("linkId")

	// Get password from query param (sent after verification)
	password := c.Query("token")
	if password == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "token is required"})
		return
	}

	// Fetch the link
	linkData, _, err := db.Client.
		From("board_access_links").
		Select("*", "", false).
		Eq("id", linkId).
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	var linkResults []map[string]interface{}
	if err := json.Unmarshal(linkData, &linkResults); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse link"})
		return
	}

	if len(linkResults) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	link := linkResults[0]

	// Check expiration
	if expiresAt, ok := link["expires_at"].(string); ok && expiresAt != "" {
		expTime, err := time.Parse(time.RFC3339, expiresAt)
		if err == nil && time.Now().After(expTime) {
			c.JSON(http.StatusGone, gin.H{"error": "link has expired"})
			return
		}
	}

	// Verify password again
	passwordHash := getString(link, "password_hash")
	if !VerifyPassword(password, passwordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	boardId := getString(link, "board_id")
	role := getString(link, "role")

	// Fetch the board
	boardData, _, err := db.Client.
		From("board").
		Select("*", "", false).
		Eq("id", boardId).
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "board not found"})
		return
	}

	var boardResults []map[string]interface{}
	if err := json.Unmarshal(boardData, &boardResults); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse board"})
		return
	}

	if len(boardResults) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "board not found"})
		return
	}

	board := boardResults[0]

	// Fetch the latest snapshot
	snapshotData, _, err := db.Client.
		From("board_snapshots").
		Select("*", "", false).
		Eq("board_id", boardId).
		Execute()

	if err == nil {
		var snapshotResults []map[string]interface{}
		if err := json.Unmarshal(snapshotData, &snapshotResults); err == nil && len(snapshotResults) > 0 {
			snapshot := snapshotResults[0]
			if data, ok := snapshot["data"]; ok {
				board["flow_data"] = data
			}
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"board": board,
		"role":  role,
	})
}

// Helper function to check if user can manage a board
func canManageBoard(boardId, userId string) bool {
	// Check if user owns the board
	data, _, err := db.Client.
		From("board").
		Select("id", "", false).
		Eq("id", boardId).
		Eq("owner_id", userId).
		Execute()

	if err == nil {
		var boards []map[string]interface{}
		if err := json.Unmarshal(data, &boards); err == nil && len(boards) > 0 {
			return true
		}
	}

	// Check if user has editor permission
	permData, _, err := db.Client.
		From("board_permissions").
		Select("role", "", false).
		Eq("board_id", boardId).
		Eq("user_id", userId).
		Execute()

	if err == nil {
		var perms []map[string]interface{}
		if err := json.Unmarshal(permData, &perms); err == nil && len(perms) > 0 {
			if role, ok := perms[0]["role"].(string); ok && role == "editor" {
				return true
			}
		}
	}

	return false
}

func getString(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}
