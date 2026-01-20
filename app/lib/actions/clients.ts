'use server'

import prisma from '../prisma';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createClient(formData: FormData) {
    // 1. Extract Data
    const data = {
        nomSociete: formData.get('nomSociete') as string,
        contact: formData.get('contact') as string,
        email: formData.get('email') as string,
        telephone: formData.get('telephone') as string,
        adresse: formData.get('adresse') as string,
        siret: formData.get('siret') as string,
    };

    // 2. Create Client
    await prisma.client.create({
        data: data
    });

    // 3. Revalidate & Redirect
    revalidatePath('/clients');
    redirect('/clients');
}

export async function getClients() {
    return await prisma.client.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
            _count: {
                select: { bookings: true, documents: true }
            }
        }
    });
}
