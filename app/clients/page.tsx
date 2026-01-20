import Link from 'next/link';
import { getClients } from '../lib/actions/clients';

export default async function ClientsPage() {
  const clients = await getClients();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-end">
          <div>
            <h1 className="font-display text-4xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-500 mt-2">Gérez votre portefeuille de marques et agences.</p>
          </div>
          <Link href="/clients/new" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-black/10">
            + Nouveau Client
          </Link>
        </div>

        {/* LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map(client => (
            <div key={client.id} className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl font-bold">
                  {client.nomSociete.charAt(0).toUpperCase()}
                </div>
                <span className="px-3 py-1 bg-gray-50 rounded-full text-[10px] font-bold text-gray-500 border border-gray-100">
                  {client._count.bookings} Bookings
                </span>
              </div>

              <h3 className="font-bold text-lg text-gray-900 mb-1">{client.nomSociete}</h3>
              <p className="text-sm text-gray-500 mb-6 line-clamp-1">{client.adresse}</p>

              <div className="space-y-3 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>👤</span>
                  <span className="font-medium">{client.contact}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>✉️</span>
                  <span className="truncate">{client.email}</span>
                </div>
              </div>
            </div>
          ))}

          {clients.length === 0 && (
            <div className="col-span-full py-20 text-center rounded-3xl bg-gray-50 border-2 border-dashed border-gray-200">
              <p className="text-gray-400 font-medium mb-4">Aucun client pour le moment.</p>
              <Link href="/clients/new" className="text-black underline font-bold hover:text-gray-700">Ajouter votre premier client</Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
