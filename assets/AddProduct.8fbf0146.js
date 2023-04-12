import{a as G,r as n,b as e,a$ as J,j as l}from"./index.559c1fcf.js";import{b,c as y}from"./index.esm.267eb871.js";import{a as x}from"./apicall.a45120ef.js";import{l as K}from"./quill.snow.f0676353.js";import{I as Q}from"./ImageUploader.09c6049f.js";import{b as X}from"./ProductApi.fe19781a.js";import{B as c}from"./Breadcrumb.a0c48c79.js";import{F as r}from"./index.d3e6f2d0.js";import{B as ee}from"./button.c49f6243.js";import{C as g}from"./index.4fb68f20.js";import{I as s}from"./index.99653d62.js";import{S as m}from"./index.57a1466e.js";import{m as te}from"./index.9a718a0a.js";import{C as re}from"./index.7376aa48.js";import"./axios.0a901153.js";import"./config.d6ac9ea8.js";import"./render.6e9f9fbc.js";import"./useNotification.530e6546.js";import"./isEqual.5b0c1f76.js";import"./ImageUploaderApi.808ee727.js";import"./apiConfig.819e96ae.js";import"./useMutation.esm.3622c9ad.js";import"./utils.esm.f9fc2da8.js";import"./index.3e88b7ea.js";import"./pickAttrs.09e8e693.js";import"./useMergedState.e59004d6.js";import"./LoadingOutlined.65af6f9d.js";import"./useForceUpdate.3743a744.js";import"./EyeOutlined.acaf92f0.js";import"./progress.846f0c77.js";import"./CheckOutlined.61030fcd.js";import"./index.02299b94.js";import"./motion.c94e2116.js";import"./collapse.4ef0eee8.js";import"./index.e5e0e49c.js";import"./index.38297928.js";import"./useFlexGapSupport.39a8fd32.js";import"./PlusOutlined.c65b7533.js";import"./useInfiniteQuery.esm.273cbf80.js";import"./useQuery.esm.484a4dde.js";import"./dropdown.496de808.js";import"./RightOutlined.6508ce6f.js";import"./Dropdown.40e49efe.js";import"./Overflow.0ae650b7.js";import"./index.800256bd.js";import"./PurePanel.4b452415.js";import"./Compact.e0a86bbb.js";import"./DownOutlined.218b67e6.js";import"./row.1adc50e8.js";import"./responsiveObserve.0df24820.js";import"./index.e42cc673.js";import"./TextArea.8f7e52a8.js";import"./statusUtils.8e955008.js";import"./SearchOutlined.1243ca95.js";import"./index.23768e3e.js";const ae="_container_1y0pa_1",ie="_breadcrumb_create_btn_1y0pa_23",oe="_title_header_1y0pa_37",le="_close_container_1y0pa_47",i={container:ae,breadcrumb_create_btn:ie,title_header:oe,close_container:le};const ct=()=>{G();const[p,I]=n.exports.useState(!0),[C,N]=n.exports.useState(!1),[u,S]=n.exports.useState(!0),[_,w]=n.exports.useState(!0),[k,q]=n.exports.useState([]),[P,F]=n.exports.useState(""),[h,A]=n.exports.useState(!1),[T,f]=n.exports.useState([]),[B,D]=n.exports.useState(0),{isLoading:E,mutate:L,isError:ne}=X(),[v,O]=n.exports.useState({product_main_image_data:{},type_product_main_image_detailed:{},file_product_main_image_detailed:{},product_add_additional_image_data:{},type_product_add_additional_image_detailed:{},file_product_add_additional_image_detailed:{}}),V=[{label:"Simultaneous",value:"P"},{label:"Sequential",value:"S"}],j=[{label:"Forbidden",value:"F"},{label:"Allowed",value:"A"}],R=[{label:"Do not allow customers to add the product to cart",value:"R"},{label:"Allow customers to add the product to cart",value:"P"},{label:"Ask customer to enter the price",value:"A"}],z=[{label:"Yes",value:"B"},{label:"No",value:"D"}];n.exports.useEffect(()=>{h?Z():f([])},[h]);const M=async t=>{const o={products_data:[{...t,category_ids:W(t.category),tax_ids:T,...v}]};L(o,{onSuccess:a=>{console.log(a,"is-product-created")},onError:a=>{console.log(a,"adding-product-error")}})},U=t=>{console.log("Failed:",t)},H=async()=>{let o=(await x({url:"categories"})).data.categories.map((a,d)=>({label:a.category,value:a.category_id,id:a.category_id}));q(o)},W=t=>{let o={};return t&&(t==null||t.map((a,d)=>{o[d]=a})),o},Y=t=>{console.log("search:",t)},Z=async()=>{var o,a;const t=await x({url:"taxes"});if(t.data){let d=(a=(o=t==null?void 0:t.data)==null?void 0:o.taxes)==null?void 0:a.filter($=>$.tax==="VAT");f([...d[0].tax_id])}};return E?e(J,{}):l("div",{className:i.container,children:[e("div",{className:i.breadcrumb_create_btn,children:e("div",{className:"breadcrumb",children:l(c,{children:[e(c.Item,{children:"Home"}),e(c.Item,{children:e("a",{href:"",children:"Products"})}),e(c.Item,{children:e("a",{href:"",children:"Products"})}),e(c.Item,{children:"Add Products"})]})})}),e("div",{className:i.formContainer,children:l(r,{name:"basic",onFinish:M,onFinishFailed:U,autoComplete:"off",initialValues:{tracking:"B",available_qty:1,exceptions_type:"F",max_qty:1,min_qty:1,options_type:"P",zero_price_action:"R",stock:1,amount:1},children:[e(r.Item,{style:{float:"right"},children:e(ee,{disabled:C,type:"primary",htmlType:"submit",children:"Create"})}),l("div",{className:i.information,children:[e("div",{className:"information_title",onClick:()=>I(!p),children:l("h2",{className:i.title_header,children:["Information",p?e(y,{}):e(b,{})]})}),l(g,{className:p?i.information_container:i.close_container,children:[e(r.Item,{label:"Name",name:"product",rules:[{required:!0,message:"Please enter product name!"}],children:e(s,{})}),e(r.Item,{id:"category",label:"Categories",rules:[{required:!0,message:"Select your product category!"}],name:"category",children:e(m,{onClick:()=>H(),showSearch:!0,mode:"tags",placeholder:"Select a category",optionFilterProp:"children",onSearch:Y,filterOption:(t,o)=>{var a;return((a=o==null?void 0:o.label)!=null?a:"").toLowerCase().includes(t.toLowerCase())},options:k})}),e(r.Item,{label:"Price (\u0930\u0941)",name:"price",style:{width:300},rules:[{required:!0,message:"Please  enter product price!"}],children:e(s,{type:"number"})}),e(r.Item,{label:"List price (\u0930\u0941)",name:"list_price",style:{width:300},rules:[{required:!0,message:"Please  enter product price!"}],children:e(s,{type:"number"})}),e(r.Item,{label:"Full description",name:"full_description",rules:[{required:!0,message:"Description is required!"}],children:e(K,{theme:"snow",value:P,onChange:F})}),e(Q,{message:te,uploadedImage:v,setUploadedImage:O,imageCount:B,setImageCount:D,Form:r,setLoading:N})]})]}),l("div",{className:i.options,children:[e("div",{className:"information_title",onClick:()=>S(!u),children:l("h2",{className:i.title_header,children:["Options setting",u?e(y,{}):e(b,{})]})}),l(g,{className:u?i.options_container:i.close_container,children:[e(r.Item,{label:"Options type",name:"options_type",children:e(m,{style:{width:300},options:V.map(t=>({label:t.label,value:t.value}))})}),e(r.Item,{label:"Exceptions type",name:"exceptions_type",children:e(m,{style:{width:300},options:j.map(t=>({label:t.label,value:t.value}))})})]})]}),l("div",{className:i.pricing,children:[l("div",{className:"pricing_title",onClick:()=>w(!_),children:[l("h2",{className:i.title_header,children:["Pricing/ inventory",_?e(y,{}):e(b,{})]})," "]}),l(g,{className:_?i.pricing_container:i.close_container,children:[e(r.Item,{label:"CODE",name:"product_code",rules:[{required:!0,message:"Please enter product name!"}],children:e(s,{type:"text"})}),e(r.Item,{label:"In stock",name:"amount",style:{width:200},children:e(s,{type:"number"})}),e(r.Item,{label:"Zero price action",name:"zero_price_action",children:e(m,{options:R.map(t=>({label:t.label,value:t.value}))})}),e(r.Item,{label:"Track inventory",name:"tracking",extra:"When inventory is tracked, the number of products in stock\r will decrease after each purchase.",children:e(m,{style:{width:300},options:z.map(t=>({label:t.label,value:t.value}))})}),e(r.Item,{label:"Minimum quantity to buy per product",name:"min_qty",style:{width:400},children:e(s,{type:"number"})}),e(r.Item,{label:"Maximum quantity to buy per product",name:"max_qty",style:{width:400},children:e(s,{type:"number"})}),e(r.Item,{label:"No of available quantities",name:"available_qty",style:{width:400},children:e(s,{type:"number"})}),e(r.Item,{label:"Taxes",valuePropName:"yes",name:"tax",children:e(re,{checked:h,onChange:t=>A(t.target.checked),children:"VAT"})})]})]})]})})]})};export{ct as default};