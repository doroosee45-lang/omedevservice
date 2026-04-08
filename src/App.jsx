import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import ScrollToTop from './components/Common/ScrollToTop'

// Pages Publiques
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Solutions from './pages/Solutions'
import SolutionDetail from './pages/SolutionDetail'
import Realisations from './pages/Realisations'
import RealisationDetail from './pages/RealisationDetail'
import Tarifs from './pages/Tarifs'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import AuditGratuit from './pages/AuditGratuit'
import DemanderDevis from './pages/DemanderDevis'

// Authentification
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'

// Espace Client
import ClientDashboard from './pages/Client/ClientDashboard'
import ClientDemandes from './pages/Client/ClientDemandes'
import ClientDemandeDetail from './pages/Client/ClientDemandeDetail'
import ClientProjets from './pages/Client/ClientProjets'
import ClientHistorique from './pages/Client/ClientHistorique'
import ClientProfil from './pages/Client/ClientProfil'
import ClientPaiements from './pages/Client/ClientPaiements'
import ClientMessagerie from './pages/Client/ClientMessagerie'

// Espace Admin
import AdminLayout from './pages/Admin/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminClients from './pages/Admin/AdminClients'
import AdminCRM from './pages/Admin/AdminCRM'
import AdminProjets from './pages/Admin/AdminProjets'
import AdminDevis from './pages/Admin/AdminDevis'
import AdminBlog from './pages/Admin/AdminBlog'
import ProtectedRoute from './pages/Admin/ProtectedRoute'

// Services 
import ReseauInfrastructure from './pages/services/ReseauInfrastructure'
import Securite from './pages/services/Securite'
import DeveloppementDigital from './pages/services/DeveloppementDigital'
import CloudHebergement from './pages/services/CloudHebergement'
import EnergieEquipements from './pages/services/EnergieEquipements'
import VenteMateriel from './pages/services/VenteMateriel'
import Formation from './pages/services/Formation'
import Inscription from './pages/services/Inscription'
import DevisCloud from './pages/services/DevisCloud'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          {/* ========== PAGES PUBLIQUES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/realisations/:slug" element={<RealisationDetail />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/audit-gratuit" element={<AuditGratuit />} />
          <Route path="/demander-devis" element={<DemanderDevis />} />
          <Route path="/inscription" element={<Inscription />} />

          {/* ========== SERVICES ========== */}
          <Route path="/services/reseau-infrastructure" element={<ReseauInfrastructure />} />
          <Route path="/services/securite" element={<Securite />} />
          <Route path="/services/developpement-digital" element={<DeveloppementDigital />} />
          <Route path="/services/cloud-hebergement" element={<CloudHebergement />} />
          <Route path="/services/energie-equipements" element={<EnergieEquipements />} />
          <Route path="/services/vente-materiel" element={<VenteMateriel />} />
          <Route path="/services/formation" element={<Formation />} />
          <Route path="/devis-cloud" element={<DevisCloud />} />

          {/* ========== AUTHENTIFICATION ========== */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ========== ESPACE CLIENT ========== */}
          <Route element={<ProtectedRoute allowedRoles={['client', 'admin', 'manager']} />}>
            <Route path="/client/dashboard" element={<ClientDashboard />} />
            <Route path="/client/demandes" element={<ClientDemandes />} />
            <Route path="/client/demandes/:id" element={<ClientDemandeDetail />} />
            <Route path="/client/projets" element={<ClientProjets />} />
            <Route path="/client/historique" element={<ClientHistorique />} />
            <Route path="/client/profil" element={<ClientProfil />} />
            <Route path="/client/paiements" element={<ClientPaiements />} />
            <Route path="/client/messagerie" element={<ClientMessagerie />} />
          </Route>

          {/* ========== ESPACE ADMIN ========== */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'super_admin']} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="clients" element={<AdminClients />} />
              <Route path="crm" element={<AdminCRM />} />
              <Route path="projets" element={<AdminProjets />} />
              <Route path="devis" element={<AdminDevis />} />
              <Route path="blog" element={<AdminBlog />} />
            </Route>
          </Route>

          {/* ========== REDIRECTION 404 ========== */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default App