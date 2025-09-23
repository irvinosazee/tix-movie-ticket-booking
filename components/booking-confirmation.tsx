"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Calendar, Clock, MapPin, Ticket } from "lucide-react"

interface BookingDetails {
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

interface BookingConfirmationProps {
  bookingId: string
}

export function BookingConfirmation({ bookingId }: BookingConfirmationProps) {
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        // Mock data for demonstration
        const mockBooking: BookingDetails = {
          id: bookingId,
          movieTitle: "The Dark Knight",
          showtime: "2:00 PM",
          date: "Today",
          theater: "Theater 1",
          seats: ["A7", "A8"],
          customerName: "John Doe",
          customerEmail: "john.doe@example.com",
          totalAmount: 25.0,
          bookingDate: new Date().toLocaleDateString(),
        }

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setBooking(mockBooking)
      } catch (error) {
        console.error("Failed to fetch booking details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="bg-muted rounded-full h-16 w-16 mx-auto"></div>
              <div className="bg-muted rounded-xl h-8 w-3/4 mx-auto"></div>
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="bg-muted rounded-xl h-4 w-full"></div>
                <div className="bg-muted rounded-xl h-4 w-3/4"></div>
                <div className="bg-muted rounded-xl h-4 w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!booking) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center bg-card rounded-xl p-8 card-shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 glow-effect">
              <CheckCircle className="h-10 w-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Your tickets have been successfully booked. Check your email for confirmation details.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 mb-8 card-shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Ticket className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-semibold">Booking Details</h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Booking ID</span>
                <span className="font-mono font-semibold bg-muted/30 px-3 py-1 rounded-lg">{booking.id}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Movie</span>
                <span className="font-semibold">{booking.movieTitle}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  Date
                </span>
                <span className="font-semibold">{booking.date}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2 font-medium">
                  <Clock className="h-4 w-4" />
                  Time
                </span>
                <span className="font-semibold">{booking.showtime}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground flex items-center gap-2 font-medium">
                  <MapPin className="h-4 w-4" />
                  Theater
                </span>
                <span className="font-semibold">{booking.theater}</span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Seats</span>
                <span className="font-semibold bg-primary/10 text-primary px-3 py-1 rounded-lg">
                  {booking.seats.join(", ")}
                </span>
              </div>

              <div className="flex justify-between items-center py-3 border-b border-border">
                <span className="text-muted-foreground font-medium">Customer</span>
                <span className="font-semibold">{booking.customerName}</span>
              </div>

              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground font-medium">Total Amount</span>
                <span className="font-bold text-xl text-primary">${booking.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-8">
            <h3 className="font-semibold mb-3">Important Information</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Please arrive at least 15 minutes before showtime</li>
              <li>• Bring a valid ID for verification</li>
              <li>• Screenshots of this confirmation are accepted</li>
              <li>• No outside food or beverages allowed</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="flex-1 bg-primary hover:bg-primary/90 rounded-xl font-semibold py-3 hover:glow-effect"
            >
              <Link href="/">Book Another Movie</Link>
            </Button>
            <Button
              variant="outline"
              className="flex-1 rounded-xl font-semibold py-3 hover:bg-card bg-transparent"
              onClick={() => window.print()}
            >
              Print Confirmation
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
