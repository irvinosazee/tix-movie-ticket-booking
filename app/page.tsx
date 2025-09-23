import { MovieGrid } from "@/components/movie-grid"
import { Header } from "@/components/ui/header"
import { Search, Star, Clock, MapPin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold mb-4 text-balance text-gray-900">Now Showing</h2>
          <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto text-pretty">
            Discover the latest blockbusters and indie gems. Book your perfect movie experience with premium seating and
            crystal-clear sound.
          </p>

          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="flex items-center gap-2 text-sm bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="font-medium text-gray-700">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-medium text-gray-700">Easy Booking</span>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white rounded-full px-4 py-2 shadow-sm border border-gray-100">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="font-medium text-gray-700">Multiple Locations</span>
            </div>
          </div>

          {/* Search bar for mobile */}
          <div className="relative md:hidden mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search movies..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm shadow-sm"
            />
          </div>
        </div>

        <MovieGrid />
      </main>

      <footer className=" bg-white/80 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-gradient mb-2">Tix</h3>
            <p className="text-gray-600 text-sm">
              © 2025 Tix. All rights reserved. Your premium movie booking experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
