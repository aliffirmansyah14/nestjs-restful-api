# Contact Api Spec

## Create Contact

Endpoint : POST /api/contacts/:contactId/addresses

Headers :

-Authorization :token

Request Body :

```json
{
  "street": "jalan awdwad", //optional
  "city": "jakarta", //optional
  "province": "DKI Jakarta", //optional
  "country": "Negara apa",
  "postal_code": "12312312"
}
```

Response body (success):

```json
{
  "data": {
    "id": 1,
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  }
}
```

## Get Contact

Endpoint : GET /api/contacts/:contactId/addresses/:addressID

Headers :

-Authorization :token

Response body (success):

```json
{
  "data": {
    "id": 1,
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  }
}
```

## Update Contact

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :

-Authorization :token

Request Body :

```json
{
  {
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  }
}
```

Response body (success):

```json
{
  "data": {
    "id": 1,
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  }
}
```

## Remove Contact

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :

-Authorization :token

Response body (success):

```json
{
  "data": true
}
```

## List Address

Endpoint : GET /api/contacts/:contactId/addresses

Headers :

-Authorization :token

Response body (success):

```json
{
  "data": [
    {
    "id": 1,
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  },
    {
    "id": 1,
    "street": "jalan awdwad", //optional
    "city": "jakarta", //optional
    "province": "DKI Jakarta", //optional
    "country": "Negara apa",
    "postal_code": "12312312"
  }
}
```
