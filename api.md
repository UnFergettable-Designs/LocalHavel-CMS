# API Documentation

## Overview

Base URL: `https://api.localhaven.cms/v1`

### Authentication

All API requests must include an Authorization header:
```http
Authorization: Bearer <jwt_token>
```

### Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user
- Larger files have separate limits

## Endpoints

### Authentication

#### POST /auth/login
```http
POST /auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "secure_password"
}
```

Response:
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_at": "2024-12-23T12:00:00Z",
    "user": {
        "id": "user_123",
        "email": "user@example.com",
        "role": "editor"
    }
}
```

### Assets

#### GET /assets
Query Parameters:
- `type`: Filter by asset type
- `tags`: Filter by tags (comma-separated)
- `page`: Page number
- `limit`: Items per page

```http
GET /assets?type=image&tags=featured,product&page=1&limit=20
Authorization: Bearer <token>
```

Response:
```json
{
    "items": [
        {
            "id": "asset_123",
            "name": "product-image.jpg",
            "type": "image",
            "size": 1048576,
            "tags": ["featured", "product"],
            "created_at": "2024-12-22T10:00:00Z",
            "updated_at": "2024-12-22T10:00:00Z",
            "status": "active"
        }
    ],
    "total": 45,
    "page": 1,
    "limit": 20
}
```

#### POST /assets
```http
POST /assets
Content-Type: multipart/form-data

file: <file_data>
metadata: {
    "name": "product-image.jpg",
    "tags": ["featured", "product"]
}
```

Response:
```json
{
    "id": "asset_123",
    "name": "product-image.jpg",
    "type": "image",
    "size": 1048576,
    "tags": ["featured", "product"],
    "created_at": "2024-12-22T10:00:00Z",
    "updated_at": "2024-12-22T10:00:00Z",
    "status": "active"
}
```

### Webhooks

#### POST /webhooks
```http
POST /webhooks
Content-Type: application/json

{
    "url": "https://your-domain.com/webhook",
    "events": ["asset.created", "asset.updated"],
    "secret": "webhook_secret"
}
```

Response:
```json
{
    "id": "webhook_123",
    "url": "https://your-domain.com/webhook",
    "events": ["asset.created", "asset.updated"],
    "created_at": "2024-12-22T10:00:00Z",
    "status": "active"
}
```

## Error Handling

### Error Response Format
```json
{
    "error": {
        "code": "invalid_request",
        "message": "Invalid request parameters",
        "details": {
            "field": "email",
            "reason": "must be a valid email address"
        }
    }
}
```

### Common Error Codes
- `unauthorized`: Authentication required
- `forbidden`: Insufficient permissions
- `not_found`: Resource not found
- `invalid_request`: Invalid parameters
- `rate_limited`: Too many requests
