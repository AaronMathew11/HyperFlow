// internal/workflows/handler.go
package workflows

import (
	"encoding/json"
	"net/http"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
)

type CreateWorkflowReq struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateWorkflowReq struct {
	Name        string                 `json:"name,omitempty"`
	Description string                 `json:"description,omitempty"`
	FlowData    map[string]interface{} `json:"flow_data,omitempty"`
}

type FlowData struct {
	Nodes       []interface{} `json:"nodes"`
	Edges       []interface{} `json:"edges"`
	FlowInputs  string        `json:"flowInputs"`
	FlowOutputs string        `json:"flowOutputs"`
}

type WorkflowResponse struct {
	ID             string   `json:"id"`
	Name           string   `json:"name"`
	Description    string   `json:"description"`
	BusinessUnitID string   `json:"business_unit_id"`
	OwnerID        string   `json:"owner_id"`
	FlowData       FlowData `json:"flow_data"`
	CreatedAt      string   `json:"created_at"`
	UpdatedAt      string   `json:"updated_at"`
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
	buId := c.Param("buId")
	var req CreateWorkflowReq
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
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to create workflow in this BU"})
			return
		}
	}

	// Create default flow data
	defaultFlowData := map[string]interface{}{
		"nodes":       []interface{}{},
		"edges":       []interface{}{},
		"flowInputs":  "",
		"flowOutputs": "",
	}
	flowDataJSON, _ := json.Marshal(defaultFlowData)

	data, _, err := db.Client.
		From("test_workflows").
		Insert(map[string]interface{}{
			"name":             req.Name,
			"description":      req.Description,
			"business_unit_id": buId,
			"flow_data":        string(flowDataJSON),
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "no workflow created"})
		return
	}

	workflow := dbResult[0]
	response := WorkflowResponse{
		ID:             getString(workflow, "id"),
		Name:           getString(workflow, "name"),
		Description:    getString(workflow, "description"),
		BusinessUnitID: getString(workflow, "business_unit_id"),
		OwnerID:        userId, // Set from the user who created this workflow
		FlowData: FlowData{
			Nodes:       []interface{}{},
			Edges:       []interface{}{},
			FlowInputs:  "",
			FlowOutputs: "",
		},
		CreatedAt: getString(workflow, "created_at"),
		UpdatedAt: getString(workflow, "updated_at"),
	}

	c.JSON(http.StatusCreated, response)
}

func List(c *gin.Context) {
	buId := c.Param("buId")
	userId := c.GetString("userId")

	// Verify user owns the client that contains this BU or has access to the BU
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
		// Check if user has permission
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
		From("test_workflows").
		Select("*", "", false).
		Eq("business_unit_id", buId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var workflows []map[string]interface{}
	if err := json.Unmarshal(data, &workflows); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse workflows"})
		return
	}

	c.JSON(http.StatusOK, workflows)
}

func Get(c *gin.Context) {
	workflowId := c.Param("id")

	data, _, err := db.Client.
		From("test_workflows").
		Select("*", "", false).
		Eq("id", workflowId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "workflow not found"})
		return
	}

	var result map[string]interface{}
	if err := json.Unmarshal(data, &result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse response"})
		return
	}

	c.JSON(http.StatusOK, result)
}

func Update(c *gin.Context) {
	workflowId := c.Param("id")
	userId := c.GetString("userId")

	var req UpdateWorkflowReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Build update map
	updates := make(map[string]interface{})
	if req.Name != "" {
		updates["name"] = req.Name
	}
	if req.Description != "" {
		updates["description"] = req.Description
	}
	if req.FlowData != nil {
		flowDataJSON, _ := json.Marshal(req.FlowData)
		updates["flow_data"] = string(flowDataJSON)
	}

	if len(updates) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no updates provided"})
		return
	}

	// First get the workflow to check ownership or BU access
	workflowData, _, err := db.Client.
		From("test_workflows").
		Select("owner_id, business_unit_id", "", false).
		Eq("id", workflowId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "workflow not found"})
		return
	}

	var workflow map[string]interface{}
	json.Unmarshal(workflowData, &workflow)

	ownerId := getString(workflow, "owner_id")
	buId := getString(workflow, "business_unit_id")

	// Check if user owns the workflow
	if ownerId != userId {
		// Check if user has editor access to the BU
		_, _, permErr := db.Client.
			From("test_bu_permissions").
			Select("id", "", false).
			Eq("business_unit_id", buId).
			Eq("user_id", userId).
			Eq("role", "editor").
			Single().
			Execute()

		if permErr != nil {
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to update this workflow"})
			return
		}
	}

	_, _, err = db.Client.
		From("test_workflows").
		Update(updates, "", "").
		Eq("id", workflowId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "workflow updated"})
}

func Delete(c *gin.Context) {
	workflowId := c.Param("id")
	userId := c.GetString("userId")

	// First get the workflow to check business unit
	workflowData, _, err := db.Client.
		From("test_workflows").
		Select("business_unit_id", "", false).
		Eq("id", workflowId).
		Single().
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "workflow not found"})
		return
	}

	var workflow map[string]interface{}
	json.Unmarshal(workflowData, &workflow)
	buId := getString(workflow, "business_unit_id")

	// Check if user has access via client ownership or BU permissions
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

	var businessUnit map[string]interface{}
	json.Unmarshal(buData, &businessUnit)
	clientId := getString(businessUnit, "client_id")

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
			c.JSON(http.StatusForbidden, gin.H{"error": "not authorized to delete this workflow"})
			return
		}
	}

	_, _, err = db.Client.
		From("test_workflows").
		Delete("", "").
		Eq("id", workflowId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to delete workflow"})
		return
	}

	c.Status(http.StatusNoContent)
}
