# 📚 Tix Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture & Design](#architecture--design)
3. [Database Design](#database-design)
4. [API Documentation](#api-documentation)
5. [Frontend Components](#frontend-components)
6. [Backend Implementation](#backend-implementation)
7. [Development Guide](#development-guide)
8. [Deployment Guide](#deployment-guide)
9. [Testing Strategy](#testing-strategy)
10. [Performance Optimization](#performance-optimization)
11. [Security Considerations](#security-considerations)
12. [Troubleshooting](#troubleshooting)
13. [Extension & Customization](#extension--customization)

---

## Project Overview

### Vision & Mission
Tix is designed to provide a seamless, modern movie ticket booking experience that bridges the gap between traditional cinema booking systems and contemporary web applications. The project emphasizes user experience, performance, and maintainability.

### Core Objectives
- **Simplicity**: Minimal clicks from movie discovery to booking confirmation
- **Reliability**: Robust error handling and data consistency
- **Scalability**: Architecture that supports future enhancements
- **Accessibility**: Universal design principles for all users
- **Performance**: Fast loading times and responsive interactions

### Target Audience
- Movie enthusiasts seeking convenient booking
- Cinema operators requiring reliable booking systems
- Developers looking for modern web application examples

---

## Architecture & Design

### System Architecture

```mermaid
graph TB
    A[Client Browser] --> B[Next.js Frontend]
    B --> C[API Routes]
    C --> D[Prisma ORM]
    D --> E[SQLite Database]
    
    B --> F[Static Assets]
    B --> G[TailwindCSS]
    
    C --> H[Validation Layer]
    C --> I[Error Handling]
    C --> J[Business Logic]
```

### Design Patterns

#### 1. **API-First Architecture**
- All data operations through RESTful endpoints
- Clear separation between frontend and backend logic
- Enables future mobile app development

#### 2. **Component-Based UI**
- Reusable React components with TypeScript
- Atomic design methodology (atoms → molecules → organisms)
- Consistent props interfaces

#### 3. **Database-First Design**
- Prisma schema as single source of truth
- Type-safe database operations
- Automated migration management

### Technology Decisions

#### Frontend Framework: Next.js 14
**Why Next.js?**
- Server-side rendering for SEO optimization
- App Router for modern routing patterns
- Built-in API routes for full-stack development
- Excellent TypeScript integration
- Automatic code splitting and optimization

#### Database: SQLite + Prisma
**Why SQLite?**
- Zero-configuration setup for development
- ACID compliance for data integrity
- Suitable for small to medium-scale applications
- Easy migration to PostgreSQL for production scaling

**Why Prisma?**
- Type-safe database queries
- Automatic schema migrations
- Intuitive data modeling
- Excellent developer experience with Prisma Studio

#### Styling: TailwindCSS
**Why TailwindCSS?**
- Utility-first approach reduces CSS bundle size
- Consistent design system out of the box
- Excellent responsive design utilities
- Easy customization and theming

---

## Database Design

### Entity Relationship Diagram

```mermaid
erDiagram
    Movie ||--o{ Showtime : has
    Theater ||--o{ Showtime : hosts
    Showtime ||--o{ Seat : contains
    Showtime ||--o{ Booking : references
    Booking ||--o{ Seat : includes
    
    Movie {
        string id PK
        string title
        string description
        string posterUrl
        int duration
        string genre
        string rating
        float imdbRating
        int releaseYear
        datetime createdAt
        datetime updatedAt
    }
    
    Theater {
        string id PK
        string name UK
        int capacity
        string type
        datetime createdAt
        datetime updatedAt
    }
    
    Showtime {
        string id PK
        string movieId FK
        string theaterId FK
        string date
        string time
        float price
        int availableSeats
        datetime createdAt
        datetime updatedAt
    }
    
    Seat {
        string id PK
        string showtimeId FK
        string row
        int number
        boolean isBooked
        datetime createdAt
        datetime updatedAt
    }
    
    Booking {
        string id PK
        string showtimeId FK
        string customerName
        string customerEmail
        float totalAmount
        datetime createdAt
        datetime updatedAt
    }
```

### Database Schema Analysis

#### **Movies Table**
- **Primary Key**: `id` (CUID for uniqueness)
- **Indexes**: Title for search optimization
- **Constraints**: Non-null title, duration > 0
- **Relationships**: One-to-Many with Showtimes

#### **Theaters Table**
- **Primary Key**: `id` (CUID)
- **Unique Constraints**: `name` (prevents duplicate theater names)
- **Types**: Standard, IMAX, Premium (extensible enum)
- **Capacity**: Integer representing total seats

#### **Showtimes Table**
- **Composite Business Logic**: Movie + Theater + Date/Time combination
- **Foreign Keys**: movieId, theaterId with CASCADE delete
- **Price Strategy**: Per-showtime pricing for flexible business models
- **Available Seats**: Denormalized for performance (updated on booking)

#### **Seats Table**
- **Composite Unique Key**: (showtimeId, row, number)
- **Seat Identification**: Row (A-H) + Number (1-12) system
- **Booking Status**: Boolean flag for simplicity
- **Scalability**: Supports different theater layouts

#### **Bookings Table**
- **Customer Data**: Name and email (no authentication required for MVP)
- **Financial Tracking**: Total amount for accounting
- **Audit Trail**: Created/updated timestamps
- **Seat Relationship**: Many-to-Many through booking_seats junction

### Data Consistency Rules

1. **Seat Booking Atomicity**: All seat selections in a booking must succeed or fail together
2. **Available Seat Synchronization**: Showtime available seat count must match actual available seats
3. **Price Integrity**: Booking total must equal seat count × showtime price
4. **Temporal Consistency**: Cannot book seats for past showtimes

---

## API Documentation

### API Design Principles
- **RESTful Conventions**: Standard HTTP methods and status codes
- **Consistent Response Format**: Uniform JSON structure
- **Error Handling**: Detailed error messages with appropriate status codes
- **Validation**: Input validation on all endpoints
- **Type Safety**: TypeScript interfaces for all request/response objects

### Endpoint Specifications

#### **GET /api/movies**
**Purpose**: Retrieve all available movies

**Response Format**:
```typescript
interface MovieResponse {
  id: string
  title: string
  description: string
  posterUrl: string
  duration: number // minutes
  genre: string
  rating: string // PG-13, R, etc.
  imdbRating?: number
  releaseYear?: number
  createdAt: string
  updatedAt: string
}[]
```

**Status Codes**:
- `200`: Success
- `500`: Server error

**Caching Strategy**: 5-minute cache for movie catalog

---

#### **GET /api/movies/[id]**
**Purpose**: Get detailed movie information with showtimes

**Parameters**:
- `id`: Movie ID (path parameter)

**Response Format**:
```typescript
interface MovieDetailResponse {
  id: string
  title: string
  description: string
  posterUrl: string
  duration: number
  genre: string
  rating: string
  imdbRating?: number
  releaseYear?: number
  showtimes: {
    id: string
    time: string
    date: string
    price: number
    availableSeats: number
    theater: {
      id: string
      name: string
      type: string
    }
  }[]
}
```

**Status Codes**:
- `200`: Success
- `404`: Movie not found
- `500`: Server error

---

#### **GET /api/showtimes/[id]/seats**
**Purpose**: Retrieve seat map for a specific showtime

**Parameters**:
- `id`: Showtime ID (path parameter)

**Response Format**:
```typescript
interface SeatMapResponse {
  showtime: {
    id: string
    movieTitle: string
    time: string
    date: string
    theater: string
    price: number
  }
  seats: {
    id: string // e.g., "A5"
    row: string // e.g., "A"
    number: number // e.g., 5
    status: "available" | "booked"
  }[]
}
```

**Business Logic**:
- Seats automatically created if none exist for showtime
- 8 rows (A-H) × 12 seats per row = 96 total seats
- Seat status reflects real-time booking state

**Status Codes**:
- `200`: Success
- `404`: Showtime not found
- `500`: Server error

---

#### **POST /api/bookings**
**Purpose**: Create a new booking

**Request Format**:
```typescript
interface BookingRequest {
  showtimeId: string
  selectedSeats: string[] // e.g., ["A5", "A6"]
  customerName: string
  customerEmail: string
}
```

**Validation Rules**:
- `showtimeId`: Must exist in database
- `selectedSeats`: Must be valid seat IDs for the showtime
- `customerName`: Required, min 2 characters
- `customerEmail`: Valid email format required

**Response Format**:
```typescript
interface BookingResponse {
  bookingId: string
  message: string
  booking: {
    id: string
    movieTitle: string
    showtime: string
    date: string
    theater: string
    seats: string[]
    customerName: string
    customerEmail: string
    totalAmount: number
    bookingDate: string
  }
}
```

**Transaction Logic**:
1. Validate showtime exists
2. Check seat availability
3. Calculate total amount
4. Create booking record
5. Mark seats as booked
6. Update available seat count
7. Return confirmation

**Status Codes**:
- `201`: Booking created successfully
- `400`: Invalid input data
- `404`: Showtime not found
- `409`: Seats already booked
- `500`: Server error

---

#### **GET /api/bookings/[id]**
**Purpose**: Retrieve booking confirmation details

**Parameters**:
- `id`: Booking ID (path parameter)

**Response Format**:
```typescript
interface BookingDetailResponse {
  id: string
  movieTitle: string
  posterUrl: string
  showtime: string
  date: string
  theater: string
  seats: string[]
  customerName: string
  customerEmail: string
  totalAmount: number
  bookingDate: string
}
```

**Status Codes**:
- `200`: Success
- `404`: Booking not found
- `500`: Server error

### Error Response Format
All API endpoints return errors in consistent format:

```typescript
interface ErrorResponse {
  error: string
  message?: string
  details?: any
}
```

---

## Frontend Components

### Component Architecture

#### **Atomic Design Structure**
```
components/
├── ui/                    # Atoms (basic UI elements)
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   └── header.tsx
├── movie-card.tsx         # Molecules (movie display)
├── movie-grid.tsx         # Organisms (movie catalog)
├── movie-details.tsx      # Templates (movie page)
├── seat-selection.tsx     # Organisms (seat map)
└── booking-confirmation.tsx # Templates (confirmation page)
```

### Core Components Documentation

#### **MovieGrid Component**
**Purpose**: Display paginated grid of movies

**Props Interface**:
```typescript
interface MovieGridProps {
  searchQuery?: string
  genreFilter?: string
}
```

**State Management**:
- `movies`: Array of movie objects
- `loading`: Boolean for loading state
- `error`: Error message if API fails

**API Integration**:
- Fetches data from `/api/movies` on mount
- Implements loading states and error handling
- Auto-refreshes on search/filter changes

**Responsive Behavior**:
- Mobile: 3 columns
- Tablet: 4 columns  
- Desktop: 5-6 columns

---

#### **SeatSelection Component**
**Purpose**: Interactive seat map with booking form

**Props Interface**:
```typescript
interface SeatSelectionProps {
  showtimeId: string
}
```

**State Management**:
```typescript
interface SeatSelectionState {
  showtime: ShowtimeInfo | null
  seats: Seat[]
  selectedSeats: string[]
  customerInfo: {
    name: string
    email: string
  }
  loading: boolean
  booking: boolean
}
```

**Seat Interaction Logic**:
1. Click available seat → Select (orange highlight)
2. Click selected seat → Deselect
3. Click booked seat → No action (disabled state)
4. Real-time price calculation
5. Form validation before booking

**Visual Seat States**:
- **Available**: Gray background, hover effects
- **Selected**: Orange background, active state
- **Booked**: Dark gray, disabled cursor

---

#### **BookingConfirmation Component**
**Purpose**: Display booking receipt and details

**Props Interface**:
```typescript
interface BookingConfirmationProps {
  bookingId: string
}
```

**Features**:
- QR code generation for tickets
- Print-friendly layout
- Email receipt option
- Return to home navigation
- Booking details summary

### State Management Strategy

#### **Component State**
- Local component state with `useState` hooks
- Custom hooks for complex state logic
- State derived from API responses

#### **API State Management**
```typescript
// Custom hook pattern
function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchMovies()
      .then(setMovies)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  return { movies, loading, error }
}
```

### Styling Architecture

#### **TailwindCSS Configuration**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FF6B00',      // Orange
        secondary: '#1C1C1C',    // Dark Gray
        card: '#F5F5F5',         // Light Gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      }
    }
  }
}
```

#### **Component Styling Patterns**
```typescript
// Consistent styling patterns
const cardStyles = "bg-white rounded-2xl p-4 shadow-lg border border-gray-100"
const buttonStyles = "bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
const inputStyles = "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30"
```

---

## Backend Implementation

### Prisma Configuration

#### **Schema Definition Strategy**
```prisma
generator client {
  provider = "prisma-client-js"
  output   = "./lib/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

**Generation Strategy**:
- Custom output path for organized imports
- TypeScript client generation
- Development-optimized for SQLite

#### **Model Relationships**
```prisma
model Movie {
  id          String      @id @default(cuid())
  showtimes   Showtime[]  // One-to-Many
  // ... other fields
}

model Showtime {
  id        String    @id @default(cuid())
  movieId   String
  theaterId String
  movie     Movie     @relation(fields: [movieId], references: [id], onDelete: Cascade)
  theater   Theater   @relation(fields: [theaterId], references: [id], onDelete: Cascade)
  seats     Seat[]
  bookings  Booking[]
  // ... other fields
}
```

**Relationship Design Decisions**:
- `onDelete: Cascade` ensures data integrity
- CUID IDs for globally unique identifiers
- Composite unique constraints where appropriate

### API Route Implementation

#### **Route Structure**
```
app/api/
├── movies/
│   ├── route.ts           # GET /api/movies
│   └── [id]/
│       └── route.ts       # GET /api/movies/[id]
├── showtimes/
│   └── [id]/
│       └── seats/
│           └── route.ts   # GET /api/showtimes/[id]/seats
└── bookings/
    ├── route.ts           # POST /api/bookings
    └── [id]/
        └── route.ts       # GET /api/bookings/[id]
```

#### **Error Handling Pattern**
```typescript
export async function GET(request: NextRequest) {
  try {
    // Business logic
    const result = await someOperation()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Operation failed:', error)
    return NextResponse.json(
      { error: 'Operation failed', message: error.message },
      { status: 500 }
    )
  }
}
```

#### **Validation Layer**
```typescript
// Input validation utility
function validateBookingRequest(data: any): BookingRequest {
  const { showtimeId, selectedSeats, customerName, customerEmail } = data

  if (!showtimeId || !selectedSeats || !customerName || !customerEmail) {
    throw new Error('Missing required fields')
  }

  if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
    throw new Error('No seats selected')
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(customerEmail)) {
    throw new Error('Invalid email format')
  }

  return data as BookingRequest
}
```

### Database Connection Management

#### **Prisma Client Singleton**
```typescript
// lib/db.ts
import { PrismaClient } from './generated/prisma'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query'] : [],
})

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

**Connection Strategy**:
- Singleton pattern prevents connection pool exhaustion
- Development query logging for debugging
- Production optimization with minimal logging

---

## Development Guide

### Setup Requirements

#### **System Requirements**
- Node.js 18.0+ (LTS recommended)
- pnpm 8.0+ (package manager)
- Git 2.30+
- VS Code (recommended editor)

#### **Recommended VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "prisma.prisma",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint"
  ]
}
```

### Development Workflow

#### **Initial Setup**
```bash
# Clone repository
git clone <repository-url>
cd tix

# Install dependencies
pnpm install

# Setup environment
cp .env.example .env

# Database setup
npx prisma generate
npx prisma migrate dev --name init
pnpm run db:seed

# Start development server
pnpm dev
```

#### **Database Development Workflow**
```bash
# Make schema changes in prisma/schema.prisma
# Then run:
npx prisma migrate dev --name descriptive_migration_name

# View data in Prisma Studio
npx prisma studio

# Reset database (development only)
npx prisma migrate reset
pnpm run db:seed
```

#### **Component Development Process**
1. **Create Component**: Start with TypeScript interface
2. **Add Styling**: Use TailwindCSS utilities
3. **Implement Logic**: Add state management and API calls
4. **Test Integration**: Verify with parent components
5. **Document Props**: Add JSDoc comments

#### **API Development Process**
1. **Design Endpoint**: Define request/response interfaces
2. **Implement Route**: Add validation and business logic
3. **Test with Postman**: Verify all scenarios
4. **Update Frontend**: Connect component to API
5. **Error Testing**: Verify error handling

### Code Quality Standards

#### **TypeScript Configuration**
```json
// tsconfig.json key settings
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUncheckedIndexedAccess": true
  }
}
```

#### **ESLint Rules**
```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended"
  ],
  "rules": {
    "prefer-const": "error",
    "no-console": "warn",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

#### **Commit Conventions**
```
feat: add new booking confirmation component
fix: resolve seat selection race condition
docs: update API documentation
style: improve responsive layout for mobile
refactor: extract seat validation logic
test: add unit tests for booking service
```

---

## Deployment Guide

### Production Environment Setup

#### **Environment Variables**
```env
# Production .env
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="your-secret-key"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

#### **Vercel Deployment** (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod

# Configure environment variables in Vercel dashboard
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "build": {
    "env": {
      "PRISMA_GENERATE_DATAPROXY": "true"
    }
  },
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 30
    }
  }
}
```

#### **Database Migration for Production**
```bash
# Generate production Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed production data (if needed)
npx prisma db seed
```

### Performance Optimization

#### **Next.js Optimizations**
```javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    domains: ['your-image-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
}

export default nextConfig
```

#### **Database Optimization**
```sql
-- Add indexes for frequently queried columns
CREATE INDEX idx_showtimes_movie_date ON showtimes(movieId, date);
CREATE INDEX idx_seats_showtime_status ON seats(showtimeId, isBooked);
CREATE INDEX idx_bookings_email ON bookings(customerEmail);
```

### Monitoring & Analytics

#### **Performance Monitoring**
```typescript
// lib/analytics.ts
import { Analytics } from '@vercel/analytics/react'

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Analytics />
    </>
  )
}
```

#### **Error Tracking**
```typescript
// lib/error-tracking.ts
export function trackError(error: Error, context: string) {
  console.error(`[${context}]:`, error)
  // Integration with error tracking service (Sentry, LogRocket, etc.)
}
```

---

## Testing Strategy

### Testing Architecture

#### **Test Types**
1. **Unit Tests**: Individual functions and components
2. **Integration Tests**: API endpoints and database operations
3. **End-to-End Tests**: Complete user workflows
4. **Performance Tests**: Load testing and optimization

#### **Testing Tools Setup**
```bash
# Install testing dependencies
pnpm add -D jest @testing-library/react @testing-library/jest-dom
pnpm add -D @testing-library/user-event msw
```

#### **Jest Configuration** (`jest.config.js`):
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

### Component Testing Examples

#### **MovieCard Component Test**
```typescript
// __tests__/components/movie-card.test.tsx
import { render, screen } from '@testing-library/react'
import { MovieCard } from '@/components/movie-card'

const mockMovie = {
  id: '1',
  title: 'Test Movie',
  description: 'Test Description',
  posterUrl: '/test-poster.jpg',
  duration: 120,
  genre: 'Action',
  rating: 'PG-13',
  imdbRating: 8.5,
  releaseYear: 2023
}

describe('MovieCard', () => {
  it('displays movie information correctly', () => {
    render(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText('Test Movie')).toBeInTheDocument()
    expect(screen.getByText('2h 0m')).toBeInTheDocument()
    expect(screen.getByText('8.5')).toBeInTheDocument()
  })

  it('navigates to movie details on click', () => {
    render(<MovieCard movie={mockMovie} />)
    const card = screen.getByRole('link')
    expect(card).toHaveAttribute('href', '/movies/1')
  })
})
```

#### **API Route Testing**
```typescript
// __tests__/api/movies.test.ts
import { createMocks } from 'node-mocks-http'
import handler from '@/app/api/movies/route'

describe('/api/movies', () => {
  it('returns movies list successfully', async () => {
    const { req, res } = createMocks({
      method: 'GET',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const data = JSON.parse(res._getData())
    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toHaveProperty('title')
  })
})
```

### End-to-End Testing

#### **Playwright Configuration**
```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],
})
```

#### **E2E Test Example**
```typescript
// e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test'

test('complete booking flow', async ({ page }) => {
  // Navigate to home page
  await page.goto('/')
  
  // Select a movie
  await page.click('[data-testid="movie-card"]:first-child')
  
  // Select showtime
  await page.click('[data-testid="showtime-button"]:first-child')
  
  // Select seats
  await page.click('[data-testid="seat-A5"]')
  await page.click('[data-testid="seat-A6"]')
  
  // Fill customer information
  await page.fill('[data-testid="customer-name"]', 'John Doe')
  await page.fill('[data-testid="customer-email"]', 'john@example.com')
  
  // Complete booking
  await page.click('[data-testid="confirm-booking"]')
  
  // Verify confirmation page
  await expect(page).toHaveURL(/\/bookings\//)
  await expect(page.locator('[data-testid="booking-success"]')).toBeVisible()
})
```

---

## Performance Optimization

### Frontend Performance

#### **Image Optimization**
```typescript
// components/movie-card.tsx
import Image from 'next/image'

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <div className="movie-card">
      <Image
        src={movie.posterUrl}
        alt={movie.title}
        width={300}
        height={450}
        priority={movie.featured}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  )
}
```

#### **Code Splitting**
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const SeatSelection = dynamic(
  () => import('@/components/seat-selection'),
  { 
    loading: () => <SeatSelectionSkeleton />,
    ssr: false 
  }
)
```

#### **Bundle Analysis**
```bash
# Analyze bundle size
pnpm add -D @next/bundle-analyzer

# Add to next.config.mjs
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true pnpm build
```

### Database Performance

#### **Query Optimization**
```typescript
// Efficient data fetching with includes
const movie = await prisma.movie.findUnique({
  where: { id },
  include: {
    showtimes: {
      include: {
        theater: {
          select: { name: true, type: true }
        }
      },
      orderBy: { time: 'asc' }
    }
  }
})
```

#### **Connection Pooling**
```typescript
// lib/db.ts - Production configuration
export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ['error'],
})
```

### Caching Strategy

#### **API Response Caching**
```typescript
// app/api/movies/route.ts
export async function GET() {
  const movies = await prisma.movie.findMany()
  
  return NextResponse.json(movies, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60'
    }
  })
}
```

#### **Static Generation**
```typescript
// app/movies/[id]/page.tsx
export async function generateStaticParams() {
  const movies = await prisma.movie.findMany({
    select: { id: true }
  })
  
  return movies.map((movie) => ({
    id: movie.id,
  }))
}
```

---

## Security Considerations

### Input Validation & Sanitization

#### **API Input Validation**
```typescript
// lib/validation.ts
import { z } from 'zod'

const BookingSchema = z.object({
  showtimeId: z.string().cuid(),
  selectedSeats: z.array(z.string().regex(/^[A-H][1-9]|1[0-2]$/)),
  customerName: z.string().min(2).max(50).trim(),
  customerEmail: z.string().email().toLowerCase(),
})

export function validateBookingRequest(data: unknown) {
  return BookingSchema.parse(data)
}
```

#### **XSS Prevention**
```typescript
// Sanitize user input
import DOMPurify from 'isomorphic-dompurify'

function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] })
}
```

### Database Security

#### **SQL Injection Prevention**
- Prisma ORM provides built-in SQL injection protection
- Parameterized queries automatically handled
- Type-safe database operations

#### **Data Access Control**
```typescript
// Implement row-level security patterns
async function getBooking(bookingId: string, customerEmail: string) {
  return await prisma.booking.findFirst({
    where: {
      id: bookingId,
      customerEmail: customerEmail, // Ensure user can only access their bookings
    }
  })
}
```

### Rate Limiting

#### **API Rate Limiting**
```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'), // 10 requests per minute
})

// Usage in API routes
export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1'
  const { success } = await ratelimit.limit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { status: 429 }
    )
  }
  
  // Continue with request handling
}
```

### Environment Security

#### **Environment Variables Management**
```env
# Production .env (never commit to version control)
DATABASE_URL="postgresql://user:password@host:port/database"
NEXTAUTH_SECRET="complex-random-secret-key"
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."
```

#### **Secrets Management**
- Use environment-specific `.env` files
- Never commit secrets to version control
- Use proper secret management in production (AWS Secrets Manager, etc.)

---

## Troubleshooting

### Common Development Issues

#### **Database Connection Issues**
```bash
# Error: Can't reach database server
# Solution 1: Check if database is running
npx prisma db push

# Solution 2: Regenerate Prisma client
npx prisma generate

# Solution 3: Reset database
npx prisma migrate reset
```

#### **Build Errors**
```bash
# Error: Module not found
# Solution: Clear Next.js cache
rm -rf .next
pnpm dev

# Error: Type errors
# Solution: Check TypeScript configuration
npx tsc --noEmit
```

#### **Styling Issues**
```bash
# Error: Tailwind styles not applying
# Solution: Restart dev server and check configuration
pnpm dev

# Check if Tailwind is properly configured in tailwind.config.js
```

### Performance Issues

#### **Slow Database Queries**
```typescript
// Add query logging to identify slow queries
const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Duration: ' + e.duration + 'ms')
})
```

#### **Memory Leaks**
```bash
# Monitor memory usage
node --inspect pnpm dev

# Use Chrome DevTools for memory profiling
# Check for unclosed database connections
```

### Production Issues

#### **Deployment Failures**
```bash
# Check build process locally
pnpm build
pnpm start

# Verify environment variables are set correctly
echo $DATABASE_URL

# Check logs for specific errors
vercel logs
```

#### **Database Migration Issues**
```bash
# Check migration status
npx prisma migrate status

# Apply pending migrations
npx prisma migrate deploy

# Rollback problematic migration (if necessary)
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Extension & Customization

### Adding New Features

#### **User Authentication**
```typescript
// Install NextAuth.js
pnpm add next-auth

// Configure providers in app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // Additional configuration
})

export { handler as GET, handler as POST }
```

#### **Payment Integration**
```typescript
// Install Stripe
pnpm add stripe @stripe/stripe-js

// Create payment intent API route
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const { amount, bookingId } = await request.json()
  
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * 100, // Convert to cents
    currency: 'usd',
    metadata: {
      bookingId,
    },
  })
  
  return NextResponse.json({
    clientSecret: paymentIntent.client_secret,
  })
}
```

#### **Email Notifications**
```typescript
// Install email service
pnpm add nodemailer @types/nodemailer

// Create email service
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendBookingConfirmation(booking: Booking) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: booking.customerEmail,
    subject: 'Booking Confirmation - Tix',
    html: generateBookingEmailTemplate(booking),
  }
  
  await transporter.sendMail(mailOptions)
}
```

### Database Extensions

#### **Adding New Table**
```prisma
// Add to prisma/schema.prisma
model Review {
  id        String   @id @default(cuid())
  movieId   String
  userId    String
  rating    Int      @db.SmallInt // 1-5 stars
  comment   String?
  createdAt DateTime @default(now())
  
  movie     Movie    @relation(fields: [movieId], references: [id])
  user      User     @relation(fields: [userId], references: [id])
  
  @@unique([movieId, userId])
  @@map("reviews")
}

// Add relationship to Movie model
model Movie {
  // ... existing fields
  reviews   Review[]
}
```

#### **Creating Migration**
```bash
npx prisma migrate dev --name add_reviews_table
```

### UI Customization

#### **Theme Customization**
```typescript
// lib/themes.ts
export const themes = {
  orange: {
    primary: '#FF6B00',
    secondary: '#1C1C1C',
    accent: '#FFA500',
  },
  blue: {
    primary: '#3B82F6',
    secondary: '#1E293B',
    accent: '#60A5FA',
  },
  green: {
    primary: '#10B981',
    secondary: '#064E3B',
    accent: '#34D399',
  },
}

// Update tailwind.config.js to use dynamic theme
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
      },
    },
  },
}
```

#### **Adding New Components**
```typescript
// components/movie-filters.tsx
interface MovieFiltersProps {
  onGenreChange: (genre: string) => void
  onRatingChange: (rating: string) => void
  onSortChange: (sort: string) => void
}

export function MovieFilters({ onGenreChange, onRatingChange, onSortChange }: MovieFiltersProps) {
  return (
    <div className="flex gap-4 p-4">
      <select onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">All Genres</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        {/* More options */}
      </select>
      {/* More filters */}
    </div>
  )
}
```

### API Extensions

#### **Adding Pagination**
```typescript
// app/api/movies/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  const [movies, total] = await Promise.all([
    prisma.movie.findMany({
      skip,
      take: limit,
      orderBy: { title: 'asc' },
    }),
    prisma.movie.count(),
  ])

  return NextResponse.json({
    movies,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  })
}
```

#### **Adding Search Functionality**
```typescript
// app/api/movies/search/route.ts
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ movies: [] })
  }

  const movies = await prisma.movie.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
        { genre: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { title: 'asc' },
  })

  return NextResponse.json({ movies })
}
```

---

This comprehensive documentation covers every aspect of the Tix movie ticket booking system, from high-level architecture to implementation details. Use this as your complete reference guide for understanding, maintaining, and extending the application.
