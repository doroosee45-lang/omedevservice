import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  History as HistoryIcon,
  CheckCircle,
  Download,
  Eye,
  Search,
  Calendar,
  Euro,
  FileText,
  FolderKanban,
  GraduationCap,
  X,
  Clock,
  User,
  MapPin,
  Tag,
  Layers,
  ChevronRight,
  Shield,
  Wrench,
  Star,
  ArrowLeft
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
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
  exit:   { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2 } }
}

/* ─── Infos entreprise ────────────────────────────────────────────────────── */
const ENTREPRISE = {
  nom:    'TechVision Solutions',
  siret:  '842 391 027 00034',
  adresse:'14 Rue de la République',
  ville:  '75001 Paris, France',
  tel:    '+33 1 42 86 00 00',
  email:  'contact@techvision.fr',
  site:   'www.techvision.fr',
  tva:    'FR 83 842391027',
  iban:   'FR76 3000 6000 0112 3456 7890 189',
  bic:    'BNPAFRPPXXX',
  banque: 'BNP Paribas',
  logo:   'TV'
}

/* ─── Détails étendus par item ────────────────────────────────────────────── */
const DETAILS = {
  'PRJ-001': {
    description: "Création complète d'une boutique en ligne avec gestion des stocks, panier, paiement Stripe et interface d'administration.",
    duree: '6 semaines',
    intervenant: 'Thomas Renard',
    lieu: 'Paris & Remote',
    phases: ['Analyse & cahier des charges','Maquettes UI/UX','Développement frontend','Développement backend','Tests & recette','Mise en production'],
    note: 5,
    technologies: ['React','Node.js','MongoDB','Stripe','AWS']
  },
  'PRJ-002': {
    description: 'Installation et configuration d\'un réseau LAN/Wi-Fi sécurisé pour bureaux de 50 postes avec VLAN et firewall.',
    duree: '3 semaines',
    intervenant: 'Karim Benali',
    lieu: 'Lyon',
    phases: ['Audit infrastructure existante','Plan réseau','Installation switchs & bornes','Configuration VLAN','Tests de débit & sécurité'],
    note: 5,
    technologies: ['Cisco','pfSense','UniFi','VLAN','802.1X']
  },
  'DEV-003': {
    description: "Fourniture et pose d'un système de vidéosurveillance IP avec 12 caméras, NVR et accès mobile sécurisé.",
    duree: '2 semaines',
    intervenant: 'Julie Moreau',
    lieu: 'Marseille',
    phases: ['Étude des points de surveillance','Installation caméras','Configuration NVR','Accès mobile & alertes','Formation utilisateurs'],
    note: 4,
    technologies: ['Hikvision','RTSP','H.265','VPN','iOS/Android']
  },
  'FRM-001': {
    description: 'Formation intensive de 2 jours sur les bonnes pratiques en cybersécurité : phishing, mots de passe, RGPD, réponse aux incidents.',
    duree: '2 jours',
    intervenant: 'Sarah Petit',
    lieu: 'Bordeaux',
    phases: ['Introduction aux menaces actuelles','Ateliers pratiques phishing','Gestion des mots de passe','Conformité RGPD','Exercice incident response'],
    note: 5,
    technologies: ['Phishing','RGPD','ISO 27001','KeePass','Awareness']
  },
  'PRJ-004': {
    description: "Migration complète de l'infrastructure on-premise vers AWS : serveurs, bases de données, sauvegardes et supervision.",
    duree: '10 semaines',
    intervenant: 'Antoine Leblanc',
    lieu: 'Remote',
    phases: ['Audit infrastructure existante','Architecture cible AWS','Migration base de données','Migration applicatif','Tests de bascule','Mise en production','Formation équipe IT'],
    note: 5,
    technologies: ['AWS','Terraform','Docker','RDS','CloudWatch','S3']
  },
  'DEV-005': {
    description: "Audit complet de la sécurité SI : tests d'intrusion, analyse des vulnérabilités, rapport de recommandations.",
    duree: '4 semaines',
    intervenant: 'Marc Duval',
    lieu: 'Remote & On-site',
    phases: ['Reconnaissance passive','Tests d\'intrusion périmètre','Audit postes clients','Analyse logs & SIEM','Rapport & recommandations','Plan de remédiation'],
    note: 5,
    technologies: ['Nmap','Metasploit','Burp Suite','Splunk','OWASP']
  }
}

/* ─── Génération PDF via jsPDF ────────────────────────────────────────────── */
const generateHistoriquePDF = async (item) => {
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
  const details = DETAILS[item.id] || {}
  const montantNum = parseInt(item.amount.replace(/\D/g,''))
  const montantHT  = Math.round(montantNum / 1.20)
  const tvaAmt     = montantNum - montantHT

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
  const purple  = [139, 92, 246]

  const typeColor = item.type === 'Formation' ? purple : item.type === 'Devis' ? emerald : blue

  // Fond blanc
  doc.setFillColor(...white)
  doc.rect(0, 0, W, 297, 'F')

  // Header navy
  doc.setFillColor(...navy)
  doc.rect(0, 0, W, 52, 'F')
  doc.setFillColor(...typeColor)
  doc.rect(0, 50, W, 3, 'F')

  // Logo
  doc.setFillColor(...typeColor)
  doc.circle(22, 22, 12, 'F')
  doc.setTextColor(...white)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text(ENTREPRISE.logo, 22, 26, { align: 'center' })

  // Nom entreprise
  doc.setFontSize(18)
  doc.setTextColor(...white)
  doc.text(ENTREPRISE.nom, 40, 20)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(148, 163, 184)
  doc.text('Solutions Digitales & Infrastructures IT', 40, 27)

  // Type doc + ID
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...white)
  doc.text(`FACTURE ${item.type.toUpperCase()}`, W - 15, 20, { align: 'right' })
  doc.setFontSize(10)
  doc.setTextColor(...cyan)
  doc.text(item.id, W - 15, 28, { align: 'right' })

  // Badge TERMINE
  doc.setFillColor(...emerald)
  doc.roundedRect(W - 50, 33, 35, 10, 2, 2, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.setTextColor(...white)
  doc.text('TERMINE', W - 32.5, 39.5, { align: 'center' })

  // ── Blocs émetteur / client
  let y = 65
  const drawBloc = (x, w, col, titre, lines) => {
    doc.setFillColor(...gray50)
    doc.roundedRect(x, y, w, 50, 3, 3, 'F')
    doc.setFillColor(...col)
    doc.roundedRect(x, y, w, 8, 3, 3, 'F')
    doc.rect(x, y + 4, w, 4, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...white)
    doc.text(titre, x + 7, y + 5.5)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9.5)
    doc.setTextColor(...gray700)
    doc.text(lines[0], x + 5, y + 15)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    lines.slice(1).forEach((l, i) => doc.text(l, x + 5, y + 22 + i * 6))
  }

  drawBloc(12, 85, blue, 'EMETTEUR', [
    ENTREPRISE.nom,
    `SIRET : ${ENTREPRISE.siret}`,
    `TVA : ${ENTREPRISE.tva}`,
    ENTREPRISE.adresse,
    ENTREPRISE.ville,
    ENTREPRISE.tel,
    ENTREPRISE.email
  ])

  drawBloc(110, 88, navy, 'CLIENT / DESTINATAIRE', [
    item.type === 'PRJ-001' ? 'Boutique Elegance SARL' : 'Client TechVision',
    `Responsable : M. Jean Dupont`,
    "12 Avenue de l'Innovation",
    '69002 Lyon, France',
    'contact@client.fr',
    '+33 4 72 00 00 00'
  ])

  // ── Infos mission
  y = 124
  doc.setFillColor(...gray100)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  const infos = [
    { x: 25,  label: 'Date realisation', val: item.date },
    { x: 82,  label: 'Duree',           val: details.duree || 'N/A' },
    { x: 138, label: 'Reference',        val: item.id },
  ]
  infos.forEach(({ x, label, val }) => {
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7)
    doc.setTextColor(...gray500)
    doc.text(label, x, y + 6)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(...gray700)
    doc.text(val, x, y + 13)
  })

  // ── Description
  y = 150
  doc.setFillColor(...gray50)
  doc.roundedRect(12, y, 186, 22, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...navy)
  doc.text('DESCRIPTION DE LA PRESTATION', 17, y + 7)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(...gray500)
  const desc = details.description || `Prestation — ${item.name}`
  const descLines = doc.splitTextToSize(desc, 175)
  descLines.slice(0,2).forEach((l, i) => doc.text(l, 17, y + 14 + i * 5))

  // ── Tableau
  y = 180
  doc.setFillColor(...navy)
  doc.rect(12, y, 186, 9, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(...white)
  doc.text('DESIGNATION', 17, y + 6)
  doc.text('TYPE', 108, y + 6)
  doc.text('TVA', 145, y + 6)
  doc.text('MONTANT HT', W - 15, y + 6, { align: 'right' })

  const lignes = [
    { desc: item.name, type: item.type, tva: '20%', ht: montantHT },
    { desc: `Intervenant : ${details.intervenant || 'N/A'}`, type: 'Inclus', tva: '', ht: 0 },
  ]
  lignes.forEach((l, i) => {
    const ly = y + 9 + i * 15
    doc.setFillColor(i % 2 === 0 ? 255 : 250, i % 2 === 0 ? 255 : 251, i % 2 === 0 ? 255 : 253)
    doc.rect(12, ly, 186, 15, 'F')
    doc.setFillColor(...typeColor)
    doc.rect(12, ly, 2, 15, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(...gray700)
    doc.text(l.desc, 17, ly + 9)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...gray500)
    doc.text(l.type, 110, ly + 9)
    doc.text(l.tva, 147, ly + 9)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(...gray700)
    if (l.ht > 0) doc.text(`${l.ht.toLocaleString('fr-FR')} EUR`, W - 15, ly + 9, { align: 'right' })
  })

  // ── Totaux
  y = y + 9 + lignes.length * 15 + 4
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
  doc.setFillColor(...navy)
  doc.roundedRect(120, y, 78, 14, 3, 3, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('TOTAL TTC', 128, y + 9)
  doc.setFontSize(12)
  doc.setTextColor(...cyan)
  doc.text(`${montantNum.toLocaleString('fr-FR')} EUR`, W - 15, y + 9, { align: 'right' })

  // ── Statut REGLE
  y += 22
  doc.setFillColor(240, 253, 244)
  doc.roundedRect(12, y, 186, 18, 3, 3, 'F')
  doc.setFillColor(...emerald)
  doc.roundedRect(12, y, 186, 8, 3, 3, 'F')
  doc.rect(12, y + 4, 186, 4, 'F')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(...white)
  doc.text('PRESTATION TERMINEE ET FACTURE REGLEE', W / 2, y + 6, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(21, 128, 61)
  doc.text(`Date : ${item.date}  •  Montant : ${item.amount} TTC  •  Reference : ${item.id}`, W / 2, y + 14, { align: 'center' })

  // ── Mentions légales
  y += 26
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7)
  doc.setTextColor(...gray500)
  doc.text("En cas de retard de paiement, des penalites au taux legal seront appliquees (Art. L.441-10 du Code de commerce).", 12, y)
  doc.text("Pas d'escompte pour reglement anticipe. TVA acquittee sur les debits.", 12, y + 5)

  // ── Footer
  doc.setFillColor(...navy)
  doc.rect(0, 277, W, 20, 'F')
  doc.setFillColor(...typeColor)
  doc.rect(0, 276, W, 1.5, 'F')
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(7.5)
  doc.setTextColor(148, 163, 184)
  doc.text(`${ENTREPRISE.nom}  •  ${ENTREPRISE.adresse}, ${ENTREPRISE.ville}`, W / 2, 284, { align: 'center' })
  doc.text(`${ENTREPRISE.tel}  •  ${ENTREPRISE.email}  •  ${ENTREPRISE.site}`, W / 2, 290, { align: 'center' })
  doc.setFontSize(7)
  doc.setTextColor(100, 116, 139)
  doc.text('Page 1/1', W - 12, 294, { align: 'right' })

  doc.save(`Facture-${item.id}-${item.name.replace(/\s/g,'_')}.pdf`)
}

/* ─── Modal: Détails ──────────────────────────────────────────────────────── */
const ModalDetails = ({ item, onClose, onDownload }) => {
  const details  = DETAILS[item.id] || {}
  const typeColor = item.type === 'Formation' ? 'from-purple-500 to-pink-500'
    : item.type === 'Devis' ? 'from-emerald-500 to-teal-500'
    : 'from-blue-500 to-cyan-500'
  const typeText  = item.type === 'Formation' ? 'text-purple-400'
    : item.type === 'Devis' ? 'text-emerald-400'
    : 'text-blue-400'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit"
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-6 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${typeColor} flex items-center justify-center shadow-lg`}>
                {item.type === 'Projet' ? <FolderKanban className="w-5 h-5 text-white" />
                  : item.type === 'Devis' ? <FileText className="w-5 h-5 text-white" />
                  : <GraduationCap className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">{item.name}</h2>
                <p className="text-gray-400 text-sm font-mono">{item.id}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <X className="w-4 h-4 text-gray-300" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle className="w-3.5 h-3.5" /> Terminé
            </span>
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} bg-opacity-20 text-white`}>
              {item.type}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-5">
          {/* Description */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className={`text-xs font-bold uppercase tracking-wide mb-2 ${typeText}`}>Description</p>
            <p className="text-gray-300 text-sm leading-relaxed">{details.description || `Prestation — ${item.name}.`}</p>
          </div>

          {/* Infos clés */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar,  label: 'Date',        val: item.date },
              { icon: Clock,     label: 'Durée',        val: details.duree || 'N/A' },
              { icon: User,      label: 'Intervenant',  val: details.intervenant || 'N/A' },
              { icon: MapPin,    label: 'Lieu',         val: details.lieu || 'N/A' },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="bg-white/5 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="w-3.5 h-3.5 text-gray-500" />
                  <p className="text-gray-500 text-xs">{label}</p>
                </div>
                <p className="text-white font-semibold text-sm">{val}</p>
              </div>
            ))}
          </div>

          {/* Phases */}
          {details.phases && (
            <div className="bg-white/5 rounded-xl p-4">
              <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${typeText}`}>Phases réalisées</p>
              <div className="space-y-2">
                {details.phases.map((phase, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span className="text-gray-300 text-sm">{phase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {details.technologies && (
            <div className="bg-white/5 rounded-xl p-4">
              <p className={`text-xs font-bold uppercase tracking-wide mb-3 ${typeText}`}>Technologies & outils</p>
              <div className="flex flex-wrap gap-2">
                {details.technologies.map(tech => (
                  <span key={tech} className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} text-white shadow-sm`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Note satisfaction */}
          {details.note && (
            <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs mb-1">Satisfaction client</p>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} className={`w-4 h-4 ${n <= details.note ? 'text-amber-400 fill-amber-400' : 'text-gray-600'}`} />
                  ))}
                </div>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-xs mb-1">Montant total</p>
                <p className="text-xl font-bold text-white">{item.amount}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
            Fermer
          </button>
          <button onClick={() => { onClose(); onDownload(item) }}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg">
            <Download className="w-4 h-4" /> Télécharger Facture
          </button>
        </div>
      </motion.div>
    </div>
  )
}

/* ─── Modal: Télécharger PDF ──────────────────────────────────────────────── */
const ModalTelecharger = ({ item, onClose }) => {
  const [status, setStatus] = useState('idle')

  const handleDownload = async () => {
    setStatus('loading')
    try {
      await generateHistoriquePDF(item)
      setStatus('done')
      setTimeout(onClose, 2000)
    } catch {
      setStatus('error')
    }
  }

  const typeColor = item.type === 'Formation' ? 'from-purple-500 to-pink-500'
    : item.type === 'Devis' ? 'from-emerald-500 to-teal-500'
    : 'from-blue-500 to-cyan-500'

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
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex flex-col items-center justify-center shadow-lg`}>
              <FileText className="w-6 h-6 text-white" />
              <span className="text-white text-[9px] font-bold mt-0.5">PDF</span>
            </div>
            <div>
              <p className="text-white font-semibold">Facture-{item.id}.pdf</p>
              <p className="text-gray-400 text-sm">{item.name}</p>
              <p className="text-emerald-400 text-xs font-semibold mt-0.5">{item.amount} TTC</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mb-5 text-xs text-blue-300">
            📄 Facture professionnelle avec détails de la prestation, HT/TVA, coordonnées et mentions légales.
          </div>

          {status === 'done' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <CheckCircle className="w-10 h-10 text-emerald-400" />
              <p className="text-emerald-400 font-semibold">Téléchargement réussi !</p>
            </div>
          ) : status === 'error' ? (
            <div className="flex flex-col items-center gap-2 py-3">
              <X className="w-8 h-8 text-red-400" />
              <p className="text-red-400 text-sm">Erreur lors de la génération</p>
              <button onClick={handleDownload} className="text-blue-400 text-xs underline">Réessayer</button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/20 text-gray-300 text-sm hover:bg-white/10 transition-all">
                Annuler
              </button>
              <button onClick={handleDownload} disabled={status === 'loading'}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium hover:scale-105 transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2">
                {status === 'loading'
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Génération...</>
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

/* ─── Composant Principal ─────────────────────────────────────────────────── */
const Historique = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm]   = useState('')
  const [yearFilter, setYearFilter]   = useState('all')
  const [modalDetails, setModalDetails]     = useState(null)
  const [modalDownload, setModalDownload]   = useState(null)

  const historique = [
    { id: 'PRJ-001', name: 'Site E-commerce',       type: 'Projet',    date: '15/12/2025', status: 'completed', amount: '5 000€', icon: FolderKanban },
    { id: 'PRJ-002', name: 'Installation Réseau',    type: 'Projet',    date: '10/11/2025', status: 'completed', amount: '3 200€', icon: FolderKanban },
    { id: 'DEV-003', name: 'Vidéosurveillance',      type: 'Devis',     date: '05/10/2025', status: 'completed', amount: '2 800€', icon: FileText },
    { id: 'FRM-001', name: 'Formation Cybersécurité', type: 'Formation', date: '20/09/2025', status: 'completed', amount: '1 500€', icon: GraduationCap },
    { id: 'PRJ-004', name: 'Migration Cloud',         type: 'Projet',    date: '01/08/2025', status: 'completed', amount: '8 500€', icon: FolderKanban },
    { id: 'DEV-005', name: 'Audit Sécurité',          type: 'Devis',     date: '15/07/2025', status: 'completed', amount: '4 200€', icon: FileText },
  ]

  const filteredHistorique = historique.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear   = yearFilter === 'all' || item.date.includes(yearFilter)
    return matchesSearch && matchesYear
  })

  const years = ['all', '2025', '2024', '2023']

  const getTypeColor = (type) => {
    switch(type) {
      case 'Projet':    return 'from-blue-500 to-cyan-500'
      case 'Devis':     return 'from-emerald-500 to-teal-500'
      case 'Formation': return 'from-purple-500 to-pink-500'
      default:          return 'from-blue-500 to-cyan-500'
    }
  }

  const getTypeIcon = (type) => {
    switch(type) {
      case 'Projet':    return <FolderKanban className="w-3 h-3" />
      case 'Devis':     return <FileText className="w-3 h-3" />
      case 'Formation': return <GraduationCap className="w-3 h-3" />
      default:          return <FolderKanban className="w-3 h-3" />
    }
  }

  return (
    <>
      <style>{globalStyles}</style>

      {/* Modals */}
      <AnimatePresence>
        {modalDetails && (
          <ModalDetails item={modalDetails}
            onClose={() => setModalDetails(null)}
            onDownload={item => { setModalDetails(null); setModalDownload(item) }} />
        )}
        {modalDownload && (
          <ModalTelecharger item={modalDownload} onClose={() => setModalDownload(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        
        {/* Header */}
        <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex">
          {/* Sidebar */}
          <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
            <ClientSidebar />
          </div>

          {/* Overlay for mobile */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Main content */}
          <div className="flex-1 lg:ml-64">
            <main className="p-6 md:p-8">
              
              {/* Header Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-white font-syne">Historique</h1>
                <p className="text-gray-400 mt-1">Consultez l'historique de vos projets et interventions</p>
              </motion.div>

              {/* Filters */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 mb-6"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Rechercher par nom ou numéro..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
                    />
                  </div>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
                  >
                    {years.map(year => (
                      <option key={year} value={year} className="bg-slate-800">
                        {year === 'all' ? 'Toutes les années' : year}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Grid 3 colonnes */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredHistorique.map((item) => {
                  const typeColor = getTypeColor(item.type)
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full"
                    >
                      {/* Header with gradient bar */}
                      <div className="relative">
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                        <div className="p-5 pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${typeColor} flex items-center justify-center shadow-lg`}>
                                {getTypeIcon(item.type)}
                              </div>
                              <span className="text-xs text-gray-500 font-mono">{item.id}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-blue-400" />
                              <span className="text-xs text-gray-400">{item.date}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-2">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${typeColor} bg-opacity-20 text-white`}>
                              {getTypeIcon(item.type)}
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex-1 flex flex-col">
                        {/* Amount */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Euro className="w-4 h-4 text-emerald-400" />
                            <span className="text-2xl font-bold text-white">{item.amount}</span>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-sm text-gray-400">Terminé</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-auto pt-3 border-t border-white/10">
                          <button
                            onClick={() => setModalDetails(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/20 text-gray-300 text-xs font-medium hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-500/50 transition-all"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Détails
                          </button>
                          <button
                            onClick={() => setModalDownload(item)}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-medium hover:scale-105 transition-all"
                          >
                            <Download className="w-3.5 h-3.5" />
                            Facture
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>

              {/* Empty State */}
              {filteredHistorique.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl"
                >
                  <HistoryIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white">Aucun historique trouvé</h3>
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

export default Historique