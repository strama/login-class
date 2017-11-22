# FIAP Class
A simple application that uses Node.js, Express and MongoDB.

Base URL: https://fiap-class.mybluemix.net

Use Header => 'Content-Type' with 'application/json'

## <Base-URL>/api/user/login (POST)
Parameters:
- email (String)
- password (String)

Return (JSON):
- success (Boolean)
- message (String)
- token (String - If login success)
- user (Object - If login success)

## <Base-URL>/api/user/register (POST)
Parameters:
- email (String)
- password (String)
- name (String)
- last_name (String)

Return (JSON):
- success (Boolean)
- message (String)

## <Base-URL>/api/user/auth (POST)
Headers: Add 'Authorization' with token to request this API

Parameters: No parameters

Return (JSON):
- success (Boolean)
- message (String)
- user (Object)
