import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, Download, Eye, Search, Calendar, Euro,
  CheckCircle, Clock, AlertCircle, Plus, Wallet, X,
  FileText, Building, ArrowLeft, Lock, Shield, ChevronRight
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ──────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
}
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
}
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}

/* ─── Infos entreprise ────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom: 'Omedev services',
  siret: '2325689',
  adresse: 'avenue kabambare n° 75',
  ville: 'Kinshasa, RDC',
  tel: '+21655550359',
  email: 'omedeveservices@gmail.com',
  site: 'www.omedeveservices.com',
  tva: ' 83 842391027',
  iban: 'DRC76 3000 6000 0112 3456 7890 189',
  bic: 'BNPAFRPPXXX',
  banque: 'BNP kinshasa',
  logo: 'TV'
}

/* ─── Nom client selon projet ─────────────────────────────────────────────── */
const getClientNom = (projet) => {
  if (projet.includes('E-commerce')) return 'Boutique Élégance SARL'
  if (projet.includes('Réseau'))     return 'Infra Conseil SAS'
  if (projet.includes('Cloud'))      return 'DataFlow Technologies'
  return 'Cyber Protect Group'
}

/* ─── Génération PDF via jsPDF ────────────────────────────────────────────── */
const generateInvoicePDF = async (paiement) => {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve
      s.onerror = reject
      document.head.appendChild(s)
    })
  }
  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210

  const navy    = [15, 23, 42]
  const blue    = [59, 130, 246]
  const cyan    = [6, 182, 212]
  const emerald = [16, 185, 129]
  const gray50  = [248, 250, 252]
  const gray100 = [241, 245, 249]
  const gray300 = [203, 213, 225]
  const gray500 = [100, 116, 139]
  const gray700 = [51, 65, 85]
  const white   = [255, 255, 255]

  // Fond blanc
  doc.setFillColor(...white)
  doc.rect(0, 0, W, 297, 'F')

  // Header navy
  doc.setFillColor(...navy)
  doc.rect(0, 0, W, 52, 'F')
  doc.setFillColor(...blue)
  doc.rect(0, 50, W, 3, 'F')

  // Logo cercle
  doc.setFillColor(...blue)
  doc.circle(22, 22, 12, 'F')
  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(ENTREPRISE.logo, 22, 26, { align: 'center' })

  // Nom entreprise
  doc.setFontSize(18)
  doc.text(ENTREPRISE.nom, 40, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text('Solutions Digitales & Infrastructures IT', 40, 27)

  // FACTURE + ID
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(26)
  doc.setTextColor(...white)
  doc.text('FACTURE', W - 15, 20, { align: 'right' })
  doc.setFontSize(10)
  doc.setTextColor(...cyan)
  doc.text(paiement.id, W - 15, 28, { align: 'right' })

  // Badge statut
  const statutColor = paiement.statut === 'paid' ? emerald : paiement.statut === 'overdue' ? [239,68,68] : [245,158,11]
  const statutLabel = paiement.statut === 'paid' ? 'PAYEE' : paiement.statut === 'overdue' ? 'EN RETARD' : 'EN ATTENTE'
  doc.setFillColor(...statutColor)
  doc.roundedRect(W - 50, 33, 35, 10, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...white)
  doc.text(statutLabel, W - 32.5, 39.5, { align: 'center' })

  // ── Blocs émetteur / client
  let y = 65
  const drawInfoBloc = (x, w, couleurHeader, titre, lignes) => {
    doc.setFillColor(...gray50)
    doc.roundedRect(x, y, w, 50, 3, 3, 'F')
    doc.setFillColor(...couleurHeader)
    doc.roundedRect(x, y, w, 8, 3, 3, 'F')
    doc.rect(x, y + 4, w, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text(titre, x + 7, y + 5.5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...gray700)
    doc.text(lignes[0], x + 5, y + 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    lignes.slice(1).forEach((l, i) => doc.text(l, x + 5, y + 22 + i * 6))
  }

  drawInfoBloc(12, 85, blue, 'EMETTEUR', [
    ENTREPRISE.nom,
    `SIRET : ${ENTREPRISE.siret}`,
    `TVA : ${ENTREPRISE.tva}`,
    ENTREPRISE.adresse,
    ENTREPRISE.ville,
    ENTREPRISE.tel,
    ENTREPRISE.email
  ])

  drawInfoBloc(110, 88, navy, 'CLIENT / DESTINATAIRE', [
    getClientNom(paiement.projet),
    'Responsable : M. Jean Dupont',
    "12 Avenue de l'Innovation",
    '69002 Lyon, France',
    'contact@client.fr',
    '+33 4 72 00 00 00'
  ])

  // ── Infos facture (3 colonnes)
  y = 124
  doc.setFillColor(...gray100)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  const infoCols = [
    { x: 25, label: "Date d'emission", val: new Date().toLocaleDateString('fr-FR') },
    { x: 82, label: "Date d'echeance", val: paiement.date },
    { x: 138, label: "Reference projet", val: paiement.id },
  ]
  infoCols.forEach(({ x, label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(label, x, y + 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...gray700)
    doc.text(val, x, y + 13)
  })

  // ── Tableau
  y = 152
  doc.setFillColor(...navy)
  doc.rect(12, y, 186, 9, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...white)
  doc.text('DESIGNATION', 17, y + 6)
  doc.text('QTE', 120, y + 6)
  doc.text('P.U. HT', 138, y + 6)
  doc.text('TVA', 162, y + 6)
  doc.text('TOTAL HT', W - 15, y + 6, { align: 'right' })

  const montantHT = Math.round(paiement.montantValue / 1.20)
  const tvaAmt    = paiement.montantValue - montantHT

  const lignes = [
    { desc: `Prestation — ${paiement.projet}`, detail: 'Conception, developpement et mise en production', qty: 1, pu: montantHT, tva: '20%', total: montantHT },
    { desc: 'Support & maintenance (1 mois)', detail: 'Suivi technique post-livraison inclus', qty: 1, pu: 0, tva: '20%', total: 0 },
  ]
  lignes.forEach((ligne, i) => {
    const ly = y + 9 + i * 16
    doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 251, i % 2 === 0 ? 255 : 253)
    doc.rect(12, ly, 186, 16, 'F')
    doc.setFillColor(...blue)
    doc.rect(12, ly, 2, 16, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(ligne.desc, 17, ly + 6)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(ligne.detail, 17, ly + 12)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(String(ligne.qty), 122, ly + 8)
    doc.text(ligne.pu > 0 ? `${ligne.pu.toLocaleString('fr-FR')} EUR` : 'Inclus', 138, ly + 8)
    doc.text(ligne.tva, 163, ly + 8)
    doc.setFont('helvetica', 'bold')
    doc.text(ligne.total > 0 ? `${ligne.total.toLocaleString('fr-FR')} EUR` : '0 EUR', W - 15, ly + 8, { align: 'right' })
  })

  // ── Totaux
  y = y + 9 + lignes.length * 16 + 6
  doc.setDrawColor(...gray300)
  doc.setLineWidth(0.3)
  doc.line(12, y, W - 12, y)
  y += 6
  ;[
    { label: 'Sous-total HT', val: `${montantHT.toLocaleString('fr-FR')} EUR` },
    { label: 'TVA (20%)',     val: `${tvaAmt.toLocaleString('fr-FR')} EUR` },
  ].forEach(({ label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8.5)
    doc.setTextColor(...gray500)
    doc.text(label, 140, y)
    doc.setTextColor(...gray700)
    doc.text(val, W - 15, y, { align: 'right' })
    y += 7
  })

  // Total TTC
  doc.setFillColor(...navy)
  doc.roundedRect(120, y, 78, 14, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('TOTAL TTC', 128, y + 9)
  doc.setFontSize(12)
  doc.setTextColor(...cyan)
  doc.text(`${paiement.montantValue.toLocaleString('fr-FR')} EUR`, W - 15, y + 9, { align: 'right' })

  // ── Conditions paiement
  y += 22
  doc.setFillColor(...gray50)
  doc.roundedRect(12, y, 115, 34, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('CONDITIONS DE PAIEMENT', 17, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...gray500)
  const condLines = [
    'Mode : Virement bancaire ou Carte bancaire',
    "Delai : 30 jours a compter de la date d'emission",
    `IBAN : ${ENTREPRISE.iban}`,
    `BIC : ${ENTREPRISE.bic} — ${ENTREPRISE.banque}`
  ]
  condLines.forEach((l, i) => doc.text(l, 17, y + 14 + i * 6))

  // Bloc statut paiement
  if (paiement.statut === 'paid') {
    doc.setFillColor(240, 253, 244)
    doc.roundedRect(133, y, 65, 34, 3, 3, 'F')
    doc.setFillColor(...emerald)
    doc.roundedRect(133, y, 65, 10, 3, 3, 'F')
    doc.rect(133, y + 6, 65, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text('FACTURE REGLEE', 165, y + 7, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(21, 128, 61)
    doc.text(`Via : ${paiement.methode}`, 165, y + 18, { align: 'center' })
    doc.text(`Date : ${paiement.date}`, 165, y + 25, { align: 'center' })
  }

  // ── Mentions légales
  y += 42
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray500)
  doc.text("En cas de retard de paiement, des penalites au taux legal seront appliquees (Art. L.441-10 du Code de commerce).", 12, y)
  doc.text("Pas d'escompte pour reglement anticipe. TVA acquittee sur les debits.", 12, y + 5)

  // ── Footer
  doc.setFillColor(...navy)
  doc.rect(0, 277, W, 20, 'F')
  doc.setFillColor(...blue)
  doc.rect(0, 276, W, 1.5, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(148, 163, 184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}, ${ENTREPRISE.ville}`, W / 2, 284, { align: 'center' })
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}  •  ${ENTREPRISE.site}`, W / 2, 290, { align: 'center' })
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('Page 1/1', W - 12, 294, { align: 'right' })

  doc.save(`Facture-${paiement.id}-${ENTREPRISE.nom.replace(/\s/g, '_')}.pdf`)
}

/* ─── Modal: Voir Facture ─────────────────────────────────────────────────── */
const ModalVoirFacture = ({ paiement, onClose, onPay, onDownload }) => {
  const status = {
    paid:    { label: 'Payé',       color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', icon: CheckCircle },
    pending: { label: 'En attente', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30',     icon: Clock },
    overdue: { label: 'En retard',  color: 'text-red-400 bg-red-500/20 border-red-500/30',           icon: AlertCircle },
  }[paiement.statut]
  const StatusIcon = status.icon
  const montantHT = Math.round(paiement.montantValue / 1.20)
  const tvaAmt    = paiement.montantValue - montantHT

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        <div className="bg-gradient-to-r from-blue-600/30 to-cyan-600/30 p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Facture {paiement.id}</h2>
                <p className="text-gray-400 text-sm">{ENTREPRISE.nom}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${status.color}`}>
            <StatusIcon className="w-3.5 h-3.5" /> {status.label}
          </span>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-blue-400 text-xs font-bold uppercase tracking-wide mb-3">Émetteur</p>
              <p className="text-white font-bold text-sm">{ENTREPRISE.nom}</p>
              <p className="text-gray-400 text-xs mt-1">{ENTREPRISE.adresse}</p>
              <p className="text-gray-400 text-xs">{ENTREPRISE.ville}</p>
              <p className="text-gray-400 text-xs mt-2">SIRET : {ENTREPRISE.siret}</p>
              <p className="text-gray-400 text-xs">TVA : {ENTREPRISE.tva}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4">
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-wide mb-3">Client</p>
              <p className="text-white font-bold text-sm">{getClientNom(paiement.projet)}</p>
              <p className="text-gray-400 text-xs mt-1">M. Jean Dupont</p>
              <p className="text-gray-400 text-xs">12 Av. de l'Innovation</p>
              <p className="text-gray-400 text-xs">69002 Lyon, France</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "N° Facture", val: paiement.id },
              { label: "Échéance", val: paiement.date },
              { label: "Méthode", val: paiement.methode !== '-' ? paiement.methode : 'Non définie' },
            ].map(({ label, val }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wide">
              <span>Désignation</span><span>Montant HT</span>
            </div>
            <div className="px-4 py-3 border-b border-white/5 flex justify-between">
              <div>
                <p className="text-white text-sm font-medium">{paiement.projet}</p>
                <p className="text-gray-500 text-xs">Conception, développement & mise en prod.</p>
              </div>
              <p className="text-white font-semibold text-sm whitespace-nowrap">{montantHT.toLocaleString('fr-FR')} €</p>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>Sous-total HT</span><span>{montantHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>TVA 20%</span><span>+ {tvaAmt.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 flex justify-between items-center">
              <span className="text-white font-bold">TOTAL TTC</span>
              <span className="text-xl font-bold text-cyan-400">{paiement.montant}</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs mb-2 font-bold uppercase tracking-wide">Coordonnées bancaires</p>
            <p className="text-gray-300 text-xs">IBAN : <span className="font-mono text-white">{ENTREPRISE.iban}</span></p>
            <p className="text-gray-300 text-xs mt-1">BIC : <span className="font-mono text-white">{ENTREPRISE.bic}</span> — {ENTREPRISE.banque}</p>
          </div>
        </div>

        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Fermer</button>
          <button onClick={() => { onClose(); onDownload(paiement) }} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-blue-500/50 text-blue-400 text-sm hover:bg-blue-500/10 transition-all">
            <Download className="w-4 h-4" /> PDF
          </button>
          {paiement.statut !== 'paid' && (
            <button onClick={() => { onClose(); onPay(paiement) }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg">
              Payer maintenant
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalTelecharger = ({ paiement, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateInvoicePDF(paiement)
      setStatus('done')
      setTimeout(onClose, 2000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Télécharger la facture</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>

          <div className="bg-white/5 rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-white font-semibold">Facture-{paiement.id}.pdf</p>
              <p className="text-gray-400 text-sm">{paiement.projet}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{paiement.montant} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Facture professionnelle avec logo, détail HT/TVA, coordonnées bancaires et mentions légales.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur lors de la génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Annuler</button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération PDF...</>
                  : <><Download className="w-4 h-4" /> Télécharger PDF</>
                }
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Payer ────────────────────────────────────────────────────────── */
const ModalPayer = ({ paiement, onClose, onSuccess }) => {
  const [step, setStep]       = useState(1)
  const [methode, setMethode] = useState('')
  const [form, setForm]       = useState({ nom: '', numero: '', expiry: '', cvv: '', iban: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})
  const txnRef = `TXN-${Date.now().toString().slice(-8)}`

  const methodes = [
    { id: 'carte',    label: 'Carte bancaire',   icon: CreditCard, desc: 'Visa, Mastercard, CB' },
    { id: 'virement', label: 'Virement bancaire', icon: Building,   desc: 'SEPA · 1-3 jours ouvrés' },
  ]

  const validate = () => {
    const e = {}
    if (methode === 'carte') {
      if (!form.nom.trim()) e.nom = 'Requis'
      if (!form.numero || form.numero.replace(/\s/g, '').length !== 16) e.numero = 'Numéro invalide (16 chiffres)'
      if (!form.expiry || !/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format MM/AA'
      if (!form.cvv || form.cvv.length < 3) e.cvv = 'CVV invalide'
    } else {
      if (!form.iban || form.iban.length < 14) e.iban = 'IBAN invalide'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePay = () => {
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep(3)
      onSuccess(paiement.id, methode === 'carte' ? 'Carte bancaire' : 'Virement')
    }, 2000)
  }

  const fmtCard   = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
  const fmtExpiry = v => v.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})(\d)/,'$1/$2')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>

        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step > 1 && step < 3 && (
              <button onClick={() => setStep(s => s - 1)} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
                <ArrowLeft className="w-3.5 h-3.5 text-gray-300" />
              </button>
            )}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <CreditCard style={{ width: 18, height: 18 }} className="text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Paiement sécurisé</h2>
              <p className="text-gray-400 text-xs">{paiement.projet} · {paiement.montant}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
            <X className="w-4 h-4 text-gray-300" />
          </button>
        </div>

        {step < 3 && (
          <div className="px-5 pt-4 flex items-center">
            {['Méthode','Informations','Confirmation'].map((s, i) => (
              <div key={i} className="flex items-center flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step > i+1 ? 'bg-emerald-500 text-white' : step === i+1 ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-500'}`}>
                  {step > i+1 ? '✓' : i+1}
                </div>
                <span className={`text-xs ml-1 ${step === i+1 ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                {i < 2 && <div className={`h-px flex-1 mx-2 ${step > i+1 ? 'bg-emerald-500/50' : 'bg-white/10'}`} />}
              </div>
            ))}
          </div>
        )}

        <div className="p-5">
          {step === 1 && (
            <div className="space-y-3 mt-2">
              <p className="text-gray-400 text-sm mb-3">Choisissez votre méthode de paiement</p>
              {methodes.map(m => (
                <button key={m.id} onClick={() => setMethode(m.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${methode === m.id ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${methode === m.id ? 'bg-blue-500' : 'bg-white/10'}`}>
                    <m.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{m.label}</p>
                    <p className="text-gray-500 text-xs">{m.desc}</p>
                  </div>
                  {methode === m.id && <CheckCircle className="w-5 h-5 text-blue-400" />}
                </button>
              ))}
              <button disabled={!methode} onClick={() => setStep(2)}
                className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm disabled:opacity-40 hover:scale-105 transition-all flex items-center justify-center gap-2">
                Continuer <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-3 mt-2">
              {methode === 'carte' ? (
                <>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Nom du titulaire</label>
                    <input type="text" placeholder="Jean Dupont" value={form.nom}
                      onChange={e => setForm({ ...form, nom: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.nom ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                    {errors.nom && <p className="text-red-400 text-xs mt-1">{errors.nom}</p>}
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1 block">Numéro de carte</label>
                    <input type="text" placeholder="1234 5678 9012 3456" value={form.numero}
                      onChange={e => setForm({ ...form, numero: fmtCard(e.target.value) })}
                      className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.numero ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-mono`} />
                    {errors.numero && <p className="text-red-400 text-xs mt-1">{errors.numero}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">Expiration</label>
                      <input type="text" placeholder="MM/AA" value={form.expiry}
                        onChange={e => setForm({ ...form, expiry: fmtExpiry(e.target.value) })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.expiry ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                      {errors.expiry && <p className="text-red-400 text-xs mt-1">{errors.expiry}</p>}
                    </div>
                    <div>
                      <label className="text-gray-400 text-xs mb-1 block">CVV</label>
                      <input type="password" placeholder="•••" maxLength={4} value={form.cvv}
                        onChange={e => setForm({ ...form, cvv: e.target.value.replace(/\D/g,'') })}
                        className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.cvv ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm`} />
                      {errors.cvv && <p className="text-red-400 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-gray-400 text-xs mb-1 block">IBAN bénéficiaire</label>
                  <input type="text" placeholder="FR76 3000 6000 0112 3456 7890 189" value={form.iban}
                    onChange={e => setForm({ ...form, iban: e.target.value.toUpperCase() })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white/10 border ${errors.iban ? 'border-red-500' : 'border-white/20'} text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all text-sm font-mono`} />
                  {errors.iban && <p className="text-red-400 text-xs mt-1">{errors.iban}</p>}
                  <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-blue-300 text-xs space-y-1">
                    <p>Référence à indiquer : <strong>{paiement.id}</strong></p>
                    <p>Délai de traitement : 1 à 3 jours ouvrés</p>
                    <p>Bénéficiaire : {ENTREPRISE.nom}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Paiement sécurisé SSL 256-bit</span>
                <Lock className="w-3.5 h-3.5 text-emerald-400 ml-1" />
              </div>
              <div className="bg-white/5 rounded-xl p-3 flex items-center justify-between">
                <span className="text-gray-400 text-sm">Montant à payer</span>
                <span className="text-white font-bold text-lg">{paiement.montant}</span>
              </div>
              <button onClick={handlePay} disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm hover:scale-105 transition-all disabled:scale-100 disabled:opacity-70 flex items-center justify-center gap-2">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Traitement...</>
                  : <><Lock className="w-4 h-4" /> Confirmer le paiement</>
                }
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center py-6 gap-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white">Paiement confirmé !</h3>
              <p className="text-gray-400 text-sm text-center">
                Votre paiement de <span className="text-white font-semibold">{paiement.montant}</span> pour{' '}
                <span className="text-white font-semibold">{paiement.projet}</span> a été traité avec succès.
              </p>
              <div className="bg-white/5 rounded-xl p-3 w-full text-center">
                <p className="text-gray-500 text-xs">Référence de transaction</p>
                <p className="text-white font-mono font-semibold text-sm mt-1">{txnRef}</p>
              </div>
              <p className="text-gray-500 text-xs text-center">Un reçu a été envoyé à votre adresse email</p>
              <button onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm hover:scale-105 transition-all">
                Fermer
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Paiements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm]   = useState('')
  const [modalVoir, setModalVoir]         = useState(null)
  const [modalDownload, setModalDownload] = useState(null)
  const [modalPayer, setModalPayer]       = useState(null)

  const [paiements, setPaiements] = useState([
    { id: 'INV-001', projet: 'Site E-commerce',    date: '15/04/2026', montant: '2 500 €', montantValue: 2500, statut: 'paid',    methode: 'Carte bancaire' },
    { id: 'INV-002', projet: 'Site E-commerce',    date: '01/05/2026', montant: '2 500 €', montantValue: 2500, statut: 'pending', methode: '-' },
    { id: 'INV-003', projet: 'Installation Réseau', date: '10/04/2026', montant: '1 600 €', montantValue: 1600, statut: 'paid',    methode: 'Virement' },
    { id: 'INV-004', projet: 'Installation Réseau', date: '25/04/2026', montant: '1 600 €', montantValue: 1600, statut: 'overdue', methode: '-' },
    { id: 'INV-005', projet: 'Migration Cloud',     date: '05/05/2026', montant: '4 200 €', montantValue: 4200, statut: 'pending', methode: '-' },
    { id: 'INV-006', projet: 'Audit Sécurité',      date: '20/03/2026', montant: '2 800 €', montantValue: 2800, statut: 'paid',    methode: 'Carte bancaire' },
  ])

  const handlePaySuccess = (id, methodeUsed) =>
    setPaiements(prev => prev.map(p => p.id === id ? { ...p, statut: 'paid', methode: methodeUsed } : p))

  const getStatusConfig = (statut) => ({
    paid:    { label: 'Payé',       icon: CheckCircle, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    pending: { label: 'En attente', icon: Clock,       color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    overdue: { label: 'En retard',  icon: AlertCircle, color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }[statut])

  const totalPaye  = paiements.filter(p => p.statut === 'paid').reduce((s,p) => s + p.montantValue, 0)
  const totalDu    = paiements.filter(p => p.statut !== 'paid').reduce((s,p) => s + p.montantValue, 0)
  const filtered   = paiements.filter(p =>
    p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.projet.toLowerCase().includes(searchTerm.toLowerCase())
  )
  const firstUnpaid = paiements.find(p => p.statut !== 'paid')

  const stats = [
    { title: 'Total payé',          value: `${totalPaye.toLocaleString('fr-FR')} €`, icon: CreditCard,  color: 'from-emerald-500 to-teal-500',  bgLight: 'bg-emerald-500/10', textLight: 'text-emerald-400', badge: 'Réglé' },
    { title: 'Restant dû',          value: `${totalDu.toLocaleString('fr-FR')} €`,   icon: AlertCircle, color: 'from-amber-500 to-orange-500',   bgLight: 'bg-amber-500/10',   textLight: 'text-amber-400',   badge: 'À régler' },
    { title: 'Paiements effectués', value: paiements.filter(p => p.statut === 'paid').length.toString(), icon: Wallet, color: 'from-blue-500 to-cyan-500', bgLight: 'bg-blue-500/10', textLight: 'text-blue-400', badge: 'Total' },
  ]

  return (
    <>
      <style>{globalStyles}</style>

      <AnimatePresence>
        {modalVoir && (
          <ModalVoirFacture paiement={modalVoir}
            onClose={() => setModalVoir(null)}
            onPay={p => { setModalVoir(null); setModalPayer(p) }}
            onDownload={p => { setModalVoir(null); setModalDownload(p) }} />
        )}
        {modalDownload && (
          <ModalTelecharger paiement={modalDownload} onClose={() => setModalDownload(null)} />
        )}
        {modalPayer && (
          <ModalPayer paiement={modalPayer}
            onClose={() => setModalPayer(null)}
            onSuccess={handlePaySuccess} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-10">

              {/* Titre page */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Paiements</h1>
                <p className="text-gray-400 mt-1">Gérez vos factures et effectuez vos paiements</p>
              </motion.div>

              {/* Stats */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/15">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.bgLight} ${stat.textLight}`}>{stat.badge}</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400 text-sm mt-1">{stat.title}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Quick action */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-6 border border-white/10 mb-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Effectuer un paiement</h3>
                      <p className="text-gray-400">Réglez vos factures en ligne en toute sécurité</p>
                    </div>
                  </div>
                  <button onClick={() => firstUnpaid && setModalPayer(firstUnpaid)} disabled={!firstUnpaid}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {firstUnpaid ? 'Payer maintenant' : 'Tout est réglé ✓'}
                    <CreditCard className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Recherche */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input type="text" placeholder="Rechercher une facture..." value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              </motion.div>

              {/* Grille de cartes */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7">
                {filtered.map((paiement) => {
                  const status = getStatusConfig(paiement.statut)
                  const StatusIcon = status.icon
                  return (
                    <motion.div key={paiement.id} variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col">
                      <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />

                      <div className="p-6 flex-1 flex flex-col gap-4">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                              <CreditCard className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-xs text-gray-500 font-mono">{paiement.id}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs text-gray-400">{paiement.date}</span>
                          </div>
                        </div>

                        {/* Projet + statut */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{paiement.projet}</h3>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3" /> {status.label}
                          </span>
                        </div>

                        {/* Montant encadré */}
                        <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-xs mb-0.5">Montant TTC</p>
                            <p className="text-2xl font-bold text-white">{paiement.montant}</p>
                          </div>
                          <Euro className="w-8 h-8 text-emerald-400 opacity-40" />
                        </div>

                        {/* Méthode si payé */}
                        {paiement.statut === 'paid' && paiement.methode !== '-' && (
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-400">Via : <span className="text-gray-300">{paiement.methode}</span></span>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2 pt-3 border-t border-white/10">
                          <button onClick={() => setModalVoir(paiement)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Eye className="w-3.5 h-3.5" /> Voir
                          </button>
                          <button onClick={() => setModalDownload(paiement)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all">
                            <Download className="w-3.5 h-3.5" /> PDF
                          </button>
                          {paiement.statut !== 'paid' && (
                            <button onClick={() => setModalPayer(paiement)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-semibold hover:scale-105 transition-all shadow-md">
                              Payer
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty state */}
              {filtered.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <CreditCard className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucune facture trouvée</h3>
                  <p className="text-gray-500 mt-1">Essayez de modifier vos critères de recherche</p>
                </motion.div>
              )}

            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Paiements