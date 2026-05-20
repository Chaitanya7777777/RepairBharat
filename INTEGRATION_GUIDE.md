# Complete Integration Guide

## Overview

This document explains how to integrate the Provider Detail Page module into your RepairBharat application.

## Backend Setup (Django)

### Step 1: Add Providers App to Django

1. Update `backend/RepairBharat/settings.py`:

```python
INSTALLED_APPS = [
    # ... existing apps
    'rest_framework',
    'django_filters',
    'corsheaders',  # For frontend communication
    'django.contrib.gis',  # For PostGIS
    'providers',  # New app
]

# DRF Configuration
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}

# CORS Configuration (adjust for production)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8000",
    "https://yourdomain.com",
]
```

2. Update `backend/RepairBharat/urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('providers.urls')),  # Add this
]
```

3. Install dependencies:

```bash
cd backend
pip install djangorestframework django-cors-headers django-gis
```

4. Create migrations and migrate:

```bash
python manage.py makemigrations providers
python manage.py migrate providers
```

5. Create sample data:

```bash
python manage.py seed_providers
```

6. Start Django server:

```bash
python manage.py runserver 8000
```

### Step 2: Verify Backend APIs

Test the APIs using curl or Postman:

```bash
# List providers
curl http://localhost:8000/api/providers/

# Get provider detail
curl http://localhost:8000/api/providers/1/

# Get reviews
curl http://localhost:8000/api/providers/1/reviews/

# Get stats
curl http://localhost:8000/api/providers/1/stats/
```

## Frontend Setup (Next.js)

### Step 1: Create Next.js 14 App

If you haven't already:

```bash
npx create-next-app@latest RepairBharat --typescript --tailwind
cd RepairBharat
```

### Step 2: Install Dependencies

```bash
npm install @tanstack/react-query axios lucide-react
npm install -D typescript @types/react @types/node
```

### Step 3: Configure API URL

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Step 4: Setup React Query

Update `src/app/layout.tsx`:

```typescript
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: 1,
    },
  },
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### Step 5: Copy Provider Module

Copy all files from this module to your frontend:

```
frontend/
├── src/
│   ├── app/providers/[id]/
│   ├── components/provider/
│   ├── hooks/
│   ├── lib/
│   └── types/
```

### Step 6: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000/providers/1`

## File Mappings

### Backend Files to Create/Update

```
backend/
├── providers/                          (NEW APP)
│   ├── __init__.py
│   ├── models.py                       # Django models
│   ├── serializers.py                  # DRF serializers
│   ├── views.py                        # DRF viewsets
│   ├── urls.py                         # URL routing
│   ├── admin.py                        # Django admin
│   ├── apps.py                         # App config
│   ├── services/
│   │   ├── __init__.py
│   │   ├── trust_score.py              # Trust score calculation
│   │   └── provider_stats.py           # Stats functions
│   └── management/commands/
│       └── seed_providers.py           # Sample data
├── RepairBharat/
│   ├── settings.py                     # UPDATE: Add to INSTALLED_APPS
│   ├── urls.py                         # UPDATE: Add providers URLs
└── manage.py
```

### Frontend Files to Create

```
frontend/
├── src/
│   ├── app/providers/[id]/
│   │   ├── page.tsx                    # Main page
│   │   └── layout.tsx                  # Layout with metadata
│   ├── components/provider/
│   │   ├── ProviderHeader.tsx
│   │   ├── ProviderOverview.tsx
│   │   ├── TrustMetrics.tsx
│   │   ├── ServicesList.tsx
│   │   ├── ReviewsSection.tsx
│   │   ├── ContactActions.tsx
│   │   ├── ProviderMap.tsx
│   │   ├── LoadingSkeletons.tsx
│   │   ├── ErrorStates.tsx
│   │   ├── ProviderDetailPage.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useProvider.ts              # React Query hooks
│   │   └── index.ts
│   ├── lib/
│   │   └── utils.ts                    # Utility functions
│   └── types/
│       ├── provider.ts                 # TypeScript interfaces
│       └── constants.ts                # Constants
└── .env.local                          # CREATE: API URL
```

## Database Schema

### Provider Table

```sql
CREATE TABLE providers_provider (
    id BIGINT PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    shop_name VARCHAR(255) NOT NULL,
    bio TEXT,
    profile_image VARCHAR(500),
    verified BOOLEAN DEFAULT FALSE,
    location GEOGRAPHY(Point, 4326),
    address VARCHAR(500),
    avg_rating DECIMAL(3,2) DEFAULT 0,
    review_count INT DEFAULT 0,
    jobs_completed INT DEFAULT 0,
    repeat_customer_rate DECIMAL(5,2) DEFAULT 0,
    trust_score DECIMAL(5,2) DEFAULT 0,
    average_response_time_minutes INT DEFAULT 0,
    years_of_experience INT DEFAULT 0,
    specialization VARCHAR(255),
    supported_brands JSON,
    is_open BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES auth_user(id)
);

CREATE TABLE providers_providerservice (
    id BIGINT PRIMARY KEY,
    provider_id BIGINT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_price DECIMAL(10,2) NOT NULL,
    duration_minutes INT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (provider_id) REFERENCES providers_provider(id)
);

CREATE TABLE providers_review (
    id BIGINT PRIMARY KEY,
    provider_id BIGINT NOT NULL,
    customer_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    customer_image VARCHAR(500),
    is_verified_purchase BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (provider_id) REFERENCES providers_provider(id),
    FOREIGN KEY (customer_id) REFERENCES auth_user(id),
    UNIQUE (provider_id, customer_id, created_at)
);
```

## API Request/Response Examples

### Get Provider Detail

**Request:**
```
GET /api/providers/1/
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
  "bio": "Expert in smartphone repairs with 8 years of experience.",
  "profile_image": "https://example.com/raj.jpg",
  "verified": true,
  "address": "Karol Bagh, Delhi",
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
  "services": [
    {
      "id": 1,
      "name": "Screen Replacement",
      "description": "High-quality screen replacement",
      "estimated_price": "3000.00",
      "duration_minutes": 60,
      "is_available": true,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ],
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### Get Reviews

**Request:**
```
GET /api/providers/1/reviews/?page=1&page_size=10
```

**Response:**
```json
{
  "count": 156,
  "next": "http://localhost:8000/api/providers/1/reviews/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Excellent service! Fixed my phone quickly.",
      "customer": {
        "id": 10,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john@example.com"
      },
      "customer_image": "https://example.com/john.jpg",
      "is_verified_purchase": true,
      "created_at": "2024-01-15T12:00:00Z"
    }
  ]
}
```

### Get Stats

**Request:**
```
GET /api/providers/1/stats/
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

### Create Review

**Request:**
```
POST /api/providers/1/reviews/
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great service!",
  "customer_id": 10,
  "is_verified_purchase": true
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "rating": 5,
  "comment": "Great service!",
  "customer": {
    "id": 10,
    "first_name": "John",
    "last_name": "Doe",
    "email": "john@example.com"
  },
  "customer_image": "",
  "is_verified_purchase": true,
  "created_at": "2024-01-20T15:30:00Z"
}
```

## Testing the Integration

### 1. Test Backend Endpoints

```bash
# Start backend
cd backend
python manage.py runserver 8000

# In another terminal, test endpoints
curl http://localhost:8000/api/providers/
curl http://localhost:8000/api/providers/1/
curl http://localhost:8000/api/providers/1/reviews/
```

### 2. Test Frontend

```bash
# Start frontend
cd frontend
npm run dev

# Visit in browser
# http://localhost:3000/providers/1
```

### 3. Check Network Requests

- Open browser DevTools (F12)
- Go to Network tab
- Refresh provider page
- Should see API requests to backend
- Verify responses match examples above

## Troubleshooting

### CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** Update Django CORS settings:

```python
# settings.py
INSTALLED_APPS += ['corsheaders']
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware'] + MIDDLEWARE

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Database Connection

**Error:** `no such table: providers_provider`

**Solution:** Run migrations:

```bash
python manage.py migrate providers
```

### API URL Issues

**Error:** `Failed to fetch provider`

**Solution:** 
1. Verify backend is running: `http://localhost:8000`
2. Check `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:8000/api`
3. Restart Next.js dev server after changing env

### PostGIS Not Found

**Error:** `django.contrib.gis not installed`

**Solution:**
```bash
# Install GeoDjango dependencies (OS-specific)
# macOS:
brew install postgresql postgis

# Ubuntu/Debian:
sudo apt-get install postgresql-contrib postgis

# Then in Django:
pip install django-gis
```

## Production Deployment

### Backend Deployment

1. **Environment Setup:**
```python
# settings.py
DEBUG = False
ALLOWED_HOSTS = ['yourdomain.com']
SECRET_KEY = os.getenv('SECRET_KEY')  # Use environment variable
```

2. **Database:**
```bash
# Use PostgreSQL with PostGIS
python manage.py migrate
```

3. **CORS Configuration:**
```python
CORS_ALLOWED_ORIGINS = [
    "https://yourdomain.com",
]
```

4. **Deploy:**
```bash
# Using Gunicorn
pip install gunicorn
gunicorn RepairBharat.wsgi:application --bind 0.0.0.0:8000
```

### Frontend Deployment

1. **Build:**
```bash
npm run build
```

2. **Environment:**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

3. **Deploy to Vercel:**
```bash
npm install -g vercel
vercel deploy
```

## Performance Considerations

1. **Database Indexing:**
```sql
CREATE INDEX idx_provider_verified ON providers_provider(verified);
CREATE INDEX idx_provider_trust ON providers_provider(trust_score);
CREATE INDEX idx_review_provider ON providers_review(provider_id);
```

2. **Query Optimization:**
- Use `select_related()` for ForeignKey
- Use `prefetch_related()` for reverse relations
- Implement pagination

3. **Frontend Caching:**
- React Query handles API response caching
- Images use Next.js Image optimization
- CSS is minified in production

4. **CDN:**
- Serve static assets via CDN
- Cache API responses where appropriate

## Next Steps

1. Implement real payment processing for bookings
2. Add real-time notifications
3. Integrate Google Maps API
4. Implement user authentication
5. Add advanced filtering and search
6. Set up analytics and monitoring

## Support

For issues or questions:
1. Check error messages in browser console
2. Review Django debug output
3. Check network requests in DevTools
4. Review logs from both frontend and backend
