import{r as d,aU as f,b as e}from"./index.2fea9b70.js";import{T as b}from"./Table.7ec01c5e.js";import{T as y}from"./index.e276c020.js";import"./motion.cd9ea6a7.js";import"./isEqual.cc883666.js";import"./useMergedState.acd959e8.js";import"./pickAttrs.18ca283f.js";import"./styleChecker.9361c740.js";import"./index.f5b4f9b0.js";import"./css.d6e3059f.js";import"./index.5de7cfda.js";import"./Overflow.1e0ec03a.js";import"./statusUtils.ab87837f.js";import"./CheckOutlined.45292deb.js";import"./DownOutlined.653e5bd2.js";import"./LoadingOutlined.3aeec88a.js";import"./SearchOutlined.3b0489e1.js";import"./PurePanel.7897ccec.js";import"./Compact.c7a1bef5.js";import"./Pagination.75c29296.js";import"./LeftOutlined.67edc2db.js";import"./RightOutlined.19164f95.js";import"./useForceUpdate.997a6267.js";import"./responsiveObserve.6b5848d4.js";import"./index.90d07be9.js";import"./button.8d7ffa1a.js";import"./index.60d0402b.js";import"./index.11d6766c.js";import"./dropdown.0343149c.js";import"./Dropdown.1d3385b2.js";import"./index.de03715e.js";import"./collapse.3b35c5c9.js";import"./useFlexGapSupport.a59bf389.js";import"./index.171e0a82.js";import"./index.d50c1940.js";import"./TextArea.38af062b.js";import"./EyeOutlined.b9911e82.js";const io=({storefronts:m,singleShipment:i,setSingleShipment:n})=>{const[a,l]=d.exports.useState([]),c=f();return d.exports.useEffect(()=>{let o=i==null?void 0:i.storefront_ids.split(","),s=m==null?void 0:m.reduce((t,r)=>(o.includes(String(r==null?void 0:r.id))&&t.push(parseInt(r==null?void 0:r.id)),t),[]);l(s)},[i]),e("div",{children:e(b,{rowKey:"id",rowSelection:{selectedRowKeys:a,onChange:(o,s)=>{let t={...i},r=o.reduce((p,w)=>(p=p+","+w,p),"");t.storefront_ids=r.slice(1),n(t)},getCheckboxProps:o=>({disabled:o.name==="Disabled User",name:o.name})},columns:[{title:"Storefront name",dataIndex:"data",key:"name",render:o=>e("a",{children:o==null?void 0:o.name})},{title:"Url",dataIndex:"data",key:"url",render:o=>e("a",{href:o==null?void 0:o.url,target:"_blank",children:o==null?void 0:o.url})},{title:"Status",dataIndex:"data",align:"right",key:"status",render:o=>e(y,{color:(o==null?void 0:o.status)==="Y"?"green":"red",children:(o==null?void 0:o.status)==="Y"?"ON":"OFF"})}],dataSource:m,pagination:!1,scroll:{y:c.height>670?300:200,x:600}})})};export{io as default};
