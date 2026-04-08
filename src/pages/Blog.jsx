import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Clock, User, Search, X,
  BookOpen, TrendingUp, ChevronRight, ChevronLeft
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
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;

  // Données des articles (avec slug)
  const articles = [
    {
      id: 1,
      slug: "securiser-reseau-entreprise-2026",
      title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
      excerpt: "Découvrez les meilleures pratiques et outils pour protéger votre infrastructure réseau contre les cybermenaces actuelles.",
      category: "Cybersécurité",
      date: "2026-03-28",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
      author: "Jean Meya",
      tags: ["sécurité", "réseau", "firewall"]
    },
    {
      id: 2,
      slug: "panneaux-solaires-rdc-rentabilite",
      title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
      excerpt: "Analyse détaillée des coûts, avantages et retour sur investissement des systèmes photovoltaïques en milieu congolais.",
      category: "Énergie",
      date: "2026-03-25",
      readTime: "12 min",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
      author: "Dr. Amina Kabongo",
      tags: ["solaire", "énergie", "RDC"]
    },
    {
      id: 3,
      slug: "erp-sur-mesure-avantages-2026",
      title: "Pourquoi passer à un ERP sur mesure en 2026 ? Avantages et cas d'usage",
      excerpt: "Comment un ERP personnalisé peut transformer la gestion de votre entreprise au Congo.",
      category: "Digital",
      date: "2026-03-20",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      author: "Meya Dorodoro",
      tags: ["ERP", "gestion", "digitalisation"]
    },
    {
      id: 4,
      slug: "formation-cybersecurite-indispensable",
      title: "Formation cybersécurité : Pourquoi c'est devenu indispensable pour vos équipes",
      excerpt: "Les formations en cybersécurité réduisent de 70% les risques d'attaques humaines.",
      category: "Formation",
      date: "2026-03-15",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
      author: "Sarah Nsimba",
      tags: ["formation", "cybersécurité"]
    },
    {
      id: 5,
      slug: "wifi-professionnel-erreurs-eviter",
      title: "Déploiement WiFi professionnel : Erreurs à éviter en entreprise",
      excerpt: "Guide pratique pour une couverture WiFi optimale et sécurisée dans vos locaux.",
      category: "Réseau",
      date: "2026-03-10",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
      author: "Paul Kabila",
      tags: ["wifi", "réseau"]
    },
    {
      id: 6,
      slug: "cloud-hybride-avantages-entreprises",
      title: "Cloud hybride : l'avenir des entreprises africaines",
      excerpt: "Découvrez comment le cloud hybride combine flexibilité et sécurité pour les entreprises en Afrique.",
      category: "Cloud",
      date: "2026-03-05",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      author: "Claire Mbenza",
      tags: ["cloud", "hybride", "stockage"]
    }
  ];

  const categories = ['Tous', 'Cybersécurité', 'Énergie', 'Digital', 'Formation', 'Réseau', 'Cloud'];

  // Filtrage
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style>{globalStyles}</style>




      {/* Hero Section - Blog */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
  <div className="absolute inset-0 opacity-20" style={{
    backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
    backgroundSize: '60px 60px'
  }} />
  
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
        <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Blog & Actualités</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
      >
        Blog{' '}
        <span className="relative inline-block">
          <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
            OMDEVE
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
        Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire
        et les meilleures pratiques IT en Afrique Centrale.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-wrap gap-4 justify-center"
      >
        <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
          Demander un conseil <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/tarifs" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
          Voir nos tarifs <ChevronRight size={18} />
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






      {/* Filtres et recherche */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:scale-105'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Grille des articles */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">
              {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
            </h2>
            <p className="text-gray-400 text-sm">{filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}</p>
          </div>

          {paginatedArticles.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400">Aucun article ne correspond à vos critères de recherche.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
                className="mt-6 text-blue-400 hover:text-blue-300 underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {paginatedArticles.map((article) => (
                  <motion.div
                    key={article.id}
                    variants={fadeUp}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
                  >
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden h-56">
                        <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
                            {article.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
                            <Clock size={12} /> {article.readTime}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={12} />
                            <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User size={12} />
                            <span>{article.author}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white font-syne mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                          Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

           {/* Section double : Newsletter + CTA côte à côte */}
           {/* Section double : Newsletter + CTA sous forme de cartes */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Carte Newsletter - à gauche */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 group-hover:bg-white/15 transition-all">
                  <TrendingUp size={16} className="text-blue-400" />
                  <span className="text-blue-300 text-sm font-semibold">Ne rien manquer</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Restez informé</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                  Recevez nos meilleurs articles et conseils technologiques directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all group-hover:bg-white/15"
                  />
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    S'abonner
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">Nous respectons votre vie privée. Désabonnement en 1 clic.</p>
              </div>
            </motion.div>

            {/* Carte CTA - à droite */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center md:text-right"
            >
              {/* Effet de lueur au survol */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              
              {/* Effet radial décoratif (plus discret) */}
              <div className="absolute inset-0 opacity-30 rounded-2xl -z-10" style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
              }} />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
                  Vous avez un projet ?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto md:ml-auto md:mr-0">
                  Discutons de vos besoins et trouvons ensemble la solution la plus adaptée.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl group-hover:shadow-blue-500/30"
                >
                  Prendre rendez-vous <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;


















































// // src/pages/Blog.jsx
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import {
//   ArrowRight, Calendar, Clock, User, Search, X,
//   BookOpen, TrendingUp, ChevronRight, ChevronLeft
// } from 'lucide-react';

// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

//   * { margin: 0; padding: 0; box-sizing: border-box; }
  
//   body {
//     font-family: 'DM Sans', sans-serif;
//     background: #0f172a;
//     color: #e2e8f0;
//     overflow-x: hidden;
//   }

//   @keyframes float {
//     0%, 100% { transform: translateY(0px); }
//     50% { transform: translateY(-20px); }
//   }
  
//   @keyframes pulse-ring {
//     0% { transform: scale(0.8); opacity: 1; }
//     70% { transform: scale(1.3); opacity: 0; }
//     100% { transform: scale(0.8); opacity: 0; }
//   }
  
//   .animate-float { animation: float 6s ease-in-out infinite; }
//   .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
// `;

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
// };
// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
// };

// // Données des articles (simulées, à remplacer par une vraie API)
// const articlesData = [
//   {
//     id: 1,
//     slug: "securiser-reseau-entreprise-2026",
//     title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
//     excerpt: "Découvrez les meilleures pratiques et outils pour protéger votre infrastructure réseau contre les cybermenaces actuelles.",
//     category: "Réseau",
//     date: "2026-03-28",
//     readTime: "8 min",
//     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=500&fit=crop",
//     author: "Jean Meya",
//   },
//   {
//     id: 2,
//     slug: "panneaux-solaires-rdc-rentabilite",
//     title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
//     excerpt: "Analyse détaillée des coûts, avantages et retour sur investissement des systèmes photovoltaïques en milieu congolais.",
//     category: "Énergie",
//     date: "2026-03-25",
//     readTime: "12 min",
//     image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=500&fit=crop",
//     author: "Dr. Amina Kabongo",
//   },
//   {
//     id: 3,
//     slug: "erp-sur-mesure-avantages-2026",
//     title: "Pourquoi passer à un ERP sur mesure en 2026 ? Avantages et cas d'usage",
//     excerpt: "Comment un ERP personnalisé peut transformer la gestion de votre entreprise au Congo.",
//     category: "Digital",
//     date: "2026-03-20",
//     readTime: "6 min",
//     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
//     author: "Meya Dorodoro",
//   },
//   {
//     id: 4,
//     slug: "formation-cybersecurite-indispensable",
//     title: "Formation cybersécurité : Pourquoi c'est devenu indispensable pour vos équipes",
//     excerpt: "Les formations en cybersécurité réduisent de 70% les risques d'attaques humaines.",
//     category: "Formation",
//     date: "2026-03-15",
//     readTime: "5 min",
//     image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=500&fit=crop",
//     author: "Sarah Nsimba",
//   },
//   {
//     id: 5,
//     slug: "wifi-professionnel-erreurs-eviter",
//     title: "Déploiement WiFi professionnel : Erreurs à éviter en entreprise",
//     excerpt: "Guide pratique pour une couverture WiFi optimale et sécurisée dans vos locaux.",
//     category: "Réseau",
//     date: "2026-03-10",
//     readTime: "7 min",
//     image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
//     author: "Paul Kabila",
//   },
//   {
//     id: 6,
//     slug: "cloud-hybride-avantages-entreprises",
//     title: "Cloud hybride : l'avenir des entreprises africaines",
//     excerpt: "Découvrez comment le cloud hybride combine flexibilité et sécurité pour les entreprises en Afrique.",
//     category: "Cloud",
//     date: "2026-03-05",
//     readTime: "9 min",
//     image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
//     author: "Claire Mbenza",
//   },
//   {
//     id: 7,
//     slug: "ia-entreprise-rdc-2026",
//     title: "Intelligence artificielle : comment les entreprises congolaises peuvent en profiter",
//     excerpt: "Cas d'usage concrets de l'IA pour optimiser la production, la logistique et le service client.",
//     category: "Digital",
//     date: "2026-02-28",
//     readTime: "10 min",
//     image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
//     author: "Dr. Alain Tshibangu",
//   },
//   {
//     id: 8,
//     slug: "cablage-structure-guide-complet",
//     title: "Câblage structuré : le guide complet pour une infrastructure réseau pérenne",
//     excerpt: "Normes, catégories de câbles, bonnes pratiques : tout ce qu'il faut savoir pour votre bâtiment.",
//     category: "Réseau",
//     date: "2026-02-20",
//     readTime: "11 min",
//     image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&h=500&fit=crop",
//     author: "Jean Meya",
//   },
// ];

// // Catégories demandées : IT, réseau, énergie, digital (et on ajoute les autres existantes)
// const categories = ['Tous', 'Réseau', 'Énergie', 'Digital', 'Cloud', 'Formation'];

// const Blog = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('Tous');
//   const [currentPage, setCurrentPage] = useState(1);
//   const articlesPerPage = 6;

//   // Filtrage
//   const filteredArticles = articlesData.filter(article => {
//     const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = selectedCategory === 'Tous' || article.category === selectedCategory;
//     return matchesSearch && matchesCategory;
//   });

//   // Pagination
//   const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
//   const startIndex = (currentPage - 1) * articlesPerPage;
//   const paginatedArticles = filteredArticles.slice(startIndex, startIndex + articlesPerPage);

//   const goToPage = (page) => {
//     setCurrentPage(Math.max(1, Math.min(page, totalPages)));
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <>
//       <style>{globalStyles}</style>

//       {/* Hero Section (identique aux services) */}
//       <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20">
//         <div className="absolute inset-0 opacity-20" style={{
//           backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
//           backgroundSize: '60px 60px'
//         }} />
//         <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
//         <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
//         <div className="absolute w-48 h-48 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

//         <div className="container mx-auto px-4 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
//             >
//               <BookOpen size={16} className="text-blue-300" />
//               <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Blog & Actualités</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight mb-6 font-syne"
//             >
//               Blog{' '}
//               <span className="relative inline-block">
//                 <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
//                 <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
//                   OMDEVE
//                 </span>
//               </span>
//             </motion.h1>

//             <motion.div
//               initial={{ opacity: 0, scaleX: 0 }}
//               animate={{ opacity: 1, scaleX: 1 }}
//               transition={{ duration: 0.7, delay: 0.2 }}
//               className="w-24 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-6"
//             />

//             <motion.p
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="text-gray-300 text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
//             >
//               Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire
//               et les meilleures pratiques IT en Afrique Centrale.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.4 }}
//               className="flex flex-wrap gap-4 justify-center"
//             >
//               <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
//                 Demander un conseil <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </Link>
//               <Link to="/tarifs" className="group border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
//                 Voir nos tarifs <ChevronRight size={18} />
//               </Link>
//             </motion.div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 text-white/10">
//           <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
//             <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
//           </svg>
//         </div>
//       </section>

//       {/* Filtres et recherche (sticky) */}
//       <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl bg-opacity-80">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
//             <div className="relative w-full lg:w-96">
//               <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Rechercher un article..."
//                 value={searchTerm}
//                 onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//                 className="w-full pl-9 pr-3 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
//               />
//               {searchTerm && (
//                 <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white">
//                   <X size={14} />
//                 </button>
//               )}
//             </div>
//             <div className="flex flex-wrap gap-2 justify-center">
//               {categories.map((cat) => (
//                 <button
//                   key={cat}
//                   onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
//                     selectedCategory === cat
//                       ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
//                       : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:scale-105'
//                   }`}
//                 >
//                   {cat}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Grille des articles */}
//       <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
//         <div className="container mx-auto px-4 py-16">
//           <div className="flex justify-between items-center mb-10">
//             <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">
//               {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
//             </h2>
//             <p className="text-gray-400 text-sm">{filteredArticles.length} article{filteredArticles.length > 1 ? 's' : ''}</p>
//           </div>

//           {paginatedArticles.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
//                 <Search size={40} className="text-gray-400" />
//               </div>
//               <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
//               <p className="text-gray-400">Aucun article ne correspond à vos critères de recherche.</p>
//               <button
//                 onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
//                 className="mt-6 text-blue-400 hover:text-blue-300 underline"
//               >
//                 Réinitialiser les filtres
//               </button>
//             </div>
//           ) : (
//             <>
//               <motion.div
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 variants={staggerContainer}
//                 className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//               >
//                 {paginatedArticles.map((article) => (
//                   <motion.div
//                     key={article.id}
//                     variants={fadeUp}
//                     className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
//                   >
//                     <Link to={`/blog/${article.slug}`} className="block">
//                       <div className="relative overflow-hidden h-56">
//                         <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
//                         <div className="absolute top-4 left-4">
//                           <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
//                             {article.category}
//                           </span>
//                         </div>
//                         <div className="absolute top-4 right-4">
//                           <span className="px-2 py-1 rounded-full bg-black/50 text-white text-xs flex items-center gap-1 backdrop-blur-sm">
//                             <Clock size={12} /> {article.readTime}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="p-6">
//                         <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
//                           <div className="flex items-center gap-1">
//                             <Calendar size={12} />
//                             <span>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <User size={12} />
//                             <span>{article.author}</span>
//                           </div>
//                         </div>
//                         <h3 className="text-xl font-bold text-white font-syne mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
//                           {article.title}
//                         </h3>
//                         <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
//                           {article.excerpt}
//                         </p>
//                         <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
//                           Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
//                         </div>
//                       </div>
//                     </Link>
//                   </motion.div>
//                 ))}
//               </motion.div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-12 gap-2">
//                   <button
//                     onClick={() => goToPage(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
//                   >
//                     <ChevronLeft size={20} />
//                   </button>
//                   {[...Array(totalPages)].map((_, i) => (
//                     <button
//                       key={i}
//                       onClick={() => goToPage(i + 1)}
//                       className={`px-4 py-2 rounded-lg font-medium transition ${
//                         currentPage === i + 1
//                           ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
//                           : 'bg-white/10 border border-white/20 hover:bg-white/20'
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                   <button
//                     onClick={() => goToPage(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition"
//                   >
//                     <ChevronRight size={20} />
//                   </button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Newsletter (optionnelle) */}
//       <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
//         <div className="container mx-auto px-4 max-w-4xl text-center">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
//               <TrendingUp size={16} className="text-blue-400" />
//               <span className="text-blue-300 text-sm font-semibold">Ne rien manquer</span>
//             </div>
//             <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Restez informé</h2>
//             <p className="text-gray-300 mb-8 max-w-md mx-auto">
//               Recevez nos meilleurs articles et conseils technologiques directement dans votre boîte mail.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
//               <input
//                 type="email"
//                 placeholder="Votre adresse email"
//                 className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
//               />
//               <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105">
//                 S'abonner
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 mt-4">Nous respectons votre vie privée. Désabonnement en 1 clic.</p>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Blog;