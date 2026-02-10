package auth

import (
	"os"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/supabase-community/supabase-go"
)

func RequireAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing auth header"})
			return
		}

		token := strings.TrimPrefix(authHeader, "Bearer ")

		client, err := supabase.NewClient(
			os.Getenv("SUPABASE_URL"),
			os.Getenv("SUPABASE_ANON_KEY"), // ✅ IMPORTANT
			nil,
		)
		if err != nil {
			c.AbortWithStatusJSON(500, gin.H{"error": "failed to init supabase"})
			return
		}

		user, err := client.Auth.WithToken(token).GetUser()
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid supabase jwt"})
			return
		}

		c.Set("userId", user.ID.String())
		c.Set("email", user.Email)
		c.Set("name", user.UserMetadata["name"])

		c.Next()
	}
}
