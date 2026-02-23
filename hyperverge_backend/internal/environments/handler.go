// internal/environments/handler.go
package environments

import (
	"encoding/json"
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
)

type EnvironmentReq struct {
	Name            string                 `json:"name"`
	Description     string                 `json:"description"`
	IntegrationType string                 `json:"integration_type"` // api, sdk
	Variables       map[string]interface{} `json:"variables"`
}

type EnvironmentResponse struct {
	ID              string                 `json:"id"`
	Name            string                 `json:"name"`
	Description     string                 `json:"description"`
	IntegrationType string                 `json:"integration_type"`
	Variables       map[string]interface{} `json:"variables"`
	BusinessUnitID  string                 `json:"business_unit_id"`
	OwnerID         string                 `json:"owner_id"`
	CreatedAt       string                 `json:"created_at"`
	UpdatedAt       string                 `json:"updated_at"`
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
		// Handle JSON string stored in DB
		if str, ok := val.(string); ok {
			var result map[string]interface{}
			if err := json.Unmarshal([]byte(str), &result); err == nil {
				return result
			}
		}
		// Handle map directly
		if mp, ok := val.(map[string]interface{}); ok {
			return mp
		}
	}
	return make(map[string]interface{})
}

func toResponse(env map[string]interface{}) EnvironmentResponse {
	return EnvironmentResponse{
		ID:              getString(env, "id"),
		Name:            getString(env, "name"),
		Description:     getString(env, "description"),
		IntegrationType: getString(env, "integration_type"),
		Variables:       getMap(env, "variables"),
		BusinessUnitID:  getString(env, "business_unit_id"),
		OwnerID:         getString(env, "owner_id"),
		CreatedAt:       getString(env, "created_at"),
		UpdatedAt:       getString(env, "updated_at"),
	}
}

func Create(c *gin.Context) {
	buId := c.Param("buId")
	var req EnvironmentReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId := c.GetString("userId")

	// Verify user owns the client that contains this BU or has editor access to the BU
	buData, _, err := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "business unit not found"})
		return
	}

	var buResult map[string]interface{}
	json.Unmarshal(buData, &buResult)
	clientId := getString(buResult, "client_id")

	// Check if user owns the client
	_, _, clientErr := db.Client.
		From("test_clients").
		Select("id", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if clientErr != nil {
		// Check if user has editor permission
		_, _, permErr := db.Client.
			From("test_bu_permissions").
			Select("id", "", false).
			Eq("business_unit_id", buId).
			Eq("user_id", userId).
			Eq("role", "editor").
			Single().
			Execute()

		if permErr != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to create environment in this BU"})
			return
		}
	}

	// Prepare JSON fields
	variablesJSON, _ := json.Marshal(req.Variables)
	if req.Variables == nil {
		variablesJSON = []byte("{}")
	}

	data, _, err := db.Client.
		From("test_environments").
		Insert(map[string]interface{}{
			"name":             req.Name,
			"description":      req.Description,
			"integration_type": req.IntegrationType,
			"variables":        string(variablesJSON),
			"business_unit_id": buId,
			"owner_id":         userId,
		}, false, "", "", "representation").
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no environment created"})
		return
	}

	c.JSON(http.StatusCreated, toResponse(dbResult[0]))
}

func List(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	// Verify user access
	buData, _, err := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "business unit not found"})
		return
	}

	var buResult map[string]interface{}
	json.Unmarshal(buData, &buResult)
	clientId := getString(buResult, "client_id")

	// Check ownership or permissions
	_, _, clientErr := db.Client.
		From("test_clients").
		Select("id", "", false).
		Eq("id", clientId).
		Eq("owner_id", userId).
		Single().
		Execute()

	if clientErr != nil {
		_, _, permErr := db.Client.
			From("test_bu_permissions").
			Select("id", "", false).
			Eq("business_unit_id", buId).
			Eq("user_id", userId).
			Single().
			Execute()

		if permErr != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
			return
		}
	}

	data, _, err := db.Client.
		From("test_environments").
		Select("*", "", false).
		Eq("business_unit_id", buId).
		Order("created_at", &postgrest.OrderOpts{Ascending: false}).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var environments []map[string]interface{}
	if err := json.Unmarshal(data, &environments); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse environments"})
		return
	}

	// Transform for response
	var response []EnvironmentResponse
	for _, env := range environments {
		response = append(response, toResponse(env))
	}

	c.JSON(http.StatusOK, response)
}

func Get(c *gin.Context) {
	envId := c.Param("id")

	data, _, err := db.Client.
		From("test_environments").
		Select("*", "", false).
		Eq("id", envId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "environment not found"})
		return
	}

	var env map[string]interface{}
	if err := json.Unmarshal(data, &env); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response"})
		return
	}

	c.JSON(http.StatusOK, toResponse(env))
}

func Update(c *gin.Context) {
	envId := c.Param("id")
	userId := c.GetString("userId")

	var req map[string]interface{}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// First get environment to check access
	envData, _, err := db.Client.
		From("test_environments").
		Select("business_unit_id", "", false).
		Eq("id", envId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "environment not found"})
		return
	}

	var env map[string]interface{}
	json.Unmarshal(envData, &env)
	buId := getString(env, "business_unit_id")

	// Check permissions (reusing logic: checks owner or editor)
	buData, _, err := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err == nil {
		var buResult map[string]interface{}
		json.Unmarshal(buData, &buResult)
		clientId := getString(buResult, "client_id")

		_, _, clientErr := db.Client.
			From("test_clients").
			Select("id", "", false).
			Eq("id", clientId).
			Eq("owner_id", userId).
			Single().
			Execute()

		if clientErr != nil {
			_, _, permErr := db.Client.
				From("test_bu_permissions").
				Select("id", "", false).
				Eq("business_unit_id", buId).
				Eq("user_id", userId).
				Eq("role", "editor").
				Single().
				Execute()

			if permErr != nil {
				c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to update environment"})
				return
			}
		}
	}

	// Handle special fields
	if variables, ok := req["variables"]; ok {
		variablesJSON, _ := json.Marshal(variables)
		req["variables"] = string(variablesJSON)
	}

	_, _, err = db.Client.
		From("test_environments").
		Update(req, "", "").
		Eq("id", envId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "environment updated"})
}

func Delete(c *gin.Context) {
	envId := c.Param("id")
	userId := c.GetString("userId")

	// Get environment to check permissions
	envData, _, err := db.Client.
		From("test_environments").
		Select("business_unit_id", "", false).
		Eq("id", envId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "environment not found"})
		return
	}

	var env map[string]interface{}
	json.Unmarshal(envData, &env)
	buId := getString(env, "business_unit_id")

	// Check permissions
	buData, _, err := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Single().
		Execute()

	if err == nil {
		var buResult map[string]interface{}
		json.Unmarshal(buData, &buResult)
		clientId := getString(buResult, "client_id")

		_, _, clientErr := db.Client.
			From("test_clients").
			Select("id", "", false).
			Eq("id", clientId).
			Eq("owner_id", userId).
			Single().
			Execute()

		if clientErr != nil {
			_, _, permErr := db.Client.
				From("test_bu_permissions").
				Select("id", "", false).
				Eq("business_unit_id", buId).
				Eq("user_id", userId).
				Eq("role", "editor").
				Single().
				Execute()

			if permErr != nil {
				c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to delete environment"})
				return
			}
		}
	}

	_, _, err = db.Client.
		From("test_environments").
		Delete("", "").
		Eq("id", envId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete environment"})
		return
	}

	c.Status(http.StatusNoContent)
}
