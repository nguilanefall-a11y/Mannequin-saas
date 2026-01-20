'use server'

import prisma from '../prisma';
import { config } from '../config';

// 📁 Rule 1: Activation Automatique
// Checks if the model has all required VALID documents.
async function updateModelStatus(modelId: number) {
  const requiredTypes = ["CONTRAT", "CNI", "RIB"];

  const validDocs = await prisma.document.findMany({
    where: {
      modelId: modelId,
      statut: "VALIDE",
      type: { in: requiredTypes }
    },
    select: { type: true }
  });

  const hasAll = requiredTypes.every(type => validDocs.some(d => d.type === type));

  const newStatus = hasAll ? "ACTIF" : "INACTIF";

  await prisma.model.update({
    where: { id: modelId },
    data: { statut: newStatus }
  });

  return newStatus;
}

// 📁 Rule 4: Dossier Drive Automatique
// Placeholder for external storage integration.
async function createModelFolderStructure(prenom: string, nom: string) {
  console.log(`[DRIVE] Creating folder structure for: MODELS / ${nom} ${prenom} / Legal`);
  // TODO: Integrate with S3/Google Drive API here.
}

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createModel(formData: FormData) {
  // 1. Extract Data
  const data = {
    prenom: formData.get('prenom') as string,
    nom: formData.get('nom') as string,
    email: formData.get('email') as string,
    dateNaissance: formData.get('dateNaissance') ? new Date(formData.get('dateNaissance') as string) : new Date(),
    taille: parseFloat(formData.get('taille') as string || '0'),
    poids: parseFloat(formData.get('poids') as string || '0'),
    pointure: parseFloat(formData.get('pointure') as string || '0'),
    // Default values for fields not yet in the form, to avoid DB errors if they are required
    tourPoitrine: 0,
    tourTaille: 0,
    tourHanches: 0,
    yeux: 'Non renseigné',
    cheveux: 'Non renseigné',
    ville: 'Paris',
    pays: 'France',
    nationalite: 'Française',
    telephone: '',
    adresse: '',
    statut: 'INACTIF'
  };

  // 2. Create Model
  const model = await prisma.model.create({
    data: data
  });

  // 3. Trigger Rule 4
  await createModelFolderStructure(model.prenom, model.nom);

  // 4. Revalidate & Redirect
  revalidatePath('/models');
  redirect('/models');
}

export async function getModels() {
  return await prisma.model.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      photos: true
    }
  });
}

export async function getModelById(id: number) {
  return await prisma.model.findUnique({
    where: { id },
    include: {
      photos: true,
      documents: true,
      bookings: true
    }
  });
}
