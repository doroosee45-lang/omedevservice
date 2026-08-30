// src/pages/Contact.jsx
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight, MapPin, Phone, Mail, MessageCircle, Clock,
  Shield, Star, Briefcase, Handshake, Headphones, FileText
} from 'lucide-react';
import api from '../services/api';  // ← Import du service API centralisé
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-contact {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-cyan-light: #A6C3D7;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-gray: #D5DCE1;
    --omedev-dark: #0B1213;
    --omedev-text-secondary: #25364A;
    background: #F6F6F7;
    color: #0B1213;
    min-height: 100vh;
    font-family: 'DM Sans', sans-serif;
  }

  .omedev-contact .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }
  .omedev-contact .font-syne { font-family: 'Syne', sans-serif; }

  .omedev-contact .section-badge {
    display: inline-flex; align-items: center; gap: .5rem; font-size: .7rem; font-weight: 700;
    letter-spacing: .12em; text-transform: uppercase; padding: .5rem 1.1rem; border-radius: 999px;
    background: rgba(11,116,193,.08); color: #0B74C1; border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }
  .omedev-contact .section-title { font-size: clamp(2rem,4vw,3rem); font-weight: 800; line-height: 1.12; letter-spacing: -.03em; margin-bottom: 1rem; font-family: 'Syne',sans-serif; color:#053876; }
  .omedev-contact .section-subtitle { font-size:1rem; color:#25364A; max-width:52ch; margin:0 auto; line-height:1.7; }
  .omedev-contact .divider { width:64px; height:4px; background:linear-gradient(90deg,#0B74C1,#2AACB2,#55DDB5); border-radius:99px; margin:1rem auto 1.5rem; }
  .omedev-contact .btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:.6rem; background:linear-gradient(135deg,#0B74C1 0%,#2AACB2 55%,#55DDB5 100%); color:#fff; font-size:.9rem; font-weight:700; padding:.9rem 1.7rem; border-radius:12px; text-decoration:none; transition:all .3s ease; cursor:pointer; border:none; font-family:'Syne',sans-serif; box-shadow:0 10px 28px rgba(11,116,193,.20); }
  .omedev-contact .btn-primary:hover { transform:translateY(-3px); box-shadow:0 16px 36px rgba(42,172,178,.28); }
  .omedev-contact .btn-outline { display:inline-flex; align-items:center; justify-content:center; gap:.6rem; background:#fff; color:#053876; font-size:.9rem; font-weight:700; padding:.85rem 1.7rem; border-radius:12px; border:1px solid rgba(5,56,118,.18); text-decoration:none; transition:all .3s ease; cursor:pointer; font-family:'Syne',sans-serif; }
  .omedev-contact .btn-outline:hover { border-color:#2AACB2; color:#0B74C1; background:rgba(85,221,181,.08); transform:translateY(-3px); }
  .omedev-contact .card-hover { transition:transform .35s ease,box-shadow .35s ease,border-color .35s ease; background:#fff; border:1px solid rgba(5,56,118,.09); border-radius:18px; box-shadow:0 10px 30px rgba(5,56,118,.06); }
  .omedev-contact .card-hover:hover { transform:translateY(-7px); box-shadow:0 22px 48px rgba(11,116,193,.14); border-color:rgba(42,172,178,.35); }
  .omedev-contact .omedev-hero { background:linear-gradient(135deg,#053876 0%,#1D5B9B 35%,#4681B7 60%,#72A5CE 80%,#A6C3D7 100%); position:relative; }
  .omedev-contact .light-section { background:#F6F6F7; }
  .omedev-contact .white-section { background:#fff; }
  .omedev-contact .dark-section { background:linear-gradient(135deg,#053876 0%,#1D5B9B 55%,#0B74C1 100%); }
  .omedev-contact .energy-section { background:linear-gradient(135deg,#0B74C1 0%,#2AACB2 55%,#55DDB5 100%); }
  .omedev-contact .hero-grid { background-image:linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px); background-size:56px 56px; }
  .omedev-contact .info-card { background:#fff; border:1px solid rgba(5,56,118,.09); border-radius:18px; box-shadow:0 10px 30px rgba(5,56,118,.06); transition:all .35s ease; }
  .omedev-contact .info-card:hover { transform:translateY(-7px); box-shadow:0 22px 48px rgba(11,116,193,.14); border-color:rgba(42,172,178,.35); }
  .omedev-contact .form-input { width:100%; padding:.85rem 1rem; border-radius:12px; background:#F6F6F7; border:1px solid rgba(5,56,118,.14); color:#0B1213; transition:all .25s ease; outline:none; }
  .omedev-contact .form-input::placeholder { color:#7A8998; }
  .omedev-contact .form-input:focus { border-color:#2AACB2; background:#fff; box-shadow:0 0 0 4px rgba(42,172,178,.10); }
  .omedev-contact .label { display:block; font-size:.7rem; font-weight:700; color:#25364A; text-transform:uppercase; letter-spacing:.06em; margin-bottom:.4rem; }
  .omedev-contact .side-card { background:#fff; border:1px solid rgba(5,56,118,.09); border-radius:18px; box-shadow:0 10px 30px rgba(5,56,118,.06); }
  .omedev-contact .map-box { background:linear-gradient(135deg,#D5DCE1,#F6F6F7); border:1px solid rgba(5,56,118,.10); }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
  .omedev-contact .animate-float { animation:float 6s ease-in-out infinite; }
  @media (max-width:768px){ .omedev-contact .container{padding:0 1rem;} }
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
      gradient: 'from-[#053876] to-[#1D5B9B]'
    },
    {
      icon: Phone,
      title: 'Téléphone',
      content: '+243 555 503 59',
      link: 'tel:+24355550359',
      gradient: 'from-[#0B74C1] to-[#4681B7]'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'omedevservices@gmail.com',
      link: 'mailto:omedevservices@gmail.com',
      gradient: 'from-[#4681B7] to-[#72A5CE]'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+243 555 503 59',
      link: 'https://wa.me/24355550359',
      gradient: 'from-[#2AACB2] to-[#55DDB5]'
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
    { icon: Briefcase, text: '+15 projets IT livrés' },
    { icon: Handshake, text: 'Accompagnement sans engagement' }
  ];

  return (
    <div className="omedev-contact">
      <style>{globalStyles}</style>

      {/* Hero Section */}
      <PublicHero
        badge="Contactez-nous"
        title="On reste en contact"
        highlight="en contact"
        subtitle="Une question, un projet ? Notre équipe IT, Énergie & Infrastructure est là pour vous répondre."
        primaryAction={{ label: 'Nos services', to: '/services' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
        compact
      />

      {/* Cartes d'informations */}
      <div className="white-section relative z-10 pb-16">
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
                  className="info-card group p-6 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${i % 2 === 0 ? "#0B74C1" : "#2AACB2"}, ${i % 2 === 0 ? "#053876" : "#55DDB5"})` }}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#053876] mb-1 font-syne">{info.title}</h3>
                  <p className="text-[#25364A] text-sm">{info.content}</p>
                </motion.a>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Formulaire + Sidebar */}
      <div className="light-section">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card-hover p-6 md:p-8"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-[#0B74C1]/10 text-[#0B74C1] border border-[#0B74C1]/20 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                    ✉️ Message
                  </div>
                  <h2 className="text-2xl font-bold text-[#053876] font-syne">Parlons de votre projet</h2>
                </div>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-[#55DDB5]/10 border border-[#55DDB5]/30 rounded-xl text-sm text-[#16866d] font-medium transition-all">
                    ✅ Message envoyé avec succès ! Nous vous répondrons sous 24h.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium transition-all">
                    ❌ {errorMessage || 'Erreur lors de l\'envoi du message'}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="label">
                        Nom complet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="form-input"
                        placeholder="OMEDEV Services"
                      />
                    </div>
                    <div>
                      <label className="label">
                        Email <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="form-input"
                        placeholder="omedevservices@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <div>
                      <label className="label">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="form-input"
                        placeholder="+243 555 503 59"
                      />
                    </div>
                    <div>
                      <label className="label">
                        Objet <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <input
                        type="text"
                        name="objet"
                        value={formData.objet}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="form-input"
                        placeholder="Demande de devis / Support / Partenariat"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="label">
                      Message <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      rows="5"
                      className="form-input resize-y"
                      placeholder="Bonjour, je souhaiterais..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary mt-6 w-full rounded-full py-3.5 disabled:opacity-70"
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
                className="side-card p-6 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2 text-[#053876] font-bold text-lg mb-4 relative z-10">
                  <Clock size={20} className="text-[#0B74C1]" />
                  Horaires d'ouverture
                </div>
                {hours.map((h, i) => (
                  <div key={i} className="flex justify-between items-center py-2.5 border-b border-[#053876]/08 last:border-b-0">
                    <span className="text-sm text-[#25364A] font-medium">{h.day}</span>
                    <span className={`text-sm font-bold ${h.open ? 'text-[#2AACB2]' : 'text-[#9AA7B2]'}`}>{h.time}</span>
                  </div>
                ))}
                <div className="mt-4 pt-3 border-t border-[#053876]/08 text-xs text-[#667788] leading-relaxed">
                  Assistance technique 24/7<br />
                  <strong className="text-[#0B74C1]">+243 555 503 59</strong>
                </div>
              </motion.div>

              {/* Engagements */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="side-card p-6"
              >
                <div className="flex items-center gap-2 text-[#053876] font-bold text-lg mb-4">
                  <Shield size={20} className="text-[#0B74C1]" />
                  Nos engagements
                </div>
                {engagements.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3 py-2.5 border-b border-[#053876]/08 last:border-b-0">
                      <Icon size={16} className="text-[#0B74C1]" />
                      <span className="text-sm text-[#25364A]">{item.text}</span>
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
                className="side-card p-6 border-l-4 !border-l-[#2AACB2]"
              >
                <div className="flex items-center gap-2 text-[#053876] font-bold text-lg mb-2">
                  ⚡ Réponse rapide
                </div>
                <p className="text-[#25364A] text-sm leading-relaxed">
                  Notre équipe s'engage à répondre sous{' '}
                  <strong className="text-[#0B74C1]">24h ouvrées</strong>. Pour une urgence, appelez-nous directement.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Carte */}
      <div className="white-section border-t border-[#D5DCE1]">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-hover p-6 md:p-8"
          >
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 bg-[#0B74C1]/10 text-[#0B74C1] border border-[#0B74C1]/20 px-3.5 py-1 rounded-full text-[0.7rem] font-bold tracking-wider uppercase mb-3">
                🗺️ Nous trouver
              </div>
              <h2 className="text-2xl font-bold text-[#053876] font-syne">Notre siège à Kinshasa</h2>
              <p className="text-[#667788] mt-1">Avenue Kabmabre n°75, Commune de Lingwala</p>
            </div>

            <div className="map-box w-full h-[400px] rounded-xl overflow-hidden mb-6 flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl drop-shadow-xl animate-pulse">📍</div>
                <div className="mt-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#D5DCE1] shadow-lg">
                  <div className="font-bold text-[#053876] text-sm">OMEDEV Services</div>
                  <div className="text-xs text-[#25364A]">Avenue Kabmabre n°75, Lingwala</div>
                  <div className="text-xs text-[#2AACB2] font-bold mt-1">● Ouvert aujourd'hui</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { icon: '🚗', title: 'En voiture', desc: 'Parking gratuit sur place' },
                { icon: '🚌', title: 'Transport', desc: 'Bus : arrêt Lingwala (lignes 12, 23)' },
                { icon: '♿', title: 'Accessibilité', desc: 'Entrée adaptée aux PMR' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#F6F6F7] border border-[#D5DCE1]">
                  <div className="w-10 h-10 rounded-xl bg-[#0B74C1]/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[#053876] text-sm">{item.title}</div>
                    <div className="text-xs text-[#667788]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Besoin d'aller plus vite ?"
        title="Discutons de votre projet dès maintenant"
        highlight="dès maintenant"
        subtitle="Recevez une proposition sur mesure ou bénéficiez d'un diagnostic gratuit de vos infrastructures, sans engagement."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Demander un devis', to: '/demander-devis' }}
        secondaryAction={{ label: 'Audit gratuit', to: '/audit-gratuit' }}
      />
    </div>
  );
};

export default Contact;