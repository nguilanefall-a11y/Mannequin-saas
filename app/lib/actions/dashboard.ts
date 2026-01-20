'use server'

import prisma from '../prisma';

export interface DashboardStats {
    activeModels: number;
    incompleteFolders: number;
    revenue: number;
    expiringContracts: number;
}

export type RecentActivityItem = {
    id: number;
    type: 'contract' | 'invoice' | 'booking';
    title: string;
    entity: string;
    date: Date;
    status: string;
    href: string;
    description?: string;
};

export async function getDashboardStats(): Promise<DashboardStats> {
    // 1. Active Models
    const activeModels = await prisma.model.count({
        where: { statut: "ACTIF" }
    });

    // 2. Incomplete Folders
    const incompleteFolders = await prisma.model.count({
        where: { statut: { not: "ACTIF" } }
    });

    // 3. Revenue
    const bookings = await prisma.booking.findMany({
        where: {
            statut: { in: ["FACTURE", "PAYE"] }
        }
    });
    const revenue = bookings.reduce((acc, b) => acc + b.cachetBrut, 0);

    // 4. Expiring Contracts
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const now = new Date();

    const expiringContracts = await prisma.document.count({
        where: {
            type: "CONTRAT",
            dateExpiration: {
                gte: now,
                lte: thirtyDaysFromNow
            }
        }
    });

    return {
        activeModels,
        incompleteFolders,
        revenue,
        expiringContracts
    };
}

export async function getRecentActivity(): Promise<RecentActivityItem[]> {
    // Fetch last 5 documents
    const documents = await prisma.document.findMany({
        take: 3,
        orderBy: { date: 'desc' },
        include: { model: true, client: true }
    });

    // Fetch last 2 bookings
    const bookings = await prisma.booking.findMany({
        take: 2,
        orderBy: { createdAt: 'desc' },
        include: { model: true, client: true }
    });

    // Map to generic activity format
    const docItems: RecentActivityItem[] = documents.map(d => ({
        id: d.id,
        type: d.type === 'CONTRAT' ? 'contract' : 'invoice',
        title: d.type === 'CONTRAT' ? 'Contrat' : 'Document',
        entity: d.client?.nomSociete || `${d.model?.prenom} ${d.model?.nom}`,
        date: d.date,
        status: d.statut,
        href: `/documents`,
        description: d.type
    }));

    const bookingItems: RecentActivityItem[] = bookings.map(b => ({
        id: b.id,
        type: 'booking',
        title: `Booking: ${b.projet}`,
        entity: b.client?.nomSociete || 'Client Inconnu',
        date: b.createdAt,
        status: b.statut,
        href: `/bookings?id=${b.id}`
    }));

    // Merge and sort
    return [...docItems, ...bookingItems]
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .slice(0, 5);
}
