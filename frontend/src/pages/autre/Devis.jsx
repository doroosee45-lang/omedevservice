// src/pages/Devis.jsx
import { useState, useRef } from "react";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaArrowRight,
  FaUpload,
  FaFileAlt,
  FaTrash,
  FaEnvelope,
} from "react-icons/fa";

// ------------------------------
// Catalogue des services (issu du CDC)
// ------------------------------
const servicesList = [
  { id: "reseau", nom: "Réseau & Infrastructure", details: "Installation réseau, WiFi pro, VLAN, maintenance parc" },
  { id: "securite", nom: "Sécurité", details: "Vidéosurveillance, audit cybersécurité, firewall, formation" },
  { id: "digital", nom: "Développement Digital", details: "Sites web, e-commerce, apps mobiles, ERP, SaaS" },
  { id: "cloud", nom: "Cloud & Hébergement", details: "Hébergement HA, migration cloud, backup, monitoring" },
  { id: "energie", nom: "Énergie & Équipements", details: "Panneaux solaires, climatisation, audit énergétique" },
  { id: "vente", nom: "Vente de Matériel", details: "Ordinateurs, smartphones, climatiseurs, panneaux solaires" },
  { id: "formation", nom: "Formation", details: "Certifications, coaching, ateliers, e-learning" },
];

// Génération d'un numéro de devis unique (DEV-XXXXXX)
const generateDevisNumber = () => {
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
  return `DEV-${random}`;
};

// Composant principal
export default function Devis() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: "",
    description: "",
    budget: "",
    localisation: "",
    files: [], // tableau de { name, url, file }
  });
  const [devisNumber, setDevisNumber] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  // Mise à jour des champs simples
  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Gestion des fichiers uploadés
  const handleFileUpload = (e) => {
    const newFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
      file: file,
    }));
    setFormData({ ...formData, files: [...formData.files, ...newFiles] });
  };

  const removeFile = (index) => {
    const newFiles = [...formData.files];
    URL.revokeObjectURL(newFiles[index].url);
    newFiles.splice(index, 1);
    setFormData({ ...formData, files: newFiles });
  };

  // Validation de l'étape courante
  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.service !== "";
      case 2:
        return formData.description.trim().length >= 10;
      case 3:
        return formData.budget !== "" && formData.localisation.trim() !== "";
      case 4:
        return true; // fichiers optionnels
      default:
        return true;
    }
  };

  // Passage à l'étape suivante
  const nextStep = () => {
    if (step < 5 && isStepValid()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // Soumission finale
  const handleSubmit = async () => {
    if (!isStepValid()) return;
    setIsSubmitting(true);
    const newDevisNumber = generateDevisNumber();
    setDevisNumber(newDevisNumber);

    // Simulation d'envoi d'email à l'équipe OMDEVE
    console.log("=== DEMANDE DE DEVIS ===");
    console.log("Numéro:", newDevisNumber);
    console.log("Service:", formData.service);
    console.log("Description:", formData.description);
    console.log("Budget:", formData.budget);
    console.log("Localisation:", formData.localisation);
    console.log("Fichiers joints:", formData.files.map(f => f.name));
    console.log("Email envoyé à omedevservices@gmail.com");

    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);

    // Ici on pourrait stocker en MongoDB et déclencher un vrai email (Nodemailer)
  };

  // Rendu différent après soumission
  if (submitted) {
    return (
      <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Devis envoyé !</h2>
            <p className="text-gray-600 mb-4">
              Votre demande a été enregistrée sous le numéro <strong>{devisNumber}</strong>.
            </p>
            <p className="text-gray-600 mb-6">
              Un email de confirmation a été envoyé à l'équipe OMDEVE. Vous recevrez une réponse sous 48h ouvrées.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 text-left mb-6">
              <p className="text-yellow-800 font-medium">🔔 Relance automatique</p>
              <p className="text-yellow-700 text-sm">
                Si vous n'avez pas de réponse après 48h, un email de relance sera automatiquement envoyé à notre équipe.
              </p>
            </div>
            <button
              onClick={() => window.location.href = "/"}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Affichage du formulaire multi-étapes
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Demander un <span className="text-blue-600">Devis</span>
          </h1>
          <p className="text-lg text-gray-600">Remplissez ce formulaire intelligent, nous vous répondrons sous 48h.</p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= i ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
                }`}
              >
                {i}
              </div>
              <span className="text-xs mt-1 text-gray-500 hidden sm:block">
                {i === 1 && "Service"}
                {i === 2 && "Description"}
                {i === 3 && "Budget & Lieu"}
                {i === 4 && "Fichiers"}
                {i === 5 && "Confirmation"}
              </span>
            </div>
          ))}
        </div>

        {/* Carte du formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {/* Étape 1 : Sélection du service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Quel service vous intéresse ?</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {servicesList.map((service) => (
                  <label
                    key={service.id}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      formData.service === service.nom
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.nom}
                      checked={formData.service === service.nom}
                      onChange={(e) => updateField("service", e.target.value)}
                      className="hidden"
                    />
                    <div className="font-semibold text-gray-800">{service.nom}</div>
                    <div className="text-sm text-gray-500">{service.details}</div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Étape 2 : Description détaillée */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Décrivez votre besoin</h2>
              <textarea
                rows="6"
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Décrivez précisément votre projet, vos contraintes techniques, délais souhaités..."
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <p className="text-sm text-gray-500 mt-2">Minimum 10 caractères.</p>
            </div>
          )}

          {/* Étape 3 : Budget estimé et localisation */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Budget estimé</h2>
                <select
                  value={formData.budget}
                  onChange={(e) => updateField("budget", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3"
                >
                  <option value="">Sélectionnez une fourchette</option>
                  <option value="Moins de 5 000 $">Moins de 5 000 $</option>
                  <option value="5 000 $ - 15 000 $">5 000 $ - 15 000 $</option>
                  <option value="15 000 $ - 30 000 $">15 000 $ - 30 000 $</option>
                  <option value="Plus de 30 000 $">Plus de 30 000 $</option>
                </select>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Localisation géographique</h2>
                <input
                  type="text"
                  value={formData.localisation}
                  onChange={(e) => updateField("localisation", e.target.value)}
                  placeholder="Province / Ville / Cité"
                  className="w-full border border-gray-300 rounded-lg p-3"
                />
              </div>
            </div>
          )}

          {/* Étape 4 : Upload de fichiers */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Fichiers joints (optionnel)</h2>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current.click()}
              >
                <FaUpload className="mx-auto text-gray-400 text-3xl mb-2" />
                <p className="text-gray-600">Cliquez ou glissez-déposez des fichiers (plans, photos, documents)</p>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                      <div className="flex items-center gap-2">
                        <FaFileAlt className="text-blue-500" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <button onClick={() => removeFile(idx)} className="text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Étape 5 : Confirmation et récapitulatif */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Récapitulatif de votre demande</h2>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div><strong>Service :</strong> {formData.service}</div>
                <div><strong>Description :</strong> <p className="mt-1 text-gray-700">{formData.description}</p></div>
                <div><strong>Budget :</strong> {formData.budget}</div>
                <div><strong>Localisation :</strong> {formData.localisation}</div>
                <div><strong>Fichiers joints :</strong> {formData.files.length} fichier(s)</div>
              </div>
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 text-sm">
                  En soumettant ce devis, vous acceptez que vos données soient traitées par OMDEVE. Un numéro unique vous sera attribué et un email de confirmation sera envoyé à notre équipe.
                </p>
              </div>
            </div>
          )}

          {/* Boutons de navigation */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="flex items-center gap-2 px-5 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                <FaArrowLeft /> Retour
              </button>
            )}
            {step < 5 ? (
              <button
                onClick={nextStep}
                disabled={!isStepValid()}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold ml-auto ${
                  isStepValid()
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Suivant <FaArrowRight />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold ml-auto ${
                  !isSubmitting
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
                {!isSubmitting && <FaEnvelope />}
              </button>
            )}
          </div>
        </div>

        {/* Informations complémentaires */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Toutes les informations sont confidentielles.</p>
          <p>📧 Une copie vous sera envoyée par email (simulation, à connecter plus tard).</p>
        </div>
      </div>
    </div>
  );
}