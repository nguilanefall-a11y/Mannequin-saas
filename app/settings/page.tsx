'use client';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Paramètres</h1>
        <p className="text-gray-500 mt-2">Gérez les préférences de votre agence.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4 flex gap-8">
            <button className="text-sm font-semibold text-black border-b-2 border-black pb-4 -mb-4.5">Général</button>
            <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Équipe</button>
            <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Facturation</button>
            <button className="text-sm font-medium text-gray-500 hover:text-black transition-colors">Intégrations</button>
        </div>
        
        <div className="p-8 space-y-8 max-w-2xl">
            {/* Agence Info */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informations de l'Agence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Nom de l'agence</label>
                        <input type="text" defaultValue="Mannequin SaaS" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email de contact</label>
                        <input type="email" defaultValue="contact@mannequin-saas.com" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all" />
                    </div>
                </div>
            </div>

            {/* Devises & TVA */}
            <div>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Finance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Devise par défaut</label>
                        <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 bg-white">
                            <option>EUR (€)</option>
                            <option>USD ($)</option>
                            <option>GBP (£)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Taux TVA (%)</label>
                        <input type="number" defaultValue="20" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900" />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
                <button className="px-6 py-3 bg-black text-white font-medium rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 transition-all">
                    Enregistrer les modifications
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
