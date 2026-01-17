'use client';

import Link from 'next/link';
import React from 'react';

// --- Mock Data for Detail Page ---
const MOCK_CLIENT_DETAIL = {
  id: 'c1',
  company: 'L\'Oréal Paris',
  siret: '632 012 100 00012',
  vat: 'FR 32 632012100',
  address: '14 Rue Royale, 75008 Paris',
  contact: {
    name: 'Julie Ferrier',
    role: 'Directrice Marketing',
    email: 'julie.ferrier@loreal.com',
    phone: '01 44 55 66 77'
  },
  stats: {
    totalBookings: 12,
    totalSpent: 45000,
    outstanding: 1200
  },
  recentBookings: [
    { id: 'BK-001', project: 'Campagne Hiver', date: 'Jan 2026', amount: 1500, status: 'CONFIRME' },
    { id: 'BK-005', project: 'Spot TV Hair', date: 'Dec 2025', amount: 5000, status: 'PAYE' },
  ]
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  // In a real app, use params.id to fetch data.
  const client = MOCK_CLIENT_DETAIL; 

  return (
    <div className="space-y-8">
       <header className="flex items-center justify-between">
         <div>
            <Link href="/clients" className="text-sm font-medium text-gray-500 hover:text-black mb-2 inline-block">← Retour aux clients</Link>
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-800 shadow-sm">
                    {client.company.charAt(0)}
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{client.company}</h1>
                    <p className="text-gray-500 text-sm">SIRET: {client.siret} • TVA: {client.vat}</p>
                </div>
            </div>
         </div>
         <button className="px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors">
            Modifier
         </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Info & Contact */}
          <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Contact Principal</h3>
                  <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                          {client.contact.name.charAt(0)}
                      </div>
                      <div>
                          <p className="font-bold text-gray-900">{client.contact.name}</p>
                          <p className="text-xs text-gray-500">{client.contact.role}</p>
                      </div>
                  </div>
                  <ul className="space-y-3 text-sm">
                      <li className="flex gap-3 text-gray-600">
                          <span className="text-gray-400">✉️</span> {client.contact.email}
                      </li>
                      <li className="flex gap-3 text-gray-600">
                          <span className="text-gray-400">📞</span> {client.contact.phone}
                      </li>
                  </ul>
              </div>

               <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Adresse</h3>
                  <p className="text-gray-900 font-medium">{client.address}</p>
              </div>
          </div>

          {/* Right Column: Stats & Activity */}
          <div className="lg:col-span-2 space-y-6">
              
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase">Volume Total</p>
                      <p className="text-2xl font-extrabold text-gray-900">{formatCurrency(client.stats.totalSpent)}</p>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase">Bookings</p>
                      <p className="text-2xl font-extrabold text-gray-900">{client.stats.totalBookings}</p>
                  </div>
                   <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase">En attente</p>
                      <p className="text-2xl font-extrabold text-orange-500">{formatCurrency(client.stats.outstanding)}</p>
                  </div>
              </div>

              {/* Related Models (Talents) */}
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-4">Talents Récents</h3>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                      {[
                          { id: 'm1', name: 'Alice Dupont', initial: 'A', color: 'bg-pink-100 text-pink-600' },
                          { id: 'm2', name: 'Bob Marley', initial: 'B', color: 'bg-green-100 text-green-600' },
                          { id: 'm3', name: 'Eva Green', initial: 'E', color: 'bg-purple-100 text-purple-600' }
                      ].map(model => (
                          <Link href={`/models/${model.id}`} key={model.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-300 hover:shadow-sm transition-all min-w-[200px] bg-gray-50/50">
                              <div className={`w-10 h-10 rounded-full ${model.color} flex items-center justify-center font-bold text-sm`}>
                                  {model.initial}
                              </div>
                              <div>
                                  <p className="text-sm font-bold text-gray-900">{model.name}</p>
                                  <p className="text-xs text-gray-500">Voir profil →</p>
                              </div>
                          </Link>
                      ))}
                  </div>
              </div>

              {/* Recent Projects */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30 flex justify-between items-center">
                      <h3 className="font-bold text-gray-900">Historique des Projets</h3>
                  </div>
                  <table className="w-full text-left text-sm">
                      <thead className="text-gray-400 font-medium text-xs uppercase bg-white">
                          <tr>
                              <th className="px-6 py-3">Projet</th>
                              <th className="px-6 py-3">Date</th>
                              <th className="px-6 py-3 text-right">Montant</th>
                              <th className="px-6 py-3 text-center">Statut</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                          {client.recentBookings.map(booking => (
                              <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 font-medium text-gray-900">{booking.project}</td>
                                  <td className="px-6 py-4 text-gray-500">{booking.date}</td>
                                  <td className="px-6 py-4 text-right font-medium">{formatCurrency(booking.amount)}</td>
                                  <td className="px-6 py-4 text-center">
                                      <span className={`px-2 py-1 rounded text-xs font-bold ${ 
                                          booking.status === 'CONFIRME' ? 'bg-green-100 text-green-800' : 
                                          booking.status === 'PAYE' ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'
                                      }`}>{booking.status}</span>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>

          </div>
      </div>
    </div>
  );
}
