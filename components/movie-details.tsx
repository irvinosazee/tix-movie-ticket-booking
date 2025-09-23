"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock } from "lucide-react"

interface Movie {
  id: string
  title: string
  posterUrl: string
  duration: number
  description: string
  genre: string
  rating: string
}

interface Showtime {
  id: string
  time: string
  date: string
  availableSeats: number
}

interface MovieDetailsProps {
  movieId: string
}

export function MovieDetails({ movieId }: MovieDetailsProps) {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Mock data for demonstration
        const mockMovies: Record<string, Movie> = {
          "1": {
            id: "1",
            title: "The Dark Knight",
            posterUrl: "/dark-knight-poster.png",
            duration: 152,
            description:
              "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            genre: "Action, Crime, Drama",
            rating: "PG-13",
          },
          "2": {
            id: "2",
            title: "Inception",
            posterUrl: "/inception-movie-poster.png",
            duration: 148,
            description:
              "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
            genre: "Action, Sci-Fi, Thriller",
            rating: "PG-13",
          },
          "3": {
            id: "3",
            title: "Interstellar",
            posterUrl: "/interstellar-movie-poster.jpg",
            duration: 169,
            description:
              "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            genre: "Adventure, Drama, Sci-Fi",
            rating: "PG-13",
          },
          "4": {
            id: "4",
            title: "Dune",
            posterUrl: "/dune-inspired-poster.png",
            duration: 155,
            description:
              "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
            genre: "Action, Adventure, Drama",
            rating: "PG-13",
          },
          "5": {
            id: "5",
            title: "Top Gun: Maverick",
            posterUrl: "/top-gun-maverick-movie-poster.jpg",
            duration: 130,
            description:
              "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on a mission that demands the ultimate sacrifice.",
            genre: "Action, Drama",
            rating: "PG-13",
          },
          "6": {
            id: "6",
            title: "Avatar: The Way of Water",
            posterUrl: "/avatar-way-of-water-movie-poster.jpg",
            duration: 192,
            description:
              "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na'vi race to protect their home.",
            genre: "Action, Adventure, Family",
            rating: "PG-13",
          },
        }

        const mockShowtimes: Showtime[] = [
          { id: "1", time: "2:00 PM", date: "Today", availableSeats: 45 },
          { id: "2", time: "5:30 PM", date: "Today", availableSeats: 32 },
          { id: "3", time: "8:45 PM", date: "Today", availableSeats: 18 },
          { id: "4", time: "1:15 PM", date: "Tomorrow", availableSeats: 50 },
          { id: "5", time: "4:30 PM", date: "Tomorrow", availableSeats: 41 },
          { id: "6", time: "7:45 PM", date: "Tomorrow", availableSeats: 28 },
        ]

        setMovie(mockMovies[movieId] || null)
        setShowtimes(mockShowtimes)
      } catch (error) {
        console.error("Failed to fetch movie details:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovieDetails()
  }, [movieId])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-muted rounded-xl h-10 w-32 mb-8"></div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-muted rounded-xl aspect-[3/4]"></div>
              <div className="md:col-span-2 space-y-4">
                <div className="bg-muted rounded-xl h-8 w-3/4"></div>
                <div className="bg-muted rounded-xl h-4 w-1/2"></div>
                <div className="bg-muted rounded-xl h-20 w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center bg-card rounded-xl p-8 card-shadow-lg">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
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
        <Button variant="ghost" asChild className="mb-8 hover:bg-card/50 rounded-xl">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Movies
          </Link>
        </Button>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden card-shadow-lg">
            <Image src={movie.posterUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" />
          </div>

          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4 text-balance">{movie.title}</h1>

            <div className="flex items-center gap-4 text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {formatDuration(movie.duration)}
              </span>
              <span>{movie.genre}</span>
              <span className="bg-card px-3 py-1 rounded-full text-sm font-medium border border-border">
                {movie.rating}
              </span>
            </div>

            <p className="text-lg leading-relaxed mb-8 text-pretty">{movie.description}</p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Showtimes</h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {showtimes.map((showtime) => (
              <div
                key={showtime.id}
                className="bg-card border border-border rounded-xl p-5 card-shadow hover:card-shadow-lg transition-all duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-xl font-bold">{showtime.time}</div>
                    <div className="text-sm text-muted-foreground font-medium">{showtime.date}</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{showtime.availableSeats}</span> seats left
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 rounded-xl font-semibold hover:glow-effect transition-all duration-200"
                >
                  <Link href={`/showtimes/${showtime.id}/seats`}>Select Seats</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
