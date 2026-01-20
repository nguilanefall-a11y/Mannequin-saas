import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-500/30">

            {/* Navigation */}
            <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/5 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-display font-bold text-gradient-gold">MANNEQUIN</span>
                        <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mt-1">SaaS</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <SignedIn>
                            <Link href="/dashboard" className="text-sm font-medium hover:text-gold-400 transition-colors">
                                Accéder au Dashboard
                            </Link>
                        </SignedIn>
                        <SignedOut>
                            <Link href="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                                Connexion
                            </Link>
                            <Link href="/sign-up" className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                                Démarrer
                            </Link>
                        </SignedOut>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">

                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gold-400/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium leading-tight mb-8">
                        L'excellence pour <br /> Needs <span className="text-gradient-gold italic">Excellence.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        La première plateforme de gestion dédiée aux agences de mannequins premium.
                        Modèles, bookings, facturation et talents, unifiés.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link href="/sign-up" className="w-full md:w-auto bg-gradient-to-r from-gold-400 to-gold-600 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all">
                            Créer mon Agence
                        </Link>
                        <Link href="/#features" className="w-full md:w-auto px-8 py-4 rounded-full text-lg font-medium text-white border border-white/20 hover:bg-white/5 transition-colors">
                            Découvrir les fonctionnalités
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon="✨"
                            title="Gestion de Talents"
                            description="Centralisez vos mannequins, leurs mensurations, portfolios et documents administratifs."
                        />
                        <FeatureCard
                            icon="📅"
                            title="Planning & Bookings"
                            description="Gérez les options, confirmations et plannings avec une vue financière claire."
                        />
                        <FeatureCard
                            icon="⚖️"
                            title="Juridique & Finance"
                            description="Génération automatique de contrats et factures. Suivi des paiements en temps réel."
                        />
                    </div>
                </div>
            </section>

        </div>
    );
}

function FeatureCard({ icon, title, description }: { icon: string, title: string, description: string }) {
    return (
        <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-gold-500/30 transition-colors group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gold-400 transition-colors">{title}</h3>
            <p className="text-gray-400 leading-relaxed">{description}</p>
        </div>
    )
}
