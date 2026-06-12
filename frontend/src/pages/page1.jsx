import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight,
  Server,
  Shield,
  Code,
  Cloud,
  Zap,
  GraduationCap,
  CheckCircle,
  Users,
  Clock,
  Award,
  User,
  Star,
  Quote,
  Briefcase,
  Globe,
  Cpu,
  Camera,
  Wifi,
  Wrench,
  Phone,
  ThermometerSun,
  Monitor,
} from 'lucide-react';

const Home = () => {
  // Animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // Services principaux
  const services = [
    { icon: Server, title: 'Réseau & Infrastructure', description: 'Câblage structuré, WiFi entreprise, fibre optique', color: 'from-blue-500 to-cyan-500', link: '/services/reseau' },
    { icon: Shield, title: 'Cybersécurité & Surveillance', description: 'Firewalls, audits, vidéosurveillance intelligente', color: 'from-red-500 to-orange-500', link: '/services/securite' },
    { icon: Code, title: 'Développement Digital', description: 'Applications web, mobiles, ERP sur mesure', color: 'from-purple-500 to-pink-500', link: '/services/developpement' },
    { icon: Cloud, title: 'Cloud & Télécommunications', description: 'Hébergement cloud, VoIP, solutions télécom', color: 'from-cyan-500 to-blue-500', link: '/services/cloud' },
    { icon: Zap, title: 'Énergie & Maintenance', description: 'Panneaux solaires, maintenance préventive 24/7', color: 'from-amber-500 to-orange-500', link: '/services/energie' },
    { icon: GraduationCap, title: 'Formation & Accompagnement', description: 'Formations certifiantes et transfert de compétences', color: 'from-emerald-500 to-teal-500', link: '/services/formation' },
  ];

  // Produits (climatisation, ordinateurs, caméras)
  const products = [
    {
      icon: ThermometerSun,
      title: 'Climatisation Professionnelle',
      description: 'Climatiseurs split, VRV, gainables et systèmes de refroidissement haute performance',
      color: 'from-sky-500 to-cyan-500',
    },
    {
      icon: Monitor,
      title: 'Ordinateurs & Matériel IT',
      description: 'PC de bureau, laptops professionnels, serveurs, écrans et accessoires de qualité',
      color: 'from-violet-500 to-purple-500',
    },
    {
      icon: Camera,
      title: 'Caméras de Surveillance',
      description: 'Caméras IP, 4K, PTZ, avec IA de détection et enregistrement intelligent',
      color: 'from-rose-500 to-red-500',
    },
  ];

  // Expertises approfondies
  const expertise = [
    { icon: Code, title: 'Développement Logiciel', desc: 'Applications web & mobiles sur mesure, API, IA intégrée', color: 'from-violet-500 to-fuchsia-500' },
    { icon: Phone, title: 'Télécommunications', desc: 'Réseaux VoIP, fibre, solutions de communication unifiée', color: 'from-sky-500 to-indigo-500' },
    { icon: Camera, title: 'Vidéosurveillance Avancée', desc: 'Caméras IP, IA de reconnaissance, monitoring 24/7', color: 'from-rose-500 to-red-500' },
    { icon: Wrench, title: 'Maintenance & Support', desc: 'Maintenance préventive, corrective et assistance dédiée', color: 'from-emerald-500 to-cyan-500' },
  ];

  // Statistiques
  const stats = [
    { icon: Users, value: 150, label: 'Clients satisfaits', suffix: '+' },
    { icon: Code, value: 200, label: 'Projets réalisés', suffix: '+' },
    { icon: Clock, value: 24, label: 'Support technique', suffix: '/7' },
    { icon: Award, value: 100, label: 'Qualité garantie', suffix: '%' },
  ];

  // Témoignages
  const testimonials = [
    {
      name: 'Jean M.',
      position: 'CEO, TechCorp',
      content: 'OMDEVE a transformé notre infrastructure IT. Service impeccable et équipe très professionnelle.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Sarah K.',
      position: 'Directrice, Energy Solutions',
      content: "L'installation des panneaux solaires a été réalisée avec excellence. Économies d'énergie significatives.",
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Marc L.',
      position: 'CTO, Digital Africa',
      content: 'La plateforme e-commerce développée est performante et élégante. Hautement recommandé.',
      rating: 5,
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
  ];

  // Solutions packagées
  const packs = [
    {
      name: 'Pack Entreprise',
      price: 'Sur devis',
      features: ['Réseau complet + Sécurité', 'ERP sur mesure', 'Support prioritaire', 'Maintenance incluse'],
      icon: Briefcase,
    },
    {
      name: 'Pack E-commerce',
      price: 'Sur devis',
      features: ['Site performant + Mobile', 'Paiement intégré', 'SEO local', 'Hébergement cloud'],
      icon: Globe,
    },
    {
      name: 'Pack Digital Complet',
      price: 'Sur devis',
      features: ['Site + Application', 'Télécom & Surveillance', 'Cloud sécurisé', 'Formation équipe'],
      icon: Cpu,
    },
  ];

  // Counter component
  const Counter = ({ end, suffix, duration = 2.5 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    useEffect(() => {
      if (isInView) {
        let start = 0;
        const increment = end / (duration * 60);
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [isInView, end, duration]);

    return (
      <span ref={ref}>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <div className="overflow-x-hidden">
      {/* ==================== HERO - Ultra Premium ==================== */}
      <section className="relative h-screen min-h-[720px] flex items-center bg-zinc-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-zoom scale-110"
          style={{
            backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=2000&q=90')`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-blue-950/75 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,#3b82f645_0%,transparent_65%)]" />

        <div className="container-custom relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-7 py-3 rounded-3xl mb-8"
              >
                <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="uppercase tracking-[3px] text-sm font-medium">
                  OMDEVE Services • Kinshasa
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8"
              >
                Votre partenaire technologique
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-300 bg-clip-text text-transparent">
                  de confiance en Afrique
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-2xl text-white/80 max-w-3xl mx-auto mb-14 leading-relaxed"
              >
                Solutions complètes : Développement • Télécom • Vidéosurveillance • Climatisation • Matériel IT
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  to="/demander-devis"
                  className="btn-primary text-lg px-12 py-5 rounded-3xl flex items-center gap-3 shadow-2xl hover:shadow-white/20"
                >
                  Demander un devis
                  <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  to="/audit-gratuit"
                  className="group border-2 border-white/80 hover:border-white px-12 py-5 rounded-3xl font-semibold text-lg flex items-center gap-3 transition-all hover:bg-white hover:text-zinc-900"
                >
                  Audit gratuit
                  <CheckCircle className="w-6 h-6" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-28 text-white/90">
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* ==================== EXPERTISES TECHNIQUES ==================== */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex bg-primary-100 text-primary-700 px-6 py-3 rounded-3xl text-sm font-semibold mb-4">
              EXPERTISE TECHNIQUE
            </div>
            <h2 className="section-title">Domaines d'excellence</h2>
            <p className="section-subtitle">
              Nous maîtrisons l’ensemble de votre écosystème technologique
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertise.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -12 }}
                transition={{ delay: idx * 0.08 }}
                className="group bg-white border border-gray-100 rounded-3xl p-10 hover:border-primary-200 hover:shadow-2xl transition-all duration-500"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-11 h-11 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PRODUITS & ÉQUIPEMENTS ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex bg-amber-100 text-amber-700 px-6 py-3 rounded-3xl text-sm font-semibold mb-4">
              PRODUITS & ÉQUIPEMENTS
            </div>
            <h2 className="section-title">Achetez vos équipements chez nous</h2>
            <p className="section-subtitle">
              Climatiseurs professionnels • PC & Matériel IT • Caméras de surveillance de haute qualité
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -15 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-2 bg-gradient-to-r from-amber-400 to-orange-500" />
                <div className="p-10">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${product.color} rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-400`}
                  >
                    <product.icon className="w-11 h-11 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{product.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
                  <Link
                    to="/boutique"
                    className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700 group-hover:gap-3 transition-all"
                  >
                    Voir les produits <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SERVICES COMPLETS ==================== */}
      <section className="py-24 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-6 py-3 rounded-3xl text-sm font-semibold mb-4">
              NOS SERVICES
            </div>
            <h2 className="section-title">Services Intégrés</h2>
            <p className="section-subtitle">
              Une expertise complète pour votre transformation technologique
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -12 }}
                className="group bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500"
              >
                <div className="p-10">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-3xl flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}
                  >
                    <service.icon className="w-11 h-11 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                  <Link
                    to={service.link}
                    className="inline-flex items-center font-semibold text-primary-600 hover:text-primary-700 group-hover:gap-3 transition-all"
                  >
                    Découvrir <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div
                  className={`h-1.5 bg-gradient-to-r ${service.color} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ==================== STATISTIQUES ==================== */}
      <section className="py-20 bg-gradient-to-br from-zinc-900 to-slate-900 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center bg-white/10 rounded-3xl">
                  <stat.icon className="w-10 h-10 text-cyan-400" />
                </div>
                <div className="text-6xl font-bold tracking-tighter mb-3">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/70 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== SOLUTIONS PACKAGÉES ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Solutions Packagées</h2>
            <p className="section-subtitle">Offres clé en main adaptées à votre activité</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packs.map((pack, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white border border-gray-100 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-3xl flex items-center justify-center mb-8">
                  <pack.icon className="w-9 h-9 text-white" />
                </div>
                <h3 className="text-3xl font-bold mb-3">{pack.name}</h3>
                <p className="text-4xl font-bold text-primary-600 mb-8">{pack.price}</p>
                <ul className="space-y-4 mb-10">
                  {pack.features.map((f, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-6 h-6 text-emerald-500 mt-0.5" />
                      <span className="text-gray-700">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/demander-devis"
                  className="btn-primary w-full py-4 text-center block rounded-2xl group-hover:scale-[1.02] transition-transform"
                >
                  Demander ce pack
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TÉMOIGNAGES ==================== */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Ils nous font confiance</h2>
            <p className="section-subtitle">Des entreprises qui ont choisi l’excellence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
              >
                <Quote className="w-10 h-10 text-primary-200 mb-6" />
                <p className="italic text-lg text-gray-700 mb-8 leading-relaxed">“{t.content}”</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-14 h-14 rounded-2xl object-cover" />
                  <div>
                    <p className="font-bold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.position}</p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== POURQUOI NOUS CHOISIR ==================== */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Pourquoi choisir OMDEVE ?</h2>
            <p className="section-subtitle">Engagement, expertise et résultats mesurables</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: 'Expertise locale & internationale',
                desc: 'Connaissance approfondie du contexte africain et standards mondiaux',
              },
              {
                icon: Clock,
                title: 'Support 24/7 réactif',
                desc: 'Équipe dédiée disponible en permanence pour vos besoins critiques',
              },
              {
                icon: Award,
                title: 'Qualité & Garantie',
                desc: 'Solutions durables avec SLA et maintenance proactive',
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="mx-auto w-20 h-20 bg-primary-100 rounded-3xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <item.icon className="w-11 h-11 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="py-28 bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-600 text-white relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Prêt à équiper et transformer votre entreprise ?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Climatisation • Matériel IT • Caméras • Solutions digitales complètes
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/demander-devis"
              className="btn-primary text-xl px-14 py-6 rounded-3xl"
            >
              Demander un devis
            </Link>
            <Link
              to="/audit-gratuit"
              className="border-2 border-white/90 hover:bg-white hover:text-primary-700 px-14 py-6 rounded-3xl text-xl transition-all"
            >
              Audit gratuit
            </Link>
            <Link
              to="/boutique"
              className="border-2 border-white/90 hover:bg-white hover:text-primary-700 px-14 py-6 rounded-3xl text-xl transition-all"
            >
              Voir nos produits
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;