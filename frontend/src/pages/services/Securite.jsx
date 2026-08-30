import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PublicHero from '../../components/Public/PublicHero'
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel'
import CTASection from '../../components/Public/CTASection'
import {
  Shield,
  Lock,
  Video,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Server,
  Wifi,
  Activity,
  Network,
  Users,
  GraduationCap,
  Smartphone,
  Radio,
  Database,
  Cloud,
  Phone,
  Mail
} from 'lucide-react'

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page Formation
   navy / electric / turquoise / energy
   ───────────────────────────────────────────── */

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-security {
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
  }

  .omedev-security .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-security .font-syne {
    font-family: 'Syne', sans-serif;
  }

  .omedev-security .section-badge {
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

  .omedev-security .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
    overflow-wrap: break-word;
  }

  .omedev-security .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-security .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-security .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(
      135deg,
      #0B74C1 0%,
      #2AACB2 55%,
      #55DDB5 100%
    );
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

  .omedev-security .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-security .btn-outline {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: #fff;
    color: #053876;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    border: 1px solid rgba(5,56,118,.18);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-security .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-security .btn-ghost-light {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: rgba(255,255,255,.10);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .85rem 1.7rem;
    border-radius: 12px;
    border: 1px solid rgba(255,255,255,.28);
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    font-family: 'Syne', sans-serif;
  }

  .omedev-security .btn-ghost-light:hover {
    background: rgba(255,255,255,.18);
    transform: translateY(-3px);
  }

  .omedev-security .card-hover {
    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-security .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-security .omedev-hero {
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 35%,
      #4681B7 60%,
      #72A5CE 80%,
      #A6C3D7 100%
    );
    position: relative;
  }

  .omedev-security .omedev-light-section {
    background: #F6F6F7;
  }

  .omedev-security .omedev-white-section {
    background: #fff;
  }

  .omedev-security .omedev-dark-section {
    background: linear-gradient(
      135deg,
      #053876 0%,
      #1D5B9B 55%,
      #0B74C1 100%
    );
  }

  .omedev-security .hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-security .security-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    padding: 1.5rem;
    transition: all .4s cubic-bezier(.4,0,.2,1);
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    position: relative;
    overflow: hidden;
  }

  .omedev-security .security-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }

  .omedev-security .security-card::after {
    content: '';
    position: absolute;
    width: 120px;
    height: 120px;
    right: -50px;
    top: -50px;
    border-radius: 50%;
    background: rgba(85,221,181,.07);
    transition: transform .5s ease;
  }

  .omedev-security .security-card:hover::after {
    transform: scale(2);
  }

  .omedev-security .security-list-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 14px;
    padding: 1.1rem 1.3rem;
    display: flex;
    align-items: flex-start;
    gap: .9rem;
    transition: all .3s ease;
    box-shadow: 0 8px 24px rgba(5,56,118,.04);
  }

  .omedev-security .security-list-card:hover {
    transform: translateY(-4px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 14px 32px rgba(11,116,193,.10);
  }

  .omedev-security .image-card {
    border-radius: 18px;
    overflow: hidden;
    border: 1px solid rgba(5,56,118,.09);
    box-shadow: 0 10px 30px rgba(5,56,118,.08);
  }

  .omedev-security .image-card img {
    width: 100%;
    display: block;
    object-fit: cover;
    transition: transform .8s cubic-bezier(.4,0,.2,1);
  }

  .omedev-security .image-card:hover img {
    transform: scale(1.06);
  }

  .omedev-security .quote-mark {
    font-family: 'Syne', sans-serif;
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1;
    color: rgba(11,116,193,.15);
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-16px);
    }
  }

  .omedev-security .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  @media (max-width: 768px) {
    .omedev-security .container {
      padding: 0 1rem;
    }
  }
`

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: .7,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const fadeScale = {
  hidden: {
    opacity: 0,
    scale: .9
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: .5,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
}

const staggerContainer = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: .08
    }
  }
}

const SectionHeader = ({ badge, title, subtitle, light }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={staggerContainer}
    style={{
      textAlign: 'center',
      marginBottom: '3rem'
    }}
  >
    {badge && (
      <motion.div variants={fadeUp}>
        <span
          className="section-badge"
          style={
            light
              ? {
                  background: 'rgba(255,255,255,.14)',
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,.28)'
                }
              : {}
          }
        >
          {badge}
        </span>
      </motion.div>
    )}

    <motion.h2
      variants={fadeUp}
      className="section-title"
      style={light ? { color: '#fff' } : {}}
    >
      {title}
    </motion.h2>

    <motion.div variants={fadeUp} className="divider" />

    {subtitle && (
      <motion.p
        variants={fadeUp}
        className="section-subtitle"
        style={
          light
            ? { color: 'rgba(255,255,255,.78)' }
            : {}
        }
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
)

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5'
}

const Securite = () => {
  const securityServices = [
    {
      icon: Video,
      title: 'Vidéosurveillance (CCTV/IP)',
      desc: 'Installation de caméras haute définition, accès à distance et détection d’intrusion.',
      color: colors.blue
    },
    {
      icon: Shield,
      title: 'Audit de cybersécurité',
      desc: 'Tests d’intrusion, analyse de vulnérabilités et conformité RGPD.',
      color: colors.navy
    },
    {
      icon: Lock,
      title: 'Firewalls & Protection réseau',
      desc: 'Mise en place de pare-feu nouvelle génération, filtrage et VPN.',
      color: colors.turquoise
    },
    {
      icon: GraduationCap,
      title: 'Formation cybersécurité',
      desc: 'Sensibilisation des équipes, bonnes pratiques et gestion des incidents.',
      color: colors.energy
    }
  ]

  const telecomServices = [
    {
      icon: Radio,
      title: 'Sécurité des réseaux 4G/5G',
      desc: 'Protection des liaisons mobiles et des infrastructures critiques.',
      color: colors.blue
    },
    {
      icon: Wifi,
      title: 'Wi-Fi sécurisé',
      desc: 'Authentification avancée, segmentation et chiffrement des flux.',
      color: colors.turquoise
    },
    {
      icon: Network,
      title: 'Voix sur IP (VoIP) sécurisée',
      desc: 'Chiffrement des appels, anti-fraude et conformité.',
      color: colors.blueLight
    },
    {
      icon: Smartphone,
      title: 'Sécurité des terminaux mobiles',
      desc: 'MDM, conteneurisation et protection des données.',
      color: colors.energy
    }
  ]

  const itSecurityServices = [
    {
      icon: Database,
      title: 'Protection des données',
      desc: 'Chiffrement, DLP, sauvegardes sécurisées.',
      color: colors.blue
    },
    {
      icon: Cloud,
      title: 'Sécurité cloud',
      desc: 'CASB, IAM, conformité cloud.',
      color: colors.turquoise
    },
    {
      icon: Server,
      title: 'Sécurité des serveurs',
      desc: 'Antivirus, HIDS, patch management.',
      color: colors.blueLight
    },
    {
      icon: Activity,
      title: 'Monitoring SIEM',
      desc: 'Supervision centralisée des logs et alertes.',
      color: colors.energy
    }
  ]

  const stats = [
    {
      value: '98%',
      label: 'Réduction des incidents après audit',
      icon: Shield
    },
    {
      value: '24/7',
      label: 'Monitoring et réponse',
      icon: Activity
    },
    {
      value: '50+',
      label: 'Clients protégés',
      icon: Users
    },
    {
      value: '100%',
      label: 'Conformité RGPD assurée',
      icon: CheckCircle
    }
  ]

  const testimonials = [
    {
      name: 'Marc D.',
      role: 'Directeur IT, Groupe Bancaire',
      quote:
        'OMEDEV a sécurisé l’ensemble de notre réseau et de nos télécoms. Leur expertise en cybersécurité est remarquable.',
      photo:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
    },
    {
      name: 'Sophie L.',
      role: 'Responsable Sécurité, Opérateur Télécom',
      quote:
        'La formation cybersécurité a sensibilisé nos équipes et réduit les risques de phishing de 80%.',
      photo:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    }
  ]

  const images = [
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop'
  ]

  const benefits = [
    'Experts certifiés (CISSP, CEH, ISO 27001)',
    'Solutions sur mesure pour PME et grands comptes',
    'Monitoring 24/7 et réponse aux incidents',
    'Rapports d’audit détaillés avec plan d’action',
    'Conformité RGPD, ISO 27001, HDS'
  ]

  const IntegratedCard = ({ item }) => {
    const Icon = item.icon

    return (
      <motion.div
        whileHover={{
          y: -6,
          scale: 1.03
        }}
        transition={{ duration: .25 }}
        className="card-hover p-5 text-center"
      >
        <div
          className="w-11 h-11 mx-auto mb-3 rounded-xl flex items-center justify-center"
          style={{
            background: `${colors.blue}18`,
            color: colors.blue
          }}
        >
          <Icon size={21} />
        </div>

        <span
          className="text-sm font-bold"
          style={{ color: colors.navy }}
        >
          {item.name}
        </span>
      </motion.div>
    )
  }

  return (
    <div className="omedev-security">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Sécurité globale"
        title="Sécurisez votre infrastructure"
        highlight="infrastructure"
        subtitle="Cybersécurité, protection des réseaux, sécurité télécom et conformité pour protéger durablement votre écosystème numérique."
        primaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact' }}
      />

      {/* ==================== CYBERSÉCURITÉ ==================== */}

      <section className="omedev-white-section py-24">
        <div className="container">

          <SectionHeader
            badge="Cybersécurité"
            title="Cybersécurité & protection des actifs"
            subtitle="Des solutions concrètes pour protéger vos données, vos réseaux et vos collaborateurs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {securityServices.map((service, idx) => {
              const Icon = service.icon

              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ delay: idx * .08 }}
                  className="security-card"
                >
                  <div className="flex items-start justify-between mb-5">

                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${service.color}18`,
                        color: service.color
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    <span
                      className="text-[11px] font-bold px-3 py-1 rounded-full"
                      style={{
                        color: colors.blue,
                        background: `${colors.blue}10`
                      }}
                    >
                      Sur devis
                    </span>

                  </div>

                  <h3
                    className="font-syne font-bold text-lg mb-2"
                    style={{ color: colors.navy }}
                  >
                    {service.title}
                  </h3>

                  <p className="text-[#25364A] text-sm leading-relaxed mb-5">
                    {service.desc}
                  </p>

                  <Link
                    to="/demander-devis"
                    className="inline-flex items-center gap-2 text-sm font-bold"
                    style={{ color: colors.blue }}
                  >
                    Demander un devis
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )
            })}

          </div>
        </div>
      </section>

      {/* ==================== SÉCURITÉ TÉLÉCOM ==================== */}

      <section className="omedev-light-section py-24">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-w-0">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
            >

              <span className="section-badge">
                Télécom
              </span>

              <h2 className="section-title mt-4">
                Sécurité des télécommunications
              </h2>

              <div
                className="divider"
                style={{
                  margin: '1rem 0 1.5rem'
                }}
              />

              <p className="text-[#25364A] mb-7 leading-relaxed">
                Protégez vos infrastructures voix, données et mobiles contre les cybermenaces, les intrusions et les fraudes.
              </p>

              <div className="grid grid-cols-1 gap-4">

                {telecomServices.map((item, i) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 20
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay: i * .08
                      }}
                      className="security-list-card"
                    >

                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${item.color}18`,
                          color: item.color
                        }}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4
                          className="font-syne font-bold"
                          style={{ color: colors.navy }}
                        >
                          {item.title}
                        </h4>

                        <p className="text-[#25364A] text-sm mt-1">
                          {item.desc}
                        </p>
                      </div>

                    </motion.div>
                  )
                })}

              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: .15
              }}
              className="image-card"
            >
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop"
                alt="Sécurité télécom"
                className="w-full h-[480px] object-cover"
              />
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================== SÉCURITÉ INFORMATIQUE ==================== */}

      <section className="omedev-white-section py-24">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-w-0">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: .6 }}
              className="image-card order-2 lg:order-1"
            >
              <img
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"
                alt="Sécurité informatique"
                className="w-full h-[480px] object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .6,
                delay: .15
              }}
              className="order-1 lg:order-2"
            >

              <span className="section-badge">
                Informatique
              </span>

              <h2 className="section-title mt-4">
                Sécurité informatique & données
              </h2>

              <div
                className="divider"
                style={{
                  margin: '1rem 0 1.5rem'
                }}
              />

              <p className="text-[#25364A] mb-7 leading-relaxed">
                Sécurisez vos données, vos serveurs, vos environnements cloud et vos systèmes critiques avec une approche globale.
              </p>

              <div className="grid grid-cols-1 gap-4">

                {itSecurityServices.map((item, i) => {
                  const Icon = item.icon

                  return (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 20
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay: i * .08
                      }}
                      className="security-list-card"
                    >

                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${item.color}18`,
                          color: item.color
                        }}
                      >
                        <Icon size={18} />
                      </div>

                      <div>
                        <h4
                          className="font-syne font-bold"
                          style={{ color: colors.navy }}
                        >
                          {item.title}
                        </h4>

                        <p className="text-[#25364A] text-sm mt-1">
                          {item.desc}
                        </p>
                      </div>

                    </motion.div>
                  )
                })}

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================== STATISTIQUES ==================== */}

      <section className="omedev-dark-section py-20">
        <div className="container">

          <SectionHeader
            badge="Chiffres clés"
            title="La sécurité en chiffres"
            subtitle="Des résultats mesurables pour renforcer durablement votre sécurité."
            light
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {stats.map((stat, idx) => {
              const Icon = stat.icon

              return (
                <motion.div
                  key={idx}
                  variants={fadeScale}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * .1
                  }}
                  className="p-6 rounded-2xl text-center"
                  style={{
                    background: 'rgba(255,255,255,.06)',
                    border: '1px solid rgba(255,255,255,.15)'
                  }}
                  whileHover={{
                    y: -7,
                    scale: 1.02
                  }}
                >

                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{
                      background:
                        'linear-gradient(135deg, #4681B7, #053876)'
                    }}
                  >
                    <Icon
                      size={22}
                      className="text-white"
                    />
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-white font-syne mb-1">
                    {stat.value}
                  </div>

                  <div className="text-white/70 text-xs sm:text-sm">
                    {stat.label}
                  </div>

                </motion.div>
              )
            })}

          </div>
        </div>
      </section>

      {/* ==================== INFRASTRUCTURES ==================== */}

      <section className="omedev-white-section py-24">
        <div className="container">

          <SectionHeader
            badge="Infrastructures"
            title="Nos infrastructures & équipements"
            subtitle="Des technologies modernes pour répondre aux exigences de sécurité des environnements professionnels."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {images.map((img, idx) => (
              <motion.div
                key={idx}
                variants={fadeScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  delay: idx * .1
                }}
                className="image-card cursor-pointer"
              >
                <img
                  src={img}
                  alt="Infrastructure de sécurité"
                  className="w-full h-56 object-cover"
                />
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ==================== SOLUTIONS INTÉGRÉES ==================== */}

      <section className="omedev-light-section py-24">
        <div className="container">

          <SectionHeader
            badge="Solutions intégrées"
            title="Sécurité + Télécom + IT"
            subtitle="Une approche globale pour protéger l’ensemble de votre écosystème numérique."
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-4xl mx-auto">

            {[
              {
                icon: Lock,
                name: 'Zero Trust'
              },
              {
                icon: Network,
                name: 'SASE'
              },
              {
                icon: Cloud,
                name: 'Cloud Security'
              },
              {
                icon: Shield,
                name: 'SOC interne'
              }
            ].map((item, idx) => (
              <IntegratedCard
                key={idx}
                item={item}
              />
            ))}

          </div>
        </div>
      </section>

      {/* ==================== TÉMOIGNAGES ==================== */}

      <section className="omedev-white-section py-24">
        <div className="container">
          <TestimonialsCarousel
            badge="Témoignages"
            title="Ils nous font confiance"
            subtitle="La sécurité de nos clients reste notre meilleure référence."
            items={testimonials.map((t) => ({ name: t.name, role: t.role, content: t.quote, avatar: t.photo }))}
          />
        </div>
      </section>

      {/* ==================== POURQUOI OMEDEV ==================== */}

      <section className="omedev-light-section py-24">
        <div className="container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-w-0">

            <motion.div
              initial={{
                opacity: 0,
                x: -40
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: .6
              }}
            >

              <span className="section-badge">
                Pourquoi nous
              </span>

              <h2 className="section-title mt-4">
                Pourquoi OMEDEV Sécurité ?
              </h2>

              <div
                className="divider"
                style={{
                  margin: '1rem 0 1.5rem'
                }}
              />

              <div className="space-y-4">

                {benefits.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{
                      opacity: 0,
                      x: -20
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0
                    }}
                    viewport={{
                      once: true
                    }}
                    transition={{
                      delay: i * .08
                    }}
                    className="flex items-start gap-3"
                  >

                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${colors.energy}22`,
                        color: colors.turquoise
                      }}
                    >
                      <CheckCircle size={17} />
                    </div>

                    <span className="text-[#25364A] pt-1">
                      {item}
                    </span>

                  </motion.div>
                ))}

              </div>

              <Link
                to="/demander-devis"
                className="btn-primary mt-8"
              >
                Demander un devis sécurité
                <ArrowRight size={16} />
              </Link>

            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 40
              }}
              whileInView={{
                opacity: 1,
                x: 0
              }}
              viewport={{
                once: true
              }}
              transition={{
                duration: .6,
                delay: .15
              }}
              className="card-hover p-8 text-center"
            >

              <div
                className="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    'linear-gradient(135deg, #0B74C1, #2AACB2, #55DDB5)'
                }}
              >
                <Shield
                  size={30}
                  className="text-white"
                />
              </div>

              <div className="quote-mark">
                “
              </div>

              <p className="text-[#25364A] italic leading-relaxed">
                Grâce à OMEDEV, nous avons réduit les incidents de sécurité de 90% en 6 mois.
              </p>

              <p
                className="text-sm mt-5 font-semibold"
                style={{
                  color: colors.navy
                }}
              >
                Directeur Technique, Opérateur Télécom
              </p>

            </motion.div>

          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Besoin d'un service personnalisé ?"
        title="Prêt à renforcer votre sécurité ?"
        highlight="votre sécurité"
        subtitle="Audit gratuit, analyse de vos besoins et devis personnalisé sous 24h."
        backgroundImage="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
        secondaryAction={{ label: 'Contacter un expert', to: '/contact' }}
      />
    </div>
  )
}

export default Securite