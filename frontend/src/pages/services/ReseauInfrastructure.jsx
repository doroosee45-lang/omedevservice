
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PublicHero from '../../components/Public/PublicHero'
import TestimonialsCarousel from '../../components/Public/TestimonialsCarousel'
import CTASection from '../../components/Public/CTASection'
import {
  Wifi,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Network,
  Zap,
  HardDrive
} from 'lucide-react'

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #F6F6F7;
    color: #0B1213;
    overflow-x: hidden;
  }

  .omedev-network {
    --navy: #053876;
    --blue: #0B74C1;
    --blue-light: #4681B7;
    --turquoise: #2AACB2;
    --energy: #55DDB5;
    --white: #F6F6F7;
    --gray: #D5DCE1;
    --text: #25364A;
  }

  .omedev-network .font-syne {
    font-family: 'Syne', sans-serif;
  }

  .omedev-network .container {
    width: 100%;
    max-width: 1280px;
    margin: 0 auto;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  /* ============================
     ANIMATIONS
  ============================ */

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-18px);
    }
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(.8);
      opacity: .9;
    }

    70% {
      transform: scale(1.3);
      opacity: 0;
    }

    100% {
      transform: scale(.8);
      opacity: 0;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }

    100% {
      background-position: 200% 0;
    }
  }

  .omedev-network .animate-float {
    animation: float 6s ease-in-out infinite;
  }

  .omedev-network .animate-pulse-ring {
    animation: pulse-ring 2s ease-out infinite;
  }

  .omedev-network .shimmer {
    background:
      linear-gradient(
        90deg,
        transparent,
        rgba(255,255,255,.08),
        transparent
      );
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite;
  }

  /* ============================
     HERO
  ============================ */

  .omedev-network .hero {
    position: relative;
    overflow: hidden;
    min-height: 610px;

    background:
      linear-gradient(
        135deg,
        #053876 0%,
        #1D5B9B 35%,
        #4681B7 60%,
        #72A5CE 80%,
        #A6C3D7 100%
      );

    color: white;
  }

  .omedev-network .hero-grid {
    position: absolute;
    inset: 0;
    opacity: .20;

    background-image:
      linear-gradient(
        rgba(255,255,255,.10) 1px,
        transparent 1px
      ),
      linear-gradient(
        90deg,
        rgba(255,255,255,.10) 1px,
        transparent 1px
      );

    background-size: 60px 60px;
  }

  .omedev-network .hero-content {
    position: relative;
    z-index: 10;
  }

  .omedev-network .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: .55rem;

    padding: .55rem 1.15rem;

    border-radius: 999px;

    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.25);

    backdrop-filter: blur(10px);

    color: white;

    font-family: 'Syne', sans-serif;
    font-size: .70rem;
    font-weight: 700;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .omedev-network .hero-title {
    font-family: 'Syne', sans-serif;

    font-size: clamp(
      2.6rem,
      6vw,
      5rem
    );

    line-height: 1.05;
    font-weight: 800;

    letter-spacing: -.045em;

    color: white;
  }

  .omedev-network .hero-gradient-text {
    position: relative;
    display: inline-block;

    background:
      linear-gradient(
        90deg,
        #55DDB5,
        #2AACB2,
        #72A5CE
      );

    -webkit-background-clip: text;
    background-clip: text;

    color: transparent;
  }

  .omedev-network .hero-gradient-text::before {
    content: '';

    position: absolute;
    inset: -10px;

    background:
      linear-gradient(
        90deg,
        #55DDB5,
        #2AACB2,
        #72A5CE
      );

    filter: blur(35px);
    opacity: .28;

    z-index: -1;
  }

  .omedev-network .hero-divider {
    width: 64px;
    height: 4px;

    margin: 1.5rem auto;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        #0B74C1,
        #2AACB2,
        #55DDB5
      );
  }

  .omedev-network .hero-description {
    max-width: 760px;
    margin: 0 auto;

    color: rgba(255,255,255,.82);

    font-size: clamp(
      1rem,
      2vw,
      1.25rem
    );

    line-height: 1.75;
  }

  .omedev-network .hero-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    gap: .75rem;

    margin-top: 2rem;
  }

  .omedev-network .hero-tag {
    padding: .55rem 1rem;

    border-radius: 999px;

    background: rgba(255,255,255,.10);
    border: 1px solid rgba(255,255,255,.20);

    color: rgba(255,255,255,.88);

    font-size: .82rem;
  }

  /* ============================
     SECTION
  ============================ */

  .omedev-network .section {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }

  .omedev-network .section-light {
    background: #F6F6F7;
  }

  .omedev-network .section-white {
    background: white;
  }

  .omedev-network .section-header {
    text-align: center;
    max-width: 760px;

    margin: 0 auto 3.5rem;
  }

  .omedev-network .section-badge {
    display: inline-flex;

    padding: .5rem 1.1rem;

    border-radius: 999px;

    background: rgba(11,116,193,.08);

    border: 1px solid rgba(11,116,193,.15);

    color: #0B74C1;

    font-family: 'Syne', sans-serif;

    font-size: .7rem;
    font-weight: 700;

    letter-spacing: .12em;
    text-transform: uppercase;
  }

  .omedev-network .section-title {
    margin-top: 1rem;

    color: #053876;

    font-family: 'Syne', sans-serif;

    font-size: clamp(
      2rem,
      4vw,
      3.1rem
    );

    font-weight: 800;

    line-height: 1.12;

    letter-spacing: -.035em;
  }

  .omedev-network .section-divider {
    width: 64px;
    height: 4px;

    margin: 1.4rem auto;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        #0B74C1,
        #2AACB2,
        #55DDB5
      );
  }

  .omedev-network .section-subtitle {
    color: #25364A;

    font-size: 1rem;
    line-height: 1.75;
  }

  /* ============================
     FEATURE CARDS
  ============================ */

  .omedev-network .feature-card {
    height: 100%;

    padding: 1.75rem;

    background: white;

    border: 1px solid rgba(5,56,118,.08);

    border-radius: 20px;

    box-shadow:
      0 12px 35px rgba(5,56,118,.06);

    transition:
      transform .35s ease,
      box-shadow .35s ease,
      border-color .35s ease;
  }

  .omedev-network .feature-card:hover {
    transform: translateY(-7px);

    border-color:
      rgba(42,172,178,.30);

    box-shadow:
      0 22px 50px rgba(11,116,193,.12);
  }

  .omedev-network .feature-icon {
    width: 54px;
    height: 54px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 1.25rem;

    border-radius: 15px;

    background:
      linear-gradient(
        135deg,
        rgba(11,116,193,.10),
        rgba(42,172,178,.10)
      );

    color: #0B74C1;
  }

  .omedev-network .feature-title {
    color: #053876;

    font-family: 'Syne', sans-serif;

    font-size: 1.15rem;
    font-weight: 700;

    margin-bottom: .6rem;
  }

  .omedev-network .feature-description {
    color: #526579;

    font-size: .92rem;

    line-height: 1.7;
  }

  /* ============================
     BENEFITS
  ============================ */

  .omedev-network .benefits-section {
    background: #fff;
    color: #0B1213;

    position: relative;
    overflow: hidden;
  }

  .omedev-network .benefits-badge {
    display: inline-flex;
    align-items: center;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    border: 1px solid rgba(11,116,193,.18);
    color: #0B74C1;
    font-size: .7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .1em;
    font-family: 'Syne', sans-serif;
  }

  .omedev-network .benefits-title {
    color: #053876;

    font-family: 'Syne', sans-serif;

    font-size: clamp(
      2rem,
      4vw,
      3rem
    );

    font-weight: 800;

    line-height: 1.15;
  }

  .omedev-network .benefits-highlight {
    background: linear-gradient(90deg, #0B74C1, #2AACB2);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .omedev-network .benefits-divider {
    width: 64px;
    height: 4px;

    margin: 1.4rem 0;

    border-radius: 999px;

    background:
      linear-gradient(
        90deg,
        #0B74C1,
        #2AACB2,
        #55DDB5
      );
  }

  .omedev-network .benefit-item {
    display: flex;
    align-items: flex-start;

    gap: .75rem;
  }

  .omedev-network .benefit-check {
    flex-shrink: 0;

    width: 23px;
    height: 23px;

    color: #2AACB2;

    margin-top: .1rem;
  }

  .omedev-network .benefit-text {
    color: #25364A;

    font-size: .95rem;
    line-height: 1.65;
  }

  .omedev-network .testimonial-card {
    position: relative;
    z-index: 2;

    padding: 2.5rem;

    border-radius: 22px;

    background:
      linear-gradient(
        135deg,
        rgba(255,255,255,.12),
        rgba(255,255,255,.05)
      );

    border: 1px solid rgba(255,255,255,.15);

    backdrop-filter: blur(12px);

    box-shadow:
      0 25px 60px rgba(0,0,0,.15);
  }

  .omedev-network .testimonial-icon {
    width: 68px;
    height: 68px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 1.5rem;

    border-radius: 18px;

    background:
      rgba(85,221,181,.12);

    color: #55DDB5;
  }

  .omedev-network .testimonial-text {
    color: rgba(255,255,255,.84);

    font-size: 1rem;

    line-height: 1.8;

    font-style: italic;
  }

  .omedev-network .testimonial-author {
    margin-top: 1.25rem;

    color: rgba(255,255,255,.55);

    font-size: .8rem;
  }

  /* ============================
     CTA
  ============================ */

  .omedev-network .cta-section {
    padding: 6rem 1rem;

    background: #F6F6F7;
  }

  .omedev-network .cta-card {
    position: relative;
    overflow: hidden;

    max-width: 900px;

    margin: 0 auto;

    padding: 3.5rem 2rem;

    border-radius: 24px;

    text-align: center;

    background:
      linear-gradient(
        135deg,
        #053876,
        #1D5B9B,
        #0B74C1
      );

    box-shadow:
      0 25px 60px rgba(5,56,118,.18);
  }

  .omedev-network .cta-card::before {
    content: '';

    position: absolute;

    width: 300px;
    height: 300px;

    top: -150px;
    left: -100px;

    border-radius: 50%;

    background: #55DDB5;

    filter: blur(100px);

    opacity: .12;
  }

  .omedev-network .cta-card::after {
    content: '';

    position: absolute;

    width: 300px;
    height: 300px;

    bottom: -180px;
    right: -80px;

    border-radius: 50%;

    background: #72A5CE;

    filter: blur(100px);

    opacity: .15;
  }

  .omedev-network .cta-content {
    position: relative;
    z-index: 2;
  }

  .omedev-network .cta-title {
    color: white;

    font-family: 'Syne', sans-serif;

    font-size: clamp(
      1.8rem,
      4vw,
      2.8rem
    );

    font-weight: 800;

    line-height: 1.15;

    margin-bottom: 1rem;
  }

  .omedev-network .cta-description {
    max-width: 600px;

    margin: 0 auto 2rem;

    color: rgba(255,255,255,.75);

    line-height: 1.7;
  }

  .omedev-network .primary-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: .6rem;

    padding: .95rem 1.5rem;

    border-radius: 12px;

    background:
      linear-gradient(
        135deg,
        #0B74C1,
        #2AACB2,
        #55DDB5
      );

    color: white;

    font-family: 'Syne', sans-serif;

    font-size: .85rem;
    font-weight: 700;

    text-decoration: none;

    box-shadow:
      0 10px 28px rgba(11,116,193,.25);

    transition:
      transform .3s ease,
      box-shadow .3s ease;
  }

  .omedev-network .primary-button:hover {
    transform: translateY(-3px);

    box-shadow:
      0 18px 38px rgba(42,172,178,.30);
  }

  .omedev-network .secondary-link {
    display: inline-flex;
    align-items: center;

    gap: .45rem;

    margin-top: 1.5rem;

    color: #0B74C1;

    font-weight: 700;

    text-decoration: none;
  }

  .omedev-network .secondary-link:hover {
    color: #053876;
  }

  @media (max-width: 768px) {
    .omedev-network .container {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .omedev-network .hero {
      min-height: 570px;
    }

    .omedev-network .section {
      padding-top: 4.5rem;
      padding-bottom: 4.5rem;
    }

    .omedev-network .testimonial-card {
      padding: 1.75rem;
    }

    .omedev-network .cta-card {
      padding: 2.5rem 1.25rem;
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

const ReseauInfrastructure = () => {

  const features = [
    {
      icon: Network,
      title: 'Architecture réseau sur mesure',
      desc: 'Conception et déploiement de réseaux adaptés à votre structure'
    },
    {
      icon: Shield,
      title: 'Sécurité avancée',
      desc: 'Protection contre les intrusions et filtrage de contenu'
    },
    {
      icon: Zap,
      title: 'Hautes performances',
      desc: 'Infrastructure optimisée pour la vitesse et la fiabilité'
    },
    {
      icon: HardDrive,
      title: 'Serveurs virtualisés',
      desc: 'Virtualisation et gestion centralisée de vos serveurs'
    },
    {
      icon: Wifi,
      title: 'Wi-Fi professionnel',
      desc: 'Couverture totale avec roaming et authentification'
    },
    {
      icon: TrendingUp,
      title: 'Évolutivité',
      desc: 'Solutions prêtes à grandir avec votre entreprise'
    }
  ]

  const benefits = [
    'Ingénieurs certifiés Cisco, MikroTik, Ubiquiti',
    'Support technique 24/7',
    'Audit et optimisation de votre réseau existant',
    'Solutions hybrides (on-premise & cloud)',
    'Contrats de maintenance adaptés'
  ]

  return (
    <div className="omedev-network">

      <style>{globalStyles}</style>

      {/* =====================================================
          HERO
      ===================================================== */}

      <PublicHero
        badge="Réseau & Infrastructure"
        title="Infrastructure Hautes Performances"
        highlight="Hautes Performances"
        subtitle="Conception, déploiement et maintenance de réseaux d'entreprise robustes, sécurisés et évolutifs."
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-wrap gap-2 justify-center mt-6"
        >
          {['Architecture réseau', 'Cybersécurité', 'Cloud & Virtualisation', 'Wi-Fi professionnel'].map((tag) => (
            <span
              key={tag}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
              style={{ background: 'rgba(255,255,255,.10)', border: '1px solid rgba(255,255,255,.22)', color: '#fff' }}
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </PublicHero>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <section className="section section-light">

        <div className="container">

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true
            }}
            variants={staggerContainer}
            className="section-header"
          >

            <motion.div variants={fadeUp}>

              <span className="section-badge">
                Nos solutions
              </span>

            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="section-title"
            >
              Ce que nous vous apportons
            </motion.h2>

            <motion.div
              variants={fadeUp}
              className="section-divider"
            />

            <motion.p
              variants={fadeUp}
              className="section-subtitle"
            >
              Une infrastructure pensée pour offrir
              performance, sécurité, disponibilité
              et évolutivité à votre organisation.
            </motion.p>

          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true
            }}
            variants={staggerContainer}
            className="grid grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-6"
          >

            {features.map((feature, index) => {

              const Icon = feature.icon

              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  className="feature-card"
                >

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 2
                    }}
                    className="feature-icon"
                  >

                    <Icon size={27} />

                  </motion.div>

                  <h3 className="feature-title">
                    {feature.title}
                  </h3>

                  <p className="feature-description">
                    {feature.desc}
                  </p>

                </motion.div>
              )

            })}

          </motion.div>

        </div>

      </section>

      {/* =====================================================
          BENEFITS
      ===================================================== */}

      <section className="section benefits-section">

        <div
          className="absolute w-80 h-80
            bg-cyan-300/10
            top-0 right-0
            rounded-full
            blur-[100px]"
        />

        <div className="container relative z-10">

          <div
            className="grid
              grid-cols-1
              lg:grid-cols-2
              gap-12
              items-center"
          >

            {/* LEFT */}

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
                duration: .7
              }}
            >

              <span className="benefits-badge">
                Notre engagement
              </span>

              <h2 className="benefits-title mt-5">

                Pourquoi choisir
                <br />

                <span className="benefits-highlight">
                  OMEDEV ?
                </span>

              </h2>

              <div className="benefits-divider" />

              <p
                className="text-[#25364A]
                  leading-relaxed
                  max-w-xl
                  mb-7"
              >
                Nous combinons expertise technique,
                accompagnement humain et technologies
                modernes pour construire des infrastructures
                fiables et durables.
              </p>

              <ul className="space-y-4">

                {benefits.map(
                  (item, index) => (

                    <motion.li
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -15
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0
                      }}
                      viewport={{
                        once: true
                      }}
                      transition={{
                        delay:
                          index * .08
                      }}
                      className="benefit-item"
                    >

                      <CheckCircle
                        className="benefit-check"
                      />

                      <span className="benefit-text">
                        {item}
                      </span>

                    </motion.li>

                  )
                )}

              </ul>

              <Link
                to="/demander-devis"
                className="inline-flex
                  items-center
                  gap-2
                  mt-8
                  text-[#0B74C1]
                  font-bold
                  hover:text-[#053876]
                  transition-colors"
              >
                Demander un devis
                <ArrowRight size={16} />
              </Link>

            </motion.div>

            {/* RIGHT */}

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
                duration: .7,
                delay: .1
              }}
            >
              <TestimonialsCarousel
                items={[{
                  name: 'Directeur IT',
                  role: 'Groupe Industriel',
                  content: "OMEDEV a transformé notre infrastructure obsolète en un réseau hautement performant. Notre productivité a augmenté de 40%.",
                }]}
                badge={null}
                title={null}
              />
            </motion.div>

          </div>

        </div>

      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Infrastructure IT"
        title="Prêt à moderniser votre infrastructure ?"
        highlight="votre infrastructure"
        subtitle="Obtenez un audit gratuit et un devis personnalisé sous 48h."
        backgroundImage="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
        secondaryAction={{ label: 'Découvrir nos formations', to: '/services/formation' }}
      />
    </div>
  )
}

export default ReseauInfrastructure

