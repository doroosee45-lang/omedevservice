import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicHero from '../../components/Public/PublicHero';
import CTASection from '../../components/Public/CTASection';
import {
  Network,
  Monitor,
  Code2,
  Layers,
  Cpu,
  Video,
  Palette,
  Megaphone,
  Brain,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  CheckCircle,
  ImageOff,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique aux autres pages
   services (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-catalogue {
    color: #0B1213;
    background: #F6F6F7;
  }

  .omedev-catalogue .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-catalogue .section-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }

  .omedev-catalogue .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-catalogue .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-catalogue .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-catalogue .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.5rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-catalogue .btn-primary:hover,
  .omedev-catalogue .btn-primary:focus-visible {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-catalogue .btn-primary:focus-visible {
    outline: 2px solid #55DDB5;
    outline-offset: 2px;
  }

  .omedev-catalogue .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-catalogue .omedev-light-section { background: #F6F6F7; }
  .omedev-catalogue .omedev-white-section { background: #fff; }
  .omedev-catalogue .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  /* ── Carte formation du catalogue ── */
  .omedev-catalogue .catalogue-card {
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: all .4s cubic-bezier(.4,0,.2,1);
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .omedev-catalogue .catalogue-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }
  .omedev-catalogue .catalogue-photo-wrap {
    position: relative;
    width: 100%;
    height: 190px;
    overflow: hidden;
    flex-shrink: 0;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 100%);
  }
  .omedev-catalogue .catalogue-photo-wrap img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }
  .omedev-catalogue .catalogue-photo-wrap img.img-hidden { display: none; }
  .omedev-catalogue .catalogue-card:hover .catalogue-photo-wrap img { transform: scale(1.08); }
  .omedev-catalogue .catalogue-photo-fallback {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,.85);
  }
  .omedev-catalogue .catalogue-category-badge {
    position: absolute;
    top: .9rem;
    left: .9rem;
    display: inline-flex;
    align-items: center;
    gap: .4rem;
    font-size: .68rem;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
    padding: .4rem .8rem;
    border-radius: 999px;
    background: rgba(5,56,118,.72);
    backdrop-filter: blur(6px);
    color: #fff;
    font-family: 'Syne', sans-serif;
  }
  .omedev-catalogue .catalogue-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .omedev-catalogue .catalogue-title {
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.15rem;
    color: #053876;
    margin-bottom: .5rem;
  }
  .omedev-catalogue .catalogue-desc {
    color: #25364A;
    font-size: .9rem;
    line-height: 1.6;
    margin-bottom: 1.1rem;
    flex: 1;
  }
  .omedev-catalogue .catalogue-duration {
    display: inline-flex;
    align-items: center;
    gap: .45rem;
    font-size: .85rem;
    font-weight: 600;
    color: #0B74C1;
    margin-bottom: 1.1rem;
  }

  @media (max-width: 768px) {
    .omedev-catalogue .container { padding: 0 1rem; }
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const SectionHeader = ({ badge, title, subtitle, light }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    style={{ textAlign: 'center', marginBottom: '3rem' }}
  >
    {badge && (
      <motion.div variants={fadeUp}>
        <span
          className="section-badge"
          style={light ? { background: 'rgba(255,255,255,.14)', color: '#fff', borderColor: 'rgba(255,255,255,.28)' } : {}}
        >
          {badge}
        </span>
      </motion.div>
    )}
    <motion.h2 variants={fadeUp} className="section-title" style={light ? { color: '#fff' } : {}}>
      {title}
    </motion.h2>
    <motion.div variants={fadeUp} className="divider" />
    {subtitle && (
      <motion.p variants={fadeUp} className="section-subtitle" style={light ? { color: 'rgba(255,255,255,.78)' } : {}}>
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

/* ─────────────────────────────────────────────
   DONNÉES — 9 formations du catalogue
   ───────────────────────────────────────────── */
const formations = [
  {
    id: 'administration-reseau',
    title: 'Administration Réseau',
    category: 'Informatique',
    icon: Network,
    description: "Installez, configurez, administrez et sécurisez des réseaux informatiques : fondamentaux réseau, serveurs, équipements et bonnes pratiques de sécurité.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'bureautique-complete',
    title: 'Bureautique Complète',
    category: 'Bureautique',
    icon: Monitor,
    description: "Maîtrisez les outils essentiels de la bureautique pour améliorer votre productivité : traitement de texte, tableurs, présentations et outils numériques.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'developpement-web',
    title: 'Développement Web',
    category: 'Développement',
    icon: Code2,
    description: "Concevez et développez des sites web modernes, responsive et performants en maîtrisant les technologies fondamentales du front-end.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'developpement-mern',
    title: 'Développement MERN',
    category: 'Développement',
    icon: Layers,
    description: "Découvrez le développement d'applications web modernes avec la stack MERN : MongoDB, Express.js, React et Node.js.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'full-stack',
    title: 'Formation Full Stack',
    category: 'Développement',
    icon: Cpu,
    description: "Devenez capable de développer une application complète, de l'interface utilisateur jusqu'au serveur, à la base de données et au déploiement.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'montage-video',
    title: 'Montage Vidéo',
    category: 'Créativité',
    icon: Video,
    description: "Apprenez les techniques professionnelles de montage vidéo, d'édition, de transition, d'ajout d'effets et de production audiovisuelle.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'design-graphique',
    title: 'Design Graphique',
    category: 'Créativité',
    icon: Palette,
    description: "Développez vos compétences en création visuelle, identité graphique, conception de supports de communication et outils de design.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'marketing-digital',
    title: 'Marketing Digital',
    category: 'Marketing',
    icon: Megaphone,
    description: "Développez la visibilité d'une entreprise ou d'une marque sur Internet grâce aux réseaux sociaux, au contenu digital et à la publicité.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'intelligence-artificielle',
    title: 'Intelligence Artificielle',
    category: 'Innovation',
    icon: Brain,
    description: "Découvrez les fondamentaux de l'IA et apprenez à utiliser les outils modernes pour améliorer la productivité et créer des solutions innovantes.",
    duration: '6 mois',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80',
  },
];

const catalogueStats = [
  { icon: Sparkles, value: '9+', label: 'Formations disponibles' },
  { icon: CheckCircle, value: '100%', label: 'Formation pratique' },
  { icon: Award, value: 'Certificat', label: 'À la fin de la formation' },
];

const FormationCatalogueCard = ({ formation, index }) => {
  const Icon = formation.icon;
  const handleImgError = (e) => {
    e.currentTarget.classList.add('img-hidden');
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="catalogue-card"
    >
      <div className="catalogue-photo-wrap">
        <div className="catalogue-photo-fallback" aria-hidden="true">
          <ImageOff size={28} />
        </div>
        <img
          src={formation.image}
          alt={`Illustration de la formation ${formation.title}`}
          loading="lazy"
          onError={handleImgError}
        />
        <span className="catalogue-category-badge">
          <Icon size={13} aria-hidden="true" />
          {formation.category}
        </span>
      </div>
      <div className="catalogue-body">
        <h3 className="catalogue-title">{formation.title}</h3>
        <p className="catalogue-desc">{formation.description}</p>
        <div className="catalogue-duration">
          <Clock size={16} aria-hidden="true" />
          <span>Durée : {formation.duration}</span>
        </div>
        <Link
          to="/inscription"
          className="btn-primary"
          style={{ width: '100%' }}
          aria-label={`S'inscrire à la formation ${formation.title}`}
        >
          S'inscrire maintenant <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};

const CatalogueFormations = () => {
  return (
    <div className="omedev-catalogue">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Nos formations"
        title="Découvrez notre catalogue de formations"
        highlight="catalogue de formations"
        subtitle="Découvrez nos programmes de formation conçus pour vous accompagner dans le développement de compétences pratiques et recherchées dans le monde professionnel."
        primaryAction={{ label: "S'inscrire maintenant", to: '/inscription' }}
        secondaryAction={{ label: 'Parler à un conseiller', to: '/contact' }}
      />

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <section className="omedev-dark-section py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {catalogueStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-2xl text-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: 'linear-gradient(135deg, #4681B7, #053876)' }}>
                    <Icon size={22} className="text-white" aria-hidden="true" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white font-syne mb-1">{stat.value}</div>
                  <div className="text-white/70 text-xs sm:text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== GRILLE DES FORMATIONS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader
            badge="Nos formations"
            title="9 parcours pour développer vos compétences"
            subtitle="Choisissez la formation adaptée à votre projet professionnel et inscrivez-vous en quelques clics."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((formation, i) => (
              <FormationCatalogueCard key={formation.id} formation={formation} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prêt à vous lancer ?"
        title="Prêt à commencer votre formation ?"
        highlight="votre formation"
        subtitle="Faites le premier pas vers de nouvelles compétences et inscrivez-vous à la formation qui vous correspond."
        primaryAction={{ label: "S'inscrire maintenant", to: '/inscription' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact' }}
      />
    </div>
  );
};

export default CatalogueFormations;
