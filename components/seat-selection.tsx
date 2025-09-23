"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

interface Seat {
  id: string
  row: string
  number: number
  status: "available" | "selected" | "booked"
}

interface ShowtimeInfo {
  id: string
  movieTitle: string
  time: string
  date: string
  theater: string
}

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
        // Mock data for demonstration
        const mockShowtime: ShowtimeInfo = {
          id: showtimeId,
          movieTitle: "The Dark Knight",
          time: "2:00 PM",
          date: "Today",
          theater: "Theater 1",
        }

        // Generate seat map (8 rows, 12 seats per row)
        const mockSeats: Seat[] = []
        const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]
        const bookedSeats = ["A5", "A6", "B3", "C7", "C8", "D1", "F9", "F10", "G4", "H2", "H11"]

        rows.forEach((row) => {
          for (let i = 1; i <= 12; i++) {
            const seatId = `${row}${i}`
            mockSeats.push({
              id: seatId,
              row,
              number: i,
              status: bookedSeats.includes(seatId) ? "booked" : "available",
            })
          }
        })

        setShowtime(mockShowtime)
        setSeats(mockSeats)
      } catch (error) {
        console.error("Failed to fetch seat map:", error)
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
      // Mock API call
      const bookingData = {
        showtimeId,
        seats: selectedSeats,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Generate mock booking ID
      const bookingId = `BK${Date.now().toString().slice(-6)}`

      // Navigate to confirmation page
      router.push(`/bookings/${bookingId}`)
    } catch (error) {
      console.error("Booking failed:", error)
      setBooking(false)
    }
  }

  const getSeatPrice = () => 12.5 // Fixed price per seat
  const getTotalPrice = () => selectedSeats.length * getSeatPrice()

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="bg-muted rounded-xl h-10 w-32"></div>
            <div className="bg-muted rounded-xl h-20 w-full"></div>
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="bg-muted rounded-t-lg aspect-square"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!showtime) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center bg-card rounded-xl p-8 card-shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Showtime not found</h1>
          <Button asChild className="bg-primary hover:bg-primary/90 rounded-xl">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"]

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" asChild className="mb-8 hover:bg-card/50 rounded-xl">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Movies
          </Link>
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{showtime.movieTitle}</h1>
          <p className="text-muted-foreground font-medium">
            {showtime.date} • {showtime.time} • {showtime.theater}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">Select Your Seats</h2>

              <div className="mb-8">
                <div className="bg-gradient-to-b from-card to-card/50 rounded-t-full h-6 w-full max-w-md mx-auto mb-3 border border-border"></div>
                <p className="text-center text-sm text-muted-foreground font-medium">SCREEN</p>
              </div>

              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row} className="flex items-center justify-center gap-2">
                    <div className="w-8 text-center text-sm font-semibold text-muted-foreground">{row}</div>
                    <div className="flex gap-1.5">
                      {seats
                        .filter((seat) => seat.row === row)
                        .map((seat) => (
                          <button
                            key={seat.id}
                            onClick={() => handleSeatClick(seat.id)}
                            disabled={seat.status === "booked"}
                            className={cn(
                              "w-9 h-9 rounded-t-lg text-xs font-semibold transition-all duration-200",
                              "border border-border hover:scale-105",
                              seat.status === "available" &&
                                "bg-card hover:bg-card/80 text-foreground hover:border-primary/50",
                              seat.status === "selected" &&
                                "bg-primary hover:bg-primary/90 text-primary-foreground border-primary glow-effect scale-105",
                              seat.status === "booked" &&
                                "bg-muted/50 text-muted-foreground/50 cursor-not-allowed border-muted",
                            )}
                          >
                            {seat.number}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-8 mt-8 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-card border border-border rounded-t-lg"></div>
                  <span className="font-medium">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-primary rounded-t-lg"></div>
                  <span className="font-medium">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-muted/50 border border-muted rounded-t-lg"></div>
                  <span className="font-medium">Booked</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-8 card-shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

              {selectedSeats.length > 0 && (
                <div className="mb-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Selected Seats:</p>
                  <p className="font-semibold">{selectedSeats.join(", ")}</p>
                </div>
              )}

              <div className="mb-6 p-3 bg-muted/30 rounded-lg">
                <div className="flex justify-between text-sm mb-2">
                  <span>Seats ({selectedSeats.length})</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="name" className="font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="rounded-xl border-border focus:border-primary"
                  />
                </div>
              </div>

              <Button
                onClick={handleBooking}
                disabled={selectedSeats.length === 0 || !customerInfo.name || !customerInfo.email || booking}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-xl transition-all duration-200 hover:glow-effect disabled:opacity-50"
              >
                {booking ? "Processing..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
