


// import { motion, useInView } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import { useRef, useEffect, useState } from 'react';
// import {
//   ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
//   CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
//   Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
//   ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
//   Lock, AlertTriangle, BarChart3, Mail, ShoppingBag, Database,
//   Network, Eye, Fingerprint, Sun, Battery, Headphones, BookOpen
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

//   @keyframes float {
//     0%, 100% { transform: translateY(0px); }
//     50% { transform: translateY(-20px); }
//   }
  
//   @keyframes pulse-ring {
//     0% { transform: scale(0.8); opacity: 1; }
//     70% { transform: scale(1.3); opacity: 0; }
//     100% { transform: scale(0.8); opacity: 0; }
//   }
  
//   .animate-float { animation: float 6s ease-in-out infinite; }
//   .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
// `;

// const fadeUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
// };
// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
// };

// // Données des services par catégorie
// const serviceCategories = [
//   {
//     id: 'reseau',
//     name: 'Réseau & Infrastructure',
//     icon: Network,
//     color: 'blue',
//     gradient: 'from-blue-500 to-blue-600',
//     bgLight: 'bg-blue-500/10',
//     textLight: 'text-blue-400',
//     borderLight: 'border-blue-500/30',
//     description: 'Des infrastructures réseau robustes et performantes pour connecter votre entreprise',
//     services: [
//       { name: 'Câblage structuré', description: 'Installation de câblage cuivre et fibre optique pour une infrastructure réseau fiable', price: 'Sur devis' },
//       { name: 'WiFi entreprise', description: 'Solutions WiFi haute performance pour PME, grandes surfaces et espaces ouverts', price: 'Sur devis' },
//       { name: 'Fibre optique', description: 'Déploiement de réseaux fibre optique pour une connectique ultra-rapide', price: 'Sur devis' },
//       { name: 'Infrastructure réseau', description: 'Conception et déploiement d\'infrastructures réseau complètes', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'securite',
//     name: 'Sécurité & Surveillance',
//     icon: Shield,
//     color: 'cyan',
//     gradient: 'from-cyan-500 to-cyan-600',
//     bgLight: 'bg-cyan-500/10',
//     textLight: 'text-cyan-400',
//     borderLight: 'border-cyan-500/30',
//     description: 'Protection avancée de vos données et surveillance intelligente de vos sites',
//     services: [
//       { name: 'Cybersécurité', description: 'Protection avancée contre les cyberattaques et les intrusions', price: 'Sur devis' },
//       { name: 'Vidéosurveillance', description: 'Caméras IP, PTZ, enregistrement cloud et monitoring 24/7', price: 'Sur devis' },
//       { name: 'Audit de sécurité', description: 'Analyse complète de vos vulnérabilités et recommandations', price: 'Sur devis' },
//       { name: "Contrôle d'accès", description: 'Systèmes biométriques, badgeuses et gestion d\'accès', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'developpement',
//     name: 'Développement Digital',
//     icon: Code,
//     color: 'amber',
//     gradient: 'from-amber-500 to-amber-600',
//     bgLight: 'bg-amber-500/10',
//     textLight: 'text-amber-400',
//     borderLight: 'border-amber-500/30',
//     description: 'Des solutions digitales sur mesure pour booster votre activité',
//     services: [
//       { name: 'Sites web & e-commerce', description: 'Création de sites vitrine, boutiques en ligne sur mesure', price: 'Sur devis' },
//       { name: 'Applications mobiles', description: 'Développement iOS/Android, React Native, Flutter', price: 'Sur devis' },
//       { name: 'ERP sur mesure', description: 'Solutions ERP adaptées à votre secteur d\'activité', price: 'Sur devis' },
//       { name: 'API & intégrations', description: 'Création d\'API REST et intégration de services tiers', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'cloud',
//     name: 'Cloud & Hébergement',
//     icon: Cloud,
//     color: 'blue',
//     gradient: 'from-blue-500 to-blue-600',
//     bgLight: 'bg-blue-500/10',
//     textLight: 'text-blue-400',
//     borderLight: 'border-blue-500/30',
//     description: 'Infrastructures cloud scalable et sécurisées pour votre entreprise',
//     services: [
//       { name: 'Hébergement cloud', description: 'Hébergement sécurisé haute disponibilité 99.9% uptime', price: 'Sur devis' },
//       { name: 'Migration cloud', description: 'Migration de vos infrastructures vers le cloud', price: 'Sur devis' },
//       { name: 'DevOps', description: 'CI/CD, conteneurisation Docker, orchestration Kubernetes', price: 'Sur devis' },
//       { name: 'SaaS personnalisé', description: 'Développement de solutions SaaS clé en main', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'energie',
//     name: 'Énergie & Équipements',
//     icon: Sun,
//     color: 'orange',
//     gradient: 'from-orange-500 to-orange-600',
//     bgLight: 'bg-orange-500/10',
//     textLight: 'text-orange-400',
//     borderLight: 'border-orange-500/30',
//     description: 'Solutions énergétiques durables et équipements haute performance',
//     services: [
//       { name: 'Panneaux solaires', description: 'Installation de systèmes photovoltaïques pour entreprises', price: 'Sur devis' },
//       { name: 'Climatisation', description: 'Solutions de climatisation pour bureaux et data centers', price: 'Sur devis' },
//       { name: 'Onduleurs & UPS', description: 'Protection électrique et alimentation de secours', price: 'Sur devis' },
//       { name: 'Maintenance énergétique', description: 'Contrats de maintenance préventive et corrective', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'materiel',
//     name: 'Vente de Matériel',
//     icon: Monitor,
//     color: 'purple',
//     gradient: 'from-purple-500 to-purple-600',
//     bgLight: 'bg-purple-500/10',
//     textLight: 'text-purple-400',
//     borderLight: 'border-purple-500/30',
//     description: 'Matériel IT professionnel des meilleures marques',
//     services: [
//       { name: 'Ordinateurs & serveurs', description: 'PC, laptops, serveurs haute performance', price: 'Sur devis' },
//       { name: 'Équipements réseau', description: 'Switches, routeurs, firewalls, access points', price: 'Sur devis' },
//       { name: 'Caméras de surveillance', description: 'Caméras IP, 4K, PTZ avec IA intégrée', price: 'Sur devis' },
//       { name: 'Accessoires IT', description: 'Écrans, périphériques, câblage, connectiques', price: 'Sur devis' },
//     ]
//   },
//   {
//     id: 'formation',
//     name: 'Formation & Accompagnement',
//     icon: BookOpen,
//     color: 'green',
//     gradient: 'from-green-500 to-green-600',
//     bgLight: 'bg-green-500/10',
//     textLight: 'text-green-400',
//     borderLight: 'border-green-500/30',
//     description: 'Formation et support pour maîtriser vos outils digitaux',
//     services: [
//       { name: 'Formation IT', description: 'Formations certifiantes en développement, réseau, sécurité', price: 'Sur devis' },
//       { name: 'Support technique', description: 'Assistance technique réactive 24/7', price: 'Sur devis' },
//       { name: 'Accompagnement digital', description: 'Conseil et accompagnement dans votre transformation digitale', price: 'Sur devis' },
//       { name: 'Maintenance', description: 'Contrats de maintenance pour vos équipements et logiciels', price: 'Sur devis' },
//     ]
//   }
// ];

// const ServiceCard = ({ service, gradient, index }) => {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay: index * 0.05 }}
//       className="group bg-white/5 border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10 cursor-pointer"
//     >
//       <div className="flex justify-between items-start mb-4">
//         <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
//           <CheckCircle size={22} className="text-white" />
//         </div>
//         <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">{service.price}</span>
//       </div>
//       <h3 className="text-xl font-bold text-white mb-2 font-syne group-hover:text-blue-300 transition-colors">{service.name}</h3>
//       <p className="text-gray-400 text-sm leading-relaxed mb-5 group-hover:text-gray-300 transition-colors">{service.description}</p>
//       <Link
//         to="/demander-devis"
//         className="inline-flex items-center gap-2 text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-all group-hover:gap-3"
//       >
//         Demander un devis <ArrowRight size={14} />
//       </Link>
//     </motion.div>
//   );
// };

// const CategorySection = ({ category, index }) => {
//   return (
//     <section className="py-16 border-b border-white/10 last:border-0">
//       <div className="container mx-auto px-4">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: index * 0.1 }}
//           className="mb-10"
//         >
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
//             <div className="flex items-center gap-4">
//               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${category.bgLight} ${category.textLight} transition-all duration-300 hover:scale-110`}>
//                 <category.icon size={28} />
//               </div>
//               <div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-white font-syne">{category.name}</h2>
//                 <div className={`w-12 h-0.5 bg-gradient-to-r ${category.gradient} rounded-full mt-2`} />
//               </div>
//             </div>
//             <span className="text-sm text-gray-500">4 services disponibles</span>
//           </div>
//           <p className="text-gray-400 text-base max-w-3xl">{category.description}</p>
//         </motion.div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {category.services.map((service, idx) => (
//             <ServiceCard key={idx} service={service} gradient={category.gradient} index={idx} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// const ServicesPage = () => {
//   return (
//     <>
//       <style>{globalStyles}</style>

//       {/* Hero Section */}
//      {/* ==================== HERO SECTION - SERVICES ==================== */}
//  <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-28 pb-16">
//   <div className="absolute inset-0 opacity-20" style={{
//     backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
//                       linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
//     backgroundSize: '60px 60px'
//   }} />
//   {/* Image d'arrière-plan avec overlay */}
//    <div className="absolute inset-0 overflow-hidden">
//     <div
//       className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
//       style={{
//         backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')`
//       }}
//     />
//     <div className="absolute inset-0 bg-black/65"></div>
//   </div>

//   <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#3b82f645_0%,transparent_65%)]" />
  
//   <div className="absolute w-80 h-80 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
//   <div className="absolute w-64 h-64 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />
//   <div className="absolute w-40 h-40 bg-cyan-500/10 top-1/2 left-1/2 -translate-x-1/2 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '4s' }} />

//   <div className="container mx-auto px-4 relative z-10">
//      <div className="max-w-3xl mx-auto text-center">
//        <motion.div
//          initial={{ opacity: 0, scale: 0.9 }}
//          animate={{ opacity: 1, scale: 1 }}
//          transition={{ duration: 0.5 }}
//          className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
//        >
//          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
//          <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Expertise & innovations ?</span>
//        </motion.div>
 

//        <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
//             >
//         Nos{' '}
//         <span className="relative inline-block">
//           <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
//           <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
//             Services
//           </span>
//         </span>
//       </motion.h1>

//       <motion.div
//              initial={{ opacity: 0, scaleX: 0 }}
//              animate={{ opacity: 1, scaleX: 1 }}
//              transition={{ duration: 0.7, delay: 0.2 }}
//              className="w-20 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 rounded-full mx-auto mb-5"
//            />
     
//       <motion.p
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.3 }}
//               className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto"
//             >
//         Des solutions complètes pour la <strong className="text-white">transformation digitale</strong> de votre entreprise
//       </motion.p>

//        <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7, delay: 0.4 }}
//               className="flex flex-wrap gap-4 justify-center"
//             >
//         <Link to="/contact" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
//                  Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                </Link>
//                <Link to="/realisations" className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105">
//                  Voir nos réalisations <CheckCircle size={18} />
//                </Link>
//              </motion.div>
       
//              <motion.div
//                initial={{ opacity: 0 }}
//                animate={{ opacity: 1 }}
//                transition={{ duration: 0.7, delay: 0.6 }}
//                className="mt-12 flex justify-center"
//              >
//                <div className="animate-bounce">
//                  <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
//                    <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
//                  </div>
//                </div>
//              </motion.div>
//            </div>
//          </div>
       
//          <div className="absolute bottom-0 left-0 right-0 text-white/10">
//            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10">
//              <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor" />
//            </svg>
//          </div>
//        </section>
       
//       {/* Statistiques clés - Même fond que hero */}
//       <section className="py-12 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5 border-b border-white/5">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
//               <div className="text-3xl font-bold text-blue-400 font-syne">7+</div>
//               <div className="text-gray-400 text-sm">Catégories de services</div>
//             </div>
//             <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
//               <div className="text-3xl font-bold text-cyan-400 font-syne">28+</div>
//               <div className="text-gray-400 text-sm">Services proposés</div>
//             </div>
//             <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
//               <div className="text-3xl font-bold text-amber-400 font-syne">150+</div>
//               <div className="text-gray-400 text-sm">Clients satisfaits</div>
//             </div>
//             <div className="p-4 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 hover:scale-105 hover:bg-white/10">
//               <div className="text-3xl font-bold text-emerald-400 font-syne">24/7</div>
//               <div className="text-gray-400 text-sm">Support technique</div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Catégories de services - Même fond que hero */}
//       <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
//         <div className="container mx-auto px-4 py-8">
//           {/* Navigation rapide */}
//           <div className="flex flex-wrap justify-center gap-3 mb-12">
//             {serviceCategories.map((cat, idx) => (
//               <a
//                 key={idx}
//                 href={`#${cat.id}`}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${cat.bgLight} ${cat.textLight} border ${cat.borderLight} hover:scale-105 hover:brightness-110`}
//               >
//                 {cat.name}
//               </a>
//             ))}
//           </div>

//           {/* Sections des catégories */}
//           {serviceCategories.map((category, idx) => (
//             <div key={idx} id={category.id}>
//               <CategorySection category={category} index={idx} />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA Section - Même fond que hero */}
//       <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
//         <div className="absolute inset-0 opacity-20" style={{
//           backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59,130,246,0.3) 0%, transparent 50%)`
//         }} />
        
//         <div className="absolute w-96 h-96 bg-blue-600/20 bottom-0 left-1/2 -translate-x-1/2 rounded-full filter blur-[100px]" />
        
//         <div className="container mx-auto px-4 text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-6 text-amber-300 text-sm font-semibold">
//               <Rocket size={16} /> Besoin d'un service personnalisé ?
//             </div>
//             <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">Vous avez un projet spécifique ?</h2>
//             <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
//               Notre équipe d'experts est à votre écoute pour étudier votre besoin et vous proposer une solution sur mesure.
//             </p>
//             <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl">
//               Contactez-nous <ArrowRight size={18} />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ServicesPage;




import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import {
  ArrowRight, Server, Shield, Code, Cloud, Zap, GraduationCap,
  CheckCircle, Users, Clock, Award, Star, Quote, Briefcase, Globe,
  Cpu, Camera, Wifi, Wrench, Phone, ThermometerSun, Monitor,
  ChevronRight, Sparkles, TrendingUp, Rocket, TrendingDown, FileText,
  Lock, AlertTriangle, BarChart3, Mail, ShoppingBag, Database,
  Network, Eye, Fingerprint, Sun, Battery, Headphones, BookOpen
} from 'lucide-react';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #F8FAFF;
    color: #111827;
    overflow-x: hidden;
  }

  .font-syne { font-family: 'Syne', sans-serif; }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  @keyframes slow-zoom {
    0% { transform: scale(1); }
    100% { transform: scale(1.1); }
  }

  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
  .animate-slow-zoom { animation: slow-zoom 20s ease-out forwards; }

  /* Card service — thème clair */
  .service-card {
    background: #FFFFFF;
    border: 1px solid #E5E7EB;
    border-radius: 1.25rem;
    box-shadow: 0 2px 8px rgba(37,99,235,0.06), 0 1px 2px rgba(0,0,0,0.04);
    transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    cursor: pointer;
  }
  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(37,99,235,0.14);
    border-color: #BFDBFE;
  }

  /* Section category border */
  .category-section {
    border-bottom: 1px solid #E5E7EB;
  }
  .category-section:last-child {
    border-bottom: none;
  }

  /* Nav pill */
  .nav-pill {
    padding: 0.4rem 1rem;
    border-radius: 99px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1.5px solid;
    transition: all 0.2s ease;
    text-decoration: none;
    display: inline-block;
  }
  .nav-pill:hover {
    transform: scale(1.04);
    filter: brightness(1.06);
  }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

// Couleurs thème clair par catégorie
const categoryColors = {
  blue:   { pill: '#EFF6FF', pillText: '#1d4ed8', pillBorder: '#BFDBFE', iconBg: '#EFF6FF', iconText: '#2563eb', priceBg: '#EFF6FF', priceText: '#1d4ed8' },
  cyan:   { pill: '#ECFEFF', pillText: '#0e7490', pillBorder: '#A5F3FC', iconBg: '#ECFEFF', iconText: '#0891b2', priceBg: '#ECFEFF', priceText: '#0e7490' },
  amber:  { pill: '#FFFBEB', pillText: '#92400e', pillBorder: '#FDE68A', iconBg: '#FFFBEB', iconText: '#d97706', priceBg: '#FFFBEB', priceText: '#92400e' },
  orange: { pill: '#FFF7ED', pillText: '#9a3412', pillBorder: '#FED7AA', iconBg: '#FFF7ED', iconText: '#ea580c', priceBg: '#FFF7ED', priceText: '#9a3412' },
  purple: { pill: '#F5F3FF', pillText: '#5b21b6', pillBorder: '#DDD6FE', iconBg: '#F5F3FF', iconText: '#7c3aed', priceBg: '#F5F3FF', priceText: '#5b21b6' },
  green:  { pill: '#F0FDF4', pillText: '#14532d', pillBorder: '#BBF7D0', iconBg: '#F0FDF4', iconText: '#16a34a', priceBg: '#F0FDF4', priceText: '#14532d' },
};

const serviceCategories = [
  {
    id: 'reseau',
    name: 'Réseau & Infrastructure',
    icon: Network,
    color: 'blue',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    description: 'Des infrastructures réseau robustes et performantes pour connecter votre entreprise',
    services: [
      { name: 'Câblage structuré', description: 'Installation de câblage cuivre et fibre optique pour une infrastructure réseau fiable', price: 'Sur devis' },
      { name: 'WiFi entreprise', description: 'Solutions WiFi haute performance pour PME, grandes surfaces et espaces ouverts', price: 'Sur devis' },
      { name: 'Fibre optique', description: 'Déploiement de réseaux fibre optique pour une connectique ultra-rapide', price: 'Sur devis' },
      { name: 'Infrastructure réseau', description: "Conception et déploiement d'infrastructures réseau complètes", price: 'Sur devis' },
    ]
  },
  {
    id: 'securite',
    name: 'Sécurité & Surveillance',
    icon: Shield,
    color: 'cyan',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    description: 'Protection avancée de vos données et surveillance intelligente de vos sites',
    services: [
      { name: 'Cybersécurité', description: 'Protection avancée contre les cyberattaques et les intrusions', price: 'Sur devis' },
      { name: 'Vidéosurveillance', description: 'Caméras IP, PTZ, enregistrement cloud et monitoring 24/7', price: 'Sur devis' },
      { name: 'Audit de sécurité', description: 'Analyse complète de vos vulnérabilités et recommandations', price: 'Sur devis' },
      { name: "Contrôle d'accès", description: "Systèmes biométriques, badgeuses et gestion d'accès", price: 'Sur devis' },
    ]
  },
  {
    id: 'developpement',
    name: 'Développement Digital',
    icon: Code,
    color: 'amber',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    description: 'Des solutions digitales sur mesure pour booster votre activité',
    services: [
      { name: 'Sites web & e-commerce', description: 'Création de sites vitrine, boutiques en ligne sur mesure', price: 'Sur devis' },
      { name: 'Applications mobiles', description: 'Développement iOS/Android, React Native, Flutter', price: 'Sur devis' },
      { name: 'ERP sur mesure', description: "Solutions ERP adaptées à votre secteur d'activité", price: 'Sur devis' },
      { name: 'API & intégrations', description: 'Création d\'API REST et intégration de services tiers', price: 'Sur devis' },
    ]
  },
  {
    id: 'cloud',
    name: 'Cloud & Hébergement',
    icon: Cloud,
    color: 'blue',
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    description: 'Infrastructures cloud scalables et sécurisées pour votre entreprise',
    services: [
      { name: 'Hébergement cloud', description: 'Hébergement sécurisé haute disponibilité 99.9% uptime', price: 'Sur devis' },
      { name: 'Migration cloud', description: 'Migration de vos infrastructures vers le cloud', price: 'Sur devis' },
      { name: 'DevOps', description: 'CI/CD, conteneurisation Docker, orchestration Kubernetes', price: 'Sur devis' },
      { name: 'SaaS personnalisé', description: 'Développement de solutions SaaS clé en main', price: 'Sur devis' },
    ]
  },
  {
    id: 'energie',
    name: 'Énergie & Équipements',
    icon: Sun,
    color: 'orange',
    gradient: 'linear-gradient(135deg, #f97316, #ea580c)',
    description: 'Solutions énergétiques durables et équipements haute performance',
    services: [
      { name: 'Panneaux solaires', description: 'Installation de systèmes photovoltaïques pour entreprises', price: 'Sur devis' },
      { name: 'Climatisation', description: 'Solutions de climatisation pour bureaux et data centers', price: 'Sur devis' },
      { name: 'Onduleurs & UPS', description: 'Protection électrique et alimentation de secours', price: 'Sur devis' },
      { name: 'Maintenance énergétique', description: 'Contrats de maintenance préventive et corrective', price: 'Sur devis' },
    ]
  },
  {
    id: 'materiel',
    name: 'Vente de Matériel',
    icon: Monitor,
    color: 'purple',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    description: 'Matériel IT professionnel des meilleures marques',
    services: [
      { name: 'Ordinateurs & serveurs', description: 'PC, laptops, serveurs haute performance', price: 'Sur devis' },
      { name: 'Équipements réseau', description: 'Switches, routeurs, firewalls, access points', price: 'Sur devis' },
      { name: 'Caméras de surveillance', description: 'Caméras IP, 4K, PTZ avec IA intégrée', price: 'Sur devis' },
      { name: 'Accessoires IT', description: 'Écrans, périphériques, câblage, connectiques', price: 'Sur devis' },
    ]
  },
  {
    id: 'formation',
    name: 'Formation & Accompagnement',
    icon: BookOpen,
    color: 'green',
    gradient: 'linear-gradient(135deg, #22c55e, #16a34a)',
    description: 'Formation et support pour maîtriser vos outils digitaux',
    services: [
      { name: 'Formation IT', description: 'Formations certifiantes en développement, réseau, sécurité', price: 'Sur devis' },
      { name: 'Support technique', description: 'Assistance technique réactive 24/7', price: 'Sur devis' },
      { name: 'Accompagnement digital', description: 'Conseil et accompagnement dans votre transformation digitale', price: 'Sur devis' },
      { name: 'Maintenance', description: 'Contrats de maintenance pour vos équipements et logiciels', price: 'Sur devis' },
    ]
  }
];

const ServiceCard = ({ service, gradient, color, index }) => {
  const c = categoryColors[color] || categoryColors.blue;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="service-card p-6 group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
          style={{ background: gradient }}>
          <CheckCircle size={22} className="text-white" />
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full"
          style={{ background: c.priceBg, color: c.priceText }}>
          {service.price}
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 font-syne group-hover:text-blue-600 transition-colors">
        {service.name}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed mb-5 group-hover:text-gray-600 transition-colors">
        {service.description}
      </p>
      <Link
        to="/demander-devis"
        className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
        style={{ color: c.iconText }}
      >
        Demander un devis <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
};

const CategorySection = ({ category, index, isAlt }) => {
  const c = categoryColors[category.color] || categoryColors.blue;
  return (
    <section className="category-section py-16" style={{ background: isAlt ? '#F1F5FD' : '#FFFFFF' }}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-3">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110"
                style={{ background: c.iconBg, color: c.iconText }}>
                <category.icon size={28} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 font-syne">{category.name}</h2>
                <div className="w-12 h-0.5 rounded-full mt-2" style={{ background: category.gradient }} />
              </div>
            </div>
            <span className="text-sm text-gray-400 font-medium">4 services disponibles</span>
          </div>
          <p className="text-gray-500 text-base max-w-3xl leading-relaxed">{category.description}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {category.services.map((service, idx) => (
            <ServiceCard key={idx} service={service} gradient={category.gradient} color={category.color} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesPage = () => {
  return (
    <>
      <style>{globalStyles}</style>

      {/* ==================== HERO — fond foncé conservé ==================== */}
      <section className="relative text-white overflow-hidden pt-28 pb-16"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)' }}>

        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 animate-slow-zoom"
            style={{ backgroundImage: `url('https://img.freepik.com/photos-gratuite/contexte-energie-nucleaire-ia-innovation-future-technologie-rupture_53876-129783.jpg?semt=ais_hybrid&w=740&q=80')` }} />
          <div className="absolute inset-0" style={{ background: 'rgba(15,23,42,0.72)' }} />
        </div>

        <div className="absolute w-80 h-80 rounded-full animate-float"
          style={{ background: 'rgba(59,130,246,0.18)', top: '10%', left: '-8%', filter: 'blur(80px)' }} />
        <div className="absolute w-64 h-64 rounded-full animate-float"
          style={{ background: 'rgba(99,102,241,0.14)', bottom: '15%', right: '5%', filter: 'blur(80px)', animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full"
              style={{ background: 'rgba(37,99,235,0.2)', border: '1px solid rgba(96,165,250,0.35)' }}
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-ring" />
              <span className="text-blue-200 font-semibold text-xs tracking-wide font-syne">Expertise & innovations</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-5 font-syne"
            >
              Nos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-sky-300">
                Services
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-20 h-1 rounded-full mx-auto mb-5"
              style={{ background: 'linear-gradient(90deg, #60a5fa, #22d3ee, #38bdf8)' }}
            />

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-lg md:text-xl mb-6 max-w-2xl mx-auto"
            >
              Des solutions complètes pour la <strong className="text-white">transformation digitale</strong> de votre entreprise
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/contact"
                className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 hover:shadow-xl">
                Nous contacter <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/realisations"
                className="group border-2 border-white/30 hover:border-white px-6 py-3 rounded-xl font-semibold text-white hover:bg-white/10 transition-all hover:scale-105 flex items-center gap-2">
                Voir nos réalisations <CheckCircle size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="mt-12 flex justify-center"
            >
              <div className="animate-bounce">
                <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
                  <div className="w-1 h-2 bg-white/50 rounded-full mt-2 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Vague vers fond clair */}
        <div className="absolute bottom-0 left-0 right-0" style={{ color: '#F8FAFF' }}>
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-10">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ==================== STATISTIQUES CLÉS ==================== */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '7+', label: 'Catégories de services', color: '#2563eb', bg: '#EFF6FF' },
              { value: '28+', label: 'Services proposés', color: '#0891b2', bg: '#ECFEFF' },
              { value: '150+', label: 'Clients satisfaits', color: '#d97706', bg: '#FFFBEB' },
              { value: '24/7', label: 'Support technique', color: '#16a34a', bg: '#F0FDF4' },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ background: s.bg, border: `1px solid ${s.bg}` }}
              >
                <div className="text-3xl font-bold font-syne mb-1" style={{ color: s.color }}>{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NAVIGATION RAPIDE ==================== */}
      <section style={{ background: '#F1F5FD', borderBottom: '1px solid #E5E7EB' }}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {serviceCategories.map((cat, idx) => {
              const c = categoryColors[cat.color] || categoryColors.blue;
              return (
                <a
                  key={idx}
                  href={`#${cat.id}`}
                  className="nav-pill"
                  style={{
                    background: c.pill,
                    color: c.pillText,
                    borderColor: c.pillBorder,
                  }}
                >
                  {cat.name}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== SECTIONS CATÉGORIES ==================== */}
      {serviceCategories.map((category, idx) => (
        <div key={idx} id={category.id}>
          <CategorySection category={category} index={idx} isAlt={idx % 2 !== 0} />
        </div>
      ))}

      {/* ==================== CTA FINALE ==================== */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%)', borderTop: '1px solid #E5E7EB' }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
        <div className="absolute w-96 h-96 rounded-full"
          style={{ background: 'rgba(59,130,246,0.2)', bottom: '-4rem', left: '50%', transform: 'translateX(-50%)', filter: 'blur(100px)' }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-amber-200 text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Rocket size={16} /> Besoin d'un service personnalisé ?
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-syne">
              Vous avez un projet spécifique ?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
              Notre équipe d'experts est à votre écoute pour étudier votre besoin et vous proposer une solution sur mesure.
            </p>
            <Link to="/contact"
              className="inline-flex items-center gap-2 text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ea580c)', boxShadow: '0 8px 24px rgba(217,119,6,0.35)' }}>
              Contactez-nous <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;