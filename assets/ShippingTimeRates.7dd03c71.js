import{r as j,j as _,b as i,aU as T}from"./index.b239cc55.js";import{k as F,j as C}from"./index.esm.681134e4.js";import{M as W}from"./index.2b87b131.js";import{I as u}from"./index.4af21018.js";import{S}from"./index.3c397a1c.js";import{F as h}from"./index.02861738.js";import{B as O}from"./button.1e90f6e6.js";import{m as A}from"./index.257808cf.js";import{T as z}from"./Table.4059dce2.js";import"./render.1622182d.js";import"./index.9279110c.js";import"./pickAttrs.f011bab2.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./index.4bbb7811.js";import"./useFlexGapSupport.1cb3c05a.js";import"./index.2d340b5d.js";import"./Compact.d9f155a2.js";import"./TextArea.6c3ac8fe.js";import"./index.282ea7d3.js";import"./statusUtils.ab472cb9.js";import"./EyeOutlined.a43f77a8.js";import"./SearchOutlined.8331e38c.js";import"./Overflow.8b34a4db.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./LoadingOutlined.97101298.js";import"./PurePanel.ffcb695e.js";import"./collapse.4a0a3d30.js";import"./row.7108879f.js";import"./responsiveObserve.99027935.js";import"./useNotification.49a3f20c.js";import"./styleChecker.98fd75c2.js";import"./css.d6e3059f.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./RightOutlined.47ed9d6c.js";import"./useForceUpdate.5b188f49.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./dropdown.989042eb.js";import"./Dropdown.3bbb202b.js";import"./index.6bb695c7.js";const P="_add_condition_field_1ks3v_1",q="_condition_fields_1ks3v_19",B="_particular_condition_1ks3v_41",v={add_condition_field:P,condition_fields:q,particular_condition:B},M="_section_wv4rj_1",$="_available_rates_parent_container_wv4rj_15",E="_available_rates_container_wv4rj_29",w="_available_rates_wv4rj_15",K="_condition_modal_wv4rj_57",b={section:M,available_rates_parent_container:$,available_rates_container:E,available_rates:w,condition_modal:K},N=[{label:"Absolute(\u0930\u0941)",value:"F"},{label:"Percentage(%)",value:"P"}];let I=[];const U=({modalOpen:a,setModalOpen:k,modalData:r,haveRate:c,setHaveRate:d})=>{var m;const[g,x]=j.exports.useState("F"),[p,o]=j.exports.useState(1),s=e=>{if(parseInt(e==null?void 0:e.range_from_value)>parseInt(e==null?void 0:e.range_to_value))A.error("from value should be greater than to value!");else{let n=[...c];n[r==null?void 0:r.index].rate_value={...n[r==null?void 0:r.index].rate_value,[r.rate_value]:{...n[r==null?void 0:r.index].rate_value[r.rate_value],[p]:{range_from_value:e.range_from_value||"",range_to_value:e.range_to_value||"",value:e.value||"",type:g,index:p}}},d(n),o(t=>t+1)}},y=e=>{var t;console.log(e);const n=[...c];(t=n[r==null?void 0:r.index])==null||delete t.rate_value[r==null?void 0:r.rate_value][e],d(n)};return _(W,{title:`${r.destination} ----->${r.condition}`,centered:!0,open:a,className:b.condition_modal,onOk:()=>k(!1),onCancel:()=>k(!1),width:800,cancelButtonProps:{style:{display:"none"}},children:[i("div",{className:b.available_rates,children:Object.values(((m=c[r==null?void 0:r.index])==null?void 0:m.rate_value[r==null?void 0:r.rate_value])||{}).map((e,n)=>(I.push(e==null?void 0:e.range_from_value),_("div",{className:b.available_rates_parent_container,children:[_("div",{className:b.available_rates_container,children:[_("div",{children:[i(u,{value:e.range_from_value,onChange:t=>{let l=[...c];e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].range_from_value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].range_from_value=t.target.value,d(l)}})," "]}),_("div",{children:[i(u,{value:e.range_to_value,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].range_to_value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].range_to_value=t.target.value,d(l)}})," "]}),_("div",{children:[i(u,{value:e.value,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].value=t.target.value:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].value=t.target.value,d(l)},addonAfter:i(S,{value:e.type,onChange:t=>{let l=[...c];e!=null&&e.index?l[r.index].rate_value[r==null?void 0:r.rate_value][e.index].type=t:l[r.index].rate_value[r==null?void 0:r.rate_value][I[n]].type=t,d(l)},options:N,style:{minWidth:"120px"}})})," "]})]}),i("a",{onClick:()=>y((e==null?void 0:e.index)||(e==null?void 0:e.range_from_value)),children:i(F,{color:"red",size:15})})]},n)))}),i("div",{className:b.section_container,children:i(h,{layout:"vertical",onFinish:s,children:_("div",{className:b.section,children:[i(h.Item,{name:"range_from_value",label:"From(\u0930\u0941):",rules:[{required:!0,message:""}],children:i(u,{type:"number"})}),i(h.Item,{name:"range_to_value",label:"To(\u0930\u0941):",rules:[{required:!0,message:""}],children:i(u,{type:"number"})}),i(h.Item,{name:"value",label:"Surcharge / Discount:",rules:[{required:!0,message:""}],children:i(u,{type:"number",addonAfter:i(S,{value:g,options:N,style:{minWidth:"120px"},onChange:e=>x(e)})})}),i(O,{htmlType:"submit",children:"Add"})]})})})]})},G=({shippingTimeRates:a,destinations:k,setShippingTimeRates:r,setHaveRate:c,haveRate:d})=>{const g=T(),[x,p]=j.exports.useState(!1),[o,s]=j.exports.useState({}),y=e=>{let t=[...d].filter((l,f)=>(l==null?void 0:l.destination_id)!==e);c(t)};return _("div",{children:[i(z,{id:"product",columns:[{title:"Destination",dataIndex:"destination",key:"destination"},{title:"Shipping time",dataIndex:"delivery_time",key:"delivery_time",render:(e,n,t)=>i("div",{children:i(u,{value:e,onChange:l=>{let f=[...d];f[t].delivery_time=l.target.value,c(f)}})})},{title:"Base rate",dataIndex:"base_rate",key:"base_rate",render:(e,n,t)=>i("div",{children:i(u,{value:e,onChange:l=>{let f=[...d];f[t].base_rate=l.target.value,c(f)}})})},{title:"Price condition",children:[{title:"From(\u0930\u0941)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(\u0930\u0941)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.C||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"C",index:t,destination:n==null?void 0:n.destination,condition:"Price condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Weight condition",children:[{title:"From(Kg)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(Kg)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.W||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"W",index:t,destination:n==null?void 0:n.destination,condition:"Weight condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Items condition",children:[{title:"From(item)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.range_from_value)||""})}},{title:"To(item)",dataIndex:"rate_value",key:"from",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.range_to_value)||""})}},{title:"Surcharge / Discount",dataIndex:"rate_value",key:"surcharge",render:e=>{var n;return i("div",{children:((n=Object==null?void 0:Object.values(e.I||{}).at(-1))==null?void 0:n.value)||""})}},{title:"",dataIndex:"rate_value",key:"rate_value",render:(e,n,t)=>i("a",{onClick:()=>{s({rate_value:"I",index:t,destination:n==null?void 0:n.destination,condition:"Item condition"}),p(!0)},children:i(C,{size:18})})}]},{title:"Action",key:"action",dataIndex:"destination_id",fixed:"right",width:100,render:e=>i("a",{onClick:()=>y(e),children:i(F,{size:20,color:"red"})})}],dataSource:a.map((e,n)=>({...e,key:n}))||[],pagination:!1,scroll:{y:g.height>670?300:200,x:1800}}),i(U,{modalOpen:x,setModalOpen:p,modalData:o,setShippingTimeRates:r,shippingTimeRates:a,setHaveRate:c,haveRate:d})]})},Pe=({destinations:a,shippingTimeRates:k,setShippingTimeRates:r,haveRate:c,setHaveRate:d,allDestination:g})=>{const[x]=h.useForm(),p=o=>{let y={...(g==null?void 0:g.filter(e=>(e==null?void 0:e.destination_id)===(o==null?void 0:o.destination)))[0],delivery_time:o.shipping_time||"",base_rate:o.rate||"",rate_value:{}},m=[...c,{...y}];d(m),x.resetFields()};return i("div",{className:v.container,children:i("div",{className:v.condition_body,children:_("div",{className:v.condition_body_content,children:[i(h,{onFinish:p,form:x,layout:"vertical",children:_("div",{className:v.add_condition_field,children:[_("div",{className:v.condition_fields,children:[i(h.Item,{className:v.condition_field_item,label:"Destination",name:"destination",rules:[{required:!0,message:""}],children:i(S,{placeholder:"Select destination",style:{width:200},options:a==null?void 0:a.map(o=>({...o,disabled:c==null?void 0:c.some(s=>(s==null?void 0:s.destination_id)===(o==null?void 0:o.value))}))})}),i("div",{className:v.selected_condition_content,children:_("div",{className:v.particular_condition,children:[i(h.Item,{name:"shipping_time",label:"Shipping time",style:{minWidth:"90px"},children:i(u,{type:"text"})}),i(h.Item,{style:{minWidth:"90px"},name:"rate",label:"Rate",children:i(u,{type:"number"})})]})})]}),i(O,{type:"primary",htmlType:"submit",children:"Add"})]})}),i("div",{className:v.condition_table,children:i(G,{shippingTimeRates:c,setShippingTimeRates:r,destinations:a,haveRate:c,setHaveRate:d})})]})})})};export{Pe as default};