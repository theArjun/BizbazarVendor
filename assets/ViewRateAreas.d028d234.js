import{r as c,j as n,b as e,X as _,v as N,F as y}from"./index.b239cc55.js";import{a as x}from"./axios.0a901153.js";import{T as g}from"./index.0c91c947.js";import{S}from"./index.3c397a1c.js";import{I}from"./index.4af21018.js";import{T as k}from"./Table.4059dce2.js";import"./index.4bbb7811.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./button.1e90f6e6.js";import"./Compact.d9f155a2.js";import"./LoadingOutlined.97101298.js";import"./pickAttrs.f011bab2.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./statusUtils.ab472cb9.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./SearchOutlined.8331e38c.js";import"./PurePanel.ffcb695e.js";import"./index.2d340b5d.js";import"./TextArea.6c3ac8fe.js";import"./EyeOutlined.a43f77a8.js";import"./styleChecker.98fd75c2.js";import"./css.d6e3059f.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./RightOutlined.47ed9d6c.js";import"./useForceUpdate.5b188f49.js";import"./responsiveObserve.99027935.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./dropdown.989042eb.js";import"./Dropdown.3bbb202b.js";import"./collapse.4a0a3d30.js";import"./useFlexGapSupport.1cb3c05a.js";import"./index.6bb695c7.js";const w="_tabContainer_1gxxe_3",A="_left_1gxxe_15",T="_bgColor_1gxxe_27",H="_button_1gxxe_43",d={tabContainer:w,left:A,bgColor:T,button:H},Y="_container_f7inb_1",L="_topInfo_f7inb_13",P="_body_f7inb_33",E="_sectionContainer_f7inb_41",W="_sectionHeading_f7inb_53",j="_tagCountry_f7inb_67",F="_tagContainer_f7inb_77",G="_deleteTag_f7inb_87",O="_countryInputWrap_f7inb_103",t={container:Y,topInfo:L,body:P,sectionContainer:E,sectionHeading:W,tagCountry:j,tagContainer:F,deleteTag:G,countryInputWrap:O},R=["Apples","Nails","Bananas","Helicopters"];function K(){const[i,r]=c.exports.useState(["Nepal"]),[m,o]=c.exports.useState(["Nepal"]),[s,f]=c.exports.useState(""),[l,p]=c.exports.useState(""),C=R.filter(a=>!i.includes(a));c.exports.useEffect(()=>{v()},[]);const v=async()=>{const a=await x({url:"https://api.instantwebtools.net/v1/passenger?page=0&size=10",method:"get"});console.log(a)};return n("div",{className:t.container,children:[n("div",{className:t.topInfo,children:[e("div",{children:"Name: Kathmandu "}),n("div",{children:["Status: ",e(g,{color:"#87d068",children:"Active"})]})]}),n("div",{className:t.body,children:[n("div",{className:t.sectionContainer,children:[e("div",{className:t.sectionHeading,children:"Country :"}),n("div",{ClassName:t.tagContainer,children:[e("div",{className:t.countryInputWrap,children:e(S,{mode:"multiple",placeholder:"Inserted are removed",value:i,onChange:r,style:{width:"100%"},options:C.map(a=>({value:a,label:a}))})}),s.length>1&&e("button",{style:{marginLeft:"5px"},onClick:()=>{if(s.length>1){r(a=>[...a,s]),f("");return}alert("You are adding imty tag")},children:"Add"})]})]}),n("div",{className:t.sectionContainer,children:[e("div",{className:t.sectionHeading,children:"State :"}),n("div",{ClassName:t.tagContainer,children:[m.map((a,u)=>n(g,{className:t.tagCountry,color:"#87d068",children:[a,e("span",{className:t.deleteTag,onClick:()=>{o(b=>{const h=[...b];return h.splice(u,1),h})},children:"x"})]},u)),e(I,{style:{width:"100px"},value:l,onChange:a=>p(a.target.value)}),l.length>1&&e("button",{style:{marginLeft:"5px"},onClick:()=>{if(l.length>1){o(a=>[...a,l]),p("");return}alert("You are adding imty tag")},children:"Add"})]})]}),n("div",{className:t.sectionContainer,children:[e("div",{className:t.sectionHeading,children:"Zip/Postal codes :"}),n("div",{ClassName:t.leftContain,children:[n("div",{children:[" ","You are able to use wildcards in this field: '?' - any single character;'*' - any number of characters."]}),n("div",{children:["Example: ",e("br",{}),e("b",{children:"98?78"})," (corresponds to 98878, 98378, 98978, etc) 12* (corresponds to 12345, 12876, 12098, etc..)"]})]})]}),n("div",{className:t.sectionContainer,children:[e("div",{className:t.sectionHeading,children:"Cities :"}),e("div",{ClassName:t.leftContain,children:n("div",{children:[" ","You are able to use wildcards in this field: '?' - any single character;'*' - any number of characters."]})})]}),n("div",{className:t.sectionContainer,children:[e("div",{children:"Kathmandu :"}),e("div",{ClassName:t.leftContain,children:n("div",{children:["Example: ",e("br",{})," New Y* (corresponds to New York, New Yark, etc) L?s* (corresponds to Las Vegas, Los Angeles, etc..)"]})})]}),n("div",{className:t.sectionContainer,children:[e("div",{className:t.sectionHeading,children:"Addresses :"}),n("div",{ClassName:t.leftContain,children:[n("div",{children:[" ","You are able to use wildcards in this field: '?' - any single character;'*' - any number of characters."]}),n("div",{children:["Example: ",e("br",{}),"* street (corresponds to 1st Street, 102nd Street, etc)"]})]})]})]})]})}const V=["General","Pickup"];function Ae(){const[i,r]=_.useState("General"),m=()=>{switch(i){case"Pickup":return e(z,{});default:return e(K,{})}};return n("div",{children:[e("div",{className:d.tabContainer,children:e("div",{className:d.left,children:V.map((o,s)=>e("div",{className:N(d.button,i===o?d.bgColor:null),onClick:()=>r(o),children:o},s))})}),m()]})}const z=()=>e(y,{children:e(k,{pagination:!1,dataSource:[],columns:[{title:"Name",dataIndex:"name",key:"name"},{title:"Age",dataIndex:"age",key:"age"},{title:"Address",dataIndex:"address",key:"address"}]})});export{Ae as default};
