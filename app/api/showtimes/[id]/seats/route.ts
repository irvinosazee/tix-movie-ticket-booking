import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/showtimes/[id]/seats - Get seat map for a showtime
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const showtimeId = params.id

        // First, check if showtime exists and get details
        const showtime = await prisma.showtime.findUnique({
            where: { id: showtimeId },
            include: {
                movie: true,
                theater: true,
            },
        })

        if (!showtime) {
            return NextResponse.json(
                { error: 'Showtime not found' },
                { status: 404 }
            )
        }

        // Get all seats for this showtime
        const seats = await prisma.seat.findMany({
            where: { showtimeId },
            orderBy: [
                { row: 'asc' },
                { number: 'asc' },
            ],
        })

        // If no seats exist, create them dynamically (for seeded data)
        if (seats.length === 0) {
            const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            const seatsPerRow = 12
            const newSeats = []

            for (const row of rows) {
                for (let number = 1; number <= seatsPerRow; number++) {
                    const seat = await prisma.seat.create({
                        data: {
                            showtimeId,
                            row,
                            number,
                            isBooked: false,
                        },
                    })
                    newSeats.push(seat)
                }
            }

            return NextResponse.json({
                showtime: {
                    id: showtime.id,
                    movieTitle: showtime.movie.title,
                    time: showtime.time,
                    date: showtime.date,
                    theater: showtime.theater.name,
                    price: showtime.price,
                },
                seats: newSeats.map(seat => ({
                    id: `${seat.row}${seat.number}`,
                    row: seat.row,
                    number: seat.number,
                    status: seat.isBooked ? 'booked' : 'available',
                })),
            })
        }

        // Transform seats to match frontend format
        const seatMap = seats.map(seat => ({
            id: `${seat.row}${seat.number}`,
            row: seat.row,
            number: seat.number,
            status: seat.isBooked ? 'booked' : 'available',
        }))

        return NextResponse.json({
            showtime: {
                id: showtime.id,
                movieTitle: showtime.movie.title,
                time: showtime.time,
                date: showtime.date,
                theater: showtime.theater.name,
                price: showtime.price,
            },
            seats: seatMap,
        })
    } catch (error) {
        console.error('Error fetching seats:', error)
        return NextResponse.json(
            { error: 'Failed to fetch seats' },
            { status: 500 }
        )
    }
}