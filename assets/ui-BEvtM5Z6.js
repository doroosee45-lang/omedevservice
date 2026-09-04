import{n as e,s as t,t as n}from"./jsx-runtime-C2ZqOKBi.js";import{A as r,B as i,_t as a,gt as o,ht as s,nt as c,rt as l,v as u}from"./index-CEOar0YN.js";var d=s(`arrow-down`,[[`path`,{d:`M12 5v14`,key:`s699le`}],[`path`,{d:`m19 12-7 7-7-7`,key:`1idqje`}]]),f=s(`arrow-up`,[[`path`,{d:`m5 12 7-7 7 7`,key:`hav0vg`}],[`path`,{d:`M12 19V5`,key:`x0mq9r`}]]),p=s(`inbox`,[[`polyline`,{points:`22 12 16 12 14 15 10 15 8 12 2 12`,key:`o97t9d`}],[`path`,{d:`M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z`,key:`oot6mr`}]]),m=t(e(),1),h=n(),g={blue:`from-[#0B74C1] to-[#1D5B9B]`,teal:`from-[#2AACB2] to-[#0B74C1]`,energy:`from-[#55DDB5] to-[#2AACB2]`,navy:`from-[#4681B7] to-[#053876]`,purple:`from-purple-500 to-indigo-500`,red:`from-red-500 to-red-600`,amber:`from-amber-500 to-orange-500`,gray:`from-gray-500 to-gray-600`},_=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

  .omedev-admin {
    --omedev-navy: #053876;
    --omedev-blue-dark: #1D5B9B;
    --omedev-blue: #0B74C1;
    --omedev-blue-light: #4681B7;
    --omedev-cyan: #72A5CE;
    --omedev-turquoise: #2AACB2;
    --omedev-energy: #55DDB5;
    --omedev-white: #F6F6F7;
    --omedev-dark: #0B1213;
    font-family: 'DM Sans', sans-serif;
    background: linear-gradient(135deg, #053876 0%, #1D5B9B 55%, #0B74C1 100%);
    color: #F6F6F7;
    min-height: 100vh;
  }

  .omedev-admin .font-syne { font-family: 'Syne', sans-serif; }

  .omedev-admin .admin-page-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    letter-spacing: -.02em;
    color: #fff;
  }

  .omedev-admin .admin-divider {
    width: 48px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
  }

  /* Cartes vitrées — équivalent sombre de .card-hover */
  .omedev-admin .admin-card {
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.10);
    border-radius: 18px;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease, background .35s ease;
  }
  .omedev-admin .admin-card-hover:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 45px rgba(5,56,118,.35);
    border-color: rgba(42,172,178,.45);
    background: rgba(255,255,255,.08);
  }

  /* Boutons */
  .omedev-admin .admin-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
    font-weight: 600;
    font-size: .875rem;
    padding: .65rem 1.25rem;
    border-radius: 12px;
    transition: all .25s ease;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
  }
  .omedev-admin .admin-btn:disabled { opacity: .5; cursor: not-allowed; }
  .omedev-admin .admin-btn-primary {
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    box-shadow: 0 8px 20px rgba(11,116,193,.25);
  }
  .omedev-admin .admin-btn-primary:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(42,172,178,.35);
  }
  .omedev-admin .admin-btn-outline {
    background: rgba(255,255,255,.06);
    border-color: rgba(255,255,255,.18);
    color: #fff;
  }
  .omedev-admin .admin-btn-outline:hover:not(:disabled) {
    border-color: #2AACB2;
    background: rgba(85,221,181,.10);
    transform: translateY(-2px);
  }
  .omedev-admin .admin-btn-danger {
    background: rgba(239,68,68,.12);
    border-color: rgba(239,68,68,.35);
    color: #f87171;
  }
  .omedev-admin .admin-btn-danger:hover:not(:disabled) {
    background: rgba(239,68,68,.22);
    border-color: rgba(239,68,68,.55);
  }
  .omedev-admin .admin-btn-ghost {
    background: transparent;
    color: rgba(255,255,255,.6);
  }
  .omedev-admin .admin-btn-ghost:hover:not(:disabled) {
    background: rgba(255,255,255,.08);
    color: #fff;
  }
  .omedev-admin .admin-btn-sm { padding: .45rem .9rem; font-size: .8rem; border-radius: 10px; }

  /* Champs de formulaire */
  .omedev-admin .admin-input,
  .omedev-admin .admin-select,
  .omedev-admin .admin-textarea {
    width: 100%;
    background: rgba(255,255,255,.07);
    border: 1px solid rgba(255,255,255,.16);
    border-radius: 12px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    padding: .65rem 1rem;
    transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
  }
  .omedev-admin .admin-input::placeholder,
  .omedev-admin .admin-textarea::placeholder { color: rgba(255,255,255,.4); }
  .omedev-admin .admin-input:focus,
  .omedev-admin .admin-select:focus,
  .omedev-admin .admin-textarea:focus {
    outline: none;
    border-color: #2AACB2;
    background: rgba(255,255,255,.10);
    box-shadow: 0 0 0 3px rgba(42,172,178,.15);
  }
  .omedev-admin .admin-select option { background: #0B1F3D; color: #fff; }

  /* Badges / statuts */
  .omedev-admin .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: .35rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .03em;
    padding: .3rem .7rem;
    border-radius: 999px;
    border: 1px solid transparent;
    white-space: nowrap;
  }

  /* Tableaux */
  .omedev-admin .admin-table { width: 100%; border-collapse: collapse; }
  .omedev-admin .admin-table thead th {
    text-align: left;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: rgba(255,255,255,.45);
    padding: .85rem 1.1rem;
    border-bottom: 1px solid rgba(255,255,255,.10);
  }
  .omedev-admin .admin-table tbody td {
    padding: .9rem 1.1rem;
    border-bottom: 1px solid rgba(255,255,255,.06);
    color: #fff;
    font-size: .875rem;
  }
  .omedev-admin .admin-table tbody tr {
    transition: background .2s ease;
  }
  .omedev-admin .admin-table tbody tr:hover {
    background: rgba(255,255,255,.04);
  }

  /* Modale */
  .omedev-admin .admin-modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(5,10,25,.65);
    backdrop-filter: blur(4px);
    z-index: 50;
  }
  .omedev-admin .admin-modal-panel {
    background: linear-gradient(160deg, #1D5B9B 0%, #053876 70%, #0B1213 100%);
    border: 1px solid rgba(255,255,255,.14);
    border-radius: 20px;
    box-shadow: 0 30px 80px rgba(5,56,118,.55);
  }

  /* Scrollbar (cohérente avec index.css) */
  .omedev-admin ::-webkit-scrollbar { width: 6px; height: 6px; }
  .omedev-admin ::-webkit-scrollbar-track { background: transparent; }
  .omedev-admin ::-webkit-scrollbar-thumb {
    background: rgba(85,221,181,.35);
    border-radius: 99px;
  }

  @media (max-width: 640px) {
    .omedev-admin .admin-table thead th,
    .omedev-admin .admin-table tbody td { padding: .65rem .75rem; font-size: .8rem; }
  }
`,v={hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{duration:.6,ease:[.22,.68,0,1]}}},y={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}}},b=({title:e,subtitle:t,actions:n})=>(0,h.jsxs)(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:`mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4`,children:[(0,h.jsxs)(`div`,{children:[(0,h.jsx)(`h1`,{className:`admin-page-title text-2xl md:text-3xl`,children:e}),t&&(0,h.jsx)(`p`,{className:`text-white/50 mt-1`,children:t})]}),n&&(0,h.jsx)(`div`,{className:`flex flex-wrap gap-3`,children:n})]}),x=({children:e,hover:t=!1,className:n=``,...r})=>(0,h.jsx)(`div`,{className:`admin-card ${t?`admin-card-hover`:``} ${n}`,...r,children:e}),S=({variant:e=`primary`,size:t=`md`,icon:n,iconPosition:r=`left`,className:i=``,children:a,...o})=>(0,h.jsxs)(`button`,{className:`admin-btn admin-btn-${e} ${t===`sm`?`admin-btn-sm`:``} ${i}`,...o,children:[n&&r===`left`&&(0,h.jsx)(n,{className:`w-4 h-4`}),a,n&&r===`right`&&(0,h.jsx)(n,{className:`w-4 h-4`})]}),C=({icon:e,label:t,value:n,trend:r,trendValue:i,badge:a,gradient:s=`blue`,sub:c})=>(0,h.jsxs)(o.div,{variants:v,className:`admin-card admin-card-hover p-6 relative overflow-hidden`,children:[a!==void 0&&a>0&&(0,h.jsx)(`span`,{className:`absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full`,children:a}),(0,h.jsxs)(`div`,{className:`flex items-center justify-between mb-4`,children:[(0,h.jsx)(`div`,{className:`w-12 h-12 rounded-xl bg-gradient-to-br ${g[s]||g.blue} flex items-center justify-center shadow-lg`,children:(0,h.jsx)(e,{className:`w-6 h-6 text-white`})}),r&&(0,h.jsxs)(`div`,{className:`flex items-center gap-1 text-sm ${r===`up`?`text-[#55DDB5]`:`text-red-400`}`,children:[r===`up`?(0,h.jsx)(f,{className:`w-4 h-4`}):(0,h.jsx)(d,{className:`w-4 h-4`}),(0,h.jsxs)(`span`,{children:[i,`%`]})]})]}),(0,h.jsx)(`div`,{className:`text-2xl font-bold text-white font-syne`,children:n}),(0,h.jsx)(`div`,{className:`text-white/50 text-sm mt-1`,children:t}),c&&(0,h.jsx)(`div`,{className:`text-[#55DDB5] text-xs mt-1 font-medium`,children:c})]}),w=({icon:e=p,title:t=`Aucun résultat`,description:n,action:r})=>(0,h.jsxs)(o.div,{initial:{opacity:0,scale:.95},animate:{opacity:1,scale:1},className:`admin-card text-center py-16 px-6`,children:[(0,h.jsx)(e,{className:`w-14 h-14 text-white/20 mx-auto mb-4`}),(0,h.jsx)(`h3`,{className:`text-lg font-semibold text-white font-syne`,children:t}),n&&(0,h.jsx)(`p`,{className:`text-white/40 mt-1 text-sm max-w-sm mx-auto`,children:n}),r&&(0,h.jsx)(`div`,{className:`mt-5`,children:r})]}),T=({label:e=`Chargement…`})=>(0,h.jsxs)(`div`,{className:`flex flex-col items-center justify-center gap-3 py-20 text-white/50`,children:[(0,h.jsx)(i,{className:`w-8 h-8 text-[#2AACB2] animate-spin`}),e&&(0,h.jsx)(`span`,{className:`text-sm`,children:e})]}),E=({value:e,onChange:t,placeholder:n=`Rechercher…`,className:i=``})=>(0,h.jsxs)(`div`,{className:`relative flex-1 ${i}`,children:[(0,h.jsx)(r,{className:`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/35`}),(0,h.jsx)(`input`,{type:`text`,value:e,onChange:t,placeholder:n,className:`admin-input`,style:{paddingLeft:`2.75rem`}})]}),D=({value:e,onChange:t,children:n,className:r=``})=>(0,h.jsx)(`select`,{value:e,onChange:t,className:`admin-select ${r}`,children:n}),O=({page:e,totalPages:t,onChange:n})=>t<=1?null:(0,h.jsxs)(o.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:`flex items-center justify-between pt-6 border-t border-white/10`,children:[(0,h.jsx)(S,{variant:`ghost`,size:`sm`,icon:l,disabled:e===1,onClick:()=>n(Math.max(1,e-1)),children:`Précédent`}),(0,h.jsxs)(`span`,{className:`text-sm text-white/50`,children:[`Page `,e,` sur `,t]}),(0,h.jsx)(S,{variant:`ghost`,size:`sm`,icon:c,iconPosition:`right`,disabled:e===t,onClick:()=>n(Math.min(t,e+1)),children:`Suivant`})]}),k=({open:e=!0,onClose:t,title:n,children:r,footer:i,maxWidth:s=`max-w-lg`})=>((0,m.useEffect)(()=>{if(!e)return;let n=e=>e.key===`Escape`&&t?.();return window.addEventListener(`keydown`,n),()=>window.removeEventListener(`keydown`,n)},[e,t]),(0,h.jsx)(a,{children:e&&(0,h.jsx)(o.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:`admin-modal-overlay flex items-center justify-center p-4`,onClick:t,children:(0,h.jsxs)(o.div,{initial:{scale:.94,opacity:0,y:10},animate:{scale:1,opacity:1,y:0},exit:{scale:.96,opacity:0},transition:{duration:.2},className:`admin-modal-panel w-full ${s} max-h-[90vh] overflow-y-auto`,onClick:e=>e.stopPropagation(),children:[n&&(0,h.jsxs)(`div`,{className:`flex items-center justify-between px-6 py-5 border-b border-white/10`,children:[(0,h.jsx)(`h2`,{className:`text-lg font-bold text-white font-syne`,children:n}),t&&(0,h.jsx)(`button`,{onClick:t,className:`text-white/50 hover:text-white transition-colors`,children:(0,h.jsx)(u,{className:`w-5 h-5`})})]}),(0,h.jsx)(`div`,{className:`p-6`,children:r}),i&&(0,h.jsx)(`div`,{className:`flex gap-3 px-6 pb-6`,children:i})]})})})),A=({tabs:e,active:t,onChange:n})=>(0,h.jsx)(`div`,{className:`flex flex-wrap gap-2 mb-6`,children:e.map(e=>{let r=e.key===t,i=e.icon;return(0,h.jsxs)(`button`,{onClick:()=>n(e.key),className:`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${r?`bg-[#2AACB2]/15 text-[#55DDB5] border-[#2AACB2]/30`:`bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white`}`,children:[i&&(0,h.jsx)(i,{className:`w-4 h-4`}),e.label,e.count!==void 0&&(0,h.jsxs)(`span`,{className:`text-xs opacity-70`,children:[`(`,e.count,`)`]})]},e.key)})});export{k as a,E as c,A as d,_ as f,d as g,f as h,T as i,D as l,y as m,x as n,b as o,v as p,w as r,O as s,S as t,C as u};