import { SeatSelection } from "@/components/seat-selection"

interface SeatSelectionPageProps {
  params: {
    id: string
  }
}

export default function SeatSelectionPage({ params }: SeatSelectionPageProps) {
  return <SeatSelection showtimeId={params.id} />
}
