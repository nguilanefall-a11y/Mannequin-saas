'use client';

import Link from 'next/link';

export default function NewBookingPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <Link href="/bookings" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Retour aux bookings</Link>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nouveau Booking</h1>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">
        
        {/* Project Info */}
        <section className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Détails du Projet</h3>
            <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom du Projet</label>
                <input type="text" placeholder="Ex: Campagne Été 2026" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Client</label>
                    <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 bg-white">
                        <option>Choisir un client...</option>
                        <option>L'Oréal Paris</option>
                        <option>Zara France</option>
                        <option>Vogue Magazine</option>
                        <option>Nike Europe</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Modèle</label>
                     <select className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 bg-white">
                        <option>Choisir un modèle...</option>
                        <option>Alice Dupont</option>
                        <option>Bob Marley</option>
                        <option>Eva Green</option>
                        <option>David Beck</option>
                        <option>Felix Cat</option>
                    </select>
                </div>
            </div>
        </section>

        {/* Dates & Finance */}
        <section className="space-y-6">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Logistique & Finance</h3>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Date de début</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Date de fin</label>
                    <input type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900" />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Cachet Brut (€)</label>
                    <input type="number" placeholder="0.00" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-mono" />
                </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Commission Agence (%)</label>
                    <input type="number" defaultValue="20" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-mono" />
                </div>
            </div>
        </section>

        <div className="pt-6 flex justify-end gap-4">
             <Link href="/bookings" className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                Annuler
            </Link>
            <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                Créer le Booking
            </button>
        </div>

      </div>
    </div>
  );
}
