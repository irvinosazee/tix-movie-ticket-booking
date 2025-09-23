import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock, Star } from "lucide-react"
import { formatDuration, getPosterUrl, type Movie } from "@/lib/data"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-xl border border-gray-100 hover:border-primary/20 transition-all duration-300 group hover:scale-[1.03] hover:-translate-y-2">
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={getPosterUrl(movie.id)}
          alt={movie.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
          <Star className="w-3.5 h-3.5 text-primary fill-primary" />
          <span className="text-sm font-bold text-gray-800">{movie.imdbRating || 8.5}</span>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <h3 className="font-bold text-base mb-2 text-balance leading-tight text-gray-900">{movie.title}</h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <Clock className="w-4 h-4" />
          <span className="font-medium">{formatDuration(movie.duration)}</span>
        </div>

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-200 hover:glow-effect hover:scale-[1.02] text-sm"
        >
          <Link href={`/movies/${movie.id}`}>Book Tickets</Link>
        </Button>
      </div>
    </div>
  )
}
