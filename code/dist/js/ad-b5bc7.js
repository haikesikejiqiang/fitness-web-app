(()=>{"use strict";var e={722:(e,t,r)=>{r.r(t)}},t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{r(722),document.querySelector(".adtime").onclick=function(){location.href="./login.html"};var e=document.querySelector(".countdown"),t=setInterval((function(){1==e.innerHTML&&(clearInterval(t),location.href="./login.html"),e.innerHTML=e.innerHTML-1}),1e3)})()})();