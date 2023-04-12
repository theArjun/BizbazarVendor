import{a as h,aU as z,r as b,b as e,j as d,X as c}from"./index.b239cc55.js";import{f as i}from"./index.esm.681134e4.js";import{T as y}from"./Table.4059dce2.js";import{I as x}from"./index.51ed3a13.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./pickAttrs.f011bab2.js";import"./styleChecker.98fd75c2.js";import"./index.282ea7d3.js";import"./css.d6e3059f.js";import"./index.3c397a1c.js";import"./Overflow.8b34a4db.js";import"./statusUtils.ab472cb9.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";import"./SearchOutlined.8331e38c.js";import"./PurePanel.ffcb695e.js";import"./Compact.d9f155a2.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./RightOutlined.47ed9d6c.js";import"./useForceUpdate.5b188f49.js";import"./responsiveObserve.99027935.js";import"./index.2d340b5d.js";import"./button.1e90f6e6.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./dropdown.989042eb.js";import"./Dropdown.3bbb202b.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./useFlexGapSupport.1cb3c05a.js";import"./index.6bb695c7.js";import"./index.4af21018.js";import"./TextArea.6c3ac8fe.js";import"./EyeOutlined.a43f77a8.js";import"./index.9279110c.js";const l={},ae=({handleScroll:s,reviews:m})=>{const p=h(),f=z();b.exports.useEffect(()=>{var t;return(t=document.querySelector("#product > div > div.ant-table-body"))==null||t.addEventListener("scroll",s),()=>{var r;(r=document.querySelector("#product > div > div.ant-table-body"))==null||r.removeEventListener("scroll",s)}},[s]);const u=t=>{switch(t){case"1":return d("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]});case"2":return d("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]});case"3":return d("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18})]});case"4":return d("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18})]});case"5":return d("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"})]});default:return d("div",{children:[e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]})}},g=t=>{const r=new Date(parseInt(t*1e3)),o=r.toLocaleString("en-US",{year:"numeric",month:"short",day:"2-digit"}),a=r.toLocaleString("en-US",{hour:"2-digit",minute:"numeric"});return o+", "+a},v=[{title:"Image",dataIndex:"images",key:"image",width:"100px",render:t=>{var r;return e(c.Fragment,{children:(r=Object.values(t))==null?void 0:r.map((o,a)=>{var n;return e(x,{width:50,src:(n=o==null?void 0:o.detailed)==null?void 0:n.image_path},a)})})}},{title:"Rating/Customer",dataIndex:"rating_value",key:"product",render:(t,r)=>{var o;return d("div",{className:l.rating,children:[d("div",{style:{margin:0,display:"flex"},onClick:()=>p(`../Products/Reviews/${r.product_review_id}`),children:[e("a",{children:`Review #${r.product_review_id}`}),"\xA0 \xA0 ",u(t)]}),e("p",{style:{margin:0},children:(o=r==null?void 0:r.user_data)==null?void 0:o.name})]})}},{title:"Helpfulness",dataIndex:"helpfulness",key:"helpfulness",render:t=>d(c.Fragment,{children:[e("span",{style:{color:"green"},children:t.vote_up}),"/",e("span",{style:{color:"red"},children:t.vote_down})]})},{title:"Status",key:"status",dataIndex:"status",render:t=>e("div",{style:t==="A"?{color:"green"}:{color:"red"},children:t==="A"?"Approved":"Not Approved"})},{title:"Date",key:"date",dataIndex:"product_review_timestamp",render:t=>g(t)}];return e("div",{className:l.container,children:e(y,{id:"product",columns:v,dataSource:m,pagination:!1,expandable:{expandedRowRender:t=>d("div",{children:[d("p",{style:{margin:0},children:[e("b",{children:"Comment: "})," "+t.message.comment]})," ",d("p",{style:{margin:0},children:[e("b",{children:"Advantages:"})," "+t.message.disadvantages]})," ",d("p",{style:{margin:0},children:[e("b",{children:"Disadvantages:"})," "+t.message.disadvantages]})]}),rowExpandable:t=>t.message},scroll:{y:f.height>670?300:200,x:1e3}})})};export{ae as default};