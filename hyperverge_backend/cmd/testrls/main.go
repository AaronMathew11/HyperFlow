package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load(".env")
	url := os.Getenv("SUPABASE_URL") + "/rest/v1/api_documentation_new?limit=1"
	key := strings.TrimSpace(os.Getenv("SUPABASE_SERVICE_ROLE_KEY"))
	
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Set("apikey", key)
	req.Header.Set("Authorization", "Bearer "+key)

	client := &http.Client{}
	resp, _ := client.Do(req)
	
	b, _ := io.ReadAll(resp.Body)
	fmt.Println("Service Role Key Length:", len(key))
	fmt.Println(resp.StatusCode, string(b))
}
