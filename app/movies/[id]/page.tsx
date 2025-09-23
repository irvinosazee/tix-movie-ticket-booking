import { MovieDetails } from "@/components/movie-details"

interface MoviePageProps {
  params: {
    id: string
  }
}

export default function MoviePage({ params }: MoviePageProps) {
  return <MovieDetails movieId={params.id} />
}
