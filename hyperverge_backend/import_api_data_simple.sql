-- Ultra Simple SQL Import for HyperVerge API Documentation
-- Generated on: 2026-03-11T08:50:11.395Z
-- Total APIs: 242
-- 
-- This version imports only the essential fields to avoid JSON parsing issues
-- Complex JSON fields are set to empty objects/arrays and can be updated later

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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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
    '{}'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
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

-- Optional: Update complex JSON data later using the API endpoints
-- POST /api/documentation/:id with the full JSON data
