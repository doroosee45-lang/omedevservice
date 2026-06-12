// src/components/RealisationModal.jsx
import { useEffect } from "react";
import { FaTimes, FaStar, FaStarHalfAlt, FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";

export default function RealisationModal({ project, onClose }) {
  // Fermer avec Echap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    return (
      <div className="flex text-yellow-400">
        {[...Array(fullStars)].map((_, i) => <FaStar key={i} />)}
        {hasHalfStar && <FaStarHalfAlt />}
        {[...Array(5 - Math.ceil(rating))].map((_, i) => <FaStar key={i + fullStars} className="text-gray-300" />)}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" onClick={onClose}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

      {/* Modal content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div
          className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition"
          >
            <FaTimes />
          </button>

          {/* Galerie simple (première image en grand) */}
          <div className="relative h-80 md:h-96 bg-gray-800">
            <img
              src={project.imagePrincipale}
              alt={project.titre}
              className="w-full h-full object-contain"
            />
          </div>

          <div className="p-6 md:p-8">
            {/* Titre et métadonnées */}
            <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{project.titre}</h2>
              <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
                {project.categorie}
              </span>
            </div>

            <div className="flex items-center text-gray-500 text-sm mb-6">
              <FaCalendarAlt className="mr-1" />
              {new Date(project.date).toLocaleDateString("fr-FR")}
            </div>

            {/* Description complète */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Détails du projet</h3>
              <p className="text-gray-700 leading-relaxed">{project.descriptionLongue}</p>
            </div>

            {/* Technologies */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3">Technologies utilisées</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Témoignage client */}
            {project.client.temoignage && (
              <div className="bg-blue-50 rounded-xl p-6 mb-8 border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  {project.client.photoClient && (
                    <img
                      src={project.client.photoClient}
                      alt={project.client.clientNom}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {renderStars(project.client.note)}
                      <span className="text-sm text-gray-600 ml-2">{project.client.note}/5</span>
                    </div>
                    <p className="text-gray-700 italic mb-3">“{project.client.temoignage}”</p>
                    <p className="font-semibold">{project.client.clientNom}</p>
                    <p className="text-sm text-gray-500">{project.client.clientPoste}, {project.client.nom}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Bouton retour */}
            <button
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <FaChevronLeft /> Retour aux réalisations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}