'use client';

import Link from 'next/link';
import React, { useState } from 'react';

// --- MOCK DATA ---
const CONTRACT_TYPES = [
    { id: 'prestation', title: 'Contrat de Mannequin / Prestation', desc: 'Pour les missions ponctuelles (Shooting, Défilé).', icon: '📸' },
    { id: 'image', title: 'Contrat d\'Cession Image', desc: 'Cession de droits sur une durée déterminée.', icon: '🌟' },
    { id: 'exclusif', title: 'Contrat de Représentation Exclusive', desc: 'Mandat exclusif agence/mannequin.', icon: '🔒' },
];

const MODELS = [
  { id: 'm1', name: 'Alice Dupont', initial: 'A', color: 'bg-pink-100 text-pink-600', address: '12 Rue des Fleurs, 75011 Paris' },
  { id: 'm2', name: 'Bob Marley', initial: 'B', color: 'bg-green-100 text-green-600', address: '5 Avenue du Reggae, 75018 Paris' },
  { id: 'm3', name: 'Eva Green', initial: 'E', color: 'bg-purple-100 text-purple-600', address: '8 Boulevard du Cinéma, 75006 Paris' }
];

const CLIENTS = [
    { id: 'c1', name: 'L\'Oréal Paris', address: '14 Rue Royale, 75008 Paris' },
    { id: 'c2', name: 'Zara France', address: '88 Rue de Rivoli, 75004 Paris' },
    { id: 'c3', name: 'Vogue Magazine', address: '10 Avenue Hoche, 75008 Paris' },
];

export default function ContractGeneratorWizard() {
  const [step, setStep] = useState(1);
  const [contractType, setContractType] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [contractDate, setContractDate] = useState(new Date().toISOString().split('T')[0]);
  const [duration, setDuration] = useState('12 mois');

  // --- HANDLERS ---
  const handleSelectType = (type: any) => {
    setContractType(type);
    setStep(2);
  };

  const handleSelectModel = (model: any) => {
    setSelectedModel(model);
    setStep(3);
  };

  const handleSelectClient = (client: any) => {
    setSelectedClient(client);
    setStep(4);
  };

  const handleGenerate = () => {
    setStep(5);
  };

  const reset = () => {
    setStep(1);
    setContractType(null);
    setSelectedModel(null);
    setSelectedClient(null);
  };

  // --- STEPS RENDERING ---

  // STEP 1: TYPE
  const renderStep1 = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Étape 1 : Type de contrat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CONTRACT_TYPES.map((type) => (
            <button key={type.id} onClick={() => handleSelectType(type)} className="group bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg hover:border-black transition-all text-left">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{type.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">{type.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
            </button>
        ))}
      </div>
    </div>
  );

  // STEP 2: MODEL
  const renderStep2 = () => (
    <div className="animate-in slide-in-from-right duration-300">
       <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-black">← Retour</button>
            <h2 className="text-xl font-bold text-gray-900">Étape 2 : Le Mannequin</h2>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MODELS.map(model => (
          <button 
            key={model.id}
            onClick={() => handleSelectModel(model)}
            className="group flex flex-col items-center p-8 bg-white border border-gray-200 rounded-2xl hover:border-black hover:shadow-lg transition-all"
          >
            <div className={`w-20 h-20 rounded-full ${model.color} flex items-center justify-center text-2xl font-bold mb-4 group-hover:scale-110 transition-transform`}>
              {model.initial}
            </div>
            <span className="font-bold text-lg text-gray-900">{model.name}</span>
            <span className="text-sm text-gray-500 mt-1">Sélectionner →</span>
          </button>
        ))}
      </div>
    </div>
  );

  // STEP 3: CLIENT (Only for some contracts, otherwise skip or select agency)
  const renderStep3 = () => (
    <div className="animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(2)} className="text-gray-400 hover:text-black">← Retour</button>
            <h2 className="text-xl font-bold text-gray-900">Étape 3 : Le Client / Bénéficiaire</h2>
        </div>
        <div className="space-y-4">
            {CLIENTS.map(client => (
              <button 
                key={client.id}
                onClick={() => handleSelectClient(client)}
                className="w-full text-left bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex justify-between items-center group"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{client.name}</h3>
                  <p className="text-sm text-gray-500">{client.address}</p>
                </div>
                <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Sélectionner</span>
              </button>
            ))}
        </div>
    </div>
  );

  // STEP 4: DETAILS
  const renderStep4 = () => (
    <div className="animate-in slide-in-from-right duration-300 max-w-xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(3)} className="text-gray-400 hover:text-black">← Retour</button>
            <h2 className="text-xl font-bold text-gray-900">Étape 4 : Détails finaux</h2>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date d'effet</label>
                <input 
                    type="date" 
                    value={contractDate}
                    onChange={(e) => setContractDate(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
            </div>
            
            {contractType.id !== 'prestation' && (
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Durée / Validité</label>
                    <select 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none bg-white"
                    >
                        <option>3 mois</option>
                        <option>6 mois</option>
                        <option>12 mois</option>
                        <option>24 mois</option>
                        <option>3 ans</option>
                    </select>
                </div>
            )}

            <button 
                onClick={handleGenerate}
                className="w-full py-4 bg-black text-white font-bold rounded-xl text-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10 mt-4"
            >
                Générer le Document
            </button>
        </div>
    </div>
  );

  // STEP 5: PREVIEW
  const renderStep5 = () => (
    <div className="animate-in zoom-in-95 duration-500">
       <div className="flex justify-between items-center mb-8 no-print">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                Document prêt
            </h2>
            <div className="flex gap-3">
                <button onClick={reset} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Nouveau contrat</button>
                <button className="px-4 py-2 text-sm font-medium bg-black text-white hover:bg-gray-800 rounded-lg shadow-sm">Imprimer / PDF</button>
            </div>
       </div>

       {/* CONTRACT TEMPLATE */}
       <div className="bg-white w-full max-w-4xl mx-auto p-16 shadow-2xl rounded-sm border border-gray-100 min-h-[900px] flex flex-col font-serif text-justify leading-relaxed text-gray-900 relative">
            
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-4 border-b-2 border-black inline-block pb-2">
                    {contractType.title}
                </h1>
                <p className="text-sm italic text-gray-500">Référence: CTR-{new Date().getFullYear()}-{Math.floor(Math.random() * 1000)}</p>
            </div>

            <div className="space-y-6 mb-10">
                <p>
                    <strong>ENTRE LES SOUSSIGNÉS :</strong>
                </p>
                <p className="pl-6">
                    <strong>L'Agence HOME.</strong>, SAS au capital de 10 000 €, dont le siège social est situé à Paris, représentée par Alpha Dir, en qualité de Président.<br/>
                    Ci-après dénommée <em>"l'Agence"</em>.
                </p>
                <p className="text-center font-bold text-sm">D'UNE PART,</p>
                <p>
                    <strong>ET :</strong>
                </p>
                 <p className="pl-6">
                    <strong>{selectedModel.name}</strong>, demeurant au {selectedModel.address}.<br/>
                    Ci-après dénommé(e) <em>"le Mannequin"</em>.
                </p>
                 <p className="text-center font-bold text-sm">D'AUTRE PART,</p>
                 
                 {contractType.id !== 'exclusif' && (
                     <>
                        <p className="text-center font-bold text-sm">ET (Le cas échéant) :</p>
                        <p className="pl-6">
                            <strong>{selectedClient.name}</strong>, dont le siège est situé à {selectedClient.address}.<br/>
                            Ci-après dénommé <em>"le Client"</em>.
                        </p>
                     </>
                 )}
            </div>

            <div className="space-y-6">
                <h3 className="font-bold uppercase text-sm border-b border-gray-300 pb-1 mb-2">Article 1. Objet du Contrat</h3>
                <p>
                    {contractType.id === 'prestation' && `Le présent contrat a pour objet de définir les conditions dans lesquelles le Mannequin effectuera une prestation de mannequinat pour le compte du Client, par l'intermédiaire de l'Agence.`}
                    {contractType.id === 'image' && `Le présent contrat a pour objet la cession des droits à l'image du Mannequin au profit du Client, pour les supports et la durée définis.`}
                    {contractType.id === 'exclusif' && `Le présent contrat confère à l'Agence le mandat exclusif de représentation du Mannequin pour la gestion de sa carrière et la négociation de ses contrats de travail.`}
                </p>

                <h3 className="font-bold uppercase text-sm border-b border-gray-300 pb-1 mb-2">Article 2. Durée et Date d'effet</h3>
                <p>
                    Le présent contrat prend effet à compter du <strong>{new Date(contractDate).toLocaleDateString()}</strong>.
                    {contractType.id !== 'prestation' ? ` Il est conclu pour une durée de ${duration}.` : ` Il est conclu pour la durée de la mission définie en annexe.`}
                </p>

                <h3 className="font-bold uppercase text-sm border-b border-gray-300 pb-1 mb-2">Article 3. Rémunération</h3>
                <p>
                    En contrepartie de l'exécution du présent contrat, le Mannequin percevra une rémunération conforme aux usages de la profession et aux dispositions légales en vigueur, déduction faite de la commission d'agence de 20%.
                </p>

                <h3 className="font-bold uppercase text-sm border-b border-gray-300 pb-1 mb-2">Article 4. Loi Applicable</h3>
                <p>Le présent contrat est soumis au droit français. Tout litige relatif à son exécution ou son interprétation sera de la compétence exclusive des tribunaux de Paris.</p>
            </div>

            <div className="mt-20 flex justify-between items-start font-sans">
                <div className="text-center w-1/3">
                    <p className="text-xs uppercase font-bold mb-4">Pour l'Agence</p>
                    <p className="text-gray-400 text-xs italic mb-2">(Signature)</p>
                     <div className="font-dancing-script text-3xl text-blue-900 transform -rotate-6 mt-4">Alpha Dir.</div>
                </div>
                <div className="text-center w-1/3">
                    <p className="text-xs uppercase font-bold mb-4">Le Mannequin</p>
                    <p className="text-gray-400 text-xs italic mb-2">Lu et approuvé</p>
                     <div className="font-dancing-script text-2xl text-black mt-4 font-normal">{selectedModel.name}</div>
                </div>
                 {contractType.id !== 'exclusif' && (
                    <div className="text-center w-1/3">
                        <p className="text-xs uppercase font-bold mb-4">Le Client</p>
                        <p className="text-gray-400 text-xs italic mb-2">(Cachet)</p>
                        <div className="border-2 border-black/20 rounded p-2 inline-block mt-2 opacity-50 font-bold uppercase text-xs rotate-12">
                            {selectedClient.name}
                            <br/>Validé
                        </div>
                    </div>
                )}
            </div>
            
            <div className="mt-auto pt-10 text-center text-[10px] text-gray-400 border-t border-gray-100">
                <p>Document généré électroniquement par la plateforme HOME. - {new Date().toLocaleString()}</p>
            </div>
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto min-h-[600px]">
      {/* HEADER WIZARD */}
      {step < 5 && (
        <header className="mb-10">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Annuler</Link>
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nouveau Contrat</h1>
                <div className="flex items-center gap-2 ml-4">
                     {[1, 2, 3, 4].map(s => (
                         <span key={s} className={`w-3 h-3 rounded-full ${step >= s ? 'bg-black' : 'bg-gray-200'}`}></span>
                     ))}
                </div>
            </div>
        </header>
      )}

      {/* DYNAMIC CONTENT */}
      <div>
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
      </div>
    </div>
  );
}