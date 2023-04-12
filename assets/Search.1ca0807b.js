import{r as w,b as r,j as s}from"./index.b239cc55.js";import{u as x}from"./useDebounce.d6117fcd.js";import{F as a}from"./index.02861738.js";import{C}from"./index.3f15e62b.js";import{I as l}from"./index.4af21018.js";import{S as _}from"./index.3c397a1c.js";import"./index.4bbb7811.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./collapse.4a0a3d30.js";import"./LoadingOutlined.97101298.js";import"./row.7108879f.js";import"./useFlexGapSupport.1cb3c05a.js";import"./responsiveObserve.99027935.js";import"./Dropdown.3bbb202b.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./PlusOutlined.be462ade.js";import"./index.2d340b5d.js";import"./Compact.d9f155a2.js";import"./TextArea.6c3ac8fe.js";import"./statusUtils.ab472cb9.js";import"./EyeOutlined.a43f77a8.js";import"./SearchOutlined.8331e38c.js";import"./button.1e90f6e6.js";import"./pickAttrs.f011bab2.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./PurePanel.ffcb695e.js";const g="_container_1fb5v_1",v="_search_inputs_1fb5v_7",S="_price_container_1fb5v_23",I="_search_btn_1fb5v_63",F="_filter_container_1fb5v_69",L="_filter_container_close_1fb5v_79",N="_remaining_search_fields_1fb5v_85",c={container:g,search_inputs:v,price_container:S,search_btn:I,filter_container:F,filter_container_close:L,remaining_search_fields:N};const oe=({params:m,setParams:d,hasStatus:p,categories:n})=>{const[h]=a.useForm(),[o,u]=w.exports.useState({name:"",price_from:"",price_to:"",category:"",status:""});x(()=>{let t={...m};t.price_from=o.price_from,t.price_to=o.price_to,t.category=o.category,t.product_name=o.name,t.status=p?m.status:o.status,d(t)},500,[o]);let f=n==null?void 0:n.map(t=>({label:t.category,value:t.category_id}));const b=[{label:"Active",value:"A"},{label:"Disabled",value:"D"},{label:"Hidden",value:"H"}],y=(t,e)=>{let i={...o};i.price_from=e.min_price||"",i.price_to=e.max_price||"",i.category=e.category||"",i.name=e.name||"",i.status=(e==null?void 0:e.status)||"",u(i)};return r("div",{className:c.container,children:r(C,{bordered:!0,children:r(a,{layout:"vertical",form:h,className:c.form,name:"basic",wrapperCol:{},autoComplete:"off",onValuesChange:y,children:s("div",{className:c.search_inputs,children:[r(a.Item,{id:"req",label:"Product name",name:"name",style:{width:"200px"},children:r(l,{type:"text"})}),s("div",{children:[r("label",{children:"Price (\u0930\u0941)"}),s("div",{className:c.price_container,children:[r(a.Item,{id:"min-price",name:"min_price",style:{width:"80px"},children:r(l,{type:"number"})})," ",r(a.Item,{children:"-"}),r(a.Item,{id:"max-price",name:"max_price",style:{width:"80px"},children:r(l,{type:"number"})})]})]}),r(a.Item,{id:"req",label:"Search in categories",name:"category",style:{width:"200px"},children:r(_,{allowClear:!0,showSearch:!0,placeholder:"Select a category",optionFilterProp:"children",filterOption:(t,e)=>{var i;return((i=e==null?void 0:e.label)!=null?i:"").toLowerCase().includes(t.toLowerCase())},options:f})}),p?"":r(a.Item,{label:"Status",name:"status",style:{width:"200px"},children:r(_,{allowClear:!0,showSearch:!0,optionFilterProp:"children",placeholder:"Select by status",filterOption:(t,e)=>{var i;return((i=e==null?void 0:e.label)!=null?i:"").toLowerCase().includes(t.toLowerCase())},options:b})})]})})})})};export{oe as default};
