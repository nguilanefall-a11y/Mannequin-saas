'use client';

import Link from 'next/link';
import { createClient } from '../../lib/actions/clients';

export default function NewClientPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <Link href="/clients" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Retour aux clients</Link>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ajouter un Client</h1>
            </header>

            <form action={createClient} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

                {/* Société */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Information Société</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom Société / Marque</label>
                            <input name="nomSociete" required type="text" placeholder="Ex: Vogue, L'Oréal..." className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">SIRET</label>
                            <input name="siret" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Adresse de facturation</label>
                        <input name="adresse" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                    </div>
                </section>

                {/* Contact */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Principal</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom Contact</label>
                            <input name="contact" required type="text" placeholder="Ex: Jean Dupont" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                            <input name="email" required type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Téléphone</label>
                        <input name="telephone" type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                    </div>
                </section>

                <div className="pt-6 flex justify-end gap-4">
                    <Link href="/clients" className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                        Annuler
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-black text-white font-bold rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-all cursor-pointer">
                        Enregistrer
                    </button>
                </div>

            </form>
        </div>
    );
}
