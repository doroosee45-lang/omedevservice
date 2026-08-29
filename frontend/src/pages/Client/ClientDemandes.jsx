import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { devis as devisApi } from '../../services/api'
import {
  Search, Filter, Eye, Download, Calendar, Euro,
  Clock, CheckCircle, XCircle, AlertCircle, FileText,
  X, Send, MessageCircle, Building, User, MapPin,
  Phone, Mail, ChevronRight, Shield, TrendingUp,
  Package, Tag, Info, Printer
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

/* ─── Styles globaux ──────────────────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-vm {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;
    background: #F6F6F7;
    color: #0B1213;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }
  .omedev-vm * { box-sizing: border-box; }

  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
  .omedev-vm .modal-scroll::-webkit-scrollbar { width: 4px; }
  .omedev-vm .modal-scroll::-webkit-scrollbar-track { background: transparent; }
  .omedev-vm .modal-scroll::-webkit-scrollbar-thumb { background: rgba(5,56,118,0.2); border-radius: 99px; }
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

/* ─── Entreprise ──────────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom: 'OMEDEV Services',
  siret: '2325689',
  adresse: 'Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC',
  tel: '+243 555 503 59',
  email: 'omedevservices@gmail.com',
  tva: '83 842391027',
  logo: 'OM'
}

/* ─── Génération PDF devis (palette OMEDEV) ────────────────────────────────── */
const generateDevisPDF = async (demande) => {
  if (!window.jspdf) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script')
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      s.onload = resolve; s.onerror = reject
      document.head.appendChild(s)
    })
  }
  const { jsPDF } = window.jspdf
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210
  // Palette OMEDEV
  const navy=[5,56,118], blue=[11,116,193], cyan=[42,172,178], emerald=[85,221,181]
  const gray50=[248,250,252], gray100=[241,245,249], gray300=[203,213,225]
  const gray500=[100,116,139], gray700=[51,65,85], white=[255,255,255]

  // Fond
  doc.setFillColor(...white); doc.rect(0,0,W,297,'F')

  // Header navy
  doc.setFillColor(...navy); doc.rect(0,0,W,52,'F')
  doc.setFillColor(...blue); doc.rect(0,50,W,3,'F')

  // Logo
  doc.setFillColor(...blue); doc.circle(22,22,12,'F')
  doc.setTextColor(...white); doc.setFont('helvetica','bold'); doc.setFontSize(11)
  doc.text(ENTREPRISE.logo,22,26,{align:'center'})

  // Nom entreprise
  doc.setFontSize(18); doc.text(ENTREPRISE.nom,40,20)
  doc.setFont('helvetica','normal'); doc.setFontSize(8)
  doc.setTextColor(148,163,184)
  doc.text('Solutions Digitales & Infrastructures IT',40,27)

  // DEVIS + ID
  doc.setFont('helvetica','bold'); doc.setFontSize(26)
  doc.setTextColor(...white); doc.text('DEVIS',W-15,20,{align:'right'})
  doc.setFontSize(10); doc.setTextColor(...cyan)
  doc.text(demande.id,W-15,28,{align:'right'})

  // Badge statut
  const scfg = {
    pending:   { label:'EN ATTENTE', c:[245,158,11] },
    approved:  { label:'APPROUVE',   c:[85,221,181] },
    completed: { label:'TERMINE',    c:[11,116,193] },
    rejected:  { label:'REFUSE',     c:[239,68,68]  },
  }[demande.status] || { label:'EN ATTENTE', c:[245,158,11] }
  doc.setFillColor(...scfg.c)
  doc.roundedRect(W-52,33,37,10,2,2,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(7.5); doc.setTextColor(...white)
  doc.text(scfg.label,W-33.5,39.5,{align:'center'})

  // Blocs info
  let y=65
  // Émetteur
  doc.setFillColor(...gray50); doc.roundedRect(12,y,85,46,3,3,'F')
  doc.setFillColor(...blue); doc.roundedRect(12,y,85,8,3,3,'F'); doc.rect(12,y+4,85,4,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('EMETTEUR',20,y+5.5)
  doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(...gray700)
  doc.text(ENTREPRISE.nom,17,y+15)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  ;[`SIRET : ${ENTREPRISE.siret}`,`TVA : ${ENTREPRISE.tva}`,ENTREPRISE.adresse,ENTREPRISE.tel,ENTREPRISE.email]
    .forEach((l,i)=>doc.text(l,17,y+22+i*5.5))

  // Client
  doc.setFillColor(...gray50); doc.roundedRect(110,y,88,46,3,3,'F')
  doc.setFillColor(...navy); doc.roundedRect(110,y,88,8,3,3,'F'); doc.rect(110,y+4,88,4,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('CLIENT / DESTINATAIRE',118,y+5.5)
  doc.setFont('helvetica','bold'); doc.setFontSize(9.5); doc.setTextColor(...gray700)
  doc.text('Client Premium SAS',115,y+15)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  ;['Responsable : M. Jean Dupont','12 Avenue de l\'Innovation','69002 Lyon, France','contact@client.fr','+33 4 72 00 00 00']
    .forEach((l,i)=>doc.text(l,115,y+22+i*5.5))

  // Infos devis
  y=120
  doc.setFillColor(...gray100); doc.roundedRect(12,y,186,18,3,3,'F')
  ;[
    {x:25,label:"Date d'emission",val:demande.date},
    {x:82,label:"Validite",val:"30 jours"},
    {x:138,label:"Livraison estimee",val:demande.estimatedDelivery||'-'},
  ].forEach(({x,label,val})=>{
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...gray500)
    doc.text(label,x,y+6)
    doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...gray700)
    doc.text(val,x,y+13)
  })

  // Tableau
  y=148
  doc.setFillColor(...navy); doc.rect(12,y,186,9,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...white)
  doc.text('DESIGNATION',17,y+6)
  doc.text('QTE',120,y+6); doc.text('MONTANT HT',140,y+6); doc.text('TVA',168,y+6)
  doc.text('TOTAL TTC',W-15,y+6,{align:'right'})

  const montantTTC = parseFloat(demande.amount.replace(/[^0-9]/g,''))
  const montantHT  = Math.round(montantTTC/1.20)
  const tvaAmt     = montantTTC - montantHT

  const lignes=[
    {desc:`Prestation — ${demande.service}`,detail:demande.description.substring(0,70),qty:1,pu:montantHT,tva:'20%',total:montantTTC},
    {desc:'Suivi & support (1 mois)',detail:'Assistance technique post-livraison',qty:1,pu:0,tva:'20%',total:0},
  ]
  lignes.forEach((l,i)=>{
    const ly=y+9+i*16
    doc.setFillColor(i%2===0?255:250,i%2===0?255:251,i%2===0?255:253); doc.rect(12,ly,186,16,'F')
    doc.setFillColor(...blue); doc.rect(12,ly,2,16,'F')
    doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...gray700)
    doc.text(l.desc,17,ly+6)
    doc.setFont('helvetica','normal'); doc.setFontSize(7); doc.setTextColor(...gray500)
    doc.text(l.detail,17,ly+12)
    doc.setFont('helvetica','normal'); doc.setFontSize(8); doc.setTextColor(...gray700)
    doc.text(String(l.qty),122,ly+8)
    doc.text(l.pu>0?`${l.pu.toLocaleString('fr-FR')} EUR`:'Inclus',140,ly+8)
    doc.text(l.tva,169,ly+8)
    doc.setFont('helvetica','bold')
    doc.text(l.total>0?`${l.total.toLocaleString('fr-FR')} EUR`:'0 EUR',W-15,ly+8,{align:'right'})
  })

  // Totaux
  y=y+9+lignes.length*16+6
  doc.setDrawColor(...gray300); doc.setLineWidth(0.3); doc.line(12,y,W-12,y)
  y+=6
  ;[{label:'Sous-total HT',val:`${montantHT.toLocaleString('fr-FR')} EUR`},{label:'TVA (20%)',val:`${tvaAmt.toLocaleString('fr-FR')} EUR`}]
    .forEach(({label,val})=>{
      doc.setFont('helvetica','normal'); doc.setFontSize(8.5); doc.setTextColor(...gray500)
      doc.text(label,140,y)
      doc.setTextColor(...gray700); doc.text(val,W-15,y,{align:'right'})
      y+=7
    })
  doc.setFillColor(...navy); doc.roundedRect(120,y,78,14,3,3,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(9); doc.setTextColor(...white)
  doc.text('TOTAL TTC',128,y+9)
  doc.setFontSize(12); doc.setTextColor(...cyan)
  doc.text(`${montantTTC.toLocaleString('fr-FR')} EUR`,W-15,y+9,{align:'right'})

  // Conditions
  y+=22
  doc.setFillColor(...gray50); doc.roundedRect(12,y,186,22,3,3,'F')
  doc.setFont('helvetica','bold'); doc.setFontSize(8); doc.setTextColor(...navy)
  doc.text('CONDITIONS',17,y+7)
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(...gray500)
  doc.text('Ce devis est valable 30 jours. Acompte de 30% a la signature. Solde a la livraison.',17,y+14)
  doc.text(`Ref. devis : ${demande.id} — ${ENTREPRISE.nom} — SIRET ${ENTREPRISE.siret}`,17,y+19)

  // Footer
  doc.setFillColor(...navy); doc.rect(0,277,W,20,'F')
  doc.setFillColor(...blue); doc.rect(0,276,W,1.5,'F')
  doc.setFont('helvetica','normal'); doc.setFontSize(7.5); doc.setTextColor(148,163,184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}`,W/2,284,{align:'center'})
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}`,W/2,290,{align:'center'})

  doc.save(`Devis-${demande.id}-${ENTREPRISE.nom.replace(/\s/g,'_')}.pdf`)
}

/* ─── Modal: Détails demande ──────────────────────────────────────────────── */
const ModalDetails = ({ demande, onClose, onDownload }) => {
  const statusMap = {
    pending:   { label: 'En attente', color: 'text-amber-700 bg-amber-100 border-amber-300/50',     icon: Clock,        desc: 'Votre demande est en cours d\'analyse par notre équipe.' },
    approved:  { label: 'Approuvé',   color: 'text-[#1D5B9B] bg-[#55DDB5]/15 border-[#55DDB5]/50', icon: CheckCircle,  desc: 'Votre devis a été approuvé. Les travaux vont démarrer prochainement.' },
    completed: { label: 'Terminé',    color: 'text-blue-700 bg-blue-100 border-blue-300/50',         icon: CheckCircle,  desc: 'Prestation terminée. Merci pour votre confiance !' },
    rejected:  { label: 'Refusé',     color: 'text-red-700 bg-red-100 border-red-300/50',             icon: XCircle,      desc: 'Votre demande n\'a pas pu être acceptée. Contactez-nous pour plus d\'informations.' },
  }
  const s = statusMap[demande.status] || statusMap.pending
  const StatusIcon = s.icon

  const steps = [
    { label: 'Demande reçue',    done: true },
    { label: 'Analyse en cours', done: demande.status !== 'pending' },
    { label: 'Devis validé',     done: demande.status === 'approved' || demande.status === 'completed' },
    { label: 'En réalisation',   done: demande.status === 'completed' },
    { label: 'Livré',            done: demande.status === 'completed' },
  ]

  const montantTTC = parseFloat(demande.amount.replace(/[^0-9]/g,''))
  const montantHT  = Math.round(montantTTC / 1.20)
  const tvaAmt     = montantTTC - montantHT

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1213]/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-white border border-[rgba(5,56,118,0.12)] rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto modal-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B74C1]/12 to-[#55DDB5]/12 p-6 border-b border-[rgba(5,56,118,0.1)]">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-[#053876]">{demande.service}</h2>
                  <span className="text-xs text-[#25364A]/60 font-mono bg-[#F6F6F7] px-2 py-0.5 rounded-full">{demande.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F6F6F7] hover:bg-[#E8EDF1] flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-[#25364A]" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Message statut */}
          <div className={`rounded-xl p-3 border ${s.color} flex items-start gap-2`}>
            <StatusIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{s.desc}</p>
          </div>

          {/* Description */}
          <div className="bg-[#F6F6F7] rounded-xl p-4">
            <p className="text-[#25364A]/60 text-xs font-bold uppercase tracking-wide mb-2">Description de la demande</p>
            <p className="text-[#25364A] text-sm leading-relaxed">{demande.description}</p>
          </div>

          {/* Infos clés */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F6F6F7] rounded-xl p-3">
              <p className="text-[#25364A]/60 text-xs mb-1">Date de demande</p>
              <p className="text-[#053876] font-semibold text-sm">{demande.date}</p>
            </div>
            <div className="bg-[#F6F6F7] rounded-xl p-3">
              <p className="text-[#25364A]/60 text-xs mb-1">Livraison estimée</p>
              <p className="text-[#053876] font-semibold text-sm">{demande.estimatedDelivery || '—'}</p>
            </div>
          </div>

          {/* Montant décomposé */}
          <div className="bg-[#F6F6F7] rounded-xl overflow-hidden">
            <div className="bg-[#053876] px-4 py-2 text-xs font-bold text-white uppercase tracking-wide">Détail financier</div>
            <div className="px-4 py-2 flex justify-between text-xs text-[#25364A]/70 border-b border-[rgba(5,56,118,0.08)]">
              <span>Montant HT</span><span>{montantHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-[#25364A]/70 border-b border-[rgba(5,56,118,0.08)]">
              <span>TVA 20%</span><span>+ {tvaAmt.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-[#0B74C1]/12 to-[#55DDB5]/12 flex justify-between items-center">
              <span className="text-[#053876] font-bold text-sm">Total TTC</span>
              <span className="text-lg font-bold text-[#2AACB2]">{demande.amount}</span>
            </div>
          </div>

          {/* Suivi étapes */}
          <div>
            <p className="text-[#25364A]/60 text-xs font-bold uppercase tracking-wide mb-3">Suivi de la demande</p>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${step.done ? 'bg-[#2AACB2]' : 'bg-[#E8EDF1] border border-[rgba(5,56,118,0.2)]'}`}>
                    {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute" style={{ display: 'none' }} />
                  )}
                  <span className={`text-sm ${step.done ? 'text-[#053876] font-medium' : 'text-[#25364A]/50'}`}>{step.label}</span>
                  {step.done && <span className="text-xs text-[#2AACB2] ml-auto">✓</span>}
                </div>
              ))}
            </div>
            {/* Ligne de progression */}
            <div className="mt-3">
              <div className="w-full bg-[#E8EDF1] rounded-full h-1.5">
                <div className="bg-gradient-to-r from-[#2AACB2] to-[#55DDB5] rounded-full h-1.5 transition-all duration-700"
                  style={{ width: `${(steps.filter(s => s.done).length / steps.length) * 100}%` }} />
              </div>
              <p className="text-[#25364A]/50 text-xs mt-1">{steps.filter(s => s.done).length}/{steps.length} étapes complétées</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[rgba(5,56,118,0.2)] text-[#25364A] text-sm hover:bg-[#F6F6F7] transition-all">
            Fermer
          </button>
          {(demande.status === 'approved' || demande.status === 'completed') && (
            <button onClick={() => { onClose(); onDownload(demande) }}
              className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)] flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Télécharger PDF
            </button>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalDownload = ({ demande, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateDevisPDF(demande)
      setStatus('done')
      setTimeout(onClose, 1800)
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1213]/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-white border border-[rgba(5,56,118,0.12)] rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-[#053876]">Télécharger le devis</h2>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F6F6F7] hover:bg-[#E8EDF1] flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-[#25364A]" />
            </button>
          </div>

          <div className="bg-[#F6F6F7] rounded-xl p-4 mb-5 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex flex-col items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-[#053876] font-semibold">Devis-{demande.id}.pdf</p>
              <p className="text-[#25364A]/70 text-sm">{demande.service}</p>
              <p className="text-[#2AACB2] text-xs font-semibold mt-0.5">{demande.amount} TTC</p>
            </div>
          </div>

          <div className="bg-[#0B74C1]/10 border border-[#0B74C1]/20 rounded-xl p-3 mb-5 text-xs text-[#0B74C1]">
            📄 Devis professionnel avec détail HT/TVA, coordonnées, conditions et suivi de livraison.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-[#2AACB2]" />
              <p className="text-[#2AACB2] font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <p className="text-red-500 text-sm">Erreur de génération</p>
              <button onClick={handleDownload} className="text-[#2AACB2] hover:text-[#0B74C1] text-xs underline transition-colors">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[rgba(5,56,118,0.2)] text-[#25364A] text-sm hover:bg-[#F6F6F7] transition-all">Annuler</button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white text-sm font-medium transition-all duration-300 disabled:opacity-70 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)] flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération...</>
                  : <><Download className="w-4 h-4" /> Télécharger</>
                }
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Demandes = () => {
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [searchTerm, setSearchTerm]     = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [modalDetails, setModalDetails] = useState(null)
  const [modalDownload, setModalDownload] = useState(null)
  const [demandes, setDemandes] = useState([])

  useEffect(() => {
    devisApi.getMyDevis().then(res => {
      const data = (res.data?.devis || res.data || []).map(d => ({
        ...d,
        id: d.requestNumber || d._id,
        service: d.service || d.serviceType || 'Service',
        description: d.description || d.projectDescription || '',
        date: d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : '',
        amount: d.budget ? `${d.budget}€` : d.estimatedBudget ? `${d.estimatedBudget}€` : 'Sur devis',
        estimatedDelivery: d.deadline ? new Date(d.deadline).toLocaleDateString('fr-FR') : '-',
      }))
      setDemandes(data)
    }).catch(err => console.error('Erreur chargement demandes:', err))
  }, [])

  const getStatusConfig = (status) => ({
    pending:   { label: 'En attente', icon: Clock,       color: 'bg-amber-100 text-amber-700 border-amber-300/50' },
    approved:  { label: 'Approuvé',   icon: CheckCircle, color: 'bg-[#55DDB5]/15 text-[#1D5B9B] border-[#55DDB5]/50' },
    completed: { label: 'Terminé',    icon: CheckCircle, color: 'bg-blue-100 text-blue-700 border-blue-300/50' },
    rejected:  { label: 'Refusé',     icon: XCircle,     color: 'bg-red-100 text-red-700 border-red-300/50' },
  }[status] || { label: 'En attente', icon: Clock, color: 'bg-amber-100 text-amber-700 border-amber-300/50' })

  const filteredDemandes = demandes.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  const stats = [
    { label: 'Total',      value: demandes.length, color: 'from-[#0B74C1] to-[#2AACB2]' },
    { label: 'En attente', value: demandes.filter(d => d.status === 'pending').length,   color: 'from-[#4681B7] to-[#72A5CE]' },
    { label: 'Approuvés',  value: demandes.filter(d => d.status === 'approved').length,  color: 'from-[#2AACB2] to-[#55DDB5]' },
    { label: 'Terminés',   value: demandes.filter(d => d.status === 'completed').length, color: 'from-[#053876] to-[#2AACB2]' },
  ]

  return (
    <div className="omedev-vm">
      <style>{globalStyles}</style>

      <AnimatePresence>
        {modalDetails && (
          <ModalDetails demande={modalDetails}
            onClose={() => setModalDetails(null)}
            onDownload={d => { setModalDetails(null); setModalDownload(d) }} />
        )}
        {modalDownload && (
          <ModalDownload demande={modalDownload} onClose={() => setModalDownload(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen" style={{ background: '#F6F6F7' }}>
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              {/* Titre */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">Mes demandes de devis</h1>
                <p className="text-[#25364A]/70 mt-1">Suivez l'état de vos demandes et devis</p>
              </motion.div>

              {/* Stats rapides */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-4 flex items-center gap-3 shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.4)] transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                    </div>
                    <span className="text-[#25364A]/70 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Filtres */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-4 mb-6 shadow-[0_10px_30px_rgba(5,56,118,0.06)]">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#25364A]/50" />
                    <input type="text" placeholder="Rechercher par numéro ou service..."
                      value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] placeholder-[#25364A]/45 focus:outline-none focus:border-[#2AACB2] transition-all" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#25364A]/60 flex-shrink-0" />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white border border-[rgba(5,56,118,0.18)] text-[#0B1213] focus:outline-none focus:border-[#2AACB2] transition-all cursor-pointer">
                      <option value="all" className="bg-white">Tous les statuts</option>
                      <option value="pending" className="bg-white">En attente</option>
                      <option value="approved" className="bg-white">Approuvés</option>
                      <option value="completed" className="bg-white">Terminés</option>
                      <option value="rejected" className="bg-white">Refusés</option>
                    </select>
                  </div>
                </div>
              </motion.div>

              {/* Grille */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDemandes.map((demande) => {
                  const status = getStatusConfig(demande.status)
                  const StatusIcon = status.icon
                  return (
                    <motion.div key={demande.id} variants={fadeUp}
                      className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.4)] transition-all hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(11,116,193,0.14)] flex flex-col h-full group">

                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0B74C1] to-[#2AACB2]" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#0B74C1] to-[#2AACB2] flex items-center justify-center shadow-lg">
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-[#25364A]/60 font-mono">{demande.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#0B74C1]" />
                              <span className="text-xs text-[#25364A]/70">{demande.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-[#053876] mb-1 line-clamp-1 group-hover:text-[#0B74C1] transition-colors">
                            {demande.service}
                          </h3>
                          <p className="text-sm text-[#25364A]/70 line-clamp-2">{demande.description}</p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Statut */}
                        <div className="mb-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color}`}>
                            <StatusIcon className="w-3 h-3" /> {status.label}
                          </span>
                        </div>

                        {/* Montant encadré */}
                        <div className="bg-[#F6F6F7] rounded-xl p-3 mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-[#25364A]/60 text-xs mb-0.5">Montant TTC</p>
                            <p className="text-lg font-bold text-[#053876]">{demande.amount}</p>
                          </div>
                          <Euro className="w-6 h-6 text-[#0B74C1] opacity-40" />
                        </div>

                        {/* Livraison estimée si approuvé */}
                        {demande.status === 'approved' && (
                          <div className="mb-4 p-3 rounded-xl bg-[#4681B7]/12 border border-[#4681B7]/30">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-[#4681B7]" />
                              <div>
                                <p className="text-xs text-[#25364A]/60">Livraison estimée</p>
                                <p className="text-sm font-medium text-[#4681B7]">{demande.estimatedDelivery}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-[rgba(5,56,118,0.1)]">
                          <button onClick={() => setModalDetails(demande)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white text-xs font-medium transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)]">
                            <Eye className="w-3.5 h-3.5" /> Détails
                          </button>
                          {(demande.status === 'approved' || demande.status === 'completed') && (
                            <button onClick={() => setModalDownload(demande)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#25364A] text-xs font-medium hover:bg-[#F6F6F7] hover:text-[#053876] transition-all">
                              <Download className="w-3.5 h-3.5" /> PDF
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty state */}
              {filteredDemandes.length === 0 && (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)]">
                  <AlertCircle className="w-16 h-16 text-[#25364A]/30 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#053876]">Aucune demande trouvée</h3>
                  <p className="text-[#25364A]/60 mt-1">Essayez de modifier vos critères de recherche</p>
                </motion.div>
              )}

            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Demandes
