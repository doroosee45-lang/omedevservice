import React from 'react';
import { 
  Calendar, Clock, User, ArrowLeft, 
  Share2, Bookmark, ThumbsUp 
} from 'lucide-react';

const BlogPost = () => {
  // Données de l'article (à remplacer par useParams + fetch depuis MongoDB)
  const article = {
    id: 1,
    title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
    category: "Cybersécurité",
    date: "2026-03-28",
    readTime: "12 min",
    author: "Jean Meya",
    authorRole: "Expert en Cybersécurité & Infrastructure",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    content: `
      <h2>Pourquoi la cybersécurité réseau est-elle plus critique que jamais en 2026 ?</h2>
      <p>Avec l'augmentation massive des attaques ransomware et des menaces sophistiquées en Afrique Centrale, protéger son infrastructure réseau n'est plus une option, mais une nécessité vitale pour la continuité des activités.</p>
      
      <h3>1. Les menaces les plus courantes en RDC et en Afrique</h3>
      <p>Les entreprises congolaises font face à des attaques de phishing ciblé, des intrusions via WiFi non sécurisé, et des ransomwares qui exploitent les faiblesses des parcs informatiques mal maintenus.</p>
      
      <h3>2. Les meilleures pratiques recommandées par OMDEVE</h3>
      <ul>
        <li>Mise en place d'une segmentation réseau avec VLAN</li>
        <li>Installation de firewalls nouvelle génération (NGFW)</li>
        <li>Déploiement d'un système de détection et réponse aux intrusions (IDS/IPS)</li>
        <li>Authentification multi-facteurs (MFA) sur tous les accès critiques</li>
        <li>Formation régulière des équipes aux bonnes pratiques de sécurité</li>
      </ul>
      
      <h3>3. Notre solution : Audit & Sécurisation Complète</h3>
      <p>Chez OMDEVE Services, nous proposons un audit complet suivi d'une mise en place progressive de mesures de protection adaptées à votre taille d'entreprise et à votre secteur d'activité.</p>
      
      <blockquote>
        "Une entreprise non sécurisée perd en moyenne 4,5 millions USD par incident de cybersécurité. Mieux vaut prévenir que guérir."
      </blockquote>
      
      <h3>Conclusion</h3>
      <p>La sécurité de votre réseau doit être pensée dès la conception et maintenue en continu. OMDEVE vous accompagne avec des solutions sur-mesure, adaptées au contexte congolais.</p>
    `,
    tags: ["cybersécurité", "réseau", "firewall", "ransomware", "RDC"],
    relatedArticles: [
      { title: "Formation cybersécurité : Pourquoi former vos équipes ?", slug: "formation-cybersecurite" },
      { title: "Déploiement WiFi professionnel sécurisé en entreprise", slug: "wifi-professionnel" },
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Retour */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <a 
            href="/blog" 
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour au blog
          </a>
          
          <div className="flex items-center gap-4">
            <button className="p-3 hover:bg-gray-100 rounded-2xl transition">
              <Bookmark className="w-5 h-5" />
            </button>
            <button className="p-3 hover:bg-gray-100 rounded-2xl transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Image */}
      <div className="relative h-[500px] md:h-[620px] overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-6 pb-16 text-white">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6">
            <span className="text-sm font-semibold tracking-wider">{article.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold">
                {article.author.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-medium">{article.author}</p>
                <p className="text-blue-200 text-xs">{article.authorRole}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 text-blue-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(article.date).toLocaleDateString('fr-FR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {article.readTime} de lecture
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <article 
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-blue-700"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="mt-16 pt-10 border-t border-gray-200">
          <h4 className="text-sm uppercase tracking-widest text-gray-500 mb-4">Tags</h4>
          <div className="flex flex-wrap gap-3">
            {article.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-5 py-2 rounded-3xl text-sm transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Partage */}
        <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between border-t border-gray-200 pt-10">
          <div>
            <p className="text-gray-500 text-sm mb-2">Vous avez trouvé cet article utile ?</p>
            <button className="flex items-center gap-3 text-blue-600 hover:text-blue-700 font-medium">
              <ThumbsUp className="w-5 h-5" />
              J'aime cet article
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">Partager :</span>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">LinkedIn</button>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">WhatsApp</button>
            <button className="p-4 hover:bg-gray-100 rounded-2xl transition">X</button>
          </div>
        </div>
      </div>

      {/* Articles Similaires */}
      <div className="bg-white py-20 border-t">
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-bold mb-10">Articles similaires</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {article.relatedArticles.map((related, index) => (
              <a 
                key={index}
                href={`/blog/${related.slug}`}
                className="group flex gap-6 hover:bg-gray-50 p-4 -mx-4 rounded-3xl transition"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-xl leading-tight group-hover:text-blue-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-blue-600 text-sm mt-3 group-hover:underline">Lire l'article →</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-6">
            Besoin d'une expertise en cybersécurité ?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Contactez OMDEVE pour un audit gratuit de votre infrastructure réseau.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/audit-gratuit" 
              className="bg-white text-blue-900 px-10 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition"
            >
              Demander un Audit Gratuit
            </a>
            <a 
              href="/demander-devis" 
              className="border-2 border-white px-10 py-4 rounded-2xl font-semibold hover:bg-white/10 transition"
            >
              Obtenir un Devis
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;





















// // src/pages/BlogPost.jsx
// import { motion } from 'framer-motion';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import {
//   ArrowRight, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin,
//   BookOpen, ChevronLeft, Heart, MessageCircle, TrendingUp
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

//   .prose {
//     max-width: 100%;
//   }
//   .prose p {
//     color: #cbd5e1;
//     line-height: 1.75;
//     margin-bottom: 1.5rem;
//   }
//   .prose h2 {
//     color: white;
//     font-size: 1.8rem;
//     font-weight: bold;
//     font-family: 'Syne', sans-serif;
//     margin-top: 2rem;
//     margin-bottom: 1rem;
//   }
//   .prose h3 {
//     color: #93c5fd;
//     font-size: 1.4rem;
//     font-weight: 600;
//     margin-top: 1.5rem;
//     margin-bottom: 0.75rem;
//   }
//   .prose ul, .prose ol {
//     margin-left: 1.5rem;
//     margin-bottom: 1.5rem;
//     color: #cbd5e1;
//   }
//   .prose li {
//     margin-bottom: 0.5rem;
//   }
//   .prose strong {
//     color: white;
//   }
//   .prose a {
//     color: #60a5fa;
//     text-decoration: underline;
//   }
// `;

// // Base de données simulée des articles complets (même slugs que la liste)
// const articlesFull = {
//   "securiser-reseau-entreprise-2026": {
//     title: "Comment sécuriser votre réseau d'entreprise en 2026 : Guide complet",
//     category: "Réseau",
//     date: "2026-03-28",
//     readTime: "8 min",
//     image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&h=600&fit=crop",
//     author: "Jean Meya",
//     authorBio: "Expert en cybersécurité certifié CISSP, Jean Meya accompagne les entreprises dans la protection de leurs infrastructures critiques.",
//     content: `
//       <p>La sécurité réseau est devenue un enjeu majeur pour toutes les entreprises, quelles que soient leur taille ou leur secteur d'activité. En 2026, les cybermenaces évoluent rapidement, et il est essentiel d'adopter une approche proactive.</p>
//       <h2>1. Les menaces actuelles les plus courantes</h2>
//       <p>Les ransomwares, les attaques par phishing et les vulnérabilités zero-day sont en tête des préoccupations. Selon une étude récente, 60% des PME victimes d'une cyberattaque ferment dans les six mois.</p>
//       <h2>2. Les bonnes pratiques à mettre en place</h2>
//       <ul>
//         <li><strong>Segmentation du réseau</strong> : isolez les systèmes critiques des postes utilisateurs.</li>
//         <li><strong>Authentification multi-facteurs (MFA)</strong> : obligatoire pour tous les accès distants.</li>
//         <li><strong>Mises à jour régulières</strong> : appliquez les correctifs de sécurité dès leur sortie.</li>
//         <li><strong>Surveillance continue</strong> : utilisez un SIEM pour détecter les comportements anormaux.</li>
//       </ul>
//       <h2>3. Les solutions recommandées par OMDEVE</h2>
//       <p>Nous proposons des firewalls nouvelle génération, des solutions EDR (Endpoint Detection and Response) et des audits de sécurité complets. Nos experts vous accompagnent dans le choix et l'intégration de ces outils.</p>
//       <h2>Conclusion</h2>
//       <p>Investir dans la cybersécurité n'est plus une option, c'est une nécessité. Contactez OMDEVE pour un audit gratuit de votre infrastructure réseau.</p>
//     `,
//     similarArticles: [
//       { slug: "wifi-professionnel-erreurs-eviter", title: "Déploiement WiFi professionnel : Erreurs à éviter", category: "Réseau" },
//       { slug: "cablage-structure-guide-complet", title: "Câblage structuré : guide complet", category: "Réseau" },
//       { slug: "formation-cybersecurite-indispensable", title: "Formation cybersécurité : indispensable", category: "Formation" },
//     ]
//   },
//   "panneaux-solaires-rdc-rentabilite": {
//     title: "Installation de panneaux solaires en RDC : Rentabilité et retour sur investissement",
//     category: "Énergie",
//     date: "2026-03-25",
//     readTime: "12 min",
//     image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=600&fit=crop",
//     author: "Dr. Amina Kabongo",
//     authorBio: "Ingénieur en énergies renouvelables, spécialiste des projets solaires en zone tropicale.",
//     content: `
//       <p>La RDC dispose d'un des plus forts potentiels solaires d'Afrique. Pourtant, l'accès à l'électricité reste un défi majeur. Installer des panneaux photovoltaïques peut être une solution économique et écologique.</p>
//       <h2>1. Coût d'une installation solaire</h2>
//       <p>Le prix au watt-crête a considérablement baissé ces dernières années. Pour une entreprise moyenne, une installation de 50 kWc coûte entre 30 000 et 50 000 USD, avec un retour sur investissement de 3 à 5 ans.</p>
//       <h2>2. Économies réalisées</h2>
//       <p>En substituant le groupe électrogène (coût élevé) par le solaire, les économies peuvent atteindre 70% sur la facture énergétique.</p>
//       <h2>3. Aides et financements</h2>
//       <p>Certaines banques locales proposent des prêts verts. OMDEVE vous aide à monter votre dossier de financement.</p>
//       <h2>Conclusion</h2>
//       <p>Le solaire est rentable en RDC. Demandez une étude gratuite de votre site.</p>
//     `,
//     similarArticles: [
//       { slug: "ia-entreprise-rdc-2026", title: "IA en entreprise en RDC", category: "Digital" },
//       { slug: "cloud-hybride-avantages-entreprises", title: "Cloud hybride", category: "Cloud" },
//     ]
//   },
//   // ... ajouter d'autres articles selon la même structure
//   // Pour cet exemple, je mets un fallback pour les autres slugs
// };

// const BlogPost = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simuler un chargement asynchrone
//     setLoading(true);
//     setTimeout(() => {
//       const found = articlesFull[slug];
//       if (found) {
//         setArticle(found);
//       } else {
//         // Rediriger vers 404 ou blog si article inexistant
//         navigate('/blog', { replace: true });
//       }
//       setLoading(false);
//     }, 100);
//   }, [slug, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center">
//         <div className="text-white">Chargement de l'article...</div>
//       </div>
//     );
//   }

//   if (!article) return null;

//   // Fonction de partage
//   const shareOnFacebook = () => {
//     window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
//   };
//   const shareOnTwitter = () => {
//     window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
//   };
//   const shareOnLinkedin = () => {
//     window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`, '_blank');
//   };

//   return (
//     <>
//       <style>{globalStyles}</style>

//       {/* Header avec image de couverture */}
//       <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
//         <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
//         <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 text-white">
//           <div className="container mx-auto max-w-4xl">
//             <Link to="/blog" className="inline-flex items-center gap-2 text-blue-300 hover:text-white mb-4 transition">
//               <ChevronLeft size={16} /> Retour au blog
//             </Link>
//             <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-4">
//               {article.category}
//             </span>
//             <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-syne mb-4">{article.title}</h1>
//             <div className="flex flex-wrap gap-4 text-sm text-gray-300">
//               <div className="flex items-center gap-1"><Calendar size={14} /> {new Date(article.date).toLocaleDateString('fr-FR')}</div>
//               <div className="flex items-center gap-1"><Clock size={14} /> {article.readTime}</div>
//               <div className="flex items-center gap-1"><User size={14} /> {article.author}</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Contenu de l'article */}
//       <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-16">
//         <div className="container mx-auto px-4 max-w-4xl">
//           <div className="flex flex-col lg:flex-row gap-12">
//             {/* Article principal */}
//             <article className="flex-1 prose" dangerouslySetInnerHTML={{ __html: article.content }} />

//             {/* Sidebar : partage + auteur + articles similaires */}
//             <aside className="lg:w-80 space-y-8">
//               {/* Partager */}
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Share2 size={18} /> Partager</h3>
//                 <div className="flex gap-3">
//                   <button onClick={shareOnFacebook} className="p-2 rounded-full bg-white/10 hover:bg-blue-600 transition"><Facebook size={20} /></button>
//                   <button onClick={shareOnTwitter} className="p-2 rounded-full bg-white/10 hover:bg-sky-500 transition"><Twitter size={20} /></button>
//                   <button onClick={shareOnLinkedin} className="p-2 rounded-full bg-white/10 hover:bg-blue-700 transition"><Linkedin size={20} /></button>
//                 </div>
//               </div>

//               {/* Auteur */}
//               <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
//                 <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><User size={18} /> À propos de l'auteur</h3>
//                 <p className="text-gray-300 text-sm">{article.authorBio}</p>
//               </div>

//               {/* Articles similaires */}
//               {article.similarArticles && article.similarArticles.length > 0 && (
//                 <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
//                   <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><BookOpen size={18} /> Articles similaires</h3>
//                   <div className="space-y-3">
//                     {article.similarArticles.map((sim, idx) => (
//                       <Link key={idx} to={`/blog/${sim.slug}`} className="block group">
//                         <div className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition">
//                           <p className="text-sm font-semibold text-white group-hover:text-blue-300">{sim.title}</p>
//                           <p className="text-xs text-gray-400 mt-1">{sim.category}</p>
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </aside>
//           </div>
//         </div>
//       </div>

//       {/* CTA finale (identique à la page services) */}
//       <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/50 to-indigo-900/50 border-t border-white/5">
//         <div className="absolute inset-0 opacity-30" style={{
//           backgroundImage: `radial-gradient(circle at 70% 30%, rgba(59,130,246,0.4) 0%, transparent 60%)`
//         }} />
//         <div className="container mx-auto px-4 text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
//               Vous avez un projet ?
//             </h2>
//             <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
//               Discutons de vos besoins et trouvons ensemble la solution la plus adaptée.
//             </p>
//             <Link
//               to="/contact"
//               className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl"
//             >
//               Prendre rendez-vous <ArrowRight size={18} />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default BlogPost;