import{r as s,ao as N,b as e,a$ as S,j as n}from"./index.4f23c09f.js";import{A as d}from"./apiConfig.6fee151b.js";import{u as v}from"./useQuery.esm.48f464b8.js";import{u as x}from"./useMutation.esm.62dcf3b9.js";import{n as l}from"./config.93562c2e.js";import T from"./Logo.e1b6bd2f.js";import{B as p}from"./Breadcrumb.1fc5972d.js";import{B as C}from"./button.0e0bb488.js";import"./axios.0a901153.js";import"./utils.esm.958af8f4.js";import"./render.a21f8e67.js";import"./useNotification.ddc3cd5c.js";import"./index.esm.476cd3ce.js";import"./ImageUploaderForPromotion.887a7f02.js";import"./index.87e32118.js";import"./index.7a8128c4.js";import"./motion.9212238f.js";import"./isEqual.5405dd52.js";import"./useMergedState.a9c803d6.js";import"./collapse.7fea9198.js";import"./LoadingOutlined.ad18cc7b.js";import"./row.dbcb11e5.js";import"./useFlexGapSupport.3166aa6c.js";import"./responsiveObserve.16c01648.js";import"./index.9a953548.js";import"./pickAttrs.08767335.js";import"./useForceUpdate.f84be2ca.js";import"./EyeOutlined.ac35e31d.js";import"./progress.cd81fb2e.js";import"./CheckOutlined.a5fb0c39.js";import"./index.2716beec.js";import"./index.ba3281eb.js";import"./PlusOutlined.1693ec3e.js";import"./index.334a4467.js";import"./index.2687a7e4.js";import"./Compact.8d51645f.js";import"./TextArea.5556322f.js";import"./index.04eab99a.js";import"./statusUtils.c3240a4a.js";import"./SearchOutlined.19f92cba.js";import"./dropdown.c5450427.js";import"./RightOutlined.dab7e2a3.js";import"./Dropdown.af716b86.js";import"./Overflow.1804b708.js";import"./PurePanel.01378a58.js";import"./DownOutlined.72f23fd5.js";const D="_container_1t1nx_1",j="_breadcrumb_create_btn_1t1nx_23",i={container:D,breadcrumb_create_btn:j},A=()=>v({queryKey:["themes"],queryFn:()=>d.get("Themes")}),B=()=>x({mutationFn:t=>d.post("Themes",t),onSuccess:t=>{l.success({message:"Theme updated successfully!"})},onError:t=>{l.error({message:"Failed to update",description:t.message})}}),F={removed_image_pair_ids:{},logotypes_image_data:{theme:{type:"M",object_id:"145",image_alt:"Hello"},mail:{type:"M",object_id:"125",image_alt:"Hello"}},file_logotypes_image_icon:{theme:"",mail:""},type_logotypes_image_icon:{theme:"local",mail:"local"},is_high_res_logotypes_image_icon:{theme:"N",mail:"N"}},xe=()=>{const{isLoading:t,data:o}=A(),{isLoading:u,mutate:_}=B(),[c,g]=s.exports.useState(F),[m,h]=s.exports.useState(""),[a,y]=s.exports.useState(""),r=new FormData,b=N(),f=()=>{if(o)return o==null?void 0:o.data},I=()=>e(T,{sellerData:f(),logoData:c,setLogoData:g,customerImage:m,setCustomerImage:h,invoiceImage:a,setInvoiceImage:y}),L=()=>{r.append("themes_data",JSON.stringify(c)),m&&r.append("theme",m),a&&r.append("mail",a),_(r,{onSuccess:()=>{b.invalidateQueries(["themes"])}})};return t||u?e(S,{}):n("div",{className:i.container,children:[n("div",{className:i.breadcrumb_create_btn,children:[e("div",{className:i.breadcrumb,children:n(p,{children:[e(p.Item,{children:"Home"}),e(p.Item,{children:e("a",{href:"",children:"Logos and styles"})})]})}),e(C,{type:"primary",onClick:L,children:"Save Changes"})]}),e("div",{className:i.logos_and_style_body,children:I()})]})};export{xe as default};
