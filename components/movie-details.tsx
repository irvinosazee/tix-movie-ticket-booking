"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Clock, Star, Calendar, MapPin } from "lucide-react"

interface Movie {
  id: string
  title: string
  posterUrl: string
  duration: number
  description: string
  genre: string
  rating: string
  imdbRating?: number
  releaseYear?: number
}

interface Showtime {
  id: string
  time: string
  date: string
  availableSeats: number
  theater?: string
  price?: number
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
            imdbRating: 9.0,
            releaseYear: 2008,
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
            imdbRating: 8.8,
            releaseYear: 2010,
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
            imdbRating: 8.6,
            releaseYear: 2014,
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
            imdbRating: 8.0,
            releaseYear: 2021,
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
            imdbRating: 8.3,
            releaseYear: 2022,
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
            imdbRating: 7.6,
            releaseYear: 2022,
          },
        }

        const mockShowtimes: Showtime[] = [
          { id: "1", time: "2:00 PM", date: "Today", availableSeats: 45, theater: "Cinema Hall 1", price: 12.99 },
          { id: "2", time: "5:30 PM", date: "Today", availableSeats: 32, theater: "Cinema Hall 2", price: 12.99 },
          { id: "3", time: "8:45 PM", date: "Today", availableSeats: 18, theater: "IMAX Theater", price: 18.99 },
          { id: "4", time: "1:15 PM", date: "Tomorrow", availableSeats: 50, theater: "Cinema Hall 1", price: 12.99 },
          { id: "5", time: "4:30 PM", date: "Tomorrow", availableSeats: 41, theater: "Cinema Hall 2", price: 12.99 },
          { id: "6", time: "7:45 PM", date: "Tomorrow", availableSeats: 28, theater: "IMAX Theater", price: 18.99 },
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
        {/* Header Skeleton */}
        <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-muted rounded animate-pulse" />
                <div className="w-12 h-8 bg-muted rounded animate-pulse" />
              </div>
              <div className="w-32 h-10 bg-muted rounded-xl animate-pulse" />
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-80 lg:flex-shrink-0">
                <div className="bg-muted rounded-2xl aspect-[2/3]"></div>
              </div>
              <div className="flex-1 lg:pl-6 space-y-6">
                <div className="space-y-3">
                  <div className="bg-muted rounded-xl h-12 w-3/4"></div>
                  <div className="bg-muted rounded-xl h-6 w-1/4"></div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-muted rounded-full h-10 w-24"></div>
                  <div className="bg-muted rounded-full h-10 w-20"></div>
                  <div className="bg-muted rounded-full h-10 w-16"></div>
                </div>
                <div className="space-y-2">
                  <div className="bg-muted rounded h-4 w-16"></div>
                  <div className="bg-muted rounded h-6 w-48"></div>
                </div>
                <div className="space-y-3">
                  <div className="bg-muted rounded h-4 w-20"></div>
                  <div className="bg-muted rounded h-20 w-full"></div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted rounded-xl h-8 w-64"></div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-muted rounded-2xl h-48"></div>
                ))}
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
      {/* Header with Logo and Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              asChild
              className=" bg-primary text-white rounded-xl"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-6 w-6 text-white" />
              </Link>
            </Button>
            
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <span className="text-2xl font-bold text-gradient">Tix</span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:w-80 lg:flex-shrink-0">
            <div className="aspect-[2/3] rounded-2xl overflow-hidden card-shadow-xl group">
              <Image
                src={movie.posterUrl || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          <div className="flex-1 lg:pl-6">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl lg:text-5xl font-bold mb-3 text-balance leading-tight">
                  {movie.title}
                </h1>
                {movie.releaseYear && (
                  <p className="text-lg text-muted-foreground font-medium">({movie.releaseYear})</p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5 bg-card px-3 py-2 rounded-full border border-border">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{formatDuration(movie.duration)}</span>
                </div>

                {movie.imdbRating && (
                  <div className="flex items-center gap-1.5 bg-card px-3 py-2 rounded-full border border-border">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{movie.imdbRating}/10</span>
                  </div>
                )}

                <div className="bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-bold border border-primary/20">
                  {movie.rating}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Genre</p>
                <p className="text-lg font-medium">{movie.genre}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Synopsis</p>
                <p className="text-base lg:text-lg leading-relaxed text-pretty">
                  {movie.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Calendar className="h-6 w-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold">Available Showtimes</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {showtimes.map((showtime) => (
              <div
                key={showtime.id}
                className="group relative bg-card border border-border rounded-2xl p-6 card-shadow hover:card-shadow-lg transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">{showtime.time}</div>
                      <div className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {showtime.date}
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="text-lg font-bold">${showtime.price}</div>
                      <div className="text-xs text-muted-foreground">per ticket</div>
                    </div>
                  </div>

                  {showtime.theater && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{showtime.theater}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${showtime.availableSeats > 30 ? 'bg-green-500' :
                        showtime.availableSeats > 10 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} />
                      <span className="text-sm font-medium">
                        {showtime.availableSeats} seats available
                      </span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 rounded-xl font-semibold glow-effect hover:scale-105 transition-all duration-200"
                  >
                    <Link href={`/showtimes/${showtime.id}/seats`}>
                      Select Seats
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
