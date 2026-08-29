// src/utils/generatePdf.js
// Génération des documents PDF (rapports d'audit, devis) — identité OMEDEV Services
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ------------------------------------------------------------
// Palette OMEDEV (identique à celle utilisée dans les rapports d'audit)
// ------------------------------------------------------------
const C = {
  navy:       '#0d1b2a',
  navyMid:    '#112240',
  blue:       '#1565c0',
  blueBright: '#2979ff',
  cyan:       '#00e5ff',
  green:      '#00c853',
  orange:     '#f57c00',
  red:        '#c62828',
  gray100:    '#f0f4f8',
  gray200:    '#cdd5e0',
  gray400:    '#8899aa',
  white:      '#ffffff',
  navyText:   '#90a4ae',
  blueText:   '#bbdefb',
};

const COMPANY = {
  name:    'OMEDEV Services',
  tagline: 'Solutions Digitales & Infrastructures IT',
  address: 'Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC',
  phone:   '+243 555 503 59',
  email:   'omedevservices@gmail.com',
};

const PAGE_W = 595.28;
const PAGE_H = 841.89;

// ------------------------------------------------------------
// Helpers de dessin
// ------------------------------------------------------------
const fillRect = (doc, x, y, w, h, color) => {
  doc.save().rect(x, y, w, h).fill(color).restore();
};
const roundRect = (doc, x, y, w, h, r, fillColor) => {
  doc.save().roundedRect(x, y, w, h, r).fill(fillColor).restore();
};

// En-tête commun (bandeau navy + logo + titre du document)
const drawHeader = (doc, { docTitle, reference, dateStr }) => {
  const HERO_H = 118;
  fillRect(doc, 0, 0, PAGE_W, HERO_H, C.navy);
  doc.save().circle(PAGE_W - 55, 20, 130).fill('#1a3560').restore();
  doc.save().circle(PAGE_W - 10, 110, 80).fill('#142d50').restore();

  roundRect(doc, 28, 18, 42, 42, 21, C.blueBright);
  doc.font('Helvetica-Bold').fontSize(11).fillColor(C.white)
     .text('OM', 28, 31, { width: 42, align: 'center' });
  doc.font('Helvetica-Bold').fontSize(17).fillColor(C.white)
     .text(COMPANY.name, 80, 22);
  doc.font('Helvetica').fontSize(8.5).fillColor(C.gray400)
     .text(COMPANY.tagline, 80, 42);
  fillRect(doc, 80, 54, 190, 1.5, C.cyan);

  doc.font('Helvetica-Bold').fontSize(22).fillColor(C.white)
     .text(docTitle, 0, 22, { width: PAGE_W - 35, align: 'right' });
  doc.font('Helvetica-Bold').fontSize(12).fillColor(C.cyan)
     .text(reference, 0, 50, { width: PAGE_W - 35, align: 'right' });
  doc.font('Helvetica').fontSize(8.5).fillColor(C.gray400)
     .text(`Date : ${dateStr}`, 0, 66, { width: PAGE_W - 35, align: 'right' });

  fillRect(doc, 0, HERO_H - 3, PAGE_W, 3, C.cyan);
  return HERO_H;
};

// Pied de page commun (bandeau navy + coordonnées)
const drawFooter = (doc, label) => {
  const pageCount = doc.bufferedPageRange().count;
  for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(i);
    fillRect(doc, 0, PAGE_H - 36, PAGE_W, 36, C.navy);
    fillRect(doc, 0, PAGE_H - 38, PAGE_W, 2, C.cyan);
    doc.font('Helvetica').fontSize(7.5).fillColor('#4a6080')
       .text(`${COMPANY.name}  ·  ${COMPANY.address}  ·  ${COMPANY.email}  ·  ${label}`,
         0, PAGE_H - 22, { width: PAGE_W - 60, align: 'center' });
    doc.font('Helvetica').fontSize(7.5).fillColor('#2a3d55')
       .text(`Page ${i + 1}/${pageCount}`, PAGE_W - 90, PAGE_H - 22, { width: 60, align: 'right' });
  }
};

/**
 * Génère un rapport PDF pour un audit
 * @param {Object} audit - L'objet audit (AuditRequest)
 * @returns {Promise<string>} Chemin du fichier PDF généré
 */
const generateAuditPDF = async (audit) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 0, size: 'A4', bufferPages: true });
      const filename = `audit_${audit.requestNumber}_${Date.now()}.pdf`;
      const uploadDir = path.join(__dirname, '../../uploads/audits');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      const dateStr = new Date().toLocaleDateString('fr-FR');
      const levelColor = {
        Excellent: C.green, Bon: C.blueBright, Moyen: C.orange, Critique: C.red,
      }[audit.auditLevel] || C.gray400;

      let curY = drawHeader(doc, {
        docTitle: "RAPPORT D'AUDIT",
        reference: audit.requestNumber,
        dateStr,
      });

      // Bloc client
      const CI_H = 90;
      fillRect(doc, 0, curY, PAGE_W, CI_H, C.navyMid);
      doc.font('Helvetica-Bold').fontSize(7).fillColor(C.navyText)
         .text('INFORMATIONS CLIENT', 28, curY + 10);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(C.white)
         .text(audit.companyName || 'Non renseigné', 28, curY + 24);
      [
        `Secteur : ${audit.sector || 'Non renseigné'}`,
        `Contact : ${audit.name}`,
        `Email : ${audit.email}`,
        `Téléphone : ${audit.phone || 'Non renseigné'}`,
      ].forEach((line, i) => {
        doc.font('Helvetica').fontSize(8.5).fillColor(C.navyText)
           .text(line, 28, curY + 40 + i * 12);
      });
      curY += CI_H;

      // Score
      fillRect(doc, 0, curY, PAGE_W, 68, C.gray100);
      fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(C.navy)
         .text('SCORE GLOBAL', 28, curY + 10);
      doc.font('Helvetica-Bold').fontSize(26).fillColor(levelColor)
         .text(`${audit.auditScore}/100`, 28, curY + 28);
      roundRect(doc, 132, curY + 34, 68, 20, 5, levelColor);
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.white)
         .text((audit.auditLevel || '').toUpperCase(), 132, curY + 40, { width: 68, align: 'center' });
      const BAR_X = 218, BAR_Y = curY + 40, BAR_W = 340, BAR_H = 13;
      roundRect(doc, BAR_X, BAR_Y, BAR_W, BAR_H, 4, C.gray200);
      const filled = Math.max(6, Math.round((audit.auditScore / 100) * BAR_W));
      roundRect(doc, BAR_X, BAR_Y, filled, BAR_H, 4, levelColor);
      curY += 68;
      fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);

      // Recommandations
      fillRect(doc, 0, curY, PAGE_W, 26, C.navy);
      doc.font('Helvetica-Bold').fontSize(8).fillColor(C.navyText)
         .text('RECOMMANDATIONS', 28, curY + 9);
      curY += 26;
      (audit.recommendations || []).forEach((rec, i) => {
        const bg = i % 2 === 0 ? C.white : C.gray100;
        fillRect(doc, 0, curY, PAGE_W, 32, bg);
        fillRect(doc, 28, curY + 6, 3, 20, i % 2 === 0 ? C.cyan : C.blueBright);
        roundRect(doc, 37, curY + 6, 20, 20, 10, C.navy);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(C.cyan)
           .text(String(i + 1), 37, curY + 12, { width: 20, align: 'center' });
        doc.font('Helvetica').fontSize(9).fillColor(C.navy)
           .text(rec, 64, curY + 11, { width: PAGE_W - 90, lineBreak: false });
        curY += 32;
      });

      // Problèmes identifiés
      if (audit.mainIssues && audit.mainIssues.length) {
        curY += 8;
        fillRect(doc, 0, curY, PAGE_W, 26, C.red);
        doc.font('Helvetica-Bold').fontSize(8).fillColor(C.white)
           .text('PROBLÈMES IDENTIFIÉS', 28, curY + 9);
        curY += 26;
        audit.mainIssues.forEach((issue, i) => {
          const bg = i % 2 === 0 ? C.white : C.gray100;
          fillRect(doc, 0, curY, PAGE_W, 26, bg);
          fillRect(doc, 28, curY + 7, 3, 12, C.red);
          doc.font('Helvetica').fontSize(9).fillColor('#c62828')
             .text(`•  ${issue}`, 38, curY + 8, { width: PAGE_W - 70 });
          curY += 26;
        });
      }

      drawFooter(doc, `Rapport d'audit ${audit.requestNumber}`);
      doc.end();

      stream.on('finish', () => resolve(`/uploads/audits/${filename}`));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

/**
 * Génère un devis au format PDF
 * @param {Object} devis - Objet devis avec toutes les informations
 * @returns {Promise<string>} Chemin du fichier PDF
 */
const generateDevisPDF = async (devis) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 0, size: 'A4', bufferPages: true });
      const filename = `devis_${devis.requestNumber}_${Date.now()}.pdf`;
      const uploadDir = path.join(__dirname, '../../uploads/devis');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      const stream = fs.createWriteStream(filepath);
      doc.pipe(stream);

      const dateStr = new Date().toLocaleDateString('fr-FR');

      let curY = drawHeader(doc, {
        docTitle: 'DEVIS',
        reference: devis.requestNumber || '—',
        dateStr,
      });

      // Bloc client
      const CI_H = 74;
      fillRect(doc, 0, curY, PAGE_W, CI_H, C.navyMid);
      doc.font('Helvetica-Bold').fontSize(7).fillColor(C.navyText)
         .text('CLIENT', 28, curY + 10);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(C.white)
         .text(devis.user?.name || 'Client', 28, curY + 24);
      doc.font('Helvetica').fontSize(8.5).fillColor(C.navyText)
         .text(`Email : ${devis.user?.email || 'Non renseigné'}`, 28, curY + 42)
         .text(`Localisation : ${devis.location || 'Non renseigné'}`, 28, curY + 55);
      curY += CI_H;
      fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);

      // Tableau des prestations
      curY += 18;
      doc.font('Helvetica-Bold').fontSize(11).fillColor(C.navy)
         .text('DÉTAIL DE LA PRESTATION', 28, curY);
      curY += 20;

      const colService = 28, colDesc = 190, colMontant = 450;
      const tableW = PAGE_W - 56;

      fillRect(doc, 28, curY, tableW, 24, C.navy);
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.cyan)
         .text('SERVICE', colService + 8, curY + 8)
         .text('DESCRIPTION', colDesc, curY + 8)
         .text('MONTANT', colMontant, curY + 8, { width: 117, align: 'right' });
      curY += 24;

      const services = (devis.services && devis.services.length) ? devis.services : ['Service non spécifié'];
      const montantLabel = devis.estimatedAmountFormatted
        || (devis.estimatedAmount ? `${Number(devis.estimatedAmount).toLocaleString('fr-FR')} €` : 'Sur devis');

      services.forEach((service, i) => {
        const rowH = 26;
        const bg = i % 2 === 0 ? C.white : C.gray100;
        fillRect(doc, 28, curY, tableW, rowH, bg);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(C.navy)
           .text(service, colService + 8, curY + 8, { width: colDesc - colService - 16 });
        doc.font('Helvetica').fontSize(9).fillColor('#25364A')
           .text(devis.description || '—', colDesc, curY + 8, { width: colMontant - colDesc - 10 });
        doc.font('Helvetica-Bold').fontSize(9).fillColor(C.navy)
           .text(i === 0 ? montantLabel : '', colMontant, curY + 8, { width: 117, align: 'right' });
        curY += rowH;
      });
      fillRect(doc, 28, curY, tableW, 0.5, C.gray200);
      curY += 16;

      // Total
      if (devis.estimatedAmount) {
        roundRect(doc, PAGE_W - 240, curY, 212, 34, 6, C.gray100);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(C.gray400)
           .text('TOTAL ESTIMÉ TTC', PAGE_W - 228, curY + 8);
        doc.font('Helvetica-Bold').fontSize(14).fillColor(C.green)
           .text(montantLabel, PAGE_W - 228, curY + 8, { width: 190, align: 'right' });
        curY += 46;
      }

      // Conditions
      roundRect(doc, 28, curY, tableW, 54, 6, C.gray100);
      doc.font('Helvetica-Bold').fontSize(8).fillColor(C.navy)
         .text('CONDITIONS', 40, curY + 10);
      doc.font('Helvetica').fontSize(8).fillColor('#4a6080')
         .text('Ce devis est valable 30 jours à compter de sa date d\'émission. Pour toute question, notre équipe reste à votre disposition.', 40, curY + 24, { width: tableW - 24 });

      drawFooter(doc, `Devis ${devis.requestNumber || ''}`);
      doc.end();

      stream.on('finish', () => resolve(`/uploads/devis/${filename}`));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateAuditPDF, generateDevisPDF };
