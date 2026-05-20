# API Examples & Mock Data

## Sample Provider Data

### Provider #1: Raj's Mobile Repair

**Provider Details:**
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "first_name": "Raj",
    "last_name": "Kumar",
    "email": "raj@example.com"
  },
  "shop_name": "Raj's Mobile Repair",
  "bio": "Expert in smartphone and tablet repairs with 8 years of experience. We specialize in screen replacements, battery issues, and software problems.",
  "profile_image": "https://api.example.com/media/providers/raj_profile.jpg",
  "verified": true,
  "address": "Karol Bagh, New Delhi - 110005",
  "location": {
    "type": "Point",
    "coordinates": [77.1025, 28.7041]
  },
  "avg_rating": "4.8",
  "review_count": 156,
  "jobs_completed": 250,
  "repeat_customer_rate": "68.50",
  "trust_score": "78.50",
  "average_response_time_minutes": 15,
  "years_of_experience": 8,
  "specialization": "Smartphone Repair",
  "supported_brands": ["Apple", "Samsung", "OnePlus", "Xiaomi", "Motorola"],
  "is_open": true,
  "is_active": true,
  "created_at": "2023-06-15T10:30:00Z",
  "updated_at": "2024-01-20T15:45:00Z",
  "services": [
    {
      "id": 1,
      "name": "Screen Replacement",
      "description": "High-quality OEM and compatible screens",
      "estimated_price": "3000.00",
      "duration_minutes": 60,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Battery Replacement",
      "description": "Original battery replacement with warranty",
      "estimated_price": "1500.00",
      "duration_minutes": 30,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    },
    {
      "id": 3,
      "name": "Software Fix",
      "description": "Fix software issues, crashes, slowness",
      "estimated_price": "500.00",
      "duration_minutes": 30,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    }
  ]
}
```

### Provider #2: Priya's Laptop Services

```json
{
  "id": 2,
  "user": {
    "id": 2,
    "first_name": "Priya",
    "last_name": "Sharma",
    "email": "priya@example.com"
  },
  "shop_name": "Priya's Laptop Services",
  "bio": "Specialized laptop repair and maintenance services with 6 years of experience. Expert in hardware repairs, upgrades, and data recovery.",
  "profile_image": "https://api.example.com/media/providers/priya_profile.jpg",
  "verified": true,
  "address": "Sector 18, Gurgaon - 122015",
  "location": {
    "type": "Point",
    "coordinates": [77.3910, 28.5355]
  },
  "avg_rating": "4.6",
  "review_count": 89,
  "jobs_completed": 150,
  "repeat_customer_rate": "55.30",
  "trust_score": "71.20",
  "average_response_time_minutes": 25,
  "years_of_experience": 6,
  "specialization": "Laptop Repair",
  "supported_brands": ["Dell", "HP", "Lenovo", "ASUS", "Apple"],
  "is_open": true,
  "is_active": true,
  "created_at": "2023-08-20T14:20:00Z",
  "updated_at": "2024-01-20T15:45:00Z",
  "services": [
    {
      "id": 4,
      "name": "Screen Repair",
      "description": "LCD/LED screen replacement",
      "estimated_price": "5000.00",
      "duration_minutes": 90,
      "is_available": true
    },
    {
      "id": 5,
      "name": "Keyboard Replacement",
      "description": "Keyboard repair or replacement",
      "estimated_price": "2000.00",
      "duration_minutes": 60,
      "is_available": true
    },
    {
      "id": 6,
      "name": "Hard Drive Upgrade",
      "description": "SSD or HDD replacement and data transfer",
      "estimated_price": "3000.00",
      "duration_minutes": 120,
      "is_available": true
    }
  ]
}
```

---

## API Response Examples

### 1. GET /api/providers/ (List)

**Request:**
```http
GET /api/providers/?verified=true&min_rating=4.5&is_open=true HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "count": 4,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 4,
      "user": {
        "id": 4,
        "first_name": "Neha",
        "last_name": "Singh",
        "email": "neha@example.com"
      },
      "shop_name": "Neha's Premium Repairs",
      "profile_image": "https://api.example.com/media/providers/neha.jpg",
      "verified": true,
      "avg_rating": "4.9",
      "review_count": 234,
      "address": "Safdarjung, Delhi",
      "is_open": true,
      "trust_score": "85.30"
    },
    {
      "id": 1,
      "user": {
        "id": 1,
        "first_name": "Raj",
        "last_name": "Kumar",
        "email": "raj@example.com"
      },
      "shop_name": "Raj's Mobile Repair",
      "profile_image": "https://api.example.com/media/providers/raj.jpg",
      "verified": true,
      "avg_rating": "4.8",
      "review_count": 156,
      "address": "Karol Bagh, Delhi",
      "is_open": true,
      "trust_score": "78.50"
    }
  ]
}
```

---

### 2. GET /api/providers/1/ (Detail)

**Request:**
```http
GET /api/providers/1/ HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "first_name": "Raj",
    "last_name": "Kumar",
    "email": "raj@example.com"
  },
  "shop_name": "Raj's Mobile Repair",
  "bio": "Expert in smartphone and tablet repairs with 8 years of experience.",
  "profile_image": "https://api.example.com/media/providers/raj_profile.jpg",
  "verified": true,
  "address": "Karol Bagh, New Delhi - 110005",
  "avg_rating": "4.8",
  "review_count": 156,
  "jobs_completed": 250,
  "repeat_customer_rate": "68.50",
  "trust_score": "78.50",
  "average_response_time_minutes": 15,
  "years_of_experience": 8,
  "specialization": "Smartphone Repair",
  "supported_brands": ["Apple", "Samsung", "OnePlus"],
  "is_open": true,
  "is_active": true,
  "services": [
    {
      "id": 1,
      "name": "Screen Replacement",
      "description": "High-quality OEM and compatible screens",
      "estimated_price": "3000.00",
      "duration_minutes": 60,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    },
    {
      "id": 2,
      "name": "Battery Replacement",
      "description": "Original battery replacement with warranty",
      "estimated_price": "1500.00",
      "duration_minutes": 30,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    },
    {
      "id": 3,
      "name": "Software Fix",
      "description": "Fix software issues, crashes, slowness",
      "estimated_price": "500.00",
      "duration_minutes": 30,
      "is_available": true,
      "created_at": "2023-06-15T10:30:00Z",
      "updated_at": "2023-06-15T10:30:00Z"
    }
  ],
  "created_at": "2023-06-15T10:30:00Z",
  "updated_at": "2024-01-20T15:45:00Z"
}
```

---

### 3. GET /api/providers/1/reviews/ (Paginated)

**Request:**
```http
GET /api/providers/1/reviews/?page=1&page_size=5 HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "count": 156,
  "next": "http://localhost:8000/api/providers/1/reviews/?page=2&page_size=5",
  "previous": null,
  "results": [
    {
      "id": 156,
      "rating": 5,
      "comment": "Excellent service! Fixed my phone screen in just 1 hour. The technician was professional and used genuine parts.",
      "customer": {
        "id": 42,
        "first_name": "Amit",
        "last_name": "Singh",
        "email": "amit.singh@example.com"
      },
      "customer_image": "https://api.example.com/media/customers/amit.jpg",
      "is_verified_purchase": true,
      "created_at": "2024-01-19T14:30:00Z"
    },
    {
      "id": 155,
      "rating": 5,
      "comment": "Great experience! Very reliable and trustworthy. Recommended to all my friends.",
      "customer": {
        "id": 38,
        "first_name": "Priya",
        "last_name": "Gupta",
        "email": "priya.gupta@example.com"
      },
      "customer_image": "https://api.example.com/media/customers/priya.jpg",
      "is_verified_purchase": true,
      "created_at": "2024-01-18T10:15:00Z"
    },
    {
      "id": 154,
      "rating": 4,
      "comment": "Good service, quick turnaround. Only minor issue with pricing.",
      "customer": {
        "id": 35,
        "first_name": "Rahul",
        "last_name": "Verma",
        "email": "rahul.verma@example.com"
      },
      "customer_image": null,
      "is_verified_purchase": true,
      "created_at": "2024-01-17T16:45:00Z"
    },
    {
      "id": 153,
      "rating": 5,
      "comment": "Absolutely love the service. The technician explained everything in detail.",
      "customer": {
        "id": 40,
        "first_name": "Sneha",
        "last_name": "Sharma",
        "email": "sneha@example.com"
      },
      "customer_image": "https://api.example.com/media/customers/sneha.jpg",
      "is_verified_purchase": true,
      "created_at": "2024-01-16T09:20:00Z"
    },
    {
      "id": 152,
      "rating": 4,
      "comment": "Good quality parts and reasonable pricing. Would come again.",
      "customer": {
        "id": 37,
        "first_name": "Vikram",
        "last_name": "Patel",
        "email": "vikram.patel@example.com"
      },
      "customer_image": "https://api.example.com/media/customers/vikram.jpg",
      "is_verified_purchase": false,
      "created_at": "2024-01-15T13:50:00Z"
    }
  ]
}
```

---

### 4. GET /api/providers/1/stats/

**Request:**
```http
GET /api/providers/1/stats/ HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "jobs_completed": 250,
  "repeat_customer_percentage": 68.5,
  "average_response_time_minutes": 15,
  "trust_score": 78.5,
  "average_rating": 4.8,
  "review_count": 156,
  "verified": true,
  "years_of_experience": 8
}
```

---

### 5. GET /api/providers/1/summary/

**Request:**
```http
GET /api/providers/1/summary/?limit=50 HTTP/1.1
Host: localhost:8000
```

**Response:**
```json
{
  "total_reviews": 156,
  "average_rating": 4.8,
  "rating_distribution": {
    "5": 104,
    "4": 35,
    "3": 10,
    "2": 5,
    "1": 2
  },
  "reviews": [
    {
      "id": 156,
      "rating": 5,
      "comment": "Excellent service! Fixed my phone screen in just 1 hour.",
      "customer": {
        "id": 42,
        "first_name": "Amit",
        "last_name": "Singh",
        "email": "amit.singh@example.com"
      },
      "customer_image": "https://api.example.com/media/customers/amit.jpg",
      "is_verified_purchase": true,
      "created_at": "2024-01-19T14:30:00Z"
    }
    // ... more reviews
  ]
}
```

---

### 6. POST /api/providers/1/reviews/ (Create Review)

**Request:**
```http
POST /api/providers/1/reviews/ HTTP/1.1
Host: localhost:8000
Content-Type: application/json

{
  "rating": 5,
  "comment": "Fantastic service! Highly recommended to everyone. The technician was very professional and courteous.",
  "customer_id": 50,
  "customer_image": "https://api.example.com/media/customers/john.jpg",
  "is_verified_purchase": true
}
```

**Response (201 Created):**
```json
{
  "id": 157,
  "rating": 5,
  "comment": "Fantastic service! Highly recommended to everyone.",
  "customer": {
    "id": 50,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com"
  },
  "customer_image": "https://api.example.com/media/customers/john.jpg",
  "is_verified_purchase": true,
  "created_at": "2024-01-20T16:30:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "rating": ["Ensure this value is less than or equal to 5."],
  "customer_id": ["User not found."]
}
```

---

## Testing with cURL

### Test Provider List
```bash
curl -X GET "http://localhost:8000/api/providers/" \
  -H "Accept: application/json"
```

### Test Provider Detail
```bash
curl -X GET "http://localhost:8000/api/providers/1/" \
  -H "Accept: application/json"
```

### Test Reviews with Pagination
```bash
curl -X GET "http://localhost:8000/api/providers/1/reviews/?page=1&page_size=10" \
  -H "Accept: application/json"
```

### Test Create Review
```bash
curl -X POST "http://localhost:8000/api/providers/1/reviews/" \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Great service!",
    "customer_id": 1,
    "is_verified_purchase": true
  }'
```

### Test Stats
```bash
curl -X GET "http://localhost:8000/api/providers/1/stats/" \
  -H "Accept: application/json"
```

### Test Summary
```bash
curl -X GET "http://localhost:8000/api/providers/1/summary/" \
  -H "Accept: application/json"
```

---

## Frontend Testing

### Using React Query DevTools

```typescript
// Install devtools
npm install @tanstack/react-query-devtools

// Add to layout
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>
```

### Testing Hooks

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import { useProviderDetail } from '@/hooks/useProvider';

test('loads provider detail', async () => {
  const { result } = renderHook(() => useProviderDetail(1));
  
  await waitFor(() => {
    expect(result.current.data).toBeDefined();
    expect(result.current.data?.id).toBe(1);
  });
});
```

---

## Postman Collection

Import this to Postman:

```json
{
  "info": {
    "name": "RepairBharat Provider API",
    "description": "API endpoints for provider detail module",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "List Providers",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{base_url}}/providers/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "providers"]
        }
      }
    },
    {
      "name": "Get Provider",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{base_url}}/providers/1/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "providers", "1"]
        }
      }
    },
    {
      "name": "Get Reviews",
      "request": {
        "method": "GET",
        "url": {
          "raw": "{{base_url}}/providers/1/reviews/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "providers", "1", "reviews"]
        }
      }
    },
    {
      "name": "Create Review",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"rating\": 5,\n  \"comment\": \"Great service!\",\n  \"customer_id\": 1\n}"
        },
        "url": {
          "raw": "{{base_url}}/providers/1/reviews/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8000",
          "path": ["api", "providers", "1", "reviews"]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8000/api",
      "type": "string"
    }
  ]
}
```

---

## Performance Metrics

**Expected Response Times (1000 requests):**

| Endpoint | p50 | p95 | p99 |
|----------|-----|-----|-----|
| List providers | 45ms | 120ms | 250ms |
| Get provider detail | 60ms | 150ms | 300ms |
| Get reviews | 50ms | 130ms | 280ms |
| Create review | 120ms | 280ms | 500ms |
| Get stats | 30ms | 80ms | 200ms |

(Varies based on database size and server specs)

---

## Rate Limiting (Production)

Recommended rate limits:

```python
# settings.py
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
        'rest_framework.throttling.UserRateThrottle'
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '100/hour',
        'user': '1000/hour'
    }
}
```

---

For more details, see [INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md) and [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)
