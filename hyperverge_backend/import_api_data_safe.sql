-- Safe SQL Import for HyperVerge API Documentation
-- Generated on: 2026-03-11T07:47:55.791Z
-- Total APIs: 242
-- 
-- This version uses safer SQL generation to avoid syntax errors
-- Complex JSON objects are simplified to prevent SQL parsing issues

BEGIN;


-- India API 1: Disability Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Disability Verification API',
    'The Disability Verification API verifies an person with disability''s disability information against authoritative government systems using the Unique Disability ID (UDID) and returns validated profile details, disability status, application state, and an optional certificate download link.',
    'https://documentation.hyperverge.co/api-reference/india_api/disability_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/disabilityVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{  "idNumber": "<Enter_the_UDID>",  "dob": "<Enter_the_DoB_in_DD-MM-YYYY>",  "getCertificate": <Enter_true_or_false>}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"data\\": {      \\"id_number\\": \\"<ID_Number>\\",      \\"dob\\": \\"<Date_of_Birth>\\",      \\"details\\": {        \\"application_number\\": \\"<Application_Number>\\",        \\"udid_number\\": \\"<UDID_Number>\\",        \\"regional_language\\": \\"<Regional_Language_Code>\\",        \\"full_name\\": \\"<Full_Name>\\",        \\"father_name\\": \\"<Father_Name>\\",        \\"gender\\": \\"<Gender>\\",        \\"mobile\\": \\"<Mobile_Number>\\",        \\"email\\": \\"<Email_Address>\\",        \\"current_address\\": \\"<Current_Address>\\",        \\"current_state_code\\": \\"<Current_State_Code>\\",        \\"current_district_code\\": \\"<Current_District_Code>\\",        \\"current_subdistrict_code\\": \\"<Current_Subdistrict_Code>\\",        \\"current_village_code\\": \\"<Current_Village_Code>\\",        \\"current_pincode\\": \\"<Current_Pincode>\\",        \\"disability_type_id\\": \\"<Disability_Type_Id>\\",        \\"application_status\\": \\"<Application_Status_Code>\\",        \\"pwd_card_expiry_date\\": \\"<PWD_Card_Expiry_Date>\\",        \\"disability_type_pt\\":"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"error\\": \\"idnumber is invalid\\", \\"statusCode\\": 422, \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or error response from the module contains a failure status, with a releva...","example_response":"..."},{"status_code":"400","description":"idNumber{ \\"message\\": \\"Input Validation Error: DoB should be in DD-MM-YYYY format\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: idNumber does not meet minimum length of 18\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: getCertifica...","example_response":"..."}]'::jsonb
);

-- India API 2: PAN Utility APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'PAN Utility APIs',
    'The following is a list of all PAN Utility APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 3: Bank Account Verification APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Bank Account Verification APIs',
    'The following is a list of all Bank Account Verification APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 4: UPI Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'UPI Verification API',
    'This document outlines the details of the UPI Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/upi_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/UPIVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "UPIId": "<Enter_the_UPI_ID>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"response for an invalid UPI ID. Error - Failed at Bank { \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"message\\": \\"Failed at bank\\" }} Error Response Details​ Status CodeError MessageError Description400Missing required request parameters. Some mandatory request parameters are...","example_response":"..."}]'::jsonb
);

-- India API 5: IEC Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'IEC Verification API',
    'The following document outlines the details of the IEC Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/iec_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/iecVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "iecNumber": "<Enter_the_IEC_Number>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"erro...","example_response":"..."},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction...","example_response":"..."},{"status_code":"404","description":"g code snippet displays a failure response from the API: { \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"IEC number not found\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Responses​ The following are some error responses...","example_response":"..."},{"status_code":"503","description":"D>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"error\\": \\"source not available\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Failure and Error Response Details​ A failure or error resp...","example_response":"..."},{"status_code":"400","description":"alid CredentialsInternal Server ErrorSource Not Available{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Please provide valid IEC number\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400,...","example_response":"..."}]'::jsonb
);

-- India API 6: Face Match API - India
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Face Match API - India',
    'The Face Match API determines whether two facial images belong to the same person.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_match_api',
    'india_api',
    'curl --location --request POST ''https://ind-faceid.hyperverge.co/v1/photo/verifyPair'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''selfie=@"<path_to_selfie_image>"'' \\--form ''id=@"<path_to_id_image>"''',
    '{"raw":"{  \\t\\"status\\" : \\"success\\",  \\t\\"statusCode\\" : \\"200\\",  \\t\\"result\\" : {          \\"match\\" : \\"yes/no\\",          \\"match-score\\" : 95, // This is a number between 0-100          \\"conf\\" :97,            \\"to-be-reviewed\\": \\"yes/no\\",  \\t} }"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"returned when the number of transactions per minute has crossed the limit set for your credentials.500/501Internal Server ErrorThis happens when there is an error with HyperVerge''s server.503Server busyThis happens when there is an overload on HyperVerge''s server.Last updated on Mar 3, 2026PreviousFin...","example_response":"..."},{"status_code":"503","description":"e\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Status CodeError MessageError Description400Face not detected in Selfie image The AI model failed to detect the face in the selfie.400Face not detected in ID imag...","example_response":"..."},{"status_code":"400","description":"tected in the selfie image. Error Responses​ The following sample responses reflect the status code 400. Face Not DetectedSelfie ImageIncorrect ParametersIncorrect SizeInvalid idFaceString{ \\"status\\" : \\"failure\\", \\"statusCode\\" : \\"400\\", \\"error\\" : \\"Face not detected in ID image\\"}{ \\"status\\" : \\"failure\\", \\"st...","example_response":"..."},{"status_code":"429","description":"\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER B...","example_response":"..."},{"status_code":"501","description":"atusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Status CodeError MessageError Description400Face not detected in Selfie image The A...","example_response":"..."},{"status_code":"423","description":"quests Rate Limit ExceededInternal Server ErrorServer Busy{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"423\\", \\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\",...","example_response":"..."}]'::jsonb
);

-- India API 7: GST Authentication APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'GST Authentication APIs',
    'A collection of APIs for authenticating and retrieving details for Indian GSTINs (Goods and Services Tax Identification Numbers).',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 8: Bank Statement Analysis API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Bank Statement Analysis API',
    'The Bank Statement Analysis API extracts transactions from bank statements using OCR (Optical Character Recognition) in JSON format. It can also analyze and produce insights from them in the form of a JSON.',
    'https://documentation.hyperverge.co/api-reference/india_api/bank_statement_analysis_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/bank_statement_analysis'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''pdf=@"<path_to_pdf_file>"'' \\--form ''password='' \\--form ''enableFraudChecks="yes"'' \\--form ''extractEntities="yes"'' \\--form ''country="ind"'' \\--form ''returnTransactions="yes"'' \\--form ''transactionThreshold="0"'' \\--form ''formatDateYearFirst="no"'' \\--form ''allowImagePDF="yes"'' \\--form ''returnS3Url="yes"'' \\--form ''flagTransactions="yes"'' \\--form ''returnRecurringTransactions="yes"'' \\--form ''returnAverageMonthlyBalance="yes"'' \\--form ''returnStatementSummary="yes"'' \\--form ''returnEODBalances="yes"'' \\--form ''returnSalaryInfo="yes"''',
    '{"status":"success","statusCode":"<Status_Code_Number>","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"was incorrect\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"message\\": \\"internal server error\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table...","example_response":"..."},{"status_code":"400","description":"Server Error{ \\"message\\": \\"Input Validation Error: requires property \\\\\\"uploadPdf\\\\\\"\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Invalid file type for: uploadPdf\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Password provided was incorrect\\", \\"statusCode\\": 400, \\"status\\":...","example_response":"..."}]'::jsonb
);

-- India API 9: Masked PAN from DIN API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Masked PAN from DIN API',
    'This document highlights the Masked PAN from DIN API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/masked_pan_from_din_api',
    'india_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/maskedPanFromDin'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "dinNumber": "<Enter_the_DIN>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\" \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"...","example_response":"..."},{"status_code":"401","description":"ternal Server ErrorExternal Downtime{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\",...","example_response":"..."},{"status_code":"503","description":"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\" \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" } } Failure and Error Response Details​ A fai...","example_response":"..."},{"status_code":"400","description":"d formatIncorrect Data Type Missing Parameter: DIN{ \\"message\\": \\"Invalid value\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Number must be an 8-digit numeric value\\", \\"statusCode...","example_response":"..."}]'::jsonb
);

-- India API 10: IFSC Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'IFSC Verification API',
    'The following document highlights the details of the IFSC Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/ifsc_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/verifyIFSC'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "ifscCode": "<Enter_the_valid_IFSC>"}''',
    '{"status":"success","statusCode":200,"result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"essage\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 500, \\"status\\": \\"failure\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The followi...","example_response":"..."},{"status_code":"401","description":"5th character of IFSC Code should be 0\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 500, \\"status\\": \\"failure\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response contains a failure status with a relevan...","example_response":"..."},{"status_code":"404","description":"a failure response from the IFSC Verification API when the IFSC code is not found: { \\"statusCode\\": 404, \\"status\\": \\"failure\\", \\"error\\": \\"IFSC Code not found\\"} Error Responses​ The following are some error responses from the IFSC Verification API: Input Validation - LengthInvalid IFSC - 1Invalid IFSC -...","example_response":"..."},{"status_code":"400","description":"ver Error{ \\"message\\": \\"Input Validation Error: does not meet minimum length of 11\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"error\\": \\"Invalid IFSC Code\\"}{ \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"error\\": \\"Invalid IFSC. 5th character of IFSC Code should...","example_response":"..."}]'::jsonb
);

-- India API 11: NACH Extraction API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'NACH Extraction API',
    'The following document highlights the details of the NACH Extraction API.',
    'https://documentation.hyperverge.co/api-reference/india_api/nach_extraction_api',
    'india_api',
    'curl --location ''https://ind-engine.thomas.hyperverge.co/v1/nach_extraction'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_nach_image>"'' \\--form ''enableOutputJPEG="no"'' \\--form ''enableOutputTIF="no"'' \\--form ''enableOutputPDF="no"'' \\--form ''templateVersion="v3"''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"Default: no Things to ensure​ Only use an image with markers, otherwise it would throw HTTP error 422 Request​ The following code snippet demonstrates a standard curl request for the NACH Extraction API: curl --location ''https://ind-engine.thomas.hyperverge.co/v1/nach_extraction'' \\\\--header ''Content-...","example_response":"..."},{"status_code":"500","description":"e\\": \\"422\\", \\"error\\": \\"No NACH detected\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table...","example_response":"..."},{"status_code":"400","description":"Error{ \\"message\\": \\"Input Validation Error: is not one of enum values: yes,no\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: is not one of enum values: v1,v2,v3\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\",...","example_response":"..."}]'::jsonb
);

-- India API 12: Shops and Establishment Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Shops and Establishment Verification API',
    'This document highlights the Shops and Establishment Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/shops_and_establishment_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-thomas.hyperverge.co/v1/verifyShopAndEstablishmentLicense'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "registrationNumber": "<Enter_the_registration_number>"}''',
    '{"status":"success","statusCode":200,"result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<...","example_response":"..."},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\",...","example_response":"..."},{"status_code":"404","description":"\\"requestId\\": \\"\\", \\"transactionId\\": \\"\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"Registration Number Not Found.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404,...","example_response":"..."},{"status_code":"503","description":"0, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or er...","example_response":"..."},{"status_code":"400","description":"Invalid CredentialsInternal Server ErrorExternal Downtime{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Please provide valid registration number\\", \\"metaData\\": { \\"requestId\\": \\"\\", \\"transactionId\\": \\"\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"Registra...","example_response":"..."}]'::jsonb
);

-- India API 13: Fetch IFSC from UPI ID API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Fetch IFSC from UPI ID API',
    'The following document highlights the details of the Fetch IFSC from UPI ID API.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_ifsc_from_upi_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/fetchUpiIfsc'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "vpa": "<Enter_the_VPA>",    "name": "<Enter_the_name>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The following table lists all error responses:...","example_response":"..."},{"status_code":"401","description":"\\"requestId\\": \\"<Request_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a re...","example_response":"..."},{"status_code":"400","description":"ing/Invalid CredentialsInternal Server Error{ \\"message\\": \\"vpa should be valid\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\" }}{ \\"message\\": \\"vpa is missing in the request.\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": {...","example_response":"..."}]'::jsonb
);

-- India API 14: FSSAI Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'FSSAI Verification API',
    'This document outlines the details of the FSSAI Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/fssai_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/verifyFSSAILicense'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "licenseNumber": "<Enter_the_14_digit_license_number>",    "consent": "<Enter_Y_or_N>",    "includeProducts": "<true_or_false>"}''',
    '{"status":"failure","statusCode":400,"error":"FSSAI license number invalid.","metaData":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ An error response from the API contains a failure st...","example_response":"..."},{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ An error response from the API contains a failure status, with a relevant status code and error message. The following table lists all err...","example_response":"..."},{"status_code":"404","description":"snippet displays a failure response from the API:```json{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"FSSAI license number does not exist.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Responses​ The following are some erro...","example_response":"..."},{"status_code":"400","description":"se NumberMissing/Invalid CredentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"FSSAI license number invalid.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"...","example_response":"..."}]'::jsonb
);

-- India API 15: GeoCoding API -v2
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'GeoCoding API -v2',
    'The GeoCoding API -v2 validates the address of the user by returning a Geolocation.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_apiV2',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/geoCodingV2'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{  "address": "<Enter_the_address>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": 200,  \\"result\\": {    \\"houseNumber\\": \\"<House_Number>\\",    \\"street\\": \\"<Street>\\",    \\"subSubLocality\\": \\"<Sub_Sub_Locality>\\",    \\"subLocality\\": \\"<Sub_Locality>\\",    \\"locality\\": \\"<Locality>\\",    \\"village\\": \\"<Village>\\",    \\"subDistrict\\": \\"<Sub_District>\\",    \\"district\\": \\"<District>\\",    \\"city\\": \\"<City>\\",    \\"state\\": \\"<State>\\",    \\"pincode\\": \\"<Pincode>\\",    \\"formattedAddress\\": \\"<Formatted_Address>\\",    \\"latitude\\": <Latitude>,    \\"longitude\\": <Longitude>  },  \\"metadata\\": {    \\"requestId\\": \\"<Request_ID>\\",    \\"transactionId\\": \\"<Transaction_ID>\\"  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"message\\": \\"External source d...","example_response":"..."},{"status_code":"401","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 401, \\"error\\": \\"Invalid token.Please try again.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 401, \\"error\\": \\"Something...","example_response":"..."},{"status_code":"404","description":"valid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"No match found.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\",...","example_response":"..."},{"status_code":"503","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"message\\": \\"External source downtime\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or...","example_response":"..."},{"status_code":"400","description":"questUnauthorized - Invalid TokenUnauthorized - Access Denied{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid address.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid request.Please t...","example_response":"..."}]'::jsonb
);

-- India API 16: DigiLocker Fetch eAadhaar API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'DigiLocker Fetch eAadhaar API',
    'The following document highlights the details of the DigiLocker Fetch eAadhaar API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_eaadhaar_api',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/digilocker/eAadhaarDetails'' \\--header ''Content-Type: application/json'' \\--header ''appID: <Enter_the_HyperVerge_appId>''\\--header ''appKey: <Enter_the_HyperVerge_appKey>''\\--header ''transactionID: <Enter_the_HyperVerge_transactionID>'' \\--data-raw ''{    "referenceId" : "<Reference_ID>",    "aadhaarFile" :"yes"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"name\\": \\"<Name_of_the_User>\\",    \\"dob\\": \\"<Date_Of_Birth_from_eAadhaar>\\",    \\"address\\": \\"<Address_Of_The_User>\\",    \\"maskedAadhaarNumber\\": \\"<Masked_Aadhaar_Number>\\",    \\"photo\\": \\"<Base64_Image_Of_The_Users_Profile_Photo>\\",    \\"addressFields\\": {      \\"co\\": \\"<Care_Of_Field>\\",      \\"country\\": \\"<Country>\\",      \\"district\\": \\"<District>\\",      \\"subDistrict\\": \\"<Subdistrict>\\",      \\"postOffice\\": \\"<Post_Office>\\",      \\"house\\": \\"<House_Number>\\",      \\"locality\\": \\"<Locality>\\",      \\"pincode\\": \\"<Pincode>\\",      \\"state\\": \\"<State>\\",      \\"street\\": \\"<Street>\\",      \\"vtc\\": \\"<Village_Town_City>\\",      \\"landmark\\": \\"<Landmark>\\"    },    \\"gender\\": \\"<Gender>\\",    \\"aadhaarFile\\": \\"<Link to aadhaar file>\\",    \\"xmlAadhaarFile\\" : \\"<link to xml aadhaar file>\\",    \\"createdTimeStamp\\": \\"1737033755319\\", //returned when returnCreatedTimeStamp is enabled     \\"summary\\": {            \\"action\\": \\"pass\\",            \\"details\\": []        }  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"UNT\\", \\"message\\": \\"Entered details belongs to a minor\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"code\\": \\"ER_AADHAAR_NOT_LINKED\\", \\"message\\": \\"Aadhaar is not linked to the account\\" }} aadhaar Data UnavailableService UnresponsiveService UnpublishedService InactiveService Confi...","example_response":"..."},{"status_code":"401","description":"h data from UIDAI.Please try starting the process again\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"401\\", \\"error\\": \\"Missing/Invalid credentials\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"401\\", \\"error\\": { \\"code\\": \\"ER_EXPIRED_TOKEN\\", \\"message\\": \\"Session has expired.\\" }}{ \\"status\\": \\"failure\\", \\"st...","example_response":"..."},{"status_code":"500","description":"tatusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }} Error Response Details​ A failure or error response contains a failure status with a relavant status code and error mess...","example_response":"..."},{"status_code":"504","description":"dhaar eKYC again\\", \\"code\\": \\"ER_AADHAAR_NOT_AVAILABLE\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SERVICE_UNRESPONSIVE\\", \\"message\\": \\"Error Connecting to digilocker. Please try again after sometime.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\",...","example_response":"..."},{"status_code":"400","description":"he parameter that controls whether minor accounts are blocked. When set to \\"yes\\", the API returns a 400 response denoting the digilocker account belongs to a minoryes / nonoreturnCreatedTimeStampOptionalstringThe parameter that controls whether the created timestamp is returned in the response. When se...","example_response":"..."},{"status_code":"429","description":"\\"ER_EXPIRED_TOKEN\\", \\"message\\": \\"Session has expired.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }} Error Response Details​ A failure...","example_response":"..."}]'::jsonb
);

-- India API 17: Face Authentication APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Face Authentication APIs',
    'The following is a list of all Face Authentication APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 18: Find Face API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Find Face API',
    'The Find Face API identifies whether a target face exists in a group image and returns data about the closest match.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_find_api',
    'india_api',
    'curl --location --request POST ''https://ind-faceid.hyperverge.co/v1/photo/findFace'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_target_image>"'' \\--form ''groupimage=@"<path_to_group_image>"'' \\--form ''type="<Enter_type_of_target_image>"''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": \\"429\\", \\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Error Response Details​ An error response from the API contains a failure...","example_response":"..."},{"status_code":"503","description":"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Error Response Details​ An error response from the API contains a failure status, with a relevant status code and error message. The following table lists all...","example_response":"..."},{"status_code":"400","description":"ImageFace Not Detected in Group ImageImage Size Exceeded{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Face not detected in image\\", \\"errorCode\\": \\"E1033I\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Face not detected in group image\\", \\"errorCode\\": \\"E1033G\\"}{ \\"s...","example_response":"..."},{"status_code":"429","description":"er than 6MB\\"} Rate Limit ExceededServer ErrorServer Busy{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SER...","example_response":"..."}]'::jsonb
);

-- India API 19: OCR APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'OCR APIs',
    'The following is a list of all OCR APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 20: Email Risk and Domain Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Email Risk and Domain Verification API',
    'The following document highlights the details of the Email Risk and Domain Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/email_risk_and_domain_verif_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/emailBasic'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "email": "<Enter_the_email_address>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The following table lists all error responses:...","example_response":"..."},{"status_code":"401","description":"\\"message\\": \\"Invalid event type\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a re...","example_response":"..."},{"status_code":"400","description":"vent TypeMissing/Invalid credentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Email cannot be empty\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Invalid event type\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"stat...","example_response":"..."}]'::jsonb
);

-- India API 21: CKYC APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'CKYC APIs',
    'The following is a list of all CKYC APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 22: Email OTP Verification APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Email OTP Verification APIs',
    'The following is a list of all Email OTP Verification APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 23: LPG Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'LPG Verification API',
    'The LPG Verification API determines whether a mobile number is linked to the Liquefied Petroleum Gas (LPG) service. If the mobile number is registered, the API returns the corresponding user details; otherwise, it returns a response stating that the number is not associated with any LPG registration.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_to_LPG',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/mobileToLPG'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "mobile": "<Enter_the_valid_Mobile_Number>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"message\\": \\"Mobile number is not registered\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"...","example_response":"..."},{"status_code":"404","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"message\\": \\"Mobile number is not registered\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"statusCode\\": 503, \\"status\\": \\"failur...","example_response":"..."},{"status_code":"503","description":"\\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"message\\":\\"External source downtime\\", \\"error\\":\\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Erro...","example_response":"..."},{"status_code":"400","description":"ntials Unregistered Mobile NumberExternal Source Downtime{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Provide a valid 10 digit mobile number\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credenti...","example_response":"..."}]'::jsonb
);

-- India API 24: DigiLocker Fetch PAN and Driving Licence API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'DigiLocker Fetch PAN and Driving Licence API',
    'The following document highlights the details of the DigiLocker Fetch PAN and Driving Licence API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_driving_license_pan_api/',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/digilocker/docDetails'' \\--header ''Content-Type: application/json'' \\--header ''appID: <Enter_the_HyperVerge_appId>''\\--header ''appKey: <Enter_the_HyperVerge_appKey>''\\--header ''transactionID: <Enter_the_HyperVerge_transactionID>'' \\--data-raw ''{    "referenceId": "<Reference_ID>",    "pan": "<yes_or_no>",    "dl": "<yes_or_no>",    "panFile": "<yes_or_no>",    "dlFile": "<yes_or_no>",    "panXMLFile": "<yes_or_no>"    "dlXMLFile": "<yes_or_no>"    "returnAllFieldsFromDigilocker": "<yes_or_no>",    "useV2StorageLocation": "<yes_or_no>",    "enableRetry": "<yes_or_no>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"message\\": \\"No data found for the given DL\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SE...","example_response":"..."},{"status_code":"503","description":"VER\\", \\"message\\": \\"Something went wrong\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SERVICE_RESPERROR\\", \\"message\\": \\"Error Connecting to digilocker. Please try again after sometime\\" }} Error Response Details​ A failure...","example_response":"..."},{"status_code":"400","description":"for 15 minutesyes / noNot ApplicableblockMinorsOptionalstringThe parameter that controls whether a 400 response is returned if the DigiLocker account belongs to a minor. When set to \\"yes\\", the API returns a 400 responseNot ApplicableNot ApplicablereturnAllFieldsFromDigilockerOptionalstringThe paramete...","example_response":"..."},{"status_code":"422","description":"message\\": \\"Entered details belongs to a minor.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"code\\": \\"ER_PAN_DATA_NOT_AVAILABLE\\", \\"message\\": \\"No data found for the given pan\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"cod...","example_response":"..."}]'::jsonb
);

-- India API 25: Account Aggregator - Consent Request API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Account Aggregator - Consent Request API',
    'This document highlights the Account Aggregator - Consent Request API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account%20Aggregator%20APIs/aa_consent_request_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/AAConsentRequest'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''x-hv-hide-on-portal: yes'' \\--header ''Content-Type: application/json'' \\--data ''{    "redirectUrl": "<Enter_redirect_URL>",    "custId": "<Enter_Customer_ID>"}''',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 26: Penny Drop - Bank Account Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Penny Drop - Bank Account Verification API',
    'The following document highlights the details of the Penny Drop API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank%20Account%20Verification%20APIs/pennydrop_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/checkBankAccount'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "ifsc": "<IFSC code>",    "accountNumber": "<Account number>",    "strictValidation": "<Enter_Yes_or_No>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"500","description":"inedBank Error: Failed at BankBank Error: Transaction Failed{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Bank Error: IMPS Mode Fail\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Bank Error: Beneficia...","example_response":"..."},{"status_code":"400","description":"too LongInvalid Account Number or IFSCInvalid Account Number{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ifsc length must be 11 characters long\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"accountNumber length must be at least 6 characters long\\"}{ \\"status\\": \\"failure\\", \\"...","example_response":"..."},{"status_code":"422","description":"er length must be less than or equal to 25 characters long\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input: Account number or IFSC\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input: Account number\\"} Invalid IFSC...","example_response":"..."},{"status_code":"429","description":"lure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Account is blocked\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"} Internal Server ErrorBank Error: IMPS Mode FailBank Error: Beneficiary Bank OfflineBank Error: Source Bank DeclinedBank Error: Failed at BankBank Error: Tr...","example_response":"..."}]'::jsonb
);

-- India API 28: Voter ID Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Voter ID Verification API',
    'The Voter ID Verification API searches for a matching Voter ID record as a verification step and provides the details of the customer from the same record.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central%20DB%20Check%20APIs/voter_id_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/checkVoterId'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "epicNumber": "<Enter_Voter_ID_Number>"}''',
    '{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": \\"200\\",    \\"result\\": {      \\"ps_lat_long\\": <Latitude and Longitute of Polling Station>,      \\"rln_name_v1\\": <Relation Name 1>,      \\"rln_name_v2\\": <Relation Name 2>,      \\"rln_name_v3\\": <Relation Name 3>,      \\"part_no\\": <Part Number>,      \\"rln_type\\": <Relation Type>,      \\"section_no\\": \\"Section Number\\",      \\"id\\": \\"ID of VoterId Card\\",      \\"epic_no\\": \\"EPIC Number\\",      \\"rln_name\\": \\"Relation Name\\",      \\"district\\": \\"District\\",      \\"last_update\\": \\"Last Update Timestamp\\",      \\"state\\": \\"State\\",      \\"ac_no\\": \\"\\",      \\"house_no\\": \\"House Number\\",      \\"ps_name\\": \\"Polling Station Name\\",      \\"pc_name\\": \\"\\",      \\"slno_inpart\\": \\"\\",      \\"name\\": \\"Name of the User\\",      \\"part_name\\": \\"\\",      \\"dob\\": \\"DOB in DD-MM-YYYY Format\\",      \\"gender\\": \\"Gender of the User\\",      \\"age\\": <Age of User, Number>,      \\"ac_name\\": \\"Account Name\\",      \\"name_v1\\": \\"\\",      \\"st_code\\": \\"\\",      \\"name_v3\\": \\"\\",      \\"name_v2\\": \\"\\"    }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"Code\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Unexpected Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database servi...","example_response":"..."},{"status_code":"503","description":", \\"statusCode\\": \\"500\\", \\"error\\": \\"Unexpected Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database service unavailable\\"} Error Response Details​ A failure or error response contains a fa...","example_response":"..."},{"status_code":"400","description":"r Too ShortEpic Number Too LongInvalid Input for Epic Number{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"epicNumber is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"epicNumber is not allowed to be empty\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ep...","example_response":"..."},{"status_code":"422","description":"n no matching record is found against the input parameters. { \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Entered id is not found in any database\\"} Error Response Sample​ The following are the sample error responses for the API. Missing Epic NumberBlank InputEpic Number Too ShortEpic Number...","example_response":"..."},{"status_code":"504","description":"\\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database service unavailable\\"} Error Response Details​ A failure or error response contains a failure status with a relavant status code and error message. The following table list...","example_response":"..."}]'::jsonb
);

-- India API 29: Criminal Risk Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Criminal Risk Verification API',
    'This document highlights the Criminal Risk Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime%20Detection%20APIs/criminal_risk_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/criminalRiskCheck'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "name": "<Enter_the_name>",    "address": "<Enter_the_address>",    "fatherName": "<Enter_the_father_name>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"color\\": \\"<Risk_Color>\\",    \\"numberOfCases\\": <Number_Of_Cases>,    \\"result\\": [      {        \\"address\\": \\"<Address_As_Found_In_Case_Details>\\",        \\"addressScore\\": <Address_Similarity_Score>,        \\"algoRisk\\": \\"<Risk_Level_From_Algorithm>\\",        \\"asrInfo\\": \\"<Additional_ASR_Info>\\",        \\"businessCategory\\": \\"<Business_Category>\\",        \\"caseCategory\\": \\"<Category_Of_The_Case>\\",        \\"caseFilter\\": \\"<Applied_Case_Filter>\\",        \\"caseNo\\": \\"<Case_Number>\\",        \\"caseStatus\\": \\"<Status_Of_The_Case>\\",        \\"caseTypeDescription\\": \\"<Case_Type_Description>\\",        \\"caseTypeName\\": \\"<Case_Type_Name>\\",        \\"caseYear\\": \\"<Year_Of_The_Case>\\",        \\"cnr\\": \\"<CNR_Number>\\",        \\"courtCode\\": <Court_Code>,        \\"courtName\\": \\"<Name_Of_The_Court>\\",        \\"decisionDate\\": \\"<Decision_Date_If_Available>\\",        \\"distCode\\": <District_Code>,        \\"distMatch\\": \\"<District_Match_Status>\\",        \\"distName\\": \\"<District_Name>\\",     "}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table lists all er...","example_response":"..."},{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure s...","example_response":"..."},{"status_code":"400","description":"nvalid CredentialsInternal Server Error{ \\"message\\": \\"name should not be empty\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"...","example_response":"..."}]'::jsonb
);

-- India API 30: eFIR Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'eFIR Verification API',
    'This document highlights the eFIR Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime%20Detection%20APIs/efir_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/eFIRCheck'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "name": "<Enter_the_Name>",    "fatherName": "<Enter_the_fatherName>",    "address": "<Enter_the_address>",    "source": "<Enter_the_source>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table lists all er...","example_response":"..."},{"status_code":"400","description":"meMissing Input - SourceMissing/Invalid Credentials{ \\"message\\": \\"Invalid name\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"source should not be empty\\", \\"statusCode\\": 400, \\"s...","example_response":"..."}]'::jsonb
);

-- India API 31: Fetch UAN API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Fetch UAN API',
    'The Fetch UAN API retrieves  the Universal Account Number (UAN) associated with a user''s mobile number, allotted by the Employee Provident Fund Organisation (EPFO).',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/fetch_uan_api',
    'india_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/fetchUAN'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "mobileNumber": "<Mobile_Number>",    "consent": "<Consent>"}''',
    '{"status":"success","statusCode":200,"result":"[Complex Object]","metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"for when an internal server error occurs.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table...","example_response":"..."},{"status_code":"401","description":"n the input credentials are invalid.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following is a sample response for when an internal server error occurs.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and...","example_response":"..."},{"status_code":"400","description":"onse for an invalid mobile number.{ \\"message\\": \\"Provide a valid mobile number\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\" }}The following is a sample response for input validation error.{ \\"message\\": \\"Input Validation Error: does not meet...","example_response":"..."}]'::jsonb
);

-- India API 32: PDF Generator API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'PDF Generator API',
    'This document highlights the PDF Generator API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign%20APIs/pdf_generator_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/pdfGenerator'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "templateId": "<Enter_the_unique_template_ID>",    "inviteeName": "<Enter_the_name>",    "inviteePhone": "<Enter_the_phone_number>",    "inviteeEmail": "<Enter_the_email_address>",    "stampSeries": "<Enter_the_stamp_series>",    "eSignHintMessage": "<Enter_the_eSign_hint_message>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"{ \\"message\\": \\"Error while parsing file input\\" } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Unknown error while parsing inputs\\" } }} Error Response Details​ A failure or error response from the module contains a failure status, with a relava...","example_response":"..."},{"status_code":"400","description":"dation ErrorMissing/Invalid CredentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Required file input is missing\\" } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Error while parsing fil...","example_response":"..."}]'::jsonb
);

-- India API 34: Face and ID - Enrol or Block API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'Face and ID - Enrol or Block API',
    'The Enrol API adds a user''s record to the database.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication%20APIs/Face%20and%20ID/india_dedupe_enrol_and_block_api',
    'india_api',
    'curl --request POST \\     --url https://ind-orion.hyperverge.co/v2/enrol/application \\     --header ''accept: application/json'' \\     --header ''content-type: multipart/form-data'' \\     --form name=<enter_the_name> \\     --form idNumber=<enter_the_id_number> \\     --form idType=<enter_the_id_type> \\     --form dob=<enter_the_dob> \\     --form transactionId=<enter_the_transaction_id> \\     --form block=no \\     --form enrol=no \\     --form selfie=<attach_the_image>',
    '{"statusCode":200,"metaData":"[Complex Object]","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 422,\\"error\\": \\"Face not detected in Selfie image\\"}{\\"status\\": \\"failure\\",\\"message\\": \\"Requests rate limit exceeded\\",\\"statusCode\\": 429}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-...","example_response":"..."},{"status_code":"500","description":"497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"error\\": \\"Internal Server Error\\",\\"statusCode\\": 500} Status CodeError MessageError Description400\\"\\"transactionId\\" is requiredThe request does not contain the transaction identification number.401Missing/Invalid credentialsThe request either does not c...","example_response":"..."},{"status_code":"429","description":"ected in Selfie image\\"}{\\"status\\": \\"failure\\",\\"message\\": \\"Requests rate limit exceeded\\",\\"statusCode\\": 429}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"error\\": \\"Internal Server Error\\",\\"statusCode\\": 500} Status CodeError...","example_response":"..."},{"status_code":"401","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 401,\\"error\\": \\"Missing/Invalid credentials\\"}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 422,\\"error\\": \\"F...","example_response":"..."},{"status_code":"400","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 400,\\"error\\": \\"\\\\\\"transactionId\\\\\\" is required\\"}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 401,\\"error\\":...","example_response":"..."}]'::jsonb
);

-- India API 35: 414 ERROR
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    '414 ERROR',
    NULL,
    'https://documentation.hyperverge.co/api-reference/Africa APIs/kenyan_id_check_api\\nhttps://documentation.hyperverge.co/api-reference/Africa APIs/phone_check_api\\nhttps://documentation.hyperverge.co/api-reference/Africa APIs/tin_check_api\\nhttps://documentation.hyperverge.co/api-reference/USA APIs/usa_secretary_of_state_search_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/enrol_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/monitoring_report_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v1_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v2_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/\\nhttps://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/OCR_country_docs_list\\nhttps://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/upload_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/vkyc_generic_webhook\\nhttps://documentation.hyperverge.co/api-reference/global_api/aml_screening_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/field_match_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/geo_ip_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/philsysqrcheck_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/selfie_validation_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_consent_request_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_recurring_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_request_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_status_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_pdf_format_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_getDetails_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_payment_links_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/cheque_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/passbook_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennydrop_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennyless_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_preupload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_reference_metadata\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_webhook\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_mapkey\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_search_and_download_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/ckyc_validation_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/mask_aadhaar_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/central_db_check\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/dl_verification_extraction\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/passport_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/voter_id_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_exact_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/efir_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_enrol_and_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_search_and_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_enrol_face\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_face_search_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_consent_start_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_faqs\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_doctypemap\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_driving_license_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_eaadhaar_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_prereq_credentials_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_webhook\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch-all-docs\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch_document_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/get_issued_document_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/link-to-be-added\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/pull_parameters_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/verify-xml\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_OTP_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_UAN_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_mobile_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/fetch_uan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_UAN_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_mobile_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/#what-is-a-uan\\nhttps://documentation.hyperverge.co/api-reference/india_',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"414","description":"ERROR: The request could not be satisfied 414 ERROR The request could not be satisfied. Bad request. We can''t connect to the server for this app or website at this time. There might be too much traffic or a configuration error. Try again later,...","example_response":"..."}]'::jsonb
);

-- India API 36: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 37: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 38: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_consent_request_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 39: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 40: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_recurring_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 41: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_request_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 42: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_status_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 43: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_pdf_format_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 44: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 45: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 46: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_getDetails_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 47: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_payment_links_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 48: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/cheque_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 49: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/passbook_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 50: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennydrop_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 51: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennyless_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 52: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 53: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 54: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_preupload_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 55: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 56: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_reference_metadata\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 57: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_webhook\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 58: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 59: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_mapkey\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 60: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_search_and_download_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 61: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/ckyc_validation_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 62: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/mask_aadhaar_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 63: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 64: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/central_db_check\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 65: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/dl_verification_extraction\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 66: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/passport_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 67: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/voter_id_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 68: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 69: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_exact_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 70: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 71: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/efir_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 72: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 73: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_enrol_and_block_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 74: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_search_and_block_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 75: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_enrol_face\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 76: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_face_search_block_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 77: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 78: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_consent_start_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 79: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_faqs\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 80: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_doctypemap\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 81: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_driving_license_pan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 82: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_eaadhaar_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 83: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_prereq_credentials_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 84: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_webhook\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 85: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch-all-docs\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 86: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch_document_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 87: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/get_issued_document_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 88: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/link-to-be-added\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 89: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/pull_parameters_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 90: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/verify-xml\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 91: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 92: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_OTP_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 93: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_UAN_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 94: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_mobile_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 95: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/fetch_uan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 96: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_UAN_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 97: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_mobile_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 98: EPFO APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'EPFO APIs',
    'EPFO (Employees'' Provident Fund Organisation) is a statutory body established by the Government of India to administer the Employees'' Provident Fund (EPF) scheme and other related social security schemes. It is one of the world''s largest social security organizations, managing retirement savings and benefits for employees in the organized sector.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/#what-is-a-uan\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 99: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 100: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/get_signed_document_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 101: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/pdf_generator_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 102: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 103: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/retry_email_OTP_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 104: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/send_email_OTP_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 105: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/verify_email_OTP_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 106: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 107: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 108: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_v3_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 109: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 110: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 111: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication_v2_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 112: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 113: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 114: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_download_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 115: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_search_and_verify_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 116: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_upload_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 117: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 118: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_download_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 119: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_search_and_verify_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 120: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_upload_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 121: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/webhook_KRA\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 122: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 123: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_advanced_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 124: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 125: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 126: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api_v2\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 127: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_director_details_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 128: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/get_gstin_from_pan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 129: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gst_authentication_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 130: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gstin_details_retrieval_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 131: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/kyb_documents_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 132: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyam_aadhaar_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 133: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyog_aadhaar_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 134: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 135: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/resend_mobile_otp\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 136: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/send_mobile_otp\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 137: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/verify_mobile_otp\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 138: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 139: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_history_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 140: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_status_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 141: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 142: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v1\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 143: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v2\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 144: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 145: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/deathcertificate_db_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 146: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/ocr_deathcertificate_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 147: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/bank_statement_upload_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 148: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/cdi_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 149: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/driving_licence_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 150: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ecs_classifier_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 151: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form16_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 152: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form_60_classifier_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 153: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/india_partner_ovd_integration_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 154: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/itr_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 155: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/margin_money_receipt_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 156: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_insurance_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 157: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_invoice_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 158: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 159: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/payslip_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 160: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/read_identity_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 161: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/tn_ration_card_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 162: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/utility_bill_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 163: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/visa_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 164: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_quality_report_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 165: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_receipt_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 166: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 167: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/din_from_pan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 168: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_name_from_pan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 169: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_pan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 170: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/nsdl_pan_direct_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 171: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_cin_details_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 172: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_udyam_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 173: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 174: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_advanced_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 175: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_challan_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 176: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 177: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 178: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_document_ocr_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 179: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_lite_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 180: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_plus_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 181: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/address_match_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 182: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/bank_statement_analysis_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 183: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/disability_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 184: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/email_risk_and_domain_verif_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 185: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_ifsc_from_upi_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 186: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_vehicle_details_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 187: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fssai_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 188: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 189: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_apiV2\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 190: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geo_ip_with_vpn_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 191: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geolocation_validation_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 192: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/iec_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 193: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ifsc_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 194: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_find_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 195: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_match_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 196: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/masked_pan_from_din_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 197: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_lookup_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 198: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_to_LPG\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 199: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/nach_extraction_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 200: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/prefill_mobile_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 201: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/prefill_orchestration_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 202: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/reverse_geocoding_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 203: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/shops_and_establishment_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 204: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/signature_detection_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 205: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/signature_matching_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 206: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/upi_verification_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 207: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/vendor_validation_api\\n',
    'india_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 1: NIN Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'NIN Verification API',
    'The NIN Verification API, or the VNIN verification API, retrieves a user''s personally identifiable information(PII)based on their Nigerian national identification number(NIN).',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/nin_lookup_api',
    'global_api',
    'curl --location --request POST ''https://zaf.thomas.hyperverge.co/v1/ninFetch'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "nin": "<Enter_the_NIN>"}''',
    '{"result":"[Complex Object]","status":"success","statusCode":200,"metaData":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"400","description":"ry, lookup failed. Please check the details and try again\\" }, \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"metaData\\": { \\"requestId\\": \\"1702388746563-62ed2d28-ff89-41fe-b27b-ff7c1be197e2\\" }} Error Response Samples​ The following is the sample error response from the API. Incorrect Length{\\"message\\": \\"...","example_response":"..."}]'::jsonb
);

-- Global API 2: National ID Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'National ID Verification API',
    'This document highlights the National ID Verification API details.',
    'https://documentation.hyperverge.co/api-reference/Vietnam APIs/OCR APIs/national_id_ocr_api',
    'global_api',
    'curl --location --request POST ''https://vnm-docs.hyperverge.co/v2/nationalID'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_image_file>"''',
    '{"status":"success","statusCode":"200","requestId":"<Request_ID>","transactionId":"<Transaction_ID>","result":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"422","description":"onfidence is low\\" } ]} Error Response​ The following are the error responses from the API:422 - National ID Not Detected400 - Input Error429 - Rate limit exceeded500 - Internal Server Error{\\"status\\": \\"failure\\",\\"statusCode\\": \\"422\\",\\"error\\": \\"Vietnam National ID Not Detected\\",\\"requestId\\": \\"16004...","example_response":"..."},{"status_code":"500","description":"ilure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table...","example_response":"..."},{"status_code":"400","description":"message\\": \\"Vietnam National ID Not Detected\\" } ] }}}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"400\\",\\"error\\": \\"API call requires atlest one input image\\" or \\"transactionid Not Detected\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"...","example_response":"..."},{"status_code":"429","description":"equires atlest one input image\\" or \\"transactionid Not Detected\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response from the module contains a fail...","example_response":"..."}]'::jsonb
);

-- Global API 3: USA Driver's License Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'USA Driver''s License Verification API',
    'This document highlights the details of the USA Driver''s License Verification API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_dl_verification_api',
    'global_api',
    'curl --location --request POST ''https://usa.thomas.hyperverge.co/v1/dlVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--data ''{    "firstName": "<Enter_first_name>",    "lastName": "<Enter_last_name>",    "state": "<Enter_state>",    "dlNumber": "<Enter_DL_number>",    "dob": "<Enter_date_of_birth>",    // The following fields are optional and are only required when searching for states not covered by the AAMVA database.    "address": "<Enter_the_Address>",     "zip": "<Enter_the_ZIP_Code>",     "city": "<Enter_the_City_Name>" }''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"eld DriverLicenseNumber is invalid\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the API contains a failure status with a relevant status code and error message. The following table lists all the er...","example_response":"..."},{"status_code":"400","description":"t matching\\" } ] } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Required field State is invalid\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"\\\\\\"dob\\\\\\" must be in DD-MM-YYYY format\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\",...","example_response":"..."}]'::jsonb
);

-- Global API 4: Dukcapil With FaceMatch API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Dukcapil With FaceMatch API',
    'This document highlights the Dukcapil with Face Match API details.',
    'https://documentation.hyperverge.co/api-reference/global_api/dukcapil_with_facematch_api',
    'global_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/dukcapilWithFacematch'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "id": "<Enter_the_ID>",    "image": "<Enter_the_base64_image_data>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"message\\": \\"<Message_About_The_Result>\\",    \\"details\\": {      \\"score\\": \\"<Score>\\",      \\"match\\": \\"<Match_status>\\",    },     \\"s3Url\\": \\"<S3_URL_link>\\"    },  },  \\"metaData\\": {    \\"requestId\\": \\"<Unique_Request_Identifier>\\",    \\"transactionId\\": \\"<Unique_Transaction_Identifier>\\"  }"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table...","example_response":"..."},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains...","example_response":"..."},{"status_code":"400","description":"Missing/Invalid CredentialsInternal Server Error{ \\"message\\": \\"Image not found\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Invalid file type for: image\\", \\"statusCode\\": 400,...","example_response":"..."}]'::jsonb
);

-- Global API 5: Face Match API - Global
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Face Match API - Global',
    'The Face Match API determines whether two facial images belong to the same person.',
    'https://documentation.hyperverge.co/api-reference/global_api/global_face_match_api',
    'global_api',
    'curl --location --request POST ''https://<regionCode>.idv.hyperverge.co/v1/matchFace'' \\--header ''appId:<Enter_the_HyperVerge_appId>'' \\--header ''appKey:<Enter_the_HyperVerge_appKey>'' \\--header ''transactionId:<Enter_the_HyperVerge_transactionID>'' \\--header ''content-type: multipart/form-data'' \\--form ''selfie=@abc.png'' \\--form ''id=@xyz.png''',
    '{"status":"failure","statusCode":"400","error":"Face not detected in ID image"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"500","description":"limit exceededThe number of transactions per minute has crossed the limit set for your credentials.500/501Internal Server ErrorPlease check the request headers or contact the HyperVerge team for resolution.503DEPENDENCY SERVER BUSYThere is an overload on HyperVerge''s server. Please try again after som...","example_response":"..."},{"status_code":"503","description":"\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\" } Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following tabl...","example_response":"..."},{"status_code":"400","description":"mageIncorrect ParametersIncorrect SizeInvalid idFaceString{ \\"status\\" : \\"failure\\", \\"statusCode\\" : \\"400\\", \\"error\\" : \\"Face not detected in ID image\\"}{\\"status\\" : \\"failure\\",\\"statusCode\\" : \\"400\\",\\"error\\" : \\"Face not detected in Selfie image\\"}{\\"status\\" : \\"failure\\",\\"statusCode\\" : \\"400\\",\\"error\\" : \\"Missing / W...","example_response":"..."},{"status_code":"429","description":"\\"423\\",\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUS...","example_response":"..."},{"status_code":"501","description":"\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\" } Error Response Details​ A failure or error response from the module contains a...","example_response":"..."},{"status_code":"423","description":"the documentation\\" } ] } }}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"423\\",\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"inte...","example_response":"..."}]'::jsonb
);

-- Global API 6: Video KYC APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Video KYC APIs',
    'The following APIs are available for video-based KYC (Know Your Customer) processes:',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 7: EVN OCR API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'EVN OCR API',
    'The Vietnam Electricity (EVN) OCR API authenticates the EVN bills by comparing user-entered data with text extracted from uploaded bill images.',
    'https://documentation.hyperverge.co/api-reference/Vietnam APIs/OCR APIs/evn_ocr_api',
    'global_api',
    'curl --location --request POST ''https://apac.docs.hyperverge.co/v1/verifyEVN'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image1=@"<path_to_image>"'' \\--form ''name="<Enter_name_on_card>"'' \\--form ''address="<Enter_address_on_card>"'' \\--form ''amount="<Enter_amount>"'' \\--form ''evnId="<Enter_evn_id>"'' \\--form ''fromDate="<Enter_from_date>"'' \\--form ''toDate="<Enter_to_date>"''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]","requestId":"<Request_ID>"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"429","description":"Response Samples​ Rate Limit ExceededInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Rate limit exceeded\\"}The following is a sample response for a server error:{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Respon...","example_response":"..."},{"status_code":"500","description":"g is a sample response for a server error:{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table...","example_response":"..."},{"status_code":"400","description":"when no matching record is found against the input parameter. { \\"status\\": \\"failure\\", \\"statusCode\\": 400,\\"error\\": \\"API call requires atlest one input image\\"} Error Response Samples​ Rate Limit ExceededInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Rate limit exceeded\\"}The...","example_response":"..."}]'::jsonb
);

-- Global API 8: Emirates Verification APIs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Emirates Verification APIs',
    'The following APIs are available for verifying Emirates ID cards and extracting identity information:',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 10: Social Security Number Verification API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Social Security Number Verification API',
    'This document highlights the details of the Social Security Number Verification API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_ssn_verifcation_api',
    'global_api',
    'curl --location --request POST ''https://usa.thomas.hyperverge.co/v1/ssnVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "firstName": "<Enter_the_first_name>",    "lastName": "<Enter_the_last_name>",    "ssn": "<Enter_the_SSN>"}''',
    '{"status":"success","statusCode":"200","result":"[Complex Object]"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"400","description":"Name is EmptyInput Validation Error- Last Name is Empty{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ssn is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"firstName is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"lastName is requir...","example_response":"..."},{"status_code":"401","description":"Name CharactersInvalid SSN Characters{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Please provide valid firstName\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Please provide val...","example_response":"..."}]'::jsonb
);

-- Global API 11: Sales PDF OCR API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Sales PDF OCR API',
    'This document outlines the details of the Sales PDF OCR API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_sales_pdf_ocr_api',
    'global_api',
    'curl --location --request POST ''https://usa-engine.thomas.hyperverge.co/v1/readMCASalesApplication'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''pdfFile=@"<path_to_pdf_file>"''',
    '{"status":"success","statusCode":200,"result":"[Complex Object]","metadata":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"422","description":"tusCode\\": 400, \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 422, \\"error\\": \\"Document Not Detected\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or error response contains a fa...","example_response":"..."},{"status_code":"400","description":"I: Missing Input FileInvalid File TypeIncorrect Document Type{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid input passed for field ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 422, \\"error\\":...","example_response":"..."}]'::jsonb
);

-- Global API 12: Enrol API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Enrol API',
    'The Enrol API is used to enrol users in the Monitoring DB.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML%20Ongoing%20Monitoring/enrol_api',
    'global_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/amlMonitoringEnrol'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "customerId": "<Request_ID_of_the_original_AML_Search_Call>"}''',
    '{"status":"success","statusCode":200,"result":"[Complex Object]"}'::jsonb,
    '[{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."},{"status_code":"","description":"...","example_response":"..."}]'::jsonb,
    '[{"status_code":"400","description":"when no matching record is found against the Customer ID:{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"result\\": { // This error can be thrown when the corresponding request and // response data for requestID are not found \\"message\\": \\"Invalid CustomerId. No records found.\\" }}The fo...","example_response":"..."},{"status_code":"500","description":"is a sample response for a server error. { \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table...","example_response":"..."}]'::jsonb
);

-- Global API 13: Monitoring Report API
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'Monitoring Report API',
    'The Monitoring Report  API retrieves a client''s monitoring summary for a specific date, returning the total number of applications enrolled for monitoring as well as the existing ones if changes are observed in them. Additionally, it includes the history of changes with their respective timestamps.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML%20Ongoing%20Monitoring/monitoring_report_api',
    'global_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/amlMonitoringReport'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "queryDate": "<YYYY-MM-DD_FORMAT>"}''',
    '{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": 200,    \\"metaData\\": {        \\"transactionId\\": <Transaction_ID>,        \\"requestId\\": <Request_ID>    },    \\"result\\": {        \\"message\\": \\"Report Fetched Successfully\\",        \\"metaData\\": {            \\"recordsMonitored\\": 0,            \\"needsReview\\": 0        },        \\"recordsToBeReviewed\\": []    }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"g is a sample response for a server error.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table lists all er...","example_response":"..."},{"status_code":"401","description":"for Missing or Invalid credentials.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following is a sample response for a server error.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure...","example_response":"..."},{"status_code":"400","description":"ror.{ \\"message\\": \\"Input Validation Error: Date should be in YYYY-MM-DD format\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}The following is a sample response for Missing or Invalid credentials.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following...","example_response":"..."}]'::jsonb
);

-- Global API 14: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/kenyan_id_check_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 15: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/nin_lookup_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 16: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/phone_check_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 17: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/tin_check_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 18: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_dl_verification_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 19: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_secretary_of_state_search_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 20: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 21: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 22: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/enrol_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 23: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/monitoring_report_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 24: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 25: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v1_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 26: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v2_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 27: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 28: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/OCR_country_docs_list\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 29: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 30: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/upload_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 31: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/vkyc_generic_webhook\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 32: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/aml_screening_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 33: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/dukcapil_with_facematch_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 34: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/field_match_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 35: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/geo_ip_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 36: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/global_face_match_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 37: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/philsysqrcheck_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 38: HyperVerge Docs
INSERT INTO public.api_documentation (
    name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/selfie_validation_api\\n',
    'global_api',
    NULL,
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

COMMIT;

-- Verification query to check import
-- SELECT category, COUNT(*) FROM api_documentation GROUP BY category;
