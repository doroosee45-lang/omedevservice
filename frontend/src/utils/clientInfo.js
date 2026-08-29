// src/utils/clientInfo.js
// Construit le bloc "CLIENT / DESTINATAIRE" à partir du VRAI profil du
// client actuellement connecté (voir GET /api/auth/profile). Jamais de
// données fictives : un champ absent affiche "Non renseigné" plutôt
// qu'une valeur inventée. La ligne "Entreprise" n'est incluse que si
// le client en a renseigné une (champ réellement facultatif).
export const NON_RENSEIGNE = 'Non renseigné'

/**
 * @param {object|null} profile - objet renvoyé par GET /api/auth/profile
 *   ({ name, email, phone, companyName, address, city, country, ... })
 * @returns {string[]} lignes prêtes à afficher, la première étant le nom
 */
export const getClientDestinataireLines = (profile) => {
  if (!profile) {
    return [NON_RENSEIGNE, NON_RENSEIGNE, NON_RENSEIGNE, NON_RENSEIGNE, NON_RENSEIGNE]
  }

  const villePays = [profile.city, profile.country].filter(Boolean).join(', ')

  const lines = [profile.name || NON_RENSEIGNE]
  if (profile.companyName) lines.push(profile.companyName)
  lines.push(
    profile.address || NON_RENSEIGNE,
    villePays || NON_RENSEIGNE,
    profile.phone || NON_RENSEIGNE,
    profile.email || NON_RENSEIGNE
  )
  return lines
}
