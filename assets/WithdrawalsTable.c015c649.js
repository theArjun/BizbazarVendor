import{aU as _,r as y,b as i,j as n}from"./index.b239cc55.js";import{T as h}from"./Table.4059dce2.js";import{T as b}from"./index.0c91c947.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./pickAttrs.f011bab2.js";import"./styleChecker.98fd75c2.js";import"./index.282ea7d3.js";import"./css.d6e3059f.js";import"./index.3c397a1c.js";import"./Overflow.8b34a4db.js";import"./statusUtils.ab472cb9.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";import"./SearchOutlined.8331e38c.js";import"./PurePanel.ffcb695e.js";import"./Compact.d9f155a2.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./RightOutlined.47ed9d6c.js";import"./useForceUpdate.5b188f49.js";import"./responsiveObserve.99027935.js";import"./index.2d340b5d.js";import"./button.1e90f6e6.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./dropdown.989042eb.js";import"./Dropdown.3bbb202b.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./useFlexGapSupport.1cb3c05a.js";import"./index.6bb695c7.js";import"./index.4af21018.js";import"./TextArea.6c3ac8fe.js";import"./EyeOutlined.a43f77a8.js";const g="_product_info_2bho8_1",v="_right_card_2bho8_11",x="_title_2bho8_17",S="_right_card_body_2bho8_25",T="_red_2bho8_43",f={product_info:g,right_card:v,title:x,right_card_body:S,red:T},pt=({handleScroll:a,loading:d,data:p,status:m})=>{const c=_();y.exports.useEffect(()=>{var t;return(t=document.querySelector("#product > div > div.ant-table-body"))==null||t.addEventListener("scroll",a),()=>{var o;(o=document.querySelector("#product > div > div.ant-table-body"))==null||o.removeEventListener("scroll",a)}},[a]);const s=(t,o)=>{var e;const[r]=m.filter(u=>u.status===t);return i("div",{children:i(b,{className:f.dpContainer,color:(e=r==null?void 0:r.params)==null?void 0:e.color,children:r==null?void 0:r.description})})},l=t=>{const o=new Date(parseInt(t*1e3)),r=o.toLocaleString("en-US",{year:"numeric",month:"short",day:"2-digit"}),e=o.toLocaleString("en-US",{hour:"2-digit",minute:"numeric"});return r+", "+e};return i("div",{children:i(h,{id:"product",loading:d,columns:[{title:"Status",dataIndex:"approval_status",data:"data",key:"product",render:t=>s(t=="P"?"G":t)},{title:"Date",dataIndex:"payout_date",key:"date",render:t=>l(t)},{title:"Type",dataIndex:"payout_type",key:"type"},{title:"Transaction value",dataIndex:"payout_amount",key:"transaction",render:t=>n("p",{children:["\u0930\u0941",t]})}],expandable:{expandedRowRender:t=>n("p",{style:{margin:0},children:["Comment:"," "+t.comments]}),rowExpandable:t=>t.comments},dataSource:p,pagination:!1,scroll:{y:c.height>670?300:200,x:1e3}})})};export{pt as default};