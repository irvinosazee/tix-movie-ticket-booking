"use client"

import { useEffect, useState } from "react"
import { MovieCard } from "./movie-card"
import { type Movie } from "@/lib/data"

export function MovieGrid() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch movies from API
    const fetchMovies = async () => {
      try {
        const response = await fetch('/api/movies')
        if (!response.ok) {
          throw new Error('Failed to fetch movies')
        }
        const data = await response.json()
        setMovies(data)
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