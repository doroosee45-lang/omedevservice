import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  GraduationCap,
  Users,
  BookOpen,
  Award,
  Clock,
  CheckCircle,
  ArrowRight,
  Calendar,
  Star,
  Quote,
  Shield,
  Cloud,
  Code,
  MapPin,
  Phone,
  Mail
} from 'lucide-react'

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
  
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .shimmer {
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
    background-size: 200% 100%;
    animation: shimmer 2s infinite;
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 0.68, 0, 1] } }
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 0.68, 0, 1] } }
};

const floatVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] }
  },
  hover: {
    y: -8,
    transition: { duration: 0.3, ease: [0.22, 0.68, 0, 1] }
  }
};

const Formation = () => {
  // Cartes formation avec images
  const formationCards = [
    {
      title: "Réseaux & Infrastructure",
      desc: "Cisco, MikroTik, conception et dépannage avancé",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop",
      icon: BookOpen,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      title: "Cybersécurité",
      desc: "Protection des données, pare-feu, sensibilisation",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop",
      icon: Shield,
      gradient: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Cloud & Virtualisation",
      desc: "AWS, Azure, VMware, Docker",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
      icon: Cloud,
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Développement DevOps",
      desc: "CI/CD, Git, Python, automatisation",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop",
      icon: Code,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      title: "Soft skills IT",
      desc: "Gestion de projet agile, leadership technique",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600"
    },
    {
      title: "Préparation certifications",
      desc: "CCNA, Security+, Cloud Practitioner",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop",
      icon: Award,
      gradient: "from-amber-500 to-amber-600"
    }
  ]

  // Formations accélérées
  const acceleratedTrainings = [
    { title: "Bootcamp Réseaux (5 jours)", duration: "40h", price: "1 490€ HT", start: "14 avril 2025", spots: 8, gradient: "from-blue-500 to-blue-600" },
    { title: "Cybersécurité intensive", duration: "35h", price: "1 790€ HT", start: "5 mai 2025", spots: 6, gradient: "from-cyan-500 to-cyan-600" },
    { title: "DevOps en 4 jours", duration: "32h", price: "1 590€ HT", start: "2 juin 2025", spots: 10, gradient: "from-indigo-500 to-indigo-600" }
  ]

  // Témoignages
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Responsable Infrastructure",
      company: "Groupe Logistique France",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      quote: "La formation Réseaux a complètement monté en compétence mon équipe. Les cas pratiques sur du vrai matériel ont fait la différence.",
      rating: 5
    },
    {
      name: "Thomas Lefebvre",
      role: "Admin Sys",
      company: "Digital Solutions",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
      quote: "Formation Cybersécurité très concrète. Le formateur est un expert du terrain, je recommande vivement.",
      rating: 5
    },
    {
      name: "Amel Benali",
      role: "DevOps Engineer",
      company: "Startup Innov",
      photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
      quote: "Le bootcamp DevOps m'a permis d'être opérationnelle en moins d'une semaine. Un vrai accélérateur de carrière.",
      rating: 5
    }
  ]

  // Statistiques
  const stats = [
    { value: "1 200+", label: "Élèves formés", icon: Users, gradient: "from-blue-500 to-cyan-500" },
    { value: "98%", label: "Taux de satisfaction", icon: Star, gradient: "from-amber-500 to-orange-500" },
    { value: "45+", label: "Sessions par an", icon: Calendar, gradient: "from-emerald-500 to-teal-500" },
    { value: "15", label: "Formateurs experts", icon: Award, gradient: "from-purple-500 to-pink-500" }
  ]

  // Centres de formation
  const centers = [
    { city: "Paris", address: "123 avenue des Champs-Élysées, 75008", phone: "+33 1 23 45 67 89", email: "paris@omdeve.com", gradient: "from-blue-500 to-cyan-500" },
    { city: "Lyon", address: "45 rue de la République, 69002", phone: "+33 4 56 78 90 12", email: "lyon@omdeve.com", gradient: "from-indigo-500 to-purple-500" },
    { city: "Bordeaux", address: "78 cours de l'Intendance, 33000", phone: "+33 5 67 89 01 23", email: "bordeaux@omdeve.com", gradient: "from-cyan-500 to-blue-500" }
  ]

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section - style VenteMateriel (bleu) */}
      {/* Hero Section - Formation IT (500px) */}
<section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-24 pb-12">
  
  {/* Image d'arrière-plan avec overlay */}
  <div className="absolute inset-0 overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
      style={{
        backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
      }}
    />
    <div className="absolute inset-0 bg-black/65"></div>
  </div>

  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
  <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
  <motion.div 
    className="absolute w-80 h-80 bg-blue-600/20 top-16 -left-20 rounded-full filter blur-[80px]"
    animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
  />
  <motion.div 
    className="absolute w-64 h-64 bg-indigo-700/15 bottom-16 right-10 rounded-full filter blur-[80px]"
    animate={{ x: [0, -15, 0], y: [0, -15, 0] }}
    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
  />
  <motion.div 
    className="absolute w-36 h-36 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px]"
    animate={{ scale: [1, 1.2, 1] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
  />

  <div className="container mx-auto px-4 relative z-10">
    <div className="max-w-3xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-blue-600/15 border border-blue-500/30"
      >
        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-ring" />
        <span className="text-blue-300 font-semibold text-[10px] tracking-wide font-syne">Formation IT professionnelle</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.68, 0, 1] }}
        className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 font-syne"
      >
        Montez en compétences{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            avec nos experts
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-3"
      />

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="text-gray-300 text-sm md:text-base mb-5 max-w-2xl mx-auto"
      >
        Formations techniques et soft skills, en présentiel ou à distance, pour vos équipes IT.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/devis" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:shadow-xl">
            Demander un catalogue <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
          <Link to="/contact" className="group border-2 border-white/30 hover:border-white px-5 py-2 rounded-xl font-semibold text-white hover:bg-white/10 transition-all text-sm">
            Parler à un conseiller
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
        className="mt-8 flex justify-center"
      >
        <motion.div 
          className="animate-bounce"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex justify-center">
            <div className="w-1 h-1.5 bg-white/50 rounded-full mt-1.5 animate-pulse" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  </div>

  <div className="absolute bottom-0 left-0 right-0 text-white/10">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-8">
      <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
    </svg>
  </div>
</section>

      {/* Nos formations - Cartes avec images */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📚 Nos formations
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos formations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {formationCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 cursor-pointer group"
              >
                <div className="relative overflow-hidden">
                  <motion.img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <motion.div 
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <card.icon className="w-5 h-5 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{card.title}</h3>
                  <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">{card.desc}</p>
                  <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <Link to="/inscription" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold">
                      S'inscrire <ArrowRight size={16} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistiques élèves formés */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📊 Chiffres clés
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos élèves en chiffres</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                variants={fadeScale}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="bg-white/10 rounded-2xl p-6 text-center backdrop-blur-sm border border-white/10 transition-all duration-300 cursor-pointer group"
              >
                <motion.div 
                  className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.15, rotate: 5 }}
                >
                  <stat.icon size={22} className="text-white" />
                </motion.div>
                <div className="text-4xl font-bold text-white font-syne">{stat.value}</div>
                <div className="text-gray-400 mt-2">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formations accélérées + image */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
            >
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                ⚡ Accéléré
              </div>
              <h2 className="text-3xl font-bold font-syne mb-4">Formations accélérées</h2>
              <div className="w-20 h-1 bg-cyan-500 rounded-full mb-6" />
              <p className="text-gray-300 mb-6">
                Des bootcamps intensifs de 2 à 5 jours pour monter en compétences rapidement. 
                Travaux pratiques sur cas réels, formateurs experts et petit groupe.
              </p>
              <div className="space-y-4">
                {acceleratedTrainings.map((training, i) => (
                  <motion.div 
                    key={i} 
                    className="bg-white/10 rounded-xl p-4 flex flex-wrap justify-between items-center gap-3 group cursor-pointer"
                    whileHover={{ scale: 1.02, x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div>
                      <h4 className="font-bold text-white group-hover:text-blue-300 transition-colors">{training.title}</h4>
                      <div className="flex gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Clock size={14}/> {training.duration}</span>
                        <span className="flex items-center gap-1"><Calendar size={14}/> {training.start}</span>
                        <span>{training.spots} places</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-blue-300 font-bold">{training.price}</span>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link to="/inscription" className="text-blue-400 hover:text-blue-300">
                          <ArrowRight size={18} />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <Link to="/formations-accelerees" className="inline-flex items-center gap-2 mt-8 text-blue-400 hover:text-blue-300 font-semibold">
                  Voir toutes nos sessions <ArrowRight size={16} />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1] }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <motion.img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" 
                alt="Session de formation en présentiel"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              🗣️ Témoignages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Ils ont suivi nos formations</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-blue-500/50"
              >
                <Quote className="w-10 h-10 text-blue-400/50 mb-4" />
                <motion.p 
                  className="text-gray-300 italic mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  "{t.quote}"
                </motion.p>
                <div className="flex items-center gap-4">
                  <motion.img 
                    src={t.photo} 
                    alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-400"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-sm text-gray-400">{t.role}, {t.company}</div>
                    <div className="flex gap-1 mt-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA double : inscription centre + catalogue */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl p-8 text-center border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <GraduationCap className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Inscription en centre</h3>
              <p className="text-gray-300 mb-6">Rejoignez nos sessions en présentiel à Paris, Lyon ou Bordeaux.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/inscription" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition">
                  Je m'inscris <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl p-8 text-center border border-white/10 hover:border-purple-500/50 transition-all duration-300"
            >
              <motion.div 
                className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <BookOpen className="w-6 h-6 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Catalogue complet</h3>
              <p className="text-gray-300 mb-6">Recevez toutes nos formations par email.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition">
                  Télécharger <ArrowRight size={18} />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Localisation des centres */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
              📍 Nous trouver
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-syne mb-4">Nos centres de formation</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto" />
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {centers.map((center, idx) => (
              <motion.div
                key={idx}
                variants={floatVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                custom={idx}
                className="bg-white/10 rounded-2xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <motion.div 
                  className={`w-12 h-12 mb-3 rounded-xl bg-gradient-to-br ${center.gradient} flex items-center justify-center shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-white">{center.city}</h3>
                <p className="text-gray-400 text-sm mt-2">{center.address}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-300 group cursor-pointer">
                    <Phone size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" /> 
                    <span className="group-hover:text-white transition-colors">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300 group cursor-pointer">
                    <Mail size={14} className="text-blue-400 group-hover:text-blue-300 transition-colors" /> 
                    <span className="group-hover:text-white transition-colors">{center.email}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Carte Google Maps */}
          <motion.div 
            className="mt-12 rounded-2xl overflow-hidden border border-white/10 shadow-xl group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <iframe
              title="Carte des centres OMDEVE"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.991440608414!2d2.292292615509614!3d48.85837360869918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1647863945678!5m2!1sfr!2sfr"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              className="grayscale group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Call to Action final */}
      <section className="py-20 bg-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.2) 0%, transparent 60%)`
        }} />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              🚀 Besoin d'un service personnalisé ?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Prêt à faire évoluer vos compétences ?</h2>
            <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
              Recevez notre catalogue complet et un devis personnalisé sous 24h.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/devis" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
                  Devis gratuit <ArrowRight size={18} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link to="/contact" className="inline-flex items-center gap-2 border border-white/30 hover:bg-white/10 px-6 py-3 rounded-xl font-semibold transition">
                  Contacter un expert
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default Formation