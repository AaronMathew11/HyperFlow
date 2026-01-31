// internal/businessunits/handler.go
package businessunits

import (
	"encoding/json"
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateBUReq struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ShareBUReq struct {
	UserID string `json:"user_id"`
	Role   string `json:"role"` // "viewer" or "editor"
}

type BUResponse struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ClientID    string `json:"client_id"`
	OwnerID     string `json:"owner_id"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

func getString(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func Create(c *gin.Context) {
	clientId := c.Param("clientId")
	var req CreateBUReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := c.GetString("userId")

	// Verify user owns the client
	_, _, err := db.Client.
		From("test_clients").
		Select("id", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to create BU in this client"})
		return
	}

	data, _, err := db.Client.
		From("test_business_units").
		Insert(map[string]interface{}{
			"name":        req.Name,
			"description": req.Description,
			"client_id":   clientId,
			"owner_id":    userId,
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no business unit created"})
		return
	}

	bu := dbResult[0]
	response := BUResponse{
		ID:          getString(bu, "id"),
		Name:        getString(bu, "name"),
		Description: getString(bu, "description"),
		ClientID:    getString(bu, "client_id"),
		OwnerID:     getString(bu, "owner_id"),
		CreatedAt:   getString(bu, "created_at"),
		UpdatedAt:   getString(bu, "updated_at"),
	}

	c.JSON(http.StatusCreated, response)
}

func List(c *gin.Context) {
	clientId := c.Param("clientId")
	userId := c.GetString("userId")

	// Verify user owns the client
	_, _, err := db.Client.
		From("test_clients").
		Select("id", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	// Get owned BUs in this client
	data, _, err := db.Client.
		From("test_business_units").
		Select("*", "", false).
		Eq("client_id", clientId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var businessUnits []map[string]interface{}
	if err := json.Unmarshal(data, &businessUnits); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse business units"})
		return
	}

	c.JSON(http.StatusOK, businessUnits)
}

func Get(c *gin.Context) {
	buId := c.Param("buId")

	data, _, err := db.Client.
		From("test_business_units").
		Select("*", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "business unit not found"})
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
	buId := c.Param("buId")
	userId := c.GetString("userId")

	_, _, err := db.Client.
		From("test_business_units").
		Delete("", "").
		Eq("id", buId).
		Eq("owner_id", userId).
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not allowed"})
		return
	}

	c.Status(http.StatusNoContent)
}

// Share a business unit with another user
func Share(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	var req ShareBUReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Verify user owns the BU
	_, _, err := db.Client.
		From("test_business_units").
		Select("id", "", false).
		Eq("id", buId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to share this BU"})
		return
	}

	// Validate role
	if req.Role != "viewer" && req.Role != "editor" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "role must be 'viewer' or 'editor'"})
		return
	}

	data, _, err := db.Client.
		From("test_bu_permissions").
		Insert(map[string]interface{}{
			"business_unit_id": buId,
			"user_id":          req.UserID,
			"role":             req.Role,
		}, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var dbResult []map[string]interface{}
	json.Unmarshal(data, &dbResult)

	c.JSON(http.StatusCreated, gin.H{"message": "BU shared successfully"})
}

// List collaborators for a business unit
func ListCollaborators(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	// Verify user owns the BU
	_, _, err := db.Client.
		From("test_business_units").
		Select("id", "", false).
		Eq("id", buId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	data, _, err := db.Client.
		From("test_bu_permissions").
		Select("*", "", false).
		Eq("business_unit_id", buId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var collaborators []map[string]interface{}
	if err := json.Unmarshal(data, &collaborators); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse collaborators"})
		return
	}

	c.JSON(http.StatusOK, collaborators)
}

// Remove a collaborator from a business unit
func RemoveCollaborator(c *gin.Context) {
	buId := c.Param("buId")
	targetUserId := c.Param("userId")
	userId := c.GetString("userId")

	// Verify user owns the BU
	_, _, err := db.Client.
		From("test_business_units").
		Select("id", "", false).
		Eq("id", buId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	_, _, err = db.Client.
		From("test_bu_permissions").
		Delete("", "").
		Eq("business_unit_id", buId).
		Eq("user_id", targetUserId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusNoContent)
}
