import{b as e,j as a}from"./index.559c1fcf.js";import{F as t}from"./index.d3e6f2d0.js";import{C as s}from"./index.4fb68f20.js";import{I as i}from"./index.99653d62.js";import{B as l}from"./button.c49f6243.js";import"./index.02299b94.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./useMergedState.e59004d6.js";import"./collapse.4ef0eee8.js";import"./LoadingOutlined.65af6f9d.js";import"./row.1adc50e8.js";import"./useFlexGapSupport.39a8fd32.js";import"./responsiveObserve.0df24820.js";import"./Dropdown.40e49efe.js";import"./Overflow.0ae650b7.js";import"./index.800256bd.js";import"./PlusOutlined.c65b7533.js";import"./index.e42cc673.js";import"./Compact.e0a86bbb.js";import"./TextArea.8f7e52a8.js";import"./statusUtils.8e955008.js";import"./EyeOutlined.acaf92f0.js";import"./SearchOutlined.1243ca95.js";const p="_container_16xqw_1",d="_search_inputs_16xqw_7",h="_price_container_16xqw_19",u="_search_btn_16xqw_53",r={container:p,search_inputs:d,price_container:h,search_btn:u},H=()=>{const[n]=t.useForm(),m=o=>{console.log("Success:",o)},c=o=>{console.log("Failed:",o)};return e("div",{className:r.container,children:e(s,{bordered:!0,children:e(t,{layout:"vertical",form:n,className:r.form,name:"basic",wrapperCol:{},onFinish:m,onFinishFailed:c,autoComplete:"off",children:a("div",{className:r.search_inputs,children:[e(t.Item,{id:"customer",label:"Customer",name:"customer",children:e(i,{type:"text"})}),e(t.Item,{id:"email",label:"E-mail",name:"email",children:e(i,{type:"email"})}),a("div",{children:[e("label",{children:"Quality"}),a("div",{className:r.price_container,children:[e(t.Item,{id:"quality-min",name:"quality-min",style:{width:"80px"},children:e(i,{type:"number"})})," ",e(t.Item,{children:"-"}),e(t.Item,{id:"quality-max",name:"quality-max",style:{width:"80px"},children:e(i,{type:"number"})})]})]}),e("a",{href:"#",style:{float:"right"},children:" Advanced search"}),e(t.Item,{className:r.search_btn,children:e(l,{htmlType:"submit",children:"Search"})})]})})})})};export{H as default};