'use server'

import prisma from '../prisma';

// 📁 Rule 2: Blocage Booking
// Blocks booking creation if model is not ACTIF.
export async function createBooking(data: any) {
    // 1. Verify Model Status
    const model = await prisma.model.findUnique({
        where: { id: data.modelId },
        select: { statut: true }
    });

    if (!model) throw new Error("Model not found");

    if (model.statut !== "ACTIF") {
        throw new Error("BLOCKAGE: Cannot create booking for a non-ACTIVE model.");
    }

    // 2. Financial Calculations
    const cachetBrut = parseFloat(data.cachetBrut);
    const commissionPercent = data.commission || 20.0;
    const netModel = cachetBrut * (1 - commissionPercent / 100);

    // 3. Create Booking
    const booking = await prisma.booking.create({
        data: {
            modelId: data.modelId,
            clientId: data.clientId,
            projet: data.projet,
            date: new Date(data.date),
            cachetBrut: cachetBrut,
            commission: commissionPercent,
            netModel: netModel,
            statut: "PREVU"
        }
    });

    return booking;
}

export async function getBookings() {
    return await prisma.booking.findMany({
        include: {
            model: true,
            client: true
        },
        orderBy: { date: 'desc' }
    });
}
