-- Auto-generated SQL for importing HyperVerge API Documentation
-- Generated on: 2026-03-11T07:47:12.621Z
-- Total APIs: 245

BEGIN;


-- India API 1: Disability Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Disability Verification API',
    'The Disability Verification API verifies an person with disability''s disability information against authoritative government systems using the Unique Disability ID (UDID) and returns validated profile details, disability status, application state, and an optional certificate download link.',
    'https://documentation.hyperverge.co/api-reference/india_api/disability_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/disabilityVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{  "idNumber": "<Enter_the_UDID>",  "dob": "<Enter_the_DoB_in_DD-MM-YYYY>",  "getCertificate": <Enter_true_or_false>}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"data\\": {      \\"id_number\\": \\"<ID_Number>\\",      \\"dob\\": \\"<Date_of_Birth>\\",      \\"details\\": {        \\"application_number\\": \\"<Application_Number>\\",        \\"udid_number\\": \\"<UDID_Number>\\",        \\"regional_language\\": \\"<Regional_Language_Code>\\",        \\"full_name\\": \\"<Full_Name>\\",        \\"father_name\\": \\"<Father_Name>\\",        \\"gender\\": \\"<Gender>\\",        \\"mobile\\": \\"<Mobile_Number>\\",        \\"email\\": \\"<Email_Address>\\",        \\"current_address\\": \\"<Current_Address>\\",        \\"current_state_code\\": \\"<Current_State_Code>\\",        \\"current_district_code\\": \\"<Current_District_Code>\\",        \\"current_subdistrict_code\\": \\"<Current_Subdistrict_Code>\\",        \\"current_village_code\\": \\"<Current_Village_Code>\\",        \\"current_pincode\\": \\"<Current_Pincode>\\",        \\"disability_type_id\\": \\"<Disability_Type_Id>\\",        \\"application_status\\": \\"<Application_Status_Code>\\",        \\"pwd_card_expiry_date\\": \\"<PWD_Card_Expiry_Date>\\",        \\"disability_type_pt\\": \\"<Disability_Type_Classification>\\",        \\"certificate_generate_date\\": \\"<Certificate_Generate_Date>\\",        \\"aadhaar_number\\": \\"<Aadhaar_Number>\\",        \\"transfer_date\\": \\"<Transfer_Date>\\",        \\"rejected_date\\": \\"<Rejected_Date>\\",        \\"is_ekyc\\": \\"<Is_eKYC>\\",        \\"disability_percentage\\": \\"<Disability_Percentage>\\",        \\"disability_type\\": \\"<Disability_Type>\\",        \\"pwd_application_status\\": {          \\"status_name\\": \\"<Application_Status_Name>\\"        },        \\"pwd_dispatch\\": {          \\"dispatch_date\\": \\"<Dispatch_Date>\\"        }      },      \\"link\\": \\"<Certificate_Download_URL>\\" // returned when the getCertificate parameter is enabled in the request body    },    \\"status_code\\": 200,    \\"success\\": true,    \\"message\\": \\"<Message>\\",    \\"message_code\\": \\"<Message_Code>\\"  },  \\"metadata\\": {    \\"requestId\\": \\"<Request_ID>\\",    \\"transactionId\\": \\"<Transaction_ID>\\"  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"error\\": \\"idnumber is invalid\\", \\"statusCode\\": 422, \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or error response from the module contains a failure status, with a releva","example_response":""},{"status_code":"400","description":"idNumber{ \\"message\\": \\"Input Validation Error: DoB should be in DD-MM-YYYY format\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: idNumber does not meet minimum length of 18\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: getCertifica","example_response":""}]'::jsonb
);

-- India API 2: PAN Utility APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'PAN Utility APIs',
    'The following is a list of all PAN Utility APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 3: Bank Account Verification APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Bank Account Verification APIs',
    'The following is a list of all Bank Account Verification APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 4: UPI Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'UPI Verification API',
    'This document outlines the details of the UPI Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/upi_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/UPIVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "UPIId": "<Enter_the_UPI_ID>"}''',
    '{"status":"success","statusCode":"200","result":{"data":{"accountExists":true,"UPIHolderName":"<Name_of_UPI_account_holder>"}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"response for an invalid UPI ID. Error - Failed at Bank { \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"message\\": \\"Failed at bank\\" }} Error Response Details​ Status CodeError MessageError Description400Missing required request parameters. Some mandatory request parameters are","example_response":""}]'::jsonb
);

-- India API 5: IEC Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'IEC Verification API',
    'The following document outlines the details of the IEC Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/iec_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/iecVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "iecNumber": "<Enter_the_IEC_Number>"}''',
    '{"status":"success","statusCode":"200","result":{"errdata":null,"data":{"iec_number":"<IEC_Number>","iec_status":"<IEC_Status>","firm_name":"<Name_Of_The_Firm>","nature_of_concern":"<Type_Of_firm>","category_of_exporters":"<Category_Of_Exporter>","dob_incorporation":"<Date_Of_Incorporation_in_DD-MM-YYYY_Format>","pan_number":"<Firm_PAN_Number>","file_number":"<File_Number>","file_date":"<File_Date_in_DD-MM-YYYY_Format>","firm_mobile":"<Firm_Mobile_Number>","firm_email":"<Firm_Email_Address>","address":"<Registered_Address_Of_The_Firm>","branch_details":[],"owner_details":[{"serial_number":"<Serial_Number>","pan_number":"<Owner_PAN_Number>","name":"<Name_Of_The_Owner>","father_name":"<Father_Name_Of_The_Owner>","address":"<Address_Of_The_Owner>"},{"serial_number":"<Serial_Number>","pan_number":"<Owner_PAN_Number>","name":"<Name_Of_The_Owner>","father_name":"<Father_Name_Of_The_Owner>","address":"<Address_Of_The_Owner>"}],"RCMC":[{"slno":"<Serial_Number>","rcmcNumber":"<RCMC_Number>","issueDate":"<RCMC_Issue_Date_in_DD-MM-YYYY_Format>","issueAuthority":"<Issuing_Authority>","productsForWhichRegistered":"<Products_Registered_For>","expiryDate":"<RCMC_Expiry_Date_in_DD-MM-YYYY_Format>","status":"<RCMC_Status>","source":"<Source>","exporterType":"<Type_Of_Exporter>","validityPeriod":"<Validity_Period>","validatedByEpc":"<Validation_By_EPC>"},{"slno":"<Serial_Number>","rcmcNumber":"<RCMC_Number>","issueDate":"<RCMC_Issue_Date_in_DD-MM-YYYY_Format>","issueAuthority":"<Issuing_Authority>","productsForWhichRegistered":"<Products_Registered_For>","expiryDate":"<RCMC_Expiry_Date_in_DD-MM-YYYY_Format>","status":"<RCMC_Status>","source":"<Source>","exporterType":"<Type_Of_Exporter>","validityPeriod":"<Validity_Period>","validatedByEpc":"<Validation_By_EPC>"}],"iec_issue_date":"<IEC_Issue_Date_in_DD-MM-YYYY_Format>","del_status":"<Deletion_Status>","dgft_ra_office":"<DGFT_RA_Office>","iec_cancelled_date":"<IEC_Cancellation_Date>","iec_suspended_date":"<IEC_Suspension_Date>"},"message":"<Success_Message>","requestid":"<Request_ID>","sequenceId":"<Sequence_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"erro","example_response":""},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction","example_response":""},{"status_code":"404","description":"g code snippet displays a failure response from the API: { \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"IEC number not found\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Responses​ The following are some error responses","example_response":""},{"status_code":"503","description":"D>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"error\\": \\"source not available\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Failure and Error Response Details​ A failure or error resp","example_response":""},{"status_code":"400","description":"alid CredentialsInternal Server ErrorSource Not Available{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Please provide valid IEC number\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400,","example_response":""}]'::jsonb
);

-- India API 6: Face Match API - India
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Face Match API - India',
    'The Face Match API determines whether two facial images belong to the same person.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_match_api',
    'india_api',
    'curl --location --request POST ''https://ind-faceid.hyperverge.co/v1/photo/verifyPair'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''selfie=@"<path_to_selfie_image>"'' \\--form ''id=@"<path_to_id_image>"''',
    '{"raw":"{  \\t\\"status\\" : \\"success\\",  \\t\\"statusCode\\" : \\"200\\",  \\t\\"result\\" : {          \\"match\\" : \\"yes/no\\",          \\"match-score\\" : 95, // This is a number between 0-100          \\"conf\\" :97,            \\"to-be-reviewed\\": \\"yes/no\\",  \\t} }"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"returned when the number of transactions per minute has crossed the limit set for your credentials.500/501Internal Server ErrorThis happens when there is an error with HyperVerge''s server.503Server busyThis happens when there is an overload on HyperVerge''s server.Last updated on Mar 3, 2026PreviousFin","example_response":""},{"status_code":"503","description":"e\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Status CodeError MessageError Description400Face not detected in Selfie image The AI model failed to detect the face in the selfie.400Face not detected in ID imag","example_response":""},{"status_code":"400","description":"tected in the selfie image. Error Responses​ The following sample responses reflect the status code 400. Face Not DetectedSelfie ImageIncorrect ParametersIncorrect SizeInvalid idFaceString{ \\"status\\" : \\"failure\\", \\"statusCode\\" : \\"400\\", \\"error\\" : \\"Face not detected in ID image\\"}{ \\"status\\" : \\"failure\\", \\"st","example_response":""},{"status_code":"429","description":"\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER B","example_response":""},{"status_code":"501","description":"atusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Status CodeError MessageError Description400Face not detected in Selfie image The A","example_response":""},{"status_code":"423","description":"quests Rate Limit ExceededInternal Server ErrorServer Busy{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"423\\", \\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\",","example_response":""}]'::jsonb
);

-- India API 7: GST Authentication APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'GST Authentication APIs',
    'A collection of APIs for authenticating and retrieving details for Indian GSTINs (Goods and Services Tax Identification Numbers).',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 8: Bank Statement Analysis API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Bank Statement Analysis API',
    'The Bank Statement Analysis API extracts transactions from bank statements using OCR (Optical Character Recognition) in JSON format. It can also analyze and produce insights from them in the form of a JSON.',
    'https://documentation.hyperverge.co/api-reference/india_api/bank_statement_analysis_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/bank_statement_analysis'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''pdf=@"<path_to_pdf_file>"'' \\--form ''password='' \\--form ''enableFraudChecks="yes"'' \\--form ''extractEntities="yes"'' \\--form ''country="ind"'' \\--form ''returnTransactions="yes"'' \\--form ''transactionThreshold="0"'' \\--form ''formatDateYearFirst="no"'' \\--form ''allowImagePDF="yes"'' \\--form ''returnS3Url="yes"'' \\--form ''flagTransactions="yes"'' \\--form ''returnRecurringTransactions="yes"'' \\--form ''returnAverageMonthlyBalance="yes"'' \\--form ''returnStatementSummary="yes"'' \\--form ''returnEODBalances="yes"'' \\--form ''returnSalaryInfo="yes"''',
    '{"status":"success","statusCode":"<Status_Code_Number>","result":[{"details":{"documentType":"<Document_Type_String>","transactionThreshold":"<Transaction_Threshold_Number>","transactions":[{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"},{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"},{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"},{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"},{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"},{"date":"<Transaction_Date_in_DD/MM/YYYY_Format>","description":"<Transaction_Description_String>","mode":"<Transaction_Mode>","entityName":"<Entity_Name>","entityName2":"<Entity_Name_Alternative>","value":"<Transaction_Value_Number>","type":"<Transaction_Type>","isSalary":"<Is_Salary_Boolean>","balance":"<Balance_After_Transaction_Number>"}],"transactions_count":"<Total_Transactions_Count_Number>","num_pages":"<Number_Of_Pages_In_Statement>","total_credit_transactions_count":"<Total_Credit_Transactions_Count>","total_credit_transactions_value":"<Total_Credit_Transactions_Value_Number>","total_debit_transactions_count":"<Total_Debit_Transactions_Count>","total_debit_transactions_value":"<Total_Debit_Transactions_Value_Number>","summary":{"overall":{"numberOfTransactions":"<Overall_Number_Of_Transactions>","openingBalance":"<Overall_Opening_Balance_Number>","closingBalance":"<Overall_Closing_Balance_Number>","minimumBalance":"<Overall_Minimum_Balance_Number>","maximumBalance":"<Overall_Maximum_Balance_Number>","averageBalance":"<Overall_Average_Balance_Number>","minimumDailyBalance":"<Overall_Minimum_Daily_Balance_Number>","maximumDailyBalance":"<Overall_Maximum_Daily_Balance_Number>","averageDailyBalance":"<Overall_Average_Daily_Balance_Number>","minimumWeeklyBalance":"<Overall_Minimum_Weekly_Balance_Number>","maximumWeeklyBalance":"<Overall_Maximum_Weekly_Balance_Number>","averageWeeklyBalance":"<Overall_Average_Weekly_Balance_Number>","minimumMonthlyBalance":"<Overall_Minimum_Monthly_Balance_Number>","maximumMonthlyBalance":"<Overall_Maximum_Monthly_Balance_Number>","averageMonthlyBalance":"<Overall_Average_Monthly_Balance_Number>","numberOfCreditTransactions":"<Overall_Number_Of_Credit_Transactions>","totalCreditAmount":"<Overall_Total_Credit_Amount_Number>","minimumCreditAmount":"<Overall_Minimum_Credit_Amount_Number>","maximumCreditAmount":"<Overall_Maximum_Credit_Amount_Number>","averageCreditAmount":"<Overall_Average_Credit_Amount_Number>","numberOfDebitTransactions":"<Overall_Number_Of_Debit_Transactions>","totalDebitAmount":"<Overall_Total_Debit_Amount_Number>","minimumDebitAmount":"<Overall_Minimum_Debit_Amount_Number>","maximumDebitAmount":"<Overall_Maximum_Debit_Amount_Number>","averageDebitAmount":"<Overall_Average_Debit_Amount_Number>","numberOfSalaryTransactions":"<Overall_Number_Of_Salary_Transactions>","totalSalaryAmount":"<Overall_Total_Salary_Amount_Number>","averageSalaryAmount":"<Overall_Average_Salary_Amount_Number>","creditDebitRatio":"<Overall_Credit_Debit_Ratio_Number>"},"monthly":[{"month":"<Month_Number>","year":"<Year_Number>","numberOfTransactions":"<Monthly_Number_Of_Transactions>","openingBalance":"<Monthly_Opening_Balance_Number>","closingBalance":"<Monthly_Closing_Balance_Number>","minimumBalance":"<Monthly_Minimum_Balance_Number>","maximumBalance":"<Monthly_Maximum_Balance_Number>","averageBalance":"<Monthly_Average_Balance_Number>","minimumDailyBalance":"<Monthly_Minimum_Daily_Balance_Number>","maximumDailyBalance":"<Monthly_Maximum_Daily_Balance_Number>","averageDailyBalance":"<Monthly_Average_Daily_Balance_Number>","minimumWeeklyBalance":"<Monthly_Minimum_Weekly_Balance_Number>","maximumWeeklyBalance":"<Monthly_Maximum_Weekly_Balance_Number>","averageWeeklyBalance":"<Monthly_Average_Weekly_Balance_Number>","numberOfCreditTransactions":"<Monthly_Number_Of_Credit_Transactions>","totalCreditAmount":"<Monthly_Total_Credit_Amount_Number>","minimumCreditAmount":"<Monthly_Minimum_Credit_Amount_Number>","maximumCreditAmount":"<Monthly_Maximum_Credit_Amount_Number>","averageCreditAmount":"<Monthly_Average_Credit_Amount_Number>","numberOfDebitTransactions":"<Monthly_Number_Of_Debit_Transactions>","totalDebitAmount":"<Monthly_Total_Debit_Amount_Number>","minimumDebitAmount":"<Monthly_Minimum_Debit_Amount_Number>","maximumDebitAmount":"<Monthly_Maximum_Debit_Amount_Number>","averageDebitAmount":"<Monthly_Average_Debit_Amount_Number>","numberOfSalaryTransactions":"<Monthly_Number_Of_Salary_Transactions>","totalSalaryAmount":"<Monthly_Total_Salary_Amount_Number>","averageSalaryAmount":"<Monthly_Average_Salary_Amount_Number>","eodBalances":"<Array_Of_End_Of_Day_Balance_Numbers>"},{"month":"<Month_Number>","year":"<Year_Number>","numberOfTransactions":"<Monthly_Number_Of_Transactions>","openingBalance":"<Monthly_Opening_Balance_Number>","closingBalance":"<Monthly_Closing_Balance_Number>","minimumBalance":"<Monthly_Minimum_Balance_Number>","maximumBalance":"<Monthly_Maximum_Balance_Number>","averageBalance":"<Monthly_Average_Balance_Number>","minimumDailyBalance":"<Monthly_Minimum_Daily_Balance_Number>","maximumDailyBalance":"<Monthly_Maximum_Daily_Balance_Number>","averageDailyBalance":"<Monthly_Average_Daily_Balance_Number>","minimumWeeklyBalance":"<Monthly_Minimum_Weekly_Balance_Number>","maximumWeeklyBalance":"<Monthly_Maximum_Weekly_Balance_Number>","averageWeeklyBalance":"<Monthly_Average_Weekly_Balance_Number>","numberOfCreditTransactions":"<Monthly_Number_Of_Credit_Transactions>","totalCreditAmount":"<Monthly_Total_Credit_Amount_Number>","minimumCreditAmount":"<Monthly_Minimum_Credit_Amount_Number>","maximumCreditAmount":"<Monthly_Maximum_Credit_Amount_Number>","averageCreditAmount":"<Monthly_Average_Credit_Amount_Number>","numberOfDebitTransactions":"<Monthly_Number_Of_Debit_Transactions>","totalDebitAmount":"<Monthly_Total_Debit_Amount_Number>","minimumDebitAmount":"<Monthly_Minimum_Debit_Amount_Number>","maximumDebitAmount":"<Monthly_Maximum_Debit_Amount_Number>","averageDebitAmount":"<Monthly_Average_Debit_Amount_Number>","numberOfSalaryTransactions":"<Monthly_Number_Of_Salary_Transactions>","totalSalaryAmount":"<Monthly_Total_Salary_Amount_Number>","averageSalaryAmount":"<Monthly_Average_Salary_Amount_Number>","eodBalances":"<Array_Of_End_Of_Day_Balance_Numbers>"}]}},"fraudChecks":{"date":"<Fraud_Check_Date_Status>"},"s3url":"<S3_Bucket_URL_For_Statement_PDF>"}]}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"was incorrect\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"message\\": \\"internal server error\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table","example_response":""},{"status_code":"400","description":"Server Error{ \\"message\\": \\"Input Validation Error: requires property \\\\\\"uploadPdf\\\\\\"\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Invalid file type for: uploadPdf\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Password provided was incorrect\\", \\"statusCode\\": 400, \\"status\\":","example_response":""}]'::jsonb
);

-- India API 9: Masked PAN from DIN API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Masked PAN from DIN API',
    'This document highlights the Masked PAN from DIN API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/masked_pan_from_din_api',
    'india_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/maskedPanFromDin'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "dinNumber": "<Enter_the_DIN>"}''',
    '{"status":"success","statusCode":"200","result":{"message":"<Message_About_The_Result>","details":{"dinNumber":"<Masked_DIN_Number>","dinStatus":"<DIN_Status>","panNumber":"<Masked_PAN_Number>","firstName":"<First_Name_Of_The_user>","middleName":"<Middle_Name_Of_The_user_If_Available>","lastName":"<Last_Name_Of_The_user>","dateOfBirth":"<Date_Of_Birth_in_DD-MMM-YYYY_Format>","fatherFirstName":"<Father''s_First_Name>","fatherMiddleName":"<Father''s_Middle_Name_If_Available>","fatherLastName":"<Father''s_Last_Name>","residentOfIndia":"<Is_Resident_Of_India_Y/N>","membershipNumber":"<Membership_Number_If_Available>"}},"metaData":{"requestId":"<Request_ID>","transactionId":"<Transaction_ID>"}}'::jsonb,
    '[{"raw":"{   \\"message\\": \\"External vendor downtime\\",   \\"statusCode\\": 503,   \\"status\\": \\"failure\\",   \\"error\\": \\"EXTERNAL_DOWNTIME\\"    \\"metaData\\": {      \\"requestId\\": \\"<Request_ID>\\",      \\"transactionId\\": \\"<Transaction_ID>\\"      }   }"},{"raw":"{   \\"message\\": \\"External vendor downtime\\",   \\"statusCode\\": 503,   \\"status\\": \\"failure\\",   \\"error\\": \\"EXTERNAL_DOWNTIME\\"    \\"metaData\\": {      \\"requestId\\": \\"<Request_ID>\\",      \\"transactionId\\": \\"<Transaction_ID>\\"      }   }"}]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\" \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"","example_response":""},{"status_code":"401","description":"ternal Server ErrorExternal Downtime{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\",","example_response":""},{"status_code":"503","description":"statusCode\\": 500, \\"status\\": \\"failure\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\" \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" } } Failure and Error Response Details​ A fai","example_response":""},{"status_code":"400","description":"d formatIncorrect Data Type Missing Parameter: DIN{ \\"message\\": \\"Invalid value\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Number must be an 8-digit numeric value\\", \\"statusCode","example_response":""}]'::jsonb
);

-- India API 10: IFSC Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'IFSC Verification API',
    'The following document highlights the details of the IFSC Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/ifsc_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/verifyIFSC'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "ifscCode": "<Enter_the_valid_IFSC>"}''',
    '{"status":"success","statusCode":200,"result":{"status":"Success","message":"Ifsc verification successful","bank":"<Name_of_the_Bank>","ifsc":"<Bank_IFSC>","neft":"Live","imps":"Live","rtgs":"Live","upi":"Live","micr":"<MICR_Value>","address":"<Branch_Address>","city":"<Name_of_the_City>","state":"<Name_of_the_State>","branch":"<Name_of_the_Branch>","ifscSubcode":"<IFSC_Subcode>","swiftCode":""},"metaData":{"requestId":"<Request_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"essage\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 500, \\"status\\": \\"failure\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The followi","example_response":""},{"status_code":"401","description":"5th character of IFSC Code should be 0\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 500, \\"status\\": \\"failure\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response contains a failure status with a relevan","example_response":""},{"status_code":"404","description":"a failure response from the IFSC Verification API when the IFSC code is not found: { \\"statusCode\\": 404, \\"status\\": \\"failure\\", \\"error\\": \\"IFSC Code not found\\"} Error Responses​ The following are some error responses from the IFSC Verification API: Input Validation - LengthInvalid IFSC - 1Invalid IFSC -","example_response":""},{"status_code":"400","description":"ver Error{ \\"message\\": \\"Input Validation Error: does not meet minimum length of 11\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"error\\": \\"Invalid IFSC Code\\"}{ \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"error\\": \\"Invalid IFSC. 5th character of IFSC Code should","example_response":""}]'::jsonb
);

-- India API 11: NACH Extraction API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'NACH Extraction API',
    'The following document highlights the details of the NACH Extraction API.',
    'https://documentation.hyperverge.co/api-reference/india_api/nach_extraction_api',
    'india_api',
    'curl --location ''https://ind-engine.thomas.hyperverge.co/v1/nach_extraction'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_nach_image>"'' \\--form ''enableOutputJPEG="no"'' \\--form ''enableOutputTIF="no"'' \\--form ''enableOutputPDF="no"'' \\--form ''templateVersion="v3"''',
    '{"status":"success","statusCode":"200","result":{"type":"nach","details":{"UMRN":{"conf":0.95,"value":"<UMRN_Number>","to-be-reviewed":"no"},"nachDate":{"conf":0.98,"value":"<NACH_Date>","to-be-reviewed":"no"},"sponsorCode":{"conf":0.92,"value":"<Sponsor_Code>","to-be-reviewed":"no"},"utilityCode":{"conf":0.96,"value":"<Utility_Code>","to-be-reviewed":"no"},"bankName":{"conf":0.94,"value":"<Bank_Name>","to-be-reviewed":"no"},"accountType":{"conf":0.88,"value":"<Account_Type>","to-be-reviewed":"no"},"IFSCCode":{"conf":0.97,"value":"<IFSC_Code>","to-be-reviewed":"no"},"MICR":{"conf":0.93,"value":"<MICR_Code>","to-be-reviewed":"no"},"companyName":{"conf":0.91,"value":"<Company_Name>","to-be-reviewed":"no"},"frequency":{"conf":0.89,"value":"<Frequency>","to-be-reviewed":"no"},"amountInNumber":{"conf":0.95,"value":"<Amount_Number>","to-be-reviewed":"no"},"amountInWords":{"conf":0.87,"value":"<Amount_Words>","to-be-reviewed":"no"},"debitType":{"conf":0.96,"value":"<Debit_Type>","to-be-reviewed":"no"},"startDate":{"conf":0.94,"value":"<Start_Date>","to-be-reviewed":"no"},"endDate":{"conf":0.92,"value":"<End_Date>","to-be-reviewed":"no"},"untilCanceled":{"conf":0.9,"value":"<Until_Canceled>","to-be-reviewed":"no"},"NACHType":{"conf":0.93,"value":"<NACH_Type>","to-be-reviewed":"no"},"phoneNumber":{"conf":0.88,"value":"<Phone_Number>","to-be-reviewed":"no"},"emailId":{"conf":0.85,"value":"<Email_ID>","to-be-reviewed":"no"},"reference1":{"conf":0.86,"value":"<Reference_1>","to-be-reviewed":"no"},"reference2":{"conf":0.84,"value":"<Reference_2>","to-be-reviewed":"no"},"signaturePresentPrimary":{"conf":0.91,"value":"<Yes_No>","to-be-reviewed":"no"},"signaturePresentSecondary":{"conf":0.89,"value":"<Yes_No>","to-be-reviewed":"no"},"signaturePresentTertiary":{"conf":0.87,"value":"<Yes_No>","to-be-reviewed":"no"},"primaryAccountHolder":{"conf":0.93,"value":"<Primary_Account_Holder_Name>","to-be-reviewed":"no"},"secondaryAccountHolder":{"conf":0.85,"value":"<Secondary_Account_Holder_Name>","to-be-reviewed":"no"},"tertiaryAccountHolder":{"conf":0.82,"value":"<Tertiary_Account_Holder_Name>","to-be-reviewed":"no"},"accountNumber":{"conf":0.96,"value":"<Account_Number>","to-be-reviewed":"no"}}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"Default: no Things to ensure​ Only use an image with markers, otherwise it would throw HTTP error 422 Request​ The following code snippet demonstrates a standard curl request for the NACH Extraction API: curl --location ''https://ind-engine.thomas.hyperverge.co/v1/nach_extraction'' \\\\--header ''Content-","example_response":""},{"status_code":"500","description":"e\\": \\"422\\", \\"error\\": \\"No NACH detected\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table","example_response":""},{"status_code":"400","description":"Error{ \\"message\\": \\"Input Validation Error: is not one of enum values: yes,no\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Input Validation Error: is not one of enum values: v1,v2,v3\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\",","example_response":""}]'::jsonb
);

-- India API 12: Shops and Establishment Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Shops and Establishment Verification API',
    'This document highlights the Shops and Establishment Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/shops_and_establishment_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-thomas.hyperverge.co/v1/verifyShopAndEstablishmentLicense'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "registrationNumber": "<Enter_the_registration_number>"}''',
    '{"status":"success","statusCode":200,"result":{"establishmentName":"<Establishment_Name>","establishmentCode":"<Establishment_Code>","primaryBusinessActivity":"<Primary_Business_Activity>","address":"<Establishment_Address>","city":"<City_Name>","state":"<State_Name>","district":"<District_Name>","pincode":"<Pincode>","establishmentStatus":"<Establishment_Status>","registrationStatus":"<Registration_Status>","dateOfCoverage":"<Date_Of_Coverage>","working_status":"<workingStatus>","excemptionStatus":"<Exemption_Status>","actionableStatus":"<Actionable_Status>"},"metaData":{"requestId":"<Unique_Request_Identifier>","transactionId":"<Unique_Transaction_Identifier>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<","example_response":""},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\",","example_response":""},{"status_code":"404","description":"\\"requestId\\": \\"\\", \\"transactionId\\": \\"\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"Registration Number Not Found.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404,","example_response":""},{"status_code":"503","description":"0, \\"error\\": \\"Internal Server Error\\"}{ \\"message\\": \\"External vendor downtime\\", \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or er","example_response":""},{"status_code":"400","description":"Invalid CredentialsInternal Server ErrorExternal Downtime{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Please provide valid registration number\\", \\"metaData\\": { \\"requestId\\": \\"\\", \\"transactionId\\": \\"\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"Registra","example_response":""}]'::jsonb
);

-- India API 13: Fetch IFSC from UPI ID API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Fetch IFSC from UPI ID API',
    'The following document highlights the details of the Fetch IFSC from UPI ID API.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_ifsc_from_upi_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/fetchUpiIfsc'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "vpa": "<Enter_the_VPA>",    "name": "<Enter_the_name>"}''',
    '{"status":"success","statusCode":"200","result":{"referenceId":"<Reference_ID>","status":"<Status_of_Vpa>","message":"<Vpa_Verification_Message>","ifsc":"<IFSC_Code>","vpa":"<Virtual_Payment_Address>","nameAtBank":"<Name_At_Bank>","ifscDetails":{"bank":"<Bank_Name>","neft":"<NEFT_Status>","imps":"<IMPS_Status>","rtgs":"<RTGS_Status>","upi":"<UPI_Status>","address":"<Bank_Address>","city":"<City>","state":"<State>","branch":"<Branch_Name>","category":"<Bank_Category>","swiftCode":"<SWIFT_Code>","micr":"<MICR_Code>","nbin":"<NBIN_Code>"}},"metaData":{"requestId":"<Request_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The following table lists all error responses:","example_response":""},{"status_code":"401","description":"\\"requestId\\": \\"<Request_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a re","example_response":""},{"status_code":"400","description":"ing/Invalid CredentialsInternal Server Error{ \\"message\\": \\"vpa should be valid\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\" }}{ \\"message\\": \\"vpa is missing in the request.\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": {","example_response":""}]'::jsonb
);

-- India API 14: FSSAI Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'FSSAI Verification API',
    'This document outlines the details of the FSSAI Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/fssai_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/verifyFSSAILicense'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "licenseNumber": "<Enter_the_14_digit_license_number>",    "consent": "<Enter_Y_or_N>",    "includeProducts": "<true_or_false>"}''',
    '{"status":"failure","statusCode":400,"error":"FSSAI license number invalid.","metaData":{"requestId":"<Request_ID>","transactionId":"<Transaction_ID>"}}'::jsonb,
    '[{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": 200,    \\"data\\": {        \\"name\\": \\"<Name_of_the_business>\\",        \\"address\\": \\"<Address_of_the_business>\\",        \\"taluk\\": \\"<Taluk>\\",        \\"district\\": \\"<District>\\",        \\"state\\": \\"<State>\\",        \\"pincode\\": \\"<PIN_Code>\\",        \\"fbo_id\\": \\"<Food_Business_Operator_ID>\\",        \\"type\\": \\"Central License\\",        \\"active\\": true,        \\"products\\": [            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Flavoured Milk\\"            },            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Ice Cream, Kulfi, Chocolate Ice Cream, Softy Ice-Cream, Milk Ice, Milk Lolly and Dried Ice Cream Mix\\"            },            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Frozen Desserts or Confections with Added Vegetable Oil/ Fat or Vegetable Protein, or both\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy- based drink Intermediate Product (Protein Rich Food)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy -based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy -based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy Based Drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Chilli Gravy Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Manchurian Gravy Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Manchurian Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Caramel Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Badam Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Caramel Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Regular Malt Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Hazelnut Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Vanilla Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Fruit Based Gummies (Strawberry flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy Based Drink\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Ice Lollies or Edible Ices\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Jams, Fruit Jellies and Marmalades\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Thermally Processed Fruit Pulp/ Puree and Sweetened Fruit Pulp/Puree other than Mango\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Atta \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Whole Maize (Corn) Flour\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Custard powder\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Rolled Oats\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Macaroni Products (Pre-Cooked)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Malted Milk Food\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Malt Based Foods(Malt Food)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Biscuit \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Iodised salt\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Iron Fortified Iodized Salt (double fortied salt)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Seasoning\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Soup Powders\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Tomato Ketchup and Tomato Sauce\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Culinary Sauce\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Squash \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Tea\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Coffee\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Coffee-Chicory Mixture\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Green Tea\\"            },            {                \\"kind_of_business_id\\": \\"151\\",                \\"kind_of_business_name\\": \\"Substances Added to Food\\",                \\"product_name\\": \\"Baking powder\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use- Food for Individuals to help support recovery (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use- Food for Individuals to Help Support Recovery (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use (Food for managing glucose (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Vanilla Flavor)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Strengthening Bones and Muscles\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Nutraceutical - Fruit Based Gummies (Strawberry Flavour) \\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\":\\"Nutraceutical  (Mulberry Leaf  Extract  Gummies  (IngredientsMulberry Leaf  Extract with  permitted list of  additives) \\"            }        ]    },    \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\"    }}### Success Response Details<table>  <thead>    <tr>      <th>Parameter</th>      <th>Type</th>      <th>Description</th>    </tr>  </thead>  <tbody>    <tr>      <td>status</td>      <td>string</td>      <td>The status of the API response</td>    </tr>    <tr>      <td>statusCode</td>      <td>integer</td>      <td>The HTTP status code returned by the API</td>    </tr>    <tr>      <td>name</td>      <td>string</td>      <td>The name of the FSSAI license holder</td>    </tr>    <tr>      <td>address</td>      <td>string</td>      <td>The address of the FSSAI license holder</td>    </tr>    <tr>      <td>taluk</td>      <td>string</td>      <td>The taluk associated with the license holder</td>    </tr>    <tr>      <td>district</td>      <td>string</td>      <td>The district associated with the license holder</td>    </tr>    <tr>      <td>state</td>      <td>string</td>      <td>The state in which the license is issued</td>    </tr>    <tr>      <td>pincode</td>      <td>string</td>      <td>The postal code of the license holder''s address</td>    </tr>    <tr>      <td>fbo_id</td>      <td>string</td>      <td>The Food Business Operator ID associated with the license</td>    </tr>    <tr>      <td>type</td>      <td>string</td>      <td>The type of FSSAI license issued</td>    </tr>    <tr>      <td>active</td>      <td>boolean</td>      <td>Indicates whether the FSSAI license is active</td>    </tr>    <tr>      <td>products</td>      <td>array</td>      <td>A list of products registered under the FSSAI license</td>    </tr>    <tr>      <td>kind_of_business_id</td>      <td>string</td>      <td>The ID representing the kind of business</td>    </tr>    <tr>      <td>kind_of_business_name</td>      <td>string</td>      <td>The name describing the kind of business</td>    </tr>    <tr>      <td>product_name</td>      <td>string</td>      <td>The name of the product registered under the license</td>    </tr>    <tr>      <td>requestId</td>      <td>string</td>      <td>The unique identifier associated with the API request</td>    </tr>    <tr>      <td>transactionId</td>      <td>string</td>      <td>The transaction identifier sent in the request</td>    </tr>  </tbody></table>## Failure ResponseThe following code snippet displays a failure response from the API:```json{    \\"status\\": \\"failure\\",    \\"statusCode\\": 404,    \\"error\\": \\"FSSAI license number does not exist.\\",    \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\"    }}"},{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": 200,    \\"data\\": {        \\"name\\": \\"<Name_of_the_business>\\",        \\"address\\": \\"<Address_of_the_business>\\",        \\"taluk\\": \\"<Taluk>\\",        \\"district\\": \\"<District>\\",        \\"state\\": \\"<State>\\",        \\"pincode\\": \\"<PIN_Code>\\",        \\"fbo_id\\": \\"<Food_Business_Operator_ID>\\",        \\"type\\": \\"Central License\\",        \\"active\\": true,        \\"products\\": [            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Flavoured Milk\\"            },            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Ice Cream, Kulfi, Chocolate Ice Cream, Softy Ice-Cream, Milk Ice, Milk Lolly and Dried Ice Cream Mix\\"            },            {                \\"kind_of_business_id\\": \\"101\\",                \\"kind_of_business_name\\": \\"Dairy units\\",                \\"product_name\\": \\"Frozen Desserts or Confections with Added Vegetable Oil/ Fat or Vegetable Protein, or both\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy- based drink Intermediate Product (Protein Rich Food)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy -based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy -based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy-based drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy Based Drink (Protein Rich Food) (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Chilli Gravy Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Manchurian Gravy Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Manchurian Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Caramel Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Badam Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Caramel Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage (Regular Malt Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Hazelnut Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Vanilla Flavored Instant Coffee\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Fruit Based Gummies (Strawberry flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Cereal Based Beverage Mix (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"109\\",                \\"kind_of_business_name\\": \\"Proprietary Food\\",                \\"product_name\\": \\"Dairy Based Drink\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Ice Lollies or Edible Ices\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Jams, Fruit Jellies and Marmalades\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Thermally Processed Fruit Pulp/ Puree and Sweetened Fruit Pulp/Puree other than Mango\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Atta \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Whole Maize (Corn) Flour\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Custard powder\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Rolled Oats\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Macaroni Products (Pre-Cooked)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Malted Milk Food\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Malt Based Foods(Malt Food)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Biscuit \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Iodised salt\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Iron Fortified Iodized Salt (double fortied salt)\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Seasoning\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Soup Powders\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Tomato Ketchup and Tomato Sauce\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Culinary Sauce\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Squash \\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Tea\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Coffee\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Coffee-Chicory Mixture\\"            },            {                \\"kind_of_business_id\\": \\"105\\",                \\"kind_of_business_name\\": \\" General Manufacturing\\",                \\"product_name\\": \\"Green Tea\\"            },            {                \\"kind_of_business_id\\": \\"151\\",                \\"kind_of_business_name\\": \\"Substances Added to Food\\",                \\"product_name\\": \\"Baking powder\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use- Food for Individuals to help support recovery (Chocolate Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use- Food for Individuals to Help Support Recovery (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use (Food for managing glucose (Vanilla Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Kesar Flavour)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Pregnant and Lactating Women (Vanilla Flavor)\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Food for Special Dietary Use - Food for Strengthening Bones and Muscles\\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\": \\"Nutraceutical - Fruit Based Gummies (Strawberry Flavour) \\"            },            {                \\"kind_of_business_id\\": \\"146\\",                \\"kind_of_business_name\\": \\"Food or Health Supplements and Nutraceuticals etc.\\",                \\"product_name\\":\\"Nutraceutical  (Mulberry Leaf  Extract  Gummies  (IngredientsMulberry Leaf  Extract with  permitted list of  additives) \\"            }        ]    },    \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\"    }}### Success Response Details<table>  <thead>    <tr>      <th>Parameter</th>      <th>Type</th>      <th>Description</th>    </tr>  </thead>  <tbody>    <tr>      <td>status</td>      <td>string</td>      <td>The status of the API response</td>    </tr>    <tr>      <td>statusCode</td>      <td>integer</td>      <td>The HTTP status code returned by the API</td>    </tr>    <tr>      <td>name</td>      <td>string</td>      <td>The name of the FSSAI license holder</td>    </tr>    <tr>      <td>address</td>      <td>string</td>      <td>The address of the FSSAI license holder</td>    </tr>    <tr>      <td>taluk</td>      <td>string</td>      <td>The taluk associated with the license holder</td>    </tr>    <tr>      <td>district</td>      <td>string</td>      <td>The district associated with the license holder</td>    </tr>    <tr>      <td>state</td>      <td>string</td>      <td>The state in which the license is issued</td>    </tr>    <tr>      <td>pincode</td>      <td>string</td>      <td>The postal code of the license holder''s address</td>    </tr>    <tr>      <td>fbo_id</td>      <td>string</td>      <td>The Food Business Operator ID associated with the license</td>    </tr>    <tr>      <td>type</td>      <td>string</td>      <td>The type of FSSAI license issued</td>    </tr>    <tr>      <td>active</td>      <td>boolean</td>      <td>Indicates whether the FSSAI license is active</td>    </tr>    <tr>      <td>products</td>      <td>array</td>      <td>A list of products registered under the FSSAI license</td>    </tr>    <tr>      <td>kind_of_business_id</td>      <td>string</td>      <td>The ID representing the kind of business</td>    </tr>    <tr>      <td>kind_of_business_name</td>      <td>string</td>      <td>The name describing the kind of business</td>    </tr>    <tr>      <td>product_name</td>      <td>string</td>      <td>The name of the product registered under the license</td>    </tr>    <tr>      <td>requestId</td>      <td>string</td>      <td>The unique identifier associated with the API request</td>    </tr>    <tr>      <td>transactionId</td>      <td>string</td>      <td>The transaction identifier sent in the request</td>    </tr>  </tbody></table>## Failure ResponseThe following code snippet displays a failure response from the API:```json{    \\"status\\": \\"failure\\",    \\"statusCode\\": 404,    \\"error\\": \\"FSSAI license number does not exist.\\",    \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\"    }}"}]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ An error response from the API contains a failure st","example_response":""},{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ An error response from the API contains a failure status, with a relevant status code and error message. The following table lists all err","example_response":""},{"status_code":"404","description":"snippet displays a failure response from the API:```json{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"FSSAI license number does not exist.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Responses​ The following are some erro","example_response":""},{"status_code":"400","description":"se NumberMissing/Invalid CredentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"FSSAI license number invalid.\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"","example_response":""}]'::jsonb
);

-- India API 15: GeoCoding API -v2
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'GeoCoding API -v2',
    'The GeoCoding API -v2 validates the address of the user by returning a Geolocation.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_apiV2',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/geoCodingV2'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{  "address": "<Enter_the_address>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": 200,  \\"result\\": {    \\"houseNumber\\": \\"<House_Number>\\",    \\"street\\": \\"<Street>\\",    \\"subSubLocality\\": \\"<Sub_Sub_Locality>\\",    \\"subLocality\\": \\"<Sub_Locality>\\",    \\"locality\\": \\"<Locality>\\",    \\"village\\": \\"<Village>\\",    \\"subDistrict\\": \\"<Sub_District>\\",    \\"district\\": \\"<District>\\",    \\"city\\": \\"<City>\\",    \\"state\\": \\"<State>\\",    \\"pincode\\": \\"<Pincode>\\",    \\"formattedAddress\\": \\"<Formatted_Address>\\",    \\"latitude\\": <Latitude>,    \\"longitude\\": <Longitude>  },  \\"metadata\\": {    \\"requestId\\": \\"<Request_ID>\\",    \\"transactionId\\": \\"<Transaction_ID>\\"  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"message\\": \\"External source d","example_response":""},{"status_code":"401","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 401, \\"error\\": \\"Invalid token.Please try again.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 401, \\"error\\": \\"Something","example_response":""},{"status_code":"404","description":"valid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"error\\": \\"No match found.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 500, \\"error\\": \\"Internal Server Error\\",","example_response":""},{"status_code":"503","description":"\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 503, \\"message\\": \\"External source downtime\\", \\"error\\": \\"EXTERNAL_DOWNTIME\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or","example_response":""},{"status_code":"400","description":"questUnauthorized - Invalid TokenUnauthorized - Access Denied{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid address.\\", \\"metadata\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid request.Please t","example_response":""}]'::jsonb
);

-- India API 16: DigiLocker Fetch eAadhaar API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'DigiLocker Fetch eAadhaar API',
    'The following document highlights the details of the DigiLocker Fetch eAadhaar API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_eaadhaar_api',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/digilocker/eAadhaarDetails'' \\--header ''Content-Type: application/json'' \\--header ''appID: <Enter_the_HyperVerge_appId>''\\--header ''appKey: <Enter_the_HyperVerge_appKey>''\\--header ''transactionID: <Enter_the_HyperVerge_transactionID>'' \\--data-raw ''{    "referenceId" : "<Reference_ID>",    "aadhaarFile" :"yes"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"name\\": \\"<Name_of_the_User>\\",    \\"dob\\": \\"<Date_Of_Birth_from_eAadhaar>\\",    \\"address\\": \\"<Address_Of_The_User>\\",    \\"maskedAadhaarNumber\\": \\"<Masked_Aadhaar_Number>\\",    \\"photo\\": \\"<Base64_Image_Of_The_Users_Profile_Photo>\\",    \\"addressFields\\": {      \\"co\\": \\"<Care_Of_Field>\\",      \\"country\\": \\"<Country>\\",      \\"district\\": \\"<District>\\",      \\"subDistrict\\": \\"<Subdistrict>\\",      \\"postOffice\\": \\"<Post_Office>\\",      \\"house\\": \\"<House_Number>\\",      \\"locality\\": \\"<Locality>\\",      \\"pincode\\": \\"<Pincode>\\",      \\"state\\": \\"<State>\\",      \\"street\\": \\"<Street>\\",      \\"vtc\\": \\"<Village_Town_City>\\",      \\"landmark\\": \\"<Landmark>\\"    },    \\"gender\\": \\"<Gender>\\",    \\"aadhaarFile\\": \\"<Link to aadhaar file>\\",    \\"xmlAadhaarFile\\" : \\"<link to xml aadhaar file>\\",    \\"createdTimeStamp\\": \\"1737033755319\\", //returned when returnCreatedTimeStamp is enabled     \\"summary\\": {            \\"action\\": \\"pass\\",            \\"details\\": []        }  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"UNT\\", \\"message\\": \\"Entered details belongs to a minor\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"code\\": \\"ER_AADHAAR_NOT_LINKED\\", \\"message\\": \\"Aadhaar is not linked to the account\\" }} aadhaar Data UnavailableService UnresponsiveService UnpublishedService InactiveService Confi","example_response":""},{"status_code":"401","description":"h data from UIDAI.Please try starting the process again\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"401\\", \\"error\\": \\"Missing/Invalid credentials\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"401\\", \\"error\\": { \\"code\\": \\"ER_EXPIRED_TOKEN\\", \\"message\\": \\"Session has expired.\\" }}{ \\"status\\": \\"failure\\", \\"st","example_response":""},{"status_code":"500","description":"tatusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }} Error Response Details​ A failure or error response contains a failure status with a relavant status code and error mess","example_response":""},{"status_code":"504","description":"dhaar eKYC again\\", \\"code\\": \\"ER_AADHAAR_NOT_AVAILABLE\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SERVICE_UNRESPONSIVE\\", \\"message\\": \\"Error Connecting to digilocker. Please try again after sometime.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\",","example_response":""},{"status_code":"400","description":"he parameter that controls whether minor accounts are blocked. When set to \\"yes\\", the API returns a 400 response denoting the digilocker account belongs to a minoryes / nonoreturnCreatedTimeStampOptionalstringThe parameter that controls whether the created timestamp is returned in the response. When se","example_response":""},{"status_code":"429","description":"\\"ER_EXPIRED_TOKEN\\", \\"message\\": \\"Session has expired.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }} Error Response Details​ A failure","example_response":""}]'::jsonb
);

-- India API 17: Face Authentication APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Face Authentication APIs',
    'The following is a list of all Face Authentication APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 18: Find Face API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Find Face API',
    'The Find Face API identifies whether a target face exists in a group image and returns data about the closest match.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_find_api',
    'india_api',
    'curl --location --request POST ''https://ind-faceid.hyperverge.co/v1/photo/findFace'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_target_image>"'' \\--form ''groupimage=@"<path_to_group_image>"'' \\--form ''type="<Enter_type_of_target_image>"''',
    '{"status":"success","statusCode":"200","result":{"match-score":88,"face-found":"yes/no","to-be-reviewed":"yes/no","matching-face-crop":"<Base64_image_of_the_closest_matching_face_crop>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": \\"429\\", \\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Error Response Details​ An error response from the API contains a failure","example_response":""},{"status_code":"503","description":"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\"} Error Response Details​ An error response from the API contains a failure status, with a relevant status code and error message. The following table lists all","example_response":""},{"status_code":"400","description":"ImageFace Not Detected in Group ImageImage Size Exceeded{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Face not detected in image\\", \\"errorCode\\": \\"E1033I\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Face not detected in group image\\", \\"errorCode\\": \\"E1033G\\"}{ \\"s","example_response":""},{"status_code":"429","description":"er than 6MB\\"} Rate Limit ExceededServer ErrorServer Busy{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SER","example_response":""}]'::jsonb
);

-- India API 19: OCR APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'OCR APIs',
    'The following is a list of all OCR APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 20: Email Risk and Domain Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Email Risk and Domain Verification API',
    'The following document highlights the details of the Email Risk and Domain Verification API.',
    'https://documentation.hyperverge.co/api-reference/india_api/email_risk_and_domain_verif_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/emailBasic'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "email": "<Enter_the_email_address>"}''',
    '{"status":"success","statusCode":"200","result":{"deliverable":true,"domainName":"<Domain_Name>","tld":"<Top_Level_Domain>","creationTime":"<Domain_Creation_Time>","updateTime":"<Domain_Update_Time>","expiryTime":"<Domain_Expiry_Time>","registered":"<Domain_Registration_Status>","companyName":"<Company_Name_Associated_With_Domain>","disposable":"<Is_Email_Disposable>","freeProvider":"<Is_Email_From_Free_Provider>","dmarcCompliance":"<DMARC_Compliance>","spfStrict":"<SPF_Strictness_Status>","suspiciousTld":"<Suspicious_TLD_Status>","websiteExists":"<Does_Website_Exist>","acceptAll":"<Does_Domain_Accept_All_Emails>","custom":"<Custom_Field>","breach":{"isBreached":false,"noOfBreaches":0,"firstBreach":null,"lastBreach":null,"breaches":[]},"emailTenure":"<Email_Tenure_in_Years>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a relevant status code and error message. The following table lists all error responses:","example_response":""},{"status_code":"401","description":"\\"message\\": \\"Invalid event type\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\" } Error Response Details​ A failure or error response contains a failure status with a re","example_response":""},{"status_code":"400","description":"vent TypeMissing/Invalid credentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Email cannot be empty\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Invalid event type\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"stat","example_response":""}]'::jsonb
);

-- India API 21: CKYC APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'CKYC APIs',
    'The following is a list of all CKYC APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 22: Email OTP Verification APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Email OTP Verification APIs',
    'The following is a list of all Email OTP Verification APIs for India:',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 23: LPG Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'LPG Verification API',
    'The LPG Verification API determines whether a mobile number is linked to the Liquefied Petroleum Gas (LPG) service. If the mobile number is registered, the API returns the corresponding user details; otherwise, it returns a response stating that the number is not associated with any LPG registration.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_to_LPG',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/mobileToLPG'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "mobile": "<Enter_the_valid_Mobile_Number>"}''',
    '{"status":"success","statusCode":"200","result":[{"gas_provider":"<Gas_Provider_Name>","name":"<Name_of_the_User>","consumer_details":{"consumer_mobile":"<Mobile_Number>","consumer_id":"<Consumer_ID>","consumer_status":"<Consumer_Status>","consumer_type":"<Consumer_Type>"},"address":"<Address_Of_The_User>","distributor_details":{"distributor_code":"<Distributor_Code>","distributor_name":"<Distributor_Name>","distributor_contact":"<Distributor_Contact_Number>","distributor_address":"<Distributor_Address>"}}],"metaData":{"requestId":"<Request_ID>","transactionId":"<Transaction_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"message\\": \\"Mobile number is not registered\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"","example_response":""},{"status_code":"404","description":"edentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": 404, \\"message\\": \\"Mobile number is not registered\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"statusCode\\": 503, \\"status\\": \\"failur","example_response":""},{"status_code":"503","description":"\\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"statusCode\\": 503, \\"status\\": \\"failure\\", \\"message\\":\\"External source downtime\\", \\"error\\":\\"EXTERNAL_DOWNTIME\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Erro","example_response":""},{"status_code":"400","description":"ntials Unregistered Mobile NumberExternal Source Downtime{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"message\\": \\"Provide a valid 10 digit mobile number\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credenti","example_response":""}]'::jsonb
);

-- India API 24: DigiLocker Fetch PAN and Driving Licence API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'DigiLocker Fetch PAN and Driving Licence API',
    'The following document highlights the details of the DigiLocker Fetch PAN and Driving Licence API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker%20APIs/digilocker_fetch_driving_license_pan_api/',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/digilocker/docDetails'' \\--header ''Content-Type: application/json'' \\--header ''appID: <Enter_the_HyperVerge_appId>''\\--header ''appKey: <Enter_the_HyperVerge_appKey>''\\--header ''transactionID: <Enter_the_HyperVerge_transactionID>'' \\--data-raw ''{    "referenceId": "<Reference_ID>",    "pan": "<yes_or_no>",    "dl": "<yes_or_no>",    "panFile": "<yes_or_no>",    "dlFile": "<yes_or_no>",    "panXMLFile": "<yes_or_no>"    "dlXMLFile": "<yes_or_no>"    "returnAllFieldsFromDigilocker": "<yes_or_no>",    "useV2StorageLocation": "<yes_or_no>",    "enableRetry": "<yes_or_no>"}''',
    '{"status":"success","statusCode":"200","result":{"code":"ALL_FOUND","docs_found":["pan","dl"],"details":[{"doc_type":"","pan":"","name":"","dob":""},{"doc_type":"","dl":"","name":"","dob":"","address":"[object Object],, [object Object]","photo":"base64"}]}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"message\\": \\"No data found for the given DL\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": { \\"code\\": \\"ER_SERVER\\", \\"message\\": \\"Something went wrong\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SE","example_response":""},{"status_code":"503","description":"VER\\", \\"message\\": \\"Something went wrong\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": { \\"code\\": \\"ER_DIGILOCKER_REPO_SERVICE_RESPERROR\\", \\"message\\": \\"Error Connecting to digilocker. Please try again after sometime\\" }} Error Response Details​ A failure","example_response":""},{"status_code":"400","description":"for 15 minutesyes / noNot ApplicableblockMinorsOptionalstringThe parameter that controls whether a 400 response is returned if the DigiLocker account belongs to a minor. When set to \\"yes\\", the API returns a 400 responseNot ApplicableNot ApplicablereturnAllFieldsFromDigilockerOptionalstringThe paramete","example_response":""},{"status_code":"422","description":"message\\": \\"Entered details belongs to a minor.\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"code\\": \\"ER_PAN_DATA_NOT_AVAILABLE\\", \\"message\\": \\"No data found for the given pan\\" }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": { \\"cod","example_response":""}]'::jsonb
);

-- India API 25: Account Aggregator - Consent Request API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
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
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Penny Drop - Bank Account Verification API',
    'The following document highlights the details of the Penny Drop API.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank%20Account%20Verification%20APIs/pennydrop_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/checkBankAccount'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "ifsc": "<IFSC code>",    "accountNumber": "<Account number>",    "strictValidation": "<Enter_Yes_or_No>"}''',
    '{"status":"success","statusCode":"200","result":{"bankResponse":"Transaction Successful","ifsc":"<IFSC>","accountNumber":"<Account_Number>","accountName":"<Name_of_the_Account_Holder>","bankTxnStatus":true}}'::jsonb,
    '[{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": \\"422\\",  \\"error\\": \\"Given account is an NRE account\\" // NRE, which stands for Non-Resident External, denotes the Overseas accounts}"},{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": \\"422\\",  \\"error\\": \\"Given account is an NRE account\\" // NRE, which stands for Non-Resident External, denotes the Overseas accounts}"}]'::jsonb,
    '[{"status_code":"500","description":"inedBank Error: Failed at BankBank Error: Transaction Failed{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Bank Error: IMPS Mode Fail\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Bank Error: Beneficia","example_response":""},{"status_code":"400","description":"too LongInvalid Account Number or IFSCInvalid Account Number{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ifsc length must be 11 characters long\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"accountNumber length must be at least 6 characters long\\"}{ \\"status\\": \\"failure\\", \\"","example_response":""},{"status_code":"422","description":"er length must be less than or equal to 25 characters long\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input: Account number or IFSC\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input: Account number\\"} Invalid IFSC","example_response":""},{"status_code":"429","description":"lure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Account is blocked\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"429\\", \\"error\\": \\"Requests rate limit exceeded\\"} Internal Server ErrorBank Error: IMPS Mode FailBank Error: Beneficiary Bank OfflineBank Error: Source Bank DeclinedBank Error: Failed at BankBank Error: Tr","example_response":""}]'::jsonb
);

-- India API 27: undefined
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    '',
    '',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC%20APIs/ckyc_validation_api',
    'india_api',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb
);

-- India API 28: Voter ID Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Voter ID Verification API',
    'The Voter ID Verification API searches for a matching Voter ID record as a verification step and provides the details of the customer from the same record.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central%20DB%20Check%20APIs/voter_id_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-verify.hyperverge.co/api/checkVoterId'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "epicNumber": "<Enter_Voter_ID_Number>"}''',
    '{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": \\"200\\",    \\"result\\": {      \\"ps_lat_long\\": <Latitude and Longitute of Polling Station>,      \\"rln_name_v1\\": <Relation Name 1>,      \\"rln_name_v2\\": <Relation Name 2>,      \\"rln_name_v3\\": <Relation Name 3>,      \\"part_no\\": <Part Number>,      \\"rln_type\\": <Relation Type>,      \\"section_no\\": \\"Section Number\\",      \\"id\\": \\"ID of VoterId Card\\",      \\"epic_no\\": \\"EPIC Number\\",      \\"rln_name\\": \\"Relation Name\\",      \\"district\\": \\"District\\",      \\"last_update\\": \\"Last Update Timestamp\\",      \\"state\\": \\"State\\",      \\"ac_no\\": \\"\\",      \\"house_no\\": \\"House Number\\",      \\"ps_name\\": \\"Polling Station Name\\",      \\"pc_name\\": \\"\\",      \\"slno_inpart\\": \\"\\",      \\"name\\": \\"Name of the User\\",      \\"part_name\\": \\"\\",      \\"dob\\": \\"DOB in DD-MM-YYYY Format\\",      \\"gender\\": \\"Gender of the User\\",      \\"age\\": <Age of User, Number>,      \\"ac_name\\": \\"Account Name\\",      \\"name_v1\\": \\"\\",      \\"st_code\\": \\"\\",      \\"name_v3\\": \\"\\",      \\"name_v2\\": \\"\\"    }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"Code\\": \\"422\\", \\"error\\": \\"Invalid value passed for an input\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Unexpected Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database servi","example_response":""},{"status_code":"503","description":", \\"statusCode\\": \\"500\\", \\"error\\": \\"Unexpected Server Error\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database service unavailable\\"} Error Response Details​ A failure or error response contains a fa","example_response":""},{"status_code":"400","description":"r Too ShortEpic Number Too LongInvalid Input for Epic Number{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"epicNumber is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"epicNumber is not allowed to be empty\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ep","example_response":""},{"status_code":"422","description":"n no matching record is found against the input parameters. { \\"status\\": \\"failure\\", \\"statusCode\\": \\"422\\", \\"error\\": \\"Entered id is not found in any database\\"} Error Response Sample​ The following are the sample error responses for the API. Missing Epic NumberBlank InputEpic Number Too ShortEpic Number","example_response":""},{"status_code":"504","description":"\\"statusCode\\": \\"503\\", \\"error\\": \\"Data Source not Available\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"504\\", \\"error\\": \\"Govt. database service unavailable\\"} Error Response Details​ A failure or error response contains a failure status with a relavant status code and error message. The following table list","example_response":""}]'::jsonb
);

-- India API 29: Criminal Risk Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Criminal Risk Verification API',
    'This document highlights the Criminal Risk Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime%20Detection%20APIs/criminal_risk_verification_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/criminalRiskCheck'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "name": "<Enter_the_name>",    "address": "<Enter_the_address>",    "fatherName": "<Enter_the_father_name>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"color\\": \\"<Risk_Color>\\",    \\"numberOfCases\\": <Number_Of_Cases>,    \\"result\\": [      {        \\"address\\": \\"<Address_As_Found_In_Case_Details>\\",        \\"addressScore\\": <Address_Similarity_Score>,        \\"algoRisk\\": \\"<Risk_Level_From_Algorithm>\\",        \\"asrInfo\\": \\"<Additional_ASR_Info>\\",        \\"businessCategory\\": \\"<Business_Category>\\",        \\"caseCategory\\": \\"<Category_Of_The_Case>\\",        \\"caseFilter\\": \\"<Applied_Case_Filter>\\",        \\"caseNo\\": \\"<Case_Number>\\",        \\"caseStatus\\": \\"<Status_Of_The_Case>\\",        \\"caseTypeDescription\\": \\"<Case_Type_Description>\\",        \\"caseTypeName\\": \\"<Case_Type_Name>\\",        \\"caseYear\\": \\"<Year_Of_The_Case>\\",        \\"cnr\\": \\"<CNR_Number>\\",        \\"courtCode\\": <Court_Code>,        \\"courtName\\": \\"<Name_Of_The_Court>\\",        \\"decisionDate\\": \\"<Decision_Date_If_Available>\\",        \\"distCode\\": <District_Code>,        \\"distMatch\\": \\"<District_Match_Status>\\",        \\"distName\\": \\"<District_Name>\\",        \\"falconScore\\": <Falcon_Score>,        \\"fatherMatchType\\": \\"<Father_Name_Match_Type>\\",        \\"firNo\\": \\"<FIR_Number>\\",        \\"firstHearingDate\\": \\"<First_Hearing_Date>\\",        \\"isDistrict\\": <Is_District_Level_Case>,        \\"isState\\": <Is_State_Level_Case>,        \\"jurisdiction\\": <Jurisdiction_Flag>,        \\"jurisdictionType\\": \\"<Jurisdiction_Type>\\",        \\"link\\": \\"<Case_Link_URL>\\",        \\"matchedAddress\\": \\"<Matched_Address>\\",        \\"matchedName\\": \\"<Matched_Name>\\",        \\"maxWordsMatched\\": <Maximum_Words_Matched>,        \\"md5\\": \\"<MD5_Hash_Of_Case>\\",        \\"name\\": \\"<Name_Of_The_Person>\\",        \\"nameMatchType\\": \\"<Name_Match_Type>\\",        \\"nameScore\\": <Name_Similarity_Score>,        \\"natureOfDisposal\\": \\"<Nature_Of_Disposal>\\",        \\"oparty\\": \\"<Opposing_Party>\\",        \\"policeStation\\": \\"<Police_Station_Name>\\",        \\"purposeOfHearing\\": \\"<Purpose_Of_Hearing>\\",        \\"rawAddress\\": \\"<Raw_Address_From_Record>\\",        \\"registrationDate\\": \\"<Registration_Date>\\",        \\"score\\": <Overall_Case_Score>,        \\"source\\": \\"<Case_Source>\\",        \\"stateCode\\": <State_Code>,        \\"stateMatch\\": \\"<State_Match_Status>\\",        \\"stateName\\": \\"<State_Name>\\",        \\"totalNameMatch\\": <Total_Name_Matches>,        \\"type\\": <Case_Type_ID>,        \\"underActs\\": \\"<Acts_Under_Which_Case_Is_Registered>\\",        \\"underSections\\": \\"<Sections_Under_Which_Case_Is_Registered>\\",        \\"uniqCaseId\\": \\"<Unique_Case_Identifier>\\",        \\"verifycode\\": \\"<Verification_Code>\\",        \\"wordsMatched\\": [          \\"<Matched_Word_1>\\",          \\"<Matched_Word_2>\\"        ],        \\"caseColor\\": \\"<Case_Color>\\"      }    ]  },  \\"metaData\\": {    \\"requestId\\": \\"<Request_ID>\\"  }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table lists all er","example_response":""},{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure s","example_response":""},{"status_code":"400","description":"nvalid CredentialsInternal Server Error{ \\"message\\": \\"name should not be empty\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"","example_response":""}]'::jsonb
);

-- India API 30: eFIR Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'eFIR Verification API',
    'This document highlights the eFIR Verification API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime%20Detection%20APIs/efir_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/eFIRCheck'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "name": "<Enter_the_Name>",    "fatherName": "<Enter_the_fatherName>",    "address": "<Enter_the_address>",    "source": "<Enter_the_source>"}''',
    '{"status":"success","statusCode":"200","result":{"cases":[{"address":"<Address_Of_The_Case>","addressDistrict":"<District_Of_The_Case>","addressMatch":"<Address_Match_Status>","addressPincode":"<Pincode_Of_The_Case>","addressRerankScore":"<Address_Rerank_Score>","addressState":"<State_Of_The_Case>","addressStreet":"<Street_Of_The_Case>","addressTaluka":"<Taluka_Of_The_Case>","addressWc":"<Word_Count_Of_Address>","algo":"<Algorithm_Name>","algoRisk":"<Algorithm_Risk_Level>","allCandidates":["<Candidate_1>","<Candidate_2>","<Candidate_3>","<Candidate_4>","<Candidate_5>","<Candidate_6>"],"asrInfo":"<Act_Section_Related_Info>","bullzaiOnly":"<Bullzai_Only_Status>","caseCategory":"<Category_Of_The_Case>","cleanName":"<Cleaned_Name_Of_Person>","date":"<Date_Of_Case>","decidingFactor":"<Deciding_Factor>","distMatch":"<District_Match_Status>","distName":"<District_Name>","doorMatch":"<Door_Match_Status>","fatherMatchType":"<Father_Name_Match_Type>","fatherName":"<Father_Name>","fatherNameMatch":"<Father_Name_Match_Status>","firNo":"<FIR_Number>","firYear":"<FIR_Year>","jinaAddressRank":"<Jina_Address_Rank>","jinaNameRank":"<Jina_Name_Rank>","jurisdiction":"<Jurisdiction_Status>","jurisdictionType":"<Jurisdiction_Type>","link":"<Case_Link>","md5":"<MD5_Hash>","name":"<Name_Of_Person>","nameMatch":"<Name_Match_Status>","nameMatchType":"<Name_Match_Type>","nameRerankScore":"<Name_Rerank_Score>","nameWc":"<Name_Word_Count>","oparty":"<Opposite_Party_Name>","overallMatch":"<Overall_Match_Status>","policeStation":"<Police_Station_Name>","rawAddress":"<Raw_Address_Of_Case>","ref":"<Reference_ID>","source":"<Source_Of_Info>","stateMatch":"<State_Match_Status>","stateName":"<State_Name>","timeStamp":"<Timestamp>","type":"<Case_Type>","underActs":"<Acts_Involved>","underSections":"<Sections_Involved>","uniqCaseId":"<Unique_Case_ID>","villageMatch":"<Village_Match_Status>","year":"<Year_Of_Case>"}],"flexiSearchId":"<Flexi_Search_ID>","flexiSourceId":"<Flexi_Source_ID>","groupBy":{},"message":"<Processing_Message>","numresults":"<Number_Of_Results>","status":"<Status_Of_Processing>"},"metaData":{"requestId":"<Request_ID>","transactionId":"<Transaction_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"sactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table lists all er","example_response":""},{"status_code":"400","description":"meMissing Input - SourceMissing/Invalid Credentials{ \\"message\\": \\"Invalid name\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"source should not be empty\\", \\"statusCode\\": 400, \\"s","example_response":""}]'::jsonb
);

-- India API 31: Fetch UAN API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Fetch UAN API',
    'The Fetch UAN API retrieves  the Universal Account Number (UAN) associated with a user''s mobile number, allotted by the Employee Provident Fund Organisation (EPFO).',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/fetch_uan_api',
    'india_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/fetchUAN'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "mobileNumber": "<Mobile_Number>",    "consent": "<Consent>"}''',
    '{"status":"success","statusCode":200,"result":{"message":"UAN fetched from mobile.","uanList":["<UAN_Number>"]},"metaData":{"requestId":"<Request_ID>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"for when an internal server error occurs.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table","example_response":""},{"status_code":"401","description":"n the input credentials are invalid.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following is a sample response for when an internal server error occurs.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and","example_response":""},{"status_code":"400","description":"onse for an invalid mobile number.{ \\"message\\": \\"Provide a valid mobile number\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\" }}The following is a sample response for input validation error.{ \\"message\\": \\"Input Validation Error: does not meet","example_response":""}]'::jsonb
);

-- India API 32: PDF Generator API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'PDF Generator API',
    'This document highlights the PDF Generator API details.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign%20APIs/pdf_generator_api',
    'india_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/pdfGenerator'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "templateId": "<Enter_the_unique_template_ID>",    "inviteeName": "<Enter_the_name>",    "inviteePhone": "<Enter_the_phone_number>",    "inviteeEmail": "<Enter_the_email_address>",    "stampSeries": "<Enter_the_stamp_series>",    "eSignHintMessage": "<Enter_the_eSign_hint_message>"}''',
    '{"status":"success","statusCode":"200","result":{"data":{"signUrl":"<Redirection_Link_For_Aadhaar_OTP_eSign>","documentId":"<Document_Identifier>","email":"<Email_of_the_Signer>","name":"<Name_of_the_Signer>","phone":"<Phone_Number_of_the_Signer>"}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"{ \\"message\\": \\"Error while parsing file input\\" } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Unknown error while parsing inputs\\" } }} Error Response Details​ A failure or error response from the module contains a failure status, with a relava","example_response":""},{"status_code":"400","description":"dation ErrorMissing/Invalid CredentialsInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Required file input is missing\\" } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"result\\": { \\"error\\": { \\"message\\": \\"Error while parsing fil","example_response":""}]'::jsonb
);

-- India API 33: undefined
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    '',
    '',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication%20APIs/Face/india_face_search_block_api',
    'india_api',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb
);

-- India API 34: Face and ID - Enrol or Block API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Face and ID - Enrol or Block API',
    'The Enrol API adds a user''s record to the database.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication%20APIs/Face%20and%20ID/india_dedupe_enrol_and_block_api',
    'india_api',
    'curl --request POST \\     --url https://ind-orion.hyperverge.co/v2/enrol/application \\     --header ''accept: application/json'' \\     --header ''content-type: multipart/form-data'' \\     --form name=<enter_the_name> \\     --form idNumber=<enter_the_id_number> \\     --form idType=<enter_the_id_type> \\     --form dob=<enter_the_dob> \\     --form transactionId=<enter_the_transaction_id> \\     --form block=no \\     --form enrol=no \\     --form selfie=<attach_the_image>',
    '{"statusCode":200,"metaData":{"requestId":"1680010592768-fe672012-6026-4c2a-9b5a-00800cdfaae3","transactionId":"test-arjun-4"},"result":{"data":{"transactionId":"test-arjun-4","isEnrolled":{"value":"yes","reason":"NA"},"dashboardUrl":"https://www.orion-console.hyperverge.co/reviewportal/1680010592768-fe672012-6026-4c2a-9b5a-00800cdfaae3"},"summary":{"value":"Enrol successful","action":"Pass"}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"422","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 422,\\"error\\": \\"Face not detected in Selfie image\\"}{\\"status\\": \\"failure\\",\\"message\\": \\"Requests rate limit exceeded\\",\\"statusCode\\": 429}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-","example_response":""},{"status_code":"500","description":"497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"error\\": \\"Internal Server Error\\",\\"statusCode\\": 500} Status CodeError MessageError Description400\\"\\"transactionId\\" is requiredThe request does not contain the transaction identification number.401Missing/Invalid credentialsThe request either does not c","example_response":""},{"status_code":"429","description":"ected in Selfie image\\"}{\\"status\\": \\"failure\\",\\"message\\": \\"Requests rate limit exceeded\\",\\"statusCode\\": 429}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"error\\": \\"Internal Server Error\\",\\"statusCode\\": 500} Status CodeError","example_response":""},{"status_code":"401","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 401,\\"error\\": \\"Missing/Invalid credentials\\"}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 422,\\"error\\": \\"F","example_response":""},{"status_code":"400","description":"d\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 400,\\"error\\": \\"\\\\\\"transactionId\\\\\\" is required\\"}{\\"status\\": \\"failure\\",\\"metaData\\": { \\"requestId\\": \\"1622697947985-4cfbcaf8-28ca-497e-8d22-323dea6aa2f6\\", \\"transactionId\\": \\"290101\\"},\\"statusCode\\": 401,\\"error\\":","example_response":""}]'::jsonb
);

-- India API 35: 414 ERROR
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    '414 ERROR',
    '',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/kenyan_id_check_api\\nhttps://documentation.hyperverge.co/api-reference/Africa APIs/phone_check_api\\nhttps://documentation.hyperverge.co/api-reference/Africa APIs/tin_check_api\\nhttps://documentation.hyperverge.co/api-reference/USA APIs/usa_secretary_of_state_search_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/enrol_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/monitoring_report_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v1_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v2_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/\\nhttps://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/OCR_country_docs_list\\nhttps://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/upload_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/vkyc_generic_webhook\\nhttps://documentation.hyperverge.co/api-reference/global_api/aml_screening_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/field_match_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/geo_ip_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/philsysqrcheck_api\\nhttps://documentation.hyperverge.co/api-reference/global_api/selfie_validation_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_consent_request_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_recurring_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_request_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_status_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_pdf_format_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_getDetails_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_payment_links_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/cheque_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/passbook_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennydrop_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennyless_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_preupload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_reference_metadata\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_webhook\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_mapkey\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_search_and_download_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/ckyc_validation_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/mask_aadhaar_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/central_db_check\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/dl_verification_extraction\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/passport_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/voter_id_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_exact_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/efir_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_enrol_and_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_search_and_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_enrol_face\\nhttps://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_face_search_block_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_consent_start_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_faqs\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_doctypemap\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_driving_license_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_eaadhaar_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_prereq_credentials_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_webhook\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch-all-docs\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch_document_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/get_issued_document_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/link-to-be-added\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/pull_parameters_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/verify-xml\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_OTP_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_UAN_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_mobile_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/fetch_uan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_UAN_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_mobile_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/#what-is-a-uan\\nhttps://documentation.hyperverge.co/api-reference/india_api/ESign APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/ESign APIs/get_signed_document_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/ESign APIs/pdf_generator_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/retry_email_OTP_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/send_email_OTP_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/verify_email_OTP_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_v3_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication\\nhttps://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication_v2_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_download_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_search_and_verify_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_upload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_download_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_search_and_verify_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_upload_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KRA APIs/webhook_KRA\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_advanced_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api_v2\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_director_details_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/get_gstin_from_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gst_authentication_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gstin_details_retrieval_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/kyb_documents_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyam_aadhaar_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyog_aadhaar_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/resend_mobile_otp\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/send_mobile_otp\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/verify_mobile_otp\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_history_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_status_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v1\\nhttps://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v2\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/deathcertificate_db_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/ocr_deathcertificate_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/bank_statement_upload_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/cdi_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/driving_licence_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ecs_classifier_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form16_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form_60_classifier_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/india_partner_ovd_integration_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/itr_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/margin_money_receipt_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_insurance_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_invoice_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/payslip_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/read_identity_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/tn_ration_card_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/utility_bill_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/visa_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_quality_report_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_receipt_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/din_from_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_name_from_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_pan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/nsdl_pan_direct_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_cin_details_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_udyam_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_advanced_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_challan_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_document_ocr_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_lite_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_plus_verification_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/address_match_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/fetch_vehicle_details_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/geoCoding_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/geo_ip_with_vpn_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/geolocation_validation_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/mobile_lookup_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/prefill_mobile_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/prefill_orchestration_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/reverse_geocoding_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/signature_detection_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/signature_matching_api\\nhttps://documentation.hyperverge.co/api-reference/india_api/vendor_validation_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"414","description":"ERROR: The request could not be satisfied 414 ERROR The request could not be satisfied. Bad request. We can''t connect to the server for this app or website at this time. There might be too much traffic or a configuration error. Try again later,","example_response":""}]'::jsonb
);

-- India API 36: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 37: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 38: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_consent_request_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 39: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 40: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_data_recurring_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 41: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_request_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 42: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_fi_status_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 43: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Account Aggregator APIs/aa_pdf_format_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 44: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 45: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 46: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_getDetails_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 47: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/Reverse Penny Drop/rpd_payment_links_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 48: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/cheque_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 49: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/passbook_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 50: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennydrop_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 51: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Bank Account Verification APIs/pennyless_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 52: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 53: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 54: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_preupload_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 55: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 56: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_upload_reference_metadata\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 57: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/CKYC Upload/ckyc_webhook\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 58: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 59: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_mapkey\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 60: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/Search and Download/ckyc_search_and_download_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 61: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/ckyc_validation_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 62: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/CKYC APIs/mask_aadhaar_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 63: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 64: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/central_db_check\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 65: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/dl_verification_extraction\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 66: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/passport_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 67: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Central DB Check APIs/voter_id_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 68: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 69: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_exact_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 70: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/criminal_risk_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 71: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Crime Detection APIs/efir_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 72: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 73: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_enrol_and_block_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 74: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face and ID/india_dedupe_search_and_block_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 75: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_enrol_face\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 76: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Deduplication APIs/Face/india_face_search_block_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 77: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 78: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_consent_start_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 79: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_faqs\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 80: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_doctypemap\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 81: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_driving_license_pan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 82: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_fetch_eaadhaar_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 83: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_prereq_credentials_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 84: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/digilocker_webhook\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 85: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch-all-docs\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 86: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/fetch_document_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 87: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/get_issued_document_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 88: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/link-to-be-added\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 89: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/pull_parameters_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 90: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Digilocker APIs/verify-xml\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 91: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 92: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_OTP_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 93: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_UAN_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 94: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/employment_history_with_mobile_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 95: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/fetch_uan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 96: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_UAN_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 97: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO APIs/latest_employment_with_mobile_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 98: EPFO APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'EPFO APIs',
    'EPFO (Employees'' Provident Fund Organisation) is a statutory body established by the Government of India to administer the Employees'' Provident Fund (EPF) scheme and other related social security schemes. It is one of the world''s largest social security organizations, managing retirement savings and benefits for employees in the organized sector.',
    'https://documentation.hyperverge.co/api-reference/india_api/EPFO%20APIs/#what-is-a-uan\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 99: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 100: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/get_signed_document_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 101: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ESign APIs/pdf_generator_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 102: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 103: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/retry_email_OTP_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 104: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/send_email_OTP_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 105: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Email OTP Verification APIs/verify_email_OTP_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 106: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 107: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 108: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Face Authentication APIs/face_authentication_v3_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 109: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 110: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 111: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/GST Authentication APIs/india_gst_authentication_v2_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 112: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 113: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 114: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_download_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 115: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_search_and_verify_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 116: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CAMS KRA/CAMS_upload_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 117: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 118: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_download_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 119: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_search_and_verify_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 120: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/CVL KRA/CVL_upload_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 121: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KRA APIs/webhook_KRA\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 122: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 123: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_advanced_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 124: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_details_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 125: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 126: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_company_llp_master_data_api_v2\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 127: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/fetch_director_details_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 128: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/get_gstin_from_pan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 129: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gst_authentication_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 130: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/gstin_details_retrieval_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 131: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/kyb_documents_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 132: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyam_aadhaar_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 133: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/KYB APIs/udyog_aadhaar_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 134: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 135: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/resend_mobile_otp\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 136: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/send_mobile_otp\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 137: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number OTP APIs/verify_mobile_otp\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 138: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 139: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_history_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 140: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile Number Revocation Check APIs/get_mobile_revoke_status_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 141: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 142: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v1\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 143: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/Mobile to Address APIs /mobile_to_address_v2\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 144: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 145: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/deathcertificate_db_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 146: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/Death Certificate/ocr_deathcertificate_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 147: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/bank_statement_upload_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 148: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/cdi_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 149: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/driving_licence_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 150: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ecs_classifier_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 151: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form16_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 152: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/form_60_classifier_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 153: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/india_partner_ovd_integration_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 154: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/itr_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 155: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/margin_money_receipt_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 156: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_insurance_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 157: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/motor_invoice_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 158: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 159: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/payslip_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 160: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/read_identity_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 161: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/tn_ration_card_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 162: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/utility_bill_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 163: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/visa_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 164: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_quality_report_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 165: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/OCR APIs/warehouse_receipt_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 166: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 167: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/din_from_pan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 168: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_name_from_pan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 169: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/fetch_pan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 170: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/nsdl_pan_direct_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 171: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_cin_details_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 172: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/PAN Utility APIs/pan_to_udyam_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 173: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 174: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_advanced_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 175: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_challan_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 176: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 177: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_detailed_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 178: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_document_ocr_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 179: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_lite_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 180: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/RC APIs/rc_plus_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 181: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/address_match_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 182: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/bank_statement_analysis_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 183: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/disability_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 184: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/email_risk_and_domain_verif_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 185: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_ifsc_from_upi_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 186: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fetch_vehicle_details_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 187: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/fssai_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 188: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 189: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geoCoding_apiV2\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 190: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geo_ip_with_vpn_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 191: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/geolocation_validation_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 192: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/iec_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 193: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/ifsc_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 194: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_find_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 195: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/india_face_match_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 196: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/masked_pan_from_din_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 197: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_lookup_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 198: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/mobile_to_LPG\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 199: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/nach_extraction_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 200: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/prefill_mobile_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 201: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/prefill_orchestration_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 202: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/reverse_geocoding_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 203: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/shops_and_establishment_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 204: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/signature_detection_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 205: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/signature_matching_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 206: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/upi_verification_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- India API 207: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example, 
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/india_api/vendor_validation_api\\n',
    'india_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 1: NIN Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'NIN Verification API',
    'The NIN Verification API, or the VNIN verification API, retrieves a user''s personally identifiable information(PII)
based on their Nigerian national identification number(NIN).',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/nin_lookup_api',
    'global_api',
    'curl --location --request POST ''https://zaf.thomas.hyperverge.co/v1/ninFetch'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "nin": "<Enter_the_NIN>"}''',
    '{"result":{"status":"successful","message":"Lookup Successful","data":{"birthcountry":"nigeria","birthdate":"07-11-1992","birthlga":"Mushin","birthstate":"Lagos","educationallevel":"tertiary","email":"<email_placeholder>","emplymentstatus":"employed","firstname":"OLUWAFUNMIBI","gender":"m","heigth":"169","maritalstatus":"single","middlename":"LAWRENCE","nin":"<nin_placeholder>","nok_address1":"216 BASTABLE AVENUE BARKING","nok_address2":"","nok_firstname":"OMOTOWOBOLA","nok_middlename":"AGATAR","nok_surname":"YEDENU-MARTINS","nok_town":"LONDON","nspokenlang":"YORUBA","ospokenlang":"FRENCH","othername":"SULAIMON","photo":"<photo_url_placeholder>","profession":"MASS COMMUNICATION","religion":"christianity","residence_AdressLine1":"3 ODOFIN CLOSE","residence_Town":"ILASAMAJA","residence_lga":"Mushin","residence_state":"Lagos","residencestatus":"birth","self_origin_lga":"Yewa North","self_origin_place":"YEWA","self_origin_state":"Ogun","signature":"<signature_url_placeholder>","surname":"OSAYEMI","telephoneno":"<phone_number_placeholder>","title":"mr","central_iD":"<central_id_placeholder>","tracking_id":"<tracking_id_placeholder>"}},"status":"success","statusCode":200,"metaData":{"requestId":"<request_id_placeholder>"}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"400","description":"ry, lookup failed. Please check the details and try again\\" }, \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"metaData\\": { \\"requestId\\": \\"1702388746563-62ed2d28-ff89-41fe-b27b-ff7c1be197e2\\" }} Error Response Samples​ The following is the sample error response from the API. Incorrect Length{\\"message\\": \\"","example_response":""}]'::jsonb
);

-- Global API 2: National ID Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'National ID Verification API',
    'This document highlights the National ID Verification API details.',
    'https://documentation.hyperverge.co/api-reference/Vietnam APIs/OCR APIs/national_id_ocr_api',
    'global_api',
    'curl --location --request POST ''https://vnm-docs.hyperverge.co/v2/nationalID'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image=@"<path_to_image_file>"''',
    '{"status":"success","statusCode":"200","requestId":"<Request_ID>","transactionId":"<Transaction_ID>","result":{"details":[{"type":"cmnd_old_front/cmnd_old_back/cmnd_new_front/cccd_front/cmnd_new_cccd_back/cccd_chip_front/cccd_chip_back","fieldsExtracted":{"name":{"to-be-reviewed":"no","value":"<Name of the User>"},"dob":{"to-be-reviewed":"no","value":"<Date_of_Birth>"},"idNumber":{"to-be-reviewed":"no","value":"<Card_ID>"},"permanentAddress":{"to-be-reviewed":"no","value":"<Address>","province":"<Province>","provinceCode":"<Province_Code>","district":"<District>","districtCode":"<District_Code>","ward":"<Ward>"},"province":{"value":"<Province>"},"homeTown":{"value":"<Home_Town>","to-be-reviewed":"yes"},"nationality":{"value":"Việt Nam <Only_for_Citizen_ID>","to-be-reviewed":"no"},"gender":{"value":"F/M <Only for New National ID or Citizen ID>","to-be-reviewed":"no"},"doe":{"value":"12-08-2027 <Only for New National ID or Citizen ID>","to-be-reviewed":"no"}},"alignedDocumentURL":"<Cropped & aligned document>","ocrMatchWithUserInput":{"name":"yes","dob":"yes","idNumber":"yes","all":"yes"},"ruleChecks":{"idProvinceCodeInvalid":{"value":"yes","to-be-reviewed":"no"},"idDOBGenderCodeInvalid":{"value":"yes","to-be-reviewed":"no"},"idNumberLengthMismatch":{"value":"yes","to-be-reviewed":"no"},"expiredID":{"value":"yes","daysToExpire":-45}},"tamperChecks":{"photoTampered":{"to-be-reviewed":"yes","value":"no"},"idNumberTampered":{"to-be-reviewed":"yes","value":"no"},"dobTampered":{"to-be-reviewed":"yes","value":"no"},"emblemTampered":{"to-be-reviewed":"yes","value":"no"},"dobColonTampered":{"to-be-reviewed":"yes","value":"no"}},"qualityChecks":{"glare":{"to-be-reviewed":"yes","value":"no"},"blur":{"to-be-reviewed":"no","value":"no"},"faceNotDetected":{"to-be-reviewed":"no","value":"no"},"cornerCut":{"to-be-reviewed":"no","value":"yes"},"blackAndWhite":{"to-be-reviewed":"yes","value":"no"},"capturedFromScreen":{"to-be-reviewed":"no","value":"yes"}}}],"summary":{"action":"manualReview","details":[{"code":"003","message":"National ID Number validation failed"}]}}}'::jsonb,
    '[{"raw":"{\\"status\\": \\"failure\\",\\"statusCode\\": \\"400\\",\\"error\\": \\"API call requires atlest one input image\\" or \\"transactionid Not Detected\\"}"},{"raw":"{\\"status\\": \\"failure\\",\\"statusCode\\": \\"400\\",\\"error\\": \\"API call requires atlest one input image\\" or \\"transactionid Not Detected\\"}"}]'::jsonb,
    '[{"status_code":"422","description":"onfidence is low\\" } ]} Error Response​ The following are the error responses from the API:422 - National ID Not Detected400 - Input Error429 - Rate limit exceeded500 - Internal Server Error{\\"status\\": \\"failure\\",\\"statusCode\\": \\"422\\",\\"error\\": \\"Vietnam National ID Not Detected\\",\\"requestId\\": \\"16004","example_response":""},{"status_code":"500","description":"ilure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table","example_response":""},{"status_code":"400","description":"message\\": \\"Vietnam National ID Not Detected\\" } ] }}}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"400\\",\\"error\\": \\"API call requires atlest one input image\\" or \\"transactionid Not Detected\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"","example_response":""},{"status_code":"429","description":"equires atlest one input image\\" or \\"transactionid Not Detected\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"429\\",\\"error\\": \\"Rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"500\\", \\"error\\": \\"Internal Server Error\\"} Error Response Details​ A failure or error response from the module contains a fail","example_response":""}]'::jsonb
);

-- Global API 3: USA Driver's License Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'USA Driver''s License Verification API',
    'This document highlights the details of the USA Driver''s License Verification API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_dl_verification_api',
    'global_api',
    'curl --location --request POST ''https://usa.thomas.hyperverge.co/v1/dlVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--data ''{    "firstName": "<Enter_first_name>",    "lastName": "<Enter_last_name>",    "state": "<Enter_state>",    "dlNumber": "<Enter_DL_number>",    "dob": "<Enter_date_of_birth>",    // The following fields are optional and are only required when searching for states not covered by the AAMVA database.    "address": "<Enter_the_Address>",     "zip": "<Enter_the_ZIP_Code>",     "city": "<Enter_the_City_Name>" }''',
    '{"status":"success","statusCode":"200","result":{"details":{"dlNumberMatch":true,"firstNameMatch":true,"lastNameMatch":true,"dobMatch":true,"stateMatch":true},"summary":{"action":"pass","details":[]}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"401","description":"eld DriverLicenseNumber is invalid\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the API contains a failure status with a relevant status code and error message. The following table lists all the er","example_response":""},{"status_code":"400","description":"t matching\\" } ] } }}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Required field State is invalid\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"\\\\\\"dob\\\\\\" must be in DD-MM-YYYY format\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\",","example_response":""}]'::jsonb
);

-- Global API 4: Dukcapil With FaceMatch API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Dukcapil With FaceMatch API',
    'This document highlights the Dukcapil with Face Match API details.',
    'https://documentation.hyperverge.co/api-reference/global_api/dukcapil_with_facematch_api',
    'global_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/dukcapilWithFacematch'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "id": "<Enter_the_ID>",    "image": "<Enter_the_base64_image_data>"}''',
    '{"raw":"{  \\"status\\": \\"success\\",  \\"statusCode\\": \\"200\\",  \\"result\\": {    \\"message\\": \\"<Message_About_The_Result>\\",    \\"details\\": {      \\"score\\": \\"<Score>\\",      \\"match\\": \\"<Match_status>\\",    },     \\"s3Url\\": \\"<S3_URL_link>\\"    },  },  \\"metaData\\": {    \\"requestId\\": \\"<Unique_Request_Identifier>\\",    \\"transactionId\\": \\"<Unique_Transaction_Identifier>\\"  }"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"\\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following table","example_response":""},{"status_code":"401","description":"sCode\\": 400, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains","example_response":""},{"status_code":"400","description":"Missing/Invalid CredentialsInternal Server Error{ \\"message\\": \\"Image not found\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }}{ \\"message\\": \\"Invalid file type for: image\\", \\"statusCode\\": 400,","example_response":""}]'::jsonb
);

-- Global API 5: Face Match API - Global
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Face Match API - Global',
    'The Face Match API determines whether two facial images belong to the same person.',
    'https://documentation.hyperverge.co/api-reference/global_api/global_face_match_api',
    'global_api',
    'curl --location --request POST ''https://<regionCode>.idv.hyperverge.co/v1/matchFace'' \\--header ''appId:<Enter_the_HyperVerge_appId>'' \\--header ''appKey:<Enter_the_HyperVerge_appKey>'' \\--header ''transactionId:<Enter_the_HyperVerge_transactionID>'' \\--header ''content-type: multipart/form-data'' \\--form ''selfie=@abc.png'' \\--form ''id=@xyz.png''',
    '{"status":"failure","statusCode":"400","error":"Face not detected in ID image"}'::jsonb,
    '[{"raw":"{  \\"status\\": \\"success\\",   \\"statusCode\\": \\"200\\",   \\"result\\":   {     \\"details\\":     {         \\"match\\": {           \\"value\\": \\"yes\\"/\\"no\\",           \\"score\\": <face_match_score> // optional,           \\"confidence\\": \\"high\\"/\\"low\\",         },      },       \\"summary\\" : {         \\"action\\" : \\"pass/fail/manualReview\\",         \\"details : [],         }   },  \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\",    }, }"},{"raw":"{  \\"status\\": \\"success\\",   \\"statusCode\\": \\"200\\",   \\"result\\":   {     \\"details\\":     {         \\"match\\": {           \\"value\\": \\"yes\\"/\\"no\\",           \\"score\\": <face_match_score> // optional,           \\"confidence\\": \\"high\\"/\\"low\\",         },      },       \\"summary\\" : {         \\"action\\" : \\"pass/fail/manualReview\\",         \\"details : [],         }   },  \\"metaData\\": {        \\"requestId\\": \\"<Request_ID>\\",        \\"transactionId\\": \\"<Transaction_ID>\\",    }, }"}]'::jsonb,
    '[{"status_code":"500","description":"limit exceededThe number of transactions per minute has crossed the limit set for your credentials.500/501Internal Server ErrorPlease check the request headers or contact the HyperVerge team for resolution.503DEPENDENCY SERVER BUSYThere is an overload on HyperVerge''s server. Please try again after som","example_response":""},{"status_code":"503","description":"\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\" } Error Response Details​ A failure or error response from the module contains a failure status, with a relevant status code and error message. The following tabl","example_response":""},{"status_code":"400","description":"mageIncorrect ParametersIncorrect SizeInvalid idFaceString{ \\"status\\" : \\"failure\\", \\"statusCode\\" : \\"400\\", \\"error\\" : \\"Face not detected in ID image\\"}{\\"status\\" : \\"failure\\",\\"statusCode\\" : \\"400\\",\\"error\\" : \\"Face not detected in Selfie image\\"}{\\"status\\" : \\"failure\\",\\"statusCode\\" : \\"400\\",\\"error\\" : \\"Missing / W","example_response":""},{"status_code":"429","description":"\\"423\\",\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUS","example_response":""},{"status_code":"501","description":"\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"internal server error\\" }{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"503\\", \\"error\\": \\"DEPENDENCY SERVER BUSY\\" } Error Response Details​ A failure or error response from the module contains a","example_response":""},{"status_code":"423","description":"the documentation\\" } ] } }}{\\"status\\": \\"failure\\",\\"statusCode\\": \\"423\\",\\"error\\": \\"Multiple faces detected. Click Selfie/ID again\\"}{\\"status\\": \\"failure\\",\\"statusCode\\": 429,\\"error\\": \\"Requests rate limit exceeded\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"501\\", \\"error\\": \\"inte","example_response":""}]'::jsonb
);

-- Global API 6: Video KYC APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Video KYC APIs',
    'The following APIs are available for video-based KYC (Know Your Customer) processes:',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 7: EVN OCR API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'EVN OCR API',
    'The Vietnam Electricity (EVN) OCR API authenticates the EVN bills by comparing user-entered data with text extracted from uploaded bill images.',
    'https://documentation.hyperverge.co/api-reference/Vietnam APIs/OCR APIs/evn_ocr_api',
    'global_api',
    'curl --location --request POST ''https://apac.docs.hyperverge.co/v1/verifyEVN'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''image1=@"<path_to_image>"'' \\--form ''name="<Enter_name_on_card>"'' \\--form ''address="<Enter_address_on_card>"'' \\--form ''amount="<Enter_amount>"'' \\--form ''evnId="<Enter_evn_id>"'' \\--form ''fromDate="<Enter_from_date>"'' \\--form ''toDate="<Enter_to_date>"''',
    '{"status":"success","statusCode":"200","result":{"name":true,"from-date":true,"evn-id":true,"amount":false,"address":true,"to-date":true},"requestId":"<Request_ID>"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"429","description":"Response Samples​ Rate Limit ExceededInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Rate limit exceeded\\"}The following is a sample response for a server error:{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Respon","example_response":""},{"status_code":"500","description":"g is a sample response for a server error:{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table","example_response":""},{"status_code":"400","description":"when no matching record is found against the input parameter. { \\"status\\": \\"failure\\", \\"statusCode\\": 400,\\"error\\": \\"API call requires atlest one input image\\"} Error Response Samples​ Rate Limit ExceededInternal Server Error{ \\"status\\": \\"failure\\", \\"statusCode\\": 429, \\"error\\": \\"Rate limit exceeded\\"}The","example_response":""}]'::jsonb
);

-- Global API 8: Emirates Verification APIs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Emirates Verification APIs',
    'The following APIs are available for verifying Emirates ID cards and extracting identity information:',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 9: undefined
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    '',
    '',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_bsa_api',
    'global_api',
    '',
    '{}'::jsonb,
    '{}'::jsonb,
    '{}'::jsonb
);

-- Global API 10: Social Security Number Verification API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Social Security Number Verification API',
    'This document highlights the details of the Social Security Number Verification API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_ssn_verifcation_api',
    'global_api',
    'curl --location --request POST ''https://usa.thomas.hyperverge.co/v1/ssnVerification'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "firstName": "<Enter_the_first_name>",    "lastName": "<Enter_the_last_name>",    "ssn": "<Enter_the_SSN>"}''',
    '{"status":"success","statusCode":"200","result":{"details":{"ssnMatch":"fullMatch"},"summary":{"action":"pass","details":[]}}}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"400","description":"Name is EmptyInput Validation Error- Last Name is Empty{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"ssn is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"firstName is required\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"lastName is requir","example_response":""},{"status_code":"401","description":"Name CharactersInvalid SSN Characters{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Please provide valid firstName\\"}{ \\"status\\": \\"failure\\", \\"statusCode\\": \\"400\\", \\"error\\": \\"Please provide val","example_response":""}]'::jsonb
);

-- Global API 11: Sales PDF OCR API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Sales PDF OCR API',
    'This document outlines the details of the Sales PDF OCR API.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_sales_pdf_ocr_api',
    'global_api',
    'curl --location --request POST ''https://usa-engine.thomas.hyperverge.co/v1/readMCASalesApplication'' \\--header ''Content-Type: multipart/form-data'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--form ''pdfFile=@"<path_to_pdf_file>"''',
    '{"status":"success","statusCode":200,"result":{"details":[{"fieldsExtracted":{"businessLegalName":{"value":"<Business_Legal_Name>","score":1,"confidence":"High"},"businessDBA":{"value":"<Business_DBA_Name>","score":1,"confidence":"High"},"federalTaxID":{"value":"<Federal_Tax_ID>","score":1,"confidence":"High"},"companyType":{"value":"<Company_Type>","score":1,"confidence":"High"},"incorporationDate":{"value":"<Incorporation_Date_in_MM/DD/YYYY_Format>","score":1,"confidence":"High"},"businessPhone":{"value":"<Business_Phone_Number>","score":1,"confidence":"High"},"businessEmail":{"value":"<Business_Email_Address>","score":1,"confidence":"High"},"businessAddress":{"value":"<Business_Address>","score":1,"confidence":"High"},"businessLocationCity":{"value":"<Business_City>","score":1,"confidence":"High"},"businessLocationState":{"value":"<Business_State>","score":1,"confidence":"High"},"businessLocationZipCode":{"value":"<Business_Zip_Code>","score":1,"confidence":"High"},"businessLocationCountry":{"value":"<Business_Country>","score":1,"confidence":"High"},"businessDomainName":{"value":"<Business_Domain_URL>","score":1,"confidence":"High"},"monthlyRevenue":{"value":"<Monthly_Revenue>","score":1,"confidence":"High"},"annualRevenue":{"value":"<Annual_Revenue>","score":1,"confidence":"High"},"amountRequested":{"value":"<Amount_Requested>","score":1,"confidence":"High"},"useOfFunds":{"value":"<Use_Of_Funds>","score":1,"confidence":"High"},"industryType":{"value":"<Industry_Type>","score":1,"confidence":"High"},"ownerFirstName":{"value":"<Owner_First_Name>","score":1,"confidence":"High"},"ownerLastName":{"value":"<Owner_Last_Name>","score":1,"confidence":"High"},"ownerMobileNumber":{"value":"<Owner_Mobile_Number>","score":1,"confidence":"High"},"ownerHomeNumber":{"value":"<Owner_Home_Number>","score":1,"confidence":"High"},"ownerEmail":{"value":"<Owner''s_Email>","score":1,"confidence":"High"},"ownerSocialSecurityNumber":{"value":"<Owner''s_Social_Security_Number>","score":1,"confidence":"High"},"ownerDateOfBirth":{"value":"<Owner''s_Date_Of_Birth_in_MM/DD/YYYY_Format>","score":1,"confidence":"High"},"ownershipPercentage":{"value":"<Owner''s_Percentage_Ownership>","score":1,"confidence":"High"},"ownerAddress":{"value":"<Owner''s_Address>","score":1,"confidence":"High"},"ownerResidenceCity":{"value":"<Owner''s_City>","score":1,"confidence":"High"},"ownerResidenceState":{"value":"<Owner''s_State>","score":1,"confidence":"High"},"ownerResidenceZipCode":{"value":"<Owner''s_Zip_Code>","score":1,"confidence":"High"},"ownerResidenceCountry":{"value":"<Owner_Country>","score":1,"confidence":"High"},"owner2FirstName":{"value":"<Second_Owner_First_Name>","score":1,"confidence":"High"},"owner2LastName":{"value":"<Second_Owner_Last_Name>","score":1,"confidence":"High"},"owner2MobileNumber":{"value":"<Second_Owner_Mobile_Number>","score":1,"confidence":"High"},"owner2HomeNumber":{"value":"<Second_Owner_Home_Number>","score":1,"confidence":"High"},"owner2Email":{"value":"<Second_Owner''s_Email_Address>","score":1,"confidence":"High"},"owner2SocialSecurityNumber":{"value":"<Second_Owner''s_Social_Security_Number>","score":1,"confidence":"High"},"owner2DateOfBirth":{"value":"<Second_Owner_Date_Of_Birth_in_MM/DD/YYYY_Format>","score":1,"confidence":"High"},"owner2OwnershipPercentage":{"value":"<Second_Owner''s_Partnership_Percentage>","score":1,"confidence":"High"},"owner2Address":{"value":"<Second_Owner''s_Address>","score":1,"confidence":"High"},"owner2ResidenceCity":{"value":"<Second_Owner''s_City>","score":1,"confidence":"High"},"owner2ResidenceState":{"value":"<Second_Owner''s_State>","score":1,"confidence":"High"},"owner2ResidenceZipCode":{"value":"<Second_Owner''s_Zip_Code>","score":1,"confidence":"High"},"owner2ResidenceCountry":{"value":"<Second_Owner_Country>","score":1,"confidence":"High"}},"signatureValidation":{"validSignature":"<Valid_Signature_Status>","signatureType":"<Signature_Type>"},"type":"<Form_Type>"}],"summary":{"action":"<Summary_Action>","details":[]}},"metadata":{"requestId":"<Request_ID>","transactionId":"<Transaction_ID>"}}'::jsonb,
    '[{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": 400,  \\"error\\": \\"Invalid input passed for field ''pdfFile''\\",}"},{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": 400,  \\"error\\": \\"Invalid input passed for field ''pdfFile''\\",}"},{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": 400,  \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}"},{"raw":"{  \\"status\\": \\"failure\\",  \\"statusCode\\": 400,  \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}"}]'::jsonb,
    '[{"status_code":"422","description":"tusCode\\": 400, \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 422, \\"error\\": \\"Document Not Detected\\", \\"metaData\\": { \\"requestId\\": \\"<Request_ID>\\", \\"transactionId\\": \\"<Transaction_ID>\\" }} Error Response Details​ A failure or error response contains a fa","example_response":""},{"status_code":"400","description":"I: Missing Input FileInvalid File TypeIncorrect Document Type{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid input passed for field ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"error\\": \\"Invalid file type for: ''pdfFile''\\",}{ \\"status\\": \\"failure\\", \\"statusCode\\": 422, \\"error\\":","example_response":""}]'::jsonb
);

-- Global API 12: Enrol API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Enrol API',
    'The Enrol API is used to enrol users in the Monitoring DB.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML%20Ongoing%20Monitoring/enrol_api',
    'global_api',
    'curl --location --request POST ''https://ind-engine.thomas.hyperverge.co/v1/amlMonitoringEnrol'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "customerId": "<Request_ID_of_the_original_AML_Search_Call>"}''',
    '{"status":"success","statusCode":200,"result":{"message":"Enrolled Successfully","enrolledCustomerId":"<ENROLLED_CUSTOMER_ID_GOES_HERE>"}}'::jsonb,
    '[{"raw":"{    \\"status\\": \\"failure\\",    \\"statusCode\\": 400,    \\"result\\": {\\t\\t\\t\\t// This error can be thrown when the corresponding request and\\t\\t\\t\\t// response data for requestID are not found        \\"message\\": \\"Invalid CustomerId. No records found.\\"    }}"},{"raw":"{    \\"status\\": \\"failure\\",    \\"statusCode\\": 400,    \\"result\\": {\\t\\t\\t\\t// This error can be thrown when the corresponding request and\\t\\t\\t\\t// response data for requestID are not found        \\"message\\": \\"Invalid CustomerId. No records found.\\"    }}"},{"raw":"{    \\"status\\": \\"failure\\",    \\"statusCode\\": 400,    \\"result\\": {\\t\\t\\t\\t// This error can be thrown if the data for requestID\\t\\t\\t\\t// is already enrolled in the database\\t\\t\\t\\t\\"message\\": \\"CustomerId already exists\\"    }}"},{"raw":"{    \\"status\\": \\"failure\\",    \\"statusCode\\": 400,    \\"result\\": {\\t\\t\\t\\t// This error can be thrown if the data for requestID\\t\\t\\t\\t// is already enrolled in the database\\t\\t\\t\\t\\"message\\": \\"CustomerId already exists\\"    }}"}]'::jsonb,
    '[{"status_code":"400","description":"when no matching record is found against the Customer ID:{ \\"status\\": \\"failure\\", \\"statusCode\\": 400, \\"result\\": { // This error can be thrown when the corresponding request and // response data for requestID are not found \\"message\\": \\"Invalid CustomerId. No records found.\\" }}The fo","example_response":""},{"status_code":"500","description":"is a sample response for a server error. { \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Failure and Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table","example_response":""}]'::jsonb
);

-- Global API 13: Monitoring Report API
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'Monitoring Report API',
    'The Monitoring Report  API retrieves a client''s monitoring summary for a specific date, returning the total number of applications enrolled for monitoring as well as the existing ones if changes are observed in them. Additionally, it includes the history of changes with their respective timestamps.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML%20Ongoing%20Monitoring/monitoring_report_api',
    'global_api',
    'curl --location --request POST ''https://ind.thomas.hyperverge.co/v1/amlMonitoringReport'' \\--header ''Content-Type: application/json'' \\--header ''appId: <Enter_the_HyperVerge_appId>'' \\--header ''appKey: <Enter_the_HyperVerge_appKey>'' \\--header ''transactionId: <Enter_the_HyperVerge_transactionID>'' \\--data ''{    "queryDate": "<YYYY-MM-DD_FORMAT>"}''',
    '{"raw":"{    \\"status\\": \\"success\\",    \\"statusCode\\": 200,    \\"metaData\\": {        \\"transactionId\\": <Transaction_ID>,        \\"requestId\\": <Request_ID>    },    \\"result\\": {        \\"message\\": \\"Report Fetched Successfully\\",        \\"metaData\\": {            \\"recordsMonitored\\": 0,            \\"needsReview\\": 0        },        \\"recordsToBeReviewed\\": []    }}"}'::jsonb,
    '[]'::jsonb,
    '[{"status_code":"500","description":"g is a sample response for a server error.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure or error response from the module contains a failure status, with a relavant status code and error message. The following table lists all er","example_response":""},{"status_code":"401","description":"for Missing or Invalid credentials.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following is a sample response for a server error.{ \\"message\\": \\"Internal Server Error\\", \\"statusCode\\": 500, \\"status\\": \\"failure\\"} Error Response Details​ A failure","example_response":""},{"status_code":"400","description":"ror.{ \\"message\\": \\"Input Validation Error: Date should be in YYYY-MM-DD format\\", \\"statusCode\\": 400, \\"status\\": \\"failure\\"}The following is a sample response for Missing or Invalid credentials.{ \\"message\\": \\"Missing/Invalid credentials\\", \\"statusCode\\": 401, \\"status\\": \\"failure\\"}The following","example_response":""}]'::jsonb
);

-- Global API 14: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/kenyan_id_check_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 15: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/nin_lookup_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 16: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/phone_check_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 17: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/Africa APIs/tin_check_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 18: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_dl_verification_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 19: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/USA APIs/usa_secretary_of_state_search_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 20: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 21: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 22: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/enrol_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 23: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/AML Ongoing Monitoring/monitoring_report_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 24: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 25: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v1_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 26: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Emirates Verification APIs/emirates_verification_v2_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 27: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 28: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/ID Card Validation/OCR_country_docs_list\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 29: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 30: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/upload_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 31: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/Video KYC APIs/vkyc_generic_webhook\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 32: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/aml_screening_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 33: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/dukcapil_with_facematch_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 34: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/field_match_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 35: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/geo_ip_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 36: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/global_face_match_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 37: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/philsysqrcheck_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

-- Global API 38: HyperVerge Docs
INSERT INTO public.api_documentation (
    id, name, description, url, category, curl_example,
    success_response, failure_responses, error_details
) VALUES (
    gen_random_uuid(),
    'HyperVerge Docs',
    'What is HyperVerge One, platform capabilities, and where to begin.',
    'https://documentation.hyperverge.co/api-reference/global_api/selfie_validation_api\\n',
    'global_api',
    '',
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
);

COMMIT;

-- Note: This script only imports the main API documentation.
-- For a complete import including inputs/outputs, use the Go import script
-- or run the API endpoints to create complete records.
