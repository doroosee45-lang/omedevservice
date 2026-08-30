import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  Printer,
  Calendar,
  Euro,
  Clock,
  User,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react'
import ClientSidebar from '../../components/ClientSidebar'
import ClientHeader from '../../components/ClientHeader'
import { devis as devisApi } from '../../services/api'

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique aux pages About / VenteMateriel / ClientDashboard
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

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

  .omedev-vm .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }
  .omedev-vm .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
`

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const DemandeDetail = () => {
  const { id } = useParams()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [demande, setDemande] = useState({
    id: id, service: '—', description: '—', date: '—', status: 'pending', amount: '—', estimatedDelivery: '—',
    technicalContact: '—', technicalEmail: '—', technicalPhone: '—', timeline: []
  })

  useEffect(() => {
    devisApi.getById(id).then(res => {
      const d = res.data
      setDemande({
        ...d,
        id: d.requestNumber || d._id,
        service: d.service || d.serviceType || '—',
        description: d.description || d.projectDescription || '—',
        date: d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : '—',
        amount: d.budget ? `${d.budget}€` : 'Sur devis',
        estimatedDelivery: d.deadline ? new Date(d.deadline).toLocaleDateString('fr-FR') : '—',
        technicalContact: d.assignedTo || 'Équipe OMEDEV',
        technicalEmail: 'doroosee45@gmail.com',
        technicalPhone: '+243 555 503 59',
        timeline: d.timeline || [
          { step: 'Demande reçue', date: d.createdAt ? new Date(d.createdAt).toLocaleDateString('fr-FR') : '—', completed: true },
        ]
      })
    }).catch(err => console.error('Erreur chargement demande:', err))
  }, [id])

  const getStatusConfig = (status) => {
    const configs = {
      pending:   { label: 'En attente', color: 'bg-amber-100 text-amber-700 border-amber-300/50' },
      approved:  { label: 'Approuvé',    color: 'bg-[#55DDB5]/15 text-[#1D5B9B] border-[#55DDB5]/50' },
      completed: { label: 'Terminé',     color: 'bg-blue-100 text-blue-700 border-blue-300/50' },
      rejected:  { label: 'Refusé',      color: 'bg-red-100 text-red-700 border-red-300/50' },
    }
    return configs[status] || configs.pending
  }

  const status = getStatusConfig(demande.status)

  return (
    <div className="omedev-vm">
      <style>{globalStyles}</style>

      <div className="flex min-h-screen" style={{ background: '#F6F6F7' }}>
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-40 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300`}>
          <ClientSidebar />
        </div>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <ClientHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

          <main className="p-6 md:p-8">

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Link to="/client/demandes" className="inline-flex items-center text-[#0B74C1] hover:text-[#053876] mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux demandes
              </Link>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">{demande.id}</h1>
                  <p className="text-[#25364A]/70 mt-1">{demande.service}</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[rgba(5,56,118,0.18)] text-[#25364A] hover:bg-[#F6F6F7] transition-all">
                    <Printer className="w-4 h-4" />
                    Imprimer
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white transition-all duration-300 hover:-translate-y-0.5 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)]">
                    <Download className="w-4 h-4" />
                    Télécharger PDF
                  </button>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Card */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-[#053876]">État de la demande</h2>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {demande.timeline.map((item, index) => (
                      <div key={index} className="flex items-start">
                        <div className="relative">
                          {item.completed ? (
                            <CheckCircle className="w-6 h-6 text-[#2AACB2]" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-[#25364A]/40" />
                          )}
                          {index < demande.timeline.length - 1 && (
                            <div className={`absolute top-6 left-3 w-0.5 h-12 ${item.completed ? 'bg-[#2AACB2]' : 'bg-[rgba(5,56,118,0.15)]'}`} />
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-[#053876]">{item.step}</p>
                          <p className="text-sm text-[#25364A]/70">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Description */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-6"
                >
                  <h2 className="text-lg font-semibold text-[#053876] mb-4">Description détaillée</h2>
                  <p className="text-[#25364A] whitespace-pre-line leading-relaxed">{demande.detailedDescription}</p>
                </motion.div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-6">
                {/* Informations */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-6"
                >
                  <h2 className="text-lg font-semibold text-[#053876] mb-4">Informations</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-[#0B74C1] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Date de demande</p>
                        <p className="font-medium text-[#053876]">{demande.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Euro className="w-5 h-5 text-[#0B74C1] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Montant</p>
                        <p className="font-medium text-[#053876]">{demande.amount}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-[#4681B7] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Livraison estimée</p>
                        <p className="font-medium text-[#053876]">{demande.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Contact Technique */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-6"
                >
                  <h2 className="text-lg font-semibold text-[#053876] mb-4">Contact technique</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-[#0B74C1] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Référent technique</p>
                        <p className="font-medium text-[#053876]">{demande.technicalContact}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-[#0B74C1] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Email</p>
                        <p className="font-medium text-[#0B74C1]">{demande.technicalEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-[#0B74C1] mt-0.5" />
                      <div>
                        <p className="text-sm text-[#25364A]/70">Téléphone</p>
                        <p className="font-medium text-[#053876]">{demande.technicalPhone}</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-[rgba(11,116,193,0.3)] text-[#0B74C1] hover:bg-[#0B74C1]/10 hover:border-[#0B74C1]/50 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    Contacter le support
                  </button>
                </motion.div>

                {/* Documents */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl shadow-[0_10px_30px_rgba(5,56,118,0.06)] p-6"
                >
                  <h2 className="text-lg font-semibold text-[#053876] mb-4">Documents</h2>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)] hover:border-[rgba(42,172,178,0.4)] transition-all group">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0B74C1]" />
                        <span className="text-[#25364A] group-hover:text-[#053876] transition-colors">Devis_{demande.id}.pdf</span>
                      </span>
                      <Download className="w-4 h-4 text-[#25364A]/50 group-hover:text-[#2AACB2] transition-colors" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#F6F6F7] border border-[rgba(5,56,118,0.12)] hover:border-[rgba(42,172,178,0.4)] transition-all group">
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0B74C1]" />
                        <span className="text-[#25364A] group-hover:text-[#053876] transition-colors">Cahier_des_charges.pdf</span>
                      </span>
                      <Download className="w-4 h-4 text-[#25364A]/50 group-hover:text-[#2AACB2] transition-colors" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default DemandeDetail
