# Picotex Backend Ecommerce API Documentation

This document describes the available API endpoints for the Picotex Backend Ecommerce project, including required body parameters.

---

## Authentication

This API uses different authentication methods depending on the endpoint:

### API Key Authentication (For auth endpoints)
For user and admin authentication endpoints, include an API key:

---

## User apikey
```
apikey="M2Y4ZTRhNzJiOWM1ZDFmNmE4ZTNiNzk0YzZlMmY5ZDE=
```

## Admin apikey

```
apikey="ZjNkYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIz

```

**Headers:**
```
Authorization: Bearer <API_KEY>
```
or
```
apikey: <API_KEY>
```

**Query Parameter:**
```
?api_key=<API_KEY>
```

- Use `USER_API_KEY` for user authentication endpoints
- Use `ADMIN_API_KEY` for admin authentication endpoints

### JWT Token + API Key Authentication (For protected endpoints)
For protected endpoints (categories, etc.), you need both an API key and a JWT token:

**Headers:**
```
Authorization: Bearer <API_KEY>
token: <JWT_TOKEN>
```
or
```
apikey: <API_KEY>
token: <JWT_TOKEN>
```

**Query Parameters:**
```
?api_key=<API_KEY>&token=<JWT_TOKEN>
```

The JWT token is obtained from successful login responses.

---


## Categories
*Requires: Admin API Key + JWT Token*

### POST `/api/categories/addCategory`
Add a new category.

**Body Parameters:**
- `name` (string, required)

**Success Response (201):**
```json
{
  "message": "Category created successfully",
  "category": {
    "id": 1,
    "name": "Electronics"
  }
}
```

---

### GET `/api/categories/getAllCategories`
Get all categories.

_No body parameters required._

**Success Response (200):**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Electronics"
    },
    {
      "id": 2,
      "name": "Clothing"
    }
  ]
}
```

---

### POST `/api/categories/removeCategory`
Remove a category by ID.

**Body Parameters:**
- `id` (number, required)

---


## SubCategories
*Requires: Admin API Key + JWT Token*

### POST `/api/categories/addSubCategory`
Add a new subcategory.

**Body Parameters:**
- `name` (string, required)
- `categoryId` (number, required)

---

### POST `/api/categories/deleteSubCategory`
Delete a subcategory by ID.


## SubCategories

### POST `/api/products/addSubCategory`
Add a new Subcategory.

**Body Parameters:**
- `name` (string, required)
- `categoryId` (integer, required)

---

### GET `/api/products/getAllSubCategory`
Get all Subcategories.

_No body parameters required._

---

### POST `/api/products/removeSubCategory`
Remove a Subcategory by ID.


**Body Parameters:**
- `id` (number, required)

---


### GET `/api/categories/getAllSubCategory`
Get all subcategories.

_No body parameters required._

---

## User Authentication
*Requires: User API Key Only*

### POST `/api/auth/signup`
Register a new user.

**Body Parameters:**
- `name` (string, required)
- `email` (string, required)
- `number` (string, required)
- `alternatenumber` (string, optional)
- `password` (string, required)

---

### POST `/api/auth/signin`
User login.

**Body Parameters:**
- `email` (string, required)
- `password` (string, required)

**Success Response (200):**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "number": "1234567890",
    "isVerified": true
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### POST `/api/auth/verify-otp`
Verify user OTP.

**Body Parameters:**
- `email` (string, required)
- `otp` (string, required)

---

## Admin Authentication
*Requires: Admin API Key Only*

### POST `/api/auth/admin/signin`
Admin login.

**Body Parameters:**
- `email` (string, required)
- `password` (string, required)

---

## Endpoints JSON

```json
[
	{
		"method": "POST",
		"path": "/api/categories/addSubCategory",
		"body": ["name", "categoryId"]
	},
	{
		"method": "POST",
		"path": "/api/categories/deleteSubCategory",
		"body": ["id"]
	},
	{
		"method": "GET",
		"path": "/api/categories/getAllSubCategory",
		"body": []
	},
	{
		"method": "POST",
		"path": "/api/categories/addCategory",
		"body": ["name"]
	},
	{
		"method": "GET",
		"path": "/api/categories/getAllCategories",
		"body": []
	},
	{
		"method": "POST",
		"path": "/api/categories/removeCategory",
		"body": ["id"]
	},
	{
		"method": "POST",
		"path": "/api/auth/signup",
		"body": ["name", "email", "number", "alternatenumber", "password"]
	},
	{
		"method": "POST",
		"path": "/api/auth/signin",
		"body": ["email", "password"]
	},
	{
		"method": "POST",
		"path": "/api/auth/verify-otp",
		"body": ["email", "otp"]
	},
	{
		"method": "POST",
		"path": "/api/auth/admin/signin",
		"body": ["email", "password"]
	},
	{
		"method": "POST",
		"path": "/api/products/addProduct",
		"body": ["name", "price", "moq", "weight", "stock", "description", "categoryId", "subCategoryId",  "colors = [] ", "brands = []", "sizes = []", "images = []"]
	},
	{
		"method": "GET",
		"path": "/api/products/getAllProducts",
		"body": []
	},
	{
		"method": "POST",
		"path": "/api/products/removeProduct",
		"body": ["id"]
	},
	{
		"method": "GET",
		"path": "/api/products/getProductById",
		"body": ["id"]
	},
	
]
```
---


## Products
*Requires: Admin API Key + JWT Token*

### POST `/api/products/addProduct`
Add a new product.

**Body Parameters:**
- `name` (string, required)
- `price` (number, required)
- `moq` (number, optional, default: `1`)
- `weight` (number, optional)
- `stock` (number, optional, default: `0`)
- `description` (string, optional)
- `categoryId` (number, required)
- `subCategoryId` (number, required)
- `colors` = `in array[],`
- `brands` = `[]`, 
- `sizes` = `[]`,
- `images` = `[]`

**Success Response (201):**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": 1,
    "name": "Sample Product",
    "price": 99.99,
    "moq": 1,
    "weight": 500,
    "stock": 100,
    "description": "Product description",
    "categoryId": 1,
    "subCategoryId": 1
  }
}
```

---

### GET `/api/products/getAllProducts`
Get all products.

_No body parameters required._

**Success Response (200):**
```json
{
  "products": [
    {
      "id": 1,
      "name": "Sample Product",
      "price": 99.99,
      "moq": 1,
      "weight": 500,
      "stock": 100,
      "description": "Product description",
      "categoryId": 1,
      "subCategoryId": 1
    }
  ]
}
```

---

### POST `/api/products/removeProduct`
Remove a product by ID.

**Body Parameters:**
- `id` (number, required)

---


### GET `/api/products/remgetProductById`
Remove a product by ID.

**Body Parameters:**
- `id` (number, required)

---

