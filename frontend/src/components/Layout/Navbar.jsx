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

  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
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

  const navBg = isScrolled
    ? 'bg-slate-950 shadow-lg shadow-black/40 border-b border-white/8'
    : 'bg-slate-950/85 backdrop-blur-md';

  return (
    <>
      {/* -- Barre de navigation fixe -- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
        {/* Spacer notch iOS / Android */}
        <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />

        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 lg:py-4">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl leading-none">O</span>
            </div>
            <div className="leading-tight">
              <div className="font-bold text-lg text-white tracking-tight font-syne">Omedev</div>
              <div className="text-[9px] text-blue-400 tracking-widest uppercase leading-none">Services</div>
            </div>
          </Link>

          {/* Navigation desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const linkClass = isActive(link.path)
                ? 'text-sm font-medium py-2 text-blue-400'
                : 'text-sm font-medium py-2 text-gray-300 hover:text-white transition-colors';
              return (
                <div key={link.path} className="relative group">
                  {link.hasDropdown ? (
                    <button
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                      className="flex items-center gap-1 text-gray-300 hover:text-white font-medium text-sm transition-colors py-2"
                    >
                      {link.name}
                      <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                    </button>
                  ) : (
                    <Link to={link.path} className={linkClass}>
                      {link.name}
                    </Link>
                  )}

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-60 bg-slate-900 border border-white/10 rounded-2xl shadow-xl shadow-black/50 py-2 z-50"
                          onMouseEnter={() => setServicesOpen(true)}
                          onMouseLeave={() => setServicesOpen(false)}
                        >
                          {servicesDropdown.map((s) => (
                            <Link
                              key={s.path}
                              to={s.path}
                              className="block px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}

            <Link
              to="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl font-semibold text-sm transition-all"
            >
              <User className="w-3.5 h-3.5" />
              Espace client
            </Link>
          </div>

          {/* Bouton hamburger — toujours visible sur mobile */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
            aria-label="Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* -- Menu mobile (en dehors du nav pour éviter le bug backdrop-filter) -- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-slate-950 overflow-y-auto lg:hidden"
            style={{ paddingBottom: 'env(safe-area-inset-bottom, 1.5rem)' }}
          >
            {/* En-tête */}
            <div
              className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/8"
              style={{ paddingTop: 'max(0.75rem, env(safe-area-inset-top, 0px))' }}
            >
              <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl leading-none">O</span>
                </div>
                <span className="font-bold text-lg text-white font-syne">Omedev</span>
              </Link>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-white bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Fermer"
              >
                <X size={22} />
              </button>
            </div>

            {/* Liens */}
            <div className="px-4 sm:px-6 pt-4 pb-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const activeLinkClass = isActive(link.path)
                  ? 'block py-3.5 px-4 rounded-xl font-medium text-base text-blue-400 bg-blue-500/10'
                  : 'block py-3.5 px-4 rounded-xl font-medium text-base text-gray-200 hover:text-white hover:bg-white/5 transition-colors';
                return (
                  <div key={link.path}>
                    {link.hasDropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          className="flex justify-between items-center w-full py-3.5 px-4 rounded-xl text-gray-200 hover:text-white hover:bg-white/5 font-medium text-base transition-colors"
                        >
                          {link.name}
                          <ChevronDown
                            className="w-5 h-5 text-blue-400 transition-transform duration-200"
                            style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        <AnimatePresence>
                          {servicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden ml-4 border-l border-blue-500/30 pl-4 mb-1"
                            >
                              {servicesDropdown.map((s) => (
                                <Link
                                  key={s.path}
                                  to={s.path}
                                  onClick={() => setIsOpen(false)}
                                  className="block py-3 text-gray-400 hover:text-white text-sm transition-colors"
                                >
                                  {s.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={activeLinkClass}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="mt-4 pt-4 border-t border-white/10">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold text-base w-full transition-all"
                >
                  <User className="w-4 h-4" />
                  Espace client
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
