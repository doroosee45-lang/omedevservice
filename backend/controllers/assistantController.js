// backend/controllers/assistantController.js — Omedev Assist · Intelligence duale
// Primaire : Anthropic Claude  |  Fallback : moteur NLP local

let Anthropic;
let anthropicClient;
try {
  Anthropic = require('@anthropic-ai/sdk');
  if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here') {
    anthropicClient = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
} catch {}

// ── Session store ──────────────────────────────────────────────────────────────
const sessions    = new Map(); // sessionId → { history: [], lastProduct: null, lang: 'fr' }
const sessionTs   = new Map();
const SESSION_TTL = 30 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [id, ts] of sessionTs.entries()) {
    if (now - ts > SESSION_TTL) { sessions.delete(id); sessionTs.delete(id); }
  }
}, 5 * 60 * 1000);

const getSession = (sid) => {
  if (!sessions.has(sid)) sessions.set(sid, { history: [], lastProduct: null, lang: 'fr', askedQuestions: [] });
  sessionTs.set(sid, Date.now());
  return sessions.get(sid);
};

// ══════════════════════════════════════════════════════════════════════════════
// SYSTÈME PROMPT ANTHROPIC
// ══════════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `
Tu es **Omedev Assist** 🤖, l'assistant commercial & technique d'**Omedev Services**.

IDENTITÉ : Expert ferronnerie, mobilier métallique sur mesure, vitrines commerciales et solutions IT/Énergie. Ton professionnel, chaleureux, jamais robotique. Emojis avec modération.

LANGUES : Détecte automatiquement (Français 🇫🇷, Lingala 🇨🇩, Anglais 🇬🇧) et réponds dans cette langue.

CATALOGUE & PRIX INDICATIFS :
• Portails coulissants/battants : 800–3 500€ (+400–800€ motorisé)
• Portes métalliques : 250–1 200€ | Fenêtres alu : 180–600€/unité
• Escaliers métalliques : 1 500–8 000€ | Garde-corps : 80–250€/ml
• Salons VIP : 600–2 500€ | Lits modernes : 400–1 200€ | Tables/chaises : 200–800€
• Vitrines de magasin : 500–2 000€ | Comptoirs : 300–1 500€
• Audit sécurité : 80€ TTC (rapport sous 48h)
• Services IT : Web, e-commerce, réseaux, sécurité, cloud, énergie solaire

QUALIFICATION : Pose max 2-3 questions ciblées (jamais tout d'un coup) :
- Portail : dimensions, motorisé ?, matière (acier/alu/inox)
- Escalier : int/ext, marches, rampe ?
- Garde-corps : longueur, fixation murale/sol
- Mobilier : type, dimensions, matière/couleur
- Vitrine : longueur × hauteur, serrure, éclairage

MATIÈRES : Acier (robuste, entretien requis), Alu (léger, anti-corrosion, 0 entretien), Inox (premium, max durabilité), Fer forgé (décoratif classique)

PROCESSUS : Devis gratuit 24h → acompte 30% → fabrication 5–21j → livraison+installation incluses

ESCALADE HUMAIN si : frustration forte, devis >5000€, complexité technique, client le demande.
Message : "Cette demande mérite l'œil de notre expert ! 👷 Je transfère votre dossier — contacté sous 30 min. Ça vous va ?"

ACTIONS (une seule, si pertinent, à la fin du message) :
[ACTION:{"type":"devis_link","label":"Demander un devis gratuit","url":"/demander-devis"}]
[ACTION:{"type":"audit_link","label":"Réserver un audit","url":"/audit-gratuit"}]
[ACTION:{"type":"contact_link","label":"Contacter notre équipe","url":"/contact"}]
[ACTION:{"type":"portfolio_link","label":"Voir nos réalisations","url":"/ferronnerie/projets"}]

RÈGLES : Jamais de prix fournisseurs/marges. Prix = indicatifs. Max 4 phrases/message. Toujours proposer une action concrète.
`.trim();

// ══════════════════════════════════════════════════════════════════════════════
// INTELLIGENCE LOCALE — NLP ENGINE
// ══════════════════════════════════════════════════════════════════════════════

// ── Détection de langue ──────────────────────────────────────────────────────

const LANG_SIGNALS = {
  lingala: ['nalingi', 'bolai', 'bofuteli', 'malamu', 'ndenge', 'nzela', 'mbongo',
            'kosomba', 'kopesa', 'biso', 'ngai', 'mpe', 'lisusu', 'mokili', 'eloko',
            'bandeko', 'bino', 'wapi', 'penza', 'soki', 'ntango', 'nzoto'],
  english: ['hello', 'hi there', 'how much', 'price', 'cost', 'want', 'need',
            'please', 'thank', 'can you', 'do you', 'what is', 'how do', 'i need',
            'i want', 'quote', 'estimate', 'material', 'iron', 'aluminum', 'steel'],
};

const detectLanguage = (text) => {
  const t = text.toLowerCase();
  const scores = { lingala: 0, english: 0, french: 1 };
  for (const w of LANG_SIGNALS.lingala) if (t.includes(w)) scores.lingala += 2;
  for (const w of LANG_SIGNALS.english) if (t.includes(w)) scores.english += 1;
  if (scores.lingala >= 2) return 'ln';
  if (scores.english > scores.french) return 'en';
  return 'fr';
};

// ── Détection d'intention ────────────────────────────────────────────────────

const INTENT_PATTERNS = {
  devis:     [/devis/i, /prix/i, /combien/i, /tarif/i, /coût/i, /cout/i, /chiffr/i,
              /quote/i, /price/i, /cost/i, /estimate/i, /mbongo/i, /nalingi kosomba/i,
              /budget/i, /fourchette/i],
  rdv:       [/rendez-vous/i, /rdv/i, /visite/i, /audit/i, /disponib/i, /créneau/i,
              /réserver/i, /reserver/i, /planif/i, /mardi|mercredi|jeudi|vendredi|lundi/i,
              /appointment/i, /visit/i, /book/i, /schedule/i],
  paiement:  [/pay/i, /payer/i, /paiement/i, /acompte/i, /virement/i, /wave/i,
              /orange money/i, /airtel/i, /carte/i, /facture/i, /invoice/i, /payment/i],
  materiau:  [/acier/i, /aluminium/i, /alu\b/i, /inox/i, /fer forg/i, /steel/i,
              /iron/i, /métal/i, /matière/i, /matiere/i, /matériau/i, /materiau/i,
              /difference/i, /différence/i, /meilleur/i, /compare/i, /avantage/i],
  reclamation:[/problème/i, /probleme/i, /déçu/i, /decu/i, /mauvais/i, /mécontent/i,
              /mecontent/i, /réclamation/i, /reclamation/i, /complaint/i, /issue/i,
              /pas content/i, /pas satisfait/i, /remboursement/i, /retard/i],
  garantie:  [/garantie/i, /warranty/i, /sav/i, /après-vente/i, /apres vente/i, /durable/i],
  delai:     [/délai/i, /delai/i, /temps/i, /quand/i, /durée/i, /duree/i, /combien de temps/i,
              /livraison/i, /fabrication/i, /how long/i, /when/i],
  greeting:  [/^(bonjour|bonsoir|salut|coucou|hello|hi|hey|bonne nuit|bonne journée)[\s!,.]*/i,
              /^(malamu|mbote)[\s!,.]*/i, /comment allez/i, /ça va/i, /how are you/i],
  farewell:  [/au revoir/i, /merci/i, /bonne journée/i, /à bientôt/i, /goodbye/i,
              /thanks/i, /thank you/i, /c'est tout/i, /c est tout/i],
  info_ent:  [/omedev/i, /votre entreprise/i, /vous êtes/i, /où êtes/i, /qui etes/i,
              /about you/i, /your company/i, /adresse/i, /localisation/i, /zone/i],
};

const detectIntent = (text, history) => {
  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    if (patterns.some(p => p.test(text))) return intent;
  }
  // Context fallback: if we were discussing a product, assume devis intent
  if (history.length > 0) return 'devis';
  return 'general';
};

// ── Détection de produit ─────────────────────────────────────────────────────

const PRODUCT_KEYWORDS = {
  portail:    ['portail', 'gate', 'nzela ya ndako', 'portail coulissant', 'portail battant', 'clôture', 'cloture', 'barrière', 'barriere'],
  porte:      ['porte métallique', 'porte metal', 'porte blindée', 'porte blindee', 'door', 'porte fer'],
  escalier:   ['escalier', 'staircase', 'stairs', 'marche', 'escalier métallique'],
  garde_corps:['garde-corps', 'garde corps', 'balcon', 'balustrade', 'railing', 'rambarde'],
  fenetre:    ['fenêtre', 'fenetre', 'window', 'menuiserie', 'aluminium', 'vitrage'],
  salon:      ['salon', 'canapé', 'canape', 'sofa', 'vip', 'salon vip', 'living'],
  lit:        ['lit', 'chambre', 'bed', 'bedroom'],
  table:      ['table', 'chaise', 'chair', 'bureau', 'desk', 'mobilier'],
  vitrine:    ['vitrine', 'showcase', 'magasin', 'boutique', 'shop'],
  comptoir:   ['comptoir', 'counter', 'accueil', 'reception'],
  structure:  ['charpente', 'hangar', 'structure métallique', 'structure metal', 'abri'],
};

const detectProduct = (text) => {
  const t = text.toLowerCase();
  for (const [product, keywords] of Object.entries(PRODUCT_KEYWORDS)) {
    if (keywords.some(kw => t.includes(kw))) return product;
  }
  return null;
};

// ── Base de connaissances ────────────────────────────────────────────────────

const KB = {
  products: {
    portail:    { label: 'Portail', price: '800 – 3 500€', extra: 'Motorisation : +400 à 800€ en option.', questions: { fr: ['Quelle est la largeur d\'ouverture souhaitée ?', 'Le souhaitez-vous motorisé ?', 'Quelle matière préférez-vous (acier, aluminium, inox) ?', 'Coulissant ou battant ?'], en: ['What is the desired opening width?', 'Do you want it motorized?', 'What material do you prefer (steel, alu, inox)?'], ln: ['Bolai ya nzela ezali nini ?', 'Olingi moteur to te ?', 'Ozali koluka matière nini (acier, alu, inox) ?'] } },
    porte:      { label: 'Porte métallique', price: '250 – 1 200€', extra: 'Intérieure ou extérieure, blindée sur demande.', questions: { fr: ['Quelles sont les dimensions (largeur × hauteur) ?', 'Intérieure ou extérieure ?', 'Souhaitez-vous un blindage ?'], en: ['What are the dimensions?', 'Interior or exterior?', 'Do you need reinforcement?'], ln: ['Dimensions ezali nini ?', 'Ezali kati to libanda ?'] } },
    escalier:   { label: 'Escalier métallique', price: '1 500 – 8 000€', extra: 'Intérieur ou extérieur, avec ou sans rampe.', questions: { fr: ['Intérieur ou extérieur ?', 'Quel style souhaitez-vous (moderne, classique) ?', 'Combien de marches approximativement ?'], en: ['Interior or exterior?', 'Modern or classic style?', 'How many steps approximately?'], ln: ['Ezali kati to libanda ?', 'Bolai ya escalier ezali nini ?'] } },
    garde_corps:{ label: 'Garde-corps', price: '80 – 250€ par mètre linéaire', extra: 'Fixation murale ou au sol.', questions: { fr: ['Quelle est la longueur totale à couvrir (en mètres) ?', 'Fixation murale ou au sol ?', 'Norme PMR requise ?'], en: ['What is the total length to cover?', 'Wall or floor mounting?'], ln: ['Bolai ezali nini (metele) ?', 'Fixation wapi (mur to sol) ?'] } },
    fenetre:    { label: 'Fenêtre aluminium', price: '180 – 600€ par unité', extra: 'Simple ou double vitrage disponible.', questions: { fr: ['Quelles sont les dimensions souhaitées ?', 'Simple ou double vitrage ?', 'Combien de fenêtres au total ?'], en: ['What are the dimensions?', 'Single or double glazing?', 'How many windows?'], ln: ['Dimensions ezali nini ?', 'Vitrage ya motoba to mibale ?'] } },
    salon:      { label: 'Salon VIP', price: '600 – 2 500€', extra: '5 ou 7 places, entièrement sur mesure.', questions: { fr: ['5 ou 7 places ?', 'Quelle est la surface de la pièce ?', 'Matière et couleur souhaitées ?'], en: ['5 or 7 seater?', 'Room dimensions?', 'Preferred material and color?'], ln: ['Bilindo 5 to 7 ?', 'Bolai ya salle ezali nini ?'] } },
    lit:        { label: 'Lit moderne', price: '400 – 1 200€', extra: 'Simple, double ou king size.', questions: { fr: ['Taille souhaitée (simple, double, king size) ?', 'Avec rangements intégrés ?', 'Style souhaité (modern, minimaliste) ?'], en: ['Size (single, double, king)?', 'With built-in storage?', 'Style preference?'], ln: ['Bofuteli nini (simple, double, king) ?', 'Olingi storage kati ?'] } },
    vitrine:    { label: 'Vitrine commerciale', price: '500 – 2 000€', extra: 'Avec serrure sécurisée et éclairage en option.', questions: { fr: ['Quelles dimensions (longueur × hauteur) ?', 'Avec serrure sécurisée ?', 'Éclairage intégré souhaité ?', 'Type de commerce ?'], en: ['What dimensions?', 'With security lock?', 'Integrated lighting?'], ln: ['Dimensions ezali nini ?', 'Olingi serrure ya sécurité ?'] } },
    comptoir:   { label: 'Comptoir commercial', price: '300 – 1 500€', extra: 'Sur mesure selon vos dimensions.', questions: { fr: ['Quelle longueur souhaitez-vous ?', 'Avec rangements intégrés ?', 'Matière préférée ?'], en: ['Desired length?', 'With built-in storage?'], ln: ['Bolai ya comptoir ezali nini ?'] } },
    structure:  { label: 'Structure métallique', price: 'Sur devis', extra: 'Charpente, hangar, abri : sur mesure.', questions: { fr: ['Quel type de structure (hangar, charpente, abri) ?', 'Quelles dimensions approximatives ?', 'Usage prévu ?'], en: ['What type of structure?', 'Approximate dimensions?', 'Intended use?'], ln: ['Structure ya ndenge nini ?'] } },
  },

  materials: {
    acier:   { fr: "L'acier est robuste et économique, idéal pour portails lourds et structures. Il nécessite un traitement anti-corrosion (thermolaquage). Excellent rapport qualité/prix 💪", en: "Steel is strong and cost-effective, ideal for heavy gates and structures. Requires anti-corrosion treatment (powder coating). Great value!", ln: "Acier ezali solid mpe na prix malamu. Esengeli traitement anti-rouille. Likambo malamu !" },
    aluminium:{ fr: "L'aluminium est léger, 100% anti-corrosion et zéro entretien. Parfait pour fenêtres, balcons et vitrines. Un peu plus cher que l'acier mais dure toute une vie ✨", en: "Aluminum is lightweight, 100% corrosion-resistant and maintenance-free. Perfect for windows, balconies and shop displays. Slightly pricier than steel but lasts a lifetime ✨", ln: "Aluminium ezali pete, anti-rouille 100%, entretien te. Malamu na bafenêtre, balcon na vitrines. Prix ezali lisusu moke, kasi ekoba vie mobimba ✨" },
    inox:    { fr: "L'inox (acier inoxydable) est le haut de gamme : résistance maximale, esthétique premium, zéro rouille garantie. Idéal pour garde-corps design et mobilier luxe 🏆", en: "Stainless steel is premium: maximum resistance, premium aesthetics, zero rust guaranteed. Ideal for designer railings and luxury furniture 🏆", ln: "Inox ezali na qualité ya solo : résistance maximale, beau mpe rouille te. Malamu na garde-corps ya design 🏆" },
    fer_forge:{ fr: "Le fer forgé apporte une esthétique artisanale et classique. Parfait pour portails décoratifs et mobilier de jardin. Demande un entretien régulier (peinture anti-rouille tous les 3-5 ans)", en: "Wrought iron gives a classic, artisanal look. Great for decorative gates and garden furniture. Requires regular maintenance (anti-rust paint every 3-5 years)", ln: "Fer forgé epesi aspect ya classique. Malamu na portail ya décoratif. Esengeli entretien ya nzela nzela" },
  },

  faq: {
    delai:    { fr: "Nos délais : 5-7 jours pour une porte simple, 10-15 jours pour un portail, 15-21 jours pour un escalier ou projet complexe ⏱️", en: "Our lead times: 5-7 days for a simple door, 10-15 days for a gate, 15-21 days for stairs or complex projects ⏱️", ln: "Temps ya mosala : 5-7 jours na porte simple, 10-15 jours na portail, 15-21 jours na escalier mpe projet ya mobimba ⏱️" },
    garantie: { fr: "Nous offrons 2 ans de garantie sur fabrication et installation. Les produits alu et inox sont garantis à vie contre la rouille ✅", en: "We offer 2 years warranty on manufacturing and installation. Aluminum and inox products are lifetime guaranteed against rust ✅", ln: "Toepela garantie ya mbula 2 na fabrication mpe installation. Produits ya alu mpe inox : garantie ya vie oyo te ✅" },
    livraison:{ fr: "La livraison et l'installation sur site sont incluses dans tous nos prix. Nous intervenons dans toute la région 🚚", en: "Delivery and on-site installation are included in all our prices. We operate throughout the region 🚚", ln: "Livraison mpe installation na site ezali kati ya prix nyonso. Tozali kosala na région mobimba 🚚" },
    paiement: { fr: "Nous acceptons : carte bancaire, virement, Wave, Orange Money, Airtel Money. Acompte 30% pour lancer la fabrication, solde à la livraison 💳", en: "We accept: bank card, wire transfer, Wave, Orange Money, Airtel Money. 30% deposit to start production, balance on delivery 💳", ln: "Topesa na : carte bancaire, virement, Wave, Orange Money, Airtel Money. Acompte 30% ya kobanda mosala, solde na livraison 💳" },
    audit:    { fr: "Notre audit sécurité est à 80€ TTC. Rapport écrit détaillé remis sous 48h avec recommandations et priorités d'intervention 🔍", en: "Our security audit is 80€ incl. tax. Detailed written report delivered within 48h with recommendations and action priorities 🔍", ln: "Audit ya sécurité ezali 80€ TTC. Rapport ya bolamu epesami na 48h elongo na recommandations 🔍" },
    acompte:  { fr: "Un acompte de 30% est demandé pour lancer la fabrication. Le solde est réglé à la livraison ou à la fin du chantier. Reçu automatique envoyé 📄", en: "A 30% deposit is required to start manufacturing. Balance is due at delivery or end of work. Automatic receipt sent 📄", ln: "Acompte ya 30% esengeli ya kobanda mosala. Solde opesa na livraison. Reçu ezali kotindama 📄" },
    entreprise:{ fr: "Omedev Services est votre partenaire spécialisé en ferronnerie sur mesure, mobilier métallique, vitrines commerciales et solutions IT/Énergie. Disponibles 24h/24, 7j/7 pour tous vos projets 🏢", en: "Omedev Services is your specialist in custom metalwork, metal furniture, commercial displays and IT/Energy solutions. Available 24/7 for all your projects 🏢", ln: "Omedev Services ezali partenaire ya bino na ferronnerie sur mesure, mobilier ya métal, vitrines mpe solutions IT/Énergie. Tozali 24h/24 na bilenge na bino nyonso 🏢" },
  },
};

// ── Générateur de réponses locales ───────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const T = {
  fr: {
    greeting: [
      "Bonjour ! 👋 Je suis Omedev Assist, votre conseiller spécialisé. Comment puis-je vous aider aujourd'hui ?",
      "Bonjour et bienvenue ! 🤖 Je suis là pour répondre à toutes vos questions sur nos services de ferronnerie, mobilier et solutions IT. Que puis-je faire pour vous ?",
      "Bonjour ! Ravi de vous accueillir chez Omedev Services. Quel projet avez-vous en tête ? 😊",
    ],
    farewell: [
      "Merci de votre confiance ! N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée ! 👋",
      "À votre service ! Si vous avez des questions ou souhaitez un devis, je suis là 24h/24. Au revoir ! 😊",
    ],
    devis_generic: [
      "Je serais ravi de vous préparer un devis personnalisé ! Pour commencer, de quel type de projet s'agit-il exactement ?",
      "Super ! Pour établir un devis précis, dites-moi quel produit ou service vous intéresse et je vous pose quelques questions rapides 🎯",
    ],
    devis_product: (product, lang) => {
      const p = KB.products[product];
      const q = p.questions[lang][0]; // First qualification question
      return `Super projet ! 🏗️ Pour votre **${p.label}**, le tarif est généralement de **${p.price}**. ${p.extra}\n\nPour un devis précis : ${q}`;
    },
    info_generic: "Bien sûr ! Omedev Services est spécialisé en ferronnerie sur mesure (portails, escaliers, garde-corps), mobilier métallique (salons VIP, lits, tables) et vitrines commerciales. Nous proposons aussi des solutions IT et énergie solaire. Sur quel service souhaitez-vous plus d'infos ?",
    qualification: (product, qIdx, lang) => {
      const p = KB.products[product];
      const questions = p.questions[lang] || p.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Parfait ! ${questions[qIdx]}`;
    },
    escalade: "Cette demande mérite l'attention de notre équipe d'experts ! 👷 Je transmets votre dossier immédiatement — un conseiller vous contactera sous 30 minutes. Ça vous va ?",
    unknown: [
      "Je ne suis pas sûr de bien comprendre votre demande. Pourriez-vous préciser ? Je suis là pour vous aider avec nos produits de ferronnerie, mobilier ou services IT 😊",
      "Hmm, pouvez-vous reformuler ? Je suis spécialisé sur la ferronnerie sur mesure, le mobilier métallique et les solutions IT/Énergie d'Omedev Services.",
    ],
  },
  en: {
    greeting: [
      "Hello! 👋 I'm Omedev Assist, your specialist advisor. How can I help you today?",
      "Welcome to Omedev Services! 🤖 I'm here for all your questions about metalwork, furniture and IT solutions. What can I do for you?",
    ],
    farewell: [
      "Thank you! Feel free to come back anytime. Have a great day! 👋",
      "Happy to help! I'm here 24/7 if you need a quote or have questions. Goodbye! 😊",
    ],
    devis_generic: [
      "I'd love to prepare a personalized quote! What type of project are you looking for?",
      "Great! To give you an accurate quote, which product or service are you interested in?",
    ],
    devis_product: (product, lang) => {
      const p = KB.products[product];
      const q = (p.questions.en || p.questions.fr)[0];
      return `Great project! 🏗️ For a **${p.label}**, prices typically range from **${p.price}**. ${p.extra}\n\nTo get an accurate quote: ${q}`;
    },
    info_generic: "Of course! Omedev Services specializes in custom metalwork (gates, stairs, railings), metal furniture (VIP sofas, beds, tables) and commercial displays. We also offer IT and solar energy solutions. Which service would you like to know more about?",
    qualification: (product, qIdx, lang) => {
      const p = KB.products[product];
      const questions = p.questions.en || p.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Perfect! ${questions[qIdx]}`;
    },
    escalade: "This requires our expert team's attention! 👷 I'm forwarding your file now — a specialist will contact you within 30 minutes. Does that work for you?",
    unknown: [
      "I'm not sure I understood that. Could you clarify? I specialize in metalwork, furniture and IT solutions for Omedev Services 😊",
    ],
  },
  ln: {
    greeting: [
      "Mbote! 👋 Ngai Omedev Assist, conseiller ya bino. Nakosuisa yo ndenge nini lelo ?",
      "Malamu na kobanda ! 🤖 Ngai nazali awa mpo na mituna nyonso na ferronnerie, mobilier mpe IT. Nakosuisa yo na nini ?",
    ],
    farewell: [
      "Merci ! Zonga soki ozali na mituna mosusu. Butu malamu ! 👋",
      "Toyebani ! Nazali awa 24h/24 soki olinga devis to mituna. Au revoir ! 😊",
    ],
    devis_generic: [
      "Malamu ! Na kobongola devis ya malamu, projet ya nini ozali koluka ?",
      "Super ! Koloba ngai projet oyo, mpe nakosukisa bino na mituna moke 🎯",
    ],
    devis_product: (product, lang) => {
      const p = KB.products[product];
      const q = (p.questions.ln || p.questions.fr)[0];
      return `Projet malamu ! 🏗️ Na **${p.label}** na bino, prix ezali **${p.price}**. ${p.extra}\n\nNa devis ya malamu : ${q}`;
    },
    info_generic: "Ezali malamu ! Omedev Services esaleli na ferronnerie sur mesure (portails, escaliers, garde-corps), mobilier ya métal (salons VIP, bilili, mitangá) mpe vitrines ya commerce. Tosaleli lisusu na solutions IT mpe énergie solaire. Service nini olingi koyeba lisusu ?",
    qualification: (product, qIdx) => {
      const p = KB.products[product];
      const questions = p.questions.ln || p.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Malamu ! ${questions[qIdx]}`;
    },
    escalade: "Demande oyo esengeli miso ya expert ya biso ! 👷 Natindeli dossier na bino sik'oyo — conseiller akosambela bino na miniti 30. Ezali malamu ?",
    unknown: [
      "Nabosani te kolimbola. Okoki kolobela lisusu ? Nasaleli na ferronnerie, mobilier mpe IT ya Omedev Services 😊",
    ],
  },
};

// ── Moteur de réponse locale ─────────────────────────────────────────────────

const generateLocalResponse = (message, session) => {
  const lang      = session.lang;
  const intent    = detectIntent(message, session.history);
  const product   = detectProduct(message) || session.lastProduct;
  const templates = T[lang] || T.fr;

  // Update session context
  if (product) session.lastProduct = product;

  let text   = '';
  let action = null;

  // ── GREETING ──
  if (intent === 'greeting') {
    text = pick(templates.greeting);
    return { text, action };
  }

  // ── FAREWELL ──
  if (intent === 'farewell') {
    text = pick(templates.farewell);
    return { text, action };
  }

  // ── RECLAMATION ──
  if (intent === 'reclamation') {
    text = templates.escalade;
    action = { type: 'contact_link', label: lang === 'en' ? 'Contact our team' : lang === 'ln' ? 'Koma na ekipe na biso' : 'Contacter notre équipe', url: '/contact' };
    return { text, action };
  }

  // ── MATÉRIAU ──
  if (intent === 'materiau') {
    const t = message.toLowerCase();
    let mat = null;
    if (/acier|steel|fer\b/.test(t))       mat = 'acier';
    else if (/alu|aluminium|aluminum/.test(t)) mat = 'aluminium';
    else if (/inox|inoxydable|stainless/.test(t)) mat = 'inox';
    else if (/fer forg|wrought|forg/.test(t))    mat = 'fer_forge';

    if (mat && KB.materials[mat]) {
      text = KB.materials[mat][lang] || KB.materials[mat].fr;
      // After explaining material, offer devis if product is known
      if (product) {
        const p = KB.products[product];
        text += `\n\nPour votre **${p.label}**, je vous recommande ${mat === 'acier' ? "l'acier pour sa robustesse" : mat === 'aluminium' ? "l'aluminium pour son faible entretien" : mat === 'inox' ? "l'inox pour sa longévité maximale" : "le fer forgé pour son esthétique"}. Voulez-vous un devis ?`;
        action = { type: 'devis_link', label: lang === 'en' ? 'Request a free quote' : lang === 'ln' ? 'Kozwa devis ya ofele' : 'Demander un devis gratuit', url: '/demander-devis' };
      } else {
        // Ask which product
        const follow = { fr: "Vous avez un produit spécifique en tête ?", en: "Do you have a specific product in mind?", ln: "Ozali koluka produit ya ndenge nini ?" };
        text += `\n\n${follow[lang] || follow.fr}`;
      }
    } else {
      // General comparison
      text = lang === 'en'
        ? "⚖️ **Steel** = strong, cost-effective (needs coating). **Aluminum** = lightweight, 0 maintenance. **Inox** = premium, lifetime durability. **Wrought iron** = classic look, regular maintenance needed.\n\nWhich suits your project best?"
        : lang === 'ln'
        ? "⚖️ **Acier** = solid, prix malamu (esengeli traitement). **Alu** = pete, entretien te. **Inox** = qualité ya haut de gamme. **Fer forgé** = beau, kasi entretien esengeli.\n\nNayebisi yo oyo ekokani na projet ya nini ?"
        : "⚖️ **Acier** = robuste, économique (traitement requis). **Alu** = léger, zéro entretien. **Inox** = durabilité maximale, premium. **Fer forgé** = esthétique classique, entretien régulier.\n\nLe mieux dépend de votre usage — quel produit avez-vous en tête ?";
    }
    return { text, action };
  }

  // ── FAQ : DELAI ──
  if (intent === 'delai') {
    text = KB.faq.delai[lang] || KB.faq.delai.fr;
    if (product) action = { type: 'devis_link', label: 'Demander un devis', url: '/demander-devis' };
    return { text, action };
  }

  // ── FAQ : PAIEMENT ──
  if (intent === 'paiement') {
    text = KB.faq.paiement[lang] || KB.faq.paiement.fr;
    return { text, action };
  }

  // ── FAQ : GARANTIE ──
  if (intent === 'garantie') {
    text = KB.faq.garantie[lang] || KB.faq.garantie.fr;
    return { text, action };
  }

  // ── FAQ : AUDIT / RDV ──
  if (intent === 'rdv') {
    text = KB.faq.audit[lang] || KB.faq.audit.fr;
    const t2 = message.toLowerCase();
    if (/audit/.test(t2)) {
      text += (lang === 'fr' ? "\n\nVoulez-vous réserver votre audit ?" : lang === 'en' ? "\n\nWould you like to book your audit?" : "\n\nOlingi kozwa audit na bino ?");
      action = { type: 'audit_link', label: lang === 'en' ? 'Book an audit' : lang === 'ln' ? 'Kozwa audit' : 'Réserver un audit', url: '/audit-gratuit' };
    } else {
      action = { type: 'contact_link', label: lang === 'en' ? 'Contact us' : lang === 'ln' ? 'Koma na biso' : 'Nous contacter', url: '/contact' };
    }
    return { text, action };
  }

  // ── INFO ENTREPRISE ──
  if (intent === 'info_ent') {
    text = KB.faq.entreprise[lang] || KB.faq.entreprise.fr;
    action = { type: 'portfolio_link', label: lang === 'en' ? 'View our work' : lang === 'ln' ? 'Tala misala na biso' : 'Voir nos réalisations', url: '/ferronnerie/projets' };
    return { text, action };
  }

  // ── DEVIS avec produit connu ──
  if (product) {
    const p = KB.products[product];
    // Count how many qualification questions we've asked
    const qIdx = session.askedQuestions.filter(q => q.startsWith(product)).length;
    session.askedQuestions.push(`${product}_${qIdx}`);

    if (qIdx === 0) {
      // First contact: give price range + first question
      text = typeof templates.devis_product === 'function'
        ? templates.devis_product(product, lang)
        : T.fr.devis_product(product, 'fr');
    } else {
      // Follow-up qualification question
      const nextQ = typeof templates.qualification === 'function'
        ? templates.qualification(product, qIdx, lang)
        : T.fr.qualification(product, qIdx, lang);

      if (nextQ) {
        text = nextQ;
      } else {
        // All questions asked — push to form
        const conclude = {
          fr: `Merci pour ces informations ! 🎉 J'ai tout ce qu'il faut pour préparer votre devis personnalisé pour ce ${p.label}. Remplissez le formulaire officiel et vous recevrez votre devis sous 24h 📄`,
          en: `Thank you for all the details! 🎉 I have everything I need to prepare your custom quote for the ${p.label}. Fill out the form and you'll receive your quote within 24h 📄`,
          ln: `Merci ya bainfo nyonso ! 🎉 Nazali na nyonso mpo nakobongola devis ya bino na ${p.label}. Bongisa formulaire mpe okokeba devis na bino na 24h 📄`,
        };
        text   = conclude[lang] || conclude.fr;
        action = { type: 'devis_link', label: lang === 'en' ? 'Get your free quote' : lang === 'ln' ? 'Kozwa devis ya ofele' : 'Demander mon devis gratuit', url: '/demander-devis' };
      }
    }
    return { text, action };
  }

  // ── DEVIS générique (pas de produit) ──
  if (intent === 'devis') {
    text = pick(templates.devis_generic);
    return { text, action };
  }

  // ── INFO générique ──
  if (intent === 'general') {
    text = templates.info_generic || T.fr.info_generic;
    return { text, action };
  }

  // ── Fallback ──
  text = pick(templates.unknown || T.fr.unknown);
  return { text, action };
};

// ══════════════════════════════════════════════════════════════════════════════
// HANDLER PRINCIPAL — Anthropic en premier, local en fallback
// ══════════════════════════════════════════════════════════════════════════════

const tryAnthropic = async (history) => {
  if (!anthropicClient) return null;
  const trimmed = history.slice(-20);
  const response = await anthropicClient.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 500,
    system: SYSTEM_PROMPT,
    messages: trimmed,
    timeout: 8000,
  });
  return response.content[0]?.text || null;
};

const parseAction = (text) => {
  let action = null;
  const cleaned = text.replace(/\[ACTION:\{[^}]*\}\]/g, (match) => {
    try { action = JSON.parse(match.slice(8, -1)); } catch {}
    return '';
  }).replace(/\*\*/g, '').trim();
  return { cleaned, action };
};

// @route POST /api/assistant/chat
const chat = async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ message: 'Message requis' });
  }

  const sid     = sessionId || `s_${Date.now()}`;
  const session = getSession(sid);

  // Detect language on first message or if changed
  const detectedLang = detectLanguage(message.trim());
  if (detectedLang !== 'fr' || session.history.length === 0) {
    session.lang = detectedLang;
  }

  // Add to history
  session.history.push({ role: 'user', content: message.trim() });

  let assistantText = null;
  let mode = 'local';

  // 1. Try Anthropic
  try {
    assistantText = await tryAnthropic(session.history);
    if (assistantText) mode = 'anthropic';
  } catch (err) {
    console.warn('Anthropic unavailable — switching to local AI:', err.message || err.status || 'unknown error');
  }

  // 2. Local fallback
  if (!assistantText) {
    const local = generateLocalResponse(message.trim(), session);
    assistantText = local.text;
    // Store local action directly (no parsing needed)
    session.history.push({ role: 'assistant', content: assistantText });
    return res.json({ sessionId: sid, message: assistantText, action: local.action, mode });
  }

  // Parse Anthropic response
  const { cleaned, action } = parseAction(assistantText);
  session.history.push({ role: 'assistant', content: cleaned });

  res.json({ sessionId: sid, message: cleaned, action, mode });
};

// @route DELETE /api/assistant/session/:sessionId
const clearSession = (req, res) => {
  const { sessionId } = req.params;
  if (sessionId) { sessions.delete(sessionId); sessionTs.delete(sessionId); }
  res.json({ message: 'Session réinitialisée' });
};

module.exports = { chat, clearSession };
