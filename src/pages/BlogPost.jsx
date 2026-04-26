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












