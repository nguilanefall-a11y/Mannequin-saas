'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Vue d\'ensemble', href: '/dashboard' },
    { label: 'Modèles', href: '/models' },
    { label: 'Clients', href: '/clients' },
    { label: 'Bookings', href: '/bookings' },
    { label: 'Documents', href: '/documents' },
    { label: 'Paramètres', href: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 p-6 z-50">
      <div className="glass-panel h-full w-full rounded-2xl p-6 flex flex-col justify-between">

        {/* LOGO */}
        <div className="mb-10 text-center">
          <Link href="/dashboard">
            <h1 className="font-display text-4xl font-black tracking-tighter text-black mb-1">
              HOME<span className="text-gold-500">.</span>
            </h1>
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gray-400">
              Agency
            </p>
          </Link>
        </div>

        {/* NAV */}
        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                      ? 'bg-gold-50 text-gold-900 shadow-sm border border-gold-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                      }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* FOOTER USER */}
        <div className="pt-6 border-t border-gray-100/50">
          <div className="flex items-center gap-3">
            <UserButton />
            <div>
              <p className="text-xs font-bold text-gray-900">Mon Compte</p>
              <p className="text-[10px] text-gray-400">Agence</p>
            </div>
          </div>
        </div>


      </div>
    </aside>
  );
}