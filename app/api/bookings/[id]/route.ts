import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/bookings/[id] - Get booking details
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const bookingId = params.id

        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                showtime: {
                    include: {
                        movie: true,
                        theater: true,
                    },
                },
                seats: {
                    orderBy: [
                        { row: 'asc' },
                        { number: 'asc' },
                    ],
                },
            },
        })

        if (!booking) {
            return NextResponse.json(
                { error: 'Booking not found' },
                { status: 404 }
            )
        }

        // Transform response to match frontend format
        const response = {
            id: booking.id,
            movieTitle: booking.showtime.movie.title,
            posterUrl: booking.showtime.movie.posterUrl,
            showtime: booking.showtime.time,
            date: booking.showtime.date,
            theater: booking.showtime.theater.name,
            seats: booking.seats.map(seat => `${seat.row}${seat.number}`),
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            totalAmount: booking.totalAmount,
            bookingDate: booking.createdAt,
        }

        return NextResponse.json(response)
    } catch (error) {
        console.error('Error fetching booking:', error)
        return NextResponse.json(
            { error: 'Failed to fetch booking' },
            { status: 500 }
        )
    }
}