import{b as r,j as o}from"./index.b239cc55.js";import{C as a}from"./index.cd55466f.js";import{T as s}from"./index.86e696da.js";import"./index.d91339a4.js";import"./CheckOutlined.bf68ea45.js";import"./index.282ea7d3.js";import"./useMergedState.a28f7e87.js";import"./styleChecker.98fd75c2.js";import"./index.4bbb7811.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./TextArea.6c3ac8fe.js";import"./statusUtils.ab472cb9.js";import"./Compact.d9f155a2.js";import"./index.2d340b5d.js";const l="_wrap_33oc7_1",p="_container_33oc7_13",_="_title_33oc7_37",h="_section_33oc7_51",i={wrap:l,container:p,title:_,section:h},{Text:n}=s,A=({setSingleShipment:t,singleShipment:e})=>r("div",{className:i.wrap,children:o("div",{className:i.container,children:[r("h3",{children:"Pricing"}),r("div",{}),o("div",{className:i.section,children:[r("label",{children:"Taxes:"})," ",o("div",{children:[" ",r(a,{checked:(e==null?void 0:e.tax_ids[0])==="6",onChange:d=>{let c={...e};d.target.checked?c.tax_ids=["6"]:c.tax_ids=[],t(c)},children:"VAT"})]})]}),o("div",{className:i.section,children:[r("label",{children:"Use for free shipping:"})," ",o("div",{children:[r(a,{checked:(e==null?void 0:e.free_shipping)==="Y",onChange:d=>{let c={...e};d.target.checked?c.free_shipping="Y":c.free_shipping="N",t(c)}}),r("br",{}),r(n,{type:"secondary",children:"Exclude products with the enabled Free shipping option from the shipping price calculation"})]})]}),r("h3",{children:"Customer information"}),o("div",{className:i.section,children:[r("label",{children:"Customer must specify his/her address:"})," ",o("div",{style:{display:"flex"},children:[r(a,{checked:(e==null?void 0:e.is_address_required)==="Y",onChange:d=>{let c={...e};d.target.checked?c.is_address_required="Y":c.is_address_required="N",t(c)}}),r("div",{})]})]})]})});export{A as default};
