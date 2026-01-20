'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // Only if we wanted URL state, but strictly local state is fine for this view
// Re-using the types and UI logic from the original file, but adapted for props

// We need to define the type coming from Prisma
type BookingWithRelations = {
    id: number;
    projet: string;
    model: {
        nom: string;
        prenom: string;
        // photoUrl?
    };
    client: {
        nomSociete: string;
        contact: string;
        email: string;
        telephone: string;
        adresse: string;
        siret: string;
    };
    date: Date;
    cachetBrut: number;
    commission: number;
    netModel: number;
    statut: string;
};

const formatCurrency = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
const formatDate = (date: Date) => new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

const getStatusColor = (status: string) => {
    switch (status) {
        case 'CONFIRME': return 'bg-green-100 text-green-800 border-green-200';
        case 'OPTION': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'TERMINE': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'ANNULE': return 'bg-red-100 text-red-800 border-red-200';
        case 'PAYE': return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-gray-100 text-gray-800';
    }
};

export default function BookingList({ initialBookings }: { initialBookings: any[] }) {
    // Casting initialBookings to any[] for simplicity with Prisma types in this specific file context, 
    // ideally should use Prisma generated types.
    const [selectedBooking, setSelectedBooking] = useState<BookingWithRelations | null>(null);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* LEFT: Bookings Table */}
            <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">ID / Projet</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Modèle & Client</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs">Date</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs text-right">Finances</th>
                                <th className="px-6 py-4 font-semibold text-gray-500 uppercase tracking-wider text-xs text-center">Statut</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {initialBookings.map((booking) => {
                                const isSelected = selectedBooking?.id === booking.id;

                                return (
                                    <tr
                                        key={booking.id}
                                        onClick={() => setSelectedBooking(booking)}
                                        className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${isSelected ? 'bg-blue-50 ring-1 ring-inset ring-blue-200' : ''}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{booking.projet}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-0.5">#{booking.id}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">{booking.model.prenom} {booking.model.nom}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{booking.client.nomSociete}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-gray-700">{formatDate(booking.date)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-bold text-gray-900">{formatCurrency(booking.cachetBrut)} <span className="text-xs font-normal text-gray-400">Brut</span></div>
                                            <div className="text-xs text-green-600 font-medium">Net: {formatCurrency(booking.netModel)}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.statut)}`}>
                                                {booking.statut}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                            {initialBookings.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Aucun booking trouvé. Créez-en un nouveau !
                                    </td>
                                </tr>
                            )}
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
                                <h3 className="text-xl font-bold text-gray-900">{selectedBooking.projet}</h3>
                                <p className="text-sm text-blue-600 font-mono">#{selectedBooking.id}</p>
                            </div>
                            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Cachet Brut</span>
                                    <span className="font-medium">{formatCurrency(selectedBooking.cachetBrut)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Com. Agence ({selectedBooking.commission}%)</span>
                                    <span className="font-medium text-red-500">-{formatCurrency(selectedBooking.cachetBrut * (selectedBooking.commission / 100))}</span>
                                </div>
                                <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                                    <span className="text-gray-900 font-bold">Net Modèle</span>
                                    <span className="font-bold text-green-600">{formatCurrency(selectedBooking.netModel)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Client Card */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Fiche Client</h2>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl font-bold text-gray-400">
                                    {selectedBooking.client.nomSociete.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{selectedBooking.client.nomSociete}</h3>
                                    <p className="text-xs text-gray-500">SIRET: {selectedBooking.client.siret}</p>
                                </div>
                            </div>

                            <ul className="space-y-4 text-sm">
                                <li className="flex gap-3">
                                    <div className="w-5 flex justify-center"><span className="text-gray-400">👤</span></div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Contact</p>
                                        <p className="font-medium">{selectedBooking.client.contact}</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-5 flex justify-center"><span className="text-gray-400">✉️</span></div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Email</p>
                                        <a href={`mailto:${selectedBooking.client.email}`} className="font-medium text-blue-600 hover:underline">{selectedBooking.client.email}</a>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-5 flex justify-center"><span className="text-gray-400">📞</span></div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Téléphone</p>
                                        <p className="font-medium">{selectedBooking.client.telephone}</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-5 flex justify-center"><span className="text-gray-400">📍</span></div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase">Adresse</p>
                                        <p className="font-medium text-gray-600">{selectedBooking.client.adresse}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50 text-gray-400 text-center">
                        <p>Sélectionnez un booking <br /> pour voir les détails client & financiers.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
