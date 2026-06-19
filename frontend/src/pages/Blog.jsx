


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Clock, User, Search, X,
  TrendingUp, ChevronRight, ChevronLeft, Share2, Copy, Check
} from 'lucide-react';
import api from '../services/api';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }

  @keyframes float      { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-20px)} }
  @keyframes pulse-ring { 0%{transform:scale(.8);opacity:1} 70%{transform:scale(1.3);opacity:0} 100%{transform:scale(.8);opacity:0} }
  @keyframes slow-zoom  { 0%,100%{transform:scale(1.1)}     50%{transform:scale(1.15)} }

  .animate-float      { animation: float      6s  ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s  ease-out   infinite; }
  .animate-slow-zoom  { animation: slow-zoom  20s ease-in-out infinite; }
`;

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── Icônes SVG ─────────────────────────────────────────────── */
const WhatsAppIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const LinkedInIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── Composant ShareButtons ─────────────────────────────────── */
const ShareButtons = ({ article }) => {
  const [open,   setOpen]   = useState(false);
  const [copied, setCopied] = useState(false);

  const articleUrl = `${window.location.origin}/blog/${article.slug}`;
  const text       = encodeURIComponent(`${article.title} — OMDEVE Blog`);
  const encodedUrl = encodeURIComponent(articleUrl);

  const stop = (e) => { e.preventDefault(); e.stopPropagation(); };

  const shareWhatsApp = (e) => {
    stop(e);
    window.open(`https://wa.me/?text=${text}%20${encodedUrl}`, '_blank', 'noopener');
  };

  const shareLinkedIn = (e) => {
    stop(e);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      '_blank', 'noopener,width=600,height=500'
    );
  };

  const copyLink = async (e) => {
    stop(e);
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* silencieux */ }
  };

  const toggleMenu = (e) => { stop(e); setOpen((v) => !v); };

  return (
    <div className="relative" onClick={(e) => e.preventDefault()}>
      {/* Bouton principal */}
      <button
        onClick={toggleMenu}
        title="Partager cet article"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 ${
          open
            ? 'bg-blue-500/20 border-blue-500/40 text-blue-300'
            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20'
        }`}
      >
        <Share2 size={13} />
        Partager
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay pour fermer */}
            <div
              className="fixed inset-0 z-40"
              onClick={(e) => { stop(e); setOpen(false); }}
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1,    y: 0 }}
              exit={  { opacity: 0, scale: 0.92, y: 6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute bottom-full left-0 mb-2 z-50 min-w-[168px] bg-slate-900/95 backdrop-blur-sm border border-white/10 rounded-xl p-1.5 shadow-2xl shadow-black/50"
            >
              {/* WhatsApp */}
              <button
                onClick={shareWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-emerald-500/10 hover:text-emerald-400 transition-all duration-150 group"
              >
                <span className="text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
                  <WhatsAppIcon size={15} />
                </span>
                WhatsApp
              </button>

              {/* Séparateur */}
              <div className="h-px bg-white/5 mx-2 my-1" />

              {/* LinkedIn */}
              <button
                onClick={shareLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-150 group"
              >
                <span className="text-blue-500 group-hover:scale-110 transition-transform shrink-0">
                  <LinkedInIcon size={15} />
                </span>
                LinkedIn
              </button>

              {/* Séparateur */}
              <div className="h-px bg-white/5 mx-2 my-1" />

              {/* Copier le lien */}
              <button
                onClick={copyLink}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  copied
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className={`group-hover:scale-110 transition-transform shrink-0 ${copied ? 'text-emerald-400' : 'text-gray-500'}`}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </span>
                {copied ? 'Lien copié !' : 'Copier le lien'}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Blog principal ─────────────────────────────────────────── */
const Blog = () => {
  const [searchTerm,       setSearchTerm]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [currentPage,      setCurrentPage]      = useState(1);
  const [articles,         setArticles]         = useState([]);
  const [totalArticles,    setTotalArticles]    = useState(0);
  const [loading,          setLoading]          = useState(true);
  const [error,            setError]            = useState('');
  const articlesPerPage = 6;

  const categories = ['Tous', 'Cybersécurité', 'Énergie', 'Digital', 'Formation', 'Réseau', 'Cloud'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = { page: currentPage, limit: articlesPerPage };
        if (selectedCategory !== 'Tous') params.category = selectedCategory;
        if (searchTerm)                  params.search   = searchTerm;

        const response = await api.get('/blog', { params });
        const data = response.data;

        if (Array.isArray(data)) {
          setArticles(data);
          setTotalArticles(data.length);
        } else {
          setArticles(data.articles || []);
          setTotalArticles(data.total ?? data.articles?.length ?? 0);
        }
        setError('');
      } catch (err) {
        console.error('Erreur chargement articles:', err);
        setError('Impossible de charger les articles. Veuillez réessayer plus tard.');
        setArticles([]);
        setTotalArticles(0);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [currentPage, selectedCategory, searchTerm]);

  useEffect(() => { setCurrentPage(1); }, [selectedCategory, searchTerm]);

  const totalPages = Math.ceil(totalArticles / articlesPerPage);
  const goToPage   = (page) => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  return (
    <>
      <style>{globalStyles}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20 min-h-[550px]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Blog & Actualités</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              Blog{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  OMDEVE
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-base sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire et les meilleures pratiques IT en Afrique Centrale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
                Demander un conseil <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/tarifs" className="group border-2 border-white/30 hover:border-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
                Voir nos tarifs
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Filtres ──────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
            <div className="relative w-full lg:w-96">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text" placeholder="Rechercher un article..." value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-9 py-2 rounded-full text-sm bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(''); setCurrentPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((cat) => (
                <button key={cat} onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:scale-105'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Grille ───────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">
              {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
            </h2>
            <p className="text-gray-400 text-sm">{totalArticles} article{totalArticles > 1 ? 's' : ''}</p>
          </div>

          {/* Chargement */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Erreur */}
          {!loading && error && (
            <div className="text-center py-20">
              <p className="text-red-400 mb-4">{error}</p>
              <button onClick={() => setCurrentPage(1)} className="text-blue-400 hover:text-blue-300 underline">Réessayer</button>
            </div>
          )}

          {/* Vide */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun article trouvé</h3>
              <p className="text-gray-400">Aucun article ne correspond à vos critères.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
                className="mt-6 text-blue-400 hover:text-blue-300 underline">
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Articles */}
          {!loading && !error && articles.length > 0 && (
            <>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <motion.div key={article._id ?? article.id} variants={fadeUp}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 flex flex-col">

                    {/* Image */}
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden h-56">
                        <img src={article.image} alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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
                    </Link>

                    {/* Contenu */}
                    <div className="p-6 flex flex-col flex-1">
                      <Link to={`/blog/${article.slug}`} className="block flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} />
                            {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white font-syne mb-3 group-hover:text-blue-300 transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                        <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                          Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>

                      {/* ── Barre de partage ── */}
                      <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-gray-500 select-none">Partager cet article</span>
                        <ShareButtons article={article} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12 gap-2 flex-wrap">
                  <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition">
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 hover:bg-white/20'
                      }`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/10 border border-white/20 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/20 transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ── Newsletter + CTA ─────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Newsletter */}
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50">
              <div className="relative z-10 text-center md:text-left">
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6">
                  <TrendingUp size={16} className="text-blue-400" />
                  <span className="text-blue-300 text-sm font-semibold">Ne rien manquer</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white font-syne mb-4">Restez informé</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto md:mx-0">
                  Recevez nos meilleurs articles et conseils technologiques directement dans votre boîte mail.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto md:mx-0">
                  <input type="email" placeholder="Votre adresse email"
                    className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all" />
                  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-lg">
                    S'abonner
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-4">Nous respectons votre vie privée. Désabonnement en 1 clic.</p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:.6, delay:.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50 text-center md:text-right">
              <div className="absolute inset-0 opacity-30 rounded-2xl -z-10" style={{
                backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
              }} />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Vous avez un projet ?</h2>
                <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto md:ml-auto md:mr-0">
                  Discutons de vos besoins et trouvons ensemble la solution la plus adaptée.
                </p>
                <Link to="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl">
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