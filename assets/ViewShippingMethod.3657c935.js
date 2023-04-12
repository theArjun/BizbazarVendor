import{r as n,u as ct,a as mt,ao as lt,b as i,a$ as _t,j as I,v as ut}from"./index.b239cc55.js";import{H as ft,I as gt,J as bt,K as ht,L as St,N as vt}from"./index.b6374920.js";import{b as xt,c as Ct,d as yt,e as Lt,f as jt,g as Nt,h as It,i as Ot}from"./ShippingMethodApi.85fc508a.js";import{B as L}from"./Breadcrumb.d9f90a7e.js";import{B as J}from"./button.1e90f6e6.js";import"./apicall.15330b79.js";import"./axios.0a901153.js";import"./config.79883511.js";import"./render.1622182d.js";import"./useNotification.49a3f20c.js";import"./useInfiniteQuery.esm.0432f70d.js";import"./useQuery.esm.3c1c4f21.js";import"./utils.esm.408cb86b.js";import"./useMutation.esm.61ea1354.js";import"./dropdown.989042eb.js";import"./RightOutlined.47ed9d6c.js";import"./Dropdown.3bbb202b.js";import"./useMergedState.a28f7e87.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./PurePanel.ffcb695e.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./Compact.d9f155a2.js";import"./useFlexGapSupport.1cb3c05a.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";const Gt="_tabContainer_165lm_1",Rt="_left_165lm_13",kt="_bgColor_165lm_25",At="_button_165lm_41",Bt="_breadcrumb_165lm_63",Et="_area_disabled_165lm_79",p={tabContainer:Gt,left:Rt,bgColor:kt,button:At,breadcrumb:Bt,area_disabled:Et},_=["General","Shipping time and rates","Test rate calculation","Additional settings","Storefronts","Suppliers"],{id:Tt}=JSON.parse(localStorage.getItem("userinfo"));function me(){const[a,h]=n.exports.useState({}),[w,Q]=n.exports.useState([]),[U,G]=n.exports.useState([]),[q,F]=n.exports.useState([]),[R,K]=n.exports.useState(!1),[k,A]=n.exports.useState([]),[P,$]=n.exports.useState([]),[B,E]=n.exports.useState({}),[T,M]=n.exports.useState({}),[O,z]=n.exports.useState(""),{id:S}=ct(),W=mt(),X=lt(),[H,Y]=n.exports.useState(_[0]),{data:s,isLoading:Z}=xt(S),{data:u,isLoading:V}=Ct(),{mutate:D,isLoading:tt}=yt(),{data:f}=Lt(),{data:g}=jt(),{data:c,isLoading:et}=Nt(),{data:m,isLoading:st}=It(),{data:l,isLoading:it}=Ot(S);n.exports.useEffect(()=>{c!=null&&c.data&&E(c==null?void 0:c.data)},[c]),n.exports.useEffect(()=>{var e,o;l!=null&&l.data&&G(((o=Object.values(((e=l==null?void 0:l.data)==null?void 0:e.storefronts)||{}))==null?void 0:o.map(r=>({...r,key:r.id})))||{})},[l]),n.exports.useEffect(()=>{m!=null&&m.data&&M(m==null?void 0:m.data)},[m]),n.exports.useEffect(()=>{var e;s!=null&&s.data&&(K(Tt==((e=s==null?void 0:s.data)==null?void 0:e.company_id)),h(s==null?void 0:s.data),rt())},[s]);const at=()=>{var e;return u!=null&&u.data?(e=Object.entries(u==null?void 0:u.data))==null?void 0:e.map((r,b)=>({value:r[0],label:r[1],key:b})):[]},ot=()=>{var e;return f!=null&&f.data?(e=Object.entries(f==null?void 0:f.data))==null?void 0:e.map(r=>({label:r[1],value:r[0]})):[]},nt=()=>g!=null&&g.data?g==null?void 0:g.data:{},rt=()=>{var b,j,v,x,C,y,d;let e=(v=(j=Object.values(((b=s==null?void 0:s.data)==null?void 0:b.rates)||{}))==null?void 0:j.filter((t,N)=>(t==null?void 0:t.status)==="A"))==null?void 0:v.map(t=>({label:t==null?void 0:t.destination,value:t==null?void 0:t.destination_id})),o=((C=Object.values(((x=s==null?void 0:s.data)==null?void 0:x.rates)||{}))==null?void 0:C.filter((t,N)=>(t==null?void 0:t.status)==="A"&&(t==null?void 0:t.rate_id)))||[],r=((d=Object.values(((y=s==null?void 0:s.data)==null?void 0:y.rates)||{}))==null?void 0:d.filter((t,N)=>(t==null?void 0:t.status)==="A"))||[];F(r),A(o),Q(e)},dt=async()=>{var v,x,C,y;var e=new FormData;let o=[...k],r={0:"",...o==null?void 0:o.reduce((d,t,N)=>(d[t==null?void 0:t.destination_id]=t||"",d),{}),delivery_time:{...o==null?void 0:o.reduce((d,t,N)=>(d[t==null?void 0:t.destination_id]=parseInt(t==null?void 0:t.delivery_time)||"",d),{})}},b=O?{shipping_image_data:{0:{pair_id:((v=a==null?void 0:a.icon)==null?void 0:v.pair_id)||"",type:"M",object_id:((x=a==null?void 0:a.icon)==null?void 0:x.object_id)||"",image_alt:((y=(C=a==null?void 0:a.icon)==null?void 0:C.icon)==null?void 0:y.alt)||""}},file_shipping_image_icon:{0:"shipping"},type_shipping_image_icon:{0:"local"},is_high_res_shipping_image_icon:{0:"N"}}:{};const j={shipping_id:S,shipping_data:{...a,rates:{...r}},...b,sender:{...B},recipient:{...T},result_ids:"rates"};e.append("shipping_data",JSON.stringify(j)),e.append("file",O),D(e,{onSuccess:d=>{X.invalidateQueries(["single_shipping_method",S])},onError:d=>{console.log(d.message)}})},pt=()=>{switch(H){case _[1]:return i(vt,{destinations:w,setShippingTimeRates:$,shippingTimeRates:P,haveRate:k,setHaveRate:A,allDestination:q});case _[2]:return i(St,{countries:ot(),states:nt(),sender:B,setSender:E,recipient:T,setRecipient:M});case _[3]:return i(ht,{singleShipment:a,setSingleShipment:h});case _[4]:return i(bt,{storefronts:U,setStorefront:G,singleShipment:a,setSingleShipment:h});case _[5]:return i(gt,{singleShipment:a,setSingleShipment:h});default:return Object.values(a).length?i(ft,{setSingleShipment:h,singleShipment:a,carriers:at(),image:O,setImage:z}):""}};return Z||V||tt||st||et||it?i(_t,{}):I("div",{children:[I("div",{className:p.breadcrumb,children:[I(L,{children:[i(L.Item,{children:"Home"}),i(L.Item,{children:i("a",{href:"",children:"Settings"})}),i(L.Item,{children:i("a",{href:"",children:"Shipping Methods"})}),i(L.Item,{children:S})]}),I("div",{children:[i(J,{className:p.button1,onClick:()=>W(-1),children:"Back"}),i(J,{style:R?{}:{display:"none"},className:p.button1,onClick:()=>dt(),children:"Save"})]})]}),i("div",{className:p.tabContainer,children:i("div",{className:p.left,children:_.map((e,o)=>i("div",{className:ut(p.button,H===e?p.bgColor:null),onClick:()=>Y(e),children:e},o))})}),i("div",{className:R?"":p.area_disabled,children:pt()})]})}export{me as default};
