'use server'

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export interface DashboardStats {
    activeModels: number;
    incompleteFolders: number;
    pendingPayments: number;
    expiringContracts: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
    // 1. Active Models
    const activeModels = await prisma.model.count({
        where: { statut: "ACTIF" }
    });

    // 2. Incomplete Folders
    // Definition: Models that are NOT active OR lack specific docs.
    // Simplified for efficiency: Models that are NOT active.
    const incompleteFolders = await prisma.model.count({
        where: { statut: { not: "ACTIF" } }
    });

    // 3. Pending Payments
    // Sum of netModel for bookings that are FACTURE but not PAYE.
    // Assuming 'Pending' means widely "money waiting to be paid out or in".
    // Let's count Pending Invoicings (PREVU or EFFECTUE) + Unpaid Invoices (FACTURE).
    // User spec: "paiements en attente". Let's assume bookings marked as FACTURE.
    const pendingBookings = await prisma.booking.findMany({
        where: { statut: "FACTURE" }
    });
    const pendingPayments = pendingBookings.reduce((acc, b) => acc + b.netModel, 0);

    // 4. Expiring Contracts
    // Documents of type CONTRAT where expiration date is within 30 days.
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
        pendingPayments,
        expiringContracts
    };
}
