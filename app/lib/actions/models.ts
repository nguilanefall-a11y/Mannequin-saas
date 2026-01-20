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

export async function createModel(data: any) {
  // 1. Create Model
  const model = await prisma.model.create({
    data: {
      prenom: data.prenom,
      nom: data.nom,
      // ... assume other fields mapping from input
      email: data.email,
      telephone: data.telephone,
      adresse: data.adresse,
      ville: data.ville,
      pays: data.pays,
      dateNaissance: new Date(data.dateNaissance),
      nationalite: data.nationalite,
      taille: parseFloat(data.taille),
      poids: parseFloat(data.poids),
      tourPoitrine: parseFloat(data.tourPoitrine),
      tourTaille: parseFloat(data.tourTaille),
      tourHanches: parseFloat(data.tourHanches),
      pointure: parseFloat(data.pointure),
      yeux: data.yeux,
      cheveux: data.cheveux,
    }
  });

  // 2. Trigger Rule 4
  await createModelFolderStructure(model.prenom, model.nom);

  return model;
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
