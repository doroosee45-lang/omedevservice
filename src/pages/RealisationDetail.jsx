// src/pages/Realisations.jsx
import { useState } from "react";
import { projetsData } from "../data/projetsData";
import RealisationModal from "../components/RealisationModal";
import { 
  FaNetworkWired, FaShieldAlt, FaLaptopCode, FaSolarPanel, FaChalkboardTeacher, 
  FaStar, FaStarHalfAlt, FaChevronRight, FaFilter 
} from "react-icons/fa";

const categories = [
  { id: "Tous", label: "Tous", icon: null },
  { id: "IT", label: "Réseau & IT", icon: <FaNetworkWired /> },
  { id: "Securite", label: "Sécurité", icon: <FaShieldAlt /> },
  { id: "Digital", label: "Digital", icon: <FaLaptopCode /> },
  { id: "Energie", label: "Énergie", icon: <FaSolarPanel /> },
  { id: "Formation", label: "Formation", icon: <FaChalkboardTeacher /> },
];

export default function Realisations() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = selectedCategory === "Tous"
    ? projetsData
    : projetsData.filter(p => p.categorie === selectedCategory);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Nos <span className="text-blue-600">Réalisations</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez comment OMDEVE transforme les défis technologiques en succès concrets.
          </p>
        </div>

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-sm"
              }`}
            >
              {cat.icon && <span>{cat.icon}</span>}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grille des projets */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">Aucune réalisation dans cette catégorie.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((projet) => (
              <div
                key={projet.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translateY-2 cursor-pointer"
                onClick={() => openModal(projet)}
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={projet.imagePrincipale}
                    alt={projet.titre}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {projet.categorie}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {projet.titre}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {projet.descriptionCourte}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {projet.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                        {tech}
                      </span>
                    ))}
                    {projet.technologies.length > 3 && (
                      <span className="text-xs text-gray-500">+{projet.technologies.length - 3}</span>
                    )}
                  </div>
                  {/* Aperçu témoignage */}
                  {projet.client.temoignage && (
                    <div className="border-t pt-3 mt-2 text-sm text-gray-500 italic">
                      “{projet.client.temoignage.substring(0, 80)}...”
                    </div>
                  )}
                  <div className="mt-4 flex items-center text-blue-600 font-medium">
                    Voir le projet <FaChevronRight className="ml-1 text-xs" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modale détail */}
      {isModalOpen && selectedProject && (
        <RealisationModal project={selectedProject} onClose={closeModal} />
      )}
    </div>
  );
}