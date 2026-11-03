(()=>{'use strict';
const EMAIL='shahriyarkarimsiam@gmail.com';
// Google Apps Script Web App Endpoint (connects to Google Sheet & Gmail)
const APPS_SCRIPT_URL=''; // Paste your Google Apps Script Web App URL here

const menu=document.querySelector('.menu-toggle');const mobile=document.querySelector('#mobile-nav');
if(menu&&mobile){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');mobile.hidden=!open;});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');mobile.hidden=true;}));}
const year=document.querySelector('#year');if(year)year.textContent=String(new Date().getFullYear());
const grid=document.querySelector('#services-grid');
if(grid){let filter='all';const data=window.OPENSTEM_SERVICES||[];const search=document.querySelector('#service-search');const noResults=document.querySelector('#no-results');function render(){const q=(search.value||'').toLocaleLowerCase().trim();const matches=data.filter(s=>(filter==='all'||s.category===filter)&&(`${s.title} ${s.description} ${s.category}`.toLocaleLowerCase().includes(q)));grid.replaceChildren();for(const item of matches){const card=document.createElement('article');card.className='service-card';const top=document.createElement('div');top.className='service-card-top';const num=document.createElement('span');num.className='num';num.textContent=String(item.id).padStart(2,'0');const tag=document.createElement('span');tag.className='category';tag.textContent=item.category;top.append(num,tag);const h=document.createElement('h3');h.textContent=item.title;const p=document.createElement('p');p.textContent=item.description;const link=document.createElement('a');link.href='contact.html?type=student';link.textContent='Ask about this area ↗';card.append(top,h,p,link);grid.append(card);}noResults.hidden=matches.length>0;}document.querySelectorAll('.filter-chip').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('.filter-chip').forEach(chip=>{const active=chip===b;chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));});render();}));search.addEventListener('input',render);render();}
const tabs=[...document.querySelectorAll('[role="tab"][data-tab]')];
if(tabs.length){function activate(which,focus){tabs.forEach(t=>{const chosen=t.dataset.tab===which;t.setAttribute('aria-selected',String(chosen));t.tabIndex=chosen?0:-1;document.querySelector('#'+t.dataset.tab+'-panel').hidden=!chosen;if(chosen&&focus)t.focus();});}tabs.forEach(tab=>{tab.addEventListener('click',()=>activate(tab.dataset.tab,false));tab.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();activate(tab.dataset.tab==='student'?'university':'student',true);}});});const desired=new URLSearchParams(location.search).get('type');if(desired==='university')activate('university',false);}
function emailPayload(form){const fd=new FormData(form);const type=form.dataset.form;const fields=[...form.querySelectorAll('[name]:not([type="checkbox"]):not([type="hidden"])')];const lines=fields.map(el=>{const label=form.querySelector(`label[for="${el.id}"]`);const name=label?label.textContent.replace('*','').trim():el.name;return `${name}: ${(String(fd.get(el.name)||'').trim()||'Not provided')}`;});const subject=type==='student'?'OpenSTEM Recruitment — Student study enquiry':'OpenSTEM Recruitment — Prospective university partnership enquiry';return{subject,body:`Hello OpenSTEM Recruitment,\n\n${type==='student'?'I would like to ask about study and academic pathways.':'I represent an institution and would like to discuss a prospective partnership.'}\n\n${lines.join('\n')}\n\nI understand this message is only an enquiry, not an application, university agreement or outcome guarantee.\n\nKind regards,\n${String(fd.get('name')||'').trim()}`};}
function showStatus(form,txt,variant=''){const el=form.querySelector('.form-status');if(!el)return;el.textContent=txt;el.className='form-status'+(variant?' is-'+variant:'');}
async function copyText(s){if(navigator.clipboard&&window.isSecureContext){await navigator.clipboard.writeText(s);return;}const textarea=document.createElement('textarea');textarea.value=s;textarea.style.cssText='position:fixed;left:-10000px;top:0';document.body.append(textarea);textarea.select();let ok=false;try{ok=document.execCommand('copy');}finally{textarea.remove();}if(!ok)throw Error('Clipboard unavailable');}

document.querySelectorAll('.enquiry-form').forEach(form=>{
  const submitBtn=form.querySelector('button[type="submit"]');
  const originalBtnText=submitBtn?submitBtn.textContent:'Send enquiry →';
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(!form.reportValidity())return;
    if(submitBtn){submitBtn.disabled=true;submitBtn.textContent='Saving & sending...';}
    showStatus(form,'Saving enquiry to Google Sheets and sending notification to '+EMAIL+'...','info');
    const fd=new FormData(form);
    const data={form_type:form.dataset.form};
    fd.forEach((value,key)=>{if(key!=='consent')data[key]=value;});

    try{
      if(APPS_SCRIPT_URL&&APPS_SCRIPT_URL.startsWith('http')){
        // Send to Google Apps Script (Saves to Google Sheet & sends email)
        await fetch(APPS_SCRIPT_URL,{
          method:'POST',
          mode:'no-cors',
          headers:{'Content-Type':'text/plain;charset=utf-8'},
          body:JSON.stringify(data)
        });
        showStatus(form,'✓ Enquiry saved to Google Sheet and emailed directly to '+EMAIL+'. We will reply soon!','success');
        form.reset();
      }else{
        // Direct delivery fallback via FormSubmit to shahriyarkarimsiam@gmail.com
        const response=await fetch(`https://formsubmit.co/ajax/${EMAIL}`,{
          method:'POST',
          headers:{'Content-Type':'application/json','Accept':'application/json'},
          body:JSON.stringify(data)
        });
        const result=await response.json();
        if(response.ok&&(result.success===true||result.success==='true')){
          showStatus(form,'✓ Enquiry sent successfully! An email has been delivered to '+EMAIL+'. We will reply soon.','success');
          form.reset();
        }else{
          throw new Error(result.message||'Direct submission failed');
        }
      }
    }catch(err){
      const{subject,body}=emailPayload(form);
      showStatus(form,'Direct connection was interrupted. Opening draft in your email app instead...','warning');
      window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }finally{
      if(submitBtn){submitBtn.disabled=false;submitBtn.textContent=originalBtnText;}
    }
  });

  form.querySelector('.gmail-btn')?.addEventListener('click',()=>{
    if(!form.reportValidity())return;
    const{subject,body}=emailPayload(form);
    const gmailUrl=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl,'_blank','noopener,noreferrer');
    showStatus(form,'Opened a draft in Gmail addressed to '+EMAIL+'. Please review and click Send.','info');
  });

  form.querySelector('.copy-btn')?.addEventListener('click',async()=>{
    if(!form.reportValidity())return;
    const{subject,body}=emailPayload(form);
    try{
      await copyText(`To: ${EMAIL}\nSubject: ${subject}\n\n${body}`);
      showStatus(form,'Enquiry copied to clipboard. Paste it into your email provider and send it to '+EMAIL+'.','info');
    }catch{
      showStatus(form,'Copy was unavailable in this browser. Please use Gmail or email link above.','warning');
    }
  });
});
})();
