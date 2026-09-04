

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Shield, Code, Cloud, CheckCircle,
  Monitor, Rocket, Sun, Network, BookOpen
} from 'lucide-react';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';
import useDocumentMeta from '../hooks/useDocumentMeta';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  .omedev-services .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }

  .omedev-services .section-badge {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    padding: .5rem 1.1rem; border-radius: 999px;
    background: rgba(11,116,193,.08); color: #0B74C1; border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }

  .omedev-services .section-title {
    font-size: clamp(1.9rem, 3.6vw, 2.75rem); font-weight: 800; line-height: 1.12;
    letter-spacing: -.03em; font-family: 'Syne', sans-serif; color: #053876;
  }

  .omedev-services .divider {
    width: 56px; height: 4px; background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px; margin: .9rem 0 0;
  }

  .omedev-services .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff; border: 1px solid rgba(5,56,118,.09); border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }
  .omedev-services .card-hover:hover {
    transform: translateY(-6px); box-shadow: 0 20px 44px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-services .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-services .animate-float { animation: float 6s ease-in-out infinite; }

  @media (max-width: 768px) { .omedev-services .container { padding: 0 1rem; } }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Données des services par catégorie — palette brand OMEDEV
const serviceCategories = [
  {
    id: 'reseau', name: 'Réseau & Infrastructure', icon: Network, hex: '#0B74C1',
    description: 'Des infrastructures réseau robustes et performantes pour connecter votre entreprise',
    services: [
      { name: 'Câblage structuré', description: 'Installation de câblage cuivre et fibre optique pour une infrastructure réseau fiable', price: 'Sur devis' },
      { name: 'WiFi entreprise', description: 'Solutions WiFi haute performance pour PME, grandes surfaces et espaces ouverts', price: 'Sur devis' },
      { name: 'Fibre optique', description: 'Déploiement de réseaux fibre optique pour une connectique ultra-rapide', price: 'Sur devis' },
      { name: 'Infrastructure réseau', description: 'Conception et déploiement d\'infrastructures réseau complètes', price: 'Sur devis' },
    ]
  },
  {
    id: 'securite', name: 'Sécurité & Surveillance', icon: Shield, hex: '#1D5B9B',
    description: 'Protection avancée de vos données et surveillance intelligente de vos sites',
    services: [
      { name: 'Cybersécurité', description: 'Protection avancée contre les cyberattaques et les intrusions', price: 'Sur devis' },
      { name: 'Vidéosurveillance', description: 'Caméras IP, PTZ, enregistrement cloud et monitoring 24/7', price: 'Sur devis' },
      { name: 'Audit de sécurité', description: 'Analyse complète de vos vulnérabilités et recommandations', price: 'Sur devis' },
      { name: "Contrôle d'accès", description: 'Systèmes biométriques, badgeuses et gestion d\'accès', price: 'Sur devis' },
    ]
  },
  {
    id: 'developpement', name: 'Développement Digital', icon: Code, hex: '#2AACB2',
    description: 'Des solutions digitales sur mesure pour booster votre activité',
    services: [
      { name: 'Sites web & e-commerce', description: 'Création de sites vitrine, boutiques en ligne sur mesure', price: 'Sur devis' },
      { name: 'Applications mobiles', description: 'Développement iOS/Android, React Native, Flutter', price: 'Sur devis' },
      { name: 'ERP sur mesure', description: 'Solutions ERP adaptées à votre secteur d\'activité', price: 'Sur devis' },
      { name: 'API & intégrations', description: 'Création d\'API REST et intégration de services tiers', price: 'Sur devis' },
    ]
  },
  {
    id: 'cloud', name: 'Cloud & Hébergement', icon: Cloud, hex: '#4681B7',
    description: 'Infrastructures cloud scalable et sécurisées pour votre entreprise',
    services: [
      { name: 'Hébergement cloud', description: 'Hébergement sécurisé haute disponibilité 99.9% uptime', price: 'Sur devis' },
      { name: 'Migration cloud', description: 'Migration de vos infrastructures vers le cloud', price: 'Sur devis' },
      { name: 'DevOps', description: 'CI/CD, conteneurisation Docker, orchestration Kubernetes', price: 'Sur devis' },
      { name: 'SaaS personnalisé', description: 'Développement de solutions SaaS clé en main', price: 'Sur devis' },
    ]
  },
  {
    id: 'energie', name: 'Énergie & Équipements', icon: Sun, hex: '#55DDB5',
    description: 'Solutions énergétiques durables et équipements haute performance',
    services: [
      { name: 'Panneaux solaires', description: 'Installation de systèmes photovoltaïques pour entreprises', price: 'Sur devis' },
      { name: 'Climatisation', description: 'Solutions de climatisation pour bureaux et data centers', price: 'Sur devis' },
      { name: 'Onduleurs & UPS', description: 'Protection électrique et alimentation de secours', price: 'Sur devis' },
      { name: 'Maintenance énergétique', description: 'Contrats de maintenance préventive et corrective', price: 'Sur devis' },
    ]
  },
  {
    id: 'materiel', name: 'Vente de Matériel', icon: Monitor, hex: '#72A5CE',
    description: 'Matériel IT professionnel des meilleures marques',
    services: [
      { name: 'Ordinateurs & serveurs', description: 'PC, laptops, serveurs haute performance', price: 'Sur devis' },
      { name: 'Équipements réseau', description: 'Switches, routeurs, firewalls, access points', price: 'Sur devis' },
      { name: 'Caméras de surveillance', description: 'Caméras IP, 4K, PTZ avec IA intégrée', price: 'Sur devis' },
      { name: 'Accessoires IT', description: 'Écrans, périphériques, câblage, connectiques', price: 'Sur devis' },
    ]
  },
  {
    id: 'formation', name: 'Formation & Accompagnement', icon: BookOpen, hex: '#053876',
    description: 'Formation et support pour maîtriser vos outils digitaux',
    services: [
      { name: 'Formation IT', description: 'Formations certifiantes en développement, réseau, sécurité', price: 'Sur devis' },
      { name: 'Support technique', description: 'Assistance technique réactive 24/7', price: 'Sur devis' },
      { name: 'Accompagnement digital', description: 'Conseil et accompagnement dans votre transformation digitale', price: 'Sur devis' },
      { name: 'Maintenance', description: 'Contrats de maintenance pour vos équipements et logiciels', price: 'Sur devis' },
    ]
  },
];

const ServiceCard = ({ service, hex, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="card-hover p-6 cursor-pointer group"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${hex}, #2AACB2)` }}>
        <CheckCircle size={22} className="text-white" />
      </div>
      <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: hex, background: `${hex}18` }}>{service.price}</span>
    </div>
    <h3 className="text-xl font-bold text-[#053876] mb-2 font-syne transition-colors">{service.name}</h3>
    <p className="text-[#25364A] text-sm leading-relaxed mb-5">{service.description}</p>
    <Link
      to="/demander-devis"
      className="inline-flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-3"
      style={{ color: '#0B74C1' }}
    >
      Demander un devis <ArrowRight size={14} />
    </Link>
  </motion.div>
);

const CategorySection = ({ category, index }) => (
  <section className={`py-16 ${index % 2 === 1 ? 'bg-[#F6F6F7]' : 'bg-white'}`}>
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="mb-10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110" style={{ background: `${category.hex}18`, color: category.hex }}>
              <category.icon size={28} />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#053876] font-syne">{category.name}</h2>
              <div className="w-12 h-1 rounded-full mt-2" style={{ background: `linear-gradient(90deg, ${category.hex}, #55DDB5)` }} />
            </div>
          </div>
          <span className="text-sm text-[#25364A]/70">{category.services.length} services disponibles</span>
        </div>
        <p className="text-[#25364A] text-base max-w-3xl">{category.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.services.map((service, idx) => (
          <ServiceCard key={idx} service={service} hex={category.hex} index={idx} />
        ))}
      </div>
    </div>
  </section>
);

const ServicesPage = () => {
  useDocumentMeta({
    title: 'Nos Services',
    description: 'Réseau & infrastructure, cybersécurité, cloud, développement digital, énergie et formation : découvrez tous les services IT d\'OMEDEV Services en RDC.',
    path: '/services',
  })

  // Ancre vers une section de la page. Un simple href="#id" casse la
  // navigation sous HashRouter (le routeur interprète tout après "#"
  // comme un chemin de route), donc on scrolle manuellement à la place.
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="omedev-services">
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION ==================== */}
      <PublicHero
        badge="Expertise & Innovation"
        title="Nos Services"
        highlight="Services"
        subtitle={<>Des solutions complètes pour la <strong className="text-white font-semibold">transformation digitale</strong> de votre entreprise</>}
        primaryAction={{ label: 'Nous contacter', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos réalisations', to: '/realisations' }}
        compact
      />

      {/* ==================== STATISTIQUES CLÉS ==================== */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%)' }}>
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '7', label: 'Catégories de services' },
              { value: '28+', label: 'Services proposés' },
              { value: '98%', label: 'Satisfaction client' },
              { value: '24/7', label: 'Support technique' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                <div className="text-3xl font-extrabold text-white font-syne">{s.value}</div>
                <div className="text-white/70 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NAVIGATION RAPIDE + CATÉGORIES ==================== */}
      <div className="bg-white py-10">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((cat, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => scrollToSection(cat.id)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border hover:scale-105"
                style={{ background: `${cat.hex}12`, color: cat.hex, borderColor: `${cat.hex}40` }}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {serviceCategories.map((category, idx) => (
        <div key={idx} id={category.id}>
          <CategorySection category={category} index={idx} />
        </div>
      ))}

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Besoin d'un service personnalisé ?"
        title="Un projet ? Parlons-en."
        highlight="Parlons-en."
        subtitle="Notre équipe est prête à vous accompagner dans la réalisation de vos projets."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Nous contacter', to: '/contact' }}
      />
    </div>
  );
};

export default ServicesPage;
