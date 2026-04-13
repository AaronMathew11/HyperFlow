package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"

	"hypervision_backend/internal/db"
)

type ApiInput struct {
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Required    bool   `json:"required"`
}

type ApiOutput struct {
	Name        string `json:"name"`
	Type        string `json:"type"`
	Description string `json:"description"`
	Required    bool   `json:"required"`
}

type ApiDocumentationJSON struct {
	URL              string                 `json:"url"`
	Name             string                 `json:"name"`
	Description      string                 `json:"description"`
	Inputs           []ApiInput             `json:"inputs"`
	Outputs          []ApiOutput            `json:"outputs"`
	CurlExample      string                 `json:"curl_example"`
	SuccessResponse  map[string]interface{} `json:"success_response"`
	FailureResponses []interface{}          `json:"failure_responses"`
	ErrorDetails     []interface{}          `json:"error_details"`
}

type DocumentationData struct {
	IndiaAPIs  []ApiDocumentationJSON `json:"india_apis"`
	GlobalAPIs []ApiDocumentationJSON `json:"global_apis"`
}

func main() {
	// Initialize Supabase connection
	db.Init()

	// Read the JSON file
	jsonContent, err := ioutil.ReadFile("scripts/hyperverge_api_documentation.json")
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	// Parse JSON
	var data DocumentationData
	if err := json.Unmarshal(jsonContent, &data); err != nil {
		log.Fatalf("Failed to parse JSON: %v", err)
	}

	fmt.Printf("Found %d India APIs and %d Global APIs\n", len(data.IndiaAPIs), len(data.GlobalAPIs))

	// Import India APIs
	importedCount := 0
	skippedCount := 0
	
	fmt.Println("Importing India APIs...")
	for i, api := range data.IndiaAPIs {
		if err := importAPI(api, "india_api"); err != nil {
			fmt.Printf("Failed to import India API %d (%s): %v\n", i+1, api.Name, err)
			skippedCount++
		} else {
			importedCount++
		}
		
		// Progress indicator
		if (i+1)%10 == 0 {
			fmt.Printf("Processed %d/%d India APIs...\n", i+1, len(data.IndiaAPIs))
		}
	}

	fmt.Println("Importing Global APIs...")
	for i, api := range data.GlobalAPIs {
		if err := importAPI(api, "global_api"); err != nil {
			fmt.Printf("Failed to import Global API %d (%s): %v\n", i+1, api.Name, err)
			skippedCount++
		} else {
			importedCount++
		}
		
		// Progress indicator
		if (i+1)%10 == 0 {
			fmt.Printf("Processed %d/%d Global APIs...\n", i+1, len(data.GlobalAPIs))
		}
	}

	fmt.Printf("\n✅ Import completed!\n")
	fmt.Printf("Successfully imported: %d APIs\n", importedCount)
	fmt.Printf("Skipped (errors): %d APIs\n", skippedCount)
	fmt.Printf("Total processed: %d APIs\n", importedCount+skippedCount)
}

func importAPI(api ApiDocumentationJSON, category string) error {
	// Insert main API documentation
	apiData := map[string]interface{}{
		"name":              api.Name,
		"description":       api.Description,
		"url":               api.URL,
		"category":          category,
		"curl_example":      api.CurlExample,
		"success_response":  api.SuccessResponse,
		"failure_responses": api.FailureResponses,
		"error_details":     api.ErrorDetails,
	}

	data, _, err := db.Client.
		From("api_documentation").
		Insert(apiData, false, "", "", "").
		Execute()

	if err != nil {
		return fmt.Errorf("failed to insert API documentation: %v", err)
	}

	// Parse the returned data to get the API ID
	var dbResult []map[string]interface{}
	if err := json.Unmarshal(data, &dbResult); err != nil {
		return fmt.Errorf("failed to parse inserted API data: %v", err)
	}

	if len(dbResult) == 0 {
		return fmt.Errorf("no API documentation created")
	}

	apiID, ok := dbResult[0]["id"].(string)
	if !ok {
		return fmt.Errorf("failed to get API ID from inserted data")
	}

	// Insert inputs
	for _, input := range api.Inputs {
		inputData := map[string]interface{}{
			"api_id":      apiID,
			"name":        input.Name,
			"type":        input.Type,
			"description": input.Description,
			"required":    input.Required,
		}

		_, _, err := db.Client.
			From("api_inputs").
			Insert(inputData, false, "", "", "").
			Execute()

		if err != nil {
			fmt.Printf("Warning: Failed to insert input %s for API %s: %v\n", input.Name, api.Name, err)
		}
	}

	// Insert outputs
	for _, output := range api.Outputs {
		outputData := map[string]interface{}{
			"api_id":      apiID,
			"name":        output.Name,
			"type":        output.Type,
			"description": output.Description,
			"required":    output.Required,
		}

		_, _, err := db.Client.
			From("api_outputs").
			Insert(outputData, false, "", "", "").
			Execute()

		if err != nil {
			fmt.Printf("Warning: Failed to insert output %s for API %s: %v\n", output.Name, api.Name, err)
		}
	}

	return nil
}