import{r as i,j as o,F as N,b as t}from"./index.b239cc55.js";import{a as k}from"./apicall.15330b79.js";import{M as S}from"./index.2b87b131.js";import{C as c}from"./index.cd55466f.js";import{B as b}from"./button.1e90f6e6.js";import{I as v}from"./index.4af21018.js";function D({statusModalOpen:r,setStatusModalOpen:l}){var d,f,h;const{TextArea:u}=v,n=()=>{l({open:!1,data:{},orderId:null})},[a,x]=i.exports.useState(!0),[s,p]=i.exports.useState(!0),[m,C]=i.exports.useState(!0),g=async()=>{var y;const e=await k({method:"put",url:"orders/"+r.orderId,data:{status:(y=r==null?void 0:r.data)==null?void 0:y.status,notify_user:a?"1":"0",notify_department:s?"1":"0",notify_vendor:m?"1":"0"}});if(e.status===200){n();return}if(e.status!=200){n();return}};return o(S,{className:"statusModal",open:r.open,onCancel:n,title:"",footer:[],children:[o(N,{children:[o("text",{style:{color:(f=(d=r==null?void 0:r.data)==null?void 0:d.params)==null?void 0:f.color},children:["Status is going to be ",(h=r==null?void 0:r.data)==null?void 0:h.description]}),t("h3",{children:"Reason *"}),t(u,{rows:4}),t("div",{style:{marginTop:"10px"}}),t(c,{checked:a,onChange:()=>x(e=>!e),children:"Notify user"}),t(c,{checked:s,onChange:()=>p(e=>!e),children:"Notify department"}),t(c,{checked:m,onChange:()=>C(e=>!e),children:"Notify vendor"})]}),o("div",{id:"modalButtonFooter",children:[" ",t(b,{type:"primary",onClick:g,children:"Confirm"},"submit")]})]})}export{D as O};
