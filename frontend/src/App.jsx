import { lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Common/ScrollToTop'
import ProtectedRoute from './pages/Admin/ProtectedRoute'
import ChatWidget from './components/Chat/ChatWidget'

// Pages Publiques
import Home from './pages/Home'
import Services from './pages/Services'
// import ServiceDetail from './pages/ServiceDetail'
import Solutions from './pages/Solutions'
// import SolutionDetail from './pages/SolutionDetail'
import Realisations from './pages/Realisations'
import Tarifs from './pages/Tarifs'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import AuditGratuit from './pages/AuditGratuit'
import DemanderDevis from './pages/DemanderDevis'
import SuiviDevis from './pages/SuiviDevis'
import Expert from './pages/autre/Expert'

// Authentification
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import ActivateAccount from './pages/Auth/ActivateAccount'

// Espace Client — chargé à la demande : un visiteur public ne doit jamais
// télécharger le code de l'espace client (formulaires, tableaux, PDF...).
const ClientLayout = lazy(() => import('./components/Layout/ClientLayout'))
const ClientDashboard = lazy(() => import('./pages/Client/ClientDashboard'))
const ClientDemandes = lazy(() => import('./pages/Client/ClientDemandes'))
const ClientDemandeDetail = lazy(() => import('./pages/Client/ClientDemandeDetail'))
const ClientProjets = lazy(() => import('./pages/Client/ClientProjets'))
const ClientHistorique = lazy(() => import('./pages/Client/ClientHistorique'))
const ClientProfil = lazy(() => import('./pages/Client/ClientProfil'))
const ClientPaiements = lazy(() => import('./pages/Client/ClientPaiements'))
const ClientMessagerie = lazy(() => import('./pages/Client/ClientMessagerie'))

// Espace Admin — même logique : le code d'administration (CRM, éditeur
// d'articles, gestion des devis...) ne concerne jamais un visiteur public.
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'))
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'))
const AdminClients = lazy(() => import('./pages/Admin/AdminClients'))
const AdminCRM = lazy(() => import('./pages/Admin/AdminCRM'))
const AdminProjets = lazy(() => import('./pages/Admin/AdminProjets'))
const AdminDevis = lazy(() => import('./pages/Admin/AdminDevis'))
const AdminBlog = lazy(() => import('./pages/Admin/AdminBlog'))
const AdminAudits = lazy(() => import('./pages/Admin/AdminAudits'))
const AdminContacts = lazy(() => import('./pages/Admin/AdminContacts'))
const AdminDemandesDevis = lazy(() => import('./pages/Admin/AdminDemandesDevis'))
const AdminNewsletter = lazy(() => import('./pages/Admin/AdminNewsletter'))
const AdminVenteMateriel = lazy(() => import('./pages/Admin/AdminVenteMateriel'))
const AdminFormation = lazy(() => import('./pages/Admin/AdminFormation'))
import NewsletterUnsubscribe from './pages/NewsletterUnsubscribe'

// Services
import ReseauInfrastructure from './pages/services/ReseauInfrastructure'
import Securite from './pages/services/Securite'
import DeveloppementDigital from './pages/services/DeveloppementDigital'
import CloudHebergement from './pages/services/CloudHebergement'
import EnergieEquipements from './pages/services/EnergieEquipements'
import VenteMateriel from './pages/services/VenteMateriel'
import Formation from './pages/services/Formation'
import CatalogueFormations from './pages/services/CatalogueFormations'
import Inscription from './pages/services/Inscription'
import DevisCloud from './pages/services/DevisCloud';
import Projets from './pages/services/Projets'

// Routes où Navbar et Footer publiques doivent être masquées
const HIDDEN_CHROME = ['/admin', '/client', '/login', '/register', '/forgot-password', '/reset-password']
// Routes où le chat IA ne doit PAS apparaître
const HIDDEN_CHAT = ['/admin']

// Affiché le temps du premier chargement du code admin/client (lazy) —
// n'apparaît jamais sur les pages publiques, qui ne sont pas concernées.
const RouteFallback = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
    <div style={{ width: 36, height: 36, borderRadius: '50%', border: '3px solid #D5DCE1', borderTopColor: '#0B74C1', animation: 'spin 0.8s linear infinite' }} />
    <style>{'@keyframes spin { to { transform: rotate(360deg); } }'}</style>
  </div>
)

function App() {
  const location = useLocation()
  const hideChrome = HIDDEN_CHROME.some(p => location.pathname.startsWith(p))
  const hideChat   = HIDDEN_CHAT.some(p => location.pathname.startsWith(p))

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Navbar />}

      <AnimatePresence mode="wait">
        <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>

          {/* ========== PAGES PUBLIQUES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/services/:slug" element={<ServiceDetail />} /> */}
          <Route path="/solutions" element={<Solutions />} />
          {/* <Route path="/solutions/:slug" element={<SolutionDetail />} /> */}
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/audit-gratuit" element={<AuditGratuit />} />
          <Route path="/demander-devis" element={<DemanderDevis />} />
          <Route path="/suivi-devis" element={<SuiviDevis />} />
          <Route path="/suivi-devis/:requestNumber" element={<SuiviDevis />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/experts" element={<Expert />} />
          {/* ========== SERVICES ========== */}
          <Route path="/services/reseau-infrastructure" element={<ReseauInfrastructure />} />
          <Route path="/services/securite" element={<Securite />} />
          <Route path="/services/developpement-digital" element={<DeveloppementDigital />} />
          <Route path="/services/cloud-hebergement" element={<CloudHebergement />} />
          <Route path="/services/energie-equipements" element={<EnergieEquipements />} />
          <Route path="/services/vente-materiel" element={<VenteMateriel />} />
          <Route path="/services/formation" element={<Formation />} />
          <Route path="/formations/catalogue" element={<CatalogueFormations />} />
          <Route path="/devis-cloud" element={<DevisCloud />} />
          <Route path="/newsletter/unsubscribe" element={<NewsletterUnsubscribe />} />

          {/* ========== AUTHENTIFICATION ========== */}
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/activate-account" element={<ActivateAccount />} />

          {/* ========== ESPACE CLIENT ========== */}
          <Route path="/client" element={<ClientLayout />}>
            <Route index element={<Navigate to="/client/dashboard" replace />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="demandes" element={<ClientDemandes />} />
            <Route path="demandes/:id" element={<ClientDemandeDetail />} />
            <Route path="projets" element={<ClientProjets />} />
            <Route path="historique" element={<ClientHistorique />} />
            <Route path="profil" element={<ClientProfil />} />
            <Route path="paiements" element={<ClientPaiements />} />
            <Route path="messagerie" element={<ClientMessagerie />} />
          </Route>

          {/* ========== ESPACE ADMIN ========== */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="crm" element={<AdminCRM />} />
            <Route path="projets" element={<AdminProjets />} />
            <Route path="devis" element={<AdminDevis />} />
            <Route path="demandes-devis" element={<AdminDemandesDevis />} />
            <Route path="audits" element={<AdminAudits />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="newsletter" element={<AdminNewsletter />} />
            <Route path="blog" element={<AdminBlog />} />
            <Route path="vente-materiel" element={<AdminVenteMateriel />} />
            <Route path="formation" element={<AdminFormation />} />
          </Route>

          {/* ========== REDIRECTION 404 ========== */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
        </Suspense>
      </AnimatePresence>

      {!hideChrome && <Footer />}

      {/* ========== ASSISTANT IA ========== */}
      {!hideChat && <ChatWidget />}
    </>
  )
}

export default App