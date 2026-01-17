import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
    log: ['info', 'warn', 'error'],
})

async function main() {
    console.log('🌱 Starting seeding...')

    // Clear existing data
    await prisma.document.deleteMany()
    await prisma.booking.deleteMany()
    await prisma.modelPhoto.deleteMany()
    await prisma.model.deleteMany()
    await prisma.client.deleteMany()

    // --- CLIENTS ---
    const clientVogue = await prisma.client.create({
        data: {
            nomSociete: "Vogue Paris",
            contact: "Emmanuelle Alt",
            email: "contact@vogue.fr",
            telephone: "+33 1 40 00 00 00",
            adresse: "Paris, France",
            siret: "12345678900001"
        }
    })

    // --- 1. CAMILLE (Blonde Française) ---
    const model1 = await prisma.model.create({
        data: {
            prenom: "Camille",
            nom: "Leroy-Beaulieu", // Plus chic
            nomDeScene: "Camille LB",
            dateNaissance: new Date('1998-04-12'),
            age: 27,
            nationalite: "Française",
            statut: "ACTIF",
            mineur: false,

            // Coordonnées
            email: "camille.lb@gmail.com",
            telephone: "+33 6 45 12 78 90",
            adresse: "12 Avenue Montaigne",
            ville: "Paris",
            pays: "France",

            // Mensurations
            taille: 178,
            poids: 56,
            tourPoitrine: 84,
            tourTaille: 60,
            tourHanches: 89,
            pointure: 39,
            yeux: "Bleus",
            cheveux: "Blonds",

            // New Fields
            specialites: "Fashion, Commercial, Editorial",
            instagram: "@camille_lb",
            tiktok: "@camille_style",
            followers: "45.2k",
        }
    })

    // Photos Camille (4 photos total now)
    await prisma.modelPhoto.createMany({
        data: [
            { url: "/models/camille/shot4.jpg", isMain: true, modelId: model1.id }, // New portrait
            { url: "/models/camille/shot1.jpg", isMain: false, modelId: model1.id },
            { url: "/models/camille/shot2.png", isMain: false, modelId: model1.id },
            { url: "/models/camille/shot3.jpg", isMain: false, modelId: model1.id }
        ]
    })

    await prisma.document.createMany({
        data: [
            { type: "CONTRAT", statut: "VALIDE", modelId: model1.id, fichier: "/docs/contrat_camille.pdf", dateExpiration: new Date('2028-01-01') },
            { type: "CNI", statut: "VALIDE", modelId: model1.id, fichier: "/docs/cni_camille.jpg" },
            { type: "RIB", statut: "VALIDE", modelId: model1.id, fichier: "/docs/rib_camille.pdf" }
        ]
    })

    // --- 2. LUCAS (Métis) ---
    const model2 = await prisma.model.create({
        data: {
            prenom: "Lucas",
            nom: "Silva-Santos",
            nomDeScene: "Lucas S.",
            dateNaissance: new Date('2000-08-25'),
            age: 25,
            nationalite: "Française / Brésilienne",
            statut: "ACTIF",
            mineur: false,

            // Coordonnées
            email: "lucas.silva@hotmail.com",
            telephone: "+33 7 89 45 23 10",
            adresse: "8 Rue de la République",
            ville: "Lyon",
            pays: "France",

            // Mensurations
            taille: 186,
            poids: 78,
            tourPoitrine: 99,
            tourTaille: 77,
            tourHanches: 95,
            pointure: 44,
            yeux: "Marrons",
            cheveux: "Noirs Bouclés",

            // New Fields
            specialites: "Sport, Lifestyle, Commercial",
            instagram: "@lucas_brazil",
            tiktok: null,
            followers: "12k",
        }
    })

    // Photos Lucas (3 photos total now)
    await prisma.modelPhoto.createMany({
        data: [
            { url: "/models/lucas/shot3.jpg", isMain: true, modelId: model2.id }, // New portrait
            { url: "/models/lucas/shot1.png", isMain: false, modelId: model2.id },
            { url: "/models/lucas/shot2.jpg", isMain: false, modelId: model2.id }
        ]
    })

    await prisma.document.createMany({
        data: [
            { type: "CONTRAT", statut: "VALIDE", modelId: model2.id, fichier: "/docs/contrat_lucas.pdf", dateExpiration: new Date('2027-06-01') },
            { type: "CONTRAT", statut: "VALIDE", modelId: model2.id, fichier: "/docs/contrat_lucas.pdf", dateExpiration: new Date('2027-06-01') },
            { type: "CNI", statut: "VALIDE", modelId: model2.id, fichier: "/docs/cni_lucas.jpg" }, // Will become passport_lucas in UI logic
            { type: "RIB", statut: "VALIDE", modelId: model2.id, fichier: "/docs/rib_lucas.pdf" }
        ]
    })


    // --- 3. WEI (Chinoise) ---
    const model3 = await prisma.model.create({
        data: {
            prenom: "Wei",
            nom: "Lin",
            nomDeScene: "Wei",
            dateNaissance: new Date('2003-02-14'),
            age: 23,
            nationalite: "Chinoise",
            statut: "INACTIF", // Manque documents
            mineur: false,

            // Coordonnées
            email: "wei.lin@fashion.cn",
            telephone: "+33 6 01 02 03 04",
            adresse: "25 Rue du Faubourg Saint-Honoré",
            ville: "Paris",
            pays: "France",

            // Mensurations
            taille: 177,
            poids: 53,
            tourPoitrine: 81,
            tourTaille: 59,
            tourHanches: 87,
            pointure: 38,
            yeux: "Marrons Foncé",
            cheveux: "Noirs Raides",

            // New Fields
            specialites: "High Fashion, Runway, Beauty",
            instagram: "@wei_lin_official",
            tiktok: "@wei_model",
            followers: "890k",
        }
    })

    // Photos Wei (3 photos new)
    await prisma.modelPhoto.createMany({
        data: [
            { url: "/models/wei/shot1.jpg", isMain: true, modelId: model3.id },
            { url: "/models/wei/shot2.jpg", isMain: false, modelId: model3.id },
            { url: "/models/wei/shot3.jpg", isMain: false, modelId: model3.id }
        ]
    })

    await prisma.document.createMany({
        data: [
            { type: "CONTRAT", statut: "VALIDE", modelId: model3.id, fichier: "/docs/contrat_wei.pdf", dateExpiration: new Date('2026-12-31') },
        ]
    })

    // --- BOOKINGS DE TEST ---
    await prisma.booking.create({
        data: {
            modelId: model1.id, // Camille
            clientId: clientVogue.id,
            projet: "Campagne Hiver 2026",
            date: new Date('2026-03-10'),
            cachetBrut: 5000,
            commission: 20,
            netModel: 4000,
            statut: "PREVU"
        }
    })

    console.log('✅ Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
