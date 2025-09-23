"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"
import { CheckCircle, Calendar, Clock, MapPin, Ticket, Download, Printer, QrCode } from "lucide-react"

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
      <>
        <Header />
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
      </>
    )
  }

  if (!booking) {
    return (
      <>
        <Header />
        <div className="min-h-screen gradient-bg flex items-center justify-center">
          <div className="text-center bg-card rounded-xl p-8 card-shadow-lg">
            <h1 className="text-2xl font-bold mb-4">Booking not found</h1>
            <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen gradient-bg" style={{ minHeight: '100vh' }}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4 premium-glow">
                <CheckCircle className="h-8 w-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-2 text-gradient">
                Booking Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Your tickets have been successfully booked. Please save this confirmation for your records.
              </p>
            </div>
            
            {/* Booking Details Card */}
            <div className="booking-card rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <Ticket className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Booking Details</h2>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Booking ID</span>
                  <span className="font-mono font-semibold bg-muted/30 px-3 py-1 rounded-lg">
                    {booking.id}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Movie</span>
                  <span className="font-bold text-lg">{booking.movieTitle}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1 py-2">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium">
                      <Calendar className="h-4 w-4" />
                      Date
                    </span>
                    <span className="font-semibold">{booking.date}</span>
                  </div>

                  <div className="flex flex-col space-y-1 py-2">
                    <span className="text-muted-foreground flex items-center gap-2 font-medium">
                      <Clock className="h-4 w-4" />
                      Time
                    </span>
                    <span className="font-semibold">{booking.showtime}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground flex items-center gap-2 font-medium">
                    <MapPin className="h-4 w-4" />
                    Theater
                  </span>
                  <span className="font-semibold">{booking.theater}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Seats</span>
                  <span className="font-semibold bg-primary/10 text-primary px-3 py-1 rounded-lg">
                    {booking.seats.join(", ")}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-border/50">
                  <span className="text-muted-foreground font-medium">Customer</span>
                  <span className="font-semibold">{booking.customerName}</span>
                </div>

                <div className="flex justify-between items-center py-3 bg-primary/5 rounded-lg px-4">
                  <span className="font-semibold text-lg">Total Amount</span>
                  <span className="font-bold text-2xl text-primary">
                    ${booking.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-muted/30 border border-border rounded-xl p-5 mb-8">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
                Important Information
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Please arrive at least 15 minutes before showtime</li>
                <li>• Bring a valid ID for verification</li>
                <li>• Screenshots of this confirmation are accepted</li>
                <li>• No outside food or beverages allowed</li>
                <li>• Contact support: support@tix.com or 1-800-TIX-HELP</li>
              </ul>
            </div>

            {/* Action Buttons - Hidden when printing */}
            <div className="flex flex-col sm:flex-row gap-4 screen-only">
              <Button
                asChild
                className="flex-1 bg-primary hover:bg-primary/90 rounded-xl font-semibold py-3 hover:premium-glow transition-all duration-300"
              >
                <Link href="/">Book Another Movie</Link>
              </Button>
              <Button
                variant="outline"
                className="flex-1 rounded-xl font-semibold py-3 hover:bg-card bg-transparent border-2 hover:border-primary/20"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4 mr-2" />
                Print Ticket
              </Button>
              <Button
                variant="outline"
                className="rounded-xl font-semibold py-3 px-6 hover:bg-card bg-transparent border-2 hover:border-primary/20"
                onClick={() => {
                  // Mock download functionality
                  const element = document.createElement('a');
                  const file = new Blob([`Booking Confirmation\n\nBooking ID: ${booking.id}\nMovie: ${booking.movieTitle}\nDate: ${booking.date}\nTime: ${booking.showtime}\nSeats: ${booking.seats.join(', ')}\nTotal: $${booking.totalAmount.toFixed(2)}`], { type: 'text/plain' });
                  element.href = URL.createObjectURL(file);
                  element.download = `ticket-${booking.id}.txt`;
                  document.body.appendChild(element);
                  element.click();
                  document.body.removeChild(element);
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Print-only elements */}
            <div className="print-only">
              <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #ccc', fontSize: '12px', color: '#666' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <Image
                    src="/placeholder-logo.svg"
                    alt="Tix Logo"
                    width={100}
                    height={24}
                    style={{ height: '24px', width: 'auto' }}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <p>Booking Confirmation</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <p>Thank you for choosing Tix! Visit us at www.tix.com</p>
                <p>This is a computer-generated receipt. No signature required.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
