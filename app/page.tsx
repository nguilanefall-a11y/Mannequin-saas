import Link from 'next/link';
import Navbar from './components/ui/Navbar';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-gold-500/30">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">

                {/* Background Elements */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-400/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-12">
                    <div className="space-y-4">
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-gold-500/80">Agency Management System</span>
                        <h1 className="text-6xl md:text-9xl font-display font-medium tracking-tight">
                            HOME<span className="text-gold-500">.</span>
                        </h1>
                    </div>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        L'écrin digital pour les agences de mannequins d'exception.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                        <Link href="/sign-up" className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-full text-lg font-bold hover:bg-gray-200 transition-all min-w-[200px]">
                            Commencer
                        </Link>
                        <Link href="/features" className="w-full md:w-auto px-10 py-4 rounded-full text-lg font-medium text-gray-400 border border-white/10 hover:bg-white/5 hover:text-white transition-all min-w-[200px]">
                            Découvrir
                        </Link>
                    </div>
                </div>

                {/* Footer simple for Landing */}
                <div className="absolute bottom-10 left-0 w-full text-center">
                    <p className="text-[10px] uppercase tracking-widest text-gray-600">Paris • Milan • New York</p>
                </div>
            </section>
        </div>
    );
}

// Removed FeatureCard component as it is no longer used here.
