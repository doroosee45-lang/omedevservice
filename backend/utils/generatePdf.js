// // src/utils/generatePdf.js - Génération de PDF pour audits, devis, factures
// const PDFDocument = require('pdfkit');
// const fs = require('fs');
// const path = require('path');

// // Créer le dossier uploads/pdf s'il n'existe pas
// const ensureDir = (dir) => {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }
// };

// // Configuration commune des polices et couleurs
// const COLORS = {
//   primary: '#2563eb',   // bleu
//   secondary: '#06b6d4', // cyan
//   success: '#10b981',   // émeraude
//   warning: '#f59e0b',   // ambre
//   danger: '#ef4444',    // rouge
//   dark: '#1e293b',      // slate-800
//   light: '#f8fafc',     // slate-50
//   text: '#334155',      // slate-700
//   textLight: '#64748b', // slate-500
//   white: '#ffffff',
// };

// // Styles de police
// const fonts = {
//   title: { size: 24, bold: true },
//   heading: { size: 16, bold: true },
//   subheading: { size: 12, bold: true },
//   body: { size: 10, bold: false },
//   small: { size: 8, bold: false },
// };

// /**
//  * Génère un PDF pour un rapport d'audit
//  * @param {Object} audit - Données de l'audit (modèle AuditRequest)
//  * @returns {Promise<string>} - Chemin du fichier PDF généré
//  */
// const generateAuditPDF = async (audit) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ margin: 50, size: 'A4' });
//     const filename = `audit_${audit.requestNumber}_${Date.now()}.pdf`;
//     const filepath = path.join(__dirname, '../../uploads/pdf', filename);
    
//     ensureDir(path.join(__dirname, '../../uploads/pdf'));
    
//     const stream = fs.createWriteStream(filepath);
//     doc.pipe(stream);
    
//     // ========== EN-TÊTE ==========
//     doc.fontSize(fonts.title.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('RAPPORT D\'AUDIT', { align: 'center' });
//     doc.moveDown(0.5);
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.textLight)
//        .text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' });
//     doc.text(`Référence: ${audit.requestNumber}`, { align: 'right' });
//     doc.moveDown(1);
    
//     // ========== INFORMATIONS CLIENT ==========
//     doc.fontSize(fonts.heading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Informations du client', { underline: true });
//     doc.moveDown(0.5);
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.text);
    
//     const clientInfo = [
//       `Entreprise: ${audit.companyName || 'Non renseigné'}`,
//       `Secteur: ${audit.sector || 'Non renseigné'}`,
//       `Effectif: ${audit.employeeCount || 'Non renseigné'} employés`,
//       `Contact: ${audit.name}`,
//       `Email: ${audit.email}`,
//       `Téléphone: ${audit.phone || 'Non renseigné'}`,
//     ];
//     clientInfo.forEach(line => doc.text(line));
//     doc.moveDown(1);
    
//     // ========== SCORE GLOBAL ==========
//     doc.fontSize(fonts.heading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Résultats de l\'audit', { underline: true });
//     doc.moveDown(0.5);
    
//     const score = audit.auditScore || 0;
//     let scoreColor = COLORS.success;
//     if (score < 40) scoreColor = COLORS.danger;
//     else if (score < 60) scoreColor = COLORS.warning;
//     else if (score < 80) scoreColor = COLORS.primary;
    
//     doc.fontSize(fonts.heading.size)
//        .font('Helvetica-Bold')
//        .fillColor(scoreColor)
//        .text(`Score global: ${score}/100`, { continued: true });
//     doc.fillColor(COLORS.text)
//        .font('Helvetica')
//        .text(` - Niveau: ${audit.auditLevel || 'Non évalué'}`, { align: 'right' });
//     doc.moveDown(0.5);
    
//     // Barre de progression
//     const barWidth = 400;
//     const barHeight = 20;
//     const filledWidth = (score / 100) * barWidth;
//     const y = doc.y;
    
//     doc.rect(50, y, barWidth, barHeight)
//        .fillColor('#e2e8f0')
//        .fill();
//     doc.rect(50, y, filledWidth, barHeight)
//        .fillColor(scoreColor)
//        .fill();
//     doc.moveDown(2);
    
//     // ========== RECOMMANDATIONS ==========
//     doc.fontSize(fonts.heading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Recommandations prioritaires', { underline: true });
//     doc.moveDown(0.5);
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.text);
    
//     const recommendations = audit.recommendations || [];
//     recommendations.forEach((rec, index) => {
//       doc.text(`${index + 1}. ${rec}`);
//       doc.moveDown(0.3);
//     });
//     doc.moveDown(1);
    
//     // ========== DÉTAIL DE L'ÉVALUATION ==========
//     doc.fontSize(fonts.heading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Détail de l\'évaluation', { underline: true });
//     doc.moveDown(0.5);
    
//     // Infrastructure
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.secondary)
//        .text('Infrastructure réseau');
//     doc.moveDown(0.3);
    
//     const infraItems = [
//       { label: 'Réseau informatique', value: audit.hasNetwork === 'yes' ? 'Oui' : audit.hasNetwork === 'no' ? 'Non' : 'Partiellement' },
//       { label: 'Serveurs', value: audit.hasServer === 'yes' ? 'Oui' : audit.hasServer === 'no' ? 'Non' : 'Cloud uniquement' },
//       { label: 'Pare-feu', value: audit.hasFirewall === 'yes' ? 'Oui' : audit.hasFirewall === 'no' ? 'Non' : 'Basique' },
//       { label: 'Débit internet', value: audit.internetSpeed || 'Non renseigné' },
//     ];
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.text);
//     infraItems.forEach(item => {
//       doc.text(`• ${item.label}: ${item.value}`);
//     });
//     doc.moveDown(0.5);
    
//     // Sécurité
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.secondary)
//        .text('Sécurité informatique');
//     doc.moveDown(0.3);
    
//     const securityItems = [
//       { label: 'Antivirus', value: audit.hasAntivirus === 'yes' ? 'Oui, centralisé' : audit.hasAntivirus === 'no' ? 'Non' : 'Basique' },
//       { label: 'Sauvegarde', value: audit.hasBackup === 'yes' ? 'Oui' : audit.hasBackup === 'no' ? 'Non' : 'Partiel' },
//       { label: 'Politique cybersécurité', value: audit.hasCyberPolicy === 'yes' ? 'Oui' : audit.hasCyberPolicy === 'no' ? 'Non' : 'En cours' },
//       { label: 'Dernier audit', value: audit.lastAudit || 'Jamais' },
//     ];
    
//     securityItems.forEach(item => {
//       doc.text(`• ${item.label}: ${item.value}`);
//     });
//     doc.moveDown(1);
    
//     // ========== PROBLÈMES IDENTIFIÉS ==========
//     if (audit.mainIssues && audit.mainIssues.length > 0) {
//       doc.fontSize(fonts.heading.size)
//          .font('Helvetica-Bold')
//          .fillColor(COLORS.primary)
//          .text('Problèmes identifiés', { underline: true });
//       doc.moveDown(0.5);
      
//       audit.mainIssues.forEach(issue => {
//         doc.fontSize(fonts.body.size)
//            .fillColor(COLORS.danger)
//            .text(`⚠ ${issue}`);
//       });
//       doc.moveDown(1);
//     }
    
//     // ========== SERVICES PRIORITAIRES ==========
//     if (audit.priorityServices && audit.priorityServices.length > 0) {
//       doc.fontSize(fonts.heading.size)
//          .font('Helvetica-Bold')
//          .fillColor(COLORS.primary)
//          .text('Services prioritaires', { underline: true });
//       doc.moveDown(0.5);
      
//       audit.priorityServices.forEach(service => {
//         doc.fontSize(fonts.body.size)
//            .fillColor(COLORS.text)
//            .text(`✓ ${service}`);
//       });
//       doc.moveDown(1);
//     }
    
//     // ========== PIED DE PAGE ==========
//     const pageCount = doc.bufferedPageRange().count;
//     for (let i = 0; i < pageCount; i++) {
//       doc.switchToPage(i);
//       doc.fontSize(fonts.small.size)
//          .fillColor(COLORS.textLight)
//          .text(
//            `OMDEVE Services - Rapport d'audit ${audit.requestNumber} - Page ${i + 1}/${pageCount}`,
//            50,
//            doc.page.height - 50,
//            { align: 'center' }
//          );
//     }
    
//     doc.end();
    
//     stream.on('finish', () => {
//       resolve(`/uploads/pdf/${filename}`);
//     });
    
//     stream.on('error', reject);
//   });
// };

// /**
//  * Génère un PDF pour un devis
//  * @param {Object} devis - Données du devis
//  * @param {Object} company - Informations de l'entreprise
//  * @returns {Promise<string>} - Chemin du fichier PDF
//  */
// const generateDevisPDF = async (devis, company) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ margin: 50, size: 'A4' });
//     const filename = `devis_${devis.requestNumber}_${Date.now()}.pdf`;
//     const filepath = path.join(__dirname, '../../uploads/pdf', filename);
    
//     ensureDir(path.join(__dirname, '../../uploads/pdf'));
    
//     const stream = fs.createWriteStream(filepath);
//     doc.pipe(stream);
    
//     // En-tête avec logo
//     doc.fontSize(fonts.title.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('DEVIS', { align: 'center' });
//     doc.moveDown(0.5);
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.textLight)
//        .text(`N° ${devis.requestNumber}`, { align: 'right' });
//     doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' });
//     doc.moveDown(1);
    
//     // Émetteur et client
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Émetteur', { underline: true });
//     doc.moveDown(0.3);
    
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica')
//        .fillColor(COLORS.text)
//        .text(company.name)
//        .text(company.address)
//        .text(`Tél: ${company.phone} - Email: ${company.email}`);
//     doc.moveDown(1);
    
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Client', { underline: true });
//     doc.moveDown(0.3);
    
//     doc.fontSize(fonts.body.size)
//        .fillColor(COLORS.text)
//        .text(devis.fullName || devis.clientName || 'Client')
//        .text(devis.email || '')
//        .text(devis.phone || '');
//     doc.moveDown(1);
    
//     // Tableau des prestations
//     const tableTop = doc.y;
//     const headers = ['Description', 'Quantité', 'Prix HT', 'TVA', 'Total TTC'];
//     const colWidths = [200, 60, 80, 60, 80];
//     let currentY = tableTop;
    
//     // En-têtes du tableau
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.white);
    
//     let x = 50;
//     headers.forEach((header, i) => {
//       doc.rect(x, currentY, colWidths[i], 25)
//          .fillColor(COLORS.primary)
//          .fill();
//       doc.fillColor(COLORS.white)
//          .text(header, x + 5, currentY + 8, { width: colWidths[i] - 10, align: 'center' });
//       x += colWidths[i];
//     });
    
//     currentY += 25;
//     doc.fillColor(COLORS.text);
    
//     // Lignes du tableau
//     const services = devis.services || [];
//     const montantHT = devis.estimatedAmount || 0;
//     const tva = montantHT * 0.2;
//     const totalTTC = montantHT + tva;
    
//     services.forEach((service, index) => {
//       x = 50;
//       doc.rect(x, currentY, colWidths[0], 20)
//          .fillColor(index % 2 === 0 ? COLORS.light : COLORS.white)
//          .fill();
//       doc.fillColor(COLORS.text)
//          .text(service, x + 5, currentY + 5, { width: colWidths[0] - 10 });
//       x += colWidths[0];
      
//       doc.rect(x, currentY, colWidths[1], 20)
//          .fillColor(index % 2 === 0 ? COLORS.light : COLORS.white)
//          .fill();
//       doc.text('1', x + 5, currentY + 5);
//       x += colWidths[1];
      
//       doc.rect(x, currentY, colWidths[2], 20)
//          .fillColor(index % 2 === 0 ? COLORS.light : COLORS.white)
//          .fill();
//       doc.text(`${montantHT.toLocaleString('fr-FR')} €`, x + 5, currentY + 5);
//       x += colWidths[2];
      
//       doc.rect(x, currentY, colWidths[3], 20)
//          .fillColor(index % 2 === 0 ? COLORS.light : COLORS.white)
//          .fill();
//       doc.text('20%', x + 5, currentY + 5);
//       x += colWidths[3];
      
//       doc.rect(x, currentY, colWidths[4], 20)
//          .fillColor(index % 2 === 0 ? COLORS.light : COLORS.white)
//          .fill();
//       doc.text(`${totalTTC.toLocaleString('fr-FR')} €`, x + 5, currentY + 5);
      
//       currentY += 20;
//     });
    
//     // Totaux
//     currentY += 10;
//     doc.fontSize(fonts.body.size)
//        .font('Helvetica-Bold')
//        .text(`Sous-total HT: ${montantHT.toLocaleString('fr-FR')} €`, 350, currentY);
//     currentY += 15;
//     doc.text(`TVA (20%): ${tva.toLocaleString('fr-FR')} €`, 350, currentY);
//     currentY += 15;
//     doc.fontSize(fonts.heading.size)
//        .fillColor(COLORS.success)
//        .text(`Total TTC: ${totalTTC.toLocaleString('fr-FR')} €`, 350, currentY);
    
//     // Conditions
//     doc.moveDown(2);
//     doc.fontSize(fonts.small.size)
//        .fillColor(COLORS.textLight)
//        .text('Conditions de règlement :', { underline: true });
//     doc.text('• Ce devis est valable 30 jours à compter de sa date d\'émission.');
//     doc.text('• Un acompte de 30% est demandé à la commande.');
//     doc.text('• Le solde est dû à la livraison.');
    
//     doc.end();
    
//     stream.on('finish', () => {
//       resolve(`/uploads/pdf/${filename}`);
//     });
    
//     stream.on('error', reject);
//   });
// };

// /**
//  * Génère un PDF pour une facture
//  * @param {Object} invoice - Données de la facture
//  * @param {Object} company - Informations de l'entreprise
//  * @returns {Promise<string>} - Chemin du fichier PDF
//  */
// const generateInvoicePDF = async (invoice, company) => {
//   // Structure similaire au devis mais avec des mentions légales différentes
//   // Implémentation similaire à generateDevisPDF avec adaptations
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument({ margin: 50, size: 'A4' });
//     const filename = `facture_${invoice.invoiceNumber}_${Date.now()}.pdf`;
//     const filepath = path.join(__dirname, '../../uploads/pdf', filename);
    
//     ensureDir(path.join(__dirname, '../../uploads/pdf'));
    
//     const stream = fs.createWriteStream(filepath);
//     doc.pipe(stream);
    
//     doc.fontSize(fonts.title.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('FACTURE', { align: 'center' });
//     doc.moveDown(0.5);
    
//     doc.fontSize(fonts.body.size)
//        .fillColor(COLORS.textLight)
//        .text(`N° ${invoice.invoiceNumber}`, { align: 'right' })
//        .text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' });
//     doc.moveDown(1);
    
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Émetteur', { underline: true });
//     doc.moveDown(0.3);
//     doc.fontSize(fonts.body.size)
//        .fillColor(COLORS.text)
//        .text(company.name)
//        .text(company.address)
//        .text(`SIRET: ${company.siret} - TVA: ${company.tva}`)
//        .text(`Tél: ${company.phone} - Email: ${company.email}`);
//     doc.moveDown(1);
    
//     doc.fontSize(fonts.subheading.size)
//        .font('Helvetica-Bold')
//        .fillColor(COLORS.primary)
//        .text('Client', { underline: true });
//     doc.moveDown(0.3);
//     doc.fontSize(fonts.body.size)
//        .fillColor(COLORS.text)
//        .text(invoice.clientName)
//        .text(invoice.clientAddress || '');
//     doc.moveDown(1);
    
//     // Tableau des prestations (similaire au devis)
//     // ... (code similaire)
    
//     doc.text('Facture acquittée', { align: 'center' });
//     doc.end();
    
//     stream.on('finish', () => {
//       resolve(`/uploads/pdf/${filename}`);
//     });
    
//     stream.on('error', reject);
//   });
// };

// module.exports = {
//   generateAuditPDF,
//   generateDevisPDF,
//   generateInvoicePDF,
// };


// src/utils/generatePdf.js
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Génère un rapport PDF pour un audit
 * @param {Object} audit - L'objet audit (AuditRequest)
 * @returns {Promise<string>} Chemin du fichier PDF généré
 */
const generateAuditPDF = async (audit) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const filename = `audit_${audit.requestNumber}_${Date.now()}.pdf`;
    const uploadDir = path.join(__dirname, '../../uploads/audits');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // En-tête
    doc.fontSize(20).font('Helvetica-Bold').text('RAPPORT D\'AUDIT', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica')
      .text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' })
      .text(`Référence : ${audit.requestNumber}`, { align: 'right' });
    doc.moveDown(2);

    // Informations client
    doc.fontSize(14).font('Helvetica-Bold').text('Informations du client', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica')
      .text(`Entreprise : ${audit.companyName || 'Non renseigné'}`)
      .text(`Secteur : ${audit.sector || 'Non renseigné'}`)
      .text(`Contact : ${audit.name}`)
      .text(`Email : ${audit.email}`)
      .text(`Téléphone : ${audit.phone || 'Non renseigné'}`);
    doc.moveDown();

    // Résultats
    doc.fontSize(14).font('Helvetica-Bold').text('Résultats de l\'audit', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).font('Helvetica-Bold').text(`Score global : ${audit.auditScore}/100`);
    let scoreColor = 'black';
    if (audit.auditLevel === 'Excellent') scoreColor = 'green';
    else if (audit.auditLevel === 'Bon') scoreColor = 'blue';
    else if (audit.auditLevel === 'Moyen') scoreColor = 'orange';
    else scoreColor = 'red';
    doc.fillColor(scoreColor).text(`Niveau : ${audit.auditLevel}`).fillColor('black');
    doc.moveDown();

    // Barre de progression
    const barWidth = 400;
    const barHeight = 20;
    const filledWidth = (audit.auditScore / 100) * barWidth;
    doc.rect(50, doc.y, barWidth, barHeight).fillColor('#e0e0e0').fill();
    doc.rect(50, doc.y, filledWidth, barHeight).fillColor(scoreColor).fill();
    doc.moveDown(2);

    // Recommandations
    doc.fontSize(14).font('Helvetica-Bold').text('Recommandations', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(10).font('Helvetica');
    (audit.recommendations || []).forEach((rec, idx) => {
      doc.text(`${idx + 1}. ${rec}`);
      doc.moveDown(0.3);
    });
    doc.moveDown();

    // Détail des réponses
    doc.fontSize(14).font('Helvetica-Bold').text('Détail de l\'évaluation', { underline: true });
    doc.moveDown(0.5);
    const sections = [
      {
        title: 'Infrastructure réseau',
        items: [
          { label: 'Réseau informatique', value: audit.hasNetwork === 'yes' ? 'Oui' : audit.hasNetwork === 'no' ? 'Non' : 'Partiellement' },
          { label: 'Serveurs', value: audit.hasServer === 'yes' ? 'Oui' : audit.hasServer === 'no' ? 'Non' : 'Cloud uniquement' },
          { label: 'Pare-feu', value: audit.hasFirewall === 'yes' ? 'Oui' : audit.hasFirewall === 'no' ? 'Non' : 'Basique' },
          { label: 'Débit internet', value: audit.internetSpeed || 'Non renseigné' },
        ]
      },
      {
        title: 'Sécurité',
        items: [
          { label: 'Antivirus', value: audit.hasAntivirus === 'yes' ? 'Oui, centralisé' : audit.hasAntivirus === 'no' ? 'Non' : 'Basique' },
          { label: 'Sauvegarde', value: audit.hasBackup === 'yes' ? 'Oui' : audit.hasBackup === 'no' ? 'Non' : 'Partiel' },
          { label: 'Politique cybersécurité', value: audit.hasCyberPolicy === 'yes' ? 'Oui' : audit.hasCyberPolicy === 'no' ? 'Non' : 'En cours' },
          { label: 'Dernier audit', value: audit.lastAudit || 'Jamais' },
        ]
      }
    ];
    sections.forEach(section => {
      doc.fontSize(12).font('Helvetica-Bold').text(section.title);
      doc.moveDown(0.3);
      section.items.forEach(item => {
        doc.fontSize(10).font('Helvetica').text(`• ${item.label}: ${item.value}`);
      });
      doc.moveDown();
    });

    // Problèmes identifiés
    if (audit.mainIssues && audit.mainIssues.length) {
      doc.fontSize(12).font('Helvetica-Bold').text('Problèmes identifiés');
      doc.moveDown(0.3);
      audit.mainIssues.forEach(issue => {
        doc.fontSize(10).font('Helvetica').text(`• ${issue}`);
      });
      doc.moveDown();
    }

    // Footer
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).fillColor('gray')
        .text(
          `OMDEVE Services - Rapport d'audit ${audit.requestNumber} - Page ${i + 1}/${pageCount}`,
          50,
          doc.page.height - 50,
          { align: 'center' }
        );
    }
    doc.end();

    stream.on('finish', () => resolve(`/uploads/audits/${filename}`));
    stream.on('error', reject);
  });
};

/**
 * Génère un devis au format PDF (facture)
 * @param {Object} devis - Objet devis avec toutes les informations
 * @returns {Promise<string>} Chemin du fichier PDF
 */
const generateDevisPDF = async (devis) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const filename = `devis_${devis.requestNumber}_${Date.now()}.pdf`;
    const uploadDir = path.join(__dirname, '../../uploads/devis');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    const filepath = path.join(uploadDir, filename);
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Header
    doc.fontSize(20).font('Helvetica-Bold').text('DEVIS', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica')
      .text(`Date : ${new Date().toLocaleDateString('fr-FR')}`, { align: 'right' })
      .text(`N° : ${devis.requestNumber}`, { align: 'right' });
    doc.moveDown(2);

    // Client / Émetteur
    doc.fontSize(12).font('Helvetica-Bold').text('OMDEVE Services', { underline: true });
    doc.fontSize(10).font('Helvetica')
      .text('Avenue Kabmabre n°75, Lingwala, Kinshasa')
      .text('+243 555 503 59')
      .text('omedevservices@gmail.com');
    doc.moveDown();
    doc.fontSize(12).font('Helvetica-Bold').text('Client :', { underline: true });
    doc.fontSize(10).font('Helvetica')
      .text(`Nom : ${devis.user?.name || 'Client'}`)
      .text(`Email : ${devis.user?.email || 'Non renseigné'}`);
    doc.moveDown();

    // Tableau des prestations
    doc.fontSize(12).font('Helvetica-Bold').text('Détail de la prestation', { underline: true });
    doc.moveDown(0.5);
    const tableTop = doc.y;
    doc.fontSize(10).font('Helvetica-Bold')
      .text('Service', 50, tableTop)
      .text('Description', 200, tableTop)
      .text('Montant', 450, tableTop, { align: 'right' });
    doc.moveDown();
    doc.fontSize(10).font('Helvetica')
      .text(devis.services?.join(', ') || 'Service non spécifié', 50)
      .text(devis.description || '', 200, doc.y - 15, { width: 200 })
      .text(devis.estimatedAmount ? `${devis.estimatedAmount} €` : 'Sur devis', 450, doc.y - 15, { align: 'right' });
    doc.moveDown(2);

    // Total
    if (devis.estimatedAmount) {
      doc.fontSize(12).font('Helvetica-Bold')
        .text(`Total TTC : ${devis.estimatedAmount} €`, { align: 'right' });
    }
    doc.moveDown();
    doc.fontSize(8).font('Helvetica')
      .text('Ce devis est valable 30 jours. Merci de nous contacter pour toute question.', { align: 'center' });

    // Footer
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
      doc.switchToPage(i);
      doc.fontSize(8).fillColor('gray')
        .text(
          `OMDEVE Services - Devis ${devis.requestNumber} - Page ${i + 1}/${pageCount}`,
          50,
          doc.page.height - 50,
          { align: 'center' }
        );
    }
    doc.end();

    stream.on('finish', () => resolve(`/uploads/devis/${filename}`));
    stream.on('error', reject);
  });
};




module.exports = { generateAuditPDF, generateDevisPDF };