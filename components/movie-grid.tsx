"use client"

import { useEffect, useState } from "react"
import { MovieCard } from "./movie-card"

interface Movie {
  id: string
  title: string
  description: string
  posterUrl: string
  duration: number
}

export function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchMovies = async () => {
      try {
        // Mock data for demonstration
        const mockMovies: Movie[] = [
          {
            id: "1",
            title: "The Dark Knight",
            description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
            posterUrl: "/dark-knight-poster.png",
            duration: 152,
          },
          {
            id: "2",
            title: "Inception",
            description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
            posterUrl: "/inception-movie-poster.png",
            duration: 148,
          },
          {
            id: "3",
            title: "Interstellar",
            description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival...",
            posterUrl: "/interstellar-movie-poster.jpg",
            duration: 169,
          },
          {
            id: "4",
            title: "Dune",
            description: "Feature adaptation of Frank Herbert's science fiction novel, about the son of a noble family...",
            posterUrl: "/dune-inspired-poster.png",
            duration: 155,
          },
          {
            id: "5",
            title: "Top Gun: Maverick",
            description: "After more than thirty years of service as one of the Navy's top aviators...",
            posterUrl: "/top-gun-maverick-movie-poster.jpg",
            duration: 130,
          },
          {
            id: "6",
            title: "Avatar: The Way of Water",
            description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora...",
            posterUrl: "/avatar-way-of-water-movie-poster.jpg",
            duration: 192,
          },
        ]

        setMovies(mockMovies)
      } catch (error) {
        console.error("Failed to fetch movies:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 animate-pulse card-shadow border border-gray-100">
            <div className="bg-gray-200 rounded-xl aspect-[2/3] mb-3"></div>
            <div className="bg-gray-200 rounded-lg h-4 mb-2"></div>
            <div className="bg-gray-200 rounded-lg h-3 w-16 mb-3"></div>
            <div className="bg-gray-200 rounded-xl h-8"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}