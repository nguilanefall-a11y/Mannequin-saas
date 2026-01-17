'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// --- Types ---
type Status = 'OPTION' | 'CONFIRME' | 'TERMINE' | 'ANNULE' | 'FACTURE' | 'PAYE';

interface Client {
  id: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  siret: string;
}

interface Booking {
  id: string;
  modelName: string;
  modelAvatar?: string;
  client: Client;
  projectName: string;
  dateStart: string;
  dateEnd: string;
  grossFee: number; // Cachet brut
  agencyFeePercent: number;
  status: Status;
}

// --- Mock Data ---
const MOCK_CLIENTS: Record<string, Client> = {
  'c1': { id: 'c1', company: 'L\'Oréal Paris', contactName: 'Julie Ferrier', email: 'julie.ferrier@loreal.com', phone: '01 44 55 66 77', address: '14 Rue Royale, 75008 Paris', siret: '632 012 100 00012' },
  'c2': { id: 'c2', company: 'Zara France', contactName: 'Marc Jacobs', email: 'marc@zara.com', phone: '01 22 33 44 55', address: '88 Rue de Rivoli, 75004 Paris', siret: '552 111 222 00045' },
  'c3': { id: 'c3', company: 'Vogue Magazine', contactName: 'Anna W.', email: 'anna@condenast.com', phone: '01 99 88 77 66', address: '10 Avenue Hoche, 75008 Paris', siret: '777 888 999 00011' },
};

const MOCK_BOOKINGS: Booking[] = [
  { id: 'B-2026-001', modelName: 'Alice Dupont', client: MOCK_CLIENTS['c1'], projectName: 'Campagne Hiver 2026', dateStart: '2026-01-20', dateEnd: '2026-01-22', grossFee: 1500, agencyFeePercent: 20, status: 'CONFIRME' },
  { id: 'B-2026-002', modelName: 'Bob Marley', client: MOCK_CLIENTS['c2'], projectName: 'E-commerce Summer', dateStart: '2026-02-01', dateEnd: '2026-02-01', grossFee: 800, agencyFeePercent: 20, status: 'OPTION' },
  { id: 'B-2026-003', modelName: 'Eva Green', client: MOCK_CLIENTS['c3'], projectName: 'Couverture Mars', dateStart: '2026-01-15', dateEnd: '2026-01-15', grossFee: 2500, agencyFeePercent: 25, status: 'TERMINE' },
  { id: 'B-2026-004', modelName: 'Alice Dupont', client: MOCK_CLIENTS['c2'], projectName: 'Lookbook', dateStart: '2026-03-10', dateEnd: '2026-03-12', grossFee: 1200, agencyFeePercent: 20, status: 'OPTION' },
  { id: 'B-2026-005', modelName: 'David Beck', client: MOCK_CLIENTS['c1'], projectName: 'Spot TV Hair', dateStart: '2025-12-10', dateEnd: '2025-12-12', grossFee: 5000, agencyFeePercent: 20, status: 'PAYE' },
];

// --- Helpers ---
const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });

const getStatusColor = (status: Status) => {
  switch (status) {
    case 'CONFIRME': return 'bg-green-100 text-green-800 border-green-200';
    case 'OPTION': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'TERMINE': return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'ANNULE': return 'bg-red-100 text-red-800 border-red-200';
    case 'PAYE': return 'bg-gray-100 text-gray-800 border-gray-200';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function BookingsPage() {
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Gestion des Bookings</h1>
          <p className="text-gray-500 mt-1">Suivi des projets, cachets et facturation.</p>
        </div>
        <button className="bg-black text-white px-5 py-2.5 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
          + Nouveau Booking
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* LEFT: Bookings Table */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">ID / Projet</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Modèle & Client</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Dates</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs text-right">Finances</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs text-center">Statut</th>
                  <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {MOCK_BOOKINGS.map((booking) => {
                  const commission = booking.grossFee * (booking.agencyFeePercent / 100);
                  const netModel = booking.grossFee - commission;
                  const isSelected = selectedBooking?.id === booking.id;

                  return (
                    <tr 
                      key={booking.id} 
                      onClick={() => setSelectedBooking(booking)}
                      className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{booking.projectName}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{booking.id}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{booking.modelName}</div>
                        <div className="text-xs text-gray-500 mt-0.5">{booking.client.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-700">{formatDate(booking.dateStart)}</div>
                        {booking.dateStart !== booking.dateEnd && (
                           <div className="text-gray-400 text-xs">au {formatDate(booking.dateEnd)}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-bold text-gray-900">{formatCurrency(booking.grossFee)} <span className="text-xs font-normal text-gray-400">Brut</span></div>
                        <div className="text-xs text-green-600 font-medium">Net: {formatCurrency(netModel)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        →
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: Client & Project Details Panel */}
        <div className={`lg:w-96 w-full flex-shrink-0 transition-all duration-300 ${selectedBooking ? 'opacity-100 translate-x-0' : 'opacity-50 translate-x-4 lg:translate-x-0 pointer-events-none'}`}>
           {selectedBooking ? (
             <div className="space-y-6"> 
                
                {/* Project Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Détail du Projet</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{selectedBooking.projectName}</h3>
                        <p className="text-sm text-blue-600 font-mono">{selectedBooking.id}</p>
                    </div>
                    <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                         <div className="flex justify-between">
                            <span className="text-gray-500">Cachet Brut</span>
                            <span className="font-medium">{formatCurrency(selectedBooking.grossFee)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Com. Agence ({selectedBooking.agencyFeePercent}%)</span>
                            <span className="font-medium text-red-500">-{formatCurrency(selectedBooking.grossFee * (selectedBooking.agencyFeePercent / 100))}</span>
                        </div>
                         <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                            <span className="text-gray-900 font-bold">Net Modèle</span>
                            <span className="font-bold text-green-600">{formatCurrency(selectedBooking.grossFee * (1 - selectedBooking.agencyFeePercent / 100))}</span>
                        </div>
                    </div>
                </div>

                {/* Client Card */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Fiche Client</h2>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-400">
                            {selectedBooking.client.company.charAt(0)}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900">{selectedBooking.client.company}</h3>
                            <p className="text-xs text-gray-500">SIRET: {selectedBooking.client.siret}</p>
                        </div>
                    </div>

                    <ul className="space-y-4 text-sm">
                        <li className="flex gap-3">
                             <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                             <div>
                                <p className="text-gray-500 text-xs uppercase">Contact</p>
                                <p className="font-medium">{selectedBooking.client.contactName}</p>
                             </div>
                        </li>
                        <li className="flex gap-3">
                             <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                             <div>
                                <p className="text-gray-500 text-xs uppercase">Email</p>
                                <a href={`mailto:${selectedBooking.client.email}`} className="font-medium text-blue-600 hover:underline">{selectedBooking.client.email}</a>
                             </div>
                        </li>
                        <li className="flex gap-3">
                             <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                             <div>
                                <p className="text-gray-500 text-xs uppercase">Téléphone</p>
                                <p className="font-medium">{selectedBooking.client.phone}</p>
                             </div>
                        </li>
                         <li className="flex gap-3">
                             <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                             <div>
                                <p className="text-gray-500 text-xs uppercase">Adresse</p>
                                <p className="font-medium text-gray-600">{selectedBooking.client.address}</p>
                             </div>
                        </li>
                    </ul>
                </div>

             </div>
           ) : (
             <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400 text-center">
               <p>Sélectionnez un booking <br/> pour voir les détails client & financiers.</p>
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
