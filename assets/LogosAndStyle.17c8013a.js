import{r as s,ao as N,b as e,a$ as S,j as n}from"./index.559c1fcf.js";import{A as d}from"./apiConfig.819e96ae.js";import{u as v}from"./useQuery.esm.484a4dde.js";import{u as x}from"./useMutation.esm.3622c9ad.js";import{n as l}from"./config.d6ac9ea8.js";import T from"./Logo.681c51d8.js";import{B as p}from"./Breadcrumb.a0c48c79.js";import{B as C}from"./button.c49f6243.js";import"./axios.0a901153.js";import"./utils.esm.f9fc2da8.js";import"./render.6e9f9fbc.js";import"./useNotification.530e6546.js";import"./index.esm.267eb871.js";import"./ImageUploaderForPromotion.f2f21912.js";import"./index.d3e6f2d0.js";import"./index.02299b94.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./useMergedState.e59004d6.js";import"./collapse.4ef0eee8.js";import"./LoadingOutlined.65af6f9d.js";import"./row.1adc50e8.js";import"./useFlexGapSupport.39a8fd32.js";import"./responsiveObserve.0df24820.js";import"./index.3e88b7ea.js";import"./pickAttrs.09e8e693.js";import"./useForceUpdate.3743a744.js";import"./EyeOutlined.acaf92f0.js";import"./progress.846f0c77.js";import"./CheckOutlined.61030fcd.js";import"./index.e5e0e49c.js";import"./index.38297928.js";import"./PlusOutlined.c65b7533.js";import"./index.99653d62.js";import"./index.e42cc673.js";import"./Compact.e0a86bbb.js";import"./TextArea.8f7e52a8.js";import"./index.800256bd.js";import"./statusUtils.8e955008.js";import"./SearchOutlined.1243ca95.js";import"./dropdown.496de808.js";import"./RightOutlined.6508ce6f.js";import"./Dropdown.40e49efe.js";import"./Overflow.0ae650b7.js";import"./PurePanel.4b452415.js";import"./DownOutlined.218b67e6.js";const D="_container_1t1nx_1",j="_breadcrumb_create_btn_1t1nx_23",i={container:D,breadcrumb_create_btn:j},A=()=>v({queryKey:["themes"],queryFn:()=>d.get("Themes")}),B=()=>x({mutationFn:t=>d.post("Themes",t),onSuccess:t=>{l.success({message:"Theme updated successfully!"})},onError:t=>{l.error({message:"Failed to update",description:t.message})}}),F={removed_image_pair_ids:{},logotypes_image_data:{theme:{type:"M",object_id:"145",image_alt:"Hello"},mail:{type:"M",object_id:"125",image_alt:"Hello"}},file_logotypes_image_icon:{theme:"",mail:""},type_logotypes_image_icon:{theme:"local",mail:"local"},is_high_res_logotypes_image_icon:{theme:"N",mail:"N"}},xe=()=>{const{isLoading:t,data:o}=A(),{isLoading:u,mutate:_}=B(),[c,g]=s.exports.useState(F),[m,h]=s.exports.useState(""),[a,y]=s.exports.useState(""),r=new FormData,b=N(),f=()=>{if(o)return o==null?void 0:o.data},I=()=>e(T,{sellerData:f(),logoData:c,setLogoData:g,customerImage:m,setCustomerImage:h,invoiceImage:a,setInvoiceImage:y}),L=()=>{r.append("themes_data",JSON.stringify(c)),m&&r.append("theme",m),a&&r.append("mail",a),_(r,{onSuccess:()=>{b.invalidateQueries(["themes"])}})};return t||u?e(S,{}):n("div",{className:i.container,children:[n("div",{className:i.breadcrumb_create_btn,children:[e("div",{className:i.breadcrumb,children:n(p,{children:[e(p.Item,{children:"Home"}),e(p.Item,{children:e("a",{href:"",children:"Logos and styles"})})]})}),e(C,{type:"primary",onClick:L,children:"Save Changes"})]}),e("div",{className:i.logos_and_style_body,children:I()})]})};export{xe as default};
