import{aB as c,r as a,_ as l}from"./index.b239cc55.js";var d=function(){return c()&&window.document.documentElement},t,u=function(){if(!d())return!1;if(t!==void 0)return t;var e=document.createElement("div");return e.style.display="flex",e.style.flexDirection="column",e.style.rowGap="1px",e.appendChild(document.createElement("div")),e.appendChild(document.createElement("div")),document.body.appendChild(e),t=e.scrollHeight===1,document.body.removeChild(e),t};const s=function(){var n=a.exports.useState(!1),e=l(n,2),r=e[0],o=e[1];return a.exports.useEffect(function(){o(u())},[]),r};export{d as c,s as u};