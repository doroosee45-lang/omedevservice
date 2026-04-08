// src/pages/AuditGratuit.jsx
import { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaCalendarCheck, FaFilePdf, FaEnvelope } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// ------------------------------
// Données du questionnaire
// ------------------------------
const questions = [
  {
    id: "besoins",
    question: "Quels sont vos principaux besoins actuels ?",
    type: "checkbox",
    options: [
      "Améliorer mon réseau / WiFi",
      "Sécuriser mes données / cybersécurité",
      "Créer ou refaire mon site web / e-commerce",
      "Passer au cloud / hébergement",
      "Installer des panneaux solaires",
      "Former mon équipe aux nouvelles technologies",
      "Autre"
    ]
  },
  {
    id: "infrastructure",
    question: "Quelle est votre infrastructure existante ?",
    type: "radio",
    options: [
      "Aucune infrastructure IT",
      "Quelques ordinateurs sans réseau organisé",
      "Réseau local de base (switch, routeur)",
      "Infrastructure complète (serveur, VLAN, firewall)",
      "Cloud / hébergement externe"
    ]
  },
  {
    id: "budget",
    question: "Quel est votre budget estimé pour ce projet ?",
    type: "radio",
    options: [
      "Moins de 5 000 $",
      "5 000 $ - 15 000 $",
      "15 000 $ - 30 000 $",
      "Plus de 30 000 $"
    ]
  },
  {
    id: "objectifs",
    question: "Quels sont vos objectifs prioritaires ?",
    type: "checkbox",
    options: [
      "Réduction des coûts",
      "Amélioration des performances",
      "Sécurité et conformité",
      "Croissance / scalabilité",
      "Expérience utilisateur / client"
    ]
  },
  {
    id: "contact",
    question: "Merci de laisser vos coordonnées pour recevoir le rapport d'audit",
    type: "contact",
    fields: ["nom", "email", "telephone"]
  }
];

// ------------------------------
// Génération du PDF avec diagnostic personnalisé
// ------------------------------
const generateAuditPDF = (reponses, contact) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString("fr-FR");

  // En-tête OMDEVE
  doc.setFillColor(0, 51, 102);
  doc.rect(0, 0, 210, 40, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("OMDEVE Services", 14, 20);
  doc.setFontSize(10);
  doc.text("Audit Technologique Gratuit", 14, 32);
  doc.setTextColor(0, 0, 0);

  // Infos génération
  doc.setFontSize(10);
  doc.text(`Généré le : ${date}`, 14, 55);
  doc.text(`Pour : ${contact.nom} (${contact.email})`, 14, 62);

  // Réponses au questionnaire
  doc.setFontSize(14);
  doc.text("1. Vos réponses", 14, 80);
  let y = 95;
  for (const [key, value] of Object.entries(reponses)) {
    if (key === "contact") continue;
    const label = questions.find(q => q.id === key)?.question || key;
    const texte = Array.isArray(value) ? value.join(", ") : value;
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(`${label} : ${texte}`, 180);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 4;
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
  }

  // Diagnostic et recommandations personnalisées
  doc.addPage();
  doc.setFontSize(14);
  doc.text("2. Diagnostic & recommandations", 14, 20);
  let recs = [];

  // Logique simple de recommandations basée sur les réponses
  if (reponses.besoins?.includes("Améliorer mon réseau / WiFi")) {
    recs.push("✅ Audit réseau complet : analyse de la couverture WiFi, débits et sécurité. Proposition d'équipements professionnels (Ubiquiti, MikroTik).");
  }
  if (reponses.besoins?.includes("Sécuriser mes données / cybersécurité")) {
    recs.push("🔒 Mise en place d'une politique de sécurité : firewall, antivirus, sauvegardes automatisées et formation des utilisateurs.");
  }
  if (reponses.besoins?.includes("Créer ou refaire mon site web / e-commerce")) {
    recs.push("🌐 Développement d'une plateforme moderne (React/Node.js) avec référencement SEO et expérience utilisateur optimisée.");
  }
  if (reponses.besoins?.includes("Passer au cloud / hébergement")) {
    recs.push("☁️ Migration vers le cloud (AWS, Vercel, MongoDB Atlas) pour une scalabilité et une disponibilité maximales.");
  }
  if (reponses.besoins?.includes("Installer des panneaux solaires")) {
    recs.push("☀️ Audit énergétique et installation de panneaux photovoltaïques pour réduire votre facture électrique.");
  }
  if (reponses.besoins?.includes("Former mon équipe")) {
    recs.push("🎓 Programme de formation certifiant sur mesure (cybersécurité, bureautique, réseau, etc.).");
  }

  if (reponses.infrastructure === "Aucune infrastructure IT") {
    recs.push("🏗️ Démarrage recommandé : installation d'un réseau de base sécurisé + équipements adaptés à votre effectif.");
  } else if (reponses.infrastructure === "Infrastructure complète") {
    recs.push("📈 Optimisation avancée : audit de performance, mise à jour firmware, segmentation VLAN et monitoring.");
  }

  if (reponses.budget === "Moins de 5 000 $") {
    recs.push("💰 Plan d'action par étapes : prioriser les actions à fort impact (ex: sécurisation du réseau).");
  } else if (reponses.budget === "Plus de 30 000 $") {
    recs.push("🚀 Solution clé en main : infrastructure redondante, support 24/7 et formation complète.");
  }

  if (recs.length === 0) {
    recs.push("💡 Une analyse plus approfondie est nécessaire. Contactez-nous pour un audit personnalisé.");
  }

  let yRec = 35;
  recs.forEach(rec => {
    const lines = doc.splitTextToSize(rec, 180);
    doc.text(lines, 14, yRec);
    yRec += lines.length * 6 + 2;
    if (yRec > 270) {
      doc.addPage();
      yRec = 20;
    }
  });

  // Estimation budgétaire indicative
  doc.setFontSize(12);
  doc.text("Estimation budgétaire indicative", 14, yRec + 10);
  doc.setFontSize(10);
  doc.text("Cette estimation sera affinée lors d'un échange avec nos experts.", 14, yRec + 20);
  doc.text("Pour un devis précis, merci de demander un rendez-vous.", 14, yRec + 28);

  // Pied de page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("OMDEVE Services - Audit gratuit - www.omdeve.com", 14, 290);
  }

  // Sauvegarde
  doc.save(`audit_omdeve_${contact.nom.replace(/\s/g, "_")}.pdf`);
  return doc.output("datauristring");
};

// ------------------------------
// Composant principal
// ------------------------------
export default function AuditGratuit() {
  const [step, setStep] = useState(0);
  const [reponses, setReponses] = useState({
    besoins: [],
    infrastructure: "",
    budget: "",
    objectifs: [],
    contact: { nom: "", email: "", telephone: "" }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showRdvModal, setShowRdvModal] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const currentQuestion = questions[step];

  const updateReponse = (value, field = null) => {
    if (currentQuestion.type === "checkbox") {
      const current = reponses[currentQuestion.id] || [];
      if (current.includes(value)) {
        setReponses({ ...reponses, [currentQuestion.id]: current.filter(v => v !== value) });
      } else {
        setReponses({ ...reponses, [currentQuestion.id]: [...current, value] });
      }
    } else if (currentQuestion.type === "radio") {
      setReponses({ ...reponses, [currentQuestion.id]: value });
    } else if (currentQuestion.type === "contact" && field) {
      setReponses({
        ...reponses,
        contact: { ...reponses.contact, [field]: value }
      });
    }
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleGenerateAndSend();
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const isStepValid = () => {
    const q = currentQuestion;
    if (q.type === "checkbox") return (reponses[q.id] || []).length > 0;
    if (q.type === "radio") return reponses[q.id] && reponses[q.id] !== "";
    if (q.type === "contact") {
      return reponses.contact.nom && reponses.contact.email && reponses.contact.telephone;
    }
    return true;
  };

  const handleGenerateAndSend = async () => {
    setIsGenerating(true);
    // Simuler un délai de génération
    await new Promise(resolve => setTimeout(resolve, 1500));
    const pdfDataUri = generateAuditPDF(
      {
        besoins: reponses.besoins,
        infrastructure: reponses.infrastructure,
        budget: reponses.budget,
        objectifs: reponses.objectifs
      },
      reponses.contact
    );
    // Simulation d'envoi d'email (à remplacer par EmailJS ou appel API)
    console.log("Email envoyé à", reponses.contact.email, "avec le PDF en pièce jointe.");
    setEmailSent(true);
    setIsGenerating(false);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Audit <span className="text-blue-600">Gratuit</span>
          </h1>
          <p className="text-xl text-gray-600">
            Répondez à quelques questions et recevez un diagnostic personnalisé avec recommandations.
          </p>
        </div>

        {/* Carte du questionnaire */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Étape {step + 1} / {questions.length}</span>
              <div className="w-32 bg-blue-400 rounded-full h-2">
                <div className="bg-white h-2 rounded-full" style={{ width: `${((step + 1) / questions.length) * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Question */}
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{currentQuestion.question}</h2>

            {/* Champs selon le type */}
            {currentQuestion.type === "checkbox" && (
              <div className="space-y-3">
                {currentQuestion.options.map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={(reponses[currentQuestion.id] || []).includes(opt)}
                      onChange={() => updateReponse(opt)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "radio" && (
              <div className="space-y-3">
                {currentQuestion.options.map(opt => (
                  <label key={opt} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="radio"
                      name="radio-group"
                      checked={reponses[currentQuestion.id] === opt}
                      onChange={() => updateReponse(opt)}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="text-gray-700">{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {currentQuestion.type === "contact" && (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Votre nom complet"
                  value={reponses.contact.nom}
                  onChange={(e) => updateReponse(e.target.value, "nom")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  value={reponses.contact.email}
                  onChange={(e) => updateReponse(e.target.value, "email")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Votre numéro de téléphone"
                  value={reponses.contact.telephone}
                  onChange={(e) => updateReponse(e.target.value, "telephone")}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Boutons navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
                >
                  <FaArrowLeft /> Précédent
                </button>
              )}
              <button
                onClick={nextStep}
                disabled={!isStepValid() || isGenerating}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                  isStepValid() && !isGenerating
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {step === questions.length - 1 ? (
                  isGenerating ? "Génération..." : "Obtenir mon audit"
                ) : (
                  <>Suivant <FaArrowRight /></>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Message de confirmation après génération */}
        {emailSent && (
          <div className="mt-6 bg-green-100 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-green-600 text-xl" />
              <div>
                <p className="font-semibold text-green-800">Rapport envoyé !</p>
                <p className="text-green-700">Un email avec votre audit PDF a été envoyé à {reponses.contact.email}.</p>
              </div>
            </div>
          </div>
        )}

        {/* Option de prise de rendez-vous */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowRdvModal(true)}
            className="inline-flex items-center gap-2 bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-blue-50 transition"
          >
            <FaCalendarCheck /> Prendre rendez-vous avec un expert
          </button>
        </div>
      </div>

      {/* Modale de prise de rendez-vous (simulation Calendly) */}
      {showRdvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowRdvModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold mb-4">Prendre rendez-vous</h3>
            <p className="text-gray-600 mb-4">
              Un de nos experts vous contactera dans les 24h pour fixer un créneau.
            </p>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              placeholder="Votre email"
              className="w-full mb-3 px-4 py-2 border rounded-lg"
            />
            <textarea
              placeholder="Message optionnel"
              rows="3"
              className="w-full mb-4 px-4 py-2 border rounded-lg"
            ></textarea>
            <button
              onClick={() => {
                alert("Demande de rendez-vous envoyée ! Nous vous contacterons rapidement.");
                setShowRdvModal(false);
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Envoyer la demande
            </button>
          </div>
        </div>
      )}
    </div>
  );
}