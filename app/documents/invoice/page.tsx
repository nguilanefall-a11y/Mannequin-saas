'use client';

import Link from 'next/link';
import React, { useState } from 'react';

// --- MOCK DATA ---
const MODELS = [
  { id: 'm1', name: 'Alice Dupont', initial: 'A', color: 'bg-pink-100 text-pink-600' },
  { id: 'm2', name: 'Bob Marley', initial: 'B', color: 'bg-green-100 text-green-600' },
  { id: 'm3', name: 'Eva Green', initial: 'E', color: 'bg-purple-100 text-purple-600' }
];

const BOOKINGS = [
  { id: 'b1', modelId: 'm1', project: 'Campagne Hiver 2026', client: 'L\'Oréal Paris', date: '20-22 Jan 2026', amount: 1500, address: '14 Rue Royale, 75008 Paris' },
  { id: 'b2', modelId: 'm1', project: 'Shooting Catalogue', client: 'La Redoute', date: '05 Fév 2026', amount: 800, address: '110 Rue de Blanchemaille, 59100 Roubaix' },
  { id: 'b3', modelId: 'm2', project: 'E-commerce Summer', client: 'Zara France', date: '01 Fév 2026', amount: 800, address: '88 Rue de Rivoli, 75004 Paris' },
  { id: 'b4', modelId: 'm3', project: 'Couverture Mars', client: 'Vogue Magazine', date: '15 Jan 2026', amount: 2500, address: '10 Avenue Hoche, 75008 Paris' },
];

export default function InvoiceGeneratorWizard() {
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState<any>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [invoiceNumber] = useState(`FACT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);

  // --- HANDLERS ---
  const handleSelectModel = (model: any) => {
    setSelectedModel(model);
    setStep(2);
  };

  const handleSelectBooking = (booking: any) => {
    setSelectedBooking(booking);
    setFinalAmount(booking.amount); // Pre-fill amount
    setStep(3);
  };

  const handleGenerate = () => {
    setStep(4);
  };

  const reset = () => {
    setStep(1);
    setSelectedModel(null);
    setSelectedBooking(null);
    setFinalAmount(0);
  };

  // --- STEPS RENDERING ---

  // STEP 1: SELECT MODEL
  const renderStep1 = () => (
    <div className="animate-in slide-in-from-right duration-300">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Étape 1 : Pour quel mannequin ?</h2>
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

  // STEP 2: SELECT BOOKING
  const renderStep2 = () => {
    const modelBookings = BOOKINGS.filter(b => b.modelId === selectedModel.id);
    return (
      <div className="animate-in slide-in-from-right duration-300">
        <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-black">← Retour</button>
            <h2 className="text-xl font-bold text-gray-900">Étape 2 : Quel booking facturer ?</h2>
        </div>
        
        {modelBookings.length > 0 ? (
          <div className="space-y-4">
            {modelBookings.map(booking => (
              <button 
                key={booking.id}
                onClick={() => handleSelectBooking(booking)}
                className="w-full text-left bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex justify-between items-center group"
              >
                <div>
                  <h3 className="font-bold text-gray-900">{booking.project}</h3>
                  <p className="text-sm text-gray-500">{booking.client} • {booking.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{booking.amount} €</p>
                  <span className="text-xs text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Choisir cette mission</span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500">Aucun booking trouvé pour ce modèle.</p>
            <button onClick={() => setStep(1)} className="mt-4 text-blue-600 font-medium">Choisir un autre modèle</button>
          </div>
        )}
      </div>
    );
  };

  // STEP 3: SUMMARY & CONFIRM
  const renderStep3 = () => (
    <div className="animate-in slide-in-from-right duration-300 max-w-xl mx-auto">
       <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setStep(2)} className="text-gray-400 hover:text-black">← Retour</button>
            <h2 className="text-xl font-bold text-gray-900">Étape 3 : Validation</h2>
        </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
        {/* Recap */}
        <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
            <div className={`w-12 h-12 rounded-full ${selectedModel.color} flex items-center justify-center font-bold`}>
                {selectedModel.initial}
            </div>
            <div>
                <p className="text-sm text-gray-500 uppercase font-bold">Mannequin</p>
                <p className="font-bold text-gray-900">{selectedModel.name}</p>
            </div>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div>
                 <p className="text-sm text-gray-500 uppercase font-bold">Client</p>
                 <p className="font-bold text-gray-900">{selectedBooking.client}</p>
            </div>
        </div>

        {/* Amount Input */}
        <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Montant à facturer (€)</label>
            <div className="relative">
                <input 
                    type="number" 
                    value={finalAmount}
                    onChange={(e) => setFinalAmount(Number(e.target.value))}
                    className="w-full text-3xl font-bold p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">EUR</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Ce montant inclut la prestation brute. La TVA sera calculée automatiquement.</p>
        </div>

        <button 
            onClick={handleGenerate}
            className="w-full py-4 bg-black text-white font-bold rounded-xl text-lg hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/10"
        >
            Générer la Facture
        </button>
      </div>
    </div>
  );

  // STEP 4: PREVIEW (INVOICE)
  const renderStep4 = () => (
    <div className="animate-in zoom-in-95 duration-500">
       <div className="flex justify-between items-center mb-8 no-print">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs">✓</span>
                Facture générée
            </h2>
            <div className="flex gap-3">
                <button onClick={reset} className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">Nouvelle facture</button>
                <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded-lg shadow-sm">Télécharger PDF</button>
            </div>
       </div>

       {/* INVOICE TEMPLATE */}
       <div className="bg-white w-full max-w-3xl mx-auto p-12 shadow-2xl rounded-sm border border-gray-100 min-h-[800px] flex flex-col font-serif relative overflow-hidden">
            {/* Watermark */}
            <div className="absolute top-0 right-0 p-4 opacity-10 font-sans font-black text-9xl text-gray-300 pointer-events-none -rotate-12 transform translate-x-10 -translate-y-10">
                PROFORMA
            </div>

            {/* Header */}
            <div className="flex justify-between items-start mb-16">
                <div>
                    <h1 className="text-2xl font-bold uppercase tracking-widest mb-2 font-sans">HOME.</h1>
                    <p className="text-sm text-gray-500 font-sans">Agence de Mannequins</p>
                    <p className="text-sm text-gray-500 font-sans">Paris, France</p>
                </div>
                <div className="text-right">
                    <h2 className="text-4xl font-light text-gray-900 mb-2">FACTURE</h2>
                    <p className="text-sm text-gray-500 font-sans">N° {invoiceNumber}</p>
                    <p className="text-sm text-gray-500 font-sans">Date: {new Date().toLocaleDateString()}</p>
                </div>
            </div>

            {/* Addresses */}
            <div className="flex justify-between mb-16 font-sans text-sm">
                <div className="w-1/3">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Facturé à</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedBooking.client}</p>
                    <p className="text-gray-600">{selectedBooking.address}</p>
                    <p className="text-gray-600">France</p>
                </div>
                <div className="w-1/3 text-right">
                    <p className="text-xs font-bold text-gray-400 uppercase mb-2">Prestation de</p>
                    <p className="font-bold text-gray-900 text-lg">{selectedModel.name}</p>
                    <p className="text-gray-600">Représenté par HOME.</p>
                </div>
            </div>

            {/* Line Items */}
            <table className="w-full mb-8 font-sans">
                <thead>
                    <tr className="border-b-2 border-black text-left">
                        <th className="pb-3 text-xs font-bold uppercase tracking-wider text-gray-600">Description</th>
                        <th className="pb-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Qté</th>
                        <th className="pb-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Prix Unit.</th>
                        <th className="pb-3 text-right text-xs font-bold uppercase tracking-wider text-gray-600">Total</th>
                    </tr>
                </thead>
                <tbody className="text-sm">
                    <tr className="border-b border-gray-100">
                        <td className="py-4">
                            <p className="font-bold text-gray-900">{selectedBooking.project}</p>
                            <p className="text-gray-500 text-xs">Prestation mannequin - {selectedBooking.date}</p>
                        </td>
                        <td className="py-4 text-right">1</td>
                        <td className="py-4 text-right">{finalAmount} €</td>
                        <td className="py-4 text-right font-bold">{finalAmount} €</td>
                    </tr>
                     <tr className="border-b border-gray-100">
                        <td className="py-4">
                            <p className="font-bold text-gray-900">Droits à l\'image</p>
                            <p className="text-gray-500 text-xs">Cession pour 1 an - Web & Print</p>
                        </td>
                        <td className="py-4 text-right">1</td>
                        <td className="py-4 text-right">0 €</td>
                        <td className="py-4 text-right font-bold">Inclus</td>
                    </tr>
                </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end font-sans">
                <div className="w-1/2 space-y-3">
                    <div className="flex justify-between text-gray-600">
                        <span>Sous-total</span>
                        <span>{finalAmount.toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>TVA (20%)</span>
                        <span>{(finalAmount * 0.2).toLocaleString()} €</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-900 border-t border-black pt-4 mt-4">
                        <span>Total TTC</span>
                        <span>{(finalAmount * 1.2).toLocaleString()} €</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-12 text-center text-xs text-gray-400 font-sans">
                <p>HOME. Agency - 12 Avenue de la Mode, 75001 Paris - SIRET 123 456 789 00012</p>
                <p>Conditions de paiement : 30 jours date de facture.</p>
            </div>
       </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto min-h-[600px]">
      {/* HEADER WIZARD */}
      {step < 4 && (
        <header className="mb-10">
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-black mb-4 inline-block">← Annuler</Link>
            <div className="flex items-center gap-4">
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Nouvelle Facture</h1>
                <div className="flex items-center gap-2 ml-4">
                    <span className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-black' : 'bg-gray-200'}`}></span>
                    <span className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-black' : 'bg-gray-200'}`}></span>
                    <span className={`w-3 h-3 rounded-full ${step >= 3 ? 'bg-black' : 'bg-gray-200'}`}></span>
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
      </div>
    </div>
  );
}