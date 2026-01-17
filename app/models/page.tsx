import { getModels } from '../lib/actions/models';
import Link from 'next/link';
import ModelCard from '../components/models/ModelCard';

export default async function ModelsPage() {
    const models = await getModels();

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Modèles</h1>
                    <p className="text-gray-500 mt-2">Gérez vos talents et leurs disponibilités.</p>
                </div>
                <Link href="/models/new" className="bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    + Nouveau Modèle
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {models.map((model) => (
                    <ModelCard key={model.id} model={model} />
                ))}
            </div>
        </div>
    );
}
