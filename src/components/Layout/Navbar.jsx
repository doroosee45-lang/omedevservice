import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Gestion du scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer les menus quand on change de page
  useEffect(() => {
    setIsOpen(false);
    setServicesOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
      { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', },
    { name: 'Solutions', path: '/solutions' },
  
    { name: 'plus', path: '/plus', hasDropdown: true },
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

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 px-[3px] ${isScrolled
      ? 'bg-white/95 backdrop-blur-xl shadow-lg py-3 border-b border-gray-100'
      : 'bg-white/90 backdrop-blur-md py-5'
      }`}>
      <div className="w-full flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-2xl">O</span>
          </div>
          <div>
            <span className="font-bold text-2xl text-gray-900 tracking-tight">
              OMDEVE <span className="text-primary-600">Services</span>
            </span>
            <p className="text-[10px] text-gray-500 -mt-1 tracking-widest">SOLUTIONS IT & ÉNERGIE</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.path} className="relative group">
              {link.hasDropdown ? (
                <button
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                  className="flex items-center gap-1 text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                >
                  {link.name}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors py-2"
                >
                  {link.name}
                </Link>
              )}

              {/* Dropdown Menu */}
              {link.hasDropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {servicesDropdown.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="block px-6 py-2.5 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
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

          {/* Actions */}
          <div className="flex items-center">
            <Link
              to="/login"
              className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl"
            >
              <User className="w-4 h-4" />
              Espace client
            </Link>
          </div>


        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-3 text-gray-700 hover:text-primary-600 transition-colors"
          aria-label="Menu"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden mt-6 overflow-hidden border-t border-gray-100"
          >
            <div className="flex flex-col space-y-1 py-6">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex justify-between items-center w-full text-left py-3 text-gray-700 hover:text-primary-600 font-medium"
                      >
                        <span>{link.name}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {servicesOpen && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pl-6 space-y-2 py-2"
                          >
                            {servicesDropdown.map((service) => (
                              <Link
                                key={service.path}
                                to={service.path}
                                className="block py-2 text-gray-600 hover:text-primary-600 transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className="block py-3 text-gray-700 hover:text-primary-600 font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="flex items-center">
                <Link
                  to="/login"
                  className="btn-primary flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl"
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