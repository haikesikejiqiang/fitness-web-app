(()=>{"use strict";var e={996:(e,t,o)=>{o.r(t)},267:(e,t,o)=>{o.r(t)},63:(e,t,o)=>{o.r(t)}},t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={exports:{}};return e[r](n,n.exports,o),n.exports}o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(63),o(996),o(267),document.ready((function(){var e=window.$untils.isLogin();sessionStorage.setItem("userId",e),$untils.sportTab("course"),$untils.footerTab("run"),$http.get("/sports/courseList",{id:e-0},(function(e){if(0===e.status){var t=e.data;console.log(e),console.log(t);var o=t.filter((function(e){return 1===e.latest}));console.log(o),document.querySelector("#newCourse").dataset.cid=o[0].courseId,document.querySelector("#imgurl").src="http://139.9.177.51:8099"+o[0].imgurl,document.querySelector("#name").textContent=o[0].name,document.querySelector("#desc").textContent=o[0].desc;var r=t.filter((function(e){return 0===e.latest})),n="";r.forEach((function(e){n+='\n                <div class="item mt20" data-cid="'+e.courseId+'">\n                <img src="http://139.9.177.51:8099'+e.imgurl+'" alt=""  width="100%" height="140px">\n                <div>\n                    <h4>'+e.name+"</h4>\n                    <p>"+e.desc+"</p>\n                </div>\n                </div>\n                "})),document.querySelector("#normalCourse").innerHTML=n}})),document.querySelector("#newCourse").addEventListener("click",(function(){sessionStorage.setItem("cid",this.dataset.cid),window.location.href="./courseD.html"})),document.querySelector("#normalCourse").addEventListener("click",(function(e){var t=e.target.parentNode;t.className||(t=t.parentNode),sessionStorage.setItem("cid",t.dataset.cid),window.location.href="./courseD.html"}))}))})();