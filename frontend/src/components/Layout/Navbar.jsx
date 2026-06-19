import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ferme les menus au changement de route
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  // Bloque le scroll du body quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Plus', path: '/plus', hasDropdown: true },
    { name: 'Réalisations', path: '/realisations' },
    { name: 'Tarifs', path: '/tarifs' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const servicesDropdown = [
    { name: 'Réseau & Infrastructure', path: '/services/reseau-infrastructure' },
    { name: 'Sécurité', path: '/services/securite' },
    { name: 'Développement Digital', path: '/services/developpement-digital' },
    { name: 'Cloud & Hébergement', path: '/services/cloud-hebergement' },
    { name: 'Énergie & Équipements', path: '/services/energie-equipements' },
    { name: 'Vente de Matériel', path: '/services/vente-materiel' },
    { name: 'Formation', path: '/services/formation' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/98 backdrop-blur-xl shadow-lg shadow-black/30 border-b border-white/10 py-3'
          : 'bg-slate-950/80 backdrop-blur-md py-4'
      }`}
      style={{
        paddingLeft:  'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
        paddingTop:   isScrolled
          ? 'max(0.75rem, env(safe-area-inset-top))'
          : 'max(1rem, env(safe-area-inset-top))',
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/30 group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-xl">O</span>
          </div>
          <div>
            <span className="font-bold text-xl text-white tracking-tight font-syne">
              Omedev
            </span>
            <p className="text-[9px] text-blue-400 -mt-0.5 tracking-widest uppercase">Services</p>
          </div>
        </Link>

        {/* ── Desktop Navigation ── */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              {link.hasDropdown ? (
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="flex items-center gap-1 text-gray-300 hover:text-white font-medium transition-colors py-2 text-sm"
                >
                  {link.name}
                  <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`text-sm font-medium transition-colors py-2 ${
                    isActive(link.path)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown desktop */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-xl shadow-black/40 py-2 z-50"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {servicesDropdown.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors rounded-lg mx-1"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}

          <Link
            to="/login"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-900/30"
          >
            <User className="w-3.5 h-3.5" />
            Espace client
          </Link>
        </div>

        {/* ── Bouton hamburger mobile ── */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2.5 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          style={{ touchAction: 'manipulation' }}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Menu Mobile ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="lg:hidden fixed inset-0 top-0 bg-slate-950/98 backdrop-blur-xl z-40 overflow-y-auto"
            style={{
              paddingTop: 'max(5rem, calc(env(safe-area-inset-top) + 5rem))',
              paddingBottom: 'max(2rem, env(safe-area-inset-bottom))',
              paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
              paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
            }}
          >
            {/* Bouton fermeture en haut à droite */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              style={{
                top: 'max(1rem, env(safe-area-inset-top))',
                touchAction: 'manipulation',
              }}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Logo dans le menu mobile */}
            <div className="mb-8 flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="font-bold text-xl text-white font-syne">Omedev</span>
            </div>

            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex justify-between items-center w-full text-left py-3.5 px-4 rounded-xl text-gray-200 hover:text-white hover:bg-white/8 font-medium text-base transition-all"
                        style={{ touchAction: 'manipulation' }}
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-5 h-5 text-blue-400 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pb-2 space-y-1 border-l border-blue-500/30 ml-4 mt-1">
                              {servicesDropdown.map((service) => (
                                <Link
                                  key={service.path}
                                  to={service.path}
                                  className="block py-2.5 px-3 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {service.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-3.5 px-4 rounded-xl font-medium text-base transition-all ${
                        isActive(link.path)
                          ? 'text-blue-400 bg-blue-500/10'
                          : 'text-gray-200 hover:text-white hover:bg-white/8'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-white/10 mt-4">
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3.5 rounded-xl font-semibold text-base transition-all hover:from-blue-700 hover:to-blue-600 shadow-lg shadow-blue-900/30 w-full"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Espace client
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;