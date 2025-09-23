"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Clock, Calendar, MapPin, Ticket, User, Mail, Star, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type Seat,
  type ShowtimeInfo
} from "@/lib/data"
import { Header } from "./ui/header"

interface SeatSelectionProps {
  showtimeId: string
}

export function SeatSelection({ showtimeId }: SeatSelectionProps) {
  const router = useRouter()
  const [showtime, setShowtime] = useState<ShowtimeInfo | null>(null)
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
  })
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  useEffect(() => {
    const fetchSeatMap = async () => {
      try {
        const response = await fetch(`/api/showtimes/${showtimeId}/seats`)
        if (!response.ok) {
          throw new Error('Failed to fetch seat map')
        }

        const data = await response.json()

        setShowtime(data.showtime)
        setSeats(data.seats)
      } catch (error) {
        console.error('Error fetching seat map:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSeatMap()
  }, [showtimeId])

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find((s) => s.id === seatId)
    if (!seat || seat.status === "booked") return

    setSeats((prev) =>
      prev.map((s) => (s.id === seatId ? { ...s, status: s.status === "selected" ? "available" : "selected" } : s)),
    )

    setSelectedSeats((prev) => (prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]))
  }

  const handleBooking = async () => {
    if (selectedSeats.length === 0 || !customerInfo.name || !customerInfo.email) {
      return
    }

    setBooking(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showtimeId,
          selectedSeats,
          customerName: customerInfo.name,
          customerEmail: customerInfo.email,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Booking failed')
      }

      const data = await response.json()

      // Navigate to confirmation page
      router.push(`/bookings/${data.bookingId}`)
    } catch (error) {
      console.error("Booking failed:", error)
      setBooking(false)
    }
  }

  const getSeatPrice = () => showtime?.price || 12.5
  const getTotalPrice = () => (showtime?.price || 12.5) * selectedSeats.length

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        {/* Header Skeleton */}
        <div className="bg-card/80 backdrop-blur-sm border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-xl animate-pulse"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-16 h-6 bg-muted rounded animate-pulse"></div>
                  <div className="w-20 h-3 bg-muted rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-muted rounded-2xl h-32 w-full"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-muted rounded-2xl h-96 w-full"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-muted rounded-2xl h-96 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!showtime) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center bg-gradient-card rounded-2xl p-8 card-shadow-xl max-w-md">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Ticket className="h-8 w-8 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Showtime Not Found</h1>
          <p className="text-muted-foreground mb-6">
            Sorry, we couldn't find the showtime you're looking for. It may have been removed or is no longer available.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl font-semibold">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Movies
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header with Logo and Navigation */}
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Movie Info Header */}
        <div className="mb-8 bg-gradient-card rounded-2xl p-6 card-shadow-lg">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-20 h-28 bg-muted rounded-lg flex items-center justify-center">
                <Ticket className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3 text-gradient">{showtime.movieTitle}</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-semibold">{showtime.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-semibold">{showtime.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Theater:</span>
                  <span className="font-semibold">{showtime.theater}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-semibold">4.8</span>
              <span className="text-muted-foreground">(2.1k)</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gradient-card rounded-2xl p-6 card-shadow-lg">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Ticket className="h-6 w-6 text-primary" />
                  Select Your Seats
                </h2>
                <p className="text-muted-foreground">Choose your preferred seats for the best movie experience</p>
              </div>

              {/* Screen */}
              <div className="mb-12">
                <div className="relative">
                  <div className="bg-gradient-to-b from-primary/20 to-primary/5 rounded-t-full h-8 w-full max-w-lg mx-auto mb-4 border border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"></div>
                  </div>
                  <p className="text-center text-sm font-semibold text-muted-foreground mb-2">SCREEN</p>
                  <div className="flex justify-center">
                    <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                      Premium Sound & Visual Experience
                    </div>
                  </div>
                </div>
              </div>

              {/* Seat Map */}
              <div className="space-y-4 mb-8">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-3">
                    <div className="w-10 text-center">
                      <div className="w-8 h-8 bg-muted/50 rounded-full flex items-center justify-center text-sm font-bold text-muted-foreground">
                        {row}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {seats
                        .filter((seat) => seat.row === row)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === "booked"}
                            className={cn(
                              "w-10 h-10 rounded-t-xl text-xs font-bold transition-all duration-300",
                              "border-2 hover:scale-110 relative overflow-hidden",
                              seat.status === "available" &&
                              "bg-card hover:bg-card/80 text-foreground border-border hover:border-primary/50 hover:shadow-md",
                              seat.status === "selected" &&
                              "bg-primary hover:bg-primary/90 text-primary-foreground border-primary glow-effect scale-110 shadow-lg",
                              seat.status === "booked" &&
                              "bg-muted/30 text-muted-foreground/40 cursor-not-allowed border-muted/30",
                            )}
                          >
                            <span className="relative z-10">{seat.number}</span>
                            {seat.status === "selected" && (
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="bg-muted/30 rounded-xl p-4">
                <h3 className="font-semibold mb-3 text-center">Seat Legend</h3>
                <div className="flex justify-center gap-8 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-card border-2 border-border rounded-t-xl"></div>
                    <span className="font-medium">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary border-2 border-primary rounded-t-xl"></div>
                    <span className="font-medium">Selected</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-muted/30 border-2 border-muted/30 rounded-t-xl"></div>
                    <span className="font-medium">Booked</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-gradient-card border border-border rounded-2xl p-6 sticky top-24 card-shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                Booking Summary
              </h3>

              {selectedSeats.length > 0 ? (
                <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Selected Seats:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat) => (
                      <span key={seat} className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-sm font-semibold">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-muted/30 rounded-xl text-center">
                  <Ticket className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No seats selected yet</p>
                </div>
              )}

              <div className="mb-6 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Seats ({selectedSeats.length})</span>
                    <span className="font-semibold">${getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Price per seat</span>
                    <span>${getSeatPrice().toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-primary/20 pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Amount</span>
                    <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" />
                  Customer Details
                </h4>
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-sm flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-sm flex items-center gap-2">
                    <Mail className="h-3 w-3" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email address"
                    className="rounded-xl border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0 || !customerInfo.name || !customerInfo.email || booking}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all duration-300 hover:glow-effect hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 disabled:hover:glow-none relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {booking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Ticket className="h-5 w-5" />
                      Confirm Booking (${getTotalPrice().toFixed(2)})
                    </>
                  )}
                </span>
                {!booking && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 group-hover:animate-pulse"></div>
                )}
              </Button>

              <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-3 w-3" />
                  <span>Secure payment • Instant confirmation • 24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
