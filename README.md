# 🎬 Tix - Movie Ticket Booking System

A modern, responsive web application for browsing movies, selecting showtimes, choosing seats, and booking tickets. Built with Next.js 14, TypeScript, Prisma ORM, and SQLite.

![Tix Banner](public/placeholder-logo.png)

## 🚀 Features

### Core Functionality

- **Movie Catalog** - Browse available movies with detailed information
- **Showtime Selection** - View available showtimes across different theaters
- **Interactive Seat Selection** - Visual seat map with real-time availability
- **Booking System** - Complete booking flow with customer details
- **Booking Confirmation** - Detailed booking receipts with unique IDs

### Technical Features

- **Responsive Design** - Mobile-first approach with seamless desktop experience
- **Real-time Updates** - Seat availability updates in real-time
- **Form Validation** - Client and server-side validation
- **Error Handling** - Comprehensive error handling and user feedback
- **Database Persistence** - All bookings and seat selections stored in database
- **API-First Architecture** - RESTful API endpoints for all operations

## 🎨 Design System

- **Primary Color**: Orange (#FF6B00) - Warm, inviting cinema experience
- **Secondary Color**: Dark Gray (#1C1C1C) - Modern, professional look
- **Card Backgrounds**: Light Gray (#F5F5F5) - Clean, readable interface
- **Typography**: Clean, modern fonts with excellent readability
- **Animation**: Smooth transitions and hover effects for enhanced UX

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **TailwindCSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **Prisma ORM** - Type-safe database operations
- **SQLite** - Lightweight, serverless database

### Development Tools

- **pnpm** - Fast, efficient package manager
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

## 📊 Database Schema

### Movies

- Movie details (title, description, poster, duration, genre, rating)
- IMDB rating and release year
- Relationships to showtimes

### Theaters

- Theater information (name, capacity, type)
- Support for Standard, IMAX, and Premium theaters

### Showtimes

- Date and time scheduling
- Pricing per showtime
- Available seat tracking
- Links to movies and theaters

### Seats

- Row and seat number identification
- Real-time booking status
- Relationship to specific showtimes

### Bookings

- Customer information (name, email)
- Selected seats and total amount
- Booking timestamps and unique IDs

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/tix-movie-ticket-booking.git
   cd tix-movie-ticket-booking
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up the database**

   ```bash
   # Generate Prisma client
   npx prisma generate

   # Run database migrations
   npx prisma migrate dev --name init

   # Seed the database with sample data
   pnpm run db:seed
   ```

4. **Start the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tix/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── movies/              # Movie-related endpoints
│   │   ├── showtimes/           # Showtime and seat endpoints
│   │   └── bookings/            # Booking endpoints
│   ├── movies/[id]/             # Movie details pages
│   ├── showtimes/[id]/seats/    # Seat selection pages
│   ├── bookings/[id]/           # Booking confirmation pages
│   └── globals.css              # Global styles
├── components/                   # Reusable React components
│   ├── ui/                      # Base UI components
│   ├── movie-card.tsx           # Movie display component
│   ├── movie-grid.tsx           # Movie catalog grid
│   ├── movie-details.tsx        # Detailed movie view
│   ├── seat-selection.tsx       # Interactive seat map
│   └── booking-confirmation.tsx # Booking receipt
├── lib/                         # Utility functions and data
│   ├── db.ts                    # Database connection
│   ├── data.ts                  # Type definitions and helpers
│   └── utils.ts                 # Utility functions
├── prisma/                      # Database schema and migrations
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Database seeding script
│   └── migrations/              # Database migration files
└── public/                      # Static assets
    └── movie posters and images
```

## 🔌 API Endpoints

### Movies

- `GET /api/movies` - List all movies
- `GET /api/movies/[id]` - Get movie details with showtimes

### Showtimes & Seats

- `GET /api/showtimes/[id]/seats` - Get seat map for a showtime

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/[id]` - Get booking details

### API Request/Response Examples

#### Create Booking

```javascript
POST /api/bookings
Content-Type: application/json

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
    "id": "cm1k8...",
    "movieTitle": "The Dark Knight",
    "showtime": "2:00 PM",
    "date": "Today",
    "theater": "Cinema Hall 1",
    "seats": ["A5", "A6"],
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "totalAmount": 25.98,
    "bookingDate": "2025-09-23T18:30:00.000Z"
  }
}
```

## 🎯 Page Flow

1. **Home Page** (`/`) - Movie catalog with search and filtering
2. **Movie Details** (`/movies/[id]`) - Movie information and showtime selection
3. **Seat Selection** (`/showtimes/[id]/seats`) - Interactive seat map and booking form
4. **Booking Confirmation** (`/bookings/[id]`) - Receipt and booking details

## 🧪 Database Management

### Viewing Data

```bash
# Open Prisma Studio for visual database management
npx prisma studio
```

### Database Operations

```bash
# Reset database (development only)
npx prisma migrate reset

# Apply new migrations
npx prisma migrate dev

# Re-seed database
pnpm run db:seed
```

## 🎨 Customization

### Adding New Movies

1. Add movie data to `prisma/seed.ts`
2. Include poster images in `public/` directory
3. Run `pnpm run db:seed` to update database

### Styling

- Primary colors defined in `tailwind.config.js`
- Component styles in individual component files
- Global styles in `app/globals.css`

### Theater Configuration

- Theater types: Standard, IMAX, Premium
- Seat layout: 8 rows × 12 seats (96 total)
- Configurable in database schema

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Optional: Add other environment variables as needed
```

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Adapted layouts for medium screens
- **Desktop**: Full-featured experience with expanded layouts
- **Breakpoints**: Following TailwindCSS standard breakpoints

## 🛡️ Security Features

- **Input Validation**: Client and server-side validation
- **SQL Injection Prevention**: Prisma ORM provides protection
- **XSS Protection**: Next.js built-in security features
- **Type Safety**: TypeScript prevents runtime errors

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub repository
2. Connect to Vercel
3. Configure environment variables
4. Deploy automatically

### Other Platforms

- Compatible with any Node.js hosting platform
- Requires SQLite or PostgreSQL database
- Environment variables for production configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎬 Sample Data

The application comes pre-loaded with:

- **6 Movies**: Popular titles with high-quality posters
- **3 Theaters**: Standard halls and IMAX theater
- **Multiple Showtimes**: Various times and dates
- **Realistic Seat Data**: Pre-booked seats for demonstration

## 📞 Support

For support, email your-email@example.com or create an issue on GitHub.

## 🙏 Acknowledgments

- Movie posters and images from various sources
- Icons from Lucide React
- UI components inspired by modern design systems
- Built with love for cinema enthusiasts

---

**Made with ❤️ for movie lovers everywhere**
