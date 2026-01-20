'use client';

import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 left-0 bg-transparent">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <span className="text-2xl font-display font-medium tracking-tight text-white group-hover:text-gold-500 transition-colors">HOME.</span>
                </Link>

                <div className="flex items-center gap-8">
                    <Link href="/features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                        Fonctionnalités
                    </Link>

                    <SignedIn>
                        <Link href="/dashboard" className="text-sm font-medium text-white hover:text-gold-400 transition-colors border-l border-white/10 pl-8">
                            Accéder au Dashboard
                        </Link>
                    </SignedIn>

                    <SignedOut>
                        <Link href="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Connexion
                        </Link>
                        <Link href="/sign-up" className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors">
                            Démarrer
                        </Link>
                    </SignedOut>
                </div>
            </div>
        </nav>
    );
}
