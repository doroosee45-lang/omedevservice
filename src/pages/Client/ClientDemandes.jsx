import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .modal-scroll::-webkit-scrollbar { width: 4px; }
  .modal-scroll::-webkit-scrollbar-track { background: transparent; }
  .modal-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
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
  nom: 'TechVision Solutions',
  siret: '842 391 027 00034',
  adresse: '14 Rue de la République, 75001 Paris',
  tel: '+33 1 42 86 00 00',
  email: 'contact@techvision.fr',
  tva: 'FR 83 842391027',
  logo: 'TV'
}

/* ─── Génération PDF devis ────────────────────────────────────────────────── */
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
  const navy=[15,23,42], blue=[59,130,246], cyan=[6,182,212], emerald=[16,185,129]
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
    approved:  { label:'APPROUVE',   c:[16,185,129] },
    completed: { label:'TERMINE',    c:[59,130,246] },
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
    pending:   { label: 'En attente', color: 'text-amber-400  bg-amber-500/15  border-amber-500/30',   icon: Clock,        desc: 'Votre demande est en cours d\'analyse par notre équipe.' },
    approved:  { label: 'Approuvé',   color: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30', icon: CheckCircle,  desc: 'Votre devis a été approuvé. Les travaux vont démarrer prochainement.' },
    completed: { label: 'Terminé',    color: 'text-blue-400   bg-blue-500/15    border-blue-500/30',    icon: CheckCircle,  desc: 'Prestation terminée. Merci pour votre confiance !' },
    rejected:  { label: 'Refusé',     color: 'text-red-400    bg-red-500/15     border-red-500/30',     icon: XCircle,      desc: 'Votre demande n\'a pas pu être acceptée. Contactez-nous pour plus d\'informations.' },
  }
  const s = statusMap[demande.status] || statusMap.pending
  const StatusIcon = s.icon

  // Étapes du suivi
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto modal-scroll"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600/25 to-cyan-600/25 p-6 border-b border-white/10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-white">{demande.service}</h2>
                  <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded-full">{demande.id}</span>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${s.color}`}>
                  <StatusIcon className="w-3 h-3" /> {s.label}
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all flex-shrink-0">
              <X className="w-4 h-4 text-gray-300" />
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
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">Description de la demande</p>
            <p className="text-gray-300 text-sm leading-relaxed">{demande.description}</p>
          </div>

          {/* Infos clés */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Date de demande</p>
              <p className="text-white font-semibold text-sm">{demande.date}</p>
            </div>
            <div className="bg-white/5 rounded-xl p-3">
              <p className="text-gray-500 text-xs mb-1">Livraison estimée</p>
              <p className="text-white font-semibold text-sm">{demande.estimatedDelivery || '—'}</p>
            </div>
          </div>

          {/* Montant décomposé */}
          <div className="bg-white/5 rounded-xl overflow-hidden">
            <div className="bg-slate-800 px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wide">Détail financier</div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>Montant HT</span><span>{montantHT.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-2 flex justify-between text-xs text-gray-400 border-b border-white/5">
              <span>TVA 20%</span><span>+ {tvaAmt.toLocaleString('fr-FR')} €</span>
            </div>
            <div className="px-4 py-3 bg-gradient-to-r from-emerald-600/15 to-teal-600/15 flex justify-between items-center">
              <span className="text-white font-bold text-sm">Total TTC</span>
              <span className="text-lg font-bold text-emerald-400">{demande.amount}</span>
            </div>
          </div>

          {/* Suivi étapes */}
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wide mb-3">Suivi de la demande</p>
            <div className="space-y-2">
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${step.done ? 'bg-emerald-500' : 'bg-white/10 border border-white/20'}`}>
                    {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="absolute" style={{ display: 'none' }} />
                  )}
                  <span className={`text-sm ${step.done ? 'text-white font-medium' : 'text-gray-500'}`}>{step.label}</span>
                  {step.done && <span className="text-xs text-emerald-400 ml-auto">✓</span>}
                </div>
              ))}
            </div>
            {/* Ligne de progression */}
            <div className="mt-3">
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full h-1.5 transition-all duration-700"
                  style={{ width: `${(steps.filter(s => s.done).length / steps.length) * 100}%` }} />
              </div>
              <p className="text-gray-500 text-xs mt-1">{steps.filter(s => s.done).length}/{steps.length} étapes complétées</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          {(demande.status === 'approved' || demande.status === 'completed') && (
            <button onClick={() => { onClose(); onDownload(demande) }}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all flex items-center justify-center gap-2">
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Télécharger le devis</h2>
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
              <p className="text-white font-semibold">Devis-{demande.id}.pdf</p>
              <p className="text-gray-400 text-sm">{demande.service}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{demande.amount} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Devis professionnel avec détail HT/TVA, coordonnées, conditions et suivi de livraison.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur de génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">Annuler</button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
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

  const demandes = [
    { id: 'DEV-001', service: 'Développement Digital',   description: 'Site e-commerce complet avec paiement intégré, gestion de stock et livraison',                       date: '15/04/2026', status: 'pending',   amount: '5000€',  estimatedDelivery: '15/05/2026' },
    { id: 'DEV-002', service: 'Réseau & Infrastructure', description: 'Installation réseau complet pour 50 postes, câblage structuré et configuration VLAN',                 date: '10/04/2026', status: 'approved',  amount: '3200€',  estimatedDelivery: '10/05/2026' },
    { id: 'DEV-003', service: 'Sécurité',                description: 'Installation vidéosurveillance 16 caméras 4K avec enregistrement cloud',                             date: '05/04/2026', status: 'completed', amount: '2800€',  estimatedDelivery: '25/04/2026' },
    { id: 'DEV-004', service: 'Formation',               description: 'Formation Cybersécurité pour 10 personnes (5 jours)',                                                 date: '01/04/2026', status: 'rejected',  amount: '1500€',  estimatedDelivery: '-' },
    { id: 'DEV-005', service: 'Cloud & Hébergement',     description: 'Migration serveurs vers AWS + maintenance 24/7',                                                      date: '28/03/2026', status: 'approved',  amount: '4200€',  estimatedDelivery: '20/05/2026' },
    { id: 'DEV-006', service: 'Énergie & Équipements',   description: 'Installation 20 panneaux solaires + onduleurs',                                                      date: '20/03/2026', status: 'pending',   amount: '12500€', estimatedDelivery: '30/06/2026' },
  ]

  const getStatusConfig = (status) => ({
    pending:   { label: 'En attente', icon: Clock,        color: 'bg-amber-500/20  text-amber-400  border-amber-500/30'  },
    approved:  { label: 'Approuvé',   icon: CheckCircle,  color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    completed: { label: 'Terminé',    icon: CheckCircle,  color: 'bg-blue-500/20    text-blue-400    border-blue-500/30'   },
    rejected:  { label: 'Refusé',     icon: XCircle,      color: 'bg-red-500/20     text-red-400     border-red-500/30'    },
  }[status] || { label: 'En attente', icon: Clock, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' })

  const filteredDemandes = demandes.filter(d => {
    const matchSearch = d.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        d.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === 'all' || d.status === statusFilter
    return matchSearch && matchStatus
  })

  // Stats rapides
  const stats = [
    { label: 'Total',      value: demandes.length, color: 'from-blue-500 to-cyan-500' },
    { label: 'En attente', value: demandes.filter(d => d.status === 'pending').length,   color: 'from-amber-500 to-orange-500' },
    { label: 'Approuvés',  value: demandes.filter(d => d.status === 'approved').length,  color: 'from-emerald-500 to-teal-500' },
    { label: 'Terminés',   value: demandes.filter(d => d.status === 'completed').length, color: 'from-purple-500 to-pink-500' },
  ]

  return (
    <>
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

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>
          {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">

              {/* Titre */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Mes demandes de devis</h1>
                <p className="text-gray-400 mt-1">Suivez l'état de vos demandes et devis</p>
              </motion.div>

              {/* Stats rapides */}
              <motion.div variants={staggerContainer} initial="hidden" animate="visible"
                className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, i) => (
                  <motion.div key={i} variants={fadeUp}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center gap-3 hover:border-blue-500/30 transition-all">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="text-white font-bold text-lg">{stat.value}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* Filtres */}
              <motion.div variants={fadeUp} initial="hidden" animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Rechercher par numéro ou service..."
                      value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                      className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer">
                      <option value="all" className="bg-slate-800">Tous les statuts</option>
                      <option value="pending" className="bg-slate-800">En attente</option>
                      <option value="approved" className="bg-slate-800">Approuvés</option>
                      <option value="completed" className="bg-slate-800">Terminés</option>
                      <option value="rejected" className="bg-slate-800">Refusés</option>
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
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full group">

                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                <FileText className="w-4 h-4 text-white" />
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{demande.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-xs text-gray-400">{demande.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1 group-hover:text-blue-300 transition-colors">
                            {demande.service}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">{demande.description}</p>
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
                        <div className="bg-white/5 rounded-xl p-3 mb-4 flex items-center justify-between">
                          <div>
                            <p className="text-gray-500 text-xs mb-0.5">Montant TTC</p>
                            <p className="text-lg font-bold text-white">{demande.amount}</p>
                          </div>
                          <Euro className="w-6 h-6 text-emerald-400 opacity-40" />
                        </div>

                        {/* Livraison estimée si approuvé */}
                        {demande.status === 'approved' && (
                          <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-amber-400" />
                              <div>
                                <p className="text-xs text-gray-400">Livraison estimée</p>
                                <p className="text-sm font-medium text-amber-400">{demande.estimatedDelivery}</p>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex-1" />

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <button onClick={() => setModalDetails(demande)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all">
                            <Eye className="w-3.5 h-3.5" /> Détails
                          </button>
                          {(demande.status === 'approved' || demande.status === 'completed') && (
                            <button onClick={() => setModalDownload(demande)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-white/10 hover:text-white transition-all">
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
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl">
                  <AlertCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucune demande trouvée</h3>
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

export default Demandes