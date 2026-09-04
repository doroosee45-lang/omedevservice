import{n as e,s as t,t as n}from"./jsx-runtime-C2ZqOKBi.js";import{t as r}from"./folder-kanban-BQJAjL7E.js";import{n as i,r as a,t as o}from"./ClientHeader-ZxPusMKO.js";import{P as s,Q as c,U as l,X as u,a as d,b as f,ft as p,gt as m,q as h,ut as g,vt as _}from"./index-CEOar0YN.js";var v=t(e(),1),y=n(),b=`
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  .omedev-vm {
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
    overflow-x: hidden;
  }

  .omedev-vm * { box-sizing: border-box; }

  .omedev-vm .section-badge {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    font-size: .7rem;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    padding: .5rem 1.1rem;
    border-radius: 999px;
    background: rgba(11,116,193,.08);
    color: #0B74C1;
    border: 1px solid rgba(11,116,193,.18);
    font-family: 'Syne', sans-serif;
  }

  .omedev-vm .section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    line-height: 1.12;
    letter-spacing: -.03em;
    margin-bottom: 1rem;
    font-family: 'Syne', sans-serif;
    color: #053876;
  }

  .omedev-vm .divider {
    width: 64px;
    height: 4px;
    background: linear-gradient(90deg, #0B74C1, #2AACB2, #55DDB5);
    border-radius: 99px;
    margin: 1rem auto 1.5rem;
  }

  .omedev-vm .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .6rem;
    background: linear-gradient(135deg, #0B74C1 0%, #2AACB2 55%, #55DDB5 100%);
    color: #fff;
    font-size: .9rem;
    font-weight: 700;
    padding: .9rem 1.7rem;
    border-radius: 12px;
    text-decoration: none;
    transition: all .3s ease;
    cursor: pointer;
    border: none;
    font-family: 'Syne', sans-serif;
    box-shadow: 0 10px 28px rgba(11,116,193,.20);
  }

  .omedev-vm .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 36px rgba(42,172,178,.28);
  }

  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
  .omedev-vm .animate-float { animation: float 6s ease-in-out infinite; }
`,x={hidden:{opacity:0,y:30},visible:{opacity:1,y:0,transition:{duration:.6,ease:[.22,.68,0,1]}}},S={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.08,delayChildren:.1}}},C=({icon:e,title:t,value:n,color:r,trend:i,trendValue:a})=>(0,y.jsxs)(m.div,{variants:x,className:`bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl p-6 shadow-[0_10px_30px_rgba(5,56,118,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(11,116,193,0.14)] hover:border-[rgba(42,172,178,0.35)]`,children:[(0,y.jsxs)(`div`,{className:`flex items-center justify-between mb-4`,children:[(0,y.jsx)(`div`,{className:`w-12 h-12 rounded-xl bg-gradient-to-br ${(()=>{switch(r){case`blue`:return`from-[#0B74C1] to-[#2AACB2]`;case`green`:return`from-[#2AACB2] to-[#55DDB5]`;case`orange`:return`from-[#4681B7] to-[#72A5CE]`;case`purple`:return`from-[#053876] to-[#2AACB2]`;default:return`from-[#0B74C1] to-[#2AACB2]`}})()} flex items-center justify-center shadow-lg`,children:(0,y.jsx)(e,{className:`w-6 h-6 text-white`})}),i&&(0,y.jsxs)(`span`,{className:`text-xs font-semibold text-[#2AACB2] bg-[#2AACB2]/15 px-2 py-1 rounded-full`,children:[`+`,a,`%`]})]}),(0,y.jsx)(`div`,{className:`text-2xl font-bold text-[#053876] font-syne`,children:n}),(0,y.jsx)(`div`,{className:`text-[#25364A]/70 text-sm mt-1`,children:t})]}),w=()=>{let[e,t]=(0,v.useState)(!1),[n,w]=(0,v.useState)(`Client`),[T,E]=(0,v.useState)(``),[D,O]=(0,v.useState)(null),[k,A]=(0,v.useState)([]),[j,M]=(0,v.useState)([]),[N,P]=(0,v.useState)(!1);(0,v.useEffect)(()=>{let e=localStorage.getItem(`userName`),t=localStorage.getItem(`userEmail`);e&&w(e),t&&E(t),F()},[]);let F=async()=>{P(!1);try{let[e,t,n]=await Promise.allSettled([d.getStats(),d.getRecentDemands(),d.getActiveProjects()]);e.status===`fulfilled`&&O(e.value.data),t.status===`fulfilled`&&A(t.value.data?.demands||t.value.data||[]),n.status===`fulfilled`&&M(n.value.data?.projects||n.value.data||[]),[e,t,n].every(e=>e.status===`rejected`)&&P(!0)}catch(e){console.error(`Erreur chargement dashboard client:`,e),P(!0)}},I=[{icon:l,title:`Demandes en cours`,value:String(D?.demandesEnCours??`—`),color:`blue`},{icon:r,title:`Projets actifs`,value:String(D?.projetsActifs??`—`),color:`green`},{icon:c,title:`En attente`,value:String(D?.enAttente??`—`),color:`orange`},{icon:h,title:`Total facturé`,value:D?.totalFacture?`${D.totalFacture}€`:`—`,color:`purple`}],L=[{icon:l,label:`Mes demandes`,path:`/client/demandes`,color:`from-[#0B74C1] to-[#2AACB2]`},{icon:g,label:`Mes projets`,path:`/client/projets`,color:`from-[#2AACB2] to-[#55DDB5]`},{icon:a,label:`Historique`,path:`/client/historique`,color:`from-[#053876] to-[#4681B7]`},{icon:f,label:`Mon profil`,path:`/client/profil`,color:`from-[#4681B7] to-[#72A5CE]`},{icon:u,label:`Paiements`,path:`/client/paiements`,color:`from-[#1D5B9B] to-[#2AACB2]`},{icon:s,label:`Support`,path:`/client/support`,color:`from-[#2AACB2] to-[#0B74C1]`}],R=e=>{let t={pending:{label:`En attente`,color:`bg-amber-100 text-amber-700 border-amber-300/50`},approved:{label:`Approuvé`,color:`bg-[#55DDB5]/15 text-[#1D5B9B] border-[#55DDB5]/50`},completed:{label:`Terminé`,color:`bg-blue-100 text-blue-700 border-blue-300/50`},in_progress:{label:`En cours`,color:`bg-[#0B74C1]/10 text-[#0B74C1] border-[#0B74C1]/30`}};return t[e]||t.pending};return(0,y.jsxs)(`div`,{className:`omedev-vm`,children:[(0,y.jsx)(`style`,{children:b}),(0,y.jsxs)(`div`,{className:`min-h-screen`,style:{background:`#F6F6F7`},children:[(0,y.jsx)(o,{onMenuClick:()=>t(!e)}),(0,y.jsxs)(`div`,{className:`flex`,children:[(0,y.jsx)(`div`,{className:`fixed inset-y-0 left-0 z-40 transform ${e?`translate-x-0`:`-translate-x-full`} lg:translate-x-0 transition-transform duration-300`,children:(0,y.jsx)(i,{})}),e&&(0,y.jsx)(`div`,{className:`fixed inset-0 bg-[#0B1213]/40 z-30 lg:hidden`,onClick:()=>t(!1)}),(0,y.jsx)(`div`,{className:`flex-1 lg:ml-64`,children:(0,y.jsxs)(`main`,{className:`p-6 md:p-8`,children:[(0,y.jsxs)(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},className:`mb-8`,children:[(0,y.jsxs)(`h1`,{className:`text-2xl md:text-3xl font-bold text-[#053876] font-syne`,children:[`Bonjour, `,n,` ! 👋`]}),(0,y.jsx)(`p`,{className:`text-[#25364A]/70 mt-1`,children:`Bienvenue sur votre espace client OMEDEV Services`}),T&&(0,y.jsx)(`p`,{className:`text-xs text-[#25364A]/50 mt-1`,children:T})]}),N&&(0,y.jsxs)(`div`,{className:`mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-medium flex items-center justify-between gap-4`,children:[(0,y.jsx)(`span`,{children:`Une erreur est survenue lors du chargement de vos données. Vérifiez votre connexion.`}),(0,y.jsx)(`button`,{onClick:F,className:`shrink-0 px-4 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors`,children:`Réessayer`})]}),(0,y.jsx)(m.div,{variants:S,initial:`hidden`,animate:`visible`,className:`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8`,children:I.map((e,t)=>(0,y.jsx)(C,{...e},t))}),(0,y.jsxs)(`div`,{className:`grid lg:grid-cols-2 gap-8`,children:[(0,y.jsxs)(m.div,{variants:x,initial:`hidden`,animate:`visible`,className:`bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.35)] transition-all`,children:[(0,y.jsx)(`div`,{className:`p-6 border-b border-[rgba(5,56,118,0.1)]`,children:(0,y.jsxs)(`div`,{className:`flex items-center justify-between`,children:[(0,y.jsx)(`h2`,{className:`text-lg font-semibold text-[#053876]`,children:`Dernières demandes`}),(0,y.jsx)(_,{to:`/client/demandes`,className:`text-[#0B74C1] text-sm font-medium hover:text-[#053876] transition-colors`,children:`Voir tout`})]})}),(0,y.jsx)(`div`,{className:`divide-y divide-[rgba(5,56,118,0.1)]`,children:k.map((e,t)=>{let n=R(e.status);return(0,y.jsxs)(m.div,{className:`p-4 hover:bg-[#F6F6F7] transition cursor-pointer`,initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:t*.1},children:[(0,y.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,y.jsx)(`span`,{className:`font-medium text-[#053876]`,children:e.id}),(0,y.jsx)(`span`,{className:`px-2 py-1 rounded-full text-xs font-medium border ${n.color}`,children:n.label})]}),(0,y.jsx)(`p`,{className:`text-sm text-[#25364A]/70`,children:e.service}),(0,y.jsxs)(`div`,{className:`flex items-center justify-between mt-2 text-sm`,children:[(0,y.jsx)(`span`,{className:`text-[#25364A]/50`,children:e.date}),(0,y.jsx)(`span`,{className:`font-medium text-[#2AACB2]`,children:e.amount})]})]},e.id)})})]}),(0,y.jsxs)(m.div,{variants:x,initial:`hidden`,animate:`visible`,className:`bg-white border border-[rgba(5,56,118,0.09)] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(5,56,118,0.06)] hover:border-[rgba(42,172,178,0.35)] transition-all`,children:[(0,y.jsx)(`div`,{className:`p-6 border-b border-[rgba(5,56,118,0.1)]`,children:(0,y.jsx)(`h2`,{className:`text-lg font-semibold text-[#053876]`,children:`Projets en cours`})}),(0,y.jsx)(`div`,{className:`p-6 space-y-6`,children:j.map((e,t)=>(0,y.jsxs)(m.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:t*.1},children:[(0,y.jsxs)(`div`,{className:`flex items-center justify-between mb-2`,children:[(0,y.jsx)(`h3`,{className:`font-medium text-[#053876]`,children:e.name}),(0,y.jsxs)(`span`,{className:`text-sm font-medium text-[#2AACB2]`,children:[e.progress,`%`]})]}),(0,y.jsx)(`div`,{className:`w-full bg-[#E8EDF1] rounded-full h-2`,children:(0,y.jsx)(m.div,{className:`bg-gradient-to-r from-[#2AACB2] to-[#55DDB5] rounded-full h-2`,initial:{width:0},animate:{width:`${e.progress}%`},transition:{duration:.8,delay:.3}})}),(0,y.jsx)(`p`,{className:`text-xs text-[#25364A]/50 mt-2`,children:e.nextMilestone})]},e.id))})]})]}),(0,y.jsxs)(m.div,{variants:x,initial:`hidden`,animate:`visible`,className:`mt-8`,children:[(0,y.jsx)(`h2`,{className:`text-lg font-semibold text-[#053876] mb-4`,children:`Accès rapides`}),(0,y.jsx)(`div`,{className:`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4`,children:L.map((e,t)=>(0,y.jsx)(m.div,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:t*.05},children:(0,y.jsxs)(_,{to:e.path,className:`flex flex-col items-center gap-2 p-4 rounded-xl bg-white border border-[rgba(5,56,118,0.09)] hover:border-[rgba(42,172,178,0.4)] transition-all hover:-translate-y-1 group`,children:[(0,y.jsx)(`div`,{className:`w-10 h-10 rounded-lg bg-gradient-to-br ${e.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110`,children:(0,y.jsx)(e.icon,{className:`w-5 h-5 text-white`})}),(0,y.jsx)(`span`,{className:`text-xs text-[#25364A]/70 group-hover:text-[#053876] transition-colors`,children:e.label})]})},t))})]}),(0,y.jsx)(m.div,{variants:x,initial:`hidden`,animate:`visible`,className:`mt-8 bg-gradient-to-r from-[#0B74C1]/8 to-[#55DDB5]/8 rounded-2xl p-6 border border-[rgba(11,116,193,0.18)]`,children:(0,y.jsxs)(`div`,{className:`flex flex-col sm:flex-row items-center justify-between gap-4`,children:[(0,y.jsxs)(`div`,{children:[(0,y.jsx)(`h3`,{className:`text-xl font-bold text-[#053876] font-syne mb-1`,children:`Besoin d'un nouveau service ?`}),(0,y.jsx)(`p`,{className:`text-[#25364A]/70`,children:`Demandez un devis gratuitement en quelques clics`})]}),(0,y.jsx)(_,{to:`/demander-devis`,children:(0,y.jsxs)(m.button,{whileHover:{scale:1.05},whileTap:{scale:.98},className:`bg-gradient-to-r from-[#0B74C1] via-[#2AACB2] to-[#55DDB5] hover:brightness-110 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-[0_10px_28px_rgba(11,116,193,0.2)] hover:shadow-[0_16px_36px_rgba(42,172,178,0.28)]`,children:[`Nouvelle demande`,(0,y.jsx)(p,{className:`w-4 h-4`})]})})]})})]})})]})]})]})};export{w as default};