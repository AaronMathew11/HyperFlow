package versions

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"hypervision_backend/internal/db"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/postgrest-go"
)

type PublishReq struct {
	VersionNumber  string `json:"version_number"`
	VersionDetails string `json:"version_details"`
}

// Publish creates a new published version from the current workflow snapshot
func Publish(c *gin.Context) {
	workflowId := c.Param("id")
	userId := c.GetString("userId")

	if !canWriteWorkflow(workflowId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	var req PublishReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.VersionNumber == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "version_number is required"})
		return
	}

	// Get current snapshot
	wfData, _, err := db.Client.
		From("test_workflows").
		Select("flow_data, flow_type", "", false).
		Eq("id", workflowId).
		Execute()

	fmt.Printf("[versions] fetch workflow: err=%v data=%s\n", err, string(wfData))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch workflow: " + err.Error()})
		return
	}

	var workflows []map[string]interface{}
	if err := json.Unmarshal(wfData, &workflows); err != nil || len(workflows) == 0 {
		fmt.Printf("[versions] workflow parse error or empty: err=%v len=%d\n", err, len(workflows))
		c.JSON(http.StatusNotFound, gin.H{"error": "workflow not found"})
		return
	}

	wf := workflows[0]
	flowDataStr, _ := wf["flow_data"].(string)
	flowType, _ := wf["flow_type"].(string)

	now := time.Now().UTC().Format(time.RFC3339)

	versionInsert := map[string]interface{}{
		"workflow_id":     workflowId,
		"version_number":  req.VersionNumber,
		"version_details": req.VersionDetails,
		"flow_data":       flowDataStr,
		"flow_type":       flowType,
		"published_by":    userId,
		"published_at":    now,
		"created_at":      now,
	}

	fmt.Printf("[versions] inserting version: workflow_id=%s version_number=%s\n", workflowId, req.VersionNumber)

	vData, _, err := db.Client.
		From("workflow_versions").
		Insert(versionInsert, false, "", "", "").
		Execute()

	fmt.Printf("[versions] insert result: err=%v data=%s\n", err, string(vData))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to create version: " + err.Error()})
		return
	}

	var versionResults []map[string]interface{}
	if err := json.Unmarshal(vData, &versionResults); err != nil || len(versionResults) == 0 {
		fmt.Printf("[versions] parse error or empty: err=%v len=%d\n", err, len(versionResults))
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to parse version result"})
		return
	}

	versionId := getString(versionResults[0], "id")
	fmt.Printf("[versions] created version id=%s, updating active_published_version_id\n", versionId)

	// Set as active published version
	updateData, _, err := db.Client.
		From("test_workflows").
		Update(map[string]interface{}{
			"active_published_version_id": versionId,
		}, "", "").
		Eq("id", workflowId).
		Execute()

	fmt.Printf("[versions] update active version: err=%v data=%s\n", err, string(updateData))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to set active version: " + err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"id":              versionId,
		"version_number":  req.VersionNumber,
		"version_details": req.VersionDetails,
		"published_at":    now,
		"message":         "published successfully",
	})
}

// ListVersions returns all published versions for a workflow
func ListVersions(c *gin.Context) {
	workflowId := c.Param("id")
	userId := c.GetString("userId")

	if !canWriteWorkflow(workflowId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	data, _, err := db.Client.
		From("workflow_versions").
		Select("id, workflow_id, version_number, version_details, flow_type, published_by, published_at, created_at", "", false).
		Eq("workflow_id", workflowId).
		Order("published_at", &postgrest.OrderOpts{Ascending: false}).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var vers []map[string]interface{}
	if err := json.Unmarshal(data, &vers); err != nil {
		vers = []map[string]interface{}{}
	}

	// Get active version id from workflow
	wfData, _, _ := db.Client.
		From("test_workflows").
		Select("active_published_version_id", "", false).
		Eq("id", workflowId).
		Execute()

	var wfs []map[string]interface{}
	activeVersionId := ""
	if json.Unmarshal(wfData, &wfs) == nil && len(wfs) > 0 {
		activeVersionId, _ = wfs[0]["active_published_version_id"].(string)
	}

	c.JSON(http.StatusOK, gin.H{
		"versions":          vers,
		"active_version_id": activeVersionId,
	})
}

// GetVersion returns a specific version's full data including flow_data
func GetVersion(c *gin.Context) {
	workflowId := c.Param("id")
	versionId := c.Param("versionId")
	userId := c.GetString("userId")

	if !canWriteWorkflow(workflowId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	data, _, err := db.Client.
		From("workflow_versions").
		Select("*", "", false).
		Eq("id", versionId).
		Eq("workflow_id", workflowId).
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "version not found"})
		return
	}

	var vers []map[string]interface{}
	if err := json.Unmarshal(data, &vers); err != nil || len(vers) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "version not found"})
		return
	}

	version := vers[0]

	// Parse flow_data from string to object
	var flowData map[string]interface{}
	if fdStr, ok := version["flow_data"].(string); ok && fdStr != "" {
		json.Unmarshal([]byte(fdStr), &flowData)
	} else if fd, ok := version["flow_data"].(map[string]interface{}); ok {
		flowData = fd
	}

	c.JSON(http.StatusOK, gin.H{
		"id":              version["id"],
		"workflow_id":     version["workflow_id"],
		"version_number":  version["version_number"],
		"version_details": version["version_details"],
		"flow_type":       version["flow_type"],
		"published_by":    version["published_by"],
		"published_at":    version["published_at"],
		"flow_data":       flowData,
	})
}

// SetActiveVersion sets an existing published version as the active one visible to customers
func SetActiveVersion(c *gin.Context) {
	workflowId := c.Param("id")
	versionId := c.Param("versionId")
	userId := c.GetString("userId")

	if !canWriteWorkflow(workflowId, userId) {
		c.JSON(http.StatusForbidden, gin.H{"error": "not authorized"})
		return
	}

	// Verify version belongs to this workflow
	data, _, err := db.Client.
		From("workflow_versions").
		Select("id", "", false).
		Eq("id", versionId).
		Eq("workflow_id", workflowId).
		Execute()

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "version not found"})
		return
	}

	var vers []map[string]interface{}
	if err := json.Unmarshal(data, &vers); err != nil || len(vers) == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "version not found"})
		return
	}

	_, _, err = db.Client.
		From("test_workflows").
		Update(map[string]interface{}{
			"active_published_version_id": versionId,
		}, "", "").
		Eq("id", workflowId).
		Execute()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update active version"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "active version updated"})
}

func canWriteWorkflow(workflowId, userId string) bool {
	fmt.Printf("[versions] canWriteWorkflow: workflowId=%s userId=%s\n", workflowId, userId)

	wfData, _, err := db.Client.
		From("test_workflows").
		Select("business_unit_id", "", false).
		Eq("id", workflowId).
		Execute()

	fmt.Printf("[versions] test_workflows query: err=%v data=%s\n", err, string(wfData))

	if err != nil {
		return false
	}

	var wfs []map[string]interface{}
	if err := json.Unmarshal(wfData, &wfs); err != nil || len(wfs) == 0 {
		fmt.Printf("[versions] no workflow found\n")
		return false
	}

	buId, _ := wfs[0]["business_unit_id"].(string)
	fmt.Printf("[versions] buId=%s\n", buId)

	buResult, _, buErr := db.Client.
		From("test_business_units").
		Select("client_id", "", false).
		Eq("id", buId).
		Execute()

	fmt.Printf("[versions] test_business_units query: err=%v data=%s\n", buErr, string(buResult))

	var bus []map[string]interface{}
	if json.Unmarshal(buResult, &bus) == nil && len(bus) > 0 {
		clientId, _ := bus[0]["client_id"].(string)
		fmt.Printf("[versions] clientId=%s\n", clientId)

		clientResult, _, clientErr := db.Client.
			From("test_clients").
			Select("id", "", false).
			Eq("id", clientId).
			Eq("owner_id", userId).
			Execute()

		fmt.Printf("[versions] test_clients query: err=%v data=%s\n", clientErr, string(clientResult))

		var clients []map[string]interface{}
		if json.Unmarshal(clientResult, &clients) == nil && len(clients) > 0 {
			fmt.Printf("[versions] access granted via client ownership\n")
			return true
		}
	}

	permResult, _, permErr := db.Client.
		From("test_bu_permissions").
		Select("id", "", false).
		Eq("business_unit_id", buId).
		Eq("user_id", userId).
		Eq("role", "editor").
		Execute()

	fmt.Printf("[versions] test_bu_permissions query: err=%v data=%s\n", permErr, string(permResult))

	var perms []map[string]interface{}
	granted := json.Unmarshal(permResult, &perms) == nil && len(perms) > 0
	fmt.Printf("[versions] access granted via BU permission: %v\n", granted)
	return granted
}

func getString(m map[string]interface{}, key string) string {
	if val, ok := m[key]; ok {
		if str, ok := val.(string); ok {
			return str
		}
	}
	return ""
}
