'use client';

import React from 'react';

// --- Mock Data ---
const MOCK_CLIENTS = [
  { id: 'c1', company: 'L\'Oréal Paris', contactName: 'Julie Ferrier', email: 'julie.ferrier@loreal.com', phone: '01 44 55 66 77', bookingsCount: 12, totalSpent: 45000, city: 'Paris', lastActive: '2 jours' },
  { id: 'c2', company: 'Zara France', contactName: 'Marc Jacobs', email: 'marc@zara.com', phone: '01 22 33 44 55', bookingsCount: 8, totalSpent: 28000, city: 'Paris', lastActive: '1 semaine' },
  { id: 'c3', company: 'Vogue Magazine', contactName: 'Anna W.', email: 'anna@condenast.com', phone: '01 99 88 77 66', bookingsCount: 5, totalSpent: 15000, city: 'Paris', lastActive: 'Hier' },
  { id: 'c4', company: 'Galeries Lafayette', contactName: 'Sophie Marceau', email: 'sophie@galeries.com', phone: '01 42 82 34 56', bookingsCount: 3, totalSpent: 8500, city: 'Paris', lastActive: '1 mois' },
  { id: 'c5', company: 'Nike Europe', contactName: 'Michael J.', email: 'mike@nike.com', phone: '+31 20 123 4567', bookingsCount: 20, totalSpent: 120000, city: 'Amsterdam', lastActive: '3 heures' },
];

const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);

export default function ClientsPage() {
  return (
    <div className="space-y-10">
      
      {/* Header */}
      <header className="flex justify-between items-end">
        <div>
           <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-1">Partenaires</p>
           <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Clients</h1>
        </div>
        <button className="px-5 py-2.5 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors shadow-lg shadow-gray-900/10 flex items-center gap-2">
            <span>+</span> Ajouter un Client
        </button>
      </header>

      {/* Stats Cards Row (Optional but nice) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Clients</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{MOCK_CLIENTS.length}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volume d'Affaires</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{formatCurrency(MOCK_CLIENTS.reduce((acc, c) => acc + c.totalSpent, 0))}</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Bookings Totaux</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-2">{MOCK_CLIENTS.reduce((acc, c) => acc + c.bookingsCount, 0)}</h3>
          </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-8 py-5 font-semibold text-gray-400 uppercase tracking-wider text-xs">Société</th>
                  <th className="px-8 py-5 font-semibold text-gray-400 uppercase tracking-wider text-xs">Contact Principal</th>
                  <th className="px-8 py-5 font-semibold text-gray-400 uppercase tracking-wider text-xs">Localisation</th>
                  <th className="px-8 py-5 font-semibold text-gray-400 uppercase tracking-wider text-xs text-right">Volume d'Affaires</th>
                  <th className="px-8 py-5 font-semibold text-gray-400 uppercase tracking-wider text-xs text-center">Dernière Activité</th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {MOCK_CLIENTS.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/80 transition-colors group">
                    <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center font-bold text-lg border border-gray-200 group-hover:bg-white group-hover:border-gray-300 transition-colors">
                                {client.company.charAt(0)}
                            </div>
                            <div>
                                <div className="font-bold text-gray-900 text-base">{client.company}</div>
                                <div className="text-xs text-gray-400">{client.email}</div>
                            </div>
                        </div>
                    </td>
                    <td className="px-8 py-5">
                        <div className="font-medium text-gray-700">{client.contactName}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{client.phone}</div>
                    </td>
                    <td className="px-8 py-5 text-gray-600 font-medium">
                        {client.city}
                    </td>
                    <td className="px-8 py-5 text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(client.totalSpent)}</div>
                        <div className="text-xs text-gray-400">{client.bookingsCount} missions</div>
                    </td>
                    <td className="px-8 py-5 text-center">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                            {client.lastActive}
                        </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
}
