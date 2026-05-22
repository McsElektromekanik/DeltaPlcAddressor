(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e,a){let o=[],l=[],u=[],d=[],f=[],p=[{typePrefixes:[`M`],isRetain:!0,ranges:e.bitsRetainRanges},{typePrefixes:[`M`],isRetain:!1,ranges:e.bitsNonRetainRanges},{typePrefixes:[`D`],isRetain:!0,ranges:e.wordsRetainRanges},{typePrefixes:[`D`],isRetain:!1,ranges:e.wordsNonRetainRanges},{typePrefixes:[`T`],isRetain:!1,ranges:[{start:0,end:Number.MAX_VALUE}]},{typePrefixes:[`C`],isRetain:!1,ranges:[{start:0,end:Number.MAX_VALUE}]}],m=t(a);console.log(m);for(let t of m)if(t.isPlcVariable){let a=s(t.type),m=p.find(e=>e.typePrefixes.findIndex(e=>e===a)>=0&&e.isRetain===t.isRetainVariable);if(!m||!m.ranges||!m.activeRange&&m.ranges.length===0)throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);m.activeRange||=m.ranges.shift();let h=m.activeRange;if(!h)throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);let g=c(t.type);if(g===void 0)throw Error(`Unsupported variable type for size calculation: ${t.type}, variable name: ${t.name}`);if(h.start+g>h.end+1&&(m.activeRange=m.ranges.shift(),h=m.activeRange,!h))throw Error(`No address range defined for variable name: ${t.name} type: ${t.type} (retain: ${t.isRetainVariable})`);let _=n(t.plcName,t.type,h.start);if(o.push(_),t.isScadaVariable){let n=r(e.variableTypeName,t.name);l.push(n);let a=i(e.methodName,`${t.name} AT%${s(t.type)}${h.start} : ${t.type}`,t.tags.join(`,`),t.isReadVariable,!1);u.push(`${n} = ${a}`),d.push(`${t.name} = ${a}`),f.push(`${t.name}`)}h.start+=g}else if(t.isScadaVariable){let n=r(e.variableTypeName,t.name);l.push(n);let a=i(e.methodName,`${t.name} AT%Local : ${t.type}`,t.tags.join(`,`),t.isReadVariable,!1);u.push(`${n} = ${a}`),d.push(`${t.name} = ${a}`),f.push(`${t.name}`)}return{plcDefinitions:o,propertyDefinitions:l,inlineDefinitions:u,propertyInitializations:d,enumDefinitions:f}}function t(e){let t=[`bool`,`int`,`word`,`realint`,`realint(1)`,`realint(2)`,`realint(3)`,`dint`,`dword`,`real`,`timer`,`counter`],n=e=>e.isPlcVariable&&e.isReadVariable?0:1;return e.sort((e,r)=>{let i=t.indexOf(e.type.toLowerCase())-t.indexOf(r.type.toLowerCase());if(i!==0)return i;let a=n(e)-n(r);return a===0?e.name.localeCompare(r.name):a})}function n(e,t,n){let r=a(t);if(!r)throw Error(`Unsupported variable type: ${t}`);return`VAR,${e},${o(t,n)},${r},,`}function r(e,t){return`public ${e} ${t} { get; set; }`}function i(e,t,n,r,i){return`${e}("${t}", "${n}", ${r?`true`:`false`}, ${i?`true`:`false`});`}function a(e){let t=e.toLowerCase();return t.startsWith(`realint`)?`WORD`:{bool:`BOOL`,int:`WORD`,word:`WORD`,dint:`DWORD`,dword:`DWORD`,real:`REAL`,timer:`TIMER`,counter:`COUNTER`}[t]}function o(e,t){return`${s(e)}${t}`}function s(e){let t=e.toLowerCase();return t.startsWith(`realint`)?`D`:{bool:`M`,int:`D`,word:`D`,dint:`D`,dword:`D`,real:`D`,timer:`T`,counter:`C`}[t]}function c(e){let t=e.toLowerCase();return t.startsWith(`realint`)?1:{bool:1,int:1,word:1,dint:2,dword:2,real:2,timer:1,counter:1}[t]}function l(e){return e?.trim()?e.split(`,`).map(e=>e.trim()).filter(e=>e.length>0).map(e=>{let[t,n]=e.split(`-`).map(Number);return{start:t,end:n}}):[]}function u(e){if(!e)return null;let[t,n,r,i,a,o,s,c]=e.split(`:`);return!t||!n?(console.warn(`Invalid template format: ${e}`),null):{name:t,type:n,tags:r?r.split(`,`).map(e=>e.trim()).filter(e=>e.length>0):[],plcName:i&&i.length>0?i:t,isPlcVariable:a===`1`,isRetainVariable:o===`1`,isScadaVariable:s===`1`,isReadVariable:c===`1`}}function d(e,t=!1,n={}){let{duration:r=4e3,position:i=`top-right`}=n,a=document.querySelector(`.toast-container.${i}`);a||(a=document.createElement(`div`),a.className=`toast-container ${i}`,document.body.appendChild(a));let o=document.createElement(`div`);o.className=`toast ${t?`toast-error`:`toast-success`}`,o.setAttribute(`role`,`alert`),o.setAttribute(`aria-live`,`polite`),o.innerHTML=`
    <span class="toast-icon">${t?`✕`:`✓`}</span>
    <span class="toast-message">${f(e)}</span>
    <button type="button" class="toast-close" aria-label="Bildirim kapat">✕</button>
  `;let s=o.querySelector(`.toast-close`),c=()=>{o.classList.add(`toast-exit`),setTimeout(()=>o.remove(),300)};if(s.addEventListener(`click`,c),a.appendChild(o),requestAnimationFrame(()=>{o.classList.add(`toast-enter`)}),r>0){let e=setTimeout(c,r);o.addEventListener(`mouseenter`,()=>clearTimeout(e)),o.addEventListener(`mouseleave`,()=>{setTimeout(c,r)})}return o}function f(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}function p(e,t){return d(e,!1,t)}function m(e,t){return d(e,!0,t)}document.querySelector(`#app`).innerHTML=`
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
`;var h=document.querySelectorAll(`.tab-button`),g=document.querySelectorAll(`.tab-panel`);h.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.tab;t&&(h.forEach(t=>t.classList.toggle(`active`,t===e)),g.forEach(e=>{let n=e.dataset.panel===t;e.classList.toggle(`active`,n)}))})});var _=document.querySelector(`#retain-bit`),v=document.querySelector(`#nonretain-bit`),y=document.querySelector(`#retain-word`),b=document.querySelector(`#nonretain-word`),x=document.querySelector(`#variables`),S=document.querySelector(`.tab-panel[data-panel="plc"] textarea`),C=document.querySelector(`.tab-panel[data-panel="property"] textarea`),w=document.querySelector(`.tab-panel[data-panel="inline"] textarea`),T=document.querySelector(`.tab-panel[data-panel="init"] textarea`),E=document.querySelector(`.tab-panel[data-panel="enum"] textarea`),D=document.querySelector(`.tab-panel[data-panel="plc"] .panel-count`),O=document.querySelector(`.tab-panel[data-panel="property"] .panel-count`),k=document.querySelector(`.tab-panel[data-panel="inline"] .panel-count`),A=document.querySelector(`.tab-panel[data-panel="init"] .panel-count`),j=document.querySelector(`.tab-panel[data-panel="enum"] .panel-count`),M=document.querySelector(`#variables-count`),N=document.querySelector(`#apply-button`);function P(e){return e.split(/\r?\n/).map(e=>e.trim()).filter(e=>e.length>0)}function F(e,t){if(Number.isNaN(e.start)||Number.isNaN(e.end))throw Error(`${t} içinde geçersiz sayı aralığı var.`);if(!Number.isInteger(e.start)||!Number.isInteger(e.end))throw Error(`${t} için yalnızca tam sayılar kullanılmalıdır.`);if(e.start<0||e.end<0)throw Error(`${t} negatif olamaz.`);if(e.start>e.end)throw Error(`${t} başlangıcı bitişinden küçük veya eşit olmalıdır.`);return e}function I(e,t){return l(e).map(e=>F(e,t))}function L(){S.value=``,C.value=``,w.value=``,T.value=``,E.value=``,D.textContent=``,O.textContent=``,k.textContent=``,A.textContent=``,j.textContent=``,M.textContent=``}function R(e){D.textContent=`Değişken sayısı: ${e.plcDefinitions.length}`,O.textContent=`Değişken sayısı: ${e.propertyDefinitions.length}`,k.textContent=`Değişken sayısı: ${e.inlineDefinitions.length}`,A.textContent=`Değişken sayısı: ${e.propertyInitializations.length}`,j.textContent=`Değişken sayısı: ${e.enumDefinitions.length}`}async function z(e){let t=e.closest(`.tab-panel`)?.querySelector(`textarea`);if(t)try{await navigator.clipboard.writeText(t.value),p(`Çıktı panosu kopyalandı.`)}catch(e){console.error(e),m(`Kopyalama başarısız oldu.`)}}document.querySelectorAll(`.copy-button`).forEach(e=>{e.addEventListener(`click`,()=>z(e))}),N.addEventListener(`click`,()=>{L();try{let t={variableTypeName:`IVariable`,methodName:`VariableHelper.Define`,bitsRetainRanges:I(_.value,`Retain Bit Aralıkları`),bitsNonRetainRanges:I(v.value,`NonRetain Bit Aralıkları`),wordsRetainRanges:I(y.value,`Retain Word Aralıkları`),wordsNonRetainRanges:I(b.value,`NonRetain Word Aralıkları`)},n=P(x.value);if(n.length===0)throw Error(`Lütfen en az bir değişken satırı girin.`);let r=n.map((e,t)=>u(e)||null).filter(e=>e!==null);M.textContent=`Girdi değişken sayısı: ${r.length}`;let i=e(t,r);S.value=[`Class,Identifiers,Address,Type,Initial Value,Comment`,...i.plcDefinitions].join(`
`),C.value=i.propertyDefinitions.join(`
`),w.value=i.inlineDefinitions.join(`
`),T.value=i.propertyInitializations.join(`
`),E.value=i.enumDefinitions.join(`,
`),R(i),p(`Tanımlamalar başarıyla oluşturuldu.`)}catch(e){m(e instanceof Error?e.message:`Bilinmeyen bir hata oluştu.`),console.error(e)}});var B=document.querySelector(`#project-drawer`),V=document.querySelector(`#drawer-toggle`),H=document.querySelector(`#drawer-close`),U=document.querySelector(`#drawer-overlay`),W=document.querySelector(`#project-name`),G=document.querySelector(`#save-project`),K=document.querySelector(`#load-project`),q=document.querySelector(`#file-input`),J=null;function Y(e){let t=e===void 0?!B.classList.contains(`drawer-open`):e;B.classList.toggle(`drawer-open`,t),U.classList.toggle(`drawer-open`,t)}async function X(e=!1){let t=W.value.trim();if(!t){m(`Lütfen proje adı girin.`);return}let n={name:t,retainBit:_.value,nonRetainBit:v.value,retainWord:y.value,nonRetainWord:b.value,variables:x.value,timestamp:Date.now()},r=JSON.stringify(n,null,2);if(`showSaveFilePicker`in window&&(!e||!J))try{let e=await window.showSaveFilePicker({suggestedName:`${t.replace(/\s+/g,`_`)}_${Date.now()}.json`,types:[{description:`JSON Files`,accept:{"application/json":[`.json`]}}]}),n=await e.createWritable();await n.write(r),await n.close(),J=e,p(`"${t}" projesi "${e.name}"'e başarıyla kaydedildi.`)}catch(e){e.name!==`AbortError`&&m(`Dosya kaydedilirken hata: ${e.message}`)}else if(e&&J)try{let e=await J.createWritable();await e.write(r),await e.close(),p(`"${t}" projesi başarıyla kaydedildi.`)}catch(e){m(`Dosya kaydedilirken hata: ${e.message}`)}else{let e=new Blob([r],{type:`application/json`}),n=URL.createObjectURL(e),i=document.createElement(`a`);i.href=n,i.download=`${t.replace(/\s+/g,`_`)}_${Date.now()}.json`,document.body.appendChild(i),i.click(),document.body.removeChild(i),URL.revokeObjectURL(n),p(`"${t}" projesi başarıyla indirildi.`)}}function Z(){q.click()}function Q(e){let t=e.target,n=t.files?.[0];if(!n)return;let r=new FileReader;r.onload=e=>{try{let t=e.target?.result,n=JSON.parse(t);_.value=n.retainBit,v.value=n.nonRetainBit,y.value=n.retainWord,b.value=n.nonRetainWord,x.value=n.variables,W.value=n.name,J=null,L(),Y(!1),p(`"${n.name}" projesi başarıyla yüklendi.`)}catch(e){m(`Dosya yüklenirken hata: ${e instanceof Error?e.message:`Dosya okunamadı.`}`)}},r.onerror=()=>{m(`Dosya okunamadı.`)},r.readAsText(n),t.value=``}V.addEventListener(`click`,()=>Y()),H.addEventListener(`click`,()=>Y(!1)),U.addEventListener(`click`,()=>Y(!1)),G.addEventListener(`click`,async()=>{await X(!1)}),K.addEventListener(`click`,Z),q.addEventListener(`change`,Q),document.addEventListener(`keydown`,async e=>{(e.ctrlKey||e.metaKey)&&e.key===`s`&&(e.preventDefault(),await X(!0))});