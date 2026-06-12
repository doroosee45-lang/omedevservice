import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, X, ChevronLeft, ChevronRight,
  MapPin, Calendar, Star, Eye, Hammer, Layers,
  Package, Quote, Filter, ArrowUpRight, Phone, Loader2,
} from 'lucide-react';
import { ferronnerieProjects as projApi } from '../../services/api';

// ─── STYLES ──────────────────────────────────────────────────────────────────

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'DM Sans', sans-serif; background: #0f172a; color: #e2e8f0; overflow-x: hidden; }
  .font-syne { font-family: 'Syne', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-18px); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-fade-in { animation: fadeIn 0.4s ease forwards; }

  .img-zoom { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
  .img-zoom:hover { transform: scale(1.06); }

  .modal-scroll::-webkit-scrollbar { width: 4px; }
  .modal-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
  .modal-scroll::-webkit-scrollbar-thumb { background: rgba(249,115,22,0.4); border-radius: 2px; }
`;

// ─── DATA ────────────────────────────────────────────────────────────────────

const CATEGORIES = ['Tous', 'Ferronnerie', 'Mobilier', 'Vitrines'];

const FALLBACK_PROJECTS = [
  {
    id: 1,
    title: 'Portail Coulissant Résidentiel',
    category: 'Ferronnerie',
    location: 'Tunis, Menzah 9',
    date: 'Mars 2024',
    duration: '5 jours',
    sector: 'Résidentiel',
    badge: 'Coup de cœur',
    badgeColor: 'orange',
    cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80',
    ],
    description: 'Conception et installation d\'un portail coulissant motorisé en acier galvanisé et aluminium laqué anthracite. Structure tubulaire renforcée avec finition thermolaquée résistante aux UV et aux intempéries.',
    details: [
      'Dimensions : 4,5 m × 2 m',
      'Moteur FAAC 740 avec télécommande',
      'Finition : Aluminium laqué RAL 7016 Anthracite',
      'Rail inox encastré dans le sol',
      'Détecteur de présence intégré',
    ],
    client: {
      name: 'M. Khalil B.',
      role: 'Propriétaire résidentiel',
      avatar: 'KB',
      rating: 5,
      review: 'Travail irréprochable, délais respectés et équipe très professionnelle. Le portail est exactement ce que j\'avais imaginé. Je recommande vivement Omedev Services pour tout projet de ferronnerie.',
    },
  },
  {
    id: 2,
    title: 'Salon VIP 7 Places Acier & Velours',
    category: 'Mobilier',
    location: 'Sfax, Centre-ville',
    date: 'Janvier 2024',
    duration: '10 jours',
    sector: 'Résidentiel haut de gamme',
    badge: 'Bestseller',
    badgeColor: 'amber',
    cover: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80',
    ],
    description: 'Salon VIP 7 places entièrement sur mesure. Structure métallique chromée avec assises en velours côtelé gris perle. Pieds coniques en acier brossé. Design contemporain alliant robustesse industrielle et raffinement intérieur.',
    details: [
      'Composition : canapé 3 places + 2 fauteuils 2 places',
      'Structure : acier chromé 40×40 mm',
      'Revêtement : velours côtelé gris perle',
      'Mousses haute densité HR40',
      'Livraison et installation comprises',
    ],
    client: {
      name: 'Mme Sana R.',
      role: 'Architecte d\'intérieur',
      avatar: 'SR',
      rating: 5,
      review: 'Je travaille régulièrement avec Omedev pour mes clients haut de gamme. La qualité de fabrication est constante et le respect des délais est remarquable. Ce salon est une vraie réussite.',
    },
  },
  {
    id: 3,
    title: 'Vitrine Pharmacie Moderne',
    category: 'Vitrines',
    location: 'Sousse, Khzema',
    date: 'Février 2024',
    duration: '7 jours',
    sector: 'Santé / Commercial',
    badge: 'Nouveau',
    badgeColor: 'cyan',
    cover: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    ],
    description: 'Agencement complet d\'une pharmacie : vitrine façade aluminium et verre feuilleté sécurisé, comptoir d\'accueil en aluminium laqué blanc avec desserte bois, présentoirs intégrés à éclairage LED.',
    details: [
      'Façade vitrée : 6 m linéaires',
      'Verre feuilleté 10 mm sécurité',
      'Profils aluminium laqué blanc mat',
      'Comptoir L : 3,2 m avec tiroirs',
      'Éclairage LED intégré 3000K',
    ],
    client: {
      name: 'Dr. Mounir T.',
      role: 'Pharmacien titulaire',
      avatar: 'MT',
      rating: 5,
      review: 'L\'agencement a complètement transformé l\'image de ma pharmacie. Mes patients sont agréablement surpris. L\'équipe a su intégrer mes contraintes fonctionnelles tout en créant un espace moderne et lumineux.',
    },
  },
  {
    id: 4,
    title: 'Escalier Métallique Villa Moderne',
    category: 'Ferronnerie',
    location: 'La Marsa, Tunis',
    date: 'Novembre 2023',
    duration: '12 jours',
    sector: 'Résidentiel premium',
    badge: 'Réalisé',
    badgeColor: 'green',
    cover: 'https://www.renaudcreations.fr/wp-content/uploads/2023/06/escalier-fleur-de-lotus.jpg',
    gallery: [
      'https://www.renaudcreations.fr/wp-content/uploads/2023/06/escalier-fleur-de-lotus.jpg',
      'https://www.renaudcreations.fr/wp-content/uploads/2023/06/escalier-fleur-de-lotus.jpg',
      'https://www.renaudcreations.fr/wp-content/uploads/2023/06/escalier-fleur-de-lotus.jpg',
    ],
    description: 'Escalier droit quart-tournant en acier laqué noir mat avec marches en bois massif chêne huilé. Garde-corps design barreaux verticaux ronds, main courante acier brossé. Intégration parfaite dans une villa contemporaine.',
    details: [
      '14 marches chêne massif 40 mm',
      'Structure acier laqué RAL 9005 mat',
      'Garde-corps H : 1,05 m réglementaire',
      'Main courante acier Ø 42 mm brossé',
      'Pose sur dalle béton existante',
    ],
    client: {
      name: 'M. Adel M.',
      role: 'Propriétaire villa',
      avatar: 'AM',
      rating: 5,
      review: 'Cet escalier est devenu la pièce maîtresse de notre villa. L\'alliance du métal noir et du bois chêne est exactement ce que nous cherchions. La finition est impeccable, aucune reprise nécessaire.',
    },
  },
  {
    id: 5,
    title: 'Chambre Complète Lit King Size',
    category: 'Mobilier',
    location: 'Hammamet',
    date: 'Décembre 2023',
    duration: '8 jours',
    sector: 'Hôtellerie',
    badge: 'Hôtellerie',
    badgeColor: 'blue',
    cover: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80',
    ],
    description: 'Mobilier complet pour 12 chambres d\'un hôtel boutique : lit king size structure acier cuivré avec tête de lit rembourrée, tables de chevet, commode et bureau assortis. Production en série avec finitions identiques.',
    details: [
      'Lot : 12 chambres complètes',
      'Lit 180×200 structure acier cuivré',
      'Tête de lit capitonnée tissu lin',
      'Tables de chevet Ø 45 cm',
      'Commode 4 tiroirs + bureau intégré',
    ],
    client: {
      name: 'M. Ridha K.',
      role: 'Directeur hôtel boutique',
      avatar: 'RK',
      rating: 5,
      review: 'Omedev a relevé le défi de produire 12 chambres identiques en qualité irréprochable dans un délai très serré. Résultat : nos clients adorent et notre note TripAdvisor a augmenté de 0,4 points.',
    },
  },
  {
    id: 6,
    title: 'Vitrine Bijouterie Sécurisée',
    category: 'Vitrines',
    location: 'Tunis, Avenue Habib Bourguiba',
    date: 'Octobre 2023',
    duration: '6 jours',
    sector: 'Luxe / Commerce',
    badge: 'Luxe',
    badgeColor: 'amber',
    cover: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=80',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=800&q=80',
    ],
    description: 'Conception et installation de vitrines sécurisées pour une bijouterie de prestige. Profils aluminium doré anodisé, verre trempé anti-effraction 12 mm, serrures à clé Européenne 3 points, éclairage LED haute-restitution 95+ IRC.',
    details: [
      '6 vitrines mural + 2 comptoirs îlots',
      'Verre trempé feuilleté 12 mm',
      'Aluminium anodisé Or Champagne',
      'Serrure 3 points haute sécurité',
      'LED 2700K IRC 95+ pour rendu bijoux',
    ],
    client: {
      name: 'Mme Leila N.',
      role: 'Gérante bijouterie',
      avatar: 'LN',
      rating: 5,
      review: 'Des vitrines qui mettent réellement en valeur mes bijoux. La lumière est parfaite, le rendu des pierres et des métaux précieux est exceptionnel. La sécurité est au rendez-vous. Un très grand professionnalisme.',
    },
  },
  {
    id: 7,
    title: 'Clôture & Portillon Maison Individuelle',
    category: 'Ferronnerie',
    location: 'Ariana, Raoued',
    date: 'Septembre 2023',
    duration: '4 jours',
    sector: 'Résidentiel',
    badge: 'Populaire',
    badgeColor: 'orange',
    cover: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      'https://images.unsplash.com/photo-1592595896551-12b371d546d5?w=800&q=80',
    ],
    description: 'Clôture périmétrique 35 mètres linéaires en tube carré galvanisé thermolaqué vert foncé, portillon piéton acier avec serrure automatique. Design contemporain lisses horizontales alignées sur le portail existant.',
    details: [
      '35 ml de clôture lisses horizontales',
      'Tube carré 40×40 galvanisé',
      'Thermolaqué RAL 6005 Vert mousse',
      'Portillon 1 m : serrure auto inox',
      'Poteaux scellés béton 80×80',
    ],
    client: {
      name: 'Famille Bouzid',
      role: 'Propriétaires',
      avatar: 'FB',
      rating: 4,
      review: 'Très satisfaits du résultat. La clôture s\'intègre parfaitement avec notre portail. L\'équipe a travaillé proprement et a tout nettoyé après le chantier. Bon rapport qualité-prix.',
    },
  },
  {
    id: 8,
    title: 'Tables & Chaises Restaurant Terrasse',
    category: 'Mobilier',
    location: 'Sidi Bou Saïd',
    date: 'Août 2023',
    duration: '15 jours',
    sector: 'Restauration',
    badge: 'Série',
    badgeColor: 'cyan',
    cover: 'https://ferronnerieletouque.fr/assets/images/banc-balancelle/ferronnier-art-balancelle-saint-jean-cap-ferrat.webp',
    gallery: [
      'https://ferronnerieletouque.fr/assets/images/banc-balancelle/ferronnier-art-balancelle-saint-jean-cap-ferrat.webp',
      'https://ferronnerieletouque.fr/assets/images/banc-balancelle/ferronnier-art-balancelle-saint-jean-cap-ferrat.webp',
      'https://ferronnerieletouque.fr/assets/images/banc-balancelle/ferronnier-art-balancelle-saint-jean-cap-ferrat.webp',
    ],
    description: 'Mobilier extérieur pour restaurant terrasse : 20 tables rondes aluminium laqué blanc, 80 chaises empilables aluminium assise corde nautique. Traitement époxy anti-corrosion adapté à l\'environnement marin.',
    details: [
      '20 tables rondes Ø 70 cm',
      '80 chaises empilables aluminium',
      'Assise corde nautique tressée bleue',
      'Époxy anti-sel et UV haute résistance',
      'Livraison + montage sur site',
    ],
    client: {
      name: 'M. Zied C.',
      role: 'Restaurateur',
      avatar: 'ZC',
      rating: 5,
      review: 'Notre terrasse a une tout autre allure ! Le mobilier est solide, esthétique et résiste bien à l\'humidité marine. Un an plus tard, aucune trace de corrosion. Excellent investissement.',
    },
  },
  {
    id: 9,
    title: 'Fenêtres Aluminium Immeuble 6 Étages',
    category: 'Ferronnerie',
    location: 'Tunis, El Manar',
    date: 'Juillet 2023',
    duration: '21 jours',
    sector: 'Immobilier / Promoteur',
    badge: 'Grand chantier',
    badgeColor: 'blue',
    cover: 'https://www.lmn76.com/photos/ensemble-table-et-chaise-1.jpg',
    gallery: [
      'https://www.lmn76.com/photos/ensemble-table-et-chaise-1.jpg',
      'https://www.lmn76.com/photos/ensemble-table-et-chaise-1.jpg',
      'https:https://www.lmn76.com/photos/ensemble-table-et-chaise-1.jpg',
    ],
    description: 'Fourniture et pose de 120 fenêtres et baies vitrées aluminium double vitrage pour un immeuble résidentiel neuf. Profils thermiques à rupture de pont thermique, vitrages 4/16/4 argon, quincaillerie multipoint.',
    details: [
      '120 menuiseries toutes dimensions',
      'Profil aluminium à RPT Aliplast',
      'Double vitrage 4/16/4 gaz argon',
      'Quincaillerie Roto multipoint',
      'Couleur extérieure : laqué gris 7040',
    ],
    client: {
      name: 'SIMBA Immobilier',
      role: 'Promoteur immobilier',
      avatar: 'SI',
      rating: 5,
      review: 'Chantier de grande ampleur géré avec sérieux. Les plannings ont été tenus, la coordination avec les autres corps de métier était fluide. Qualité technique conforme au cahier des charges. Nous renouvellerons.',
    },
  },
];

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const badgeColors = {
  orange: { bg: 'bg-orange-500/15', text: 'text-orange-300', border: 'border-orange-500/30' },
  amber:  { bg: 'bg-amber-500/15',  text: 'text-amber-300',  border: 'border-amber-500/30'  },
  cyan:   { bg: 'bg-cyan-500/15',   text: 'text-cyan-300',   border: 'border-cyan-500/30'   },
  green:  { bg: 'bg-green-500/15',  text: 'text-green-300',  border: 'border-green-500/30'  },
  blue:   { bg: 'bg-blue-500/15',   text: 'text-blue-300',   border: 'border-blue-500/30'   },
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={14} className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} />
    ))}
  </div>
);

const ProjectCard = ({ project, onClick }) => {
  const bc = badgeColors[project.badgeColor] || badgeColors.orange;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      onClick={() => onClick(project)}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer
                 hover:border-orange-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-900/10"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover img-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        {/* Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold border ${bc.bg} ${bc.text} ${bc.border}`}>
          {project.badge}
        </div>
        {/* Category pill */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-medium bg-black/50 text-white border border-white/20">
          {project.category}
        </div>
        {/* Quick view */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            <Eye size={14} /> Voir le projet
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-lg font-syne mb-1.5 group-hover:text-orange-300 transition-colors line-clamp-1">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">{project.description}</p>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
          <span className="flex items-center gap-1"><Calendar size={11} />{project.date}</span>
        </div>

        {/* Client mini */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-[10px] font-bold">
              {project.client.avatar}
            </div>
            <div>
              <p className="text-white text-xs font-semibold">{project.client.name}</p>
              <StarRating rating={project.client.rating} />
            </div>
          </div>
          <ArrowUpRight size={16} className="text-gray-500 group-hover:text-orange-400 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
};

const Modal = ({ project, onClose }) => {
  const [imgIdx, setImgIdx] = useState(0);
  if (!project) return null;
  const bc = badgeColors[project.badgeColor] || badgeColors.orange;

  const prev = () => setImgIdx(i => (i - 1 + project.gallery.length) % project.gallery.length);
  const next = () => setImgIdx(i => (i + 1) % project.gallery.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-white/10 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto modal-scroll"
          onClick={e => e.stopPropagation()}
        >
          {/* Gallery */}
          <div className="relative h-72 sm:h-96 rounded-t-3xl overflow-hidden">
            <img
              key={imgIdx}
              src={project.gallery[imgIdx]}
              alt={project.title}
              className="w-full h-full object-cover animate-fade-in"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />

            {/* Close */}
            <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
              <X size={16} />
            </button>

            {/* Nav arrows */}
            {project.gallery.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {project.gallery.map((_, i) => (
                <button key={i} onClick={() => setImgIdx(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-orange-400 w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>

            {/* Badge overlay */}
            <div className={`absolute bottom-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold border ${bc.bg} ${bc.text} ${bc.border}`}>
              {project.badge}
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <h2 className="text-2xl font-extrabold text-white font-syne mb-1">{project.title}</h2>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={11} />{project.location}</span>
                  <span className="flex items-center gap-1"><Calendar size={11} />{project.date}</span>
                  <span className="flex items-center gap-1 text-orange-400">⏱ {project.duration}</span>
                  <span className="flex items-center gap-1 text-cyan-400">🏢 {project.sector}</span>
                </div>
              </div>
              <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold border border-white/20 bg-white/5 text-gray-300">
                {project.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>

            {/* Details */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6">
              <h3 className="text-white font-bold font-syne text-sm mb-3 flex items-center gap-2">
                <Package size={15} className="text-orange-400" /> Caractéristiques techniques
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <span className="text-orange-400 mt-0.5 shrink-0">▸</span>{d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Client review */}
            <div className="bg-gradient-to-br from-orange-500/8 to-amber-500/5 border border-orange-500/20 rounded-2xl p-5 mb-6">
              <div className="flex items-start gap-3 mb-3">
                <Quote size={22} className="text-orange-400 shrink-0 mt-0.5" />
                <p className="text-gray-300 italic leading-relaxed text-sm">"{project.client.review}"</p>
              </div>
              <div className="flex items-center gap-3 pl-7">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold">
                  {project.client.avatar}
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">{project.client.name}</p>
                  <p className="text-gray-500 text-xs mb-0.5">{project.client.role}</p>
                  <StarRating rating={project.client.rating} />
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/demander-devis"
                className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
              >
                Projet similaire ? Demander un devis <ArrowRight size={16} />
              </Link>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl border border-white/20 text-gray-400 hover:border-white/40 hover:text-white transition-all text-sm font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const FerronnerieProjets = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    projApi.getPublic()
      .then(res => {
        const data = res.data;
        if (Array.isArray(data) && data.length > 0) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = activeFilter === 'Tous'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const stats = [
    { val: projects.length + '+', label: 'Réalisations', color: 'text-orange-400' },
    { val: '100%', label: 'Clients satisfaits', color: 'text-amber-400' },
    { val: '4.9/5', label: 'Note moyenne', color: 'text-cyan-400' },
    { val: '3', label: 'Catégories', color: 'text-emerald-400' },
  ];

  return (
    <>
     {/* ── HERO ─────────────────────────────────────────────────────────── */}
<section className="relative text-white overflow-hidden" style={{ minHeight: '60vh' }}>

  {/* Photo de fond */}
  <div
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=90')` }}
  />

  {/* Overlay directionnel */}
  <div
    className="absolute inset-0"
    style={{
      background: `linear-gradient(to bottom,
        rgba(8,14,26,0.65) 0%,
        rgba(8,14,26,0.25) 30%,
        rgba(8,14,26,0.25) 60%,
        rgba(8,14,26,0.90) 100%
      )`
    }}
  />

  {/* Teinte orange — identité de marque */}
  <div
    className="absolute inset-0"
    style={{ background: 'radial-gradient(ellipse at 75% 40%, rgba(234,88,12,0.14) 0%, transparent 55%)' }}
  />

  <div className="container mx-auto px-4 relative z-10">
    <div
      className="max-w-3xl mx-auto text-center flex flex-col items-center justify-center"
      style={{ minHeight: '60vh', paddingTop: '5rem', paddingBottom: '3rem' }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full border border-orange-500/30 backdrop-blur-sm"
        style={{ background: 'rgba(234,88,12,0.12)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
        <span className="text-orange-300 font-semibold text-[11px] tracking-widest font-syne uppercase">
          Portfolio — Ferronnerie & Mobilier
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-syne font-extrabold leading-[1.1] mb-4"
        style={{ fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
      >
        Nos{' '}
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(90deg, #fb923c, #fbbf24, #fde68a)' }}
        >
          Réalisations
        </span>
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-16 h-[3px] rounded-full mb-5 mx-auto"
        style={{ background: 'linear-gradient(90deg, #f97316, #fbbf24)' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-gray-200 text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
        style={{ textShadow: '0 1px 10px rgba(0,0,0,0.7)' }}
      >
        Chaque projet est une preuve de notre savoir-faire. Découvrez nos réalisations en{' '}
        <strong className="text-white font-semibold">ferronnerie, mobilier moderne et vitrines commerciales</strong>.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Link
          to="/demander-devis"
          className="group inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-xl"
          style={{ background: 'linear-gradient(90deg, #f97316, #f59e0b)' }}
        >
          Démarrer un projet
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        <a
          href="tel:+21600000000"
          className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105"
        >
          <Phone size={15} /> Nous appeler
        </a>
      </motion.div>
    </div>
  </div>

  {/* Wave de transition */}
  <div className="absolute bottom-0 left-0 right-0" style={{ color: '#0f172a' }}>
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-10 md:h-14">
      <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
    </svg>
  </div>
</section>

      {/* ── STATS ─────────────────────────────────────────────────────────── */}
      <section className="py-10 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="text-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:scale-105 transition-transform"
              >
                <div className={`text-3xl font-extrabold font-syne ${s.color}`}>{s.val}</div>
                <div className="text-gray-400 text-xs mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER + GRID ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4">

          {/* Filter bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-1.5 text-gray-500 text-sm mr-2">
              <Filter size={14} /> Filtrer :
            </div>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105
                  ${activeFilter === cat
                    ? 'bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-900/20'
                    : 'bg-white/5 border-white/15 text-gray-400 hover:border-orange-500/40 hover:text-orange-300'
                  }`}
              >
                {cat}
                {cat !== 'Tous' && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({projects.filter(p => p.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Count */}
          <p className="text-center text-gray-500 text-sm mb-8">
            {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 size={36} className="text-orange-400 animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {filtered.map(project => (
                  <ProjectCard key={project._id || project.id} project={project} onClick={setSelected} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── AVIS GLOBAUX ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-semibold">
              <Star size={15} className="fill-amber-300" /> Témoignages clients
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white font-syne">
              Ce que disent nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">clients</span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {projects.slice(0, 3).map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  <Quote size={18} className="text-orange-400 mr-1" />
                  <StarRating rating={p.client.rating} />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic mb-5 line-clamp-4">
                  "{p.client.review}"
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {p.client.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{p.client.name}</p>
                    <p className="text-gray-500 text-xs">{p.client.role}</p>
                    <p className="text-orange-400 text-xs mt-0.5">— {p.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(249,115,22,0.3) 0%, transparent 50%)`
        }} />
        <div className="absolute w-96 h-96 bg-orange-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
              🚀 Votre projet, notre prochain chef-d'œuvre
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
              Confiez-nous votre projet
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Chaque réalisation commence par une conversation. Contactez-nous pour un devis gratuit, sans engagement.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/demander-devis" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl">
                Demander un devis gratuit <ArrowRight size={18} />
              </Link>
              <Link to="/ferronnerie" className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white px-8 py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
                Voir nos services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MODAL ─────────────────────────────────────────────────────────── */}
      <Modal project={selected} onClose={() => setSelected(null)} />
    </>
  );
};

export default FerronnerieProjets;