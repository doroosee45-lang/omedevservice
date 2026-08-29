// ==================== Admin Design System ====================
// Système de composants réutilisables pour toutes les pages `pages/Admin/*`.
// Basé sur le Design System de la page Home (frontend/src/pages/Home.jsx) :
// mêmes tokens de couleur (navy/blue/turquoise/energy), même typographie
// (Syne pour les titres, DM Sans pour le corps), mêmes rayons/ombres/transitions.
// L'admin étant un back-office (contenu dense, toujours sombre), il reprend
// le registre "sombre" de Home (celui de `.omedev-dark-section` / hero / CTA)
// comme fond permanent de l'application, avec des cartes vitrées (glass)
// comme équivalent admin de `.card-hover`.
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Loader2, ChevronLeft, ChevronRight, Search, Inbox, ArrowUp, ArrowDown,
} from 'lucide-react';

/* ─────────────────────────────────────────────
   TOKENS — identiques à Home
   ───────────────────────────────────────────── */
export const adminColors = {
  navy: '#053876',
  blueDark: '#1D5B9B',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  cyan: '#72A5CE',
  cyanLight: '#A6C3D7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
  white: '#F6F6F7',
  dark: '#0B1213',
};

// Dégradés prêts à l'emploi pour icônes de stats / badges — même famille que Home.
export const adminGradients = {
  blue: 'from-[#0B74C1] to-[#1D5B9B]',
  teal: 'from-[#2AACB2] to-[#0B74C1]',
  energy: 'from-[#55DDB5] to-[#2AACB2]',
  navy: 'from-[#4681B7] to-[#053876]',
  purple: 'from-purple-500 to-indigo-500',
  red: 'from-red-500 to-red-600',
  amber: 'from-amber-500 to-orange-500',
  gray: 'from-gray-500 to-gray-600',
};

/* ─────────────────────────────────────────────
   CSS GLOBAL — à injecter une seule fois (AdminLayout)
   Reprend le vocabulaire de `.omedev-home` : mêmes rayons (12px boutons,
   18px cartes), mêmes ombres teintées navy/turquoise, même easing de
   transition, même dégradé `.omedev-dark-section` comme fond d'app.
   ───────────────────────────────────────────── */
export const adminGlobalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-admin {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-dark: #0B1213;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
    color: #F6F6F7;
    min-height: 100vh;
  }

  .omedev-admin .font-syne { font-family: 'Syne', sans-serif; }

  .omedev-admin .admin-page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -.02em;
    color: #fff;
  }

  .omedev-admin .admin-divider {
    width: 48px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
  }

  /* Cartes vitrées — équivalent sombre de .card-hover */
  .omedev-admin .admin-card {
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 18px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease, background .35s ease;
  }
  .omedev-admin .admin-card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(5,56,118,.35);
    border-color: rgba(42,172,178,.45);
    background: rgba(255,255,255,.08);
  }

  /* Boutons */
  .omedev-admin .admin-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    font-weight: 600;
    font-size: .875rem;
    padding: .65rem 1.25rem;
    border-radius: 12px;
    transition: all .25s ease;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .omedev-admin .admin-btn:disabled { opacity: .5; cursor: not-allowed; }
  .omedev-admin .admin-btn-primary {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(11,116,193,.25);
  }
  .omedev-admin .admin-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(42,172,178,.35);
  }
  .omedev-admin .admin-btn-outline {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.18);
    color: #fff;
  }
  .omedev-admin .admin-btn-outline:hover:not(:disabled) {
    border-color: #2AACB2;
    background: rgba(85,221,181,.10);
    transform: translateY(-2px);
  }
  .omedev-admin .admin-btn-danger {
    background: rgba(239,68,68,.12);
    border-color: rgba(239,68,68,.35);
    color: #f87171;
  }
  .omedev-admin .admin-btn-danger:hover:not(:disabled) {
    background: rgba(239,68,68,.22);
    border-color: rgba(239,68,68,.55);
  }
  .omedev-admin .admin-btn-ghost {
    background: transparent;
    color: rgba(255,255,255,.6);
  }
  .omedev-admin .admin-btn-ghost:hover:not(:disabled) {
    background: rgba(255,255,255,.08);
    color: #fff;
  }
  .omedev-admin .admin-btn-sm { padding: .45rem .9rem; font-size: .8rem; border-radius: 10px; }

  /* Champs de formulaire */
  .omedev-admin .admin-input,
  .omedev-admin .admin-select,
  .omedev-admin .admin-textarea {
    width: 100%;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    padding: .65rem 1rem;
    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
  }
  .omedev-admin .admin-input::placeholder,
  .omedev-admin .admin-textarea::placeholder { color: rgba(255,255,255,.4); }
  .omedev-admin .admin-input:focus,
  .omedev-admin .admin-select:focus,
  .omedev-admin .admin-textarea:focus {
    outline: none;
    border-color: #2AACB2;
    background: rgba(255,255,255,.10);
    box-shadow: 0 0 0 3px rgba(42,172,178,.15);
  }
  .omedev-admin .admin-select option { background: #0B1F3D; color: #fff; }

  /* Badges / statuts */
  .omedev-admin .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .03em;
    padding: .3rem .7rem;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  /* Tableaux */
  .omedev-admin .admin-table { width: 100%; border-collapse: collapse; }
  .omedev-admin .admin-table thead th {
    text-align: left;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: rgba(255,255,255,.45);
    padding: .85rem 1.1rem;
    border-bottom: 1px solid rgba(255,255,255,.10);
  }
  .omedev-admin .admin-table tbody td {
    padding: .9rem 1.1rem;
    border-bottom: 1px solid rgba(255,255,255,.06);
    color: #fff;
    font-size: .875rem;
  }
  .omedev-admin .admin-table tbody tr {
    transition: background .2s ease;
  }
  .omedev-admin .admin-table tbody tr:hover {
    background: rgba(255,255,255,.04);
  }

  /* Modale */
  .omedev-admin .admin-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,10,25,.65);
    backdrop-filter: blur(4px);
    z-index: 50;
  }
  .omedev-admin .admin-modal-panel {
    background: linear-gradient(160deg, #1D5B9B 0%, #053876 70%, #0B1213 100%);
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 20px;
    box-shadow: 0 30px 80px rgba(5,56,118,.55);
  }

  /* Scrollbar (cohérente avec index.css) */
  .omedev-admin ::-webkit-scrollbar { width: 6px; height: 6px; }
  .omedev-admin ::-webkit-scrollbar-track { background: transparent; }
  .omedev-admin ::-webkit-scrollbar-thumb {
    background: rgba(85,221,181,.35);
    border-radius: 99px;
  }

  @media (max-width: 640px) {
    .omedev-admin .admin-table thead th,
    .omedev-admin .admin-table tbody td { padding: .65rem .75rem; font-size: .8rem; }
  }
`;

/* ─────────────────────────────────────────────
   ANIMATIONS — mêmes courbes que Home
   ───────────────────────────────────────────── */
export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.68, 0, 1] } },
};
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* ─────────────────────────────────────────────
   COMPOSANTS
   ───────────────────────────────────────────── */

export const PageHeader = ({ title, subtitle, actions }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
  >
    <div>
      <h1 className="admin-page-title text-2xl md:text-3xl">{title}</h1>
      {subtitle && <p className="text-white/50 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </motion.div>
);

export const Card = ({ children, hover = false, className = '', ...rest }) => (
  <div className={`admin-card ${hover ? 'admin-card-hover' : ''} ${className}`} {...rest}>
    {children}
  </div>
);

export const Button = ({
  variant = 'primary', size = 'md', icon: Icon, iconPosition = 'left',
  className = '', children, ...rest
}) => (
  <button
    className={`admin-btn admin-btn-${variant} ${size === 'sm' ? 'admin-btn-sm' : ''} ${className}`}
    {...rest}
  >
    {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
    {children}
    {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
  </button>
);

const badgeVariantClasses = {
  blue:    'bg-blue-500/15 text-blue-300 border-blue-500/30',
  teal:    'bg-[#2AACB2]/15 text-[#55DDB5] border-[#2AACB2]/30',
  energy:  'bg-[#55DDB5]/15 text-[#55DDB5] border-[#55DDB5]/30',
  purple:  'bg-purple-500/15 text-purple-300 border-purple-500/30',
  red:     'bg-red-500/15 text-red-400 border-red-500/30',
  amber:   'bg-amber-500/15 text-amber-400 border-amber-500/30',
  gray:    'bg-white/10 text-white/60 border-white/15',
};

export const Badge = ({ variant = 'gray', icon: Icon, children, className = '' }) => (
  <span className={`admin-badge ${badgeVariantClasses[variant] || badgeVariantClasses.gray} ${className}`}>
    {Icon && <Icon className="w-3 h-3" />}
    {children}
  </span>
);

export const StatCard = ({ icon: Icon, label, value, trend, trendValue, badge, gradient = 'blue', sub }) => (
  <motion.div variants={fadeUp} className="admin-card admin-card-hover p-6 relative overflow-hidden">
    {badge !== undefined && badge > 0 && (
      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
    <div className="flex items-center justify-between mb-4">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${adminGradients[gradient] || adminGradients.blue} flex items-center justify-center shadow-lg`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-[#55DDB5]' : 'text-red-400'}`}>
          {trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          <span>{trendValue}%</span>
        </div>
      )}
    </div>
    <div className="text-2xl font-bold text-white font-syne">{value}</div>
    <div className="text-white/50 text-sm mt-1">{label}</div>
    {sub && <div className="text-[#55DDB5] text-xs mt-1 font-medium">{sub}</div>}
  </motion.div>
);

export const EmptyState = ({ icon: Icon = Inbox, title = 'Aucun résultat', description, action }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="admin-card text-center py-16 px-6"
  >
    <Icon className="w-14 h-14 text-white/20 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-white font-syne">{title}</h3>
    {description && <p className="text-white/40 mt-1 text-sm max-w-sm mx-auto">{description}</p>}
    {action && <div className="mt-5">{action}</div>}
  </motion.div>
);

export const LoadingState = ({ label = 'Chargement…' }) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-white/50">
    <Loader2 className="w-8 h-8 text-[#2AACB2] animate-spin" />
    {label && <span className="text-sm">{label}</span>}
  </div>
);

export const SearchInput = ({ value, onChange, placeholder = 'Rechercher…', className = '' }) => (
  <div className={`relative flex-1 ${className}`}>
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="admin-input"
      style={{ paddingLeft: '2.75rem' }}
    />
  </div>
);

export const Select = ({ value, onChange, children, className = '' }) => (
  <select value={value} onChange={onChange} className={`admin-select ${className}`}>
    {children}
  </select>
);

export const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between pt-6 border-t border-white/10"
    >
      <Button variant="ghost" size="sm" icon={ChevronLeft} disabled={page === 1} onClick={() => onChange(Math.max(1, page - 1))}>
        Précédent
      </Button>
      <span className="text-sm text-white/50">Page {page} sur {totalPages}</span>
      <Button variant="ghost" size="sm" icon={ChevronRight} iconPosition="right" disabled={page === totalPages} onClick={() => onChange(Math.min(totalPages, page + 1))}>
        Suivant
      </Button>
    </motion.div>
  );
};

export const Modal = ({ open = true, onClose, title, children, footer, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose?.();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="admin-modal-overlay flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`admin-modal-panel w-full ${maxWidth} max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h2 className="text-lg font-bold text-white font-syne">{title}</h2>
                {onClose && (
                  <button onClick={onClose} className="text-white/50 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}
            <div className="p-6">{children}</div>
            {footer && <div className="flex gap-3 px-6 pb-6">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const Tabs = ({ tabs, active, onChange }) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tabs.map((tab) => {
      const isActive = tab.key === active;
      const Icon = tab.icon;
      return (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
            isActive
              ? 'bg-[#2AACB2]/15 text-[#55DDB5] border-[#2AACB2]/30'
              : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white'
          }`}
        >
          {Icon && <Icon className="w-4 h-4" />}
          {tab.label}
          {tab.count !== undefined && (
            <span className="text-xs opacity-70">({tab.count})</span>
          )}
        </button>
      );
    })}
  </div>
);
