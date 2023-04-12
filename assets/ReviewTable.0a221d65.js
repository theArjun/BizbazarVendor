import{a as h,aU as v,r as z,b as e,j as o,X as c}from"./index.b239cc55.js";import{f as i}from"./index.esm.681134e4.js";import{T as b}from"./Table.4059dce2.js";import{I as _}from"./index.51ed3a13.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./pickAttrs.f011bab2.js";import"./styleChecker.98fd75c2.js";import"./index.282ea7d3.js";import"./css.d6e3059f.js";import"./index.3c397a1c.js";import"./Overflow.8b34a4db.js";import"./statusUtils.ab472cb9.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";import"./SearchOutlined.8331e38c.js";import"./PurePanel.ffcb695e.js";import"./Compact.d9f155a2.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./RightOutlined.47ed9d6c.js";import"./useForceUpdate.5b188f49.js";import"./responsiveObserve.99027935.js";import"./index.2d340b5d.js";import"./button.1e90f6e6.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./dropdown.989042eb.js";import"./Dropdown.3bbb202b.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./useFlexGapSupport.1cb3c05a.js";import"./index.6bb695c7.js";import"./index.4af21018.js";import"./TextArea.6c3ac8fe.js";import"./EyeOutlined.a43f77a8.js";import"./index.9279110c.js";const y="_product_info_hkka7_1",x="_product_name_hkka7_9",k="_icons_hkka7_19",w={product_info:y,product_name:x,icons:k},le=({loading:m,handleScroll:s,reviews:l})=>{const p=h(),u=v();z.exports.useEffect(()=>{var t;return(t=document.querySelector("#product > div > div.ant-table-body"))==null||t.addEventListener("scroll",s),()=>{var r;(r=document.querySelector("#product > div > div.ant-table-body"))==null||r.removeEventListener("scroll",s)}},[s]);const f=t=>{switch(t){case"1":return o("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]});case"2":return o("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]});case"3":return o("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18}),e(i,{size:18})]});case"4":return o("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18})]});case"5":return o("div",{children:[e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"}),e(i,{size:18,color:"#ffbd3d"})]});default:return o("div",{children:[e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18}),e(i,{size:18})]})}},g=t=>{const r=new Date(parseInt(t*1e3)),d=r.toLocaleString("en-US",{year:"numeric",month:"short",day:"2-digit"}),n=r.toLocaleString("en-US",{hour:"2-digit",minute:"numeric"});return d+", "+n};return e("div",{children:e(b,{id:"product",loading:m,columns:[{title:"Image",dataIndex:"images",key:"image",width:"100px",render:t=>{var r;return e(c.Fragment,{children:(r=Object.values(t))==null?void 0:r.map((d,n)=>{var a;return e(_,{width:50,src:(a=d==null?void 0:d.detailed)==null?void 0:a.image_path},n)})})}},{title:"Rating/Customer",dataIndex:"rating_value",key:"product",render:(t,r)=>{var d;return o("div",{className:w.rating,children:[o("div",{style:{margin:0,display:"flex"},onClick:()=>p(`../Products/Reviews/${r.product_review_id}`),children:[e("a",{children:`Review #${r.product_review_id}`}),"\xA0 \xA0 ",f(t)]}),e("p",{style:{margin:0},children:(d=r==null?void 0:r.user_data)==null?void 0:d.name})]})}},{title:"Helpfulness",dataIndex:"helpfulness",key:"helpfulness",render:t=>o(c.Fragment,{children:[e("span",{style:{color:"green"},children:t.vote_up}),"/",e("span",{style:{color:"red"},children:t.vote_down})]})},{title:"Status",key:"status",dataIndex:"status",render:t=>e("div",{style:t==="A"?{color:"green"}:{color:"red"},children:t==="A"?"Approved":"Not Approved"})},{title:"Date",key:"date",dataIndex:"product_review_timestamp",render:t=>g(t)}],dataSource:l,pagination:!1,expandable:{expandedRowRender:t=>o("div",{children:[o("p",{style:{margin:0},children:[e("b",{children:"Comment:"})," "+t.message.comment]})," ",o("p",{style:{margin:0},children:[e("b",{children:"Advantages:"})," "+t.message.disadvantages]})," ",o("p",{style:{margin:0},children:[e("b",{children:"Disadvantages: "})," "+t.message.disadvantages]})]}),rowExpandable:t=>t.message},scroll:{y:u.height>670?300:200,x:1e3}})})};export{le as default};
