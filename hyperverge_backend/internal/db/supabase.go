package db

import (
	"log"
	"os"

	supabase "github.com/supabase-community/supabase-go"
)

var Client *supabase.Client
var ServiceClient *supabase.Client

func Init() {
	url := os.Getenv("SUPABASE_URL")
	anonKey := os.Getenv("SUPABASE_ANON_KEY")
	serviceKey := os.Getenv("SUPABASE_SERVICE_ROLE_KEY")

	if url == "" || anonKey == "" {
		log.Fatal("SUPABASE_URL or SUPABASE_ANON_KEY not set")
	}

	// Create anonymous client for authenticated requests (with RLS)
	client, err := supabase.NewClient(url, anonKey, nil)
	if err != nil {
		log.Fatalf("failed to create supabase client: %v", err)
	}

	Client = client
	log.Println("Supabase client initialized")

	// Create service role client for direct database access (bypasses RLS)
	if serviceKey != "" {
		serviceClient, err := supabase.NewClient(url, serviceKey, nil)
		if err != nil {
			log.Fatalf("failed to create supabase service client: %v", err)
		}
		ServiceClient = serviceClient
		log.Println("Supabase service client initialized")
	}
}
