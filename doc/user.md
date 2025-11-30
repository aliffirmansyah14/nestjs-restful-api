# User Api Spec

## Register User

Endpoint : POST /api/users

Request Body :

```json
{
  "usernmae": "ai",
  "password": "rahasia",
  "name": "alif firmansyah"
}
```

Response body (success):

```json
{
  "data": {
    "username": "ai",
    "name": "alif firmansyah"
  }
}
```

Response body (failed) :

```json
{
  "errors": "Username sudah digunakan"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
  "usernmae": "ai",
  "password": "rahasia"
}
```

Response body (success):

```json
{
  "data": {
    "username": "ai",
    "name": "alif firmansyah",
    "token": "session_id_generate"
  }
}
```

Response body (failed) :

```json
{
  "errors": "username atau password salah"
}
```

## Get User

Endpoint : GET /api/users/current

Headers :

-authorization: token

Response body (success):

```json
{
  "data": {
    "username": "ai",
    "name": "alif firmansyah"
  }
}
```

Response body (failed) :

```json
{
  "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/users/current

Headers :

-authorization:token

Request Body :

```json
{
  "password": "rahasia", //optional jika ingin diganti
  "name": "alif firmansyah" //optional jika ingin diganti
}
```

Response body (success):

```json
{
  "data": {
    "username": "ai",
    "name": "alif firmansyah"
  }
}
```

Response body (failed) :

```json
{
  "errors": "Username sudah digunakan"
}
```

## LogOut User

Endpoint : Delete /api/users/current

Headers :

-Authorization:token

Response body (success):

```json
{
  "data": true
}
```
