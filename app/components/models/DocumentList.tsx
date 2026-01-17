'use client'

import React, { useState } from 'react';

// Mock function to generate contract HTML for Quick Look
const getContractContent = (modelName: string, dateStr: string) => {
    return `
    <div class="p-8 bg-white text-black font-serif leading-relaxed max-w-2xl mx-auto shadow-sm border border-gray-100">
      <div class="flex justify-between items-start mb-8 border-b pb-6">
         <h1 class="text-xl font-bold uppercase tracking-widest">Contrat de Représentation</h1>
         <div class="text-right text-xs text-gray-500">
            <p>Réf: AG-2025-${modelName.split(' ')[0].toUpperCase()}</p>
            <p>Paris, le ${dateStr}</p>
         </div>
      </div>
      
      <p class="mb-6 font-light italic text-sm">Entre l'Agence <strong>MANNEQUIN SAAS</strong> et <strong>${modelName}</strong>.</p>
      
      <div class="space-y-4 text-justify text-sm">
          <p><strong>ARTICLE 1.</strong> Le présent contrat confère à l'Agence le mandat exclusif de représentation pour une durée de 3 ans.</p>
          <p><strong>ARTICLE 2.</strong> Le Mannequin s'engage à maintenir son image et sa disponibilité pour les castings proposés.</p>
          <p><strong>ARTICLE 3.</strong> Les conditions financières sont fixées conformément à la législation en vigueur : 20% de commission agence sur le brut HT.</p>
      </div>

      <div class="mt-16 flex justify-between items-end">
        <div class="text-center">
            <p class="mb-4 text-xs uppercase tracking-wide">Pour l'Agence</p>
             <div class="font-dancing-script text-2xl text-blue-900 border-b-2 border-blue-900/20 pb-2">Alpha Dir.</div>
        </div>
        <div class="text-center">
            <p class="mb-4 text-xs uppercase tracking-wide">Le Mannequin</p>
            <div class="font-dancing-script text-2xl text-black border-b-2 border-black/20 pb-2">${modelName}</div>
        </div>
      </div>
    </div>
  `;
};

const getCNIContent = (model: any) => {
    return `
    <div class="p-6 bg-blue-50 text-black max-w-xl mx-auto shadow-lg rounded-xl border border-blue-100 relative overflow-hidden font-sans">
       <div class="absolute top-0 left-0 w-full h-4 bg-blue-600"></div>
       <div class="flex justify-between items-center mb-6 mt-2">
           <h2 class="text-lg font-bold text-blue-900 uppercase">République Française</h2>
           <div class="text-xs font-bold border-2 border-black p-1 rounded">CNI</div>
       </div>

       <div class="flex gap-6">
           <div class="w-32 h-40 bg-gray-300 rounded overflow-hidden border border-gray-400 shadow-inner">
               ${model.photos?.[0]?.url ? `<img src="${model.photos[0].url}" class="w-full h-full object-cover grayscale" />` : '<div class="w-full h-full flex items-center justify-center text-gray-500">PHOTO</div>'}
           </div>
           
           <div class="flex-1 space-y-2 text-sm">
               <div>
                   <p class="text-xs text-blue-600 uppercase">Nom</p>
                   <p class="font-bold uppercase tracking-wider">${model.nom}</p>
               </div>
               <div>
                   <p class="text-xs text-blue-600 uppercase">Prénom(s)</p>
                   <p class="font-bold uppercase tracking-wider">${model.prenom}</p>
               </div>
               <div class="flex gap-4">
                   <div>
                       <p class="text-xs text-blue-600 uppercase">Sexe</p>
                       <p class="font-bold">F</p>
                   </div>
                   <div>
                       <p class="text-xs text-blue-600 uppercase">Né(e) le</p>
                       <p class="font-bold">${new Date(model.dateNaissance).toLocaleDateString()}</p>
                   </div>
                   <div>
                       <p class="text-xs text-blue-600 uppercase">Taille</p>
                       <p class="font-bold">${model.taille} cm</p>
                   </div>
               </div>
                <div class="mt-4 pt-2 border-t border-blue-200">
                   <p class="font-mono text-xs tracking-widest text-gray-600">IDFRA${model.nom.slice(0, 5).toUpperCase()}<<<<<<<<<<<<<<<<<00124</p>
               </div>
           </div>
       </div>
    </div>
    `;
};

const getRIBContent = (modelName: string) => {
    return `
    <div class="p-8 bg-white text-black font-mono text-sm max-w-2xl mx-auto shadow-sm border border-gray-300">
        <div class="border-b-2 border-black pb-4 mb-6 flex justify-between items-end">
            <h1 class="text-2xl font-bold uppercase">Relevé d'Identité Bancaire</h1>
            <div class="text-right">
             <div class="font-bold text-lg">BANQUE POPULAIRE</div>
             <div class="text-xs">Agence Paris-Rivoli</div>
            </div>
        </div>

        <div class="mb-8">
            <p class="text-xs text-gray-500 uppercase mb-1">Titulaire du compte</p>
            <p class="text-lg font-bold uppercase">${modelName}</p>
            <p>12 Avenue de la Mode, 75001 Paris</p>
        </div>

        <table class="w-full mb-8 border-collapse">
            <thead>
                <tr class="text-xs text-left text-gray-500 border-b border-gray-400">
                    <th class="pb-2 w-1/5">Code Banque</th>
                    <th class="pb-2 w-1/5">Code Guichet</th>
                    <th class="pb-2 w-2/5">Numéro de compte</th>
                    <th class="pb-2 w-1/5">Clé RIB</th>
                </tr>
            </thead>
            <tbody>
                <tr class="text-lg font-bold">
                    <td class="pt-2">10207</td>
                    <td class="pt-2">00125</td>
                    <td class="pt-2">12345678901</td>
                    <td class="pt-2">45</td>
                </tr>
            </tbody>
        </table>

         <div class="mb-8">
            <p class="text-xs text-gray-500 uppercase mb-1">IBAN (International Bank Account Number)</p>
            <p class="text-xl font-bold tracking-wider bg-gray-100 p-2 inline-block">FR76 1020 7001 2512 3456 7890 145</p>
        </div>
        
        <div class="mb-4">
            <p class="text-xs text-gray-500 uppercase mb-1">BIC (Bank Identifier Code)</p>
            <p class="text-lg font-bold">BPOPFRPP</p>
        </div>
    </div>
    `;
};

const getGenericDocContent = (docName: string) => {
    return `
    <div class="p-8 bg-white text-black font-sans text-sm max-w-2xl mx-auto shadow-sm border border-gray-200 min-h-[500px] flex flex-col">
        <div class="border-b pb-4 mb-6 flex justify-between items-center">
            <h1 class="text-lg font-bold text-gray-700 uppercase">${docName}</h1>
            <div class="bg-gray-100 text-xs px-2 py-1 rounded">DOCUMENT OFFICIEL</div>
        </div>

        <div class="space-y-4 flex-1">
            <div class="h-4 bg-gray-100 rounded w-3/4"></div>
            <div class="h-4 bg-gray-100 rounded w-full"></div>
            <div class="h-4 bg-gray-100 rounded w-5/6"></div>
            <div class="h-4 bg-gray-100 rounded w-full"></div>
            
            <br />
            
            <div class="h-4 bg-gray-100 rounded w-full"></div>
            <div class="h-4 bg-gray-100 rounded w-4/5"></div>
            <div class="h-4 bg-gray-100 rounded w-11/12"></div>
            
            <div class="mt-12 p-4 bg-gray-50 border border-gray-100 rounded text-center text-gray-500 italic text-xs">
                Ceci est une prévisualisation générée automatiquement pour le fichier "${docName}".
            </div>
        </div>
        
        <div class="mt-8 border-t pt-4 flex justify-between text-xs text-gray-400">
            <span>Page 1 / 1</span>
            <span>Agence Mannequin SaaS</span>
        </div>
    </div>
    `;
};

export default function DocumentList({ documents, model }: { documents: any[], model: any }) {
    const [selectedDoc, setSelectedDoc] = useState<any | null>(null);
    const modelName = `${model.prenom} ${model.nom}`;

    if (!documents || documents.length === 0) {
        return <div className="text-gray-400 italic text-sm">Aucun document disponible.</div>;
    }

    const isImage = (filename: string) => /\.(jpg|jpeg|png|webp)$/i.test(filename);

    return (
        <div className="space-y-3">
            {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 text-red-500 rounded flex items-center justify-center font-bold text-xs">
                            {doc.type === 'CNI' ? 'ID' : doc.type === 'RIB' ? 'RIB' : isImage(doc.nom) ? 'IMG' : 'PDF'}
                        </div>
                        <div>
                            <p className="font-medium text-gray-900 text-sm">{doc.nom}</p>
                            <p className="text-xs text-gray-500">
                                {new Date(doc.dateAjout).toLocaleDateString()}
                                {/* DEBUG: Show raw type to debug matching issues */}
                                <span className="ml-2 px-1 bg-gray-200 text-gray-600 rounded text-[10px] font-mono">
                                    Type: {doc.type || 'N/A'}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Quick Look Button */}
                        <button
                            onClick={() => setSelectedDoc(doc)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors group relative"
                            title="Aperçu rapide"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>

                        {/* Download Button (Mock) */}
                        <button
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-colors"
                            title="Télécharger"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </button>
                    </div>
                </div>
            ))}

            {/* Quick Look Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setSelectedDoc(null)}>
                    <div
                        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="font-bold text-gray-900">{selectedDoc.nom}</h3>
                            <button onClick={() => setSelectedDoc(null)} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 flex justify-center">
                            {(() => {
                                const type = (selectedDoc.type || '').toUpperCase();
                                const name = (selectedDoc.nom || '').toUpperCase();
                                
                                if (type === 'CONTRAT' || name.includes('CONTRAT')) {
                                    return <div className="w-full" dangerouslySetInnerHTML={{ __html: getContractContent(modelName, new Date().toLocaleDateString()) }} />;
                                }
                                if (type === 'CNI' || name.includes('CNI') || name.includes('IDENTITE') || name.includes('PASSEPORT')) {
                                    return <div className="w-full" dangerouslySetInnerHTML={{ __html: getCNIContent(model) }} />;
                                }
                                if (type === 'RIB' || name.includes('RIB') || name.includes('BANQUE')) {
                                    return <div className="w-full" dangerouslySetInnerHTML={{ __html: getRIBContent(modelName) }} />;
                                }
                                if (isImage(selectedDoc.nom)) {
                                    return (
                                        <div className="flex items-center justify-center h-full bg-black/5 rounded-lg w-full">
                                            <div className="text-center">
                                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto text-gray-400 mb-2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                                </svg>
                                                <p className="text-gray-500 text-sm">Aperçu image simulé</p>
                                            </div>
                                        </div>
                                    );
                                }
                                return <div className="w-full" dangerouslySetInnerHTML={{ __html: getGenericDocContent(selectedDoc.nom) }} />;
                            })()}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
                            <button onClick={() => setSelectedDoc(null)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">Fermer</button>
                            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm">
                                Télécharger (PDF)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}