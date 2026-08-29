import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Calendar, Clock, User, ArrowLeft,
  Share2, Bookmark, ThumbsUp
} from 'lucide-react';
import { blog as blogApi } from '../services/api';

/* Styles d'harmonisation avec le reste du site (Formation.jsx, Blog.jsx…).
   Ce fichier n'avait aucun <style> propre : la classe "card-hover" utilisée
   plus bas pour les articles similaires n'était définie nulle part, donc
   ces cartes s'affichaient sans bordure/ombre/hover, en décalage avec le
   reste du site. */
const globalStyles = `
  .omedev-blogpost {
    --omedev-navy: #053876;
    --omedev-blue: #0B74C1;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
  }

  .omedev-blogpost .card-hover {
    background: #fff;
    border: 1px solid rgba(5,56,118,.09);
    border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
  }

  .omedev-blogpost .card-hover:hover {
    transform: translateY(-7px);
    box-shadow: 0 22px 48px rgba(11,116,193,.14);
    border-color: rgba(42,172,178,.35);
  }

  /* Contenu de l'article (rendu via react-markdown) : couleurs explicites,
     indépendantes du plugin Tailwind typography (non installé) sur lequel
     reposaient les anciennes classes "prose-*" — elles n'avaient donc
     jamais eu d'effet, d'où le texte invisible (couleur héritée par
     défaut) et le Markdown affiché tel quel (###, **texte**...). */
  .omedev-blogpost .article-content {
    color: #25364A;
    font-size: 1.05rem;
    line-height: 1.85;
  }
  .omedev-blogpost .article-content p {
    color: #25364A;
    margin: 0 0 1.25rem;
  }
  .omedev-blogpost .article-content h1,
  .omedev-blogpost .article-content h2,
  .omedev-blogpost .article-content h3,
  .omedev-blogpost .article-content h4 {
    color: #053876;
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    line-height: 1.3;
    margin: 2rem 0 1rem;
  }
  .omedev-blogpost .article-content h1 { font-size: 1.9rem; }
  .omedev-blogpost .article-content h2 { font-size: 1.6rem; }
  .omedev-blogpost .article-content h3 { font-size: 1.3rem; }
  .omedev-blogpost .article-content h4 { font-size: 1.1rem; }
  .omedev-blogpost .article-content ul,
  .omedev-blogpost .article-content ol {
    color: #25364A;
    margin: 0 0 1.25rem;
    padding-left: 1.5rem;
  }
  .omedev-blogpost .article-content ul { list-style: disc; }
  .omedev-blogpost .article-content ol { list-style: decimal; }
  .omedev-blogpost .article-content li {
    color: #25364A;
    margin-bottom: .4rem;
  }
  .omedev-blogpost .article-content li > p { margin-bottom: .4rem; }
  .omedev-blogpost .article-content strong,
  .omedev-blogpost .article-content b {
    color: #0B74C1;
    font-weight: 700;
  }
  .omedev-blogpost .article-content em {
    font-style: italic;
  }
  .omedev-blogpost .article-content a {
    color: #0B74C1;
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .omedev-blogpost .article-content a:hover {
    color: #2AACB2;
  }
  .omedev-blogpost .article-content blockquote {
    margin: 0 0 1.25rem;
    padding: .75rem 1.25rem;
    border-left: 4px solid #2AACB2;
    background: #F6F6F7;
    color: #25364A;
    font-style: italic;
    border-radius: 0 10px 10px 0;
  }
  .omedev-blogpost .article-content code {
    background: #F6F6F7;
    color: #053876;
    padding: .15rem .4rem;
    border-radius: 6px;
    font-size: .9em;
  }
  .omedev-blogpost .article-content pre {
    background: #0B1213;
    color: #F6F6F7;
    padding: 1rem 1.25rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 0 0 1.25rem;
  }
  .omedev-blogpost .article-content pre code {
    background: transparent;
    color: inherit;
    padding: 0;
  }
  .omedev-blogpost .article-content hr {
    border: none;
    border-top: 1px solid rgba(5,56,118,.12);
    margin: 2rem 0;
  }
  .omedev-blogpost .article-content img {
    max-width: 100%;
    border-radius: 14px;
    margin: 1.25rem 0;
  }
  .omedev-blogpost .article-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.25rem;
  }
  .omedev-blogpost .article-content th,
  .omedev-blogpost .article-content td {
    border: 1px solid rgba(5,56,118,.12);
    padding: .6rem .8rem;
    text-align: left;
    color: #25364A;
  }
  .omedev-blogpost .article-content th {
    background: #F6F6F7;
    color: #053876;
    font-family: 'Syne', sans-serif;
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }
};

const MotionLink = motion(Link);

const BlogPost = () => {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    if (!slug) return
    blogApi.getBySlug(slug)
      .then(res => setArticle(res.data))
      .catch(err => console.error('Erreur chargement article:', err))
      .finally(() => setLoading(false))
  }, [slug])

  // L'app utilise HashRouter : une URL publique valide doit inclure le "#"
  // (sans lui, le navigateur envoie une vraie requête HTTP pour ce chemin
  // au serveur, qui n'a rien à cette adresse -> 404 à l'ouverture directe).
  // On repart de l'URL actuelle (avant le "#") plutôt que de l'origine
  // seule, pour rester correct sur un déploiement avec sous-chemin
  // (ex: GitHub Pages en /omedevservice/) comme sur Render en racine "/".
  const getArticleUrl = () => `${window.location.href.split('#')[0]}#/blog/${article?.slug || slug}`

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getArticleUrl())}`, '_blank', 'noopener,width=600,height=500')
  }
  const shareWhatsApp = () => {
    const text = encodeURIComponent(`${article?.title || ''} — OMEDEV Blog`)
    window.open(`https://wa.me/?text=${text}%20${encodeURIComponent(getArticleUrl())}`, '_blank', 'noopener')
  }
  const shareX = () => {
    const text = encodeURIComponent(`${article?.title || ''} — OMEDEV Blog`)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(getArticleUrl())}`, '_blank', 'noopener,width=600,height=500')
  }
  const copyArticleLink = async () => {
    try {
      await navigator.clipboard.writeText(getArticleUrl())
      setLinkCopied(true)
      setTimeout(() => setLinkCopied(false), 2000)
    } catch { /* silencieux */ }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6F6F7] flex items-center justify-center">
        <div className="text-[#25364A]">Chargement de l'article...</div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#F6F6F7] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#25364A] text-lg mb-4">Article introuvable.</p>
          <Link to="/blog" className="text-[#0B74C1] hover:underline font-semibold">Retour au blog</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="omedev-blogpost min-h-screen bg-[#F6F6F7]" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{globalStyles}</style>

      {/* Navigation Retour */}
      <nav className="bg-white border-b border-[#053876]/10 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            to="/blog"
            className="flex items-center gap-3 text-[#053876] hover:text-[#0B74C1] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blog
          </Link>

          <div className="flex items-center gap-4">
            <button className="p-3 hover:bg-[#F6F6F7] rounded-2xl transition text-[#053876]">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-[#F6F6F7] rounded-2xl transition text-[#053876]">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[420px] sm:h-[500px] md:h-[560px] min-h-[420px] overflow-hidden">
        <img
          src={article.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop'}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,56,118,0.92) 0%, rgba(5,56,118,0.45) 55%, rgba(5,56,118,0.10) 100%)' }} />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-12 sm:pb-16 text-white"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-md px-4 py-1.5 rounded-full mb-5 font-syne">
            <span className="w-1.5 h-1.5 rounded-full bg-[#55DDB5]" />
            <span className="text-xs font-bold tracking-wider uppercase">{article.category}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 font-syne tracking-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 text-sm">
            {article.author && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%)' }}>
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium">{article.author}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-6 text-[#A6C3D7]">
              {article.createdAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(article.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              )}
              {article.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {article.readTime} de lecture
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contenu Principal */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="max-w-4xl mx-auto px-6 py-14 sm:py-16"
      >
        <article className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {article.content}
          </ReactMarkdown>
        </article>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#053876]/10">
            <h4 className="text-sm uppercase tracking-widest text-[#25364A]/70 mb-4 font-syne font-bold">Tags</h4>
            <div className="flex flex-wrap gap-3">
              {article.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-[#F6F6F7] hover:bg-[#0B74C1]/10 text-[#25364A] hover:text-[#0B74C1] px-5 py-2 rounded-full text-sm transition-colors cursor-pointer border border-transparent hover:border-[#2AACB2]/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Partage */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-[#053876]/10 pt-10">
          <div>
            <p className="text-[#25364A]/70 text-sm mb-2">Vous avez trouvé cet article utile ?</p>
            <button className="flex items-center gap-3 text-[#0B74C1] hover:text-[#2AACB2] font-semibold transition-colors">
              <ThumbsUp className="w-5 h-5" />
              J'aime cet article
            </button>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[#25364A]/70 text-sm">Partager :</span>
            <button onClick={shareLinkedIn} className="px-4 py-2.5 rounded-full text-sm font-medium border border-[#053876]/15 text-[#053876] hover:border-[#2AACB2] hover:text-[#0B74C1] transition-colors">LinkedIn</button>
            <button onClick={shareWhatsApp} className="px-4 py-2.5 rounded-full text-sm font-medium border border-[#053876]/15 text-[#053876] hover:border-[#2AACB2] hover:text-[#0B74C1] transition-colors">WhatsApp</button>
            <button onClick={shareX} className="px-4 py-2.5 rounded-full text-sm font-medium border border-[#053876]/15 text-[#053876] hover:border-[#2AACB2] hover:text-[#0B74C1] transition-colors">X</button>
            <button onClick={copyArticleLink} className={`px-4 py-2.5 rounded-full text-sm font-medium border transition-colors ${linkCopied ? 'border-[#2AACB2] text-[#2AACB2]' : 'border-[#053876]/15 text-[#053876] hover:border-[#2AACB2] hover:text-[#0B74C1]'}`}>
              {linkCopied ? 'Lien copié !' : 'Copier le lien'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Articles Similaires */}
      {article.relatedArticles?.length > 0 && (
        <div className="bg-white py-16 sm:py-20 border-t border-[#053876]/10">
          <div className="max-w-4xl mx-auto px-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-10 font-syne text-[#053876]">Articles similaires</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {article.relatedArticles.map((related, index) => (
                <MotionLink
                  key={index}
                  to={`/blog/${related.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="card-hover group flex gap-6 p-5"
                >
                  <div className="flex-1">
                    <h4 className="font-syne font-semibold text-xl leading-tight text-[#053876] group-hover:text-[#0B74C1] transition-colors">
                      {related.title}
                    </h4>
                    <p className="text-[#0B74C1] text-sm mt-3 group-hover:underline">Lire l'article →</p>
                  </div>
                </MotionLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Final */}
      <div className="text-white py-16 sm:py-20 text-center" style={{ background: 'linear-gradient(135deg, #053876 0%, #0B74C1 55%, #2AACB2 100%)' }}>
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 font-syne">
            Besoin d'une expertise IT ?
          </h2>
          <p className="text-lg sm:text-xl text-[#A6C3D7] mb-10">
            Contactez OMEDEV pour un audit gratuit de votre infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/audit-gratuit"
              className="bg-white text-[#053876] px-10 py-4 rounded-full font-semibold hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              Demander un Audit Gratuit
            </Link>
            <Link
              to="/demander-devis"
              className="border border-white/40 px-10 py-4 rounded-full font-semibold hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              Obtenir un Devis
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;