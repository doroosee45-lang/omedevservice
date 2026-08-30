import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle, Star, Calendar, Headphones,
  Code, Cloud, Sun, GraduationCap, Wifi, Shield,
  TrendingUp, Handshake, Target
} from 'lucide-react';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-tarifs {
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
  }

  .omedev-tarifs .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .omedev-tarifs .section-badge {
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

  .omedev-tarifs .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-tarifs .section-subtitle {
    font-size: 1rem;
    color: #25364A;
    max-width: 52ch;
    margin: 0 auto;
    line-height: 1.7;
  }

  .omedev-tarifs .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-tarifs .btn-primary,
  .omedev-tarifs .btn-accent {
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

  .omedev-tarifs .btn-primary:hover,
  .omedev-tarifs .btn-accent:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  .omedev-tarifs .btn-outline {
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

  .omedev-tarifs .btn-outline:hover {
    border-color: #2AACB2;
    color: #0B74C1;
    background: rgba(85,221,181,.08);
    transform: translateY(-3px);
  }

  .omedev-tarifs .card-hover {
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-tarifs .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-tarifs .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-tarifs .omedev-light-section { background: #F6F6F7; }
  .omedev-tarifs .omedev-white-section { background: #fff; }
  .omedev-tarifs .omedev-energy-section {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }
  .omedev-tarifs .omedev-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-tarifs .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-16px); }
  }
  .omedev-tarifs .animate-float { animation: float 6s ease-in-out infinite; }

  /* ── Billing toggle ── */
  .omedev-tarifs .billing-toggle-wrap {
    background: rgba(5,56,118,.05);
    border: 1px solid rgba(5,56,118,.10);
    border-radius: 999px;
    padding: 4px;
    display: inline-flex;
  }
  .omedev-tarifs .billing-btn {
    padding: .6rem 1.4rem;
    border-radius: 999px;
    font-weight: 700;
    font-size: .85rem;
    font-family: 'Syne', sans-serif;
    border: none;
    background: transparent;
    color: #25364A;
    cursor: pointer;
    transition: all .3s ease;
  }
  .omedev-tarifs .billing-btn.active {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(11,116,193,.25);
  }
  .omedev-tarifs .billing-btn:not(.active):hover {
    color: #0B74C1;
  }
  .omedev-tarifs .discount-pill {
    margin-left: 6px;
    font-size: 10px;
    background: #55DDB5;
    color: #053876;
    padding: 1px 6px;
    border-radius: 999px;
    font-weight: 800;
  }

  /* ── Service / pack cards ── */
  .omedev-tarifs .service-card-header {
    padding: 1.75rem;
    color: #fff;
  }
  .omedev-tarifs .service-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: rgba(255,255,255,.18);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
  .omedev-tarifs .popular-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    z-index: 5;
    background: #55DDB5;
    color: #053876;
    font-size: 10.5px;
    font-weight: 800;
    padding: 5px 12px;
    border-radius: 999px;
    display: flex;
    align-items: center;
    gap: 4px;
    box-shadow: 0 6px 16px rgba(5,56,118,.2);
  }
  .omedev-tarifs .price-line {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    color: #053876;
  }

  @media (max-width: 768px) {
    .omedev-tarifs .container { padding: 0 1rem; }
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

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
};

const Tarifs = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly');

  const services = [
    {
      id: 1,
      name: 'Réseau & Infrastructure',
      icon: Wifi,
      description: 'Installation et maintenance de réseaux informatiques',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Audit réseau initial',
        'Câblage structuré',
        'Configuration équipements',
        'Support technique 24/7',
        'Maintenance préventive',
        'Rapports mensuels'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #0B74C1, #4681B7)',
    },
    {
      id: 2,
      name: 'Sécurité',
      icon: Shield,
      description: 'Solutions de sécurité complètes',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Vidéosurveillance HD',
        'Audit cybersécurité',
        'Firewall management',
        "Contrôle d'accès",
        'Alertes en temps réel',
        'Backup sécurisé'
      ],
      popular: true,
      gradient: 'linear-gradient(135deg, #053876, #1D5B9B)',
    },
    {
      id: 3,
      name: 'Développement Digital',
      icon: Code,
      description: 'Création de sites et applications sur mesure',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Site vitrine / E-commerce',
        'Application mobile',
        'SEO optimisé',
        'Maintenance incluse',
        'Hébergement offert',
        'Support prioritaire'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #2AACB2, #55DDB5)',
    },
    {
      id: 4,
      name: 'Cloud & Hébergement',
      icon: Cloud,
      description: 'Solutions cloud haute disponibilité',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Hébergement sécurisé',
        'Backup automatique',
        'Migration cloud',
        'Monitoring 24/7',
        'Certificat SSL',
        'SLA 99.9%'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #1D5B9B, #72A5CE)',
    },
    {
      id: 5,
      name: 'Énergie & Équipements',
      icon: Sun,
      description: 'Solutions énergétiques durables',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Audit énergétique',
        'Installation panneaux solaires',
        'Maintenance climatisation',
        'Optimisation consommation',
        'Certifications qualité',
        'Garantie 5 ans'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #55DDB5, #2AACB2)',
    },
    {
      id: 6,
      name: 'Formation',
      icon: GraduationCap,
      description: 'Formations professionnelles certifiantes',
      price: { monthly: 'Sur devis', quarterly: 'Sur devis', yearly: 'Sur devis' },
      features: [
        'Accès illimité formations',
        'Certifications reconnues',
        'Support pédagogique',
        'E-learning inclus',
        'Suivi personnalisé',
        'Mise à jour continue'
      ],
      popular: false,
      gradient: 'linear-gradient(135deg, #0B74C1, #2AACB2)',
    }
  ];

  const packs = [
    {
      name: 'Pack Start',
      price: 'Sur devis',
      originalPrice: null,
      description: 'Idéal pour les petites structures',
      features: [
        'Site vitrine (5 pages)',
        'Hébergement 1 an',
        'Email professionnel',
        'Support basique',
        'Formation utilisateur'
      ],
      recommended: false
    },
    {
      name: 'Pack Business',
      price: 'Sur devis',
      originalPrice: null,
      description: 'Pour les entreprises en croissance',
      features: [
        'Site e-commerce complet',
        'Application mobile',
        'SEO avancé',
        'Support prioritaire',
        'Maintenance incluse',
        'Analytics avancés'
      ],
      recommended: true
    },
    {
      name: 'Pack Enterprise',
      price: 'Sur devis',
      originalPrice: null,
      description: 'Solutions sur mesure',
      features: [
        'ERP personnalisé',
        'Infrastructure dédiée',
        'SLA personnalisé',
        'Support dédié 24/7',
        'Audit trimestriel',
        'Formations sur site'
      ],
      recommended: false
    }
  ];

  const getCurrentPrice = (service) => service.price[billingPeriod];

  const getDiscountLabel = () => {
    if (billingPeriod === 'quarterly') return 'Économisez 10%';
    if (billingPeriod === 'yearly') return 'Économisez 20%';
    return '';
  };

  return (
    <div className="omedev-tarifs">
      <style>{globalStyles}</style>

      {/* ==================== HERO ==================== */}
      <PublicHero
        badge="Nos tarifs"
        title="Des offres adaptées à vos besoins"
        highlight="vos besoins"
        subtitle="Choisissez la formule qui correspond à votre activité. Sans engagement, évolutif."
        primaryAction={{ label: 'Demander un conseil', to: '/contact' }}
        secondaryAction={{ label: 'Faire un audit', to: '/audit' }}
      />

      {/* ==================== BILLING TOGGLE ==================== */}
      <div className="omedev-white-section sticky top-0 z-40 py-5 border-b border-black/5">
        <div className="container flex justify-center">
          <div className="billing-toggle-wrap">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`billing-btn ${billingPeriod === 'monthly' ? 'active' : ''}`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingPeriod('quarterly')}
              className={`billing-btn ${billingPeriod === 'quarterly' ? 'active' : ''}`}
            >
              Trimestriel
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`billing-btn ${billingPeriod === 'yearly' ? 'active' : ''}`}
            >
              Annuel <span className="discount-pill">-20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================== SERVICES ==================== */}
      <section className="omedev-light-section py-24">
        <div className="container">
          <SectionHeader badge="Nos offres" title="Tarifs par service" subtitle="Des prix transparents sans surprise. Abonnement sans engagement." />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={fadeUp}
                  className="team-card card-hover relative overflow-hidden flex flex-col"
                >
                  {service.popular && (
                    <div className="popular-badge">
                      <Star size={11} className="fill-current" /> Populaire
                    </div>
                  )}

                  <div className="service-card-header" style={{ background: service.gradient }}>
                    <div className="service-icon-wrap">
                      <Icon size={26} className="text-white" />
                    </div>
                    <h3 className="font-syne text-xl font-bold mb-1">{service.name}</h3>
                    <p className="text-white/85 text-sm">{service.description}</p>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <div className="mb-6">
                      <span className="price-line text-3xl">{getCurrentPrice(service)}</span>
                      <span className="text-[#25364A]/60 text-sm ml-1">
                        / {billingPeriod === 'monthly' ? 'mois' : billingPeriod === 'quarterly' ? 'trimestre' : 'an'}
                      </span>
                      {billingPeriod !== 'monthly' && (
                        <p className="text-sm mt-1" style={{ color: colors.turquoise }}>{getDiscountLabel()}</p>
                      )}
                    </div>
                    <div className="space-y-3 mb-8 flex-1">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle size={16} style={{ color: colors.turquoise }} className="flex-shrink-0 mt-0.5" />
                          <span className="text-[#25364A]">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Link to="/contact" className="btn-primary w-full">
                      Demander ce service <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==================== PACKS ==================== */}
      <section className="omedev-white-section py-24">
        <div className="container">
          <SectionHeader badge="Offres groupées" title="Packs pré-configurés" subtitle="Des offres complètes à prix réduits. Tout compris." />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packs.map((pack, index) => (
              <motion.div
                key={pack.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-hover relative overflow-hidden"
                style={pack.recommended ? { borderColor: 'rgba(42,172,178,.45)', boxShadow: '0 22px 48px rgba(11,116,193,.16)' } : {}}
              >
                {pack.recommended && (
                  <div
                    className="text-center text-xs font-bold py-2 text-white font-syne uppercase tracking-wide"
                    style={{ background: 'linear-gradient(135deg, #0B74C1, #2AACB2, #55DDB5)' }}
                  >
                    Recommandé
                  </div>
                )}
                <div className="p-8 text-center">
                  <h3 className="font-syne text-2xl font-bold mb-2" style={{ color: colors.navy }}>{pack.name}</h3>
                  <p className="text-[#25364A] text-sm mb-4">{pack.description}</p>
                  <div className="mb-6">
                    <span className="price-line text-4xl">{pack.price}</span>
                    {pack.originalPrice && (
                      <span className="text-[#25364A]/40 line-through ml-2 text-lg">{pack.originalPrice}</span>
                    )}
                  </div>
                  <ul className="text-left space-y-3 mb-8">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle size={16} style={{ color: colors.turquoise }} className="flex-shrink-0 mt-0.5" />
                        <span className="text-[#25364A]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={pack.recommended ? 'btn-primary w-full' : 'btn-outline w-full'}
                  >
                    Choisir ce pack <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POURQUOI NOUS + DEVIS ==================== */}
      <section className="omedev-light-section py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="section-badge">
                Pourquoi nous
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold mt-4 mb-6" style={{ color: colors.navy }}>Pourquoi choisir omedev Services ?</h2>
              <div className="space-y-4">
                {[
                  { icon: CheckCircle, title: 'Prix transparents', text: 'Pas de frais cachés. Ce que vous voyez est ce que vous payez.' },
                  { icon: Headphones, title: 'Support 24/7', text: 'Une équipe dédiée à votre écoute, jour et nuit.' },
                  { icon: Calendar, title: 'Sans engagement', text: "Résiliez à tout moment. Pas de période d'engagement obligatoire." },
                  { icon: TrendingUp, title: 'Évolutif', text: 'Changez de formule à tout moment selon vos besoins.' },
                ].map(({ icon: Icon, title, text }) => (
                  <div key={title} className="flex items-start gap-4 p-4 rounded-xl bg-white" style={{ border: '1px solid rgba(5,56,118,.09)', boxShadow: '0 10px 30px rgba(5,56,118,.06)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(42,172,178,.12)' }}>
                      <Icon size={18} style={{ color: colors.turquoise }} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1" style={{ color: colors.navy }}>{title}</h3>
                      <p className="text-[#25364A] text-sm">{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl p-8 flex flex-col justify-center bg-white"
              style={{ border: '1px solid rgba(5,56,118,.09)', boxShadow: '0 10px 30px rgba(5,56,118,.06)' }}
            >
              <h2 className="font-syne text-2xl font-bold mb-4" style={{ color: colors.navy }}>Besoin d'un devis personnalisé ?</h2>
              <p className="text-[#25364A] mb-6">
                Chaque projet est unique. Contactez-nous pour une offre adaptée à vos besoins spécifiques.
              </p>
              <div className="space-y-3">
                <Link
                  to="/contact"
                  className="flex items-center justify-between p-4 rounded-xl transition group"
                  style={{ background: 'rgba(11,116,193,.06)' }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: colors.navy }}>Demander un devis gratuit</p>
                    <p className="text-sm text-[#25364A]/70">Réponse sous 24h</p>
                  </div>
                  <ArrowRight size={20} style={{ color: colors.blue }} className="group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/audit-gratuit"
                  className="flex items-center justify-between p-4 rounded-xl transition group"
                  style={{ background: 'rgba(11,116,193,.06)' }}
                >
                  <div>
                    <p className="font-semibold" style={{ color: colors.navy }}>Audit gratuit</p>
                    <p className="text-sm text-[#25364A]/70">Diagnostic complet de votre infrastructure</p>
                  </div>
                  <ArrowRight size={20} style={{ color: colors.blue }} className="group-hover:translate-x-1 transition" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prêt à démarrer ?"
        title="Trouvez la formule qui vous correspond"
        highlight="qui vous correspond"
        subtitle="Un conseiller vous aide à choisir le pack adapté à votre budget et à vos objectifs, ou vous prépare un devis sur mesure."
        backgroundImage="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Nous contacter', to: '/contact' }}
      />
    </div>
  );
};

export default Tarifs;