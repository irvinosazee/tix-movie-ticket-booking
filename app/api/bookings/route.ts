import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { showtimeId, selectedSeats, customerName, customerEmail } = body

        // Validate required fields
        if (!showtimeId || !selectedSeats || !customerName || !customerEmail) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        if (!Array.isArray(selectedSeats) || selectedSeats.length === 0) {
            return NextResponse.json(
                { error: 'No seats selected' },
                { status: 400 }
            )
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(customerEmail)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // Get showtime details
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

        // Check if selected seats are available
        const seats = await prisma.seat.findMany({
            where: {
                showtimeId,
                OR: selectedSeats.map(seatId => {
                    const row = seatId.charAt(0)
                    const number = parseInt(seatId.slice(1))
                    return { row, number }
                }),
            },
        })

        if (seats.length !== selectedSeats.length) {
            return NextResponse.json(
                { error: 'Some selected seats do not exist' },
                { status: 400 }
            )
        }

        // Check if any seats are already booked
        const bookedSeats = seats.filter(seat => seat.isBooked)
        if (bookedSeats.length > 0) {
            return NextResponse.json(
                { error: 'Some selected seats are already booked' },
                { status: 409 }
            )
        }

        // Calculate total amount
        const totalAmount = showtime.price * selectedSeats.length

        // Create booking and update seats in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Create the booking
            const booking = await tx.booking.create({
                data: {
                    showtimeId,
                    customerName,
                    customerEmail,
                    totalAmount,
                },
            })

            // Update seats to be booked and connect to booking
            await tx.seat.updateMany({
                where: {
                    id: { in: seats.map(seat => seat.id) },
                },
                data: {
                    isBooked: true,
                },
            })

            // Connect seats to booking (many-to-many relationship)
            await tx.booking.update({
                where: { id: booking.id },
                data: {
                    seats: {
                        connect: seats.map(seat => ({ id: seat.id })),
                    },
                },
            })

            // Update available seats count
            await tx.showtime.update({
                where: { id: showtimeId },
                data: {
                    availableSeats: showtime.availableSeats - selectedSeats.length,
                },
            })

            return booking
        })

        // Return booking confirmation
        return NextResponse.json({
            bookingId: result.id,
            message: 'Booking created successfully',
            booking: {
                id: result.id,
                movieTitle: showtime.movie.title,
                showtime: showtime.time,
                date: showtime.date,
                theater: showtime.theater.name,
                seats: selectedSeats,
                customerName,
                customerEmail,
                totalAmount,
                bookingDate: result.createdAt,
            },
        }, { status: 201 })

    } catch (error) {
        console.error('Error creating booking:', error)
        return NextResponse.json(
            { error: 'Failed to create booking' },
            { status: 500 }
        )
    }
}