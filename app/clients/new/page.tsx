'use client';

import Link from 'next/link';
import { createClient, searchCompanies } from '../../lib/actions/clients';
import { useState } from 'react';

export default function NewClientPage() {
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [formValues, setFormValues] = useState({
        nomSociete: '',
        contact: '',
        email: '',
        telephone: '',
        adresse: '',
        siret: ''
    });

    const handleSearch = async (query: string) => {
        // Update local state for the input
        setFormValues(prev => ({ ...prev, nomSociete: query }));

        if (query.length < 2) {
            setSearchResults([]);
            return;
        }
        setIsSearching(true);
        const results = await searchCompanies(query);
        setSearchResults(results);
        setIsSearching(false);
    };

    const applyResult = (result: any) => {
        setFormValues(result);
        setSearchResults([]);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <header>
                <Link href="/clients" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Retour aux clients</Link>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ajouter un Client</h1>
            </header>

            <form action={createClient} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8 relative">

                {/* Société */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Information Société</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="relative">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom Société / Marque</label>
                            <div className="relative">
                                <input
                                    name="nomSociete"
                                    value={formValues.nomSociete}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    autoComplete="off"
                                    required
                                    type="text"
                                    placeholder="Commencez à taper (ex: Vogue...)"
                                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black"
                                />
                                {isSearching && <div className="absolute right-3 top-3.5 text-xs text-gray-400 animate-pulse">Recherche...</div>}
                            </div>

                            {/* DROPDOWN RESULTS */}
                            {searchResults.length > 0 && (
                                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                                    <div className="bg-gray-50 px-4 py-2 text-[10px] uppercase font-bold text-gray-400 tracking-wider">Suggestions IA</div>
                                    {searchResults.map((result: any, i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => applyResult(result)}
                                            className="w-full text-left px-4 py-3 hover:bg-blue-50 border-b border-gray-50 last:border-0 transition-colors flex flex-col"
                                        >
                                            <span className="font-bold text-gray-900">{result.nomSociete}</span>
                                            <span className="text-xs text-gray-500">{result.adresse}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">SIRET</label>
                            <input name="siret" value={formValues.siret} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Adresse de facturation</label>
                        <input name="adresse" value={formValues.adresse} onChange={handleChange} type="text" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                    </div>
                </section>

                {/* Contact */}
                <section className="space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Contact Principal</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom Contact</label>
                            <input name="contact" value={formValues.contact} onChange={handleChange} required type="text" placeholder="Ex: Jean Dupont" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email</label>
                            <input name="email" value={formValues.email} onChange={handleChange} required type="email" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Téléphone</label>
                        <input name="telephone" value={formValues.telephone} onChange={handleChange} type="tel" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-black" />
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
