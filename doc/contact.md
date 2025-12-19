# Contact Api Spec

## Create Contact

Endpoint : POST /api/contacts

Headers :

-Authorization :token

Request Body :

```json
{
  "first_name": "ai",
  "last_name": "rahasia",
  "email": "alif@gmail.com",
  "phone": "021234567890"
}
```

Response body (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "ai",
    "last_name": "rahasia",
    "email": "alif firmansyah",
    "phone": "021234567890"
  }
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId

Headers :

-Authorization :token

Response body (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "ai",
    "last_name": "rahasia",
    "email": "alif firmansyah",
    "phone": "021234567890"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId

Headers :

-Authorization :token

Request Body :

```json
{
  "first_name": "ai",
  "last_name": "rahasia",
  "email": "alif firmansyah",
  "phone": "021234567890"
}
```

Response body (success):

```json
{
  "data": {
    "id": 1,
    "first_name": "ai",
    "last_name": "rahasia",
    "email": "alif firmansyah",
    "phone": "021234567890"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId

Headers :

-Authorization :token

Response body (success):

```json
{
  "data": true
}
```

## Search Contact

Endpoint : GET /api/contacts

Headers :

-Authorization :token

Query Params:

-name: string, contact first name or contact last name, optional
-phone:string, contact phone, optional
-email: string, contact email, optional
-page:number, default 1
-size:number, default 10

Response body (success):

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "ai",
      "last_name": "rahasia",
      "email": "alif firmansyah",
      "phone": "021234567890"
    },
    {
      "id": 2,
      "first_name": "ai",
      "last_name": "rahasia",
      "email": "alif firmansyah",
      "phone": "021234567890"
    }
  ],
  "paging": {
    "current_page": 1,
    "total_page": 10,
    "size": 10
  }
}
```
