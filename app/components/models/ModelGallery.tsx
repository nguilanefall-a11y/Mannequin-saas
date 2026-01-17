'use client'

import React, { useState } from 'react';

export default function ModelGallery({ photos, modelName }: { photos: any[], modelName: string }) {
    // Sort main first
    const sortedPhotos = photos && photos.length > 0
        ? [...photos].sort((a, b) => (b.isMain === a.isMain ? 0 : b.isMain ? 1 : -1))
        : [];

    const [selectedIndex, setSelectedIndex] = useState(0);

    if (sortedPhotos.length === 0) {
        return (
            <div className="aspect-[3/4] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                <span className="text-6xl">📷</span>
                <p className="mt-4 text-sm font-medium">Aucune photo</p>
            </div>
        );
    }

    const selectedPhoto = sortedPhotos[selectedIndex];

    return (
        <div className="sticky top-8">
            {/* Main Image */}
            <div className="aspect-[3/4] bg-gray-100 rounded-xl overflow-hidden shadow-lg border border-gray-100 mb-4 group relative">
                <img
                    src={selectedPhoto.url}
                    alt={`${modelName} - Photo ${selectedIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows (if multiple) */}
                {sortedPhotos.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedIndex(prev => prev === 0 ? sortedPhotos.length - 1 : prev - 1)}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setSelectedIndex(prev => prev === sortedPhotos.length - 1 ? 0 : prev + 1)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/90 text-white hover:text-black p-3 rounded-full backdrop-blur-md transition-all"
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {sortedPhotos.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {sortedPhotos.map((photo, idx) => (
                        <button
                            key={photo.id}
                            onClick={() => setSelectedIndex(idx)}
                            className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all
                  ${idx === selectedIndex ? 'border-black ring-2 ring-black/10' : 'border-transparent opacity-70 hover:opacity-100'}`}
                        >
                            <img src={photo.url} alt="" className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
