import Link from 'next/link';
import Navbar from './components/ui/Navbar';

export default function LandingPage() {
    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto w-full h-full bg-[#050505] text-white selection:bg-gold-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">

                {/* Subtle Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

                <div className="relative z-10 text-center space-y-8 px-6 animate-in fade-in duration-1000 slide-in-from-bottom-5">

                    {/* Brand */}
                    <div className="space-y-2">
                        <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.4em] text-white/40 block mb-4">
                            Premium Agency Software
                        </span>
                        <h1 className="text-7xl md:text-9xl font-display font-medium tracking-tight text-white leading-none">
                            HOME<span className="text-gold-500">.</span>
                        </h1>
                    </div>

                    {/* Tagline */}
                    <p className="text-lg md:text-xl text-gray-500 max-w-lg mx-auto font-light leading-relaxed">
                        L'intelligence digitale pour les maisons d'excellence.
                    </p>

                    {/* Actions */}
                    <div className="pt-10 flex flex-col items-center gap-4">
                        <Link href="/sign-up" className="group relative inline-flex items-center gap-3 px-8 py-3 bg-white text-black rounded-full font-medium text-sm hover:bg-gray-200 transition-all overflow-hidden">
                            <span className="relative z-10">Commencer maintenant</span>
                            <span className="text-xl relative z-10 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <Link href="/features" className="text-xs text-gray-600 hover:text-white uppercase tracking-widest transition-colors py-2 border-b border-transparent hover:border-white/20">
                            Découvrir les fonctionnalités
                        </Link>
                    </div>
                </div>

                {/* Footer simple */}
                <div className="absolute bottom-8 left-0 w-full text-center">
                    <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">Paris • Milan • New York</p>
                </div>
            </section>
        </div>
    );
}

// Removed FeatureCard component as it is no longer used here.
