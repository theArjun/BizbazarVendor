import{aU as u,a as l,r as g,b as r}from"./index.2fea9b70.js";import{T as y}from"./Table.7ec01c5e.js";import{I as h}from"./index.b065cf3d.js";import"./motion.cd9ea6a7.js";import"./isEqual.cc883666.js";import"./useMergedState.acd959e8.js";import"./pickAttrs.18ca283f.js";import"./styleChecker.9361c740.js";import"./index.f5b4f9b0.js";import"./css.d6e3059f.js";import"./index.5de7cfda.js";import"./Overflow.1e0ec03a.js";import"./statusUtils.ab87837f.js";import"./CheckOutlined.45292deb.js";import"./DownOutlined.653e5bd2.js";import"./LoadingOutlined.3aeec88a.js";import"./SearchOutlined.3b0489e1.js";import"./PurePanel.7897ccec.js";import"./Compact.c7a1bef5.js";import"./Pagination.75c29296.js";import"./LeftOutlined.67edc2db.js";import"./RightOutlined.19164f95.js";import"./useForceUpdate.997a6267.js";import"./responsiveObserve.6b5848d4.js";import"./index.90d07be9.js";import"./button.8d7ffa1a.js";import"./index.60d0402b.js";import"./index.11d6766c.js";import"./dropdown.0343149c.js";import"./Dropdown.1d3385b2.js";import"./index.de03715e.js";import"./collapse.3b35c5c9.js";import"./useFlexGapSupport.a59bf389.js";import"./index.171e0a82.js";import"./index.d50c1940.js";import"./TextArea.38af062b.js";import"./EyeOutlined.b9911e82.js";import"./index.d768f20b.js";const rt=({loading:o,data:m,handleScroll:i})=>{const a=u(),n=l();g.exports.useEffect(()=>{var t;return(t=document.querySelector("#product > div > div.ant-table-body"))==null||t.addEventListener("scroll",i),()=>{var e;(e=document.querySelector("#product > div > div.ant-table-body"))==null||e.removeEventListener("scroll",i)}},[i]);const d=t=>{const e=new Date(parseInt(t*1e3)),p=e.toLocaleString("en-US",{year:"numeric",month:"short",day:"2-digit"}),c=e.toLocaleString("en-US",{hour:"2-digit",minute:"numeric"});return p+", "+c},s=(t,e)=>t+" "+e;return r("div",{children:r(y,{id:"product",rowKey:"thread_id",loading:o,columns:[{title:"Image",dataIndex:"image",key:"type",render:(t,e)=>r("div",{children:r(h,{width:70,src:t,alt:"No image"})})},{title:"ID",dataIndex:"thread_id",key:"id",render:t=>r("a",{onClick:()=>n(`CustomerMessage/${t}`),children:"#thread "+t})},{title:"Message/Subject",dataIndex:"last_message",key:"message",render:(t,e)=>r("div",{children:t})},{title:"Customer",dataIndex:"customer",key:"customer",render:(t,e)=>s(e==null?void 0:e.firstname,e==null?void 0:e.lastname)},{title:"Date",dataIndex:"created_at",key:"date",render:t=>d(t)}],dataSource:m,pagination:!1,scroll:{y:a.height>670?500:300,x:1e3}})})};export{rt as default};
