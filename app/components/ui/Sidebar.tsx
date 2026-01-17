'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Models', href: '/models' },
    { label: 'Bookings', href: '/bookings' },
    { label: 'Clients', href: '/clients' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <aside className="w-64 bg-gray-50 p-4">
      <div className="mb-8">
        <Link href="/">
          <h1 className="text-2xl font-bold">Mannequin SaaS</h1>
        </Link>
      </div>
      <nav>
        <ul>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-4 py-2 rounded-md ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}