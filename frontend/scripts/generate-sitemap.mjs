// scripts/generate-sitemap.mjs
//
// Régénère frontend/public/sitemap.xml avant chaque build (voir le script
// "build" dans package.json). Sans ce script, publier un nouvel article
// depuis l'admin ne le rendait jamais visible dans le sitemap : le fichier
// était entièrement statique et ne listait aucun article. Désormais, tout
// article publié apparaît automatiquement au prochain déploiement, sans
// aucune modification manuelle du code.
//
// Ne doit JAMAIS faire échouer le build : si l'API est injoignable au
// moment du build (ex. redémarrage du backend sur Render), on retombe
// simplement sur les pages statiques, comme avant ce script.
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://www-omedevservices.net';
const API_URL = process.env.VITE_API_URL || 'https://omedevservicebackend.onrender.com/api';

const STATIC_PAGES = [
  { loc: '/', changefreq: 'weekly', priority: '1.0' },
  { loc: '/services', changefreq: 'weekly', priority: '0.9' },
  { loc: '/solutions', changefreq: 'monthly', priority: '0.8' },
  { loc: '/realisations', changefreq: 'monthly', priority: '0.8' },
  { loc: '/tarifs', changefreq: 'monthly', priority: '0.7' },
  { loc: '/about', changefreq: 'monthly', priority: '0.8' },
  { loc: '/contact', changefreq: 'monthly', priority: '0.8' },
  { loc: '/blog', changefreq: 'weekly', priority: '0.8' },
  { loc: '/audit-gratuit', changefreq: 'monthly', priority: '0.8' },
  { loc: '/demander-devis', changefreq: 'monthly', priority: '0.9' },
  { loc: '/experts', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/reseau-infrastructure', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/securite', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/developpement-digital', changefreq: 'monthly', priority: '0.9' },
  { loc: '/services/cloud-hebergement', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/energie-equipements', changefreq: 'monthly', priority: '0.8' },
  { loc: '/services/vente-materiel', changefreq: 'monthly', priority: '0.7' },
  { loc: '/services/formation', changefreq: 'monthly', priority: '0.8' },
  { loc: '/formations/catalogue', changefreq: 'monthly', priority: '0.8' },
  { loc: '/devis-cloud', changefreq: 'monthly', priority: '0.8' },
];

const xmlEscape = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const urlEntry = ({ loc, changefreq, priority, lastmod }) => `
    <url>
        <loc>${xmlEscape(SITE_URL + loc)}</loc>
        <changefreq>${changefreq}</changefreq>
        <priority>${priority}</priority>${lastmod ? `\n        <lastmod>${lastmod}</lastmod>` : ''}
    </url>`;

async function fetchAllPublishedArticles() {
  const articles = [];
  let page = 1;
  const limit = 100;
  // Borne de sécurité : jamais plus de 20 pages (2000 articles), pour ne
  // jamais boucler indéfiniment sur une réponse API inattendue.
  for (let i = 0; i < 20; i++) {
    const res = await fetch(`${API_URL}/blog?page=${page}&limit=${limit}`);
    if (!res.ok) throw new Error(`API a répondu ${res.status}`);
    const data = await res.json();
    articles.push(...(data.articles || []));
    if (page >= (data.pages || 1)) break;
    page += 1;
  }
  return articles;
}

async function main() {
  let articleEntries = [];
  try {
    const articles = await fetchAllPublishedArticles();
    articleEntries = articles
      .filter((a) => a.slug)
      .map((a) => ({
        loc: `/blog/${a.slug}`,
        changefreq: 'monthly',
        priority: '0.6',
        lastmod: new Date(a.updatedAt || a.publishedAt || Date.now()).toISOString().slice(0, 10),
      }));
    console.log(`[sitemap] ${articleEntries.length} article(s) publié(s) inclus.`);
  } catch (err) {
    console.warn(`[sitemap] Impossible de récupérer les articles (${err.message}) — sitemap généré avec les pages statiques uniquement.`);
  }

  const allEntries = [...STATIC_PAGES, ...articleEntries];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allEntries.map(urlEntry).join('\n')}
</urlset>
`;

  const outPath = join(__dirname, '..', 'public', 'sitemap.xml');
  writeFileSync(outPath, xml, 'utf8');
  console.log(`[sitemap] Écrit dans ${outPath} (${allEntries.length} URLs).`);
}

main().catch((err) => {
  // Ne jamais faire échouer le build pour ça.
  console.warn(`[sitemap] Génération ignorée suite à une erreur inattendue: ${err.message}`);
});
