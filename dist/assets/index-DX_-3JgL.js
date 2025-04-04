(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const d of r)if(d.type==="childList")for(const u of d.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(r){const d={};return r.integrity&&(d.integrity=r.integrity),r.referrerPolicy&&(d.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?d.credentials="include":r.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function o(r){if(r.ep)return;r.ep=!0;const d=a(r);fetch(r.href,d)}})();const R="/logo.png",Y="https://cdn-icons-png.flaticon.com/512/4140/4140051.png",At=["الأحد","الإثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"],P=[{id:1,title:"اللغة العربية",status:"started",startTime:"09:00",endTime:"10:30",remainingMinutes:45,meetingUrl:"https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi"},{id:2,title:"اللغة الإنجليزية",status:"coming-soon",startTime:"11:00",endTime:"12:30",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi"},{id:3,title:"الرياضيات",status:"scheduled",startTime:"13:30",endTime:"15:00",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/invite/60304d3d/1359"},{id:4,title:"العلوم",status:"scheduled",startTime:"15:30",endTime:"17:00",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/invite/60304d3d/1359"},{id:5,title:"التاريخ",status:"scheduled",startTime:"09:00",endTime:"10:30",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/invite/60304d3d/1359"},{id:6,title:"الجغرافيا",status:"scheduled",startTime:"11:00",endTime:"12:30",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/invite/60304d3d/1359"},{id:7,title:"التربية الإسلامية",status:"scheduled",startTime:"13:30",endTime:"15:00",remainingMinutes:0,meetingUrl:"https://live.higheredlab.com/invite/60304d3d/1359"}],lt={USER_SELECTION:"user_selection",PHONE_INPUT:"phone_input",VERIFICATION:"verification",REGISTRATION:"registration",AUTHENTICATED:"authenticated"};let Q=lt.USER_SELECTION,X=null,O={phoneNumber:"",name:"",grade:"",invitationCode:""},tt="",et="login",it=null,nt="class",Nt="day",st=500;const Bt=new Date;let $=Bt.getDay();const _=()=>({currentPage:et,selectedLesson:it,currentSessionView:nt,currentDateSelection:Nt,walletBalance:st,currentDayIndex:$,authState:Q,userType:X,registrationData:O,verificationCode:tt}),x=e=>(Object.values(lt).includes(e)&&(Q=e),Q),pt=e=>(X=e,X),wt=e=>(O={...O,...e},O),Pt=e=>(tt=e,tt),E=()=>lt,A=e=>(et=e,et),_t=e=>(it=e,it),Ft=e=>(nt=e,nt),rt=e=>(st=e,st),Mt=e=>($=($+e+7)%7,$),Lt=e=>{const{currentDayIndex:n}=_();let a=(n+e+7)%7;return At[a]},N=e=>{document.querySelectorAll("#login-page, #schedule-page, #profile-page, #session-page, #balance-page").forEach(o=>{o&&o.classList.add("hidden")});const n=document.getElementById(`${e}-page`);n&&(n.classList.remove("hidden"),window.scrollTo(0,0));const a=document.querySelector(".nav-bar");a&&(e==="login"?a.classList.add("hidden"):a.classList.remove("hidden")),Ut(e)},Ut=e=>{document.querySelectorAll(".nav-item").forEach(n=>{n.getAttribute("data-page")===e?n.classList.add("active"):n.classList.remove("active")})},It=e=>{document.querySelectorAll(".balance-amount").forEach(a=>{a&&(a.textContent=`${e} ريال`)})},qt=e=>setInterval(()=>{const n=e.filter(a=>a.status==="started");n.length>0&&n.forEach(a=>{a.remainingMinutes>0&&a.remainingMinutes--;const o=document.querySelector(".remaining-time");if(o){const r=Math.floor(a.remainingMinutes/60),d=a.remainingMinutes%60;r>0?o.textContent=`${r} ساعة و ${d} دقيقة`:o.textContent=`${d} دقيقة`}})},6e4),Ot=e=>{const n=document.getElementById("class-iframe"),a=document.getElementById("practice-iframe"),o=document.getElementById("show-class"),r=document.getElementById("show-practice");!n||!a||!o||!r||(e==="class"?(n.classList.remove("hidden"),a.classList.add("hidden"),o.classList.add("active"),r.classList.remove("active")):(n.classList.add("hidden"),a.classList.remove("hidden"),o.classList.remove("active"),r.classList.add("active")))},$t=()=>{if(!document.querySelector(".notification-overlay")){const e=document.createElement("div");e.className="notification-overlay",e.innerHTML=`
      <div class="notification-modal">
        <div class="notification-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="notification-icon success">
          <i class="fas fa-check"></i>
        </div>
        <h3 class="notification-title">تمت العملية بنجاح</h3>
        <p class="notification-message">تم تنفيذ العملية المطلوبة بنجاح.</p>
        <button class="notification-btn success">موافق</button>
      </div>
    `,document.body.appendChild(e),e.querySelector(".notification-close").addEventListener("click",()=>{H()}),e.querySelector(".notification-btn").addEventListener("click",()=>{H()}),e.addEventListener("click",n=>{n.target===e&&H()})}},D=(e,n="إشعار",a="success")=>{const o=document.querySelector(".notification-overlay"),r=document.querySelector(".notification-modal"),d=document.querySelector(".notification-icon"),u=d.querySelector("i"),h=document.querySelector(".notification-title"),v=document.querySelector(".notification-message"),g=document.querySelector(".notification-btn");h.textContent=n,v.textContent=e,d.className=`notification-icon ${a}`,g.className=`notification-btn ${a}`,a==="success"?u.className="fas fa-check":a==="info"?u.className="fas fa-info":a==="warning"&&(u.className="fas fa-exclamation-triangle"),o.classList.add("active"),r.classList.add("modal-pulse"),setTimeout(()=>{r.classList.remove("modal-pulse")},2e3),a==="success"&&setTimeout(()=>{H()},4e3)},H=()=>{const e=document.querySelector(".notification-overlay");e&&e.classList.remove("active")},Ht=()=>{if(!document.querySelector(".friend-invitation-modal")){const e=`📢 أصدقائي الأعزاء، لدي لكم هدية مميزة! 🎁🐬

لأنكم غاليين عندي، 🤩 أشارككم عرضًا خاصًا مقدمًا من منصة الدلفين التعليمية!

✨ احصل على خصم خاص [20%] عند التسجيل باستخدام كود الدعوة الخاص بي!
🔹 كود الدعوة: Dolphinc271d
🔹 محبكم: حسن

📌 للاستفادة من العرض، اضغطوا على الرابط وسجلوا الآن:
👉 https://app.learnadolphin.com/login/?ref=Dolphinc271d

🎉 لا تفوتوا الفرصة! تعلموا واستمتعوا معي في منصة الدلفين 🚀💙`,n="https://app.learnadolphin.com/login/?ref=Dolphinc271d",a="Dolphinc271d",o=document.createElement("div");o.className="modal-overlay friend-invitation-modal",o.innerHTML=`
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        
        <div class="modal-header">
          <div class="modal-icon-wrapper">
            <div class="modal-icon">
              <i class="fas fa-gift"></i>
            </div>
          </div>
          <h2 class="modal-title">دعوة صديق</h2>
          <p class="modal-subtitle">شارك رابط الدعوة واحصل على مكافآت حصرية</p>
        </div>
        
        <div class="invite-code-container">
          <div class="invite-code-label">كود الدعوة الخاص بك</div>
          <div class="invite-code">${a}</div>
        </div>
        
        <div class="invitation-link-container">
          <button class="copy-link-btn">
            <i class="fas fa-copy"></i>
            نسخ الرابط
          </button>
          <input type="text" class="invitation-link" value="${n}" readonly />
        </div>
        
        <div class="share-options">
          <div class="share-title">مشاركة سريعة عبر</div>
          <div class="share-buttons">
            <button class="share-option-btn share-whatsapp" aria-label="مشاركة عبر واتساب">
              <i class="fab fa-whatsapp"></i>
            </button>
            
            <button class="share-option-btn share-telegram" aria-label="مشاركة عبر تليجرام">
              <i class="fab fa-telegram-plane"></i>
            </button>
            
            <button class="share-option-btn share-snapchat" aria-label="مشاركة عبر سناب شات">
              <i class="fab fa-snapchat-ghost"></i>
            </button>
            
            <button class="share-option-btn share-email" aria-label="مشاركة عبر البريد الإلكتروني">
              <i class="fas fa-envelope"></i>
            </button>
          </div>
        </div>
      </div>
    `,document.body.appendChild(o),o.querySelector(".modal-close").addEventListener("click",()=>{ht()}),o.addEventListener("click",C=>{C.target===o&&ht()});const d=o.querySelector(".copy-link-btn");d.addEventListener("click",()=>{o.querySelector(".invitation-link").select(),document.execCommand("copy"),d.innerHTML='<i class="fas fa-check"></i> تم النسخ',setTimeout(()=>{d.innerHTML='<i class="fas fa-copy"></i> نسخ الرابط'},2e3)});const u=o.querySelector(".invite-code");u&&u.addEventListener("click",()=>{const C=document.createElement("textarea");C.value=a,document.body.appendChild(C),C.select(),document.execCommand("copy"),document.body.removeChild(C);const L=u.innerHTML;u.innerHTML='<i class="fas fa-check"></i> تم النسخ',setTimeout(()=>{u.innerHTML=L},2e3)}),o.querySelector(".share-whatsapp").addEventListener("click",()=>{const C=encodeURIComponent(e);window.open(`https://wa.me/?text=${C}`,"_blank")}),o.querySelector(".share-telegram").addEventListener("click",()=>{const C=encodeURIComponent(e);window.open(`https://t.me/share/url?url=${n}&text=${C}`,"_blank")});const g=o.querySelector(".share-snapchat");g.addEventListener("click",()=>{const C=encodeURIComponent(e);/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)?(location.href=`snapchat://share?text=${C}`,setTimeout(()=>{navigator.share?navigator.share({title:"دعوة خاصة لمنصة الدلفين التعليمية",text:e,url:n}).catch(j=>{console.log("Error sharing:",j),W(e,g)}):W(e,g)},500)):(window.open("https://www.snapchat.com/scan","_blank"),W(e,g))}),o.querySelector(".share-email").addEventListener("click",()=>{const C=encodeURIComponent("دعوة خاصة لمنصة الدلفين التعليمية"),L=encodeURIComponent(e);window.open(`mailto:?subject=${C}&body=${L}`,"_blank")})}};function W(e,n){const a=document.createElement("textarea");a.value=e,document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),Rt(n,"تم نسخ النص للمشاركة في سناب شات")}function Rt(e,n){const a=document.querySelector(".share-tooltip");a&&a.remove();const o=document.createElement("div");o.className="share-tooltip",o.textContent=n;const r=e.getBoundingClientRect();o.style.top=`${r.top-40}px`,o.style.left=`${r.left+r.width/2}px`,document.body.appendChild(o),setTimeout(()=>{o.classList.add("hide"),setTimeout(()=>{o.remove()},300)},2e3)}const jt=()=>{const e=document.querySelector(".friend-invitation-modal");if(e){e.classList.add("active");const n=e.querySelector(".modal-container");n.classList.add("modal-enter"),setTimeout(()=>{n.classList.remove("modal-enter")},500)}},ht=()=>{const e=document.querySelector(".friend-invitation-modal");if(e){const n=e.querySelector(".modal-container");n.classList.add("modal-exit"),setTimeout(()=>{e.classList.remove("active"),n.classList.remove("modal-exit")},300)}};function Vt(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Et={exports:{}};(function(e){(function(n){e.exports?e.exports=n():window.intlTelInput=n()})(function(n){return function(){for(var a=[["Afghanistan","af","93"],["Albania","al","355"],["Algeria","dz","213"],["American Samoa","as","1",5,["684"]],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1",6,["264"]],["Antigua & Barbuda","ag","1",7,["268"]],["Argentina","ar","54"],["Armenia","am","374"],["Aruba","aw","297"],["Ascension Island","ac","247"],["Australia","au","61",0],["Austria","at","43"],["Azerbaijan","az","994"],["Bahamas","bs","1",8,["242"]],["Bahrain","bh","973"],["Bangladesh","bd","880"],["Barbados","bb","1",9,["246"]],["Belarus","by","375"],["Belgium","be","32"],["Belize","bz","501"],["Benin","bj","229"],["Bermuda","bm","1",10,["441"]],["Bhutan","bt","975"],["Bolivia","bo","591"],["Bosnia & Herzegovina","ba","387"],["Botswana","bw","267"],["Brazil","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1",11,["284"]],["Brunei","bn","673"],["Bulgaria","bg","359"],["Burkina Faso","bf","226"],["Burundi","bi","257"],["Cambodia","kh","855"],["Cameroon","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","263","289","306","343","354","365","367","368","382","387","403","416","418","428","431","437","438","450","584","468","474","506","514","519","548","579","581","584","587","604","613","639","647","672","683","705","709","742","753","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde","cv","238"],["Caribbean Netherlands","bq","599",1,["3","4","7"]],["Cayman Islands","ky","1",12,["345"]],["Central African Republic","cf","236"],["Chad","td","235"],["Chile","cl","56"],["China","cn","86"],["Christmas Island","cx","61",2,["89164"]],["Cocos (Keeling) Islands","cc","61",1,["89162"]],["Colombia","co","57"],["Comoros","km","269"],["Congo - Brazzaville","cg","242"],["Congo - Kinshasa","cd","243"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus","cy","357"],["Czech Republic","cz","420"],["Denmark","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1",13,["767"]],["Dominican Republic","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea","gq","240"],["Eritrea","er","291"],["Estonia","ee","372"],["Eswatini","sz","268"],["Ethiopia","et","251"],["Falkland Islands","fk","500"],["Faroe Islands","fo","298"],["Fiji","fj","679"],["Finland","fi","358",0],["France","fr","33"],["French Guiana","gf","594"],["French Polynesia","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia","ge","995"],["Germany","de","49"],["Ghana","gh","233"],["Gibraltar","gi","350"],["Greece","gr","30"],["Greenland","gl","299"],["Grenada","gd","1",14,["473"]],["Guadeloupe","gp","590",0],["Guam","gu","1",15,["671"]],["Guatemala","gt","502"],["Guernsey","gg","44",1,["1481","7781","7839","7911"]],["Guinea","gn","224"],["Guinea-Bissau","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong","hk","852"],["Hungary","hu","36"],["Iceland","is","354"],["India","in","91"],["Indonesia","id","62"],["Iran","ir","98"],["Iraq","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2,["1624","74576","7524","7924","7624"]],["Israel","il","972"],["Italy","it","39",0],["Jamaica","jm","1",4,["876","658"]],["Japan","jp","81"],["Jersey","je","44",3,["1534","7509","7700","7797","7829","7937"]],["Jordan","jo","962"],["Kazakhstan","kz","7",1,["33","7"]],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait","kw","965"],["Kyrgyzstan","kg","996"],["Laos","la","856"],["Latvia","lv","371"],["Lebanon","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya","ly","218"],["Liechtenstein","li","423"],["Lithuania","lt","370"],["Luxembourg","lu","352"],["Macau","mo","853"],["Madagascar","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania","mr","222"],["Mauritius","mu","230"],["Mayotte","yt","262",1,["269","639"]],["Mexico","mx","52"],["Micronesia","fm","691"],["Moldova","md","373"],["Monaco","mc","377"],["Mongolia","mn","976"],["Montenegro","me","382"],["Montserrat","ms","1",16,["664"]],["Morocco","ma","212",0],["Mozambique","mz","258"],["Myanmar (Burma)","mm","95"],["Namibia","na","264"],["Nauru","nr","674"],["Nepal","np","977"],["Netherlands","nl","31"],["New Caledonia","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea","kp","850"],["North Macedonia","mk","389"],["Northern Mariana Islands","mp","1",17,["670"]],["Norway","no","47",0],["Oman","om","968"],["Pakistan","pk","92"],["Palau","pw","680"],["Palestine","ps","970"],["Panama","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru","pe","51"],["Philippines","ph","63"],["Poland","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar","qa","974"],["Réunion","re","262",0],["Romania","ro","40"],["Russia","ru","7",0],["Rwanda","rw","250"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé & Príncipe","st","239"],["Saudi Arabia","sa","966"],["Senegal","sn","221"],["Serbia","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1",21,["721"]],["Slovakia","sk","421"],["Slovenia","si","386"],["Solomon Islands","sb","677"],["Somalia","so","252"],["South Africa","za","27"],["South Korea","kr","82"],["South Sudan","ss","211"],["Spain","es","34"],["Sri Lanka","lk","94"],["St Barthélemy","bl","590",1],["St Helena","sh","290"],["St Kitts & Nevis","kn","1",18,["869"]],["St Lucia","lc","1",19,["758"]],["St Martin","mf","590",2],["St Pierre & Miquelon","pm","508"],["St Vincent & Grenadines","vc","1",20,["784"]],["Sudan","sd","249"],["Suriname","sr","597"],["Svalbard & Jan Mayen","sj","47",1,["79"]],["Sweden","se","46"],["Switzerland","ch","41"],["Syria","sy","963"],["Taiwan","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad & Tobago","tt","1",22,["868"]],["Tunisia","tn","216"],["Turkey","tr","90"],["Turkmenistan","tm","993"],["Turks & Caicos Islands","tc","1",23,["649"]],["Tuvalu","tv","688"],["Uganda","ug","256"],["Ukraine","ua","380"],["United Arab Emirates","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["US Virgin Islands","vi","1",24,["340"]],["Uzbekistan","uz","998"],["Vanuatu","vu","678"],["Vatican City","va","39",1,["06698"]],["Venezuela","ve","58"],["Vietnam","vn","84"],["Wallis & Futuna","wf","681"],["Western Sahara","eh","212",1,["5288","5289"]],["Yemen","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1,["18"]]],o=0;o<a.length;o++){var r=a[o];a[o]={name:r[0],iso2:r[1],dialCode:r[2],priority:r[3]||0,areaCodes:r[4]||null}}function d(b){for(var l=1;l<arguments.length;l++){var t=arguments[l]!=null?Object(arguments[l]):{},i=Object.keys(t);typeof Object.getOwnPropertySymbols=="function"&&i.push.apply(i,Object.getOwnPropertySymbols(t).filter(function(s){return Object.getOwnPropertyDescriptor(t,s).enumerable})),i.forEach(function(s){u(b,s,t[s])})}return b}function u(b,l,t){return l=I(l),l in b?Object.defineProperty(b,l,{value:t,enumerable:!0,configurable:!0,writable:!0}):b[l]=t,b}function h(b,l){if(!(b instanceof l))throw new TypeError("Cannot call a class as a function")}function v(b,l){for(var t=0;t<l.length;t++){var i=l[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(b,I(i.key),i)}}function g(b,l,t){return l&&v(b.prototype,l),Object.defineProperty(b,"prototype",{writable:!1}),b}function I(b){var l=C(b,"string");return typeof l=="symbol"?l:String(l)}function C(b,l){if(typeof b!="object"||b===null)return b;var t=b[Symbol.toPrimitive];if(t!==n){var i=t.call(b,l||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(l==="string"?String:Number)(b)}var L={getInstance:function(l){var t=l.getAttribute("data-intl-tel-input-id");return window.intlTelInputGlobals.instances[t]},instances:{},documentReady:function(){return document.readyState==="complete"}};typeof window=="object"&&(window.intlTelInputGlobals=L);var j=0,ct={allowDropdown:!0,autoInsertDialCode:!1,autoPlaceholder:"polite",countrySearch:!1,customContainer:"",customPlaceholder:null,dropdownContainer:null,excludeCountries:[],fixDropdownWidth:!1,formatOnDisplay:!0,geoIpLookup:null,hiddenInput:"",initialCountry:"",localizedCountries:null,nationalMode:!0,onlyCountries:[],placeholderNumberType:"MOBILE",preferredCountries:["us","gb"],separateDialCode:!1,showFlags:!0,useFullscreenPopup:typeof navigator<"u"&&typeof window<"u"?/Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||window.innerWidth<=500:!1,utilsScript:""},kt=["800","822","833","844","855","866","877","880","881","882","883","884","885","886","887","888","889"],V=function(l,t){for(var i=Object.keys(l),s=0;s<i.length;s++)t(i[s],l[i[s]])},M=function(l){V(window.intlTelInputGlobals.instances,function(t){window.intlTelInputGlobals.instances[t][l]()})},Dt=function(){function b(l,t){var i=this;h(this,b),this.id=j++,this.telInput=l,this.activeItem=null,this.highlightedItem=null;var s=t||{};this.options={},V(ct,function(c,p){i.options[c]=s.hasOwnProperty(c)?s[c]:p}),this.hadInitialPlaceholder=!!l.getAttribute("placeholder")}return g(b,[{key:"_init",value:function(){var t=this;this.options.useFullscreenPopup&&(this.options.fixDropdownWidth=!1),this.options.countrySearch&&!this.options.useFullscreenPopup&&(this.options.fixDropdownWidth=!0),this.options.nationalMode&&(this.options.autoInsertDialCode=!1),this.options.separateDialCode&&(this.options.autoInsertDialCode=!1);var i=this.options.allowDropdown&&!this.options.separateDialCode;if(!this.options.showFlags&&i&&(this.options.showFlags=!0),this.options.useFullscreenPopup&&!this.options.dropdownContainer&&(this.options.dropdownContainer=document.body),this.isRTL=!!this.telInput.closest("[dir=rtl]"),typeof Promise<"u"){var s=new Promise(function(p,m){t.resolveAutoCountryPromise=p,t.rejectAutoCountryPromise=m}),c=new Promise(function(p,m){t.resolveUtilsScriptPromise=p,t.rejectUtilsScriptPromise=m});this.promise=Promise.all([s,c])}else this.resolveAutoCountryPromise=this.rejectAutoCountryPromise=function(){},this.resolveUtilsScriptPromise=this.rejectUtilsScriptPromise=function(){};this.selectedCountryData={},this._processCountryData(),this._generateMarkup(),this._setInitialState(),this._initListeners(),this._initRequests()}},{key:"_processCountryData",value:function(){this._processAllCountries(),this._processCountryCodes(),this._processPreferredCountries(),this.options.localizedCountries&&this._translateCountriesByLocale(),(this.options.onlyCountries.length||this.options.localizedCountries)&&this.countries.sort(this._countryNameSort)}},{key:"_addCountryCode",value:function(t,i,s){i.length>this.countryCodeMaxLen&&(this.countryCodeMaxLen=i.length),this.countryCodes.hasOwnProperty(i)||(this.countryCodes[i]=[]);for(var c=0;c<this.countryCodes[i].length;c++)if(this.countryCodes[i][c]===t)return;var p=s!==n?s:this.countryCodes[i].length;this.countryCodes[i][p]=t}},{key:"_processAllCountries",value:function(){if(this.options.onlyCountries.length){var t=this.options.onlyCountries.map(function(s){return s.toLowerCase()});this.countries=a.filter(function(s){return t.indexOf(s.iso2)>-1})}else if(this.options.excludeCountries.length){var i=this.options.excludeCountries.map(function(s){return s.toLowerCase()});this.countries=a.filter(function(s){return i.indexOf(s.iso2)===-1})}else this.countries=a}},{key:"_translateCountriesByLocale",value:function(){for(var t=0;t<this.countries.length;t++){var i=this.countries[t].iso2.toLowerCase();this.options.localizedCountries.hasOwnProperty(i)&&(this.countries[t].name=this.options.localizedCountries[i])}}},{key:"_countryNameSort",value:function(t,i){return t.name<i.name?-1:t.name>i.name?1:0}},{key:"_processCountryCodes",value:function(){this.countryCodeMaxLen=0,this.dialCodes={},this.countryCodes={};for(var t=0;t<this.countries.length;t++){var i=this.countries[t];this.dialCodes[i.dialCode]||(this.dialCodes[i.dialCode]=!0),this._addCountryCode(i.iso2,i.dialCode,i.priority)}for(var s=0;s<this.countries.length;s++){var c=this.countries[s];if(c.areaCodes)for(var p=this.countryCodes[c.dialCode][0],m=0;m<c.areaCodes.length;m++){for(var f=c.areaCodes[m],y=1;y<f.length;y++){var w=c.dialCode+f.substr(0,y);this._addCountryCode(p,w),this._addCountryCode(c.iso2,w)}this._addCountryCode(c.iso2,c.dialCode+f)}}}},{key:"_processPreferredCountries",value:function(){this.preferredCountries=[];for(var t=0;t<this.options.preferredCountries.length;t++){var i=this.options.preferredCountries[t].toLowerCase(),s=this._getCountryData(i,!1,!0);s&&this.preferredCountries.push(s)}}},{key:"_createEl",value:function(t,i,s){var c=document.createElement(t);return i&&V(i,function(p,m){return c.setAttribute(p,m)}),s&&s.appendChild(c),c}},{key:"_generateMarkup",value:function(){this.telInput.classList.add("iti__tel-input"),!this.telInput.hasAttribute("autocomplete")&&!(this.telInput.form&&this.telInput.form.hasAttribute("autocomplete"))&&this.telInput.setAttribute("autocomplete","off");var t=this.options,i=t.allowDropdown,s=t.separateDialCode,c=t.showFlags,p=t.customContainer,m=t.hiddenInput,f=t.dropdownContainer,y=t.fixDropdownWidth,w=t.useFullscreenPopup,S=t.countrySearch,T="iti";i&&(T+=" iti--allow-dropdown"),s&&(T+=" iti--separate-dial-code"),c&&(T+=" iti--show-flags"),p&&(T+=" ".concat(p));var k=this._createEl("div",{class:T});this.telInput.parentNode.insertBefore(k,this.telInput);var U=i||c||s;if(U&&(this.flagsContainer=this._createEl("div",{class:"iti__flag-container"},k)),k.appendChild(this.telInput),U&&(this.selectedFlag=this._createEl("div",d({class:"iti__selected-flag"},i&&{role:"combobox","aria-haspopup":"listbox","aria-controls":"iti-".concat(this.id,"__country-listbox"),"aria-expanded":"false","aria-label":"Telephone country code"}),this.flagsContainer)),c&&(this.selectedFlagInner=this._createEl("div",{class:"iti__flag"},this.selectedFlag)),this.selectedFlag&&this.telInput.disabled&&this.selectedFlag.setAttribute("aria-disabled","true"),s&&(this.selectedDialCode=this._createEl("div",{class:"iti__selected-dial-code"},this.selectedFlag)),i){this.telInput.disabled||this.selectedFlag.setAttribute("tabindex","0"),this.dropdownArrow=this._createEl("div",{class:"iti__arrow"},this.selectedFlag);var xt=y?"":"iti--flexible-dropdown-width";if(this.dropdownContent=this._createEl("div",{class:"iti__dropdown-content iti__hide ".concat(xt)}),S&&(this.searchInput=this._createEl("input",{type:"text",class:"iti__search-input",placeholder:"Search"},this.dropdownContent)),this.countryList=this._createEl("ul",{class:"iti__country-list",id:"iti-".concat(this.id,"__country-listbox"),role:"listbox","aria-label":"List of countries"},this.dropdownContent),this.preferredCountries.length&&!S&&(this._appendListItems(this.preferredCountries,"iti__preferred",!0),this._createEl("li",{class:"iti__divider","aria-hidden":"true"},this.countryList)),this._appendListItems(this.countries,"iti__standard"),f){var G="iti iti--container";w&&(G+=" iti--fullscreen-popup"),S&&(G+=" iti--country-search"),this.dropdown=this._createEl("div",{class:G}),this.dropdown.appendChild(this.dropdownContent)}else this.flagsContainer.appendChild(this.dropdownContent)}if(m){var z=m,K=this.telInput.getAttribute("name");if(K){var ut=K.lastIndexOf("[");ut!==-1&&(z="".concat(K.substr(0,ut),"[").concat(z,"]"))}this.hiddenInput=this._createEl("input",{type:"hidden",name:z}),k.appendChild(this.hiddenInput)}}},{key:"_appendListItems",value:function(t,i,s){for(var c=0;c<t.length;c++){var p=t[c],m=s?"-preferred":"",f=this._createEl("li",{id:"iti-".concat(this.id,"__item-").concat(p.iso2).concat(m),class:"iti__country ".concat(i),tabindex:"-1",role:"option","data-dial-code":p.dialCode,"data-country-code":p.iso2,"aria-selected":"false"},this.countryList);p.node=f;var y="";this.options.showFlags&&(y+="<div class='iti__flag-box'><div class='iti__flag iti__".concat(p.iso2,"'></div></div>")),y+="<span class='iti__country-name'>".concat(p.name,"</span>"),y+="<span class='iti__dial-code'>+".concat(p.dialCode,"</span>"),f.insertAdjacentHTML("beforeend",y)}}},{key:"_setInitialState",value:function(){var t=this.telInput.getAttribute("value"),i=this.telInput.value,s=t&&t.charAt(0)==="+"&&(!i||i.charAt(0)!=="+"),c=s?t:i,p=this._getDialCode(c),m=this._isRegionlessNanp(c),f=this.options,y=f.initialCountry,w=f.autoInsertDialCode;if(p&&!m)this._updateFlagFromNumber(c);else if(y!=="auto"){var S=y&&this._getCountryData(y,!1,!0);S?this._setFlag(y.toLowerCase()):p&&m?this._setFlag("us"):(this.defaultCountry=this.preferredCountries.length?this.preferredCountries[0].iso2:this.countries[0].iso2,c||this._setFlag(this.defaultCountry)),!c&&w&&(this.telInput.value="+".concat(this.selectedCountryData.dialCode))}c&&this._updateValFromNumber(c)}},{key:"_initListeners",value:function(){this._initKeyListeners(),this.options.autoInsertDialCode&&this._initBlurListeners(),this.options.allowDropdown&&this._initDropdownListeners(),this.hiddenInput&&this._initHiddenInputListener()}},{key:"_initHiddenInputListener",value:function(){var t=this;this._handleHiddenInputSubmit=function(){t.hiddenInput.value=t.getNumber()},this.telInput.form&&this.telInput.form.addEventListener("submit",this._handleHiddenInputSubmit)}},{key:"_getClosestLabel",value:function(){for(var t=this.telInput;t&&t.tagName!=="LABEL";)t=t.parentNode;return t}},{key:"_initDropdownListeners",value:function(){var t=this;this._handleLabelClick=function(s){t.dropdownContent.classList.contains("iti__hide")?t.telInput.focus():s.preventDefault()};var i=this._getClosestLabel();i&&i.addEventListener("click",this._handleLabelClick),this._handleClickSelectedFlag=function(){t.dropdownContent.classList.contains("iti__hide")&&!t.telInput.disabled&&!t.telInput.readOnly&&t._showDropdown()},this.selectedFlag.addEventListener("click",this._handleClickSelectedFlag),this._handleFlagsContainerKeydown=function(s){var c=t.dropdownContent.classList.contains("iti__hide");c&&["ArrowUp","ArrowDown"," ","Enter"].includes(s.key)&&(s.preventDefault(),s.stopPropagation(),t._showDropdown()),s.key==="Tab"&&t._closeDropdown()},this.flagsContainer.addEventListener("keydown",this._handleFlagsContainerKeydown)}},{key:"_initRequests",value:function(){var t=this;this.options.utilsScript&&!window.intlTelInputUtils?window.intlTelInputGlobals.documentReady()?window.intlTelInputGlobals.loadUtils(this.options.utilsScript):window.addEventListener("load",function(){window.intlTelInputGlobals.loadUtils(t.options.utilsScript)}):this.resolveUtilsScriptPromise(),this.options.initialCountry==="auto"?this._loadAutoCountry():this.resolveAutoCountryPromise()}},{key:"_loadAutoCountry",value:function(){window.intlTelInputGlobals.autoCountry?this.handleAutoCountry():window.intlTelInputGlobals.startedLoadingAutoCountry||(window.intlTelInputGlobals.startedLoadingAutoCountry=!0,typeof this.options.geoIpLookup=="function"&&this.options.geoIpLookup(function(t){window.intlTelInputGlobals.autoCountry=t.toLowerCase(),setTimeout(function(){return M("handleAutoCountry")})},function(){return M("rejectAutoCountryPromise")}))}},{key:"_initKeyListeners",value:function(){var t=this;this._handleKeyupEvent=function(){t._updateFlagFromNumber(t.telInput.value)&&t._triggerCountryChange()},this.telInput.addEventListener("keyup",this._handleKeyupEvent),this._handleClipboardEvent=function(){setTimeout(t._handleKeyupEvent)},this.telInput.addEventListener("cut",this._handleClipboardEvent),this.telInput.addEventListener("paste",this._handleClipboardEvent)}},{key:"_cap",value:function(t){var i=this.telInput.getAttribute("maxlength");return i&&t.length>i?t.substr(0,i):t}},{key:"_initBlurListeners",value:function(){var t=this;this._handleSubmitOrBlurEvent=function(){t._removeEmptyDialCode()},this.telInput.form&&this.telInput.form.addEventListener("submit",this._handleSubmitOrBlurEvent),this.telInput.addEventListener("blur",this._handleSubmitOrBlurEvent)}},{key:"_removeEmptyDialCode",value:function(){if(this.telInput.value.charAt(0)==="+"){var t=this._getNumeric(this.telInput.value);(!t||this.selectedCountryData.dialCode===t)&&(this.telInput.value="")}}},{key:"_getNumeric",value:function(t){return t.replace(/\D/g,"")}},{key:"_trigger",value:function(t){var i=document.createEvent("Event");i.initEvent(t,!0,!0),this.telInput.dispatchEvent(i)}},{key:"_showDropdown",value:function(){this.options.fixDropdownWidth&&(this.dropdownContent.style.width="".concat(this.telInput.offsetWidth,"px")),this.dropdownContent.classList.remove("iti__hide"),this.selectedFlag.setAttribute("aria-expanded","true"),this._setDropdownPosition(),this.options.countrySearch?(this._highlightListItem(this.countryList.firstElementChild,!1),this.searchInput.focus()):this.activeItem&&(this._highlightListItem(this.activeItem,!1),this._scrollTo(this.activeItem,!0)),this._bindDropdownListeners(),this.dropdownArrow.classList.add("iti__arrow--up"),this._trigger("open:countrydropdown")}},{key:"_toggleClass",value:function(t,i,s){s&&!t.classList.contains(i)?t.classList.add(i):!s&&t.classList.contains(i)&&t.classList.remove(i)}},{key:"_setDropdownPosition",value:function(){var t=this;if(this.options.dropdownContainer&&this.options.dropdownContainer.appendChild(this.dropdown),!this.options.useFullscreenPopup){var i=this.telInput.getBoundingClientRect(),s=window.pageYOffset||document.documentElement.scrollTop,c=i.top+s,p=this.dropdownContent.offsetHeight,m=c+this.telInput.offsetHeight+p<s+window.innerHeight,f=c-p>s,y=!this.options.countrySearch&&!m&&f;if(this._toggleClass(this.dropdownContent,"iti__dropdown-content--dropup",y),this.options.dropdownContainer){var w=y?0:this.telInput.offsetHeight;this.dropdown.style.top="".concat(c+w,"px"),this.dropdown.style.left="".concat(i.left+document.body.scrollLeft,"px"),this._handleWindowScroll=function(){return t._closeDropdown()},window.addEventListener("scroll",this._handleWindowScroll)}}}},{key:"_getClosestListItem",value:function(t){for(var i=t;i&&i!==this.countryList&&!i.classList.contains("iti__country");)i=i.parentNode;return i===this.countryList?null:i}},{key:"_bindDropdownListeners",value:function(){var t=this;this._handleMouseoverCountryList=function(f){var y=t._getClosestListItem(f.target);y&&t._highlightListItem(y,!1)},this.countryList.addEventListener("mouseover",this._handleMouseoverCountryList),this._handleClickCountryList=function(f){var y=t._getClosestListItem(f.target);y&&t._selectListItem(y)},this.countryList.addEventListener("click",this._handleClickCountryList);var i=!0;this._handleClickOffToClose=function(){i||t._closeDropdown(),i=!1},document.documentElement.addEventListener("click",this._handleClickOffToClose);var s="",c=null;if(this._handleKeydownOnDropdown=function(f){["ArrowUp","ArrowDown","Enter","Escape"].includes(f.key)&&(f.preventDefault(),f.stopPropagation(),f.key==="ArrowUp"||f.key==="ArrowDown"?t._handleUpDownKey(f.key):f.key==="Enter"?t._handleEnterKey():f.key==="Escape"&&t._closeDropdown()),!t.options.countrySearch&&/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(f.key)&&(f.stopPropagation(),c&&clearTimeout(c),s+=f.key.toLowerCase(),t._searchForCountry(s),c=setTimeout(function(){s=""},1e3))},document.addEventListener("keydown",this._handleKeydownOnDropdown),this.options.countrySearch){var p=function(){var y=t.searchInput.value.trim();y?t._filterCountries(y.toLowerCase()):t._filterCountries(null,!0)},m=null;this._handleSearchChange=function(){m&&clearTimeout(m),m=setTimeout(function(){p(),m=null},100)},this.searchInput.addEventListener("input",this._handleSearchChange),this.searchInput.addEventListener("click",function(f){return f.stopPropagation()})}}},{key:"_filterCountries",value:function(t){var i=arguments.length>1&&arguments[1]!==n?arguments[1]:!1,s=!0;this.countryList.innerHTML="";for(var c=0;c<this.countries.length;c++){var p=this.countries[c],m=p.name.toLowerCase(),f="+".concat(p.dialCode);(i||m.includes(t)||f.includes(t))&&(this.countryList.appendChild(p.node),s&&(this._highlightListItem(p.node,!1),s=!1))}}},{key:"_handleUpDownKey",value:function(t){var i=t==="ArrowUp"?this.highlightedItem.previousElementSibling:this.highlightedItem.nextElementSibling;if(i?i.classList.contains("iti__divider")&&(i=t==="ArrowUp"?i.previousElementSibling:i.nextElementSibling):this.countryList.childElementCount>1&&(i=t==="ArrowUp"?this.countryList.lastElementChild:this.countryList.firstElementChild),i){var s=!this.options.countrySearch;this._highlightListItem(i,s),this.options.countrySearch&&this._scrollTo(i,!1)}}},{key:"_handleEnterKey",value:function(){this.highlightedItem&&this._selectListItem(this.highlightedItem)}},{key:"_searchForCountry",value:function(t){for(var i=0;i<this.countries.length;i++)if(this._startsWith(this.countries[i].name,t)){var s=this.countries[i].node;this._highlightListItem(s,!1),this._scrollTo(s,!0);break}}},{key:"_startsWith",value:function(t,i){return t.substr(0,i.length).toLowerCase()===i}},{key:"_updateValFromNumber",value:function(t){var i=t;if(this.options.formatOnDisplay&&window.intlTelInputUtils&&this.selectedCountryData){var s=this.options.nationalMode||i.charAt(0)!=="+"&&!this.options.separateDialCode,c=intlTelInputUtils.numberFormat,p=c.NATIONAL,m=c.INTERNATIONAL,f=s?p:m;i=intlTelInputUtils.formatNumber(i,this.selectedCountryData.iso2,f)}i=this._beforeSetNumber(i),this.telInput.value=i}},{key:"_updateFlagFromNumber",value:function(t){var i=t.indexOf("+"),s=i?t.substring(i):t,c=this.selectedCountryData.dialCode,p=c==="1";s&&p&&s.charAt(0)!=="+"&&(s.charAt(0)!=="1"&&(s="1".concat(s)),s="+".concat(s)),this.options.separateDialCode&&c&&s.charAt(0)!=="+"&&(s="+".concat(c).concat(s));var m=this._getDialCode(s,!0),f=this._getNumeric(s),y=null;if(m){var w=this.countryCodes[this._getNumeric(m)],S=w.indexOf(this.selectedCountryData.iso2)!==-1&&f.length<=m.length-1,T=c==="1"&&this._isRegionlessNanp(f);if(!T&&!S){for(var k=0;k<w.length;k++)if(w[k]){y=w[k];break}}}else s.charAt(0)==="+"&&f.length?y="":(!s||s==="+")&&(y=this.defaultCountry);return y!==null?this._setFlag(y):!1}},{key:"_isRegionlessNanp",value:function(t){var i=this._getNumeric(t);if(i.charAt(0)==="1"){var s=i.substr(1,3);return kt.indexOf(s)!==-1}return!1}},{key:"_highlightListItem",value:function(t,i){var s=this.highlightedItem;s&&s.classList.remove("iti__highlight"),this.highlightedItem=t,this.highlightedItem.classList.add("iti__highlight"),this.selectedFlag.setAttribute("aria-activedescendant",t.getAttribute("id")),i&&this.highlightedItem.focus()}},{key:"_getCountryData",value:function(t,i,s){for(var c=i?a:this.countries,p=0;p<c.length;p++)if(c[p].iso2===t)return c[p];if(s)return null;throw new Error("No country data for '".concat(t,"'"))}},{key:"_setFlag",value:function(t){var i=this.options,s=i.allowDropdown,c=i.separateDialCode,p=i.showFlags,m=this.selectedCountryData.iso2?this.selectedCountryData:{};if(this.selectedCountryData=t?this._getCountryData(t,!1,!1):{},this.selectedCountryData.iso2&&(this.defaultCountry=this.selectedCountryData.iso2),p&&this.selectedFlagInner.setAttribute("class","iti__flag iti__".concat(t)),this._setSelectedCountryFlagTitleAttribute(t,c),c){var f=this.selectedCountryData.dialCode?"+".concat(this.selectedCountryData.dialCode):"";this.selectedDialCode.innerHTML=f;var y=this.selectedFlag.offsetWidth||this._getHiddenSelectedFlagWidth();this.isRTL?this.telInput.style.paddingRight="".concat(y+6,"px"):this.telInput.style.paddingLeft="".concat(y+6,"px")}if(this._updatePlaceholder(),s){var w=this.activeItem;if(w&&(w.classList.remove("iti__active"),w.setAttribute("aria-selected","false")),t){var S=this.countryList.querySelector("#iti-".concat(this.id,"__item-").concat(t,"-preferred"))||this.countryList.querySelector("#iti-".concat(this.id,"__item-").concat(t));S.setAttribute("aria-selected","true"),S.classList.add("iti__active"),this.activeItem=S}}return m.iso2!==t}},{key:"_setSelectedCountryFlagTitleAttribute",value:function(t,i){if(this.selectedFlag){var s;t&&!i?s="".concat(this.selectedCountryData.name,": +").concat(this.selectedCountryData.dialCode):t?s=this.selectedCountryData.name:s="Unknown",this.selectedFlag.setAttribute("title",s)}}},{key:"_getHiddenSelectedFlagWidth",value:function(){var t=this.telInput.parentNode.cloneNode();t.style.visibility="hidden",document.body.appendChild(t);var i=this.flagsContainer.cloneNode();t.appendChild(i);var s=this.selectedFlag.cloneNode(!0);i.appendChild(s);var c=s.offsetWidth;return t.parentNode.removeChild(t),c}},{key:"_updatePlaceholder",value:function(){var t=this.options.autoPlaceholder==="aggressive"||!this.hadInitialPlaceholder&&this.options.autoPlaceholder==="polite";if(window.intlTelInputUtils&&t){var i=intlTelInputUtils.numberType[this.options.placeholderNumberType],s=this.selectedCountryData.iso2?intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2,this.options.nationalMode,i):"";s=this._beforeSetNumber(s),typeof this.options.customPlaceholder=="function"&&(s=this.options.customPlaceholder(s,this.selectedCountryData)),this.telInput.setAttribute("placeholder",s)}}},{key:"_selectListItem",value:function(t){var i=this._setFlag(t.getAttribute("data-country-code"));this._closeDropdown(),this._updateDialCode(t.getAttribute("data-dial-code")),this.telInput.focus();var s=this.telInput.value.length;this.telInput.setSelectionRange(s,s),i&&this._triggerCountryChange()}},{key:"_closeDropdown",value:function(){this.dropdownContent.classList.add("iti__hide"),this.selectedFlag.setAttribute("aria-expanded","false"),this.selectedFlag.removeAttribute("aria-activedescendant"),this.dropdownArrow.classList.remove("iti__arrow--up"),document.removeEventListener("keydown",this._handleKeydownOnDropdown),this.options.countrySearch&&this.searchInput.removeEventListener("input",this._handleSearchChange),document.documentElement.removeEventListener("click",this._handleClickOffToClose),this.countryList.removeEventListener("mouseover",this._handleMouseoverCountryList),this.countryList.removeEventListener("click",this._handleClickCountryList),this.options.dropdownContainer&&(this.options.useFullscreenPopup||window.removeEventListener("scroll",this._handleWindowScroll),this.dropdown.parentNode&&this.dropdown.parentNode.removeChild(this.dropdown)),this._trigger("close:countrydropdown")}},{key:"_scrollTo",value:function(t,i){var s=this.dropdownContent,c=window.pageYOffset||document.documentElement.scrollTop,p=s.offsetHeight,m=s.getBoundingClientRect().top+c,f=m+p,y=t.offsetHeight,w=t.getBoundingClientRect().top+c,S=w+y,T=w-m+s.scrollTop,k=p/2-y/2;if(w<m)i&&(T-=k),s.scrollTop=T;else if(S>f){i&&(T+=k);var U=p-y;s.scrollTop=T-U}}},{key:"_updateDialCode",value:function(t){var i=this.telInput.value,s="+".concat(t),c;if(i.charAt(0)==="+"){var p=this._getDialCode(i);p?c=i.replace(p,s):c=s,this.telInput.value=c}else this.options.autoInsertDialCode&&(i?c=s+i:c=s,this.telInput.value=c)}},{key:"_getDialCode",value:function(t,i){var s="";if(t.charAt(0)==="+")for(var c="",p=0;p<t.length;p++){var m=t.charAt(p);if(!isNaN(parseInt(m,10))){if(c+=m,i)this.countryCodes[c]&&(s=t.substr(0,p+1));else if(this.dialCodes[c]){s=t.substr(0,p+1);break}if(c.length===this.countryCodeMaxLen)break}}return s}},{key:"_getFullNumber",value:function(){var t=this.telInput.value.trim(),i=this.selectedCountryData.dialCode,s,c=this._getNumeric(t);return this.options.separateDialCode&&t.charAt(0)!=="+"&&i&&c?s="+".concat(i):s="",s+t}},{key:"_beforeSetNumber",value:function(t){var i=t;if(this.options.separateDialCode){var s=this._getDialCode(i);if(s){s="+".concat(this.selectedCountryData.dialCode);var c=i[s.length]===" "||i[s.length]==="-"?s.length+1:s.length;i=i.substr(c)}}return this._cap(i)}},{key:"_triggerCountryChange",value:function(){this._trigger("countrychange")}},{key:"handleAutoCountry",value:function(){this.options.initialCountry==="auto"&&(this.defaultCountry=window.intlTelInputGlobals.autoCountry,this.telInput.value||this.setCountry(this.defaultCountry),this.resolveAutoCountryPromise())}},{key:"handleUtils",value:function(){window.intlTelInputUtils&&(this.telInput.value&&this._updateValFromNumber(this.telInput.value),this._updatePlaceholder()),this.resolveUtilsScriptPromise()}},{key:"destroy",value:function(){var t=this.telInput.form;if(this.options.allowDropdown){this._closeDropdown(),this.selectedFlag.removeEventListener("click",this._handleClickSelectedFlag),this.flagsContainer.removeEventListener("keydown",this._handleFlagsContainerKeydown);var i=this._getClosestLabel();i&&i.removeEventListener("click",this._handleLabelClick)}this.hiddenInput&&t&&t.removeEventListener("submit",this._handleHiddenInputSubmit),this.options.autoInsertDialCode&&(t&&t.removeEventListener("submit",this._handleSubmitOrBlurEvent),this.telInput.removeEventListener("blur",this._handleSubmitOrBlurEvent)),this.telInput.removeEventListener("keyup",this._handleKeyupEvent),this.telInput.removeEventListener("cut",this._handleClipboardEvent),this.telInput.removeEventListener("paste",this._handleClipboardEvent),this.telInput.removeAttribute("data-intl-tel-input-id");var s=this.telInput.parentNode;s.parentNode.insertBefore(this.telInput,s),s.parentNode.removeChild(s),delete window.intlTelInputGlobals.instances[this.id]}},{key:"getExtension",value:function(){return window.intlTelInputUtils?intlTelInputUtils.getExtension(this._getFullNumber(),this.selectedCountryData.iso2):""}},{key:"getNumber",value:function(t){if(window.intlTelInputUtils){var i=this.selectedCountryData.iso2;return intlTelInputUtils.formatNumber(this._getFullNumber(),i,t)}return""}},{key:"getNumberType",value:function(){return window.intlTelInputUtils?intlTelInputUtils.getNumberType(this._getFullNumber(),this.selectedCountryData.iso2):-99}},{key:"getSelectedCountryData",value:function(){return this.selectedCountryData}},{key:"getValidationError",value:function(){if(window.intlTelInputUtils){var t=this.selectedCountryData.iso2;return intlTelInputUtils.getValidationError(this._getFullNumber(),t)}return-99}},{key:"isValidNumber",value:function(){var t=this._getFullNumber().trim();return window.intlTelInputUtils?intlTelInputUtils.isValidNumber(t,this.selectedCountryData.iso2):null}},{key:"isPossibleNumber",value:function(){var t=this._getFullNumber().trim();return window.intlTelInputUtils?intlTelInputUtils.isPossibleNumber(t,this.selectedCountryData.iso2):null}},{key:"setCountry",value:function(t){var i=t.toLowerCase();this.selectedCountryData.iso2!==i&&(this._setFlag(i),this._updateDialCode(this.selectedCountryData.dialCode),this._triggerCountryChange())}},{key:"setNumber",value:function(t){var i=this._updateFlagFromNumber(t);this._updateValFromNumber(t),i&&this._triggerCountryChange()}},{key:"setPlaceholderNumberType",value:function(t){this.options.placeholderNumberType=t,this._updatePlaceholder()}}]),b}();L.getCountryData=function(){return a};var dt=function(l,t,i){var s=document.createElement("script");s.onload=function(){M("handleUtils"),t&&t()},s.onerror=function(){M("rejectUtilsScriptPromise"),i&&i()},s.className="iti-load-utils",s.async=!0,s.src=l,document.body.appendChild(s)};return L.loadUtils=function(b){if(!window.intlTelInputUtils&&!window.intlTelInputGlobals.startedLoadingUtilsScript){if(window.intlTelInputGlobals.startedLoadingUtilsScript=!0,typeof Promise<"u")return new Promise(function(l,t){return dt(b,l,t)});dt(b)}return null},L.defaults=ct,L.version="18.5.3",function(b,l){var t=new Dt(b,l);return t._init(),b.setAttribute("data-intl-tel-input-id",t.id),window.intlTelInputGlobals.instances[t.id]=t,t}}()})})(Et);var Gt=Et.exports,zt=Gt;const Kt=Vt(zt);let q=null;const at=()=>{const{authState:e}=_(),n=E();switch(e){case n.USER_SELECTION:return vt();case n.PHONE_INPUT:return Wt();case n.VERIFICATION:return Jt();case n.REGISTRATION:return Zt();default:return vt()}},vt=()=>`
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${R}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <h1 class="login-title">  هلا بيك  </h1>
      
      <div class="user-type-container">
        <div class="user-type-option" id="new-user">
          <div class="user-type-icon">
            <img src="${Y}" alt="مستخدم جديد" />
            <div class="user-badge new">جديد</div>
          </div>
          <h3>أنا جديد هنا</h3>
          <p>(سوف تحتاج إلى رقم هاتفك)</p>
        </div>
        
        <div class="user-type-option" id="existing-user">
          <div class="user-type-icon">
            <img src="${Y}" alt="مستخدم حالي" />
          </div>
          <h3>أنا أمتلك حساب</h3>
          <p>(أنت بحاجة إلى تسجيل الدخول)</p>
        </div>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `,Wt=()=>{const{userType:e}=_();return`
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${R}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-user-selection">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">${e==="new"?"إنشاء حساب جديد":"تسجيل الدخول"}</h1>
      
      <div class="phone-input-container">
        <label class="phone-input-label">أدخل رقم جوالك</label>
        <div class="custom-phone-wrapper">
          <input type="tel" class="phone-input" dir="ltr" />
        </div>
        <p class="phone-hint">سيتم إرسال رمز التحقق إلى هذا الرقم</p>
        
        <button id="continue-button" class="login-button">متابعة</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `},Jt=()=>{const{registrationData:e}=_();return`
    <div id="login-page" class="login-page">
      <div class="login-top">
        <div class="logo-container">
          <img src="${R}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-phone">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">التحقق من رقم الجوال</h1>
      <p class="verify-subtitle">تم إرسال رمز التحقق إلى الرقم</p>
      <p class="verify-phone">${e.phoneNumber}</p>
      
      <div class="verification-container">
        <div class="verification-code-inputs">
          <input type="number" maxlength="1" class="code-input" data-index="0" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="1" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="2" pattern="[0-9]*" inputmode="numeric" />
          <input type="number" maxlength="1" class="code-input" data-index="3" pattern="[0-9]*" inputmode="numeric" />
        </div>
        
        <p class="resend-code">
          لم يصلك الرمز؟ <a href="#" id="resend-code-btn">إعادة إرسال</a>
          <span class="countdown" id="resend-countdown"></span>
        </p>
        
        <button id="verify-button" class="login-button" disabled>تحقق</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `},Zt=()=>`
    <div id="login-page" class="login-page registration-form">
      <div class="login-top">
        <div class="logo-container">
          <img src="${R}" alt="شعار التطبيق" />
        </div>
      </div>
      
      <div class="login-back-button" id="back-to-verification">
        <i class="fas fa-arrow-right"></i>
      </div>
      
      <h1 class="login-title">إكمال التسجيل</h1>
      
      <div class="registration-container">
        <div class="form-group">
          <label class="form-label">الاسم الكامل</label>
          <input type="text" id="reg-name" class="form-input" placeholder="اكتب اسمك الكامل" />
        </div>
        
        <div class="form-group">
          <label class="form-label">الصف الدراسي</label>
          <select id="reg-grade" class="form-input">
            <option value="" disabled selected>اختر الصف الدراسي</option>
            <option value="الصف الأول الابتدائي">الصف الأول الابتدائي</option>
            <option value="الصف الثاني الابتدائي">الصف الثاني الابتدائي</option>
            <option value="الصف الثالث الابتدائي">الصف الثالث الابتدائي</option>
            <option value="الصف الرابع الابتدائي">الصف الرابع الابتدائي</option>
            <option value="الصف الخامس الابتدائي">الصف الخامس الابتدائي</option>
            <option value="الصف السادس الابتدائي">الصف السادس الابتدائي</option>
            <option value="الصف الأول المتوسط">الصف الأول المتوسط</option>
            <option value="الصف الثاني المتوسط">الصف الثاني المتوسط</option>
            <option value="الصف الثالث المتوسط">الصف الثالث المتوسط</option>
          </select>
        </div>
        
        <div class="form-group">
          <label class="form-label">الرمز السري (6 أرقام)</label>
          <div class="pin-code-container">
            <input type="number" maxlength="1" class="pin-input" data-index="0" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="1" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="2" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="3" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="4" pattern="[0-9]*" inputmode="numeric" />
            <input type="number" maxlength="1" class="pin-input" data-index="5" pattern="[0-9]*" inputmode="numeric" />
          </div>
          <p class="pin-hint">ستحتاج إلى هذا الرمز عند تسجيل الدخول</p>
        </div>
        
        <div class="form-group">
          <label class="form-label">كود الدعوة أو الخصم (اختياري)</label>
          <input type="text" id="reg-code" class="form-input" placeholder="أدخل كود الدعوة أو الخصم إن وجد" />
        </div>
        
        <div id="coupon-info" class="coupon-info hidden">
          <div class="coupon-details">
            <i class="fas fa-tag"></i>
            <div class="coupon-text">
              <h4 id="coupon-title">كود خصم صحيح</h4>
              <p id="coupon-description">تم إضافة <span id="coupon-amount">100</span> ريال إلى المحفظة</p>
            </div>
          </div>
        </div>
        
        <button id="complete-registration" class="login-button">إكمال التسجيل</button>
      </div>
      
      <div class="bg-circles">
        <div class="circle circle1"></div>
        <div class="circle circle2"></div>
      </div>
    </div>
  `,ot=()=>{const{authState:e}=_(),n=E();switch(e){case n.USER_SELECTION:Yt();break;case n.PHONE_INPUT:Qt();break;case n.VERIFICATION:Xt();break;case n.REGISTRATION:te();break}},Yt=()=>{const e=document.getElementById("new-user"),n=document.getElementById("existing-user");e&&e.addEventListener("click",()=>{pt("new"),x(E().PHONE_INPUT),B()}),n&&n.addEventListener("click",()=>{pt("existing"),x(E().PHONE_INPUT),B()})},Qt=()=>{const e=document.querySelector(".phone-input");e&&(q=Kt(e,{preferredCountries:["sa","ae","kw","bh","qa","om"],initialCountry:"sa",utilsScript:"https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/18.3.5/js/utils.js",formatOnDisplay:!0,separateDialCode:!0,customContainer:"custom-phone-container",dropdownContainer:document.body}),setTimeout(()=>{const o=document.querySelector(".iti__flag-container");o&&(o.style.left="0",o.style.right="auto");const r=document.querySelector(".iti__selected-flag");r&&(r.style.paddingLeft="16px",r.style.paddingRight="8px")},100));const n=document.getElementById("back-to-user-selection");n&&n.addEventListener("click",()=>{x(E().USER_SELECTION),B()});const a=document.getElementById("continue-button");a&&a.addEventListener("click",()=>{if(e&&q){const o=q.getNumber();q.isValidNumber()?(wt({phoneNumber:o}),x(E().VERIFICATION),B()):D("يرجى إدخال رقم هاتف صحيح","خطأ في الإدخال","warning")}})},Xt=()=>{const e=document.getElementById("back-to-phone");e&&e.addEventListener("click",()=>{x(E().PHONE_INPUT),B()});const n=document.querySelectorAll(".code-input");n.forEach((d,u)=>{u===0&&setTimeout(()=>d.focus(),100),d.addEventListener("beforeinput",h=>{if(h.data&&!/^\d+$/.test(h.data)&&h.preventDefault(),h.data&&d.value.length>=1){h.preventDefault();const v=parseInt(d.getAttribute("data-index"))+1,g=document.querySelector(`.code-input[data-index="${v}"]`);g&&g.value.length<1&&(g.value=h.data,g.focus(),F())}}),d.addEventListener("input",h=>{if(d.value.length>1&&(d.value=d.value.substring(0,1)),d.value.length===1){const v=parseInt(d.getAttribute("data-index"))+1,g=document.querySelector(`.code-input[data-index="${v}"]`);g&&g.focus()}F()}),d.addEventListener("keydown",h=>{if(h.key==="Backspace")if(d.value.length===0){const v=parseInt(d.getAttribute("data-index"))-1,g=document.querySelector(`.code-input[data-index="${v}"]`);g&&g.focus()}else setTimeout(()=>{d.value.length===0&&F()},10)}),d.addEventListener("paste",h=>{h.preventDefault();const g=(h.clipboardData||window.clipboardData).getData("text").trim().replace(/\D/g,"");if(g.length>0){n.forEach((C,L)=>{L<g.length&&L<4?C.value=g[L]:L<4&&(C.value="")});const I=Math.min(g.length,4)-1;if(I>=0&&I<4){n[I].focus();const C=n[I];if(C.value.length>0){const L=C.value;C.value="",C.value=L}I===3?n[3].focus():g.length<4&&n[I+1].focus()}F()}})});const a=document.querySelector(".verification-container");a&&a.addEventListener("paste",d=>{d.preventDefault();const h=(d.clipboardData||window.clipboardData).getData("text").trim().replace(/\D/g,"");h.length>0&&(n.forEach((v,g)=>{g<h.length&&g<4?v.value=h[g]:g<4&&(v.value="")}),h.length>=4?n[3].focus():n[h.length-1].focus(),F())});const o=document.getElementById("verify-button");o&&o.addEventListener("click",()=>{const d=Array.from(n).map(h=>h.value).join("");Pt(d);const{userType:u}=_();u==="new"?x(E().REGISTRATION):(x(E().AUTHENTICATED),A("schedule")),B()});const r=document.getElementById("resend-code-btn");r&&r.addEventListener("click",d=>{d.preventDefault(),ft(),D("تم إعادة إرسال رمز التحقق","إرسال الرمز","info")}),ft()},te=()=>{const e=document.getElementById("back-to-verification");e&&e.addEventListener("click",()=>{x(E().VERIFICATION),B()});const n=document.querySelectorAll(".pin-input");n.forEach((r,d)=>{d===0&&setTimeout(()=>r.focus(),100),r.addEventListener("beforeinput",u=>{if(u.data&&!/^\d+$/.test(u.data)&&u.preventDefault(),u.data&&r.value.length>=1){u.preventDefault();const h=parseInt(r.getAttribute("data-index"))+1,v=document.querySelector(`.pin-input[data-index="${h}"]`);v&&v.value.length<1&&(v.value=u.data,v.focus())}}),r.addEventListener("input",u=>{if(r.value.length>1&&(r.value=r.value.substring(0,1)),r.value.length===1){const h=parseInt(r.getAttribute("data-index"))+1,v=document.querySelector(`.pin-input[data-index="${h}"]`);v&&v.focus()}}),r.addEventListener("keydown",u=>{if(u.key==="Backspace"&&r.value.length===0){const h=parseInt(r.getAttribute("data-index"))-1,v=document.querySelector(`.pin-input[data-index="${h}"]`);v&&v.focus()}}),r.addEventListener("paste",u=>{u.preventDefault();const v=(u.clipboardData||window.clipboardData).getData("text").trim().replace(/\D/g,"");v.length>0&&(n.forEach((g,I)=>{I<v.length&&I<6?g.value=v[I]:I<6&&(g.value="")}),v.length>=6?n[5].focus():n[v.length-1].focus())})});const a=document.getElementById("reg-code");a&&(a.addEventListener("input",()=>{const r=a.value.trim();mt(r)}),a.addEventListener("blur",()=>{const r=a.value.trim();r&&mt(r)}));const o=document.getElementById("complete-registration");o&&o.addEventListener("click",()=>{const r=document.getElementById("reg-name"),d=document.getElementById("reg-grade"),u=document.getElementById("reg-code"),v=Array.from(n).map(g=>g.value).join("");if(!r.value.trim()){D("يرجى إدخال الاسم الكامل","خطأ في الإدخال","warning");return}if(!d.value){D("يرجى اختيار الصف الدراسي","خطأ في الإدخال","warning");return}if(!v||v.length!==6){D("يرجى إدخال رمز سري مكون من 6 أرقام","خطأ في الإدخال","warning");return}if(wt({name:r.value.trim(),grade:d.value,pin:v,invitationCode:u.value.trim()}),u.value.trim().toUpperCase()==="DOLPHIN2025"){const{walletBalance:g}=_();rt(g+100)}x(E().AUTHENTICATED),A("schedule"),B(),D("تم تسجيل حسابك بنجاح","تم التسجيل","success")})},F=()=>{const e=document.querySelectorAll(".code-input"),n=document.getElementById("verify-button");if(n){const a=Array.from(e).every(o=>o.value.length>0);n.disabled=!a}},ft=()=>{const e=document.getElementById("resend-countdown"),n=document.getElementById("resend-code-btn");if(e&&n){let a=30;n.style.display="none",e.textContent=`(${a} ثانية)`,e.style.display="inline";const o=setInterval(()=>{a--,e.textContent=`(${a} ثانية)`,a<=0&&(clearInterval(o),e.style.display="none",n.style.display="inline")},1e3)}},mt=e=>{const n=document.getElementById("coupon-info"),a=document.getElementById("coupon-title"),o=document.getElementById("coupon-amount");n&&(e.toUpperCase()==="DOLPHIN2025"?(n.classList.remove("hidden"),a.textContent="كود خصم صحيح",o.textContent="100"):e&&e.startsWith("Dolphin")&&e.length>8?(n.classList.remove("hidden"),a.textContent="كود دعوة صحيح",o.textContent="50"):n.classList.add("hidden"))},B=()=>{const{authState:e}=_(),n=E(),a=document.querySelector("#app");if(e!==n.AUTHENTICATED)a.innerHTML=at(),ot();else{const o=new CustomEvent("authStateChanged",{detail:{authenticated:!0}});document.dispatchEvent(o)}},ee=()=>`
    <div id="schedule-page" class="schedule-page hidden">
      <div class="header">
        <div class="schedule-title">الجدول الدراسي</div>
        <div class="user-info">
          <img src="${Y}" alt="صورة المستخدم" class="user-avatar" />
          <div class="user-name">احمد الاحمدي</div>
        </div>
      </div>
      
      <div class="date-nav">
        <div class="date-selector-new">
          <button class="date-arrow date-prev">
            <i class="fas fa-chevron-right"></i>
          </button>
          <div class="date-text">${Lt(0)}</div>
          <button class="date-arrow date-next">
            <i class="fas fa-chevron-left"></i>
          </button>
        </div>
      </div>
      
      <div class="lessons-list">
        ${ie()}
      </div>
    </div>
  `,ie=()=>P.map(e=>{const n=e.status==="started"?"بدأت":e.status==="coming-soon"?"ستبدأ قريبا":"مجدولة",a=`${e.startTime} - ${e.endTime}`,o=e.status==="started"?`<div class="remaining-time-container">
        <i class="fas fa-clock"></i>
        <span class="remaining-time">${Math.floor(e.remainingMinutes/60)} ساعة و ${e.remainingMinutes%60} دقيقة</span>
      </div>`:"";return`
      <div class="lesson-item ${e.status}" data-lesson-id="${e.id}">
        <div class="lesson-info">
          <div class="lesson-title-container">
            <div class="lesson-title">${e.title}</div>
            <div class="lesson-time">${a}</div>
            ${o}
          </div>
        </div>
        <div class="lesson-status">${n}</div>
        <div class="play-button" data-lesson-id="${e.id}">
          <i class="fas fa-play"></i>
        </div>
      </div>
    `}).join(""),ne=()=>{const e=document.querySelector(".date-prev");e&&e.addEventListener("click",()=>gt(-1));const n=document.querySelector(".date-next");n&&n.addEventListener("click",()=>gt(1)),document.querySelectorAll(".lesson-item").forEach(a=>{a.addEventListener("click",o=>{o.target.closest(".play-button")||se(parseInt(a.getAttribute("data-lesson-id")))})}),document.querySelectorAll(".play-button").forEach(a=>{a.addEventListener("click",o=>{o.stopPropagation(),ae(parseInt(a.getAttribute("data-lesson-id")))})})},gt=e=>{Mt(e);const n=document.querySelector(".date-text");n&&(n.textContent=Lt(0))},se=e=>{const n=P.find(a=>a.id===e);n&&n.status==="started"&&(_t(n),A("session"),N("session"))},ae=e=>{const n=P.find(a=>a.id===e);n&&n.status==="started"?(_t(n),A("session"),N("session")):D("هذه الجلسة غير متاحة حالياً","تنبيه","warning")},oe=()=>{const{walletBalance:e}=_();return`
    <div id="profile-page" class="profile-page hidden">
      <div class="profile-header">
        <div class="profile-title">الملف الشخصي</div>
        <button class="back-to-home-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <div class="student-profile-container">
        <div class="student-avatar-wrapper">
          <img src="https://cdn-icons-png.flaticon.com/512/4140/4140051.png" alt="صورة الطالب" class="student-avatar" />
          <div class="avatar-edit-btn">
            <i class="fas fa-camera"></i>
          </div>
        </div>
        <h2 class="student-name">أحمد الأحمدي</h2>
        <div class="student-grade">الصف الثالث المتوسط</div>
      </div>
      
      <div class="form-group">
        <label class="form-label">الاسم</label>
        <input type="text" class="form-input" value="احمد الاحمدي" />
      </div>
      
      <div class="form-group">
        <label class="form-label">رقم الجوال</label>
        <div class="custom-phone-input">
          <input type="tel" class="form-input phone-input" value="+966591998000" dir="ltr" />
          <div class="country-flag">
            <img src="https://flagcdn.com/w40/sa.png" alt="SA" />
          </div>
        </div>
      </div>
      
      <div class="form-group">
        <label class="form-label">نوع الباقة</label>
        <input type="text" class="form-input" value="باقة التميز الدراسي" />
      </div>

      <div class="wallet-section">
        <div class="wallet-header">
          <h2>المحفظة</h2>
          <div class="wallet-balance">
            <span>الرصيد الحالي:</span>
            <span class="balance-amount">${e} ريال</span>
          </div>
        </div>
        <div class="wallet-actions">
          <button class="wallet-action-btn add-balance-btn">
            <i class="fas fa-ticket-alt"></i>
            إدخال كود خصم
          </button>
          <button class="wallet-action-btn view-balance-btn">
            <i class="fas fa-wallet"></i>
            تفاصيل الرصيد
          </button>
        </div>
      </div>

      <div class="invite-friend-section">
        <button class="invite-friend-btn">
          <i class="fas fa-user-plus"></i>
          دعوة صديق
        </button>
        <p class="invite-note">احصل على 50 ريال عند انضمام صديق باستخدام رابط الدعوة الخاص بك</p>
      </div>
      
      <button class="logout-btn">
        <i class="fas fa-sign-out-alt"></i>
        تسجيل الخروج
      </button>
    </div>
  `},le=()=>{const e=document.querySelector(".back-to-home-btn");e&&e.addEventListener("click",re);const n=document.querySelector(".add-balance-btn");n&&n.addEventListener("click",ce);const a=document.querySelector(".view-balance-btn");a&&a.addEventListener("click",de);const o=document.querySelector(".invite-friend-btn");o&&o.addEventListener("click",ue);const r=document.querySelector(".avatar-edit-btn");r&&r.addEventListener("click",pe);const d=document.querySelector(".logout-btn");d&&d.addEventListener("click",he)},re=()=>{A("schedule"),N("schedule")},ce=()=>{const{walletBalance:e}=_();ve(e)},de=()=>{A("balance"),N("balance")},ue=()=>{jt()},pe=()=>{D("سيتم إتاحة تغيير الصورة الشخصية قريباً","قريباً","info")},he=()=>{document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay logout-confirm-modal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>تسجيل الخروج</h3>
        </div>
        <div class="modal-body">
          <p>هل أنت متأكد من رغبتك في تسجيل الخروج؟</p>
        </div>
        <div class="modal-actions">
          <button class="cancel-logout-btn">إلغاء</button>
          <button class="confirm-logout-btn">تأكيد</button>
        </div>
      </div>
    </div>
  `);const n=document.querySelector(".logout-confirm-modal");if(n){n.classList.add("active");const a=n.querySelector(".cancel-logout-btn");a&&a.addEventListener("click",()=>{n.classList.remove("active"),setTimeout(()=>n.remove(),300)});const o=n.querySelector(".confirm-logout-btn");o&&o.addEventListener("click",()=>{x(E().USER_SELECTION),A("login"),n.classList.remove("active"),setTimeout(()=>{n.remove(),N("login"),D("تم تسجيل الخروج بنجاح","تسجيل الخروج","success")},300)})}},ve=e=>{document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay payment-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        <div class="coupon-modal-content">
          <h3>إدخال كود خصم</h3>
          
          <div class="coupon-form">
            <div class="form-group">
              <label>أدخل كود الخصم:</label>
              <input type="text" id="coupon-code" placeholder="مثال: DOLPHIN2025" />
            </div>
            
            <div id="coupon-status" class="coupon-status hidden">
              <div class="coupon-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="coupon-message">
                كود صحيح! سيتم إضافة <span id="coupon-amount">100</span> ريال إلى رصيدك.
              </div>
            </div>
          </div>
          
          <button class="confirm-coupon-btn disabled">تأكيد الكود</button>
        </div>
      </div>
    </div>
  `),setTimeout(()=>{const a=document.querySelector(".payment-modal");if(a){a.classList.add("active");const o=a.querySelector(".modal-container");o.classList.add("modal-enter"),setTimeout(()=>{o.classList.remove("modal-enter")},500),fe(e)}},10)},fe=e=>{const n=document.querySelector(".payment-modal");if(!n)return;const a=n.querySelector(".modal-close");a&&a.addEventListener("click",J),n.addEventListener("click",h=>{h.target===n&&J()});const o=document.getElementById("coupon-code"),r=document.getElementById("coupon-status"),d=document.getElementById("coupon-amount"),u=n.querySelector(".confirm-coupon-btn");o&&o.addEventListener("input",()=>{const h=o.value.trim().toUpperCase();h?h==="DOLPHIN2025"?(r&&r.classList.remove("hidden"),d&&(d.textContent="100"),u&&u.classList.remove("disabled")):h==="STUDENT50"?(r&&r.classList.remove("hidden"),d&&(d.textContent="50"),u&&u.classList.remove("disabled")):h==="WELCOME200"?(r&&r.classList.remove("hidden"),d&&(d.textContent="200"),u&&u.classList.remove("disabled")):(r&&r.classList.add("hidden"),u&&u.classList.add("disabled")):(r&&r.classList.add("hidden"),u&&u.classList.add("disabled"))}),u&&u.addEventListener("click",()=>{if(u.classList.contains("disabled"))return;const h=o.value.trim().toUpperCase();let v=0;if(h==="DOLPHIN2025"?v=100:h==="STUDENT50"?v=50:h==="WELCOME200"&&(v=200),v>0){const g=e+v;rt(g),It(g),D(`تم إضافة ${v} ريال إلى رصيدك بنجاح`,"تم إضافة الرصيد","success"),J()}})},J=()=>{const e=document.querySelector(".payment-modal");e&&(e.querySelector(".modal-container").classList.add("modal-exit"),setTimeout(()=>{e.classList.remove("active"),setTimeout(()=>{e.remove()},100)},300))},me=()=>{const{selectedLesson:e,currentSessionView:n}=_();let a=e;return a||(a=P.find(o=>o.status==="started")||P[0]),`
    <div id="session-page" class="session-page hidden">
      <div class="session-header">
        <button class="back-button" id="back-to-schedule">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للجدول</span>
        </button>
        <h1>${a?a.title:"الحصة الدراسية"}</h1>
        
        <div class="session-buttons-container">
          <button class="session-button ${n==="class"?"active":""}" id="show-class">الحصة</button>
          <button class="session-button ${n==="practice"?"active":""}" id="show-practice">تدريب</button>
        </div>
      </div>
      
      <div class="session-content">
        <iframe 
          src="${a?a.meetingUrl:"https://live.higheredlab.com/api/v1/60304d3d/join/1359?viewer_name=ahmed_alahmadi"}" 
          class="session-iframe ${n==="class"?"":"hidden"}"
          id="class-iframe"
          allow="camera *;microphone *;display-capture *;" 
          allowfullscreen>
        </iframe>
        
        <iframe 
          src="https://kahoot.it/?pin=77662298&refer_method=link" 
          class="session-iframe ${n==="practice"?"":"hidden"}"
          id="practice-iframe"
          allow="camera *;microphone *;" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `},ge=()=>{const e=document.getElementById("back-to-schedule");e&&e.addEventListener("click",ye);const n=document.getElementById("show-class");n&&n.addEventListener("click",()=>yt("class"));const a=document.getElementById("show-practice");a&&a.addEventListener("click",()=>yt("practice"))},ye=()=>{A("schedule"),N("schedule")},yt=e=>{Ft(e);const{currentSessionView:n}=_();Ot(n)},St=()=>{const{walletBalance:e}=_(),n=[{id:1,date:"2023-12-15",amount:100,type:"deposit",description:"إضافة كوبون خصم"},{id:2,date:"2023-12-10",amount:-50,type:"withdrawal",description:"رسوم الاشتراك الشهري"},{id:3,date:"2023-11-28",amount:50,type:"deposit",description:"مكافأة دعوة صديق"},{id:4,date:"2023-11-20",amount:200,type:"deposit",description:"إضافة كوبون خصم"},{id:5,date:"2023-11-15",amount:-50,type:"withdrawal",description:"رسوم الاشتراك الشهري"},{id:6,date:"2023-11-01",amount:500,type:"deposit",description:"إضافة كوبون خصم أولي"}],a=n.filter(r=>r.type==="deposit").reduce((r,d)=>r+d.amount,0),o=n.filter(r=>r.type==="withdrawal").reduce((r,d)=>r+Math.abs(d.amount),0);return`
    <div id="balance-page" class="balance-page hidden">
      <div class="balance-header">
        <div class="balance-title">تفاصيل الرصيد</div>
        <button class="back-to-home-btn">
          <i class="fas fa-arrow-right"></i>
          <span>العودة للرئيسية</span>
        </button>
      </div>
      
      <div class="balance-summary-card">
        <div class="balance-summary-header">
          <h2>رصيد المحفظة</h2>
          <div class="balance-summary-amount">${e} ريال</div>
        </div>
        
        <div class="balance-actions">
          <button class="balance-action-btn coupon-btn">
            <i class="fas fa-ticket-alt"></i>
            إضافة كوبون خصم
          </button>
        </div>
      </div>
      
      <div class="balance-statistics">
        <div class="stat-card income">
          <div class="stat-icon">
            <i class="fas fa-arrow-down"></i>
          </div>
          <div class="stat-details">
            <div class="stat-title">الرصيد المضاف</div>
            <div class="stat-value">${a} ريال</div>
          </div>
        </div>
        
        <div class="stat-card expenses">
          <div class="stat-icon">
            <i class="fas fa-arrow-up"></i>
          </div>
          <div class="stat-details">
            <div class="stat-title">الرصيد المصروف</div>
            <div class="stat-value">${o} ريال</div>
          </div>
        </div>
      </div>
      
      <div class="transactions-section">
        <h3 class="section-title">سجل المعاملات</h3>
        
        <div class="transactions-list">
          ${n.map(r=>{const d=r.type==="deposit",u=d?"transaction-amount deposit":"transaction-amount withdrawal",h=d?"+":"",v=new Date(r.date).toLocaleDateString("ar-SA",{year:"numeric",month:"long",day:"numeric"});return`
              <div class="transaction-item">
                <div class="transaction-icon ${r.type}">
                  <i class="fas fa-${d?"arrow-down":"arrow-up"}"></i>
                </div>
                <div class="transaction-details">
                  <div class="transaction-title">${r.description}</div>
                  <div class="transaction-date">${v}</div>
                </div>
                <div class="${u}">${h}${Math.abs(r.amount)} ريال</div>
              </div>
            `}).join("")}
        </div>
      </div>
    </div>
  `},Tt=()=>{const e=document.querySelector(".balance-page .back-to-home-btn");e&&e.addEventListener("click",be);const n=document.querySelector(".balance-page .coupon-btn");n&&n.addEventListener("click",Ce)},be=()=>{A("profile"),N("profile")},Ce=()=>{we()},we=()=>{const e=document.querySelector(".payment-modal");e&&e.remove(),document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay payment-modal">
      <div class="modal-container">
        <div class="modal-close">
          <i class="fas fa-times"></i>
        </div>
        
    <div class="coupon-modal-content">
      <h3>إضافة كوبون خصم</h3>
      
      <div class="coupon-form">
        <div class="form-group">
          <label>أدخل كود الكوبون:</label>
          <input type="text" id="coupon-code" placeholder="مثال: DOLPHIN2025" />
        </div>
        
        <div id="coupon-status" class="coupon-status hidden">
          <div class="coupon-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <div class="coupon-message">
            كوبون صحيح! سيتم إضافة <span id="coupon-amount">100</span> ريال إلى رصيدك.
          </div>
        </div>
      </div>
      
      <button class="confirm-coupon-btn disabled">تأكيد الكوبون</button>
    </div>
  
      </div>
    </div>
  `),setTimeout(()=>{const a=document.querySelector(".payment-modal");if(a){a.classList.add("active");const o=a.querySelector(".modal-container");o.classList.add("modal-enter"),setTimeout(()=>{o.classList.remove("modal-enter")},500),_e()}},10)},_e=()=>{const e=document.querySelector(".payment-modal");if(!e)return;const n=e.querySelector(".modal-close");n&&n.addEventListener("click",Z),e.addEventListener("click",u=>{u.target===e&&Z()});const a=document.getElementById("coupon-code"),o=document.getElementById("coupon-status"),r=document.getElementById("coupon-amount"),d=e.querySelector(".confirm-coupon-btn");a&&a.addEventListener("input",()=>{const u=a.value.trim().toUpperCase();u?u==="DOLPHIN2025"?(o&&o.classList.remove("hidden"),r&&(r.textContent="100"),d&&d.classList.remove("disabled")):u==="STUDENT50"?(o&&o.classList.remove("hidden"),r&&(r.textContent="50"),d&&d.classList.remove("disabled")):u==="WELCOME200"?(o&&o.classList.remove("hidden"),r&&(r.textContent="200"),d&&d.classList.remove("disabled")):(o&&o.classList.add("hidden"),d&&d.classList.add("disabled")):(o&&o.classList.add("hidden"),d&&d.classList.add("disabled"))}),d&&d.addEventListener("click",()=>{if(d.classList.contains("disabled"))return;const u=a.value.trim().toUpperCase();let h=0;u==="DOLPHIN2025"?h=100:u==="STUDENT50"?h=50:u==="WELCOME200"&&(h=200),h>0&&(Le(u,h),Z())})},Z=()=>{const e=document.querySelector(".payment-modal");e&&(e.querySelector(".modal-container").classList.add("modal-exit"),setTimeout(()=>{e.classList.remove("active"),setTimeout(()=>{e.remove()},100)},300))},Le=(e,n)=>{const{walletBalance:a}=_(),o=a+n;rt(o),It(o),D(`تم إضافة ${n} ريال إلى رصيدك بنجاح من كوبون ${e}`,"تفعيل الكوبون","success");const r=document.getElementById("balance-page");r&&(r.innerHTML=St().replace('<div id="balance-page" class="balance-page hidden">','<div id="balance-page" class="balance-page">'),Tt())},Ie=()=>{const{currentPage:e}=_();return`
    <div class="nav-bar ${e==="login"?"hidden":""}">
      <div class="nav-item ${e==="schedule"?"active":""}" data-page="schedule">
        <i class="fas fa-home"></i>
        <span>الرئيسية</span>
      </div>
      <div class="nav-item ${e==="profile"?"active":""}" data-page="profile">
        <i class="fas fa-user"></i>
        <span>الصفحة الشخصية</span>
      </div>
    </div>
  `},Ee=()=>{document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",Se)})},Se=e=>{const n=e.currentTarget,a=n.getAttribute("data-page");(a==="schedule"||a==="profile")&&(A(a),N(a)),document.querySelectorAll(".nav-item").forEach(o=>{o.classList.remove("active")}),n.classList.add("active")},bt=()=>{const e=document.querySelector("#app"),{authState:n}=_(),a=E();if(n!==a.AUTHENTICATED){e.innerHTML=at();const o=document.createElement("div");o.className="nav-bar hidden",e.appendChild(o)}else{e.innerHTML=`
      ${at()}
      <div class="content-container">
        ${ee()}
        ${oe()}
        ${me()}
        ${St()}
      </div>
      ${Ie()}
    `;const{currentPage:o}=_();N(o)}},Ct=()=>{const{authState:e}=_(),n=E();e!==n.AUTHENTICATED?ot():(ot(),ne(),le(),ge(),Tt(),Ee())},Te=()=>{bt(),setTimeout(()=>{Ct(),qt(P)},100),$t(),Ht(),document.addEventListener("authStateChanged",e=>{e.detail.authenticated&&(bt(),Ct())})};document.addEventListener("DOMContentLoaded",Te);
