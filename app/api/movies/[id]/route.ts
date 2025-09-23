import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/movies/[id] - Get movie details with showtimes
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const movieId = params.id

        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
            include: {
                showtimes: {
                    include: {
                        theater: true,
                    },
                    orderBy: { time: 'asc' },
                },
            },
        })

        if (!movie) {
            return NextResponse.json(
                { error: 'Movie not found' },
                { status: 404 }
            )
        }

        return NextResponse.json(movie)
    } catch (error) {
        console.error('Error fetching movie:', error)
        return NextResponse.json(
            { error: 'Failed to fetch movie' },
            { status: 500 }
        )
    }
}