import { jsPDF } from "jspdf";

export const generateContractPDF = (data: any) => {
    const doc = new jsPDF();

    // Branding
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("HOME.", 20, 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("AGENCY MANAGEMENT", 20, 25);

    // Document Title
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRAT DE PRESTATION", 105, 40, { align: "center" });

    // Date
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 50);

    // Client Info
    doc.setFont("helvetica", "bold");
    doc.text("CLIENT:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Société: ${data.clientName || 'N/A'}`, 20, 75);
    doc.text(`Adresse: ${data.clientAddress || 'N/A'}`, 20, 80);
    doc.text(`SIRET: ${data.clientSiret || 'N/A'}`, 20, 85);

    // Model Info
    doc.setFont("helvetica", "bold");
    doc.text("MANNEQUIN:", 120, 70);
    doc.setFont("helvetica", "normal");
    doc.text(`Nom: ${data.modelName || 'N/A'}`, 120, 75);

    // Mission Details
    doc.line(20, 100, 190, 100);
    doc.setFont("helvetica", "bold");
    doc.text("DÉTAILS DE LA MISSION", 20, 110);

    doc.setFont("helvetica", "normal");
    doc.text(`Projet: ${data.projectName || 'Shooting Photo'}`, 20, 120);
    doc.text(`Date de prestation: ${data.missionDate ? new Date(data.missionDate).toLocaleDateString() : 'TBD'}`, 20, 125);
    doc.text(`Lieu: ${data.location || 'Paris'}`, 20, 130);
    doc.text(`Utilisation: ${data.usageRights || 'E-commerce, 1 an'}`, 20, 135);

    // Financials
    doc.line(20, 150, 190, 150);
    doc.text(`Cachet Brut: ${data.amount || 0} €`, 20, 160);
    doc.text(`Commission Agence (20%): ${(data.amount || 0) * 0.2} €`, 20, 165);

    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL NET A PAYER: ${(data.amount || 0) * 1.2} €`, 20, 175);

    // Signatures
    doc.text("Pour l'Agence", 40, 220);
    doc.text("Pour le Client", 140, 220);

    // Footer
    doc.setFontSize(8);
    doc.text("HOME. Agency - 10 Rue de la Paix, 75002 Paris - SIRET 123 456 789", 105, 280, { align: "center" });

    doc.save(`Contrat_${data.clientName}_${new Date().toISOString().split('T')[0]}.pdf`);
};
