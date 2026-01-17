import { getModelById } from '../../lib/actions/models';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Client component for the Gallery
import ModelGallery from '../../components/models/ModelGallery';
import DocumentList from '../../components/models/DocumentList';

export default async function ModelDetailPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = parseInt(params.id);
    if (isNaN(id)) return notFound();

    const model = await getModelById(id);
    if (!model) return notFound();

    // Format dates
    const birthDate = new Date(model.dateNaissance).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            {/* Back Button */}
            <Link href="/models" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 mb-6 transition-colors">
                ← Retour à la liste
            </Link>

            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* LEFT: Photo Gallery */}
                <div>
                    <ModelGallery photos={model.photos} modelName={`${model.prenom} ${model.nom}`} />
                </div>

                {/* RIGHT: Information */}
                <div className="space-y-8">

                    {/* Header */}
                    <div className="border-b border-gray-200 pb-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{model.prenom} {model.nom}</h1>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide 
                 ${model.statut === 'ACTIF' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {model.statut}
                            </span>
                        </div>
                        {model.nomDeScene && (
                            <p className="text-xl text-gray-500 mt-2 font-light">aka &quot;{model.nomDeScene}&quot;</p>
                        )}
                    </div>

                    {/* 1. Identity & Contact + Socials */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Identité</h3>
                            <ul className="space-y-3 text-sm">
                                <li className="flex justify-between"><span className="text-gray-500">Nationalité</span> <span className="font-medium">{model.nationalite}</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Né(e) le</span> <span className="font-medium">{birthDate}</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Âge</span> <span className="font-medium">{model.age} ans</span></li>
                                <li className="flex justify-between"><span className="text-gray-500">Mineur</span> <span className="font-medium">{model.mineur ? 'Oui' : 'Non'}</span></li>
                            </ul>

                            {/* Social Stats */}
                            <div className="mt-6 pt-4 border-t border-gray-100">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Réseaux Sociaux</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {(model.instagram || model.tiktok) ? (
                                        <>
                                            {model.instagram && (
                                                <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-pink-600">Instagram</span>
                                                    <span className="text-xs font-bold">{model.followers || '-'}</span>
                                                </div>
                                            )}
                                            {model.tiktok && (
                                                <div className="bg-gray-50 p-2 rounded flex items-center justify-between">
                                                    <span className="text-xs font-semibold text-black">TikTok</span>
                                                    <span className="text-xs font-bold">15k</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-xs text-gray-400 italic">Aucun compte lié</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Profil & Coordonnées</h3>

                            {/* Specialties */}
                            {model.specialites && (
                                <div className="mb-4">
                                    <div className="flex flex-wrap gap-2">
                                        {model.specialites.split(',').map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-md border border-purple-100">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <ul className="space-y-3 text-sm border-t border-gray-100 pt-3">
                                <li className="flex flex-col"><span className="text-gray-500 text-xs">Email</span> <span className="font-medium text-blue-600 break-all">{model.email}</span></li>
                                <li className="flex flex-col"><span className="text-gray-500 text-xs">Téléphone</span> <span className="font-medium">{model.telephone}</span></li>
                                <li className="flex flex-col"><span className="text-gray-500 text-xs">Adresse</span> <span className="font-medium">{model.adresse}, {model.ville}</span></li>
                            </ul>
                        </div>
                    </div>

                    {/* 2. Measurements (The "Composite Card" data) */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">Mensurations</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4">
                            <div><p className="text-xs text-gray-400 uppercase">Taille</p><p className="text-xl font-bold">{model.taille} cm</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Poids</p><p className="text-xl font-bold">{model.poids} kg</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Poitrine</p><p className="text-xl font-bold">{model.tourPoitrine} cm</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Taille</p><p className="text-xl font-bold">{model.tourTaille} cm</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Hanches</p><p className="text-xl font-bold">{model.tourHanches} cm</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Pointure</p><p className="text-xl font-bold">{model.pointure}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Yeux</p><p className="text-xl font-bold">{model.yeux}</p></div>
                            <div><p className="text-xs text-gray-400 uppercase">Cheveux</p><p className="text-xl font-bold">{model.cheveux}</p></div>
                        </div>
                    </div>

                    {/* 3. Documents Administratifs */}
                    <div className="space-y-4">
                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                             <div className="flex items-center justify-between mb-6">
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">Documents Administratifs</h3>
                                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold">{model.documents.length}</span>
                            </div>
                            <DocumentList documents={model.documents} model={model} />
                        </div>

                        {/* Booking Quick Stat */}
                        <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-600">Total Bookings</span>
                            <span className="bg-white px-2 py-1 rounded text-xs font-bold shadow-sm">{model.bookings.length}</span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
