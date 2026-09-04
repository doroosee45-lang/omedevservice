// src/hooks/useDocumentMeta.js
// Gestion du <title>, de la meta description, d'Open Graph, de Twitter Card
// et du lien canonical par page. Sans ce hook, index.html ne fournit qu'un
// seul jeu de balises statique pour toute l'application (SPA HashRouter) :
// chaque page — y compris chaque article de blog — apparaissait donc avec
// le même titre/la même description dans les résultats Google et les
// aperçus de partage, quel que soit son contenu réel.
//
// Volontairement sans dépendance (pas de react-helmet) : le DOM n'a besoin
// d'être mis à jour qu'après le rendu, ce qu'un useEffect suffit à faire.
import { useEffect } from 'react';

const SITE_NAME = 'OMEDEV Services';
const DEFAULT_TITLE = 'OMEDEV Services - Solutions IT, Énergie & Digital';
const DEFAULT_DESCRIPTION = 'Leader en solutions informatiques, énergétiques et digitales en République Démocratique du Congo';

const setMetaTag = (attr, key, value) => {
  if (!value) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
};

const setCanonical = (href) => {
  const existing = document.querySelector('link[rel="canonical"]');
  if (!href) {
    // Pas d'URL propre à cette page : ne pas laisser le canonical d'une
    // page précédente pointer Google vers la mauvaise URL.
    if (existing) existing.remove();
    return;
  }
  let el = existing;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const removeMetaTag = (attr, key) => {
  document.querySelector(`meta[${attr}="${key}"]`)?.remove();
};

/**
 * @param {Object} opts
 * @param {string} [opts.title] - Titre de la page (le nom du site est ajouté automatiquement)
 * @param {string} [opts.description] - Meta description (155-160 caractères recommandés)
 * @param {string} [opts.image] - URL absolue de l'image de partage (og:image)
 * @param {string} [opts.path] - Chemin HashRouter de la page (ex: '/blog/mon-article'), utilisé pour le canonical et og:url
 * @param {'website'|'article'} [opts.type]
 */
const useDocumentMeta = ({ title, description, image, path, type = 'website' } = {}) => {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    const desc = (description || DEFAULT_DESCRIPTION).slice(0, 160);
    const url = path ? `${window.location.origin}/#${path}` : undefined;

    document.title = fullTitle;
    setMetaTag('name', 'description', desc);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', desc);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('name', 'twitter:card', image ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', desc);
    if (image) {
      setMetaTag('property', 'og:image', image);
      setMetaTag('name', 'twitter:image', image);
    }
    if (url) {
      setMetaTag('property', 'og:url', url);
      setCanonical(url);
    }

    return () => {
      // La page suivante peut ne pas utiliser ce hook (câblé progressivement,
      // pas encore sur toutes les pages) : sans cette remise à zéro, une
      // page sans balises propres hériterait silencieusement de celles de
      // la précédente (ex: og:image d'un article resté affiché sur l'accueil).
      document.title = DEFAULT_TITLE;
      setMetaTag('name', 'description', DEFAULT_DESCRIPTION);
      setMetaTag('property', 'og:title', DEFAULT_TITLE);
      setMetaTag('property', 'og:description', DEFAULT_DESCRIPTION);
      setMetaTag('property', 'og:type', 'website');
      setMetaTag('name', 'twitter:card', 'summary');
      setMetaTag('name', 'twitter:title', DEFAULT_TITLE);
      setMetaTag('name', 'twitter:description', DEFAULT_DESCRIPTION);
      removeMetaTag('property', 'og:image');
      removeMetaTag('name', 'twitter:image');
      removeMetaTag('property', 'og:url');
      setCanonical(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, path, type]);
};

export default useDocumentMeta;
