import { BookingConfirmation } from "@/components/booking-confirmation"

interface BookingPageProps {
  params: {
    id: string
  }
}

export default function BookingPage({ params }: BookingPageProps) {
  return <BookingConfirmation bookingId={params.id} />
}
