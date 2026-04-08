import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Users, Award, Target, Globe, Zap, Shield, Lightbulb, TrendingUp,
  ArrowRight, Headphones, CheckCircle, Rocket, Heart, Briefcase,
  Calendar, MapPin, Star, Phone, Mail, Handshake
} from 'lucide-react';

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
  
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const About = () => {
  // Valeurs
  const valeurs = [
    { icon: Target, title: 'Excellence', text: 'Nous visons l\'excellence dans chaque projet, avec des standards internationaux.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Shield, title: 'Sécurité', text: 'La protection de vos données et infrastructures est notre priorité absolue.', gradient: 'from-emerald-500 to-emerald-600' },
    { icon: Lightbulb, title: 'Innovation', text: 'Nous anticipons les besoins futurs pour vous offrir des solutions modernes et évolutives.', gradient: 'from-amber-500 to-amber-600' },
    { icon: Users, title: 'Proximité', text: 'Un accompagnement humain et personnalisé, proche de vos réalités terrain.', gradient: 'from-purple-500 to-purple-600' }
  ];

  // Domaines d'expertise
  const expertises = [
    { icon: Globe, title: "Réseau & Infrastructure", desc: "Câblage, WiFi pro, VLAN, parcs informatiques", gradient: "from-blue-500 to-blue-600" },
    { icon: Shield, title: "Cybersécurité", desc: "Audit, vidéosurveillance, firewalls, formations", gradient: "from-cyan-500 to-cyan-600" },
    { icon: Zap, title: "Développement Digital", desc: "Sites web, e-commerce, apps mobiles, ERP", gradient: "from-amber-500 to-amber-600" },
    { icon: TrendingUp, title: "Cloud & Hébergement", desc: "Solutions haute disponibilité et migration", gradient: "from-indigo-500 to-indigo-600" },
    { icon: Lightbulb, title: "Énergie Solaire", desc: "Panneaux photovoltaïques et optimisation énergétique", gradient: "from-orange-500 to-orange-600" },
    { icon: Award, title: "Formation & Coaching", desc: "Formations certifiantes et e-learning", gradient: "from-green-500 to-green-600" },
  ];

  // Chiffres clés
  const stats = [
    { value: '8+', label: 'Années d’expertise', icon: Calendar },
    { value: '150+', label: 'Projets réalisés', icon: Briefcase },
    { value: '95%', label: 'Clients satisfaits', icon: Star },
    { value: '24/7', label: 'Support technique', icon: Headphones },
  ];

  // Engagements
  const engagements = [
    { icon: Award, title: 'Qualité Certifiée', desc: 'Solutions conformes aux meilleures pratiques internationales.', gradient: 'from-green-500 to-green-600' },
    { icon: Target, title: 'Résultats Mesurables', desc: 'Nous nous engageons sur des objectifs concrets et vérifiables.', gradient: 'from-blue-500 to-blue-600' },
    { icon: Users, title: 'Accompagnement Continu', desc: 'Support technique et formation tout au long de votre projet.', gradient: 'from-amber-500 to-amber-600' },
  ];

  // Équipe - version simplifiée
  const team = [
    {
      name: 'Jean Mukendi',
      role: 'CEO & Fondateur',
      position: 'Expert en infrastructure IT',
      bio: 'Expert en infrastructure IT et cybersécurité avec plus de 15 ans d’expérience en Afrique centrale.',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      gradient: 'from-blue-500 to-blue-600',
    },
    {
      name: 'Amina Kabongo',
      role: 'Directrice Technique',
      position: 'Ingénieur télécoms',
      bio: 'Ingénieur en télécommunications, spécialiste des réseaux haut débit et des solutions cloud.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
      gradient: 'from-cyan-500 to-cyan-600',
    },
    {
      name: 'Paul Kasongo',
      role: 'Responsable Énergie',
      position: 'Ingénieur énergies renouvelables',
      bio: 'Ingénieur en énergies renouvelables, il pilote nos projets solaires et d’efficacité énergétique.',
      image: 'https://randomuser.me/api/portraits/men/45.jpg',
      gradient: 'from-amber-500 to-amber-600',
    },
    {
      name: 'Claire Mbenza',
      role: 'Lead Développement',
      position: 'Développeuse full-stack',
      bio: 'Développeuse full-stack, elle conçoit des applications web et mobiles sur mesure.',
      image: 'https://randomuser.me/api/portraits/women/50.jpg',
      gradient: 'from-purple-500 to-purple-600',
    }
  ];

  return (
    <>
      <style>{globalStyles}</style>

      {/* ==================== HERO SECTION ==================== */}
      {/* ==================== HERO SECTION ==================== */}
<section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
      style={{
        backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  <div className="absolute w-80 h-80 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
  <div className="absolute w-64 h-64 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
  <div className="absolute w-40 h-40 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
      >
        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Qui sommes-nous ?</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        À propos{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            d’OMDEVE
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-5"
      />

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto"
      >
        Leader en solutions IT, énergétiques et digitales en République Démocratique du Congo.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Voir nos réalisations <CheckCircle size={18} />
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <div className="animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>







      {/* ==================== HISTOIRE & MISSION ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                  <Calendar size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">Notre histoire</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  Fondée en 2018 à Kinshasa, <strong className="text-blue-400">OMDEVE Services</strong> est née de la volonté de répondre aux défis numériques et énergétiques de la RDC. 
                  Partant d'une petite équipe de 3 passionnés d'informatique, nous avons rapidement grandi pour devenir un acteur incontournable du secteur.
                </p>
                <p>
                  En 2020, nous avons élargi nos compétences aux énergies renouvelables, puis au développement digital en 2022. 
                  Aujourd'hui, nous accompagnons plus de 150 entreprises congolaises dans leur transformation technologique.
                </p>
                <p>
                  Notre mot d'ordre : <strong className="text-blue-400">innovation locale, standards internationaux</strong>.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center">
                  <Target size={24} className="text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">Notre mission</h2>
              </div>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-amber-400">Accélérer la digitalisation et la transition énergétique des entreprises congolaises</strong> en leur fournissant des solutions fiables, sécurisées et adaptées à leur environnement.
                </p>
                <p>
                  Nous croyons que la technologie doit être accessible à tous. C'est pourquoi nous proposons des services sur mesure, avec un accompagnement de proximité et une veille technologique constante.
                </p>
                <p>
                  Notre engagement : <strong className="text-amber-400">zéro panne non anticipée, zéro vulnérabilité négligée, zéro projet sans formation</strong>.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ==================== CHIFFRES CLÉS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <TrendingUp size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Quelques chiffres</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">OMDEVE en quelques données</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Icon size={20} className="text-blue-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-syne">{stat.value}</div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* ==================== NOS VALEURS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Heart size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Nos piliers</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Nos valeurs</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valeurs.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-r ${v.gradient} flex items-center justify-center`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-gray-300 text-sm">{v.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOTRE EXPERTISE ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Zap size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre savoir-faire</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Notre expertise</h2>
            <p className="text-gray-400 mt-3">7 domaines de compétences au service de votre croissance</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertises.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${exp.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-gray-400 text-sm">{exp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOS ENGAGEMENTS ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Award size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Nos promesses</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Notre engagement</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engagements.map((eng, i) => {
              const Icon = eng.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:-translate-y-2 hover:border-blue-500/50"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${eng.gradient} flex items-center justify-center mb-4`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{eng.title}</h3>
                  <p className="text-gray-400 text-sm">{eng.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ==================== NOTRE ÉQUIPE ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-4">
              <Users size={16} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-semibold">Notre équipe</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">Des experts passionnés</h2>
            <p className="text-gray-400 mt-3">Une équipe multidisciplinaire dédiée à votre réussite</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50"
              >
                <div className="relative overflow-hidden h-72">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${member.gradient} text-white shadow-lg`}>
                      {member.role}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white font-syne mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-xs font-semibold mb-3">{member.position}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==================== CONTACT INFO CARD ==================== */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-6">Contactez-nous</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Phone size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Téléphone</p>
                      <p className="text-white font-semibold">+243 816 590 788</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <Mail size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <p className="text-white font-semibold">omedevservices@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MapPin size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Adresse</p>
                      <p className="text-white font-semibold">Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-bold mb-4 font-syne">+243 816 590 788</div>
                <div className="text-xl mb-6">Kinshasa, RDC</div>
                <p className="text-blue-100">Disponible du lundi au vendredi, 8h - 18h</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== CTA FINALE (DOUBLE) ==================== */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Target size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Audit gratuit</h3>
              <p className="text-gray-300 mb-6">
                Bénéficiez d'un diagnostic complet de vos infrastructures sans engagement.
              </p>
              <Link to="/audit-gratuit" className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Demander un audit <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 hover:border-amber-500/50 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                <Handshake size={28} className="text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Devis personnalisé</h3>
              <p className="text-gray-300 mb-6">
                Recevez une proposition sur mesure adaptée à vos besoins et votre budget.
              </p>
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                Demander un devis <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;