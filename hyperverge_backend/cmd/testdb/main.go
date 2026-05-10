package main

import (
	"encoding/json"
	"fmt"

	"hypervision_backend/internal/db"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load("../../.env")
	godotenv.Load(".env")
	db.Init()

	var d1, d2, d3 []byte

	d1, _, err1 := db.ServiceClient.From("api_documentation_new").Select("*", "", false).Limit(1, "").Execute()
	fmt.Printf("Doc1 err: %v\n", err1)
	
	d2, _, err2 := db.ServiceClient.From("api_inputs_new").Select("*", "", false).Limit(1, "").Execute()
	fmt.Printf("Doc2 err: %v\n", err2)

	d3, _, err3 := db.ServiceClient.From("api_outputs_new").Select("*", "", false).Limit(1, "").Execute()
	fmt.Printf("Doc3 err: %v\n", err3)

	var r1, r2, r3 []map[string]interface{}
	json.Unmarshal(d1, &r1)
	json.Unmarshal(d2, &r2)
	json.Unmarshal(d3, &r3)

	b, _ := json.MarshalIndent(map[string]interface{}{
		"api_documentation_new": r1,
		"api_inputs_new": r2,
		"api_outputs_new": r3,
	}, "", "  ")

	fmt.Println(string(b))
}
