// internal/clients/handler.go
package clients

import (
	"encoding/json"
	"fmt"
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateClientReq struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ClientResponse struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
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
	var req CreateClientReq
	if err := c.ShouldBindJSON(&req); err != nil {
		fmt.Println("DEBUG: Failed to bind JSON:", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := c.GetString("userId")
	fmt.Println("DEBUG: Creating client for userId:", userId)
	fmt.Println("DEBUG: Request name:", req.Name, "description:", req.Description)

	insertData := map[string]interface{}{
		"name":        req.Name,
		"owner_id":    userId,
		"description": req.Description,
	}
	fmt.Printf("DEBUG: Insert data: %+v\n", insertData)

	data, count, err := db.Client.
		From("test_clients").
		Insert(insertData, false, "", "", "").
		Execute()

	fmt.Println("DEBUG: Insert response data:", string(data))
	fmt.Println("DEBUG: Insert response count:", count)

	if err != nil {
		fmt.Println("DEBUG: Insert error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "userId": userId})
		return
	}

	var dbResult []map[string]interface{}
	if err := json.Unmarshal(data, &dbResult); err != nil {
		fmt.Println("DEBUG: JSON unmarshal error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response", "raw": string(data)})
		return
	}

	if len(dbResult) == 0 {
		fmt.Println("DEBUG: No results returned")
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no client created", "raw": string(data)})
		return
	}

	client := dbResult[0]
	response := ClientResponse{
		ID:          getString(client, "id"),
		Name:        getString(client, "name"),
		Description: getString(client, "description"),
		OwnerID:     getString(client, "owner_id"),
		CreatedAt:   getString(client, "created_at"),
		UpdatedAt:   getString(client, "updated_at"),
	}

	fmt.Printf("DEBUG: Success! Created client: %+v\n", response)
	c.JSON(http.StatusCreated, response)
}

func List(c *gin.Context) {
	userId := c.GetString("userId")
	fmt.Println("DEBUG: Listing clients for userId:", userId)

	data, _, err := db.Client.
		From("test_clients").
		Select("*", "", false).
		Eq("owner_id", userId).
		Execute()

	fmt.Println("DEBUG: List response:", string(data))

	if err != nil {
		fmt.Println("DEBUG: List error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var clients []map[string]interface{}
	if err := json.Unmarshal(data, &clients); err != nil {
		fmt.Println("DEBUG: JSON unmarshal error:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse clients"})
		return
	}

	c.JSON(http.StatusOK, clients)
}

func Get(c *gin.Context) {
	clientId := c.Param("id")
	userId := c.GetString("userId")

	data, _, err := db.Client.
		From("test_clients").
		Select("*", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "client not found"})
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
	clientId := c.Param("id")
	userId := c.GetString("userId")

	_, _, err := db.Client.
		From("test_clients").
		Delete("", "").
		Eq("id", clientId).
		Eq("owner_id", userId).
		Execute()

	if err != nil {
		c.JSON(http.StatusForbidden, gin.H{"error": "not allowed"})
		return
	}

	c.Status(http.StatusNoContent)
}
