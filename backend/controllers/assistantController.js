// backend/controllers/assistantController.js — OMEDEV Assist · Intelligence duale
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
const sessions    = new Map(); // sessionId → { history: [], lastService: null, lang: 'fr' }
const sessionTs   = new Map();
const SESSION_TTL = 30 * 60 * 1000;

setInterval(() => {
  const now = Date.now();
  for (const [id, ts] of sessionTs.entries()) {
    if (now - ts > SESSION_TTL) { sessions.delete(id); sessionTs.delete(id); }
  }
}, 5 * 60 * 1000);

const getSession = (sid) => {
  if (!sessions.has(sid)) sessions.set(sid, { history: [], lastService: null, lang: 'fr', askedQuestions: [] });
  sessionTs.set(sid, Date.now());
  return sessions.get(sid);
};

// ══════════════════════════════════════════════════════════════════════════════
// SYSTÈME PROMPT ANTHROPIC
// ══════════════════════════════════════════════════════════════════════════════

const SYSTEM_PROMPT = `
Tu es **OMEDEV Assist** 🤖, l'assistant commercial & technique d'**OMEDEV Services**.

IDENTITÉ : Expert en solutions IT, cybersécurité, développement digital, cloud, énergie et formation professionnelle. Ton professionnel, chaleureux, jamais robotique. Emojis avec modération.

LANGUES : Détecte automatiquement (Français 🇫🇷, Lingala 🇨🇩, Anglais 🇬🇧) et réponds dans cette langue.

NOS SERVICES :
• Réseau & Infrastructure : câblage structuré, WiFi entreprise, fibre optique haute performance
• Cybersécurité & Surveillance : firewalls, audits, vidéosurveillance intelligente 24/7
• Développement Digital : sites web, applications mobiles, ERP sur mesure
• Cloud & Télécommunications : hébergement cloud, VoIP, solutions télécom intégrées
• Énergie & Équipements : panneaux solaires, climatisation, maintenance préventive/corrective
• Vente de matériel : PC, serveurs, écrans, caméras IP, accessoires professionnels
• Formation & Accompagnement : formations certifiantes et transfert de compétences

TARIFICATION : Toutes nos prestations sont sur devis personnalisé, adapté à la taille et aux besoins du client. L'audit initial est offert.

QUALIFICATION : Pose max 2-3 questions ciblées (jamais tout d'un coup) selon le service demandé :
- Réseau : taille des locaux, nombre de postes, besoin fibre/WiFi ?
- Sécurité : nombre de caméras/accès, site déjà équipé ?
- Développement : type de projet (vitrine, e-commerce, app, ERP), fonctionnalités clés
- Cloud : nombre d'utilisateurs, migration ou nouvelle infrastructure ?
- Énergie : surface à équiper, consommation actuelle, autonomie souhaitée
- Formation : équipe concernée, thématique, niveau

PROCESSUS : Audit/diagnostic gratuit → devis détaillé sous 24-48h → planning validé → déploiement → support continu

ESCALADE HUMAIN si : frustration forte, projet complexe/à fort budget, client le demande explicitement.
Message : "Cette demande mérite l'œil de notre expert ! 👷 Je transfère votre dossier — contacté sous 30 min. Ça vous va ?"

ACTIONS (une seule, si pertinent, à la fin du message) :
[ACTION:{"type":"devis_link","label":"Demander un devis gratuit","url":"/demander-devis"}]
[ACTION:{"type":"audit_link","label":"Réserver un audit gratuit","url":"/audit-gratuit"}]
[ACTION:{"type":"contact_link","label":"Contacter notre équipe","url":"/contact"}]
[ACTION:{"type":"portfolio_link","label":"Voir nos réalisations","url":"/realisations"}]

RÈGLES : Jamais de prix fournisseurs/marges. Prix = sur devis uniquement. Max 4 phrases/message. Toujours proposer une action concrète.
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
            'i want', 'quote', 'estimate', 'website', 'network', 'security', 'cloud'],
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
  reclamation:[/problème/i, /probleme/i, /déçu/i, /decu/i, /mauvais/i, /mécontent/i,
              /mecontent/i, /réclamation/i, /reclamation/i, /complaint/i, /issue/i,
              /pas content/i, /pas satisfait/i, /remboursement/i, /retard/i, /panne/i],
  garantie:  [/garantie/i, /warranty/i, /sav/i, /après-vente/i, /apres vente/i, /support/i, /maintenance/i],
  delai:     [/délai/i, /delai/i, /temps/i, /quand/i, /durée/i, /duree/i, /combien de temps/i,
              /livraison/i, /how long/i, /when/i],
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
  // Context fallback: if we were discussing a service, assume devis intent
  if (history.length > 0) return 'devis';
  return 'general';
};

// ── Détection de service ─────────────────────────────────────────────────────

const SERVICE_KEYWORDS = {
  reseau:     ['réseau', 'reseau', 'câblage', 'cablage', 'wifi', 'fibre', 'infrastructure', 'network', 'switch', 'routeur'],
  securite:   ['sécurité', 'securite', 'caméra', 'camera', 'vidéosurveillance', 'videosurveillance', 'firewall', 'pare-feu', 'security', 'surveillance'],
  dev:        ['site web', 'site internet', 'application', 'app mobile', 'erp', 'développement', 'developpement', 'e-commerce', 'ecommerce', 'website', 'software', 'logiciel'],
  cloud:      ['cloud', 'hébergement', 'hebergement', 'voip', 'télécom', 'telecom', 'serveur cloud', 'hosting'],
  energie:    ['énergie', 'energie', 'panneau solaire', 'panneaux solaires', 'solaire', 'climatisation', 'climatiseur', 'solar', 'ac'],
  materiel:   ['ordinateur', 'pc', 'serveur', 'écran', 'ecran', 'matériel', 'materiel', 'équipement', 'equipement', 'computer'],
  formation:  ['formation', 'formations', 'apprendre', 'certifiant', 'training', 'course'],
  audit:      ['audit', 'diagnostic'],
};

const detectService = (text) => {
  const t = text.toLowerCase();
  for (const [service, keywords] of Object.entries(SERVICE_KEYWORDS)) {
    if (keywords.some(kw => t.includes(kw))) return service;
  }
  return null;
};

// ── Base de connaissances ────────────────────────────────────────────────────

const KB = {
  services: {
    reseau:    { label: 'Réseau & Infrastructure', extra: 'Câblage structuré, WiFi entreprise et fibre optique haute performance.', questions: { fr: ['Combien de postes/utilisateurs sont concernés ?', 'Avez-vous déjà une infrastructure réseau en place ?', 'Souhaitez-vous du WiFi, de la fibre, ou les deux ?'], en: ['How many devices/users are involved?', 'Do you already have a network infrastructure?', 'Do you need WiFi, fiber, or both?'], ln: ['Batu boni bakosalela réseau oyo ?', 'Bozali na infrastructure réseau déjà ?'] } },
    securite:  { label: 'Cybersécurité & Surveillance', extra: 'Firewalls, audits de sécurité et vidéosurveillance intelligente 24/7.', questions: { fr: ['Combien de caméras ou de points d\'accès à sécuriser ?', 'Le site est-il déjà équipé de matériel de sécurité ?', 'S\'agit-il d\'un local professionnel ou résidentiel ?'], en: ['How many cameras or access points need securing?', 'Is the site already equipped?'], ln: ['Camera boni esengeli ?'] } },
    dev:       { label: 'Développement Digital', extra: 'Sites web, applications mobiles et ERP sur mesure.', questions: { fr: ['Quel type de projet : site vitrine, e-commerce, application ou ERP ?', 'Quelles fonctionnalités principales souhaitez-vous ?', 'Avez-vous déjà une identité visuelle ou une charte graphique ?'], en: ['What type of project: showcase site, e-commerce, app or ERP?', 'What are the key features you need?'], ln: ['Ozali koluka site to application ya ndenge nini ?'] } },
    cloud:     { label: 'Cloud & Télécommunications', extra: 'Hébergement cloud, VoIP et solutions télécom intégrées.', questions: { fr: ['Combien d\'utilisateurs seront concernés ?', 'S\'agit-il d\'une migration ou d\'une nouvelle infrastructure ?', 'Avez-vous des besoins spécifiques en téléphonie (VoIP) ?'], en: ['How many users will be involved?', 'Is this a migration or a new setup?'], ln: ['Batu boni bakosalela cloud oyo ?'] } },
    energie:   { label: 'Énergie & Équipements', extra: 'Panneaux solaires, climatisation et maintenance préventive/corrective.', questions: { fr: ['Quelle est la surface ou le site à équiper ?', 'Quelle est votre consommation électrique actuelle ?', 'Souhaitez-vous une autonomie totale ou un complément au réseau ?'], en: ['What is the site or surface to equip?', 'What is your current power consumption?'], ln: ['Esika boni bolingi kotia énergie ?'] } },
    materiel:  { label: 'Vente de matériel IT', extra: 'PC, serveurs, écrans, caméras IP et accessoires professionnels.', questions: { fr: ['Quel type de matériel recherchez-vous ?', 'Pour combien de postes ou d\'utilisateurs ?', 'Avez-vous un budget indicatif ?'], en: ['What type of equipment are you looking for?', 'For how many users?'], ln: ['Materiel ya ndenge nini oyo boluki ?'] } },
    formation: { label: 'Formation & Accompagnement', extra: 'Formations certifiantes et transfert de compétences pour vos équipes.', questions: { fr: ['Combien de personnes seront formées ?', 'Sur quelle thématique souhaitez-vous une formation ?', 'Quel est le niveau actuel de l\'équipe ?'], en: ['How many people will be trained?', 'On what topic?'], ln: ['Batu boni bakozwa formation ?'] } },
  },

  faq: {
    delai:    { fr: "Nos délais varient selon le projet : quelques jours pour une intervention réseau/sécurité, 2 à 8 semaines pour un développement digital complet. Un planning précis vous est communiqué avec le devis ⏱️", en: "Timelines vary by project: a few days for network/security work, 2-8 weeks for a full digital build. A precise schedule comes with your quote ⏱️", ln: "Temps ekokani na projet — mikolo mingi to baposo mpo na misala minene ⏱️" },
    garantie: { fr: "Nous offrons un support et une maintenance continue après chaque installation, avec un accompagnement technique 24/7 pour nos clients sous contrat ✅", en: "We provide ongoing support and maintenance after every install, with 24/7 technical assistance for contract clients ✅", ln: "Topesaka support na maintenance sima ya installation ✅" },
    paiement: { fr: "Nous acceptons : carte bancaire, virement, Wave, Orange Money, Airtel Money. Un acompte est demandé pour lancer certains projets, solde à la livraison 💳", en: "We accept: bank card, wire transfer, Wave, Orange Money, Airtel Money 💳", ln: "Topesa na : carte bancaire, virement, Wave, Orange Money, Airtel Money 💳" },
    audit:    { fr: "Notre audit initial est gratuit ! Nous analysons vos besoins et vous remettons un rapport avec recommandations sous 48h 🔍", en: "Our initial audit is free! We analyze your needs and deliver a report with recommendations within 48h 🔍", ln: "Audit ya ebandeli ezali ofele ! Rapport epesami na 48h 🔍" },
    entreprise:{ fr: "OMEDEV Services est votre partenaire spécialisé en solutions IT, cybersécurité, développement digital, cloud, énergie et formation professionnelle. Disponibles 24h/24, 7j/7 pour tous vos projets 🏢", en: "OMEDEV Services is your specialist in IT solutions, cybersecurity, digital development, cloud, energy and professional training. Available 24/7 🏢", ln: "OMEDEV Services ezali partenaire ya bino na solutions IT, cybersécurité, développement digital, énergie mpe formation. Tozali 24h/24 🏢" },
  },
};

// ── Générateur de réponses locales ───────────────────────────────────────────

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const T = {
  fr: {
    greeting: [
      "Bonjour ! 👋 Je suis OMEDEV Assist, votre conseiller spécialisé. Comment puis-je vous aider aujourd'hui ?",
      "Bonjour et bienvenue ! 🤖 Je suis là pour répondre à toutes vos questions sur nos solutions IT, énergie et digital. Que puis-je faire pour vous ?",
      "Bonjour ! Ravi de vous accueillir chez OMEDEV Services. Quel projet avez-vous en tête ? 😊",
    ],
    farewell: [
      "Merci de votre confiance ! N'hésitez pas à revenir si vous avez d'autres questions. Bonne journée ! 👋",
      "À votre service ! Si vous avez des questions ou souhaitez un devis, je suis là 24h/24. Au revoir ! 😊",
    ],
    devis_generic: [
      "Je serais ravi de vous préparer un devis personnalisé ! Pour commencer, de quel type de projet s'agit-il exactement ?",
      "Super ! Pour établir un devis précis, dites-moi quel service vous intéresse et je vous pose quelques questions rapides 🎯",
    ],
    devis_service: (service, lang) => {
      const s = KB.services[service];
      const q = s.questions[lang][0];
      return `Excellent choix ! 🚀 ${s.extra} Ce type de prestation est proposé sur devis personnalisé, adapté à vos besoins.\n\nPour un devis précis : ${q}`;
    },
    info_generic: "Bien sûr ! OMEDEV Services propose des solutions en réseau & infrastructure, cybersécurité & surveillance, développement digital, cloud & télécommunications, énergie & équipements, vente de matériel IT et formation. Sur quel service souhaitez-vous plus d'infos ?",
    qualification: (service, qIdx, lang) => {
      const s = KB.services[service];
      const questions = s.questions[lang] || s.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Parfait ! ${questions[qIdx]}`;
    },
    escalade: "Cette demande mérite l'attention de notre équipe d'experts ! 👷 Je transmets votre dossier immédiatement — un conseiller vous contactera sous 30 minutes. Ça vous va ?",
    unknown: [
      "Je ne suis pas sûr de bien comprendre votre demande. Pourriez-vous préciser ? Je suis là pour vous aider avec nos solutions IT, énergie et digital 😊",
      "Hmm, pouvez-vous reformuler ? Je suis spécialisé sur les solutions IT, cybersécurité, cloud et énergie d'OMEDEV Services.",
    ],
  },
  en: {
    greeting: [
      "Hello! 👋 I'm OMEDEV Assist, your specialist advisor. How can I help you today?",
      "Welcome to OMEDEV Services! 🤖 I'm here for all your questions about IT, energy and digital solutions. What can I do for you?",
    ],
    farewell: [
      "Thank you! Feel free to come back anytime. Have a great day! 👋",
      "Happy to help! I'm here 24/7 if you need a quote or have questions. Goodbye! 😊",
    ],
    devis_generic: [
      "I'd love to prepare a personalized quote! What type of project are you looking for?",
      "Great! To give you an accurate quote, which service are you interested in?",
    ],
    devis_service: (service, lang) => {
      const s = KB.services[service];
      const q = (s.questions.en || s.questions.fr)[0];
      return `Great choice! 🚀 ${s.extra} This service is quoted individually based on your needs.\n\nTo get an accurate quote: ${q}`;
    },
    info_generic: "Of course! OMEDEV Services offers network & infrastructure, cybersecurity & surveillance, digital development, cloud & telecom, energy & equipment, IT equipment sales and professional training. Which service would you like to know more about?",
    qualification: (service, qIdx, lang) => {
      const s = KB.services[service];
      const questions = s.questions.en || s.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Perfect! ${questions[qIdx]}`;
    },
    escalade: "This requires our expert team's attention! 👷 I'm forwarding your file now — a specialist will contact you within 30 minutes. Does that work for you?",
    unknown: [
      "I'm not sure I understood that. Could you clarify? I specialize in IT, energy and digital solutions for OMEDEV Services 😊",
    ],
  },
  ln: {
    greeting: [
      "Mbote! 👋 Ngai OMEDEV Assist, conseiller ya bino. Nakosuisa yo ndenge nini lelo ?",
      "Malamu na kobanda ! 🤖 Ngai nazali awa mpo na mituna nyonso na solutions IT, énergie mpe digital. Nakosuisa yo na nini ?",
    ],
    farewell: [
      "Merci ! Zonga soki ozali na mituna mosusu. Butu malamu ! 👋",
      "Toyebani ! Nazali awa 24h/24 soki olinga devis to mituna. Au revoir ! 😊",
    ],
    devis_generic: [
      "Malamu ! Na kobongola devis ya malamu, projet ya nini ozali koluka ?",
      "Super ! Koloba ngai service oyo, mpe nakosukisa bino na mituna moke 🎯",
    ],
    devis_service: (service, lang) => {
      const s = KB.services[service];
      const q = (s.questions.ln || s.questions.fr)[0];
      return `Choix ya malamu ! 🚀 ${s.extra} Service oyo ezali sur devis.\n\nNa devis ya malamu : ${q}`;
    },
    info_generic: "Ezali malamu ! OMEDEV Services esaleli na réseau & infrastructure, cybersécurité, développement digital, cloud, énergie mpe formation. Service nini olingi koyeba lisusu ?",
    qualification: (service, qIdx) => {
      const s = KB.services[service];
      const questions = s.questions.ln || s.questions.fr;
      if (qIdx >= questions.length) return null;
      return `Malamu ! ${questions[qIdx]}`;
    },
    escalade: "Demande oyo esengeli miso ya expert ya biso ! 👷 Natindeli dossier na bino sik'oyo — conseiller akosambela bino na miniti 30. Ezali malamu ?",
    unknown: [
      "Nabosani te kolimbola. Okoki kolobela lisusu ? Nasaleli na solutions IT, énergie mpe digital ya OMEDEV Services 😊",
    ],
  },
};

// ── Moteur de réponse locale ─────────────────────────────────────────────────

const generateLocalResponse = (message, session) => {
  const lang      = session.lang;
  const intent    = detectIntent(message, session.history);
  const service   = detectService(message) || session.lastService;
  const templates = T[lang] || T.fr;

  // Update session context
  if (service) session.lastService = service;

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

  // ── FAQ : DELAI ──
  if (intent === 'delai') {
    text = KB.faq.delai[lang] || KB.faq.delai.fr;
    if (service) action = { type: 'devis_link', label: 'Demander un devis', url: '/demander-devis' };
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
    action = { type: 'portfolio_link', label: lang === 'en' ? 'View our work' : lang === 'ln' ? 'Tala misala na biso' : 'Voir nos réalisations', url: '/realisations' };
    return { text, action };
  }

  // ── DEVIS avec service connu ──
  if (service) {
    const s = KB.services[service];
    // Count how many qualification questions we've asked
    const qIdx = session.askedQuestions.filter(q => q.startsWith(service)).length;
    session.askedQuestions.push(`${service}_${qIdx}`);

    if (qIdx === 0) {
      // First contact: present service + first question
      text = typeof templates.devis_service === 'function'
        ? templates.devis_service(service, lang)
        : T.fr.devis_service(service, 'fr');
    } else {
      // Follow-up qualification question
      const nextQ = typeof templates.qualification === 'function'
        ? templates.qualification(service, qIdx, lang)
        : T.fr.qualification(service, qIdx, lang);

      if (nextQ) {
        text = nextQ;
      } else {
        // All questions asked — push to form
        const conclude = {
          fr: `Merci pour ces informations ! 🎉 J'ai tout ce qu'il faut pour préparer votre devis personnalisé pour ce projet de ${s.label}. Remplissez le formulaire officiel et vous recevrez votre devis sous 24h 📄`,
          en: `Thank you for all the details! 🎉 I have everything I need to prepare your custom quote for ${s.label}. Fill out the form and you'll receive your quote within 24h 📄`,
          ln: `Merci ya bainfo nyonso ! 🎉 Nazali na nyonso mpo nakobongola devis ya bino na ${s.label}. Bongisa formulaire mpe okokeba devis na bino na 24h 📄`,
        };
        text   = conclude[lang] || conclude.fr;
        action = { type: 'devis_link', label: lang === 'en' ? 'Get your free quote' : lang === 'ln' ? 'Kozwa devis ya ofele' : 'Demander mon devis gratuit', url: '/demander-devis' };
      }
    }
    return { text, action };
  }

  // ── DEVIS générique (pas de service) ──
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
