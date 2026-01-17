import React from 'react';

interface StatCardProps {
    label: string;
    value: string | number;
}

export default function StatCard({ label, value }: StatCardProps) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
    );
}
