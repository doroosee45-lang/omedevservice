// components/Footer.js (version OMDEVE Services avec le style du footer 1000 Voitures)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const links = {
    Navigation: [
      { label: 'Accueil', to: '/' },
      { label: 'Services', to: '/services' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Réalisations', to: '/realisations' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
    'Nos Services': [
      { label: 'Réseau & Infrastructure', to: '/services/reseau-infrastructure' },
      { label: 'Sécurité', to: '/services/securite' },
      { label: 'Développement Digital', to: '/services/developpement-digital' },
      { label: 'Formation', to: '/services/formation' },
    ],
    Légal: [
      { label: 'Mentions légales', to: '/legal' },
      { label: 'Politique de confidentialité', to: '/privacy' },
      { label: 'CGV', to: '/cgv' },
      { label: 'Cookies', to: '/cookies' },
    ],
  };

  const socials = [
    { icon: <FaFacebook />, label: 'Facebook', href: '#' },
    { icon: <FaTwitter />, label: 'Twitter', href: '#' },
    { icon: <FaLinkedin />, label: 'LinkedIn', href: '#' },
    { icon: <FaInstagram />, label: 'Instagram', href: '#' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        .footer {
          font-family: 'Outfit', sans-serif;
          background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%);
          position: relative;
          overflow: hidden;
        }

        /* ── Animated background mesh ── */
        .footer-mesh {
          position: absolute; inset: 0; pointer-events: none; overflow: hidden;
        }
        .mesh-blob {
          position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.12;
        }
        .mesh-blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #2563eb, transparent);
          top: -100px; left: -100px;
          animation: blobFloat1 12s ease-in-out infinite alternate;
        }
        .mesh-blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #06b6d4, transparent);
          bottom: -80px; right: -80px;
          animation: blobFloat2 10s ease-in-out infinite alternate;
        }
        .mesh-blob-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, #3b82f6, transparent);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
          animation: blobFloat3 14s ease-in-out infinite alternate;
        }
        @keyframes blobFloat1 { from { transform: translate(0,0) scale(1); }    to { transform: translate(60px,40px) scale(1.1); } }
        @keyframes blobFloat2 { from { transform: translate(0,0) scale(1.1); } to { transform: translate(-40px,-30px) scale(1); } }
        @keyframes blobFloat3 { from { transform: translate(-50%,-50%) scale(1); } to { transform: translate(-45%,-55%) scale(1.15); } }

        /* Diagonal top divider */
        .footer-divider-top {
          width: 100%; height: 60px; overflow: hidden; line-height: 0;
        }
        .footer-divider-top svg { display: block; }

        /* ── Newsletter strip ── */
        .footer-newsletter {
          position: relative; z-index: 2;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 40px 0;
        }
        .footer-newsletter-inner {
          max-width: 1200px; margin: 0 auto; padding: 0 32px;
          display: flex; align-items: center; justify-content: space-between; gap: 32px;
          flex-wrap: wrap;
        }
        .newsletter-text-block { flex: 1; min-width: 260px; }
        .newsletter-eyebrow {
          font-size: 0.7rem; font-weight: 700; color: #2563eb;
          text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 6px;
          display: flex; align-items: center; gap: 6px;
        }
        .newsletter-eyebrow::before {
          content: ''; width: 20px; height: 2px;
          background: linear-gradient(90deg, #2563eb, #06b6d4); border-radius: 99px;
        }
        .newsletter-title { font-size: 1.3rem; font-weight: 800; color: white; margin: 0; letter-spacing: -0.3px; }
        .newsletter-sub   { font-size: 0.85rem; color: rgba(255,255,255,0.45); margin-top: 4px; }

        .newsletter-form { display: flex; gap: 8px; flex: 1; max-width: 420px; }
        .newsletter-input {
          flex: 1; padding: 11px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; color: white;
          font-size: 0.875rem; font-family: 'Outfit', sans-serif;
          outline: none; transition: all 0.25s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.3); }
        .newsletter-input:focus {
          border-color: #2563eb;
          background: rgba(37,99,235,0.08);
          box-shadow: 0 0 0 3px rgba(37,99,235,0.15);
        }
        .newsletter-btn {
          padding: 11px 22px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          color: white; border: none; border-radius: 10px;
          font-size: 0.875rem; font-weight: 700; font-family: 'Outfit', sans-serif;
          cursor: pointer; white-space: nowrap; transition: all 0.25s;
          box-shadow: 0 4px 14px rgba(37,99,235,0.3);
        }
        .newsletter-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(37,99,235,0.45); }
        .newsletter-success {
          display: flex; align-items: center; gap: 8px;
          color: #34d399; font-size: 0.875rem; font-weight: 600;
          animation: fadeUpIn 0.3s ease;
        }
        @keyframes fadeUpIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

        /* ── Main grid ── */
        .footer-main {
          position: relative; z-index: 2;
          max-width: 1200px; margin: 0 auto; padding: 52px 32px 40px;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 48px;
        }

        /* Brand column */
        .footer-brand { }
        .brand-logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 18px;
          text-decoration: none;
        }
        .brand-icon {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem; font-weight: 900; color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(37,99,235,0.4);
        }
        .brand-name { font-weight: 900; font-size: 1.15rem; color: white; letter-spacing: -0.3px; line-height: 1.1; }
        .brand-name span { color: #06b6d4; }
        .brand-sub  { font-size: 0.58rem; color: rgba(255,255,255,0.35); font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; }

        .brand-desc { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.75; margin-bottom: 24px; max-width: 280px; }

        /* Stats row */
        .brand-stats { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; margin-bottom: 28px; }
        .brand-stat {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 12px 14px;
          transition: all 0.2s;
        }
        .brand-stat:hover { background: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.3); }
        .brand-stat-val { font-size: 1.1rem; font-weight: 900; color: white; line-height: 1; margin-bottom: 3px; }
        .brand-stat-lbl { font-size: 0.65rem; color: rgba(255,255,255,0.35); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

        /* Social icons */
        .socials { display: flex; gap: 8px; }
        .social-btn {
          width: 36px; height: 36px; border-radius: 9px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.55);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; text-decoration: none;
          transition: all 0.2s;
          font-size: 1rem;
        }
        .social-btn:hover {
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border-color: transparent; color: white;
          transform: translateY(-2px); box-shadow: 0 6px 16px rgba(37,99,235,0.35);
        }

        /* Link columns */
        .footer-col { }
        .col-title {
          font-size: 0.72rem; font-weight: 800; color: white;
          text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 18px;
          display: flex; align-items: center; gap: 8px;
        }
        .col-title::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, rgba(37,99,235,0.5), transparent);
        }
        .col-links { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .col-link {
          color: rgba(255,255,255,0.45); text-decoration: none;
          font-size: 0.875rem; font-weight: 500;
          display: flex; align-items: center; gap: 6px;
          transition: all 0.2s;
        }
        .col-link::before {
          content: ''; width: 0; height: 1px;
          background: linear-gradient(90deg, #2563eb, #06b6d4);
          transition: width 0.25s; border-radius: 99px;
          flex-shrink: 0;
        }
        .col-link:hover { color: white; padding-left: 4px; }
        .col-link:hover::before { width: 12px; }

        /* ── Contact strip ── */
        .footer-contact {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.06);
          max-width: 1200px; margin: 0 auto; padding: 24px 32px;
          display: flex; gap: 32px; flex-wrap: wrap;
        }
        .contact-item {
          display: flex; align-items: center; gap: 10px;
        }
        .contact-icon {
          width: 34px; height: 34px; border-radius: 9px;
          background: rgba(37,99,235,0.15); border: 1px solid rgba(37,99,235,0.25);
          display: flex; align-items: center; justify-content: center; font-size: 0.9rem;
          flex-shrink: 0;
        }
        .contact-label { font-size: 0.65rem; color: rgba(255,255,255,0.3); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; }
        .contact-value { font-size: 0.82rem; color: rgba(255,255,255,0.75); font-weight: 600; }

        /* ── Bottom bar ── */
        .footer-bottom {
          position: relative; z-index: 2;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 20px 32px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
          max-width: 100%;
        }
        .footer-bottom-inner {
          max-width: 1200px; margin: 0 auto; width: 100%;
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
        }
        .copyright { font-size: 0.78rem; color: rgba(255,255,255,0.25); font-weight: 500; }
        .copyright strong { color: rgba(255,255,255,0.5); }
        .made-with { font-size: 0.75rem; color: rgba(255,255,255,0.2); display: flex; align-items: center; gap: 4px; }
        .made-with span { color: #ef4444; animation: heartbeat 1.5s ease-in-out infinite; display: inline-block; }
        @keyframes heartbeat { 0%,100% { transform:scale(1); } 50% { transform:scale(1.3); } }

        /* ── Scroll to top ── */
        .scroll-top {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #2563eb, #06b6d4);
          border: none; color: white; font-size: 1.1rem;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; box-shadow: 0 6px 20px rgba(37,99,235,0.4);
          transition: all 0.25s;
        }
        .scroll-top:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(37,99,235,0.55); }

        @media (max-width: 900px) {
          .footer-main { grid-template-columns: 1fr 1fr; gap: 32px; }
          .footer-newsletter-inner { flex-direction: column; }
          .newsletter-form { max-width: 100%; width: 100%; }
        }
        @media (max-width: 560px) {
          .footer-main { grid-template-columns: 1fr; gap: 28px; }
          .footer-contact { flex-direction: column; gap: 16px; }
          .brand-stats { grid-template-columns: repeat(4,1fr); }
        }
      `}</style>

      {/* Wave divider */}
      <div className="footer-divider-top">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width:'100%', height:'60px' }}>
          <path d="M0,40 C240,0 480,60 720,30 C960,0 1200,50 1440,20 L1440,60 L0,60 Z" fill="#0f172a"/>
        </svg>
      </div>

      <footer className="footer">
        {/* Mesh background */}
        <div className="footer-mesh">
          <div className="mesh-blob mesh-blob-1" />
          <div className="mesh-blob mesh-blob-2" />
          <div className="mesh-blob mesh-blob-3" />
        </div>

        {/* Newsletter section */}
        <div className="footer-newsletter">
          <div className="footer-newsletter-inner">
            <div className="newsletter-text-block">
              <div className="newsletter-eyebrow">Newsletter</div>
              <h3 className="newsletter-title">Restez informé des dernières innovations</h3>
              <div className="newsletter-sub">Recevez nos actualités IT, énergie et infrastructure</div>
            </div>
            {!subscribed ? (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">S'abonner</button>
              </form>
            ) : (
              <div className="newsletter-success">
                ✓ Merci ! Vous êtes inscrit.
              </div>
            )}
          </div>
        </div>

        {/* Main grid */}
        <div className="footer-main">
          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" className="brand-logo">
              <div className="brand-icon">O</div>
              <div>
                <div className="brand-name">OMDEVE<span> Services</span></div>
                <div className="brand-sub">IT · ÉNERGIE · INFRASTRUCTURE</div>
              </div>
            </Link>
            <p className="brand-desc">
              Solutions technologiques complètes en IT, Énergie et Infrastructure. Accompagnement sur mesure pour votre transformation digitale.
            </p>
            <div className="brand-stats">
              <div className="brand-stat">
                <div className="brand-stat-val">12+</div>
                <div className="brand-stat-lbl">Ans d'expertise</div>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-val">150+</div>
                <div className="brand-stat-lbl">Projets livrés</div>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-val">98%</div>
                <div className="brand-stat-lbl">Clients satisfaits</div>
              </div>
              <div className="brand-stat">
                <div className="brand-stat-val">24/7</div>
                <div className="brand-stat-lbl">Support technique</div>
              </div>
            </div>
            <div className="socials">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="social-btn" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="footer-col">
              <div className="col-title">{title}</div>
              <ul className="col-links">
                {items.map((item, i) => (
                  <li key={i}>
                    <Link to={item.to} className="col-link">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="footer-contact">
          <div className="contact-item">
            <div className="contact-icon"><Phone size={16} /></div>
            <div>
              <span className="contact-label">Téléphone</span>
              <span className="contact-value">+243 555 503 59</span>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Mail size={16} /></div>
            <div>
              <span className="contact-label">Email</span>
              <span className="contact-value">omedevservices@gmail.com</span>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><MapPin size={16} /></div>
            <div>
              <span className="contact-label">Adresse</span>
              <span className="contact-value">Avenue Kabmabre n°75, Lingwala, Kinshasa, RDC</span>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon"><Clock size={16} /></div>
            <div>
              <span className="contact-label">Horaires</span>
              <span className="contact-value">Lun–Ven 8h–18h · Sam 9h–13h</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div className="copyright">
              © {new Date().getFullYear()} <strong>OMDEVE Services</strong> — Tous droits réservés
            </div>
            <div style={{ display:'flex', gap:'20px', flexWrap:'wrap' }}>
              <Link to="/legal" style={{ color:'rgba(255,255,255,0.2)', fontSize:'0.75rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.2)'}
              >Mentions légales</Link>
              <Link to="/privacy" style={{ color:'rgba(255,255,255,0.2)', fontSize:'0.75rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.2)'}
              >Confidentialité</Link>
              <Link to="/cgv" style={{ color:'rgba(255,255,255,0.2)', fontSize:'0.75rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.2)'}
              >CGV</Link>
              <Link to="/cookies" style={{ color:'rgba(255,255,255,0.2)', fontSize:'0.75rem', textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e => e.target.style.color='rgba(255,255,255,0.6)'}
                onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.2)'}
              >Cookies</Link>
            </div>
            <div className="made-with">
              Fait avec <span>♥</span> en RDC
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button className="scroll-top" onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} aria-label="Retour en haut">
        ↑
      </button>
    </>
  );
};

export default Footer;