import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/movies - Get all movies
export async function GET() {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: { title: 'asc' },
        })

        return NextResponse.json(movies)
    } catch (error) {
        console.error('Error fetching movies:', error)
        return NextResponse.json(
            { error: 'Failed to fetch movies' },
            { status: 500 }
        )
    }
}