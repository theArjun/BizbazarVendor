import{r as a,j as m,X as A,b as o,v as G}from"./index.b239cc55.js";import{x as j,y as W,z as k}from"./index.b6374920.js";import{a as I}from"./apicall.15330b79.js";import{B as _}from"./Breadcrumb.d9f90a7e.js";import{B as O}from"./button.1e90f6e6.js";import{m as T}from"./index.257808cf.js";import"./axios.0a901153.js";import"./config.79883511.js";import"./render.1622182d.js";import"./useNotification.49a3f20c.js";import"./dropdown.989042eb.js";import"./RightOutlined.47ed9d6c.js";import"./Dropdown.3bbb202b.js";import"./useMergedState.a28f7e87.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./PurePanel.ffcb695e.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./Compact.d9f155a2.js";import"./useFlexGapSupport.1cb3c05a.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";const $="_tabWrapper_8bw5q_1",z="_tab_8bw5q_1",F="_bgColor_8bw5q_33",J="_container_8bw5q_51",M="_tabcontain_8bw5q_69",V="_breadcumb_8bw5q_75",r={tabWrapper:$,tab:z,bgColor:F,container:J,tabcontain:M,breadcumb:V};function gt(){const[u,w]=a.exports.useState("General"),[b,x]=a.exports.useState([]),[g,y]=a.exports.useState([]),[c,v]=a.exports.useState(""),[N,p]=a.exports.useState(!1),[i,S]=a.exports.useState({zone:"catalog",name:"",detailed_description:"",short_description:"",from_date:0,to_date:0,priority:0,stop_other_rules:"N",status:"A"}),[f,B]=a.exports.useState({set:"all",set_value:1}),D=()=>{switch(u){case"General":return o(k,{image:c,setImage:v,generalData:i,setGeneralData:S});case"Conditions":return o(W,{conditions:g,setConditions:y,conditionValues:f,setConditionValues:B});default:return o(j,{bonuses:b,setBonuses:x})}},P=async()=>{if(i.name){p(!0);const t=new FormData;let e={promo_main_image_data:{0:{pair_id:"",type:"M",object_id:"0",image_alt:""}},file_promo_main_image_icon:{0:"promo_main"},type_promo_main_image_icon:{0:"local"},is_high_res_promo_main_image_icon:{0:"N"}},C=g.reduce((n,l,d)=>(n[d+1]={...l},n),{}),q=b.reduce((n,l,d)=>(n[d]={...l},n),{}),s={promotion_id:0,promotion_data:{...i,from_date:h(i.from_date),to_date:h(i.to_date),bonuses:{...q},conditions:{...f,conditions:{...C}}}};c&&(t.append("file",c),s={...s,...e}),t.append("promotion_data",JSON.stringify(s)),await I({url:"Promotions",method:"post",data:t,headers:{"Content-Type":"multipart/form-data","Access-Control-Allow-Origin":!0}})&&p(!1),p(!1)}else T.error("Name is necessary to create a promotion.")},h=t=>{if(t){let e=t.split("-");return`${e[2]}/${e[1]}/${e[0]}`}};return m(A.Fragment,{children:[m("div",{className:r.breadcumb,children:[m(_,{children:[o(_.Item,{children:"Marketing"}),o(_.Item,{children:o("a",{href:"",children:"Add Catalog Promotion"})})]}),o(O,{loading:N,onClick:P,type:"primary",children:"Create promotion"})]}),m("div",{className:r.container,children:[o("div",{className:r.tabWrapper,children:["General","Conditions","Bonuses"].map((t,e)=>o("div",{className:G(r.tab,t===u?r.bgColor:null),onClick:()=>w(t),children:t},e))}),o("div",{className:r.tabcontain,children:D()})]})]})}export{gt as default};