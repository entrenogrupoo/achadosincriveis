'use strict';
const config = window.ACHADOS_CONFIG || {};
const pixelId = String(config.metaPixelId || '').trim();
if (/^\d+$/.test(pixelId)) {
  (function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  window.fbq('init',pixelId);window.fbq('track','PageView');
}
let groupUrl;
try { const u=new URL(config.groupUrl); if(u.protocol==='https:' && ['chat.whatsapp.com','wa.me','www.whatsapp.com'].includes(u.hostname))groupUrl=u.href; } catch {}
document.querySelectorAll('[data-group]').forEach(a=>{
  if(groupUrl){a.href=groupUrl;a.target='_blank';a.rel='noopener noreferrer';}
  a.addEventListener('click',e=>{
    if(!groupUrl){e.preventDefault();const s=document.getElementById('group-status');s.textContent='O grupo estará disponível em breve. Volte para conferir!';s.hidden=false;if(offerDialog.open)offerDialog.close();s.scrollIntoView({behavior:'smooth',block:'center'});return;}
    if(window.fbq)window.fbq('trackCustom','WhatsAppGroupClick');
  });
});
const section=document.getElementById('testimonials');
if(Array.isArray(config.testimonials)&&config.testimonials.length){section.hidden=false;config.testimonials.forEach(t=>{const card=document.createElement('article');card.className='review';const p=document.createElement('p');p.textContent=t.text;const b=document.createElement('b');b.textContent=t.name;card.append(p,b);document.getElementById('reviews').append(card);});}
const toast=document.getElementById('toast');let index=0,hideTimer;
if(config.demoNotifications&&Array.isArray(config.names)&&config.names.length){
  const show=()=>{if(document.hidden||(document.getElementById('policy-dialog').open || document.getElementById('offer-dialog').open))return;document.getElementById('toast-name').textContent=config.names[index++%config.names.length];toast.hidden=false;clearTimeout(hideTimer);hideTimer=setTimeout(()=>toast.hidden=true,4500);};
  setInterval(show,Math.max(7000,Number(config.notificationIntervalMs)||7000));
}
document.getElementById('dismiss-toast').onclick=()=>{toast.hidden=true;clearTimeout(hideTimer);};
const policies={terms:['Termos de uso','O Achados Incríveis compartilha links de ofertas de lojas externas. Preços, estoque e condições de compra são definidos pelas lojas e podem mudar. Confira os detalhes no site da loja antes de comprar. A participação no grupo é gratuita.'],privacy:['Privacidade','Esta página não solicita cadastro. Ao entrar no grupo, aplicam-se as regras e a política de privacidade do WhatsApp. Quando configurado, o Pixel da Meta pode usar cookies e registrar visitas e cliques para medir anúncios. O clique no botão indica interesse em acessar o grupo; não confirma que a pessoa entrou.']};
const dialog=document.getElementById('policy-dialog');document.querySelectorAll('[data-policy]').forEach(b=>b.onclick=()=>{const data=policies[b.dataset.policy];document.getElementById('policy-title').textContent=data[0];document.getElementById('policy-text').textContent=data[1];dialog.showModal();});
document.querySelector('#policy-dialog .close-dialog').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

// Percentual demonstrativo: não representa a ocupação real de um grupo.
const capacity = Math.floor(Math.random()*14)+85;
document.getElementById('capacity-percent').textContent=capacity+'%';
document.getElementById('capacity-fill').style.width=capacity+'%';
document.getElementById('capacity-remaining').textContent=100-capacity;
document.getElementById('remaining-card').textContent=100-capacity;
const offerDialog=document.getElementById('offer-dialog');let offerShown=false;
const checkOffer=()=>{const extent=document.documentElement.scrollHeight-innerHeight;if(!offerShown && extent>0 && scrollY/extent>=.45 && !dialog.open){offerShown=true;toast.hidden=true;offerDialog.showModal();}};
window.addEventListener('scroll',checkOffer,{passive:true});
document.getElementById('close-offer').onclick=()=>offerDialog.close();
offerDialog.addEventListener('click',e=>{if(e.target===offerDialog){const r=offerDialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)offerDialog.close();}});
