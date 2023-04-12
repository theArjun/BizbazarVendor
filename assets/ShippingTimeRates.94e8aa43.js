import{r as j,j as _,b as i,aU as T}from"./index.559c1fcf.js";import{k as F,j as C}from"./index.esm.267eb871.js";import{M as W}from"./index.e5e0e49c.js";import{I as u}from"./index.99653d62.js";import{S}from"./index.57a1466e.js";import{F as h}from"./index.d3e6f2d0.js";import{B as O}from"./button.c49f6243.js";import{m as A}from"./index.9a718a0a.js";import{T as z}from"./Table.382eff90.js";import"./render.6e9f9fbc.js";import"./index.38297928.js";import"./pickAttrs.09e8e693.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./useMergedState.e59004d6.js";import"./index.02299b94.js";import"./useFlexGapSupport.39a8fd32.js";import"./index.e42cc673.js";import"./Compact.e0a86bbb.js";import"./TextArea.8f7e52a8.js";import"./index.800256bd.js";import"./statusUtils.8e955008.js";import"./EyeOutlined.acaf92f0.js";import"./SearchOutlined.1243ca95.js";import"./Overflow.0ae650b7.js";import"./CheckOutlined.61030fcd.js";import"./DownOutlined.218b67e6.js";import"./LoadingOutlined.65af6f9d.js";import"./PurePanel.4b452415.js";import"./collapse.4ef0eee8.js";import"./row.1adc50e8.js";import"./responsiveObserve.0df24820.js";import"./useNotification.530e6546.js";import"./styleChecker.3de124d5.js";import"./css.d6e3059f.js";import"./Pagination.76f30899.js";import"./LeftOutlined.abb276d5.js";import"./RightOutlined.6508ce6f.js";import"./useForceUpdate.3743a744.js";import"./index.7376aa48.js";import"./index.23768e3e.js";import"./dropdown.496de808.js";import"./Dropdown.40e49efe.js";import"./index.2534c696.js";const P="_add_condition_field_1ks3v_1",q="_condition_fields_1ks3v_19",B="_particular_condition_1ks3v_41",v={add_condition_field:P,condition_fields:q,particular_condition:B},M="_section_wv4rj_1",$="_available_rates_parent_container_wv4rj_15",E="_available_rates_container_wv4rj_29",w="_available_rates_wv4rj_15",K="_condition_modal_wv4rj_57",b={section:M,available_rates_parent_container:$,available_rates_container:E,available_rates:w,condition_modal:K},N=[{label:"Absolute(\u0930\u0941)",value:"F"},{label:"Percentage(%)",value:"P"}];let I=[];const U=({modalOpen:a,setModalOpen:k,modalData:r,haveRate:c,setHaveRate:d})=>{var m;const[g,x]=j.exports.useState("F"),[p,o]=j.exports.useState(1),s=e=>{if(parseInt(e==null?void 0:e.range_from_value)>parseInt(e==null?void 0:e.range_to_value))A.error("from value should be greater than to value!");else{let n=[...c];n[r==null?void 0:r.index].rate_value={...n[r==null?void 0:r.index].rate_value,[r.rate_value]:{...n[r==null?void 0:r.index].rate_value[r.rate_value],[p]:{range_from_value:e.range_from_value||"",range_to_value:e.range_to_value||"",value:e.value||"",type:g,index:p}}},d(n),o(t=>t+1)}},y=e=>{var t;console.log(e);const n=[...c];(t=n[r==null?void 0:r.index])==null||delete t.rate_value[r==null?void 0:r.rate_value][e],d(n)};return _(W,{title:`${r.destination} ----->${r.condition}`,centered:!0,open:a,className:b.condition_modal,onOk:()=>k(!1),onCancel:()=>k(!1),width:800,cancelButtonProps:{style:{display:"none"}},children:[i("div",{className:b.available_rates,children:Object.values(((m=c[r==null?void 0:r.index])==null?void 0:m.rate_value[r==null?void 0:r.rate_value])||{}).map((e,n)=>(I.push(e==null?void 0:e.range_from_value),_("div",{className:b.available_rates_parent_container,children:[_("div",{className:b.available_rates_container,children:[_("div",{children:[i(u,{value:e.range_from_value,onChange:t=>{let l=[...c];e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].range_from_value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].range_from_value=t.target.value,d(l)}})," "]}),_("div",{children:[i(u,{value:e.range_to_value,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].range_to_value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].range_to_value=t.target.value,d(l)}})," "]}),_("div",{children:[i(u,{value:e.value,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].value=t.target.value,d(l)},addonAfter:i(S,{value:e.type,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].type=t:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].type=t,d(l)},options:N,style:{minWidth:"120px"}})})," "]})]}),i("a",{onClick:()=>y((e==null?void 0:e.index)||(e==null?void 0:e.range_from_value)),children:i(F,{color:"red",size:15})})]},n)))}),i("div",{className:b.section_container,children:i(h,{layout:"vertical",onFinish:s,children:_("div",{className:b.section,children:[i(h.Item,{name:"range_from_value",label:"From(\u0930\u0941):",rules:[{required:!0,message:""}],children:i(u,{type:"number"})}),i(h.Item,{name:"range_to_value",label:"To(\u0930\u0941):",rules:[{required:!0,message:""}],children:i(u,{type:"number"})}),i(h.Item,{name:"value",label:"Surcharge / Discount:",rules:[{required:!0,message:""}],children:i(u,{type:"number",addonAfter:i(S,{value:g,options:N,style:{minWidth:"120px"},onChange:e=>x(e)})})}),i(O,{htmlType:"submit",children:"Add"})]})})})]})},G=({shippingTimeRates:a,destinations:k,setShippingTimeRates:r,setHaveRate:c,haveRate:d})=>{const g=T(),[x,p]=j.exports.useState(!1),[o,s]=j.exports.useState({}),y=e=>{let t=[...d].filter((l,f)=>(l==null?void 0:l.destination_id)!==e);c(t)};return _("div",{children:[i(z,{id:"product",columns:[{title:"Destination",dataIndex:"destination",key:"destination"},{title:"Shipping time",dataIndex:"delivery_time",key:"delivery_time",render:(e,n,t)=>i("div",{children:i(u,{value:e,onChange:l=>{let f=[...d];f[t].delivery_time=l.target.value,c(f)}})})},{title:"Base rate",dataIndex:"base_rate",key:"base_rate",render:(e,n,t)=>i("div",{children:i(u,{value:e,onChange:l=>{let f=[...d];f[t].base_rate=l.target.value,c(f)}})})},{title:"Price condition",children:[{title:"From(\u0930\u0941)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(\u0930\u0941)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"C",index:t,destination:n==null?void 0:n.destination,condition:"Price condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Weight condition",children:[{title:"From(Kg)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(Kg)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"W",index:t,destination:n==null?void 0:n.destination,condition:"Weight condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Items condition",children:[{title:"From(item)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(item)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"I",index:t,destination:n==null?void 0:n.destination,condition:"Item condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Action",key:"action",dataIndex:"destination_id",fixed:"right",width:100,render:e=>i("a",{onClick:()=>y(e),children:i(F,{size:20,color:"red"})})}],dataSource:a.map((e,n)=>({...e,key:n}))||[],pagination:!1,scroll:{y:g.height>670?300:200,x:1800}}),i(U,{modalOpen:x,setModalOpen:p,modalData:o,setShippingTimeRates:r,shippingTimeRates:a,setHaveRate:c,haveRate:d})]})},Pe=({destinations:a,shippingTimeRates:k,setShippingTimeRates:r,haveRate:c,setHaveRate:d,allDestination:g})=>{const[x]=h.useForm(),p=o=>{let y={...(g==null?void 0:g.filter(e=>(e==null?void 0:e.destination_id)===(o==null?void 0:o.destination)))[0],delivery_time:o.shipping_time||"",base_rate:o.rate||"",rate_value:{}},m=[...c,{...y}];d(m),x.resetFields()};return i("div",{className:v.container,children:i("div",{className:v.condition_body,children:_("div",{className:v.condition_body_content,children:[i(h,{onFinish:p,form:x,layout:"vertical",children:_("div",{className:v.add_condition_field,children:[_("div",{className:v.condition_fields,children:[i(h.Item,{className:v.condition_field_item,label:"Destination",name:"destination",rules:[{required:!0,message:""}],children:i(S,{placeholder:"Select destination",style:{width:200},options:a==null?void 0:a.map(o=>({...o,disabled:c==null?void 0:c.some(s=>(s==null?void 0:s.destination_id)===(o==null?void 0:o.value))}))})}),i("div",{className:v.selected_condition_content,children:_("div",{className:v.particular_condition,children:[i(h.Item,{name:"shipping_time",label:"Shipping time",style:{minWidth:"90px"},children:i(u,{type:"text"})}),i(h.Item,{style:{minWidth:"90px"},name:"rate",label:"Rate",children:i(u,{type:"number"})})]})})]}),i(O,{type:"primary",htmlType:"submit",children:"Add"})]})}),i("div",{className:v.condition_table,children:i(G,{shippingTimeRates:c,setShippingTimeRates:r,destinations:a,haveRate:c,setHaveRate:d})})]})})})};export{Pe as default};