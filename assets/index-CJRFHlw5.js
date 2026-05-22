(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,r){let i=[],s=[],c=[],d=[],f=[],p=[{typePrefixes:[`M`],isRetain:!0,ranges:e.bitsRetainRanges},{typePrefixes:[`M`],isRetain:!1,ranges:e.bitsNonRetainRanges},{typePrefixes:[`D`],isRetain:!0,ranges:e.wordsRetainRanges},{typePrefixes:[`D`],isRetain:!1,ranges:e.wordsNonRetainRanges},{typePrefixes:[`T`],isRetain:!1,ranges:[{start:0,end:Number.MAX_VALUE}]},{typePrefixes:[`C`],isRetain:!1,ranges:[{start:0,end:Number.MAX_VALUE}]}],m=e=>(e||[]).reduce((e,t)=>e+(t.end-t.start+1),0),h={retainBits:{used:0,total:m(e.bitsRetainRanges)},nonRetainBits:{used:0,total:m(e.bitsNonRetainRanges)},retainWords:{used:0,total:m(e.wordsRetainRanges)},nonRetainWords:{used:0,total:m(e.wordsNonRetainRanges)}},g=t(r);console.log(g);for(let t of g)if(t.isPlcVariable){let r=l(t.type),m=p.find(e=>e.typePrefixes.findIndex(e=>e===r)>=0&&e.isRetain===t.isRetainVariable);if(!m||!m.ranges||!m.activeRange&&m.ranges.length===0)throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);m.activeRange||=m.ranges.shift();let g=m.activeRange;if(!g)throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);let _=u(t.type);if(_===void 0)throw Error(`Unsupported variable type for size calculation: ${t.type}, variable name: ${t.name}`);let v=r;if(v===`M`?t.isRetainVariable?h.retainBits.used+=_:h.nonRetainBits.used+=_:v===`D`&&(t.isRetainVariable?h.retainWords.used+=_:h.nonRetainWords.used+=_),g.start+_>g.end+1&&(m.activeRange=m.ranges.shift(),g=m.activeRange,!g))throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);let y=n(t.plcName,t.type,g.start);if(i.push(y),t.isScadaVariable){let n=a(e.variableTypeName,t.name);s.push(n);let r=o(e.methodName,`${t.name} AT%${l(t.type)}${g.start} : ${t.type}`,t.tags.join(`,`),t.isReadVariable,!1);c.push(`${n} = ${r}`),d.push(`${t.name} = ${r}`),f.push(`${t.name}`)}g.start+=_}else if(t.isScadaVariable){let n=a(e.variableTypeName,t.name);s.push(n);let r=o(e.methodName,`${t.name} AT%Local : ${t.type}`,t.tags.join(`,`),t.isReadVariable,!1);c.push(`${n} = ${r}`),d.push(`${t.name} = ${r}`),f.push(`${t.name}`)}return{plcDefinitions:i,propertyDefinitions:s,inlineDefinitions:c,propertyInitializations:d,enumDefinitions:f,memoryUsage:h}}function t(e){let t=[`bool`,`int`,`word`,`realint`,`realint(1)`,`realint(2)`,`realint(3)`,`dint`,`dword`,`real`,`timer`,`counter`],n=e=>e.isPlcVariable&&e.isReadVariable?0:1;return e.sort((e,r)=>{let i=t.indexOf(e.type.toLowerCase())-t.indexOf(r.type.toLowerCase());if(i!==0)return i;let a=n(e)-n(r);return a===0?e.name.localeCompare(r.name):a})}function n(e,t,n){let r=s(t);if(!r)throw Error(`Unsupported variable type: ${t}`);let a=c(t,n);return`VAR,${i(e)},${a},${r},,`}var r={İ:`I`,ı:`i`,ü:`u`,Ü:`U`,ö:`o`,Ö:`O`,ç:`c`,Ç:`C`,ğ:`g`,Ğ:`G`,Ş:`S`,ş:`s`};function i(e){return e.replace(/[İıüÜöÖçÇğĞŞş]/g,e=>r[e]||e)}function a(e,t){return`public ${e} ${t} { get; set; }`}function o(e,t,n,r,i){return`${e}("${t}", "${n}", ${r?`true`:`false`}, ${i?`true`:`false`});`}function s(e){let t=e.toLowerCase();return t.startsWith(`realint`)?`WORD`:{bool:`BOOL`,int:`WORD`,word:`WORD`,dint:`DWORD`,dword:`DWORD`,real:`REAL`,timer:`TIMER`,counter:`COUNTER`}[t]}function c(e,t){return`${l(e)}${t}`}function l(e){let t=e.toLowerCase();return t.startsWith(`realint`)?`D`:{bool:`M`,int:`D`,word:`D`,dint:`D`,dword:`D`,real:`D`,timer:`T`,counter:`C`}[t]}function u(e){let t=e.toLowerCase();return t.startsWith(`realint`)?1:{bool:1,int:1,word:1,dint:2,dword:2,real:2,timer:1,counter:1}[t]}function d(e){return e?.trim()?e.split(`,`).map(e=>e.trim()).filter(e=>e.length>0).map(e=>{let[t,n]=e.split(`-`).map(Number);return{start:t,end:n}}):[]}function f(e){if(!e)return null;let[t,n,r,i,a,o,s,c]=e.split(`:`);return!t||!n?(console.warn(`Invalid template format: ${e}`),null):{name:t,type:n,tags:r?r.split(`,`).map(e=>e.trim()).filter(e=>e.length>0):[],plcName:i&&i.length>0?i:t,isPlcVariable:a===`1`,isRetainVariable:o===`1`,isScadaVariable:s===`1`,isReadVariable:c===`1`}}function p(e,t=!1,n={}){let{duration:r=4e3,position:i=`top-right`}=n,a=document.querySelector(`.toast-container.${i}`);a||(a=document.createElement(`div`),a.className=`toast-container ${i}`,document.body.appendChild(a));let o=document.createElement(`div`);o.className=`toast ${t?`toast-error`:`toast-success`}`,o.setAttribute(`role`,`alert`),o.setAttribute(`aria-live`,`polite`),o.innerHTML=`
    <span class="toast-icon">${t?`✕`:`✓`}</span>
    <span class="toast-message">${m(e)}</span>
    <button type="button" class="toast-close" aria-label="Bildirim kapat">✕</button>
  `;let s=o.querySelector(`.toast-close`),c=()=>{o.classList.add(`toast-exit`),setTimeout(()=>o.remove(),300)};if(s.addEventListener(`click`,c),a.appendChild(o),requestAnimationFrame(()=>{o.classList.add(`toast-enter`)}),r>0){let e=setTimeout(c,r);o.addEventListener(`mouseenter`,()=>clearTimeout(e)),o.addEventListener(`mouseleave`,()=>{setTimeout(c,r)})}return o}function m(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}function h(e,t){return p(e,!1,t)}function g(e,t){return p(e,!0,t)}document.querySelector(`#app`).innerHTML=`
<aside class="drawer" id="project-drawer">
  <div class="drawer-header">
    <h2>Proje</h2>
    <button type="button" class="drawer-close" id="drawer-close" aria-label="Drawer'ı kapat">✕</button>
  </div>
  <div class="drawer-content">
    <div class="field-group">
      <label for="project-name">Proje Adı</label>
      <input id="project-name" type="text" placeholder="Proje adını girin" />
    </div>
    <div class="button-group">
      <button type="button" class="btn btn-primary" id="save-project">İndir</button>
      <button type="button" class="btn btn-secondary" id="load-project">Yükle</button>
      <input type="file" id="file-input" accept=".json" style="display: none;" />
    </div>
    
    <div class="drawer-divider"></div>
    
    <div class="drawer-section-title">Aralık Ayarları</div>
    <div class="field-group">
      <label for="retain-bit">Retain Bit Aralıkları</label>
      <input id="retain-bit" type="text" placeholder="Retain bit aralığını girin" />
    </div>
    <div class="field-group">
      <label for="nonretain-bit">Non-Retain Bit Aralıkları</label>
      <input id="nonretain-bit" type="text" placeholder="Non-retain bit aralığını girin" />
    </div>
    <div class="field-group">
      <label for="retain-word">Retain Word Aralıkları</label>
      <input id="retain-word" type="text" placeholder="Retain word aralığını girin" />
    </div>
    <div class="field-group">
      <label for="nonretain-word">Non-Retain Word Aralıkları</label>
      <input id="nonretain-word" type="text" placeholder="Non-retain word aralığını girin" />
    </div>
  </div>
</aside>
<div class="drawer-overlay" id="drawer-overlay"></div>
<main class="app-shell">
  <button type="button" class="drawer-toggle" id="drawer-toggle" aria-label="Proje drawer'ını aç">☰ Proje</button>
  <section class="form-section">
    <h1>Delta DVP Adres Düzenleyici</h1>
    <div class="field-group full-width">
      <label for="variables">Değişkenler</label>
      <textarea id="variables" rows="6" placeholder="Değişkenleri buraya yapıştırın..."></textarea>
            <div class="input-meta">
                <span id="variables-count" class="variables-count" aria-live="polite"></span>
            </div>
      <button id="apply-button" type="button" class="apply-button">Uygula</button>
      <div id="status-message" class="status-message" role="status" aria-live="polite"></div>
    </div>
  </section>

  <section class="tabs-section">
    <div class="tab-buttons" role="tablist" aria-label="Tab seçenekleri">
      <button type="button" class="tab-button active" data-tab="plc">Plc</button>
      <button type="button" class="tab-button" data-tab="property">Property</button>
      <button type="button" class="tab-button" data-tab="inline">Inline</button>
      <button type="button" class="tab-button" data-tab="init">Init</button>
      <button type="button" class="tab-button" data-tab="enum">Enum</button>
    </div>

    <div class="tab-panels">
      <div class="tab-panel active" data-panel="plc">
        <div class="panel-header">
          <h2>Plc</h2>
          <span class="panel-count" aria-live="polite"></span>
          <button type="button" class="copy-button" data-copy="plc" aria-label="Plc içeriğini kopyala">Kopyala</button>
        </div>
        <textarea readonly rows="8"></textarea>
      </div>
      <div class="tab-panel" data-panel="property">
        <div class="panel-header">
          <h2>Property</h2>
          <span class="panel-count" aria-live="polite"></span>
          <button type="button" class="copy-button" data-copy="property" aria-label="Property içeriğini kopyala">Kopyala</button>
        </div>
        <textarea readonly rows="8"></textarea>
      </div>
      <div class="tab-panel" data-panel="inline">
        <div class="panel-header">
          <h2>Inline</h2>
          <span class="panel-count" aria-live="polite"></span>
          <button type="button" class="copy-button" data-copy="inline" aria-label="Inline içeriğini kopyala">Kopyala</button>
        </div>
        <textarea readonly rows="8"></textarea>
      </div>
      <div class="tab-panel" data-panel="init">
        <div class="panel-header">
          <h2>Init</h2>
          <span class="panel-count" aria-live="polite"></span>
          <button type="button" class="copy-button" data-copy="init" aria-label="Init içeriğini kopyala">Kopyala</button>
        </div>
        <textarea readonly rows="8"></textarea>
      </div>
      <div class="tab-panel" data-panel="enum">
        <div class="panel-header">
          <h2>Enum</h2>
          <span class="panel-count" aria-live="polite"></span>
          <button type="button" class="copy-button" data-copy="enum" aria-label="Enum içeriğini kopyala">Kopyala</button>
        </div>
        <textarea readonly rows="8"></textarea>
      </div>
    </div>
  </section>
</main>
`;var _=document.querySelectorAll(`.tab-button`),v=document.querySelectorAll(`.tab-panel`);_.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;t&&(_.forEach(t=>t.classList.toggle(`active`,t===e)),v.forEach(e=>{let n=e.dataset.panel===t;e.classList.toggle(`active`,n)}))})});var y=document.querySelector(`#retain-bit`),b=document.querySelector(`#nonretain-bit`),x=document.querySelector(`#retain-word`),S=document.querySelector(`#nonretain-word`),C=document.querySelector(`#variables`),w=document.querySelector(`.tab-panel[data-panel="plc"] textarea`),T=document.querySelector(`.tab-panel[data-panel="property"] textarea`),E=document.querySelector(`.tab-panel[data-panel="inline"] textarea`),D=document.querySelector(`.tab-panel[data-panel="init"] textarea`),O=document.querySelector(`.tab-panel[data-panel="enum"] textarea`),k=document.querySelector(`.tab-panel[data-panel="plc"] .panel-count`),A=document.querySelector(`.tab-panel[data-panel="property"] .panel-count`),j=document.querySelector(`.tab-panel[data-panel="inline"] .panel-count`),M=document.querySelector(`.tab-panel[data-panel="init"] .panel-count`),N=document.querySelector(`.tab-panel[data-panel="enum"] .panel-count`),P=document.querySelector(`#variables-count`),F=document.createElement(`div`);F.id=`memory-usage`,F.className=`memory-usage`,F.classList.add(`hidden`);var I=document.querySelector(`.tabs-section`);I.parentElement?.insertBefore(F,I);var L=document.querySelector(`#apply-button`);function R(e){return e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0)}function z(e,t){if(Number.isNaN(e.start)||Number.isNaN(e.end))throw Error(`${t} içinde geçersiz sayı aralığı var.`);if(!Number.isInteger(e.start)||!Number.isInteger(e.end))throw Error(`${t} için yalnızca tam sayılar kullanılmalıdır.`);if(e.start<0||e.end<0)throw Error(`${t} negatif olamaz.`);if(e.start>e.end)throw Error(`${t} başlangıcı bitişinden küçük veya eşit olmalıdır.`);return e}function B(e,t){return d(e).map(e=>z(e,t))}function V(){w.value=``,T.value=``,E.value=``,D.value=``,O.value=``,k.textContent=``,A.textContent=``,j.textContent=``,M.textContent=``,N.textContent=``,P.textContent=``}function H(e){k.textContent=`Değişken sayısı: ${e.plcDefinitions.length}`,A.textContent=`Değişken sayısı: ${e.propertyDefinitions.length}`,j.textContent=`Değişken sayısı: ${e.inlineDefinitions.length}`,M.textContent=`Değişken sayısı: ${e.propertyInitializations.length}`,N.textContent=`Değişken sayısı: ${e.enumDefinitions.length}`}async function U(e){let t=e.closest(`.tab-panel`)?.querySelector(`textarea`);if(t)try{await navigator.clipboard.writeText(t.value),h(`Çıktı panosu kopyalandı.`)}catch(e){console.error(e),g(`Kopyalama başarısız oldu.`)}}document.querySelectorAll(`.copy-button`).forEach(e=>{e.addEventListener(`click`,()=>U(e))}),L.addEventListener(`click`,()=>{V();try{let t={variableTypeName:`IVariable`,methodName:`VariableHelper.Define`,bitsRetainRanges:B(y.value,`Retain Bit Aralıkları`),bitsNonRetainRanges:B(b.value,`NonRetain Bit Aralıkları`),wordsRetainRanges:B(x.value,`Retain Word Aralıkları`),wordsNonRetainRanges:B(S.value,`NonRetain Word Aralıkları`)},n=R(C.value);if(n.length===0)throw Error(`Lütfen en az bir değişken satırı girin.`);let r=n.map((e,t)=>f(e)||null).filter(e=>e!==null);P.textContent=`Girdi değişken sayısı: ${r.length}`;let i=e(t,r);if(w.value=[`Class,Identifiers,Address,Type,Initial Value,Comment`,...i.plcDefinitions].join(`
`),T.value=i.propertyDefinitions.join(`
`),E.value=i.inlineDefinitions.join(`
`),D.value=i.propertyInitializations.join(`
`),O.value=i.enumDefinitions.join(`,
`),H(i),i.memoryUsage){let e=i.memoryUsage,t=[{label:`Retain Bit`,used:e.retainBits.used,total:e.retainBits.total},{label:`Non-Retain Bit`,used:e.nonRetainBits.used,total:e.nonRetainBits.total},{label:`Retain Word`,used:e.retainWords.used,total:e.retainWords.total},{label:`Non-Retain Word`,used:e.nonRetainWords.used,total:e.nonRetainWords.total}];F.innerHTML=t.map(e=>{let t=Number.isFinite(e.total)?e.total:0,n=Number.isFinite(e.used)?e.used:0,r=t>0?Math.round(n/t*100):0,i=t>0?`${r}%`:`-`,a=`${n}/${t}`,o=t>0?r>=90?`danger`:r>=70?`warning`:`ok`:`ok`;return`
            <div class="mu-item">
                <div class="mu-row">
                    <div class="mu-label">${e.label}</div>
                    <div class="mu-meta">${a} · <span class="mu-pct mu-${o}">${i}</span></div>
                </div>
                <div class="mu-bar"><div class="mu-bar-fill mu-${o}" style="width: ${r}%"></div></div>
            </div>`}).join(``),t.some(e=>Number.isFinite(e.total)&&e.total>0)?F.classList.remove(`hidden`):F.classList.add(`hidden`)}else F.innerHTML=``,F.classList.add(`hidden`);h(`Tanımlamalar başarıyla oluşturuldu.`)}catch(e){g(e instanceof Error?e.message:`Bilinmeyen bir hata oluştu.`),console.error(e)}});var W=document.querySelector(`#project-drawer`),G=document.querySelector(`#drawer-toggle`),K=document.querySelector(`#drawer-close`),q=document.querySelector(`#drawer-overlay`),J=document.querySelector(`#project-name`),Y=document.querySelector(`#save-project`),ee=document.querySelector(`#load-project`),X=document.querySelector(`#file-input`),Z=null;function Q(e){let t=e===void 0?!W.classList.contains(`drawer-open`):e;W.classList.toggle(`drawer-open`,t),q.classList.toggle(`drawer-open`,t)}async function $(e=!1){let t=J.value.trim();if(!t){g(`Lütfen proje adı girin.`);return}let n={name:t,retainBit:y.value,nonRetainBit:b.value,retainWord:x.value,nonRetainWord:S.value,variables:C.value,timestamp:Date.now()},r=JSON.stringify(n,null,2);if(`showSaveFilePicker`in window&&(!e||!Z))try{let e=await window.showSaveFilePicker({suggestedName:`${t.replace(/\s+/g,`_`)}_${Date.now()}.json`,types:[{description:`JSON Files`,accept:{"application/json":[`.json`]}}]}),n=await e.createWritable();await n.write(r),await n.close(),Z=e,h(`"${t}" projesi "${e.name}"'e başarıyla kaydedildi.`)}catch(e){e.name!==`AbortError`&&g(`Dosya kaydedilirken hata: ${e.message}`)}else if(e&&Z)try{let e=await Z.createWritable();await e.write(r),await e.close(),h(`"${t}" projesi başarıyla kaydedildi.`)}catch(e){g(`Dosya kaydedilirken hata: ${e.message}`)}else{let e=new Blob([r],{type:`application/json`}),n=URL.createObjectURL(e),i=document.createElement(`a`);i.href=n,i.download=`${t.replace(/\s+/g,`_`)}_${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),h(`"${t}" projesi başarıyla indirildi.`)}}function te(){X.click()}function ne(e){let t=e.target,n=t.files?.[0];if(!n)return;let r=new FileReader;r.onload=e=>{try{let t=e.target?.result,n=JSON.parse(t);y.value=n.retainBit,b.value=n.nonRetainBit,x.value=n.retainWord,S.value=n.nonRetainWord,C.value=n.variables,J.value=n.name,Z=null,V(),Q(!1),h(`"${n.name}" projesi başarıyla yüklendi.`)}catch(e){g(`Dosya yüklenirken hata: ${e instanceof Error?e.message:`Dosya okunamadı.`}`)}},r.onerror=()=>{g(`Dosya okunamadı.`)},r.readAsText(n),t.value=``}G.addEventListener(`click`,()=>Q()),K.addEventListener(`click`,()=>Q(!1)),q.addEventListener(`click`,()=>Q(!1)),Y.addEventListener(`click`,async()=>{await $(!1)}),ee.addEventListener(`click`,te),X.addEventListener(`change`,ne),document.addEventListener(`keydown`,async e=>{(e.ctrlKey||e.metaKey)&&e.key===`s`&&(e.preventDefault(),await $(!0))});