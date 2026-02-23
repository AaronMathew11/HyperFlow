package buaccesslinks

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"hypervision_backend/internal/accesslinks"
	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateLinkReq struct {
	ExpiresIn *int `json:"expiresIn"` // Optional: hours until expiration
}

type CreateLinkResponse struct {
	LinkID    string  `json:"linkId"`
	Password  string  `json:"password"` // Plain text - returned ONCE
	ExpiresAt *string `json:"expiresAt"`
	ShareURL  string  `json:"shareUrl"`
}

type BUAccessLink struct {
	ID             string  `json:"id"`
	BusinessUnitID string  `json:"business_unit_id"`
	ExpiresAt      *string `json:"expires_at"`
	CreatedAt      string  `json:"created_at"`
}

type VerifyReq struct {
	Password string `json:"password"`
}

type VerifyResponse struct {
	BusinessUnitID   string `json:"businessUnitId"`
	BusinessUnitName string `json:"businessUnitName"`
}

func getString(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}

func getMap(m map[string]interface{}, key string) map[string]interface{} {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			var result map[string]interface{}
			if err := json.Unmarshal([]byte(str), &result); err == nil {
				return result
			}
		}
		if mp, ok := val.(map[string]interface{}); ok {
			return mp
		}
	}
	return nil
}

// Create generates a new shareable link for a BU with password protection
func Create(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	// Verify user has access to this BU (owner of parent client or has editor permission)
	if !canManageBU(buId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to create link for this BU"})
		return
	}

	var req CreateLinkReq
	c.ShouldBindJSON(&req)

	// Generate random password
	password, err := accesslinks.GeneratePassword(12)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to generate password"})
		return
	}

	// Hash the password
	passwordHash, err := accesslinks.HashPassword(password)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to hash password"})
		return
	}

	// Prepare insert
	insertData := map[string]interface{}{
		"business_unit_id": buId,
		"password_hash":    passwordHash,
		"created_by":       userId,
	}

	var expiresAt *string
	if req.ExpiresIn != nil && *req.ExpiresIn > 0 {
		expTime := time.Now().Add(time.Duration(*req.ExpiresIn) * time.Hour)
		expStr := expTime.Format(time.RFC3339)
		expiresAt = &expStr
		insertData["expires_at"] = expStr
	}

	data, _, err := db.Client.
		From("test_bu_access_links").
		Insert(insertData, false, "", "", "").
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create link: " + err.Error()})
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
	shareURL := frontendURL + "/customer/login/" + linkId

	c.JSON(http.StatusCreated, CreateLinkResponse{
		LinkID:    linkId,
		Password:  password,
		ExpiresAt: expiresAt,
		ShareURL:  shareURL,
	})
}

// List returns all access links for a BU
func List(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	if !canManageBU(buId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	data, _, err := db.Client.
		From("test_bu_access_links").
		Select("id, business_unit_id, expires_at, created_at", "", false).
		Eq("business_unit_id", buId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var links []BUAccessLink
	if err := json.Unmarshal(data, &links); err != nil {
		c.JSON(http.StatusOK, []BUAccessLink{})
		return
	}

	c.JSON(http.StatusOK, links)
}

// Revoke deletes an access link
func Revoke(c *gin.Context) {
	buId := c.Param("buId")
	linkId := c.Param("linkId")
	userId := c.GetString("userId")

	if !canManageBU(buId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	_, _, err := db.Client.
		From("test_bu_access_links").
		Delete("", "").
		Eq("id", linkId).
		Eq("business_unit_id", buId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to revoke link"})
		return
	}

	c.Status(http.StatusNoContent)
}

// Verify validates password for a BU link (PUBLIC - no auth required)
func Verify(c *gin.Context) {
	linkId := c.Param("linkId")

	var req VerifyReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password is required"})
		return
	}

	// Fetch the link
	data, _, err := db.Client.
		From("test_bu_access_links").
		Select("*, test_business_units(name)", "", false).
		Eq("id", linkId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	var link map[string]interface{}
	if err := json.Unmarshal(data, &link); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse link"})
		return
	}

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
	if !accesslinks.VerifyPassword(req.Password, passwordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid password"})
		return
	}

	buId := getString(link, "business_unit_id")
	buName := ""
	if bu, ok := link["test_business_units"].(map[string]interface{}); ok {
		buName = getString(bu, "name")
	}

	c.JSON(http.StatusOK, VerifyResponse{
		BusinessUnitID:   buId,
		BusinessUnitName: buName,
	})
}

// GetPublicBUData fetches all BU data for a verified link (PUBLIC - no auth required)
func GetPublicBUData(c *gin.Context) {
	linkId := c.Param("linkId")

	// Get password from query param
	token := c.Query("token")
	if token == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "token is required"})
		return
	}

	// Fetch and validate link
	linkData, _, err := db.Client.
		From("test_bu_access_links").
		Select("*, test_business_units(id, name, description)", "", false).
		Eq("id", linkId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "link not found"})
		return
	}

	var link map[string]interface{}
	if err := json.Unmarshal(linkData, &link); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse link"})
		return
	}

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
	if !accesslinks.VerifyPassword(token, passwordHash) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
		return
	}

	buId := getString(link, "business_unit_id")

	// Get BU info
	buInfo := map[string]interface{}{}
	if bu, ok := link["test_business_units"].(map[string]interface{}); ok {
		buInfo = bu
	}

	// Fetch environments for this BU
	envData, _, err := db.Client.
		From("test_environments").
		Select("*", "", false).
		Eq("business_unit_id", buId).
		Execute()

	var environments []map[string]interface{}
	if err == nil {
		json.Unmarshal(envData, &environments)
	}

	// Parse variables JSON for each environment
	for i, env := range environments {
		if varsStr, ok := env["variables"].(string); ok {
			var vars map[string]interface{}
			if err := json.Unmarshal([]byte(varsStr), &vars); err == nil {
				environments[i]["variables"] = vars
			}
		}
	}

	// Fetch workflows for this BU
	wfData, _, err := db.Client.
		From("test_workflows").
		Select("*", "", false).
		Eq("business_unit_id", buId).
		Execute()

	var workflows []map[string]interface{}
	if err == nil {
		json.Unmarshal(wfData, &workflows)
	}

	// Parse flow_data JSON for each workflow
	for i, wf := range workflows {
		if fdStr, ok := wf["flow_data"].(string); ok {
			var fd map[string]interface{}
			if err := json.Unmarshal([]byte(fdStr), &fd); err == nil {
				workflows[i]["flow_data"] = fd
			}
		}
	}

	// Fetch workflow-environment relationships
	weData, _, err := db.Client.
		From("test_workflow_environments").
		Select("*", "", false).
		Execute()

	var workflowEnvs []map[string]interface{}
	if err == nil {
		json.Unmarshal(weData, &workflowEnvs)
	}

	// Filter to only relationships within this BU's environments
	envIDs := make(map[string]bool)
	for _, env := range environments {
		if id, ok := env["id"].(string); ok {
			envIDs[id] = true
		}
	}

	var filteredWEs []map[string]interface{}
	for _, we := range workflowEnvs {
		if envId, ok := we["environment_id"].(string); ok && envIDs[envId] {
			// Parse flow_data_override if string
			if fdStr, ok := we["flow_data_override"].(string); ok && fdStr != "" {
				var fd map[string]interface{}
				if err := json.Unmarshal([]byte(fdStr), &fd); err == nil {
					we["flow_data_override"] = fd
				}
			}
			filteredWEs = append(filteredWEs, we)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"businessUnit":         buInfo,
		"environments":         environments,
		"workflows":            workflows,
		"workflowEnvironments": filteredWEs,
	})
}

// canManageBU checks if user owns the parent client or has editor access to the BU
func canManageBU(buId, userId string) bool {
	// Get BU's client
	buData, _, err := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err != nil {
		return false
	}

	var bu map[string]interface{}
	json.Unmarshal(buData, &bu)
	clientId := getString(bu, "client_id")

	// Check if user owns the client
	_, _, clientErr := db.Client.
		From("test_clients").
		Select("id", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if clientErr == nil {
		return true
	}

	// Check if user has editor permission on BU
	_, _, permErr := db.Client.
		From("test_bu_permissions").
		Select("id", "", false).
		Eq("business_unit_id", buId).
		Eq("user_id", userId).
		Eq("role", "editor").
		Single().
		Execute()

	return permErr == nil
}
