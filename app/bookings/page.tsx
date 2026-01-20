import { getBookings } from '../lib/actions/bookings';
import Link from 'next/link';
import BookingList from '../components/bookings/BookingList';

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Gestion des Bookings</h1>
          <p className="text-gray-500 mt-1">Suivi des projets, cachets et facturation.</p>
        </div>
        <Link href="/bookings/new" className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
          + Nouveau Booking
        </Link>
      </div>

      <BookingList initialBookings={bookings} />

    </div>
  );
}
