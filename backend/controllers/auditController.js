// src/controllers/auditController.js
const AuditRequest = require('../models/AuditRequest');
const PDFDocument  = require('pdfkit');
const fs           = require('fs');
const path         = require('path');
const nodemailer   = require('nodemailer');

// Configuration email
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST,
  port:   process.env.EMAIL_PORT,
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// Couleurs Omedev
const C = {
  navy:        '#0d1b2a',
  navyMid:     '#112240',
  blue:        '#1565c0',
  blueBright:  '#2979ff',
  cyan:        '#00e5ff',
  green:       '#00c853',
  orange:      '#f57c00',
  red:         '#c62828',
  gray100:     '#f0f4f8',
  gray200:     '#cdd5e0',
  gray400:     '#8899aa',
  white:       '#ffffff',
  navyText:    '#90a4ae',
  blueText:    '#bbdefb',
};

// Helpers de dessin
const fillRect = (doc, x, y, w, h, color) => {
  doc.save().rect(x, y, w, h).fill(color).restore();
};
const roundRect = (doc, x, y, w, h, r, fillColor, strokeColor = null) => {
  doc.save().roundedRect(x, y, w, h, r);
  if (strokeColor) doc.fillAndStroke(fillColor, strokeColor);
  else doc.fill(fillColor);
  doc.restore();
};
const levelColor = (level) => ({
  Excellent: C.green,
  Bon:       C.blueBright,
  Moyen:     C.orange,
  Critique:  C.red,
}[level] || C.gray400);
const mapValue = (raw, mapping) =>
  mapping ? (mapping[raw] ?? raw) : (raw || 'Non renseigné');

// Calcul du score et recommandations
const calculateAuditResults = (data) => {
  let score = 0;
  if (data.hasNetwork    === 'yes')         score += 10;
  if (data.hasServer     === 'yes')         score += 10;
  if (data.hasFirewall   === 'yes')         score += 10;
  if (data.hasAntivirus  === 'yes')         score += 10;
  if (data.hasBackup     === 'yes')         score += 15;
  if (data.hasCyberPolicy === 'yes')        score += 10;
  if (data.lastAudit     === 'moins-6-mois') score += 5;
  else if (data.lastAudit === '6-12-mois')  score += 3;
  else if (data.lastAudit === '1-2-ans')    score += 1;
  score -= (data.mainIssues || []).length * 2;
  score  = Math.max(0, Math.min(100, score));

  let level, recommendations;
  if (score >= 80) {
    level = 'Excellent';
    recommendations = [
      "Mettre en place une veille technologique régulière",
      "Former les équipes aux bonnes pratiques",
      "Envisager une migration vers le cloud pour plus d'agilité",
      "Automatiser les processus de sauvegarde",
    ];
  } else if (score >= 60) {
    level = 'Bon';
    recommendations = [
      "Renforcer la sécurité réseau avec un firewall nouvelle génération",
      "Mettre en place des sauvegardes automatisées",
      "Auditer les accès et les permissions utilisateurs",
      "Optimiser la bande passante internet",
    ];
  } else if (score >= 40) {
    level = 'Moyen';
    recommendations = [
      "Installer un antivirus centralisé",
      "Mettre en place une politique de mots de passe stricts",
      "Réaliser un audit de sécurité complet",
      "Former les employés à la cybersécurité",
      "Mettre en place des sauvegardes régulières",
    ];
  } else {
    level = 'Critique';
    recommendations = [
      "Audit complet de l'infrastructure IT",
      "Mise en place d'une solution de sécurité globale",
      "Migration vers une infrastructure moderne",
      "Formation cybersécurité pour toute l'équipe",
      "Mise en place d'un plan de reprise d'activité",
    ];
  }
  return { score, level, recommendations };
};

// Génération du PDF (style Omedev)
const generateAuditPDF = (audit) =>
  new Promise((resolve, reject) => {
    try {
      const PAGE_W = 595.28;
      const PAGE_H = 841.89;
      const doc = new PDFDocument({ margin: 0, size: 'A4', bufferPages: true });
      const filename  = `audit_${audit.requestNumber}_${Date.now()}.pdf`;
      const uploadDir = path.join(__dirname, '../../uploads/audits');
      if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
      const filepath = path.join(uploadDir, filename);
      const stream   = fs.createWriteStream(filepath);
      doc.pipe(stream);

      const dateStr = new Date().toLocaleDateString('fr-FR');
      const lcolor  = levelColor(audit.auditLevel);

      // Hero header
      const HERO_H = 148;
      fillRect(doc, 0, 0, PAGE_W, HERO_H, C.navy);
      doc.save().circle(PAGE_W - 55, 28, 155).fill('#1a3560').restore();
      doc.save().circle(PAGE_W - 10, 130, 90).fill('#142d50').restore();
      roundRect(doc, 28, 18, 42, 42, 21, C.blueBright);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(C.white)
         .text('OM', 28, 34, { width: 42, align: 'center' });
      doc.font('Helvetica-Bold').fontSize(17).fillColor(C.white)
         .text('OMEDEV Services', 80, 22);
      doc.font('Helvetica').fontSize(8.5).fillColor(C.gray400)
         .text('Solutions Digitales & Infrastructures IT', 80, 42);
      fillRect(doc, 80, 54, 190, 1.5, C.cyan);
      doc.font('Helvetica-Bold').fontSize(24).fillColor(C.white)
         .text("RAPPORT D'AUDIT", 0, 22, { width: PAGE_W - 35, align: 'right' });
      doc.font('Helvetica-Bold').fontSize(12).fillColor(C.cyan)
         .text(audit.requestNumber, 0, 52, { width: PAGE_W - 35, align: 'right' });
      doc.font('Helvetica').fontSize(8.5).fillColor(C.gray400)
         .text(`Date : ${dateStr}`, 0, 67, { width: PAGE_W - 35, align: 'right' });

      const stats = [
        { val: `${audit.auditScore}/100`, lbl: 'Score global', col: C.cyan },
        { val: audit.auditLevel,          lbl: 'Niveau',       col: lcolor },
        { val: String((audit.recommendations || []).length), lbl: 'Recommandations', col: C.white },
      ];
      stats.forEach((s, i) => {
        const sx = 28 + i * 148;
        doc.font('Helvetica-Bold').fontSize(14).fillColor(s.col).text(s.val, sx, 100);
        doc.font('Helvetica').fontSize(7.5).fillColor(C.gray400)
           .text(s.lbl.toUpperCase(), sx, 116);
      });
      fillRect(doc, 0, HERO_H - 3, PAGE_W, 3, C.cyan);

      // Bloc client / meta
      const CI_Y  = HERO_H;
      const CI_H  = 95;
      const half  = PAGE_W / 2;
      fillRect(doc, 0, CI_Y, half, CI_H, C.blue);
      doc.font('Helvetica-Bold').fontSize(7).fillColor(C.blueText)
         .text('INFORMATIONS CLIENT', 28, CI_Y + 10);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(C.white)
         .text(audit.companyName || 'Non renseigné', 28, CI_Y + 22);
      const clientLines = [
        `Secteur : ${audit.sector || 'Non renseigné'}`,
        `Contact : ${audit.name}`,
        `Email : ${audit.email}`,
        `Tél : ${audit.phone || 'Non renseigné'}`,
      ];
      clientLines.forEach((line, i) => {
        doc.font('Helvetica').fontSize(8.5).fillColor(C.blueText)
           .text(line, 28, CI_Y + 38 + i * 12);
      });

      fillRect(doc, half, CI_Y, half, CI_H, C.navyMid);
      doc.font('Helvetica-Bold').fontSize(7).fillColor(C.navyText)
         .text("DÉTAILS DE L'AUDIT", half + 28, CI_Y + 10);
      doc.font('Helvetica-Bold').fontSize(12).fillColor(C.white)
         .text(`Référence : ${audit.requestNumber}`, half + 28, CI_Y + 22);
      doc.font('Helvetica').fontSize(8.5).fillColor(C.navyText)
         .text(`Date : ${dateStr}`, half + 28, CI_Y + 40)
         .text('Statut : Complété', half + 28, CI_Y + 54)
         .text(`Secteur : ${audit.sector || 'N/A'}`, half + 28, CI_Y + 68);

      // Section score
      let curY = CI_Y + CI_H + 1;
      fillRect(doc, 0, curY, PAGE_W, 68, C.gray100);
      fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);
      doc.font('Helvetica-Bold').fontSize(11).fillColor(C.navy)
         .text('SCORE GLOBAL', 28, curY + 10);
      fillRect(doc, 28, curY + 24, 108, 2, C.cyan);
      doc.font('Helvetica-Bold').fontSize(26).fillColor(lcolor)
         .text(`${audit.auditScore}/100`, 28, curY + 30);
      roundRect(doc, 132, curY + 32, 68, 20, 5, lcolor);
      doc.font('Helvetica-Bold').fontSize(8.5).fillColor(C.white)
         .text(audit.auditLevel.toUpperCase(), 132, curY + 38, { width: 68, align: 'center' });
      const BAR_X = 218, BAR_Y = curY + 38, BAR_W = 340, BAR_H = 13;
      roundRect(doc, BAR_X, BAR_Y, BAR_W, BAR_H, 4, C.gray200);
      const filled = Math.max(6, Math.round((audit.auditScore / 100) * BAR_W));
      roundRect(doc, BAR_X, BAR_Y, filled, BAR_H, 4, lcolor);
      doc.font('Helvetica').fontSize(7).fillColor(C.gray400)
         .text('0', BAR_X, BAR_Y + 16)
         .text('100', BAR_X + BAR_W - 14, BAR_Y + 16);
      fillRect(doc, 0, curY + 68, PAGE_W, 0.5, C.gray200);

      // Recommandations
      curY += 68;
      const REC_H = 34;
      fillRect(doc, 0, curY, PAGE_W, 26, C.navy);
      doc.font('Helvetica-Bold').fontSize(8).fillColor(C.navyText)
         .text('RECOMMANDATIONS', 28, curY + 9);
      curY += 26;
      (audit.recommendations || []).forEach((rec, i) => {
        const bg = i % 2 === 0 ? C.white : C.gray100;
        fillRect(doc, 0, curY, PAGE_W, REC_H, bg);
        fillRect(doc, 28, curY + 7, 3, REC_H - 14, i % 2 === 0 ? C.cyan : C.blueBright);
        roundRect(doc, 37, curY + 7, 20, 20, 10, C.navy);
        doc.font('Helvetica-Bold').fontSize(9).fillColor(C.cyan)
           .text(String(i + 1), 37, curY + 13, { width: 20, align: 'center' });
        doc.font('Helvetica').fontSize(9).fillColor(C.navy)
           .text(rec, 64, curY + 12, { width: PAGE_W - 90, lineBreak: false });
        fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);
        curY += REC_H;
      });

      // Détail évaluation (2 colonnes)
      curY += 10;
      const SECTION_W = half - 18;
      const colX = [18, half + 10];
      const ITEM_H = 26;
      const evalSections = [
        {
          title: 'INFRASTRUCTURE RÉSEAU',
          items: [
            { label: 'Réseau informatique', raw: audit.hasNetwork,    map: { yes: 'Oui', no: 'Non', partial: 'Partiellement' } },
            { label: 'Serveurs',            raw: audit.hasServer,     map: { yes: 'Oui', no: 'Non', cloud: 'Cloud uniquement' } },
            { label: 'Pare-feu',            raw: audit.hasFirewall,   map: { yes: 'Oui', no: 'Non', basic: 'Basique' } },
            { label: 'Débit internet',      raw: audit.internetSpeed, map: null },
          ],
        },
        {
          title: 'SÉCURITÉ',
          items: [
            { label: 'Antivirus',           raw: audit.hasAntivirus,  map: { yes: 'Oui, centralisé', no: 'Non', basic: 'Basique' } },
            { label: 'Sauvegarde',          raw: audit.hasBackup,     map: { yes: 'Oui', no: 'Non', partial: 'Partiel' } },
            { label: 'Politique cybersec',  raw: audit.hasCyberPolicy,map: { yes: 'Oui', no: 'Non', inprogress: 'En cours' } },
            { label: 'Dernier audit',       raw: audit.lastAudit,     map: null },
          ],
        },
      ];
      evalSections.forEach((section, si) => {
        const cx = colX[si];
        let sy = curY;
        roundRect(doc, cx, sy, SECTION_W, 22, 4, C.navy);
        doc.font('Helvetica-Bold').fontSize(7.5).fillColor(C.cyan)
           .text(section.title, cx + 10, sy + 8);
        sy += 22;
        section.items.forEach((item, ii) => {
          const bg = ii % 2 === 0 ? C.white : C.gray100;
          fillRect(doc, cx, sy, SECTION_W, ITEM_H, bg);
          const val = mapValue(item.raw, item.map);
          const dotColor = ['Oui', 'Oui, centralisé'].includes(val) ? C.green
            : val === 'Non' ? C.red : C.orange;
          roundRect(doc, cx + 8, sy + 8, 9, 9, 4, dotColor);
          doc.font('Helvetica').fontSize(8).fillColor(C.gray400)
             .text(item.label, cx + 22, sy + 9);
          doc.font('Helvetica-Bold').fontSize(8).fillColor(C.navy)
             .text(val, cx, sy + 9, { width: SECTION_W - 12, align: 'right' });
          fillRect(doc, cx, sy, SECTION_W, 0.5, C.gray200);
          sy += ITEM_H;
        });
      });
      curY += 22 + evalSections[0].items.length * ITEM_H + 12;

      // Problèmes identifiés
      if (audit.mainIssues && audit.mainIssues.length) {
        fillRect(doc, 0, curY, PAGE_W, 26, C.red);
        doc.font('Helvetica-Bold').fontSize(8).fillColor(C.white)
           .text('PROBLÈMES IDENTIFIÉS', 28, curY + 9);
        curY += 26;
        audit.mainIssues.forEach((issue, i) => {
          const bg = i % 2 === 0 ? C.white : C.gray100;
          fillRect(doc, 0, curY, PAGE_W, 28, bg);
          fillRect(doc, 28, curY + 8, 3, 14, C.red);
          doc.font('Helvetica').fontSize(9).fillColor('#c62828')
             .text(`•  ${issue}`, 38, curY + 10, { width: PAGE_W - 70 });
          fillRect(doc, 0, curY, PAGE_W, 0.5, C.gray200);
          curY += 28;
        });
      }

      // Pied de page
      fillRect(doc, 0, PAGE_H - 36, PAGE_W, 36, C.navy);
      fillRect(doc, 0, PAGE_H - 38, PAGE_W, 2, C.cyan);
      doc.font('Helvetica').fontSize(7.5).fillColor('#4a6080')
         .text(`OMEDEV Services  ·  Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC  ·  omedevservices@gmail.com  ·  Rapport ${audit.requestNumber}`,
           0, PAGE_H - 22, { width: PAGE_W - 60, align: 'center' });
      doc.font('Helvetica').fontSize(7.5).fillColor('#2a3d55')
         .text('Page 1/1', PAGE_W - 52, PAGE_H - 22);

      doc.end();
      stream.on('finish', () => resolve(`/uploads/audits/${filename}`));
      stream.on('error', (err) => reject(err));
    } catch (err) {
      reject(err);
    }
  });

// Envoi du rapport PDF par email (réutilisable)
const sendAuditReportEmail = async (audit, pdfUrl) => {
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
      <div style="background: #0d1b2a; padding: 24px 32px; display: flex; align-items: center;">
        <div style="width: 42px; height: 42px; border-radius: 10px; background: #2979ff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; letter-spacing: -0.5px; flex-shrink: 0;">OM</div>
        <div style="margin-left: 14px;">
          <div style="color: white; font-size: 17px; font-weight: bold;">OMEDEV Services</div>
          <div style="color: #8899aa; font-size: 11px;">Solutions Digitales &amp; Infrastructures IT</div>
        </div>
      </div>
      <div style="padding: 28px 32px;">
        <h2 style="color: #1565c0; margin-top: 0;">Votre rapport d'audit est prêt</h2>
        <p>Bonjour <strong>${audit.name}</strong>,</p>
        <p>Veuillez trouver ci-joint votre rapport d'audit personnalisé, référence <strong>${audit.requestNumber}</strong>.</p>
        <p>Notre équipe reste à votre disposition pour échanger sur les recommandations qu'il contient.</p>
        <p style="margin-bottom: 0;">Cordialement,<br/>L'équipe OMEDEV Services</p>
      </div>
      <div style="background: #0d1b2a; padding: 14px 32px; text-align: center; font-size: 11px; color: #4a6080;">
        OMEDEV Services · Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC · omedevservices@gmail.com
      </div>
    </div>
  `;
  await transporter.sendMail({
    from:        `"OMEDEV Services" <${process.env.EMAIL_USER}>`,
    to:          audit.email,
    subject:     `Votre rapport d'audit OMEDEV — ${audit.requestNumber}`,
    html:        emailHtml,
    attachments: [{ filename: `audit_${audit.requestNumber}.pdf`, path: pdfUrl }],
  });
  console.log(`Rapport PDF envoyé à ${audit.email}`);
};

// Planification de l'envoi automatique du rapport après 4 minutes
const scheduleAuditReport = (auditId) => {
  setTimeout(async () => {
    try {
      const audit = await AuditRequest.findById(auditId);
      if (!audit) {
        console.error(`❌ Audit ${auditId} introuvable pour l'envoi automatique.`);
        return;
      }
      const pdfUrl = await generateAuditPDF(audit);
      audit.pdfReportUrl = pdfUrl;
      audit.status = 'completed';
      await audit.save();
      await sendAuditReportEmail(audit, path.join(__dirname, '../..', pdfUrl));
    } catch (error) {
      console.error(`❌ Erreur lors de l'envoi automatique du rapport pour l'audit ${auditId}:`, error);
    }
  }, 4000); // 4 secondes
};

// Création d'une demande d'audit (avec planification)
const createAuditRequest = async (req, res) => {
  try {
    let auditData = req.body;
    if (!auditData.preferredContact) auditData.preferredContact = 'email';
    const defaults = {
      hasNetwork: 'no', hasServer: 'no', hasFirewall: 'no',
      hasAntivirus: 'no', hasBackup: 'no', hasCyberPolicy: 'no',
      lastAudit: 'jamais'
    };
    for (const [field, defaultValue] of Object.entries(defaults)) {
      if (!auditData[field] || auditData[field] === '') auditData[field] = defaultValue;
    }

    const { score, level, recommendations } = calculateAuditResults(auditData);

    const auditRequest = await AuditRequest.create({
      ...auditData,
      auditScore:      score,
      auditLevel:      level,
      recommendations,
    });

    // Email de confirmation immédiat
    const confirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: #0d1b2a; padding: 24px 32px; display: flex; align-items: center;">
          <div style="width: 42px; height: 42px; border-radius: 10px; background: #2979ff; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px; letter-spacing: -0.5px; flex-shrink: 0;">OM</div>
          <div style="margin-left: 14px;">
            <div style="color: white; font-size: 17px; font-weight: bold;">OMEDEV Services</div>
            <div style="color: #8899aa; font-size: 11px;">Solutions Digitales &amp; Infrastructures IT</div>
          </div>
        </div>
        <div style="padding: 28px 32px;">
          <h2 style="color: #1565c0; margin-top: 0;">Merci pour votre demande d'audit</h2>
          <p>Bonjour <strong>${auditData.name}</strong>,</p>
          <p>Nous avons bien reçu votre demande d'audit gratuit.</p>
          <p><strong>Numéro de dossier :</strong>
            <span style="background: #f0f4f8; padding: 2px 10px; border-radius: 4px; font-family: monospace;">${auditRequest.requestNumber}</span>
          </p>
          <p>Notre équipe va analyser vos réponses et vous fournira un rapport personnalisé sous 48h.</p>
          <p style="margin-bottom: 0;">Cordialement,<br/>L'équipe OMEDEV Services</p>
        </div>
        <div style="background: #0d1b2a; padding: 14px 32px; text-align: center; font-size: 11px; color: #4a6080;">
          OMEDEV Services · Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC · omedevservices@gmail.com
        </div>
      </div>
    `;

    await transporter.sendMail({
      from:    `"OMEDEV Services" <${process.env.EMAIL_USER}>`,
      to:      auditData.email,
      subject: `Confirmation de votre demande d'audit — ${auditRequest.requestNumber}`,
      html:    confirmationHtml,
    });
    console.log(`Email de confirmation envoyé à ${auditData.email}`);

    // Planification de l'envoi du rapport après 4 minutes
    scheduleAuditReport(auditRequest._id);

    res.status(201).json({
      success:       true,
      _id:           auditRequest._id,
      requestNumber: auditRequest.requestNumber,
      audit:         { score, level, recommendations },
    });
  } catch (error) {
    console.error('❌ Erreur création audit :', error);
    res.status(500).json({ success: false, message: "Erreur lors de la création de l'audit" });
  }
};

// Téléchargement du PDF (pour l'admin)
const downloadAuditPDF = async (req, res) => {
  console.log('📥 Téléchargement PDF demandé pour ID :', req.params.id);
  try {
    const audit = await AuditRequest.findById(req.params.id);
    if (!audit) {
      return res.status(404).json({ success: false, message: 'Audit non trouvé' });
    }
    let pdfUrl = audit.pdfReportUrl;
    if (!pdfUrl) {
      pdfUrl = await generateAuditPDF(audit);
      audit.pdfReportUrl = pdfUrl;
      audit.status = 'completed';
      await audit.save();
    }
    const filepath = path.join(__dirname, '../..', pdfUrl);
    res.download(filepath, `audit_${audit.requestNumber}.pdf`);
  } catch (error) {
    console.error('❌ Erreur génération PDF :', error);
    res.status(500).json({ success: false, message: 'Erreur lors de la génération du PDF' });
  }
};

// Autres contrôleurs (inchangés)
const getMyAudits = async (req, res) => {
  try {
    const audits = await AuditRequest.find({ user: req.user._id }).sort('-createdAt');
    res.json(audits);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAuditByRequestNumber = async (req, res) => {
  try {
    const audit = await AuditRequest.findOne({ requestNumber: req.params.requestNumber });
    if (!audit) return res.status(404).json({ message: 'Audit non trouvé' });
    res.json({
      requestNumber: audit.requestNumber,
      status:        audit.status,
      createdAt:     audit.createdAt,
      auditScore:    audit.auditScore,
      auditLevel:    audit.auditLevel,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAllAudits = async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    const query = {};
    if (status) query.status = status;
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate)   query.createdAt.$lte = new Date(endDate);
    }
    const audits = await AuditRequest.find(query).populate('user', 'name email').sort('-createdAt');
    res.json(audits);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAuditStats = async (req, res) => {
  try {
    const [total, completed, pending, contacted, averageScore, byLevel] = await Promise.all([
      AuditRequest.countDocuments(),
      AuditRequest.countDocuments({ status: 'completed' }),
      AuditRequest.countDocuments({ status: 'pending' }),
      AuditRequest.countDocuments({ status: 'contacted' }),
      AuditRequest.aggregate([{ $group: { _id: null, avg: { $avg: '$auditScore' } } }]),
      AuditRequest.aggregate([{ $group: { _id: '$auditLevel', count: { $sum: 1 } } }]),
    ]);
    res.json({
      total,
      completed,
      pending,
      contacted,
      averageScore: averageScore[0]?.avg || 0,
      byLevel: byLevel.reduce((acc, curr) => { acc[curr._id] = curr.count; return acc; }, {}),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const getAuditById = async (req, res) => {
  try {
    const audit = await AuditRequest.findById(req.params.id).populate('user', 'name email phone');
    if (!audit) return res.status(404).json({ message: 'Audit non trouvé' });
    res.json(audit);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const updateAuditStatus = async (req, res) => {
  try {
    const audit = await AuditRequest.findById(req.params.id);
    if (!audit) return res.status(404).json({ message: 'Audit non trouvé' });
    audit.status = req.body.status;
    await audit.save();
    res.json(audit);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const updateAuditPdfUrl = async (req, res) => {
  try {
    const audit = await AuditRequest.findById(req.params.id);
    if (!audit) return res.status(404).json({ message: 'Audit non trouvé' });
    audit.pdfReportUrl = req.body.pdfReportUrl;
    audit.status = 'completed';
    await audit.save();
    res.json(audit);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

const deleteAudit = async (req, res) => {
  try {
    const audit = await AuditRequest.findById(req.params.id);
    if (!audit) return res.status(404).json({ message: 'Audit non trouvé' });
    if (audit.pdfReportUrl) {
      const filepath = path.join(__dirname, '../..', audit.pdfReportUrl);
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    }
    await audit.deleteOne();
    res.json({ message: 'Audit supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
};

module.exports = {
  createAuditRequest,
  getMyAudits,
  getAuditByRequestNumber,
  getAllAudits,
  getAuditStats,
  getAuditById,
  updateAuditStatus,
  downloadAuditPDF,
  updateAuditPdfUrl,
  deleteAudit,
};