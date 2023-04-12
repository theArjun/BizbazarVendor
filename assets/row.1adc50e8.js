import{r as c,y as ae,z as de,d as y,f as u,C as se,_ as w,G,v as oe,b as U,B as le}from"./index.559c1fcf.js";import{u as pe}from"./useFlexGapSupport.39a8fd32.js";import{R as re,r as J}from"./responsiveObserve.0df24820.js";var ve=c.exports.createContext({});const ue=ve;var ge=function(n){var r=n.componentCls;return u({},r,{display:"flex",flexFlow:"row wrap",minWidth:0,"&::before, &::after":{display:"flex"},"&-no-wrap":{flexWrap:"nowrap"},"&-start":{justifyContent:"flex-start"},"&-center":{justifyContent:"center"},"&-end":{justifyContent:"flex-end"},"&-space-between":{justifyContent:"space-between"},"&-space-around ":{justifyContent:"space-around"},"&-top":{alignItems:"flex-start"},"&-middle":{alignItems:"center"},"&-bottom":{alignItems:"flex-end"}})},me=function(n){var r=n.componentCls;return u({},r,{position:"relative",maxWidth:"100%",minHeight:1})},xe=function(n,r){for(var t=n.componentCls,s=n.gridColumns,o={},a=s;a>=0;a--)a===0?(o[""+t+r+"-"+a]={display:"none"},o[t+"-push-"+a]={insetInlineStart:"auto"},o[t+"-pull-"+a]={insetInlineEnd:"auto"},o[""+t+r+"-push-"+a]={insetInlineStart:"auto"},o[""+t+r+"-pull-"+a]={insetInlineEnd:"auto"},o[""+t+r+"-offset-"+a]={marginInlineEnd:0},o[""+t+r+"-order-"+a]={order:0}):(o[""+t+r+"-"+a]={display:"block",flex:"0 0 "+a/s*100+"%",maxWidth:a/s*100+"%"},o[""+t+r+"-push-"+a]={insetInlineStart:a/s*100+"%"},o[""+t+r+"-pull-"+a]={insetInlineEnd:a/s*100+"%"},o[""+t+r+"-offset-"+a]={marginInlineStart:a/s*100+"%"},o[""+t+r+"-order-"+a]={order:a});return o},V=function(n,r){return xe(n,r)},ye=function(n,r,t){return u({},"@media (min-width: "+r+"px)",y({},V(n,t)))},Se=ae("Grid",function(e){return[ge(e)]}),he=ae("Grid",function(e){var n=de(e,{gridColumns:24}),r={"-sm":n.screenSMMin,"-md":n.screenMDMin,"-lg":n.screenLGMin,"-xl":n.screenXLMin,"-xxl":n.screenXXLMin};return[me(n),V(n,""),V(n,"-xs"),Object.keys(r).map(function(t){return ye(n,r[t],t)}).reduce(function(t,s){return y(y({},t),s)},{})]}),Ce=globalThis&&globalThis.__rest||function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)n.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(r[t[s]]=e[t[s]]);return r};function be(e){return typeof e=="number"?e+" "+e+" auto":/^\d+(\.\d+)?(px|em|rem|%)$/.test(e)?"0 0 "+e:e}var we=["xs","sm","md","lg","xl","xxl"],_e=c.exports.forwardRef(function(e,n){var r,t=c.exports.useContext(se),s=t.getPrefixCls,o=t.direction,a=c.exports.useContext(ue),g=a.gutter,S=a.wrap,h=a.supportFlexGap,m=e.prefixCls,_=e.span,I=e.order,O=e.offset,M=e.push,$=e.pull,H=e.className,P=e.children,A=e.flex,X=e.style,N=Ce(e,["prefixCls","span","order","offset","push","pull","className","children","flex","style"]),i=s("col",m),E=he(i),T=w(E,2),F=T[0],L=T[1],C={};we.forEach(function(p){var v,l={},f=e[p];typeof f=="number"?l.span=f:G(f)==="object"&&(l=f||{}),delete N[p],C=y(y({},C),(v={},u(v,i+"-"+p+"-"+l.span,l.span!==void 0),u(v,i+"-"+p+"-order-"+l.order,l.order||l.order===0),u(v,i+"-"+p+"-offset-"+l.offset,l.offset||l.offset===0),u(v,i+"-"+p+"-push-"+l.push,l.push||l.push===0),u(v,i+"-"+p+"-pull-"+l.pull,l.pull||l.pull===0),u(v,i+"-rtl",o==="rtl"),v))});var k=oe(i,(r={},u(r,i+"-"+_,_!==void 0),u(r,i+"-order-"+I,I),u(r,i+"-offset-"+O,O),u(r,i+"-push-"+M,M),u(r,i+"-pull-"+$,$),r),H,C,L),d={};if(g&&g[0]>0){var x=g[0]/2;d.paddingLeft=x,d.paddingRight=x}if(g&&g[1]>0&&!h){var W=g[1]/2;d.paddingTop=W,d.paddingBottom=W}return A&&(d.flex=be(A),S===!1&&!d.minWidth&&(d.minWidth=0)),F(U("div",{...N,style:y(y({},d),X),className:k,ref:n,children:P}))});const Me=_e;var Re=globalThis&&globalThis.__rest||function(e,n){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)n.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(r[t[s]]=e[t[s]]);return r};le("top","middle","bottom","stretch");le("start","end","center","space-around","space-between","space-evenly");function ne(e,n){var r=c.exports.useState(typeof e=="string"?e:""),t=w(r,2),s=t[0],o=t[1],a=function(){if(G(e)==="object")for(var S=0;S<J.length;S++){var h=J[S];if(!!n[h]){var m=e[h];if(m!==void 0){o(m);return}}}};return c.exports.useEffect(function(){a()},[JSON.stringify(e),n]),s}var je=c.exports.forwardRef(function(e,n){var r,t=e.prefixCls,s=e.justify,o=e.align,a=e.className,g=e.style,S=e.children,h=e.gutter,m=h===void 0?0:h,_=e.wrap,I=Re(e,["prefixCls","justify","align","className","style","children","gutter","wrap"]),O=c.exports.useContext(se),M=O.getPrefixCls,$=O.direction,H=c.exports.useState({xs:!0,sm:!0,md:!0,lg:!0,xl:!0,xxl:!0}),P=w(H,2),A=P[0],X=P[1],N=c.exports.useState({xs:!1,sm:!1,md:!1,lg:!1,xl:!1,xxl:!1}),i=w(N,2),E=i[0],T=i[1],F=ne(o,E),L=ne(s,E),C=pe(),k=c.exports.useRef(m);c.exports.useEffect(function(){var ee=re.subscribe(function(j){T(j);var b=k.current||0;(!Array.isArray(b)&&G(b)==="object"||Array.isArray(b)&&(G(b[0])==="object"||G(b[1])==="object"))&&X(j)});return function(){return re.unsubscribe(ee)}},[]);var d=function(){var j=[void 0,void 0],b=Array.isArray(m)?m:[m,void 0];return b.forEach(function(B,te){if(G(B)==="object")for(var K=0;K<J.length;K++){var Q=J[K];if(A[Q]&&B[Q]!==void 0){j[te]=B[Q];break}}else j[te]=B}),j},x=M("row",t),W=Se(x),p=w(W,2),v=p[0],l=p[1],f=d(),ie=oe(x,(r={},u(r,x+"-no-wrap",_===!1),u(r,x+"-"+L,L),u(r,x+"-"+F,F),u(r,x+"-rtl",$==="rtl"),r),a,l),R={},D=f[0]!=null&&f[0]>0?f[0]/-2:void 0,q=f[1]!=null&&f[1]>0?f[1]/-2:void 0;if(D&&(R.marginLeft=D,R.marginRight=D),C){var fe=w(f,2);R.rowGap=fe[1]}else q&&(R.marginTop=q,R.marginBottom=q);var Y=w(f,2),Z=Y[0],z=Y[1],ce=c.exports.useMemo(function(){return{gutter:[Z,z],wrap:_,supportFlexGap:C}},[Z,z,_,C]);return v(U(ue.Provider,{value:ce,children:U("div",{...I,className:ie,style:y(y({},R),g),ref:n,children:S})}))});const $e=je;export{Me as C,$e as R};