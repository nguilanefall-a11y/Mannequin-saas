'use client';

import Link from 'next/link';
import { createModel } from '../../lib/actions/models';

export default function NewModelPage() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <Link href="/models" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Retour aux modèles</Link>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ajouter un Modèle</h1>
            </header>

            <form action={createModel} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8">

                {/* Identité */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Identité</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Prénom</label>
                            <input name="prenom" required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom</label>
                            <input name="nom" required type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                            <input name="email" type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Date de Naissance</label>
                            <input name="dateNaissance" type="date" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                </section>

                {/* Mensurations */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Mensurations</h3>
                    <div className="grid grid-cols-3 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Taille (cm)</label>
                            <input name="taille" type="number" step="0.1" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Poids (kg)</label>
                            <input name="poids" type="number" step="0.1" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Pointure</label>
                            <input name="pointure" type="number" step="0.5" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                </section>

                <div className="pt-6 flex justify-end gap-4">
                    <Link href="/models" className="px-6 py-3 font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
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
