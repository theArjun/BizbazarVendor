import{r as B,j as _,b as o}from"./index.559c1fcf.js";import{i as l}from"./index.esm.267eb871.js";import{I as N}from"./ImageUploaderForPromotion.f2f21912.js";import{I as x}from"./index.99653d62.js";import"./index.d3e6f2d0.js";import"./index.02299b94.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./useMergedState.e59004d6.js";import"./collapse.4ef0eee8.js";import"./LoadingOutlined.65af6f9d.js";import"./row.1adc50e8.js";import"./useFlexGapSupport.39a8fd32.js";import"./responsiveObserve.0df24820.js";import"./index.3e88b7ea.js";import"./pickAttrs.09e8e693.js";import"./button.c49f6243.js";import"./Compact.e0a86bbb.js";import"./useForceUpdate.3743a744.js";import"./EyeOutlined.acaf92f0.js";import"./progress.846f0c77.js";import"./CheckOutlined.61030fcd.js";import"./index.e5e0e49c.js";import"./render.6e9f9fbc.js";import"./index.38297928.js";import"./PlusOutlined.c65b7533.js";import"./index.e42cc673.js";import"./TextArea.8f7e52a8.js";import"./index.800256bd.js";import"./statusUtils.8e955008.js";import"./SearchOutlined.1243ca95.js";const C="_logo_title_1ni00_1",e={logo_title:C},ei=({sellerData:i,logoData:t,setLogoData:d,customerImage:I,setCustomerImage:a,invoiceImage:j,setInvoiceImage:b})=>{var g,n,c,h;const r=m=>{var p;return m?[{uid:"0",name:"theme_logo.png",status:"done",url:(p=m==null?void 0:m.image)==null?void 0:p.image_path,image_id:m==null?void 0:m.logo_id}]:[]};B.exports.useEffect(()=>{z()},[i]);const z=()=>{var p,s,y,v,u,f;let m={...t};m.logotypes_image_data.theme.image_alt=(s=(p=i==null?void 0:i.theme)==null?void 0:p.image)==null?void 0:s.alt,m.logotypes_image_data.mail.image_alt=(v=(y=i==null?void 0:i.mail)==null?void 0:y.image)==null?void 0:v.alt,m.logotypes_image_data.theme.object_id=(u=i==null?void 0:i.theme)==null?void 0:u.logo_id,m.logotypes_image_data.mail.object_id=(f=i==null?void 0:i.mail)==null?void 0:f.logo_id,d(m)};return _("div",{className:e.logos,children:[_("div",{className:e.logo_container,children:[o("div",{className:e.logo_title,children:o("h4",{children:"Site logo"})}),_("div",{className:e.logo_image,children:[" ",o(N,{imageList:r(i==null?void 0:i.theme),image:I,setImage:a,logoData:t,setLogoData:d})]}),o("div",{className:e.logo_company,children:o(x,{style:{maxWidth:"300px"},addonBefore:o(l,{size:20,color:"gray"}),value:(n=(g=t==null?void 0:t.logotypes_image_data)==null?void 0:g.theme)==null?void 0:n.image_alt,onChange:m=>{let p={...t};p.logotypes_image_data.theme.image_alt=m.target.value,d(p)}})})]}),o("div",{}),_("div",{className:e.logo_container,children:[o("div",{className:e.logo_title,children:o("h4",{children:"Email logo"})}),_("div",{className:e.logo_image,children:[" ",o(N,{imageList:r(i==null?void 0:i.mail),image:j,setImage:b,logoData:t,setLogoData:d})]}),o("div",{className:e.logo_company,children:o(x,{style:{maxWidth:"300px"},addonBefore:o(l,{size:20,color:"gray"}),value:(h=(c=t==null?void 0:t.logotypes_image_data)==null?void 0:c.mail)==null?void 0:h.image_alt,onChange:m=>{let p={...t};p.logotypes_image_data.mail.image_alt=m.target.value,d(p)}})})]})]})};export{ei as default};