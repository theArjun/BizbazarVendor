import{r as I,b as i,j as x}from"./index.b239cc55.js";import{u as F}from"./useDebounce.d6117fcd.js";import{F as o}from"./index.02861738.js";import{C as L}from"./index.3f15e62b.js";import{I as O}from"./index.4af21018.js";import{S as a}from"./index.3c397a1c.js";import{D as $}from"./index.fe1233e0.js";import"./index.4bbb7811.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./useMergedState.a28f7e87.js";import"./collapse.4a0a3d30.js";import"./LoadingOutlined.97101298.js";import"./row.7108879f.js";import"./useFlexGapSupport.1cb3c05a.js";import"./responsiveObserve.99027935.js";import"./Dropdown.3bbb202b.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./PlusOutlined.be462ade.js";import"./index.2d340b5d.js";import"./Compact.d9f155a2.js";import"./TextArea.6c3ac8fe.js";import"./statusUtils.ab472cb9.js";import"./EyeOutlined.a43f77a8.js";import"./SearchOutlined.8331e38c.js";import"./button.1e90f6e6.js";import"./pickAttrs.f011bab2.js";import"./CheckOutlined.bf68ea45.js";import"./DownOutlined.69351dd6.js";import"./PurePanel.ffcb695e.js";const P="_search_inputs_i747i_1",V="_container_i747i_15",s={search_inputs:P,container:V},{RangePicker:j}=$,N=[{label:"Administrator",value:"A"},{label:"Vendor",value:"V"},{label:"Customer",value:"C"}],ct=({status:m,setParams:p,params:n,userGroup:b})=>{const[g]=o.useForm(),[d,y]=I.exports.useState("");F(()=>{let r={...n};r.order_id=d,p(r)},500,[d]);const S=(r,t)=>{var c,l,h,_,f,w;let e={...n};if(e.status_id=t.status?t.status:"",e.user_type=t.user_types?t.user_types:"",e.usergroup_id=t.user_group?t.user_group:"",t.dates){let C=new Date((c=t==null?void 0:t.dates[0])==null?void 0:c.$y,(l=t==null?void 0:t.dates[0])==null?void 0:l.$M,(h=t==null?void 0:t.dates[0])==null?void 0:h.$D).getTime()/1e3,u=new Date((_=t==null?void 0:t.dates[1])==null?void 0:_.$y,(f=t==null?void 0:t.dates[1])==null?void 0:f.$M,(w=t==null?void 0:t.dates[1])==null?void 0:w.$D).getTime()/1e3;e.time_from=C||"",e.time_to=u||""}else e.time_from="",e.time_to="";p(e)},D=()=>m==null?void 0:m.map((r,t)=>({label:r==null?void 0:r.description,value:r==null?void 0:r.status_id}));return i("div",{className:s.container,id:"search_height",children:i(L,{children:i(o,{layout:"vertical",form:g,className:s.form,name:"basic",wrapperCol:{},autoComplete:"off",onValuesChange:S,children:x("div",{className:s.search_inputs,children:[i(o.Item,{id:"status",label:"Order ID",style:{minWidth:"150px"},children:i(O,{type:"number",onChange:r=>y(r.target.value)})}),i(o.Item,{id:"status",label:"Order Status",name:"status",style:{width:"200px"},children:i(a,{allowClear:!0,showSearch:!0,optionFilterProp:"children",filterOption:(r,t)=>{var e;return((e=t==null?void 0:t.label)!=null?e:"").toLowerCase().includes(r.toLowerCase())},options:D()})}),i(o.Item,{id:"status",label:"User types",name:"user_types",style:{width:"200px"},children:i(a,{allowClear:!0,showSearch:!0,optionFilterProp:"children",filterOption:(r,t)=>{var e;return((e=t==null?void 0:t.label)!=null?e:"").toLowerCase().includes(r.toLowerCase())},options:N})}),i(o.Item,{id:"status",label:"User group",name:"user_group",style:{width:"200px"},children:i(a,{allowClear:!0,showSearch:!0,optionFilterProp:"children",filterOption:(r,t)=>{var e;return((e=t==null?void 0:t.label)!=null?e:"").toLowerCase().includes(r.toLowerCase())},options:b})}),i(o.Item,{id:"date",label:"Select Dates",name:"dates",children:i(j,{})})]})})})})};export{ct as default};
