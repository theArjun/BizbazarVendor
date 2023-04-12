import{y as oe,z as re,K as X,f,d as x,M as ae,r as p,C as K,_ as N,b as v,v as A,j as ie,O as se,P as le,Q as ce,G as ue,N as fe,W as de,R as pe,T as U}from"./index.559c1fcf.js";import{I as ve,r as me}from"./render.6e9f9fbc.js";import{L as ge}from"./LoadingOutlined.65af6f9d.js";import{N as Ce,u as xe}from"./useNotification.530e6546.js";var ye=function(n){var r,o,t=n.componentCls,a=n.iconCls,s=n.boxShadowSecondary,d=n.colorBgElevated,m=n.colorSuccess,i=n.colorError,c=n.colorWarning,l=n.colorInfo,u=n.fontSizeLG,S=n.motionEaseInOutCirc,y=n.motionDurationSlow,g=n.marginXS,C=n.paddingXS,I=n.borderRadiusLG,O=n.zIndexPopup,R=n.messageNoticeContentPadding,w=new X("MessageMoveIn",{"0%":{padding:0,transform:"translateY(-100%)",opacity:0},"100%":{padding:C,transform:"translateY(0)",opacity:1}}),b=new X("MessageMoveOut",{"0%":{maxHeight:n.height,padding:C,opacity:1},"100%":{maxHeight:0,padding:0,opacity:0}});return[f({},t,x(x({},ae(n)),(r={position:"fixed",top:g,insetInlineStart:0,width:"100%",pointerEvents:"none",zIndex:O},f(r,t+"-move-up",{animationFillMode:"forwards"}),f(r,`
        `+t+`-move-up-appear,
        `+t+`-move-up-enter
      `,{animationName:w,animationDuration:y,animationPlayState:"paused",animationTimingFunction:S}),f(r,`
        `+t+"-move-up-appear"+t+`-move-up-appear-active,
        `+t+"-move-up-enter"+t+`-move-up-enter-active
      `,{animationPlayState:"running"}),f(r,t+"-move-up-leave",{animationName:b,animationDuration:y,animationPlayState:"paused",animationTimingFunction:S}),f(r,t+"-move-up-leave"+t+"-move-up-leave-active",{animationPlayState:"running"}),f(r,"&-rtl",{direction:"rtl",span:{direction:"rtl"}}),r))),f({},t+"-notice",(o={padding:C,textAlign:"center"},f(o,a,{verticalAlign:"text-bottom",marginInlineEnd:g,fontSize:u}),f(o,t+"-notice-content",{display:"inline-block",padding:R,background:d,borderRadius:I,boxShadow:s,pointerEvents:"all"}),f(o,t+"-success "+a,{color:m}),f(o,t+"-error "+a,{color:i}),f(o,t+"-warning "+a,{color:c}),f(o,`
        `+t+"-info "+a+`,
        `+t+"-loading "+a,{color:l}),o)),f({},t+"-notice-pure-panel",{padding:0,textAlign:"start"})]};const W=oe("Message",function(e){var n=re(e,{messageNoticeContentPadding:(e.controlHeightLG-e.fontSize*e.lineHeight)/2+"px "+e.paddingContentVertical+"px"});return[ye(n)]},function(e){return{height:150,zIndexPopup:e.zIndexPopupBase+10}});var he=globalThis&&globalThis.__rest||function(e,n){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,o=Object.getOwnPropertySymbols(e);t<o.length;t++)n.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(r[o[t]]=e[o[t]]);return r},Se={info:v(ve,{}),success:v(se,{}),error:v(le,{}),warning:v(ce,{}),loading:v(ge,{})};function Y(e){var n=e.prefixCls,r=e.type,o=e.icon,t=e.children;return ie("div",{className:A(n+"-custom-content",n+"-"+r),children:[o||Se[r],v("span",{children:t})]})}function be(e){var n=e.prefixCls,r=e.className,o=e.type,t=e.icon,a=e.content,s=he(e,["prefixCls","className","type","icon","content"]),d=p.exports.useContext(K),m=d.getPrefixCls,i=n||m("message"),c=W(i),l=N(c,2),u=l[1];return v(Ce,{...s,prefixCls:i,className:A(r,u,i+"-notice-pure-panel"),eventKey:"pure",duration:null,content:v(Y,{prefixCls:i,type:o,icon:t,children:a})})}function Pe(e,n){return{motionName:n!=null?n:e+"-move-up"}}function D(e){var n,r=new Promise(function(t){n=e(function(){t(!0)})}),o=function(){n==null||n()};return o.then=function(t,a){return r.then(t,a)},o.promise=r,o}var _e=globalThis&&globalThis.__rest||function(e,n){var r={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(r[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,o=Object.getOwnPropertySymbols(e);t<o.length;t++)n.indexOf(o[t])<0&&Object.prototype.propertyIsEnumerable.call(e,o[t])&&(r[o[t]]=e[o[t]]);return r},Ie=8,Oe=3,Ne=p.exports.forwardRef(function(e,n){var r=e.top,o=e.prefixCls,t=e.getContainer,a=e.maxCount,s=e.rtl,d=e.transitionName,m=e.onAllRemoved,i=p.exports.useContext(K),c=i.getPrefixCls,l=i.getPopupContainer,u=o||c("message"),S=W(u),y=N(S,2),g=y[1],C=function(){return{left:"50%",transform:"translateX(-50%)",top:r!=null?r:Ie}},I=function(){return A(g,s?u+"-rtl":"")},O=function(){return Pe(u,d)},R=v("span",{className:u+"-close-x",children:v(fe,{className:u+"-close-icon"})}),w=xe({prefixCls:u,style:C,className:I,motion:O,closable:!1,closeIcon:R,duration:Oe,getContainer:function(){return(t==null?void 0:t())||(l==null?void 0:l())||document.body},maxCount:a,onAllRemoved:m}),b=N(w,2),E=b[0],P=b[1];return p.exports.useImperativeHandle(n,function(){return x(x({},E),{prefixCls:u,hashId:g})}),P}),B=0;function Q(e){var n=p.exports.useRef(null),r=p.exports.useMemo(function(){var o=function(i){var c;(c=n.current)===null||c===void 0||c.close(i)},t=function(i){if(!n.current){var c=function(){};return c.then=function(){},c}var l=n.current,u=l.open,S=l.prefixCls,y=l.hashId,g=S+"-notice",C=i.content,I=i.icon,O=i.type,R=i.key,w=i.className,b=i.onClose,E=_e(i,["content","icon","type","key","className","onClose"]),P=R;return P==null&&(B+=1,P="antd-message-"+B),D(function(_){return u(x(x({},E),{key:P,content:v(Y,{prefixCls:S,type:O,icon:I,children:C}),placement:"top",className:A(O&&g+"-"+O,y,w),onClose:function(){b==null||b(),_()}})),function(){o(P)}})},a=function(i){var c;i!==void 0?o(i):(c=n.current)===null||c===void 0||c.destroy()},s={open:t,destroy:a},d=["info","success","warning","error","loading"];return d.forEach(function(m){var i=function(l,u,S){var y;l&&ue(l)==="object"&&"content"in l?y=l:y={content:l};var g,C;typeof u=="function"?C=u:(g=u,C=S);var I=x(x({onClose:C,duration:g},y),{type:m});return t(I)};s[m]=i}),s},[]);return[r,v(Ne,{...e,ref:n},"holder")]}function Re(e){return Q(e)}var Fe=["success","info","warning","error","loading"],h=null,M=function(n){return n()},T=[],$={};function we(){var e=$,n=e.prefixCls,r=e.getContainer,o=e.rtl,t=e.maxCount,a=e.top,s=n!=null?n:U().getPrefixCls("message"),d=(r==null?void 0:r())||document.body;return{prefixCls:s,container:d,rtl:o,maxCount:t,top:a}}var Me=p.exports.forwardRef(function(e,n){var r=p.exports.useState(),o=N(r,2),t=o[0],a=o[1],s=p.exports.useState(),d=N(s,2),m=d[0],i=d[1],c=p.exports.useState(),l=N(c,2),u=l[0],S=l[1],y=p.exports.useState(),g=N(y,2),C=g[0],I=g[1],O=p.exports.useState(),R=N(O,2),w=R[0],b=R[1],E=Q({prefixCls:t,getContainer:function(){return m},maxCount:u,rtl:C,top:w}),P=N(E,2),_=P[0],j=P[1],H=U(),q=H.getRootPrefixCls(),J=H.getIconPrefixCls(),z=function(){var F=we(),Z=F.prefixCls,k=F.container,ee=F.maxCount,ne=F.rtl,te=F.top;a(Z),i(k),S(ee),I(ne),b(te)};return p.exports.useEffect(z,[]),p.exports.useImperativeHandle(n,function(){var G=x({},_);return Object.keys(G).forEach(function(F){G[F]=function(){return z(),_[F].apply(_,arguments)}}),{instance:G,sync:z}}),v(pe,{prefixCls:q,iconPrefixCls:J,children:j})});function L(){if(!h){var e=document.createDocumentFragment(),n={fragment:e};h=n,M(function(){me(v(Me,{ref:function(o){var t=o||{},a=t.instance,s=t.sync;Promise.resolve().then(function(){!n.instance&&a&&(n.instance=a,n.sync=s,L())})}}),e)});return}!h.instance||(T.forEach(function(r){var o=r.type,t=r.skipped;if(!t)switch(o){case"open":{M(function(){var a=h.instance.open(x(x({},$),r.config));a==null||a.then(r.resolve),r.setCloseFn(a)});break}case"destroy":M(function(){h==null||h.instance.destroy(r.key)});break;default:M(function(){var a,s=(a=h.instance)[o].apply(a,de(r.args));s==null||s.then(r.resolve),r.setCloseFn(s)})}}),T=[])}function Ee(e){$=x(x({},$),e),M(function(){var n;(n=h==null?void 0:h.sync)===null||n===void 0||n.call(h)})}function Ge(e){var n=D(function(r){var o,t={type:"open",config:e,resolve:r,setCloseFn:function(s){o=s}};return T.push(t),function(){o?M(function(){o()}):t.skipped=!0}});return L(),n}function Te(e,n){var r=D(function(o){var t,a={type:e,args:n,resolve:o,setCloseFn:function(d){t=d}};return T.push(a),function(){t?M(function(){t()}):a.skipped=!0}});return L(),r}function $e(e){T.push({type:"destroy",key:e}),L()}var Ae={open:Ge,destroy:$e,config:Ee,useMessage:Re,_InternalPanelDoNotUseOrYouWillBeFired:be},V=Ae;Fe.forEach(function(e){V[e]=function(){for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return Te(e,r)}});const He=V;export{He as m};