# Login Class
A simple application that uses Node.js, Express and MongoDB.

Base URL: https://login-class.mybluemix.net

Use Header => 'Content-Type' with 'application/json'

## (POST) <Base-URL>/api/login
Parameters:
- email (String)
- password (String)

Return (JSON):
- success (Boolean)
- message (String)
- token (String - If login success)
- user (Object - If login success)

## (GET) <Base-URL>/api/login
Headers: Add 'Authorization' with token to request this API

Parameters: No parameters

Return (JSON):
- success (Boolean)
- message (String)
- user (Object)

## (POST) <Base-URL>/api/users
Parameters:
- email (String)
- password (String)
- name (String)
- last_name (String)

Return (JSON):
- success (Boolean)
- message (String)

## (GET) <Base-URL>/api/users
Parameters: No parameters

Return (JSON):
- success (Boolean)
- message (String)
- user (Array)

## (GET) <Base-URL>/api/users/<_id>
Parameters: No parameters

Return (JSON):
- success (Boolean)
- message (String)
- user (Object)

## (DELETE) <Base-URL>/api/users/<_id>
Parameters: No parameters

Return (JSON):
- success (Boolean)
- message (String)

## (PUT) <Base-URL>/api/users/<_id>
Parameters: 
- _id (String)
- email (String - optional param)
- password (String - optional param)
- name (String - optional param)
- last_name (String - optional param)

Return (JSON):
- success (Boolean)
- message (String)
- user (Object)
