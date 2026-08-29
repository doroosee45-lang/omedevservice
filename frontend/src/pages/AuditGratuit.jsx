import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  ChevronRight, ChevronLeft, CheckCircle, Shield, Server, Users, Building,
  AlertCircle, Download, Mail, Phone, User, ArrowRight
} from 'lucide-react';
import api from '../services/api';
import PublicHero from '../components/Public/PublicHero';
import CTASection from '../components/Public/CTASection';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM — identique à la page About
   (navy/electric/turquoise/energy)
   ───────────────────────────────────────────── */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-audit {
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
    font-family: 'DM Sans', sans-serif;
  }

  .omedev-audit .container { max-width: 1280px; margin: 0 auto; padding: 0 2rem; }

  .omedev-audit .section-badge {
    display: inline-flex; align-items: center; gap: .5rem;
    font-size: .7rem; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
    padding: .5rem 1.1rem; border-radius: 999px;
    background: rgba(255,255,255,.14); color: #fff; border: 1px solid rgba(255,255,255,.28);
    font-family: 'Syne', sans-serif;
  }

  .omedev-audit .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff; font-size: .9rem; font-weight: 700; padding: .9rem 1.7rem; border-radius: 12px;
    text-decoration: none; transition: all .3s ease; cursor: pointer; border: none;
    font-family: 'Syne', sans-serif; box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }
  .omedev-audit .btn-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(42,172,178,.28); }
  .omedev-audit .btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

  .omedev-audit .btn-outline {
    display: inline-flex; align-items: center; justify-content: center; gap: .6rem;
    background: #fff; color: #053876; font-size: .9rem; font-weight: 700; padding: .85rem 1.7rem;
    border-radius: 12px; border: 1px solid rgba(5,56,118,.18); text-decoration: none;
    transition: all .3s ease; cursor: pointer; font-family: 'Syne', sans-serif;
  }
  .omedev-audit .btn-outline:hover { border-color: #2AACB2; color: #0B74C1; background: rgba(85,221,181,.08); transform: translateY(-3px); }

  .omedev-audit .card-hover {
    background: #fff; border: 1px solid rgba(5,56,118,.09); border-radius: 18px;
    box-shadow: 0 10px 30px rgba(5,56,118,.06);
  }

  .omedev-audit .omedev-hero {
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 35%, #4681B7 60%, #72A5CE 80%, #A6C3D7 100%);
    position: relative;
  }
  .omedev-audit .omedev-light-section { background: #F6F6F7; }
  .omedev-audit .omedev-dark-section { background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%); }

  .omedev-audit .hero-grid {
    background-image: linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
    background-size: 56px 56px;
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-audit .animate-float { animation: float 6s ease-in-out infinite; }

  .omedev-audit .form-input,
  .omedev-audit select.form-input {
    width: 100%; padding: .85rem 1.1rem; background: #fff;
    border: 1px solid rgba(5,56,118,.16); border-radius: 12px;
    color: #053876; font-size: .95rem; transition: all .2s ease;
  }
  .omedev-audit .form-input::placeholder { color: #8496A9; }
  .omedev-audit .form-input:focus { outline: none; border-color: #2AACB2; box-shadow: 0 0 0 3px rgba(42,172,178,.15); }
  .omedev-audit .form-label { display:block; font-size:.85rem; font-weight:600; color:#25364A; margin-bottom:.4rem; }
  .omedev-audit .radio-pill { display:flex; align-items:center; color:#25364A; font-size:.9rem; cursor:pointer; }
  .omedev-audit .radio-pill input { margin-right:.5rem; accent-color:#0B74C1; }

  .omedev-audit .step-dot {
    width:2.5rem; height:2.5rem; border-radius:999px; display:flex; align-items:center; justify-content:center;
    font-weight:700; font-family:'Syne', sans-serif; transition: all .3s ease; box-shadow: 0 4px 14px rgba(5,56,118,.10);
  }

  @media (max-width: 768px) { .omedev-audit .container { padding: 0 1rem; } }
`;

const colors = {
  navy: '#053876',
  blue: '#0B74C1',
  blueLight: '#4681B7',
  turquoise: '#2AACB2',
  energy: '#55DDB5',
};

const AuditGratuit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    sector: '',
    employeeCount: '',
    hasNetwork: '',
    hasServer: '',
    hasFirewall: '',
    internetSpeed: '',
    hasAntivirus: '',
    hasBackup: '',
    hasCyberPolicy: '',
    lastAudit: '',
    mainIssues: [],
    priorityServices: [],
    budget: '',
    name: '',
    email: '',
    phone: '',
    position: '',
    preferredContact: '',
    newsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [auditResult, setAuditResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, trigger, setValue } = useForm();

  const sectors = [
    'Commerce / Distribution', 'Industrie / Manufacturing', 'Services / Consulting',
    'Banque / Finance', 'Santé / Medical', 'Éducation / Formation',
    'ONG / Association', 'Administration publique', 'Autre'
  ];
  const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '500+'];
  const internetSpeeds = ['< 10 Mbps', '10-50 Mbps', '50-100 Mbps', '100-500 Mbps', '> 500 Mbps', 'Je ne sais pas'];
  const auditOptions = ['moins-6-mois', '6-12-mois', '1-2-ans', 'plus-2-ans', 'jamais'];
  const auditLabels = {
    'moins-6-mois': 'Moins de 6 mois',
    '6-12-mois': '6 à 12 mois',
    '1-2-ans': '1 à 2 ans',
    'plus-2-ans': 'Plus de 2 ans',
    'jamais': 'Jamais réalisé'
  };
  const mainIssuesOptions = [
    'Lenteur du réseau', 'Problèmes de sécurité', 'Pannes fréquentes', 'Manque de sauvegarde',
    'Site internet obsolète', 'Absence de visibilité en ligne', 'Gestion client inefficace',
    'Consommation énergétique élevée'
  ];
  const priorityServicesOptions = [
    'Réseau & Infrastructure', 'Sécurité informatique', 'Développement web',
    'Cloud & Hébergement', 'Solutions énergétiques', 'Formation IT'
  ];
  const budgetRanges = ['< 5 000 €', '5 000 - 15 000 €', '15 000 - 30 000 €', '30 000 - 50 000 €', '> 50 000 €', 'À déterminer'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value);
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => {
      const current = prev[field];
      const updated = current.includes(value) ? current.filter(v => v !== value) : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const handleRadioChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setValue(field, value);
  };

  const nextStep = async () => {
    let isValid = true;
    if (step === 1) isValid = await trigger(['companyName', 'sector', 'employeeCount']);
    if (step === 2) isValid = await trigger(['hasNetwork', 'hasServer', 'hasFirewall', 'internetSpeed']);
    if (step === 3) isValid = await trigger(['hasAntivirus', 'hasBackup', 'hasCyberPolicy', 'lastAudit']);
    if (step === 5) isValid = await trigger(['name', 'email', 'phone']);
    if (isValid) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async () => {
    if (!formData.companyName || !formData.sector || !formData.employeeCount) {
      alert("Veuillez remplir toutes les informations de l'entreprise");
      return;
    }
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const response = await api.post('/audit-requests', formData);
      const { requestNumber, audit, _id } = response.data;

      let rec = {};
      switch (audit.level) {
        case 'Excellent':
          rec = {
            level: 'Excellent',
            color: '#0B8F73',
            bg: 'rgba(85,221,181,.12)',
            border: 'rgba(85,221,181,.35)',
            icon: '🏆',
            message: "Votre infrastructure est très bien configurée. Quelques optimisations mineures peuvent encore améliorer vos performances.",
            recommendations: audit.recommendations
          };
          break;
        case 'Bon':
          rec = {
            level: 'Bon',
            color: colors.blue,
            bg: 'rgba(11,116,193,.10)',
            border: 'rgba(11,116,193,.30)',
            icon: '👍',
            message: "Votre infrastructure est fonctionnelle mais présente des axes d'amélioration significatifs.",
            recommendations: audit.recommendations
          };
          break;
        case 'Moyen':
          rec = {
            level: 'Moyen',
            color: '#B45309',
            bg: 'rgba(217,119,6,.10)',
            border: 'rgba(217,119,6,.30)',
            icon: '⚠️',
            message: "Des vulnérabilités importantes ont été identifiées. Une action rapide est recommandée.",
            recommendations: audit.recommendations
          };
          break;
        default:
          rec = {
            level: 'Critique',
            color: '#B91C1C',
            bg: 'rgba(220,38,38,.10)',
            border: 'rgba(220,38,38,.30)',
            icon: '🚨',
            message: "Votre infrastructure présente des risques majeurs. Une intervention urgente est nécessaire.",
            recommendations: audit.recommendations
          };
      }

      setAuditResult({
        _id,
        score: audit.score,
        recommendations: rec,
        ...formData,
        requestNumber
      });
      setStep(6);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'audit:", error);
      const msg = error.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.';
      setErrorMessage(msg);
      alert(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDFReport = async () => {
    if (!auditResult?._id) {
      alert('Aucun rapport disponible');
      return;
    }
    try {
      const response = await api.get(`/audit-requests/${auditResult._id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `audit_${auditResult.requestNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erreur téléchargement PDF:', error);
      alert('Impossible de générer le PDF. Veuillez réessayer.');
    }
  };

  const steps = [
    { number: 1, title: 'Entreprise', icon: Building },
    { number: 2, title: 'Infrastructure', icon: Server },
    { number: 3, title: 'Sécurité', icon: Shield },
    { number: 4, title: 'Besoins', icon: Users },
    { number: 5, title: 'Contact', icon: User }
  ];

  const [emailCountdown, setEmailCountdown] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (step === 6 && auditResult) {
      setEmailCountdown(4);
      setEmailSent(false);
      let count = 4;
      countdownRef.current = setInterval(() => {
        count -= 1;
        if (count <= 0) {
          clearInterval(countdownRef.current);
          setEmailCountdown(0);
          setEmailSent(true);
        } else {
          setEmailCountdown(count);
        }
      }, 1000);
    }
    return () => clearInterval(countdownRef.current);
  }, [step, auditResult]);

  /* ==================== ÉCRAN RÉSULTAT ==================== */
  if (auditResult && step === 6) {
    const rec = auditResult.recommendations;
    return (
      <div className="omedev-audit">
        <style>{globalStyles}</style>
        <div className="omedev-light-section pt-32 pb-20 min-h-screen">
          <div className="container max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card-hover overflow-hidden"
            >
              <div
                className="p-8 text-center relative overflow-hidden border-b"
                style={{ background: rec.bg, borderColor: 'rgba(5,56,118,.09)' }}
              >
                <div className="text-6xl mb-4">{rec.icon}</div>
                <h1 className="text-2xl md:text-3xl font-bold font-syne mb-2" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                  Rapport d'Audit
                </h1>
                <p style={{ color: '#25364A' }}>{auditResult.companyName || 'Votre entreprise'}</p>
                <p className="text-sm mt-1" style={{ color: '#6B7A8C' }}>
                  Généré le {new Date().toLocaleDateString('fr-FR')}
                </p>
              </div>

              <div className="p-8 border-b" style={{ borderColor: 'rgba(5,56,118,.09)' }}>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center relative">
                    <svg className="w-36 h-36">
                      <circle stroke="#D5DCE1" strokeWidth="8" fill="transparent" r="62" cx="72" cy="72" />
                      <circle
                        className="transition-all duration-1000"
                        strokeWidth="8"
                        strokeDasharray={2 * Math.PI * 62}
                        strokeDashoffset={2 * Math.PI * 62 * (1 - auditResult.score / 100)}
                        strokeLinecap="round"
                        stroke={colors.blue}
                        fill="transparent"
                        r="62"
                        cx="72"
                        cy="72"
                        transform="rotate(-90 72 72)"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-3xl font-bold" style={{ color: colors.blue }}>{auditResult.score}</span>
                      <span style={{ color: '#8496A9' }}>/100</span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mt-4" style={{ color: rec.color, fontFamily: "'Syne', sans-serif" }}>
                    Niveau : {rec.level}
                  </h2>
                  <p className="max-w-md mx-auto mt-2" style={{ color: '#25364A' }}>{rec.message}</p>
                </div>
              </div>

              <div className="p-8 border-b" style={{ background: '#F6F6F7', borderColor: 'rgba(5,56,118,.09)' }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>Synthèse de l'audit</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    ['Secteur d\u2019activité', auditResult.sector || 'Non spécifié'],
                    ['Effectif', `${auditResult.employeeCount || 'Non spécifié'} employés`],
                    ['Problèmes identifiés', `${auditResult.mainIssues.length} point(s)`],
                    ['Budget envisagé', auditResult.budget || 'À déterminer'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-lg p-4" style={{ background: '#fff', border: '1px solid rgba(5,56,118,.09)' }}>
                      <p className="text-sm" style={{ color: '#6B7A8C' }}>{label}</p>
                      <p className="font-semibold" style={{ color: colors.navy }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 border-b" style={{ borderColor: 'rgba(5,56,118,.09)' }}>
                <h2 className="text-lg font-bold mb-4 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                  <AlertCircle className="w-5 h-5 mr-2" style={{ color: colors.blue }} />
                  Recommandations prioritaires
                </h2>
                <ul className="space-y-3">
                  {rec.recommendations.map((recItem, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start"
                    >
                      <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: colors.turquoise }} />
                      <span style={{ color: '#25364A' }}>{recItem}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {auditResult.priorityServices.length > 0 && (
                <div className="p-8 border-b" style={{ borderColor: 'rgba(5,56,118,.09)' }}>
                  <h2 className="text-lg font-bold mb-4" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                    Services qui pourraient vous intéresser
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {auditResult.priorityServices.map((service, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full text-sm"
                        style={{ background: 'rgba(11,116,193,.10)', color: colors.blue, border: '1px solid rgba(11,116,193,.25)' }}
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-8 border-t" style={{ background: '#F6F6F7', borderColor: 'rgba(5,56,118,.09)' }}>
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>Prochaines étapes</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link
                    to="/demander-devis"
                    className="flex items-center justify-between p-4 rounded-xl transition-all group"
                    style={{ background: '#fff', border: '1px solid rgba(5,56,118,.09)' }}
                  >
                    <div>
                      <p className="font-semibold" style={{ color: colors.navy }}>Demander un devis personnalisé</p>
                      <p className="text-sm" style={{ color: '#6B7A8C' }}>Obtenez une offre sur mesure</p>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" style={{ color: colors.blue }} />
                  </Link>
                  <Link
                    to="/contact"
                    className="flex items-center justify-between p-4 rounded-xl transition-all group"
                    style={{ background: '#fff', border: '1px solid rgba(5,56,118,.09)' }}
                  >
                    <div>
                      <p className="font-semibold" style={{ color: colors.navy }}>Planifier un appel avec un expert</p>
                      <p className="text-sm" style={{ color: '#6B7A8C' }}>Discussion gratuite de 30 min</p>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" style={{ color: colors.blue }} />
                  </Link>
                </div>
              </div>

              <div className="p-8 text-center border-t" style={{ borderColor: 'rgba(5,56,118,.09)' }}>
                <AnimatePresence mode="wait">
                  {!emailSent ? (
                    <motion.div
                      key="countdown"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mb-6 flex items-center justify-center gap-3 px-5 py-3 rounded-xl"
                      style={{ background: 'rgba(11,116,193,.08)', border: '1px solid rgba(11,116,193,.20)' }}
                    >
                      <div className="relative flex-shrink-0">
                        <svg className="w-10 h-10 -rotate-90">
                          <circle cx="20" cy="20" r="17" fill="none" strokeWidth="3" stroke="#D5DCE1" />
                          <circle
                            cx="20" cy="20" r="17" fill="none" strokeWidth="3"
                            stroke={colors.blue}
                            strokeDasharray={2 * Math.PI * 17}
                            strokeDashoffset={2 * Math.PI * 17 * ((emailCountdown ?? 4) / 4)}
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dashoffset 1s linear' }}
                          />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: colors.blue }}>
                          {emailCountdown ?? 4}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm" style={{ color: colors.blue }}>Envoi du rapport PDF en cours…</p>
                        <p className="text-xs" style={{ color: '#6B7A8C' }}>
                          Votre rapport sera envoyé à <span style={{ color: colors.blue }}>{auditResult.email}</span>
                        </p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mb-6 flex items-center justify-center gap-3 px-5 py-3 rounded-xl"
                      style={{ background: 'rgba(85,221,181,.12)', border: '1px solid rgba(85,221,181,.35)' }}
                    >
                      <CheckCircle className="w-6 h-6 flex-shrink-0" style={{ color: '#0B8F73' }} />
                      <div className="text-left">
                        <p className="font-semibold text-sm" style={{ color: '#0B8F73' }}>Rapport PDF envoyé !</p>
                        <p className="text-xs" style={{ color: '#6B7A8C' }}>
                          Vérifiez votre boîte mail : <span style={{ color: '#0B8F73' }}>{auditResult.email}</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button onClick={downloadPDFReport} className="btn-primary">
                  <Download className="w-5 h-5" />
                  Télécharger le rapport PDF
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  /* ==================== FORMULAIRE ==================== */
  return (
    <div className="omedev-audit">
      <style>{globalStyles}</style>

      {/* Hero Section */}
      <PublicHero
        badge="Diagnostic gratuit"
        title="Audit Gratuit"
        highlight="Gratuit"
        subtitle="Diagnostiquez gratuitement l'état de votre infrastructure IT et obtenez un rapport personnalisé avec nos recommandations."
        primaryAction={{ label: 'Nous contacter', to: '/contact' }}
        secondaryAction={{ label: 'Voir nos solutions', to: '/solutions' }}
        compact
      />

      {/* Progress Steps */}
      <div className="omedev-light-section pt-10 pb-2">
        <div className="container max-w-4xl">
          <div className="flex justify-between items-center relative">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex-1 relative">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{ scale: step === s.number ? 1.1 : 1 }}
                    className="step-dot"
                    style={{
                      background: step > s.number
                        ? 'linear-gradient(135deg, #2AACB2, #55DDB5)'
                        : step === s.number
                        ? 'linear-gradient(135deg, #0B74C1, #053876)'
                        : '#fff',
                      color: step >= s.number ? '#fff' : '#8496A9',
                      border: step >= s.number ? 'none' : '1px solid rgba(5,56,118,.18)',
                    }}
                  >
                    {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.number}
                  </motion.div>
                  <span className="text-xs mt-2 hidden sm:block" style={{ color: '#6B7A8C' }}>{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className="absolute top-5 left-1/2 w-full h-0.5 transition-all duration-300"
                    style={{ right: '-50%', background: step > s.number ? colors.turquoise : '#D5DCE1' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire */}
      <div className="omedev-light-section">
        <div className="container max-w-4xl pb-20 pt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="card-hover overflow-hidden"
            >
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 md:p-8">

                  {/* Step 1 - Company Info */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                        <Building className="w-6 h-6 mr-2" style={{ color: colors.blue }} />
                        Informations de l'entreprise
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="form-label">Nom de l'entreprise <span style={{ color: '#B91C1C' }}>*</span></label>
                          <input
                            {...register('companyName', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('companyName', e.target.value)}
                            className="form-input"
                            placeholder="OMEDEV Services"
                          />
                          {errors.companyName && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.companyName.message}</p>}
                        </div>
                        <div>
                          <label className="form-label">Secteur d'activité <span style={{ color: '#B91C1C' }}>*</span></label>
                          <select
                            {...register('sector', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('sector', e.target.value)}
                            className="form-input"
                          >
                            <option value="">Sélectionnez un secteur</option>
                            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                          {errors.sector && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.sector.message}</p>}
                        </div>
                        <div>
                          <label className="form-label">Nombre d'employés <span style={{ color: '#B91C1C' }}>*</span></label>
                          <select
                            {...register('employeeCount', { required: 'Champ requis' })}
                            onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                            className="form-input"
                          >
                            <option value="">Sélectionnez une tranche</option>
                            {employeeRanges.map(r => <option key={r} value={r}>{r} employés</option>)}
                          </select>
                          {errors.employeeCount && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.employeeCount.message}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2 - Infrastructure IT */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                        <Server className="w-6 h-6 mr-2" style={{ color: colors.blue }} />
                        Infrastructure IT
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="form-label">Disposez-vous d'un réseau informatique ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasNetwork === opt} onChange={() => handleRadioChange('hasNetwork', opt)} />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiellement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Avez-vous des serveurs ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'cloud'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasServer === opt} onChange={() => handleRadioChange('hasServer', opt)} />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Cloud uniquement'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Disposez-vous d'un pare-feu ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasFirewall === opt} onChange={() => handleRadioChange('hasFirewall', opt)} />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Basique'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Débit internet</label>
                          <select onChange={(e) => handleInputChange('internetSpeed', e.target.value)} className="form-input">
                            <option value="">Sélectionnez le débit</option>
                            {internetSpeeds.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 - Sécurité */}
                  {step === 3 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                        <Shield className="w-6 h-6 mr-2" style={{ color: colors.blue }} />
                        Sécurité Informatique
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="form-label">Utilisez-vous un antivirus ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'basic'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasAntivirus === opt} onChange={() => handleRadioChange('hasAntivirus', opt)} />
                                <span>{opt === 'yes' ? 'Oui, centralisé' : opt === 'no' ? 'Non' : 'Basique / individuel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Avez-vous un système de sauvegarde ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'partial'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasBackup === opt} onChange={() => handleRadioChange('hasBackup', opt)} />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'Partiel'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Existe-t-il une politique de cybersécurité ?</label>
                          <div className="flex gap-4 flex-wrap">
                            {['yes', 'no', 'inprogress'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.hasCyberPolicy === opt} onChange={() => handleRadioChange('hasCyberPolicy', opt)} />
                                <span>{opt === 'yes' ? 'Oui' : opt === 'no' ? 'Non' : 'En cours'}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Date du dernier audit de sécurité</label>
                          <select onChange={(e) => handleInputChange('lastAudit', e.target.value)} className="form-input">
                            <option value="">Sélectionnez</option>
                            {auditOptions.map(opt => <option key={opt} value={opt}>{auditLabels[opt]}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4 - Besoins */}
                  {step === 4 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                        <Users className="w-6 h-6 mr-2" style={{ color: colors.blue }} />
                        Vos besoins
                      </h2>
                      <div className="space-y-6">
                        <div>
                          <label className="form-label">Quels sont vos principaux problèmes ?</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mainIssuesOptions.map(issue => (
                              <label key={issue} className="radio-pill">
                                <input type="checkbox" checked={formData.mainIssues.includes(issue)} onChange={() => handleCheckboxChange('mainIssues', issue)} style={{ accentColor: colors.blue }} />
                                <span className="text-sm">{issue}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Services prioritaires</label>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {priorityServicesOptions.map(service => (
                              <label key={service} className="radio-pill">
                                <input type="checkbox" checked={formData.priorityServices.includes(service)} onChange={() => handleCheckboxChange('priorityServices', service)} style={{ accentColor: colors.blue }} />
                                <span className="text-sm">{service}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="form-label">Budget envisagé</label>
                          <select onChange={(e) => handleInputChange('budget', e.target.value)} className="form-input">
                            <option value="">Sélectionnez un budget</option>
                            {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5 - Contact */}
                  {step === 5 && (
                    <div>
                      <h2 className="text-xl font-bold mb-6 flex items-center" style={{ color: colors.navy, fontFamily: "'Syne', sans-serif" }}>
                        <User className="w-6 h-6 mr-2" style={{ color: colors.blue }} />
                        Vos coordonnées
                      </h2>
                      <div className="space-y-5">
                        <div>
                          <label className="form-label">Nom complet <span style={{ color: '#B91C1C' }}>*</span></label>
                          <input {...register('name', { required: 'Champ requis' })} onChange={(e) => handleInputChange('name', e.target.value)} className="form-input" placeholder="Votre nom" />
                          {errors.name && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.name.message}</p>}
                        </div>
                        <div>
                          <label className="form-label">Email <span style={{ color: '#B91C1C' }}>*</span></label>
                          <input type="email" {...register('email', { required: 'Champ requis', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Email invalide' } })} onChange={(e) => handleInputChange('email', e.target.value)} className="form-input" placeholder="contact@omedevservices.com" />
                          {errors.email && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.email.message}</p>}
                        </div>
                        <div>
                          <label className="form-label">Téléphone <span style={{ color: '#B91C1C' }}>*</span></label>
                          <input type="tel" {...register('phone', { required: 'Champ requis' })} onChange={(e) => handleInputChange('phone', e.target.value)} className="form-input" placeholder="+243 XXX XXX XXX" />
                          {errors.phone && <p className="text-xs mt-1" style={{ color: '#B91C1C' }}>{errors.phone.message}</p>}
                        </div>
                        <div>
                          <label className="form-label">Poste / Fonction</label>
                          <input onChange={(e) => handleInputChange('position', e.target.value)} className="form-input" placeholder="Directeur IT" />
                        </div>
                        <div>
                          <label className="form-label">Préférence de contact</label>
                          <div className="flex gap-4 flex-wrap">
                            {['email', 'phone'].map(opt => (
                              <label key={opt} className="radio-pill">
                                <input type="radio" value={opt} checked={formData.preferredContact === opt} onChange={() => handleRadioChange('preferredContact', opt)} />
                                <span className="flex items-center">
                                  {opt === 'email' ? <Mail className="w-4 h-4 mr-1" /> : <Phone className="w-4 h-4 mr-1" />}
                                  {opt === 'email' ? 'Email' : 'Téléphone'}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="radio-pill">
                            <input type="checkbox" checked={formData.newsletter} onChange={(e) => handleInputChange('newsletter', e.target.checked)} style={{ accentColor: colors.blue }} />
                            <span className="text-sm">Je souhaite recevoir la newsletter et les offres spéciales</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Buttons */}
                <div className="px-6 md:px-8 py-4 flex justify-between" style={{ background: '#F6F6F7', borderTop: '1px solid rgba(5,56,118,.09)' }}>
                  {step > 1 && (
                    <button type="button" onClick={prevStep} className="btn-outline">
                      <ChevronLeft className="w-4 h-4" /> Précédent
                    </button>
                  )}
                  {step < 5 && (
                    <button type="button" onClick={nextStep} className="btn-primary ml-auto">
                      Suivant <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                  {step === 5 && (
                    <button type="submit" disabled={isSubmitting} className="btn-primary ml-auto">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Génération...
                        </>
                      ) : (
                        <>Générer mon audit <ChevronRight className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          </AnimatePresence>

          {/* Trust Badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-8 text-center">
            <p className="text-sm mb-3" style={{ color: '#6B7A8C' }}>Plus de 500 entreprises nous font confiance</p>
            <div className="flex justify-center gap-6 flex-wrap">
              <span className="text-xs" style={{ color: '#8496A9' }}>🔒 Données confidentielles</span>
              <span className="text-xs" style={{ color: '#8496A9' }}>⚡ Rapport instantané</span>
              <span className="text-xs" style={{ color: '#8496A9' }}>💯 Sans engagement</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ==================== CTA FINALE ==================== */}
      <CTASection
        badge="Prochaine étape"
        title="Sécurisez votre entreprise dès aujourd'hui"
        highlight="dès aujourd'hui"
        subtitle="Découvrez nos solutions de cybersécurité et bénéficiez d'un accompagnement personnalisé par nos experts IT et énergie."
        backgroundImage="https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1920&q=80"
        primaryAction={{ label: 'Prendre rendez-vous', to: '/demander-devis' }}
        secondaryAction={{ label: 'Voir les solutions', to: '/solutions' }}
      />
    </div>
  );
};

export default AuditGratuit;