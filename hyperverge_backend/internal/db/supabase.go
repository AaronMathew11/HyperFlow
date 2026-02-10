package db

import (
	"log"
	"os"

	supabase "github.com/supabase-community/supabase-go"
)

var Client *supabase.Client

func Init() {
	url := os.Getenv("SUPABASE_URL")
	key := os.Getenv("SUPABASE_ANON_KEY")

	if url == "" || key == "" {
		log.Fatal("SUPABASE_URL or SUPABASE_ANON_KEY not set")
	}

	client, err := supabase.NewClient(url, key, nil)
	if err != nil {
		log.Fatalf("failed to create supabase client: %v", err)
	}

	Client = client
	log.Println("Supabase client initialized")
}
