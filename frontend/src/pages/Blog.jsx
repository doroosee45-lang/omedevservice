import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Clock, User, Search, X,
  TrendingUp, ChevronRight, ChevronLeft, Share2, Copy, Check
} from 'lucide-react';
import api from '../services/api';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';

const globalStyles = `

  /* ── OMDEVE ABOUT DESIGN SYSTEM ── */
  :root {
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
  }

  .omedev-blog {
    background: #F6F6F7;
    color: #0B1213;
    min-height: 100vh;
  }

  .omedev-blog .section-badge {
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

  .omedev-blog .about-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
  }

  .omedev-blog .about-card:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  .omedev-blog .about-gradient {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
  }

  .omedev-blog .about-divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
  }

  .omedev-blog .blog-light-section {
    background: #F6F6F7;
  }

  .omedev-blog .blog-white-section {
    background: #fff;
  }

  .omedev-blog .blog-dark-section {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
  }

  .omedev-blog .blog-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }

  .omedev-blog .hero-grid {
    background-image:
      linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  .omedev-blog .blog-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -.03em;
  }

  .omedev-blog .blog-content {
    color: #25364A;
  }

  .omedev-blog .blog-input {
    background: #fff;
    color: #0B1213;
    border: 1px solid rgba(5,56,118,.14);
    border-radius: 12px;
    transition: all .25s ease;
  }

  .omedev-blog .blog-input::placeholder {
    color: #718096;
  }

  .omedev-blog .blog-input:focus {
    outline: none;
    border-color: #2AACB2;
    box-shadow: 0 0 0 4px rgba(42,172,178,.10);
  }

  .omedev-blog .category-pill {
    border-radius: 999px;
    transition: all .3s ease;
  }

  .omedev-blog .article-card {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: transform .4s cubic-bezier(.4,0,.2,1),
                box-shadow .4s ease,
                border-color .4s ease;
  }

  .omedev-blog .article-card:hover {
    transform: translateY(-9px);
    border-color: rgba(42,172,178,.35);
    box-shadow: 0 22px 48px rgba(11,116,193,.16);
  }

  .omedev-blog .article-card h3 {
    color: #053876;
    font-family: 'Syne', sans-serif;
  }

  .omedev-blog .article-card p {
    color: #25364A;
  }

  .omedev-blog .article-meta {
    color: #718096;
  }

  .omedev-blog .share-bar {
    border-top: 1px solid rgba(5,56,118,.09);
  }

  @media (max-width: 768px) {
    .omedev-blog .blog-container {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }

  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #F6F6F7; color: #0B1213; overflow-x: hidden; }

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
            ? 'bg-blue-500/20 border-[#0B74C1]/40 text-[#4681B7]'
            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/15 hover:text-white hover:border-white/20'
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
              className="absolute bottom-full left-0 mb-2 z-50 min-w-[168px] bg-white backdrop-blur-sm border border-[#D5DCE1] rounded-xl p-1.5 shadow-2xl shadow-black/50"
            >
              {/* WhatsApp */}
              <button
                onClick={shareWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#25364A] hover:bg-[#2AACB2]/10 hover:text-[#2AACB2] transition-all duration-150 group"
              >
                <span className="text-[#2AACB2] group-hover:scale-110 transition-transform shrink-0">
                  <WhatsAppIcon size={15} />
                </span>
                WhatsApp
              </button>

              {/* Séparateur */}
              <div className="h-px bg-[#053876]/10 mx-2 my-1" />

              {/* LinkedIn */}
              <button
                onClick={shareLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#25364A] hover:bg-[#0B74C1]/10 hover:text-[#0B74C1] transition-all duration-150 group"
              >
                <span className="text-[#0B74C1] group-hover:scale-110 transition-transform shrink-0">
                  <LinkedInIcon size={15} />
                </span>
                LinkedIn
              </button>

              {/* Séparateur */}
              <div className="h-px bg-[#053876]/10 mx-2 my-1" />

              {/* Copier le lien */}
              <button
                onClick={copyLink}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-150 group ${
                  copied
                    ? 'bg-[#2AACB2]/10 text-[#2AACB2]'
                    : 'text-[#25364A] hover:bg-[#F6F6F7] hover:text-[#053876]'
                }`}
              >
                <span className={`group-hover:scale-110 transition-transform shrink-0 ${copied ? 'text-[#2AACB2]' : 'text-[#25364A]/60'}`}>
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
    <div className="omedev-blog">
      <style>{globalStyles}</style>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <PublicHero
        badge="Blog & Actualités"
        title="Blog OMDEVE"
        highlight="OMDEVE"
        subtitle="Découvrez nos articles sur la digitalisation, la cybersécurité, l'énergie solaire et les meilleures pratiques IT en Afrique Centrale."
        primaryAction={{ label: 'Demander un conseil', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos tarifs', to: '/tarifs' }}
        compact
      />

      {/* ── Filtres ──────────────────────────────────────────── */}
      <div className="blog-hero sticky top-0 z-40 py-4 border-b border-white/10 backdrop-blur-xl">
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
                      ? 'bg-gradient-to-r from-[#0B74C1] to-[#1D5B9B] text-white shadow-lg'
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
      <div className="blog-light-section">
        <div className="container mx-auto px-4 py-16 blog-container">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold font-syne" style={{ color: '#053876' }}>
              {selectedCategory === 'Tous' ? 'Tous les articles' : selectedCategory}
            </h2>
            <p className="text-[#25364A] text-sm">{totalArticles} article{totalArticles > 1 ? 's' : ''}</p>
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
              <button onClick={() => setCurrentPage(1)} className="text-[#0B74C1] hover:text-[#4681B7] underline">Réessayer</button>
            </div>
          )}

          {/* Vide */}
          {!loading && !error && articles.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                <Search size={40} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: '#053876' }}>Aucun article trouvé</h3>
              <p className="text-[#25364A]">Aucun article ne correspond à vos critères.</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('Tous'); setCurrentPage(1); }}
                className="mt-6 text-[#0B74C1] hover:text-[#4681B7] underline">
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
                    className="group article-card transition-all duration-500 hover:-translate-y-2 flex flex-col">

                    {/* Image */}
                    <Link to={`/blog/${article.slug}`} className="block">
                      <div className="relative overflow-hidden h-56">
                        <img src={article.image} alt={article.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#053876] via-transparent to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-[#0B74C1] to-[#1D5B9B] text-white shadow-lg">
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
                        <div className="flex items-center gap-3 text-xs article-meta mb-3">
                          <span className="flex items-center gap-1"><Calendar size={12} />
                            {new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1"><User size={12} />{article.author}</span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#2AACB2] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-sm leading-relaxed line-clamp-3">{article.excerpt}</p>
                        <div className="mt-4 flex items-center text-[#2AACB2] text-sm font-medium">
                          Lire la suite <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </Link>

                      {/* ── Barre de partage ── */}
                      <div className="mt-5 pt-4 share-bar flex items-center justify-between">
                        <span className="text-xs text-[#718096] select-none">Partager cet article</span>
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
                    className="p-2 rounded-lg bg-white border border-[#D5DCE1] text-[#053876] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F6F6F7] transition">
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => goToPage(i + 1)}
                      className={`px-4 py-2 rounded-lg font-medium transition ${
                        currentPage === i + 1
                          ? 'bg-gradient-to-r from-[#0B74C1] to-[#1D5B9B] text-white shadow-lg'
                          : 'bg-white border border-[#D5DCE1] text-[#053876] hover:bg-[#F6F6F7]'
                      }`}>
                      {i + 1}
                    </button>
                  ))}
                  <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white border border-[#D5DCE1] text-[#053876] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#F6F6F7] transition">
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Envie d'échanger ?"
        title="Vous avez un projet ?"
        highlight="un projet"
        subtitle="Discutons de vos besoins et trouvons ensemble la solution la plus adaptée."
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Prendre rendez-vous', to: '/contact' }}
      />
    </div>
  );
};

export default Blog;