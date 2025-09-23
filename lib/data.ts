// Centralized data types and mock data for the movie ticket booking app

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface Movie {
    id: string
    title: string
    description: string
    posterUrl: string
    duration: number // in minutes
    genre: string
    rating: string // PG-13, R, etc.
    imdbRating?: number
    releaseYear?: number
}

export interface Showtime {
    id: string
    movieId: string
    time: string
    date: string
    availableSeats: number
    theater: string
    price: number
}

export interface Seat {
    id: string
    row: string
    number: number
    status: "available" | "selected" | "booked"
}

export interface ShowtimeInfo {
    id: string
    movieId: string
    movieTitle: string
    time: string
    date: string
    theater: string
    price: number
}

export interface BookingDetails {
    id: string
    movieId: string
    showtimeId: string
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

export interface Theater {
    id: string
    name: string
    capacity: number
    type: string // "standard", "imax", "premium"
}

// ============================================================================
// MOCK DATA
// ============================================================================

export const MOVIES: Record<string, Movie> = {
    "1": {
        id: "1",
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        posterUrl: "/dark-knight-poster.png",
        duration: 152,
        genre: "Action, Crime, Drama",
        rating: "PG-13",
        imdbRating: 9.0,
        releaseYear: 2008,
    },
    "2": {
        id: "2",
        title: "Inception",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        posterUrl: "/inception-movie-poster.png",
        duration: 148,
        genre: "Action, Sci-Fi, Thriller",
        rating: "PG-13",
        imdbRating: 8.8,
        releaseYear: 2010,
    },
    "3": {
        id: "3",
        title: "Interstellar",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        posterUrl: "/interstellar-movie-poster.jpg",
        duration: 169,
        genre: "Adventure, Drama, Sci-Fi",
        rating: "PG-13",
        imdbRating: 8.6,
        releaseYear: 2014,
    },
    "4": {
        id: "4",
        title: "Dune",
        description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
        posterUrl: "/dune-inspired-poster.png",
        duration: 155,
        genre: "Action, Adventure, Drama",
        rating: "PG-13",
        imdbRating: 8.0,
        releaseYear: 2021,
    },
    "5": {
        id: "5",
        title: "Top Gun: Maverick",
        description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
        posterUrl: "/top-gun-maverick-movie-poster.jpg",
        duration: 130,
        genre: "Action, Drama",
        rating: "PG-13",
        imdbRating: 8.3,
        releaseYear: 2022,
    },
    "6": {
        id: "6",
        title: "Avatar: The Way of Water",
        description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
        posterUrl: "/avatar-way-of-water-movie-poster.jpg",
        duration: 192,
        genre: "Action, Adventure, Family",
        rating: "PG-13",
        imdbRating: 7.6,
        releaseYear: 2022,
    },
}

export const THEATERS: Record<string, Theater> = {
    "theater-1": {
        id: "theater-1",
        name: "Cinema Hall 1",
        capacity: 96, // 8 rows × 12 seats
        type: "standard"
    },
    "theater-2": {
        id: "theater-2",
        name: "Cinema Hall 2",
        capacity: 96,
        type: "standard"
    },
    "theater-imax": {
        id: "theater-imax",
        name: "IMAX Theater",
        capacity: 96,
        type: "imax"
    }
}

export const SHOWTIMES: Showtime[] = [
    { id: "1", movieId: "1", time: "2:00 PM", date: "Today", availableSeats: 45, theater: "Cinema Hall 1", price: 12.99 },
    { id: "2", movieId: "1", time: "5:30 PM", date: "Today", availableSeats: 32, theater: "Cinema Hall 2", price: 12.99 },
    { id: "3", movieId: "1", time: "8:45 PM", date: "Today", availableSeats: 18, theater: "IMAX Theater", price: 18.99 },
    { id: "4", movieId: "2", time: "1:15 PM", date: "Today", availableSeats: 50, theater: "Cinema Hall 1", price: 12.99 },
    { id: "5", movieId: "2", time: "4:30 PM", date: "Today", availableSeats: 41, theater: "Cinema Hall 2", price: 12.99 },
    { id: "6", movieId: "2", time: "7:45 PM", date: "Today", availableSeats: 28, theater: "IMAX Theater", price: 18.99 },
    { id: "7", movieId: "3", time: "3:00 PM", date: "Tomorrow", availableSeats: 55, theater: "Cinema Hall 1", price: 12.99 },
    { id: "8", movieId: "3", time: "6:15 PM", date: "Tomorrow", availableSeats: 38, theater: "Cinema Hall 2", price: 12.99 },
    { id: "9", movieId: "3", time: "9:30 PM", date: "Tomorrow", availableSeats: 22, theater: "IMAX Theater", price: 18.99 },
    { id: "10", movieId: "4", time: "1:45 PM", date: "Tomorrow", availableSeats: 48, theater: "Cinema Hall 1", price: 12.99 },
    { id: "11", movieId: "4", time: "5:00 PM", date: "Tomorrow", availableSeats: 35, theater: "Cinema Hall 2", price: 12.99 },
    { id: "12", movieId: "5", time: "2:30 PM", date: "Tomorrow", availableSeats: 42, theater: "Cinema Hall 1", price: 12.99 },
    { id: "13", movieId: "5", time: "7:00 PM", date: "Tomorrow", availableSeats: 29, theater: "IMAX Theater", price: 18.99 },
    { id: "14", movieId: "6", time: "4:45 PM", date: "Tomorrow", availableSeats: 51, theater: "Cinema Hall 2", price: 12.99 },
    { id: "15", movieId: "6", time: "8:15 PM", date: "Tomorrow", availableSeats: 25, theater: "IMAX Theater", price: 18.99 },
]

// Pre-defined booked seats for realistic seat map generation
export const BOOKED_SEATS_BY_SHOWTIME: Record<string, string[]> = {
    "1": ["A5", "A6", "B3", "C7", "C8", "D1", "F9", "F10", "G4", "H2", "H11"],
    "2": ["A1", "A2", "B8", "B9", "C3", "C4", "D10", "E5", "E6", "F7", "G1", "G2"],
    "3": ["A7", "A8", "A9", "B4", "B5", "C1", "C2", "D6", "D7", "E8", "F3", "F4", "G10", "H5", "H6"],
    "4": ["A3", "A4", "B7", "C5", "C6", "D2", "D3", "E9", "F1", "F2", "G8", "H4"],
    "5": ["A10", "A11", "B1", "B2", "C9", "C10", "D4", "D5", "E7", "E8", "F5", "F6", "G3", "H9"],
    "6": ["A8", "A9", "B6", "B7", "C2", "C3", "D8", "D9", "E1", "E2", "F11", "F12", "G5", "G6", "H3", "H4"],
}

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

/**
 * Get all movies as an array
 */
export function getAllMovies(): Movie[] {
    return Object.values(MOVIES)
}

/**
 * Get a specific movie by ID
 */
export function getMovieById(id: string): Movie | null {
    return MOVIES[id] || null
}

/**
 * Get all showtimes for a specific movie
 */
export function getShowtimesByMovieId(movieId: string): Showtime[] {
    return SHOWTIMES.filter(showtime => showtime.movieId === movieId)
}

/**
 * Get a specific showtime by ID
 */
export function getShowtimeById(id: string): Showtime | null {
    return SHOWTIMES.find(showtime => showtime.id === id) || null
}

/**
 * Get showtime info with movie details
 */
export function getShowtimeInfo(id: string): ShowtimeInfo | null {
    const showtime = getShowtimeById(id)
    if (!showtime) return null

    const movie = getMovieById(showtime.movieId)
    if (!movie) return null

    return {
        id: showtime.id,
        movieId: showtime.movieId,
        movieTitle: movie.title,
        time: showtime.time,
        date: showtime.date,
        theater: showtime.theater,
        price: showtime.price
    }
}

/**
 * Generate seat map for a showtime
 */
export function generateSeatMap(showtimeId: string): Seat[] {
    const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
    const seatsPerRow = 12
    const bookedSeats = BOOKED_SEATS_BY_SHOWTIME[showtimeId] || []

    const seats: Seat[] = []

    rows.forEach((row) => {
        for (let i = 1; i <= seatsPerRow; i++) {
            const seatId = `${row}${i}`
            seats.push({
                id: seatId,
                row,
                number: i,
                status: bookedSeats.includes(seatId) ? "booked" : "available",
            })
        }
    })

    return seats
}

/**
 * Get theater information by name
 */
export function getTheaterByName(name: string): Theater | null {
    return Object.values(THEATERS).find(theater => theater.name === name) || null
}

/**
 * Generate mock booking details
 */
export function generateMockBooking(bookingId: string): BookingDetails {
    // For demo purposes, using first movie and showtime
    const movie = MOVIES["1"]
    const showtime = SHOWTIMES[0]

    return {
        id: bookingId,
        movieId: movie.id,
        showtimeId: showtime.id,
        movieTitle: movie.title,
        showtime: showtime.time,
        date: showtime.date,
        theater: showtime.theater,
        seats: ["A7", "A8"],
        customerName: "John Doe",
        customerEmail: "john.doe@example.com",
        totalAmount: showtime.price * 2,
        bookingDate: new Date().toLocaleDateString(),
    }
}

/**
 * Calculate total price for selected seats
 */
export function calculateTotalPrice(showtimeId: string, seatCount: number): number {
    const showtime = getShowtimeById(showtimeId)
    return showtime ? showtime.price * seatCount : 0
}

/**
 * Format duration from minutes to hours and minutes
 */
export function formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
}

/**
 * Get poster URL with fallback mapping
 */
export function getPosterUrl(movieId: string): string {
    const posterMap: Record<string, string> = {
        "1": "/dark-knight-poster.png",
        "2": "/inception-movie-poster.png",
        "3": "/interstellar-movie-poster.jpg",
        "4": "/dune-inspired-poster.png",
        "5": "/top-gun-maverick-movie-poster.jpg",
        "6": "/avatar-way-of-water-movie-poster.jpg",
    }

    const movie = getMovieById(movieId)
    return posterMap[movieId] || movie?.posterUrl || "/placeholder.svg"
}
