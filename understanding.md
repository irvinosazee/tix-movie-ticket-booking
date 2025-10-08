# Understanding Tix: Movie Ticket Booking System

## 📋 Executive Summary

**Tix** is a modern, full-stack web application for movie ticket booking built with Next.js 14, TypeScript, and Prisma ORM. It provides a seamless user experience from movie discovery to booking confirmation, featuring real-time seat selection, responsive design, and comprehensive booking management.

### Key Statistics

- **6 Movies** in the catalog with detailed information
- **3 Theater Types** (Standard, IMAX, Premium)
- **96 Seats per Theater** (8 rows × 12 seats)
- **Real-time Seat Availability** with visual feedback
- **Mobile-First Design** with full responsive support

---

## 🎯 Core Features & User Journey

### 1. Movie Discovery (Home Page)

- **Browse Movies**: Grid layout with movie posters, ratings, and basic info
- **Search Functionality**: Real-time movie search capability
- **Movie Details**: Click to view detailed information and showtimes

### 2. Movie Details & Showtime Selection

- **Comprehensive Info**: Synopsis, duration, genre, IMDB rating
- **Available Showtimes**: Multiple times across different theaters
- **Theater Information**: Standard, IMAX, and Premium options
- **Pricing Display**: Per-showtime pricing with availability

### 3. Interactive Seat Selection

- **Visual Seat Map**: 8 rows (A-H) × 12 seats with real-time status
- **Seat States**: Available (gray), Selected (orange), Booked (dark)
- **Dynamic Pricing**: Real-time total calculation
- **Customer Form**: Name and email validation

### 4. Booking Confirmation

- **Detailed Receipt**: Complete booking information with unique ID
- **QR Code**: Visual ticket representation
- **Print-Friendly**: Optimized layout for printing tickets
- **Contact Information**: Support details and policies

---

## 🏗 Technical Architecture

### Frontend Stack

```typescript
// Technology Choices
Next.js 14        // React framework with App Router
TypeScript        // Type-safe development
TailwindCSS       // Utility-first styling
Radix UI          // Accessible component primitives
Lucide React      // Icon library
```

### Backend & Database

```typescript
// Server & Data Layer
Next.js API Routes    // Serverless endpoints
Prisma ORM           // Type-safe database operations
SQLite               // Development database
PostgreSQL           // Production database option
```

### Key Architectural Decisions

1. **API-First Design**: Clear separation between frontend and backend
2. **Component-Based UI**: Reusable React components with TypeScript
3. **Database-First Approach**: Prisma schema as single source of truth
4. **Mobile-First Responsive**: Progressive enhancement for larger screens

---

## 📊 Database Schema Overview

### Core Entities

#### Movies Table

```sql
- id (Primary Key)
- title, description, posterUrl
- duration (minutes), genre, rating
- imdbRating, releaseYear
- Relationships: One-to-Many with Showtimes
```

#### Theaters Table

```sql
- id (Primary Key)
- name (Unique), capacity, type
- Types: "standard", "imax", "premium"
- Relationships: One-to-Many with Showtimes
```

#### Showtimes Table

```sql
- id (Primary Key)
- movieId, theaterId (Foreign Keys)
- date, time, price, availableSeats
- Business Logic: Movie + Theater + DateTime
```

#### Seats Table

```sql
- id (Primary Key: e.g., "A5")
- showtimeId (Foreign Key)
- row ("A"-"H"), number (1-12)
- isBooked (Boolean status)
```

#### Bookings Table

```sql
- id (Primary Key)
- showtimeId, customerName, customerEmail
- totalAmount, createdAt, updatedAt
- Relationships: Many-to-Many with Seats
```

### Data Flow

```
Movie Selection → Showtime Choice → Seat Selection → Booking Creation → Confirmation
```

---

## 🔌 API Endpoints Reference

### Movies

| Method | Endpoint           | Purpose                      |
| ------ | ------------------ | ---------------------------- |
| GET    | `/api/movies`      | List all movies              |
| GET    | `/api/movies/[id]` | Movie details with showtimes |

### Showtimes & Seats

| Method | Endpoint                    | Purpose               |
| ------ | --------------------------- | --------------------- |
| GET    | `/api/showtimes/[id]/seats` | Seat map for showtime |

### Bookings

| Method | Endpoint             | Purpose                      |
| ------ | -------------------- | ---------------------------- |
| POST   | `/api/bookings`      | Create new booking           |
| GET    | `/api/bookings/[id]` | Booking confirmation details |

### Request/Response Examples

#### Create Booking

```javascript
POST /api/bookings
{
  "showtimeId": "1",
  "selectedSeats": ["A5", "A6"],
  "customerName": "John Doe",
  "customerEmail": "john@example.com"
}

Response:
{
  "bookingId": "cm1k8...",
  "message": "Booking created successfully",
  "booking": {
    "movieTitle": "The Dark Knight",
    "showtime": "2:00 PM",
    "seats": ["A5", "A6"],
    "totalAmount": 25.98
  }
}
```

---

## 🎨 UI/UX Design System

### Color Palette

```css
Primary: Orange (#FF6B00)     // CTAs, highlights
Secondary: Dark (#1C1C1C)     // Text, headers
Accent: Light Orange          // Hover states
Background: Gradient          // Modern glass morphism
```

### Component Hierarchy

```
Pages (Templates)
├── Organisms (Complex Components)
│   ├── MovieGrid, SeatSelection, BookingConfirmation
├── Molecules (Component Groups)
│   ├── MovieCard, MovieDetails
└── Atoms (Basic UI)
    └── Button, Input, Card, Header
```

### Responsive Breakpoints

- **Mobile**: < 768px (3 movie columns)
- **Tablet**: 768px - 1024px (4 movie columns)
- **Desktop**: > 1024px (5-6 movie columns)

---

## 🔧 Development Setup Guide

### Prerequisites

```bash
Node.js 18.0+
pnpm (preferred package manager)
Git 2.30+
```

### Quick Start

```bash
# 1. Clone and install
git clone <repository-url>
cd tix
pnpm install

# 2. Database setup
npx prisma generate
npx prisma migrate dev --name init
pnpm run db:seed

# 3. Start development
pnpm dev
# Visit http://localhost:3000
```

### Key Commands

```bash
# Database management
npx prisma studio          # Visual database editor
npx prisma migrate reset    # Reset database
pnpm run db:seed           # Reseed sample data

# Development
pnpm dev                   # Start dev server
pnpm build                 # Production build
pnpm start                 # Production server
```

---

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel login
vercel --prod

# 3. Environment variables in Vercel dashboard
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret-key"
```

### Environment Variables

```env
# Development (.env)
DATABASE_URL="file:./dev.db"

# Production
DATABASE_URL="postgresql://user:pass@host:port/db"
NEXTAUTH_SECRET="complex-random-secret"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## 🎬 Sample Data Overview

### Movies Included

1. **The Dark Knight** (2008) - 9.0 IMDB
2. **Inception** (2010) - 8.8 IMDB
3. **Interstellar** (2014) - 8.6 IMDB
4. **Dune** (2021) - 8.0 IMDB
5. **Top Gun: Maverick** (2022) - 8.3 IMDB
6. **Avatar: The Way of Water** (2022) - 7.6 IMDB

### Theater Configuration

- **Cinema Hall 1** (Standard) - 96 seats
- **Cinema Hall 2** (Standard) - 96 seats
- **IMAX Theater** (Premium) - 96 seats

### Pricing Strategy

- Standard theaters: $12.99
- IMAX theaters: $18.99
- Dynamic pricing per showtime

---

## 🔒 Security & Performance

### Security Features

- **Input Validation**: Client and server-side validation
- **SQL Injection Protection**: Prisma ORM provides safety
- **XSS Prevention**: Next.js built-in security
- **Type Safety**: TypeScript prevents runtime errors

### Performance Optimizations

- **Image Optimization**: Next.js automatic optimization
- **Code Splitting**: Automatic bundle splitting
- **Caching**: API response caching strategies
- **Database Indexing**: Optimized queries for frequent operations

---

## 📱 Key User Stories

### Story 1: Quick Booking

> "As a movie enthusiast, I want to quickly find a movie, select a showtime, choose my seats, and complete my booking in under 2 minutes."

**Implementation**: Streamlined flow with minimal clicks, real-time updates, and intuitive navigation.

### Story 2: Mobile Experience

> "As a mobile user, I want the same full functionality on my phone with touch-friendly seat selection."

**Implementation**: Mobile-first design, touch gestures, optimized layouts for small screens.

### Story 3: Group Booking

> "As someone booking for friends, I want to select multiple seats together and see the total price update in real-time."

**Implementation**: Multi-seat selection, dynamic pricing, visual seat grouping.

---

## 🛠 Customization Points

### Easy Modifications

1. **Theater Layout**: Modify seat rows/columns in database schema
2. **Pricing Strategy**: Update per-showtime or per-theater pricing
3. **Movie Catalog**: Add/remove movies via database seeding
4. **UI Theming**: Update colors in TailwindCSS configuration

### Extension Opportunities

1. **User Authentication**: Add NextAuth.js integration
2. **Payment Processing**: Integrate Stripe or PayPal
3. **Email Notifications**: Add nodemailer for booking confirmations
4. **Advanced Search**: Add filters by genre, rating, theater type

---

## 📊 Presentation Talking Points

### Business Value

- **User Experience**: Modern, intuitive booking process
- **Scalability**: Architecture supports growth and feature additions
- **Maintainability**: Type-safe code with comprehensive documentation
- **Accessibility**: Responsive design with ARIA compliance

### Technical Highlights

- **Modern Stack**: Latest Next.js 14 with App Router
- **Type Safety**: End-to-end TypeScript implementation
- **Real-time Features**: Live seat availability updates
- **Production Ready**: Deployment-optimized with security best practices

### Competitive Advantages

- **Performance**: Fast loading times with optimized assets
- **Mobile Experience**: Native-like mobile interface
- **Developer Experience**: Excellent tooling and documentation
- **Flexibility**: Easy customization and extension points

---

## 📞 Support & Resources

### Documentation Locations

- **[README.md](README.md)** - Quick start and basic usage
- **[DOCUMENTATION.md](DOCUMENTATION.md)** - Comprehensive technical guide
- **API Documentation** - Endpoint specifications and examples
- **Component Documentation** - Props and usage examples

### Common Issues & Solutions

1. **Database Connection**: Run `npx prisma generate`
2. **Seed Data**: Run `pnpm run db:seed`
3. **Build Errors**: Clear `.next` cache and restart
4. **Styling Issues**: Verify TailwindCSS configuration

---

## 🎯 Demo Script Suggestions

### 5-Minute Demo Flow

1. **Homepage** (30s): Show movie catalog, search functionality
2. **Movie Details** (60s): Demonstrate movie info, showtime selection
3. **Seat Selection** (120s): Interactive seat map, real-time pricing
4. **Booking Flow** (90s): Form validation, booking creation
5. **Confirmation** (30s): Receipt display, print functionality

### Key Demo Points

- Responsive design across devices
- Real-time seat availability updates
- Smooth animations and transitions
- Error handling and validation
- Professional booking confirmation

---

This document provides everything needed to understand, present, and work with the Tix movie booking system. For technical implementation details, refer to the comprehensive [DOCUMENTATION.md](DOCUMENTATION.md) file.
