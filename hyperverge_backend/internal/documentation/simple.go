package documentation

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// Temporary simple handlers until we fix the build issue

func GetAll(c *gin.Context) {
	// Return empty array for now
	c.JSON(http.StatusOK, []interface{}{})
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