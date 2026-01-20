import Link from 'next/link';
import Navbar from '../components/ui/Navbar';

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-500/30">
            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto space-y-32">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-display font-medium mb-8">
                        L'art de la gestion <span className="text-gradient-gold italic">sur-mesure.</span>
                    </h1>
                    <p className="text-xl text-gray-400 font-light leading-relaxed">
                        Chaque fonctionnalité de HOME a été conçue pour répondre aux exigences élevées des agences de mannequins d'élite.
                    </p>
                </div>

                {/* Feature 1: Model Management */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="text-6xl mb-6">✨</div>
                        <h2 className="text-3xl font-bold mb-4 font-display">Gestion de Talents</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Centralisez l'intégralité de votre portefeuille. Mensurations précises, documents administratifs (CNI, RIB), et gestion des statuts en temps réel. Une vue unifiée pour ne jamais perdre le fil de vos carrières.
                        </p>
                        <ul className="space-y-3 text-gray-500">
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Fiches complètes & Mensurations</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Coffre-fort numérique (Docs)</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Suivi de carrière</li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl h-[400px] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gold-500/5 group-hover:bg-gold-500/10 transition-colors"></div>
                        <span className="text-sm font-mono text-gray-600 uppercase tracking-widest">Interface Modèle</span>
                    </div>
                </section>

                {/* Feature 2: Contracts */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl h-[400px] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors"></div>
                        <span className="text-sm font-mono text-gray-600 uppercase tracking-widest">Générateur de Contrats</span>
                    </div>
                    <div>
                        <div className="text-6xl mb-6">⚖️</div>
                        <h2 className="text-3xl font-bold mb-4 font-display">Juridique Automatisé</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Générez des contrats de prestation, de cession d'image ou de représentation exclusive en quelques clics. Notre assistant intelligent connecte automatiquement vos Modèles et vos Clients pour des documents sans erreur.
                        </p>
                        <ul className="space-y-3 text-gray-500">
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Modèles juridiques conformes</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Pré-remplissage intelligent</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Export PDF instantané</li>
                        </ul>
                    </div>
                </section>

                {/* Feature 3: Clients & Bookings */}
                <section className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <div className="text-6xl mb-6">🤝</div>
                        <h2 className="text-3xl font-bold mb-4 font-display">Clients & Bookings</h2>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            Gérez votre relation client de la prospection à la facturation. Suivez chaque booking, chaque option et chaque confirmation avec une clarté absolue.
                        </p>
                        <ul className="space-y-3 text-gray-500">
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Base de données Clients (Marques/Agences)</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Suivi des options & confirmations</li>
                            <li className="flex items-center gap-3"><span className="text-gold-400">✓</span> Historique des collaborations</li>
                        </ul>
                    </div>
                    <div className="order-1 md:order-2 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-3xl h-[400px] flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors"></div>
                        <span className="text-sm font-mono text-gray-600 uppercase tracking-widest">CRM Clients</span>
                    </div>
                </section>

                {/* CTA */}
                <section className="text-center pt-20 border-t border-white/10">
                    <h2 className="text-4xl font-display font-medium mb-8">Prêt à élever vos standards ?</h2>
                    <Link href="/sign-up" className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-200 transition-all">
                        Démarrer l'expérience HOME
                    </Link>
                </section>

            </main>
        </div>
    );
}
