// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, CheckCircle, MapPin, Phone, Mail, MessageCircle, Clock,
  Shield, Star, Briefcase, Handshake, Calendar, Headphones, FileText
} from 'lucide-react';
import api from '../services/api';  // ← Import du service API centralisé

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #0f172a;
    color: #e2e8f0;
    overflow-x: hidden;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 1; }
    70% { transform: scale(1.3); opacity: 0; }
    100% { transform: scale(0.8); opacity: 0; }
  }
  
  .animate-float { animation: float 6s ease-in-out infinite; }
  .animate-pulse-ring { animation: pulse-ring 2s ease-out infinite; }
`;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    phone: '',
    objet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage('');

    try {
      // Appel API via l'instance axios préconfigurée
      const response = await api.post('/contact', formData);
      
      // Succès
      setSubmitStatus('success');
      setFormData({ nom: '', email: '', phone: '', objet: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      
      // Récupérer le message d'erreur renvoyé par le backend
      let userMessage = 'Une erreur est survenue. Veuillez réessayer plus tard.';
      
      if (error.response) {
        // Le serveur a répondu avec un statut d'erreur (4xx, 5xx)
        userMessage = error.response.data?.message || `Erreur ${error.response.status}: ${error.response.statusText}`;
        
        // Messages spécifiques pour les erreurs d'authentification email
        if (error.response.data?.code === 'EAUTH' || userMessage.includes('Invalid login') || userMessage.includes('Username and Password not accepted')) {
          userMessage = 'Erreur de configuration email. Notre équipe technique a été informée. Veuillez nous contacter directement par téléphone.';
        }
      } else if (error.request) {
        // La requête a été faite mais pas de réponse (backend hors ligne)
        userMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
      } else {
        // Autre erreur
        userMessage = error.message || userMessage;
      }
      
      setErrorMessage(userMessage);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 8000); // plus long pour lire l'erreur
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adresse',
      content: 'Avenue Kabmabre n°75, Lingwala, Kinshasa',
      link: 'https://maps.google.com/?q=Kinshasa+Lingwala',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+243 555 503 59',
      link: 'tel:+24355550359',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'omedevservices@gmail.com',
      link: 'mailto:omedevservices@gmail.com',
      gradient: 'from-orange-500 to-orange-600'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+243 555 503 59',
      link: 'https://wa.me/24355550359',
      gradient: 'from-emerald-500 to-emerald-600'
    }
  ];

  const hours = [
    { day: 'Lundi – Vendredi', time: '8h – 18h', open: true },
    { day: 'Samedi', time: '9h – 13h', open: true },
    { day: 'Dimanche', time: 'Fermé', open: false }
  ];

  const engagements = [
    { icon: Shield, text: '100% confidentiel' },
    { icon: Star, text: '4.9/5 satisfaction client' },
    { icon: Briefcase, text: '+150 projets IT livrés' },
    { icon: Handshake, text: 'Accompagnement sans engagement' }
  ];

  return (
    <>
      <style>{globalStyles}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 text-white overflow-hidden pt-32 pb-20 min-h-[550px]">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59,130,246,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 -left-20 rounded-full filter blur-[80px] animate-float" />
        <div className="absolute w-72 h-72 bg-indigo-700/15 bottom-20 right-10 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '2s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-blue-600/15 border border-blue-500/30"
            >
              <Headphones className="w-4 h-4 text-blue-400" />
              <span className="text-blue-300 font-semibold text-xs tracking-wide font-syne">Contactez-nous</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 font-syne"
            >
              On reste{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-sky-400 blur-2xl opacity-50" />
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
                  en contact
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-gray-300 text-base sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto"
            >
              Une question, un projet ? Notre équipe IT, Énergie & Infrastructure est là pour vous répondre.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center"
            >
              <Link to="/services" className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105">
                Nos services <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/audit" className="group border-2 border-white/30 hover:border-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-white hover:bg-white/10 transition-all">
                Audit gratuit
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cartes d'informations */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 relative z-10 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={i}
                  variants={fadeUp}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/5 border border-white/10 rounded-2xl p-6 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-500/50 hover:bg-white/10"
                >
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{info.title}</h3>
                  <p className="text-gray-300 text-sm">{info.content}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Formulaire + Sidebar */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                    ✉️ Message
                  </div>
                  <h2 className="text-2xl font-bold text-white font-syne">Parlons de votre projet</h2>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-xl text-sm text-green-300 font-medium transition-all">
                    ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-sm text-red-300 font-medium transition-all">
                    ❌ {errorMessage || 'Erreur lors de l\'envoi du message'}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Nom complet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Omedeve Services"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Email <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="omedevservices@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="+243 555 503 59"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                        Objet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="objet"
                        value={formData.objet}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all"
                        placeholder="Demande de devis / Support / Partenariat"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wide mb-1.5">
                      Message <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows="5"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all resize-y"
                      placeholder="Bonjour, je souhaiterais..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-6 w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3.5 rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>✈️ Envoyer le message</>
                    )}
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Horaires */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-4 relative z-10">
                  <Clock size={20} className="text-blue-400" />
                  Horaires d'ouverture
                </div>
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-white/10 last:border-b-0">
                    <span className="text-sm text-gray-300 font-medium">{h.day}</span>
                    <span className={`text-sm font-bold ${h.open ? 'text-white' : 'text-gray-500'}`}>{h.time}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-400 leading-relaxed">
                  Assistance technique 24/7<br />
                  <strong className="text-blue-400">+243 555 503 59</strong>
                </div>
              </motion.div>

              {/* Engagements */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-4">
                  <Shield size={20} className="text-blue-400" />
                  Nos engagements
                </div>
                {engagements.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/10 last:border-b-0">
                      <Icon size={16} className="text-blue-400" />
                      <span className="text-sm text-gray-300">{item.text}</span>
                    </div>
                  );
                })}
              </motion.div>

              {/* Réponse rapide */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 text-white font-bold text-lg mb-2">
                  ⚡ Réponse rapide
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Notre équipe s'engage à répondre sous{' '}
                  <strong className="text-blue-400">24h ouvrées</strong>. Pour une urgence, appelez-nous directement.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Carte */}
      <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/10">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🗺️ Nous trouver
              </div>
              <h2 className="text-2xl font-bold text-white font-syne">Notre siège à Kinshasa</h2>
              <p className="text-gray-400 mt-1">Avenue Kabmabre n°75, Commune de Lingwala</p>
            </div>

            <div className="w-full h-[400px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 mb-6 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl drop-shadow-xl animate-pulse">📍</div>
                <div className="mt-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/20">
                  <div className="font-bold text-white text-sm">OMDEVE Services</div>
                  <div className="text-xs text-gray-300">Avenue Kabmabre n°75, Lingwala</div>
                  <div className="text-xs text-green-400 font-bold mt-1">● Ouvert aujourd'hui</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🚗', title: 'En voiture', desc: 'Parking gratuit sur place' },
                { icon: '🚌', title: 'Transport', desc: 'Bus : arrêt Lingwala (lignes 12, 23)' },
                { icon: '♿', title: 'Accessibilité', desc: 'Entrée adaptée aux PMR' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-gray-400">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA double */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 border-t border-white/5">
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 30% 40%, rgba(59,130,246,0.3) 0%, transparent 60%),
                            radial-gradient(circle at 80% 70%, rgba(6,182,212,0.2) 0%, transparent 60%)`
        }} />
        <div className="absolute w-96 h-96 bg-blue-600/20 top-20 left-1/4 rounded-full filter blur-[100px] animate-float" />
        <div className="absolute w-72 h-72 bg-cyan-500/10 bottom-10 right-1/3 rounded-full filter blur-[80px] animate-float" style={{ animationDelay: '3s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Carte 1 : Assistance immédiate */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <Headphones size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Assistance immédiate</h3>
                <p className="text-gray-300 mb-6">
                  Notre support technique est disponible <strong className="text-blue-400">24h/24 et 7j/7</strong> pour répondre à vos urgences.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+24355550359" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                    <Phone size={16} /> Appeler maintenant
                  </a>
                  <a href="https://wa.me/24355550359" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105">
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Carte 2 : Devis & Projets */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 hover:border-blue-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 via-blue-500/0 to-blue-500/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-blue-500/5 group-hover:via-blue-500/10 group-hover:to-blue-500/5 pointer-events-none" />
              <div className="relative z-10 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110">
                  <FileText size={28} className="text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-syne mb-3">Un projet sur mesure ?</h3>
                <p className="text-gray-300 mb-6">
                  Étudions ensemble votre besoin et obtenez un <strong className="text-amber-400">devis personnalisé</strong> sans engagement.
                </p>
                <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 group">
                  Demander un devis <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;