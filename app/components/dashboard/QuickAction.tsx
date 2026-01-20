import Link from 'next/link';
import React from 'react';

interface QuickActionProps {
    label: string;
    icon: string;
    href: string;
}

export default function QuickAction({ label, icon, href }: QuickActionProps) {
    return (
        <Link href={href} className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-gold-200 transition-all group">
            <span className="text-xl group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm font-bold text-gray-700 group-hover:text-gold-800">{label}</span>
            <span className="ml-auto text-gray-300 group-hover:text-gold-400">→</span>
        </Link>
    );
}
