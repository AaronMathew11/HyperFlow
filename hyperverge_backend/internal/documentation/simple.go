package documentation

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"../../internal/db"
)

// ModuleDocumentation represents the module_documentation_new table structure
type ModuleDocumentation struct {
	ID          string `json:"id" db:"id"`
	Name        string `json:"name" db:"name"`
	Description string `json:"description" db:"description"`
	Category    string `json:"category" db:"category"`
	Color       string `json:"color" db:"color"`
	Icon        string `json:"icon" db:"icon"`
	CSPUrls     []string `json:"csp_urls" db:"csp_urls"`
	IPAddresses []string `json:"ip_addresses" db:"ip_addresses"`
}

func GetAll(c *gin.Context) {
	var modules []ModuleDocumentation
	
	// Query the module_documentation_new table
	err := db.ServiceClient.DB.From("module_documentation_new").Select("*").Execute(&modules)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch module documentation"})
		return
	}

	c.JSON(http.StatusOK, modules)
}

func GetByID(c *gin.Context) {
	c.JSON(http.StatusNotFound, gin.H{"error": "Documentation not found"})
}

func Create(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"error": "Not implemented yet"})
}

func Update(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"error": "Not implemented yet"})
}

func Delete(c *gin.Context) {
	c.JSON(http.StatusNotImplemented, gin.H{"error": "Not implemented yet"})
}

func Search(c *gin.Context) {
	c.JSON(http.StatusOK, []interface{}{})
}