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


// Mock Data for Smart Search
const MOCK_COMPANIES: any[] = [
    { nomSociete: 'Vogue France', contact: 'Eugénie Trochu', email: 'contact@vogue.fr', telephone: '01 55 55 55 55', adresse: '10 Avenue Hoche, 75008 Paris', siret: '302 505 845 00028' },
    { nomSociete: 'L\'Oréal Paris', contact: 'Responsable Casting', email: 'casting@loreal.com', telephone: '01 47 56 70 00', adresse: '14 Rue Royale, 75008 Paris', siret: '632 012 100 00011' },
    { nomSociete: 'Zara France', contact: 'Service Marketing', email: 'marketing@zara.com', telephone: '01 55 78 88 88', adresse: '88 Rue de Rivoli, 75004 Paris', siret: '348 991 555 00054' },
    { nomSociete: 'Elite Model', contact: 'Booking Table', email: 'booking@elitemodels.com', telephone: '01 40 44 32 22', adresse: '69 Avenue Franklin Roosevelt, 75008 Paris', siret: '315 456 123 00012' },
    { nomSociete: 'Dior', contact: 'Bureau Presse', email: 'presse@dior.com', telephone: '01 40 73 73 73', adresse: '30 Avenue Montaigne, 75008 Paris', siret: '552 065 187 00024' },
];

// Google Places API Integration
const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY;

export async function searchCompanies(query: string) {
    if (!query) return [];

    // 1. Try Google Places API if Key simulates
    if (GOOGLE_PLACES_KEY && GOOGLE_PLACES_KEY.length > 5) {
        try {
            const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Goog-Api-Key': GOOGLE_PLACES_KEY,
                    'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.internationalPhoneNumber,places.websiteUri'
                },
                body: JSON.stringify({
                    textQuery: query,
                    languageCode: 'fr'
                })
            });

            const data = await response.json();

            if (data.places) {
                return data.places.map((place: any) => ({
                    nomSociete: place.displayName?.text || '',
                    adresse: place.formattedAddress || '',
                    telephone: place.internationalPhoneNumber || '',
                    website: place.websiteUri || '',
                    contact: '', // Google doesn't give specific contact names usually
                    email: ''    // Google doesn't give emails aggressively
                }));
            }
        } catch (error) {
            console.error("Google Places API Error:", error);
            // Fallback to mock if API fails
        }
    }

    // 2. Fallback Mock Data (Simulated for Demo or if no Key)
    // Simulate API delay only if we fell back
    if (!GOOGLE_PLACES_KEY) await new Promise(resolve => setTimeout(resolve, 500));

    const lowerQ = query.toLowerCase();
    return MOCK_COMPANIES.filter(c => c.nomSociete.toLowerCase().includes(lowerQ));
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
