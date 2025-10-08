import { prisma } from '../lib/db'

async function main() {
    console.log('🌱 Seeding database...')

    // Create theaters
    const theaters = await Promise.all([
        prisma.theater.upsert({
            where: { name: 'Cinema Hall 1' },
            update: {},
            create: {
                name: 'Cinema Hall 1',
                capacity: 96,
                type: 'standard',
            },
        }),
        prisma.theater.upsert({
            where: { name: 'Cinema Hall 2' },
            update: {},
            create: {
                name: 'Cinema Hall 2',
                capacity: 96,
                type: 'standard',
            },
        }),
        prisma.theater.upsert({
            where: { name: 'IMAX Theater' },
            update: {},
            create: {
                name: 'IMAX Theater',
                capacity: 96,
                type: 'imax',
            },
        }),
    ])

    // Create movies
    const movies = await Promise.all([
        prisma.movie.upsert({
            where: { id: '1' },
            update: {},
            create: {
                id: '1',
                title: 'The Dark Knight',
                description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                posterUrl: '/dark-knight-poster.png',
                duration: 152,
                genre: 'Action, Crime, Drama',
                rating: 'PG-13',
                imdbRating: 9.0,
                releaseYear: 2008,
            },
        }),
        prisma.movie.upsert({
            where: { id: '2' },
            update: {},
            create: {
                id: '2',
                title: 'Inception',
                description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                posterUrl: '/inception-movie-poster.png',
                duration: 148,
                genre: 'Action, Sci-Fi, Thriller',
                rating: 'PG-13',
                imdbRating: 8.8,
                releaseYear: 2010,
            },
        }),
        prisma.movie.upsert({
            where: { id: '3' },
            update: {},
            create: {
                id: '3',
                title: 'Interstellar',
                description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
                posterUrl: '/interstellar-movie-poster.jpg',
                duration: 169,
                genre: 'Adventure, Drama, Sci-Fi',
                rating: 'PG-13',
                imdbRating: 8.6,
                releaseYear: 2014,
            },
        }),
        prisma.movie.upsert({
            where: { id: '4' },
            update: {},
            create: {
                id: '4',
                title: 'Dune',
                description: 'Feature adaptation of Frank Herbert\'s science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.',
                posterUrl: '/dune-inspired-poster.png',
                duration: 155,
                genre: 'Action, Adventure, Drama',
                rating: 'PG-13',
                imdbRating: 8.0,
                releaseYear: 2021,
            },
        }),
        prisma.movie.upsert({
            where: { id: '5' },
            update: {},
            create: {
                id: '5',
                title: 'Top Gun: Maverick',
                description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN\'s elite graduates on a mission that demands the ultimate sacrifice.',
                posterUrl: '/top-gun-maverick-movie-poster.jpg',
                duration: 130,
                genre: 'Action, Drama',
                rating: 'PG-13',
                imdbRating: 8.3,
                releaseYear: 2022,
            },
        }),
        prisma.movie.upsert({
            where: { id: '6' },
            update: {},
            create: {
                id: '6',
                title: 'Avatar: The Way of Water',
                description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
                posterUrl: '/avatar-way-of-water-movie-poster.jpg',
                duration: 192,
                genre: 'Action, Adventure, Family',
                rating: 'PG-13',
                imdbRating: 7.6,
                releaseYear: 2022,
            },
        }),
    ])

    // Create showtimes
    const showtimes = await Promise.all([
        // The Dark Knight showtimes
        prisma.showtime.create({
            data: {
                id: '1',
                movieId: '1',
                theaterId: theaters[0].id,
                time: '2:00 PM',
                date: 'Today',
                price: 12990,
                availableSeats: 45,
            },
        }),
        prisma.showtime.create({
            data: {
                id: '2',
                movieId: '1',
                theaterId: theaters[1].id,
                time: '5:30 PM',
                date: 'Today',
                price: 12990,
                availableSeats: 32,
            },
        }),
        prisma.showtime.create({
            data: {
                id: '3',
                movieId: '1',
                theaterId: theaters[2].id,
                time: '8:45 PM',
                date: 'Today',
                price: 18990,
                availableSeats: 18,
            },
        }),
        // Inception showtimes
        prisma.showtime.create({
            data: {
                id: '4',
                movieId: '2',
                theaterId: theaters[0].id,
                time: '1:15 PM',
                date: 'Today',
                price: 12990,
                availableSeats: 50,
            },
        }),
        prisma.showtime.create({
            data: {
                id: '5',
                movieId: '2',
                theaterId: theaters[1].id,
                time: '4:30 PM',
                date: 'Today',
                price: 12990,
                availableSeats: 41,
            },
        }),
        prisma.showtime.create({
            data: {
                id: '6',
                movieId: '2',
                theaterId: theaters[2].id,
                time: '7:45 PM',
                date: 'Today',
                price: 18990,
                availableSeats: 28,
            },
        }),
    ])

    // Create seats for each showtime
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    const seatsPerRow = 12

    // Pre-defined booked seats
    const bookedSeatsByShowtime: Record<string, string[]> = {
        '1': ['A5', 'A6', 'B3', 'C7', 'C8', 'D1', 'F9', 'F10', 'G4', 'H2', 'H11'],
        '2': ['A1', 'A2', 'B8', 'B9', 'C3', 'C4', 'D10', 'E5', 'E6', 'F7', 'G1', 'G2'],
        '3': ['A7', 'A8', 'A9', 'B4', 'B5', 'C1', 'C2', 'D6', 'D7', 'E8', 'F3', 'F4', 'G10', 'H5', 'H6'],
    }

    for (const showtime of showtimes.slice(0, 3)) { // Only create seats for first 3 showtimes for now
        const bookedSeats = bookedSeatsByShowtime[showtime.id] || []

        for (const row of rows) {
            for (let number = 1; number <= seatsPerRow; number++) {
                const seatId = `${row}${number}`
                await prisma.seat.create({
                    data: {
                        showtimeId: showtime.id,
                        row,
                        number,
                        isBooked: bookedSeats.includes(seatId),
                    },
                })
            }
        }
    }

    console.log('✅ Database seeded successfully!')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })