import{b as e,j as l}from"./index.559c1fcf.js";import{F as o}from"./index.d3e6f2d0.js";import{C as h}from"./index.4fb68f20.js";import{I as t}from"./index.99653d62.js";import"./index.02299b94.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./useMergedState.e59004d6.js";import"./collapse.4ef0eee8.js";import"./LoadingOutlined.65af6f9d.js";import"./row.1adc50e8.js";import"./useFlexGapSupport.39a8fd32.js";import"./responsiveObserve.0df24820.js";import"./Dropdown.40e49efe.js";import"./Overflow.0ae650b7.js";import"./index.800256bd.js";import"./PlusOutlined.c65b7533.js";import"./index.e42cc673.js";import"./Compact.e0a86bbb.js";import"./TextArea.8f7e52a8.js";import"./statusUtils.8e955008.js";import"./EyeOutlined.acaf92f0.js";import"./SearchOutlined.1243ca95.js";import"./button.c49f6243.js";const _="_container_1fvne_1",d="_search_inputs_1fvne_7",u="_price_container_1fvne_21",f="_search_btn_1fvne_55",n={container:_,search_inputs:d,price_container:u,search_btn:f},K=({setSearchValue:i})=>{const[a]=o.useForm(),m=r=>{console.log("Success:",r)},s=r=>{console.log("Failed:",r)},c=(r,p)=>{i(p)};return e("div",{className:n.container,children:e(h,{bordered:!0,children:e(o,{layout:"vertical",form:a,className:n.form,name:"basic",onValuesChange:c,wrapperCol:{},onFinish:m,onFinishFailed:s,autoComplete:"off",children:l("div",{className:n.search_inputs,children:[e(o.Item,{id:"id",label:"ID",name:"id",children:e(t,{type:"text"})}),e(o.Item,{id:"name",label:"Name",name:"name",children:e(t,{type:"name"})}),e(o.Item,{id:"phone",label:"Phone",name:"phone",children:e(t,{type:"tel"})})]})})})})};export{K as default};