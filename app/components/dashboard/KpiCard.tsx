import React from 'react';

interface KpiCardProps {
    title: string;
    value: string;
    trend?: string;
    icon: string;
    subtitle?: string;
    isAlert?: boolean;
}

export default function KpiCard({ title, value, trend, icon, subtitle, isAlert = false }: KpiCardProps) {
    return (
        <div className="glass-panel p-6 rounded-2xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute right-[-20px] top-[-20px] text-[100px] opacity-5 group-hover:opacity-10 transition-opacity select-none pointer-events-none grayscale">
                {icon}
            </div>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">{title}</h3>
                <span className="text-2xl">{icon}</span>
            </div>
            <div className="flex items-baseline gap-2">
                <p className="text-4xl font-display font-bold text-gray-900">{value}</p>
                {subtitle && <span className="text-sm text-gray-500 font-medium">{subtitle}</span>}
            </div>
            {trend && (
                <p className={`text-xs font-medium mt-2 ${isAlert ? 'text-red-500' : 'text-green-600'}`}>
                    {trend}
                </p>
            )}
        </div>
    );
}
