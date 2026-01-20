'use client';

import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-display font-medium tracking-tight text-white group-hover:text-gold-500 transition-colors">HOME.</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/features" className="text-xs font-medium uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                        Fonctionnalités
                    </Link>

                    <Link href="/sign-in" className="text-xs font-bold uppercase tracking-widest text-white hover:text-gold-500 transition-colors">
                        Connexion
                    </Link>
                </div>
            </div>
        </nav>
    );
}
