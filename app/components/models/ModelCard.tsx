'use client'

import React, { useState } from 'react';
import Link from 'next/link';

export default function ModelCard({ model }: { model: any }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sortedPhotos = model.photos && model.photos.length > 0
        ? [...model.photos].sort((a, b) => (b.isMain === a.isMain ? 0 : b.isMain ? 1 : -1))
        : [];

    const handlePrev = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? sortedPhotos.length - 1 : prev - 1));
    };

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === sortedPhotos.length - 1 ? 0 : prev + 1));
    };

    const currentPhotoUrl = sortedPhotos.length > 0 ? sortedPhotos[currentIndex].url : null;

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300 group flex flex-col">
            <div className="aspect-[3/4] bg-gray-200 relative">
                <Link href={`/models/${model.id}`} className="absolute inset-0 z-0">
                    {currentPhotoUrl ? (
                        <img src={currentPhotoUrl} alt={`${model.prenom} ${model.nom}`} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <span className="text-4xl">📷</span>
                        </div>
                    )}
                </Link>

                {/* Status Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide z-10 pointer-events-none
           ${model.statut === 'ACTIF' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {model.statut}
                </div>

                {/* Slider Controls */}
                {sortedPhotos.length > 1 && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            ←
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            →
                        </button>

                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
                            {sortedPhotos.map((_, idx) => (
                                <div key={idx} className={`w-1.5 h-1.5 rounded-full shadow-sm ${idx === currentIndex ? 'bg-white' : 'bg-white/50'}`} />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                    <Link href={`/models/${model.id}`} className="block group-hover:text-blue-600 transition-colors">
                        <h3 className="text-lg font-bold text-gray-900">{model.prenom} {model.nom}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-4">{model.nationalite} • {model.age} ans</p>

                    <div className="flex flex-wrap gap-2 text-xs text-gray-600 mb-4">
                        <span className="bg-gray-100 px-2 py-1 rounded">{model.taille}cm</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{model.yeux}</span>
                        <span className="bg-gray-100 px-2 py-1 rounded">{model.cheveux}</span>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center mt-auto">
                    <span className="text-xs font-medium text-gray-400">ID: #{model.id}</span>
                    <Link href={`/models/${model.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline">
                        Voir le profil →
                    </Link>
                </div>
            </div>
        </div>
    );
}
