import{r as o,a as b,b as t,a$ as k,j as a}from"./index.559c1fcf.js";import{A as B,f as x}from"./index.cfd97402.js";import{a as A}from"./ProductApi.fe19781a.js";import{u as v}from"./CategoryApi.971b319f.js";import{B as s}from"./Breadcrumb.a0c48c79.js";import{B as y}from"./button.c49f6243.js";import"./apiConfig.819e96ae.js";import"./axios.0a901153.js";import"./config.d6ac9ea8.js";import"./render.6e9f9fbc.js";import"./useNotification.530e6546.js";import"./useMutation.esm.3622c9ad.js";import"./utils.esm.f9fc2da8.js";import"./useInfiniteQuery.esm.273cbf80.js";import"./useQuery.esm.484a4dde.js";import"./dropdown.496de808.js";import"./RightOutlined.6508ce6f.js";import"./Dropdown.40e49efe.js";import"./useMergedState.e59004d6.js";import"./Overflow.0ae650b7.js";import"./index.800256bd.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./PurePanel.4b452415.js";import"./index.02299b94.js";import"./collapse.4ef0eee8.js";import"./Compact.e0a86bbb.js";import"./useFlexGapSupport.39a8fd32.js";import"./DownOutlined.218b67e6.js";import"./LoadingOutlined.65af6f9d.js";const C="_bulk_addition_container_20wkf_1",P="_title_section_20wkf_7",n={bulk_addition_container:C,title_section:P},ot=()=>{const[r,d]=o.exports.useState([]),[p,c]=o.exports.useState(!0),l=b(),{data:i,isLoading:u}=v(),{mutate:f,isLoading:_}=A();o.exports.useEffect(()=>{r.length?c(!1):c(!0)},[r]);let m=o.exports.useMemo(()=>{var e;return i!=null&&i.data?(e=i==null?void 0:i.data)==null?void 0:e.categories:[]},[i]);const h=async e=>{if(e.length){let g={products_data:[...e]};f(g,{onSuccess:L=>{l("../products")}})}};return u?t(k,{}):a("div",{className:n.bulk_addition_container,children:[t("div",{className:n.breadcrumb_container,children:a(s,{children:[t(s.Item,{children:"Home"}),t(s.Item,{children:t("a",{href:"/products/Products",children:"Products"})}),t(s.Item,{children:"BulkProductAddition"})]})}),a("section",{className:n.title_section,children:[t("h3",{children:"Add products"}),t(y,{loading:_,disabled:p,type:"primary",onClick:()=>h(r),children:"Create"})]}),t(B,{categories:m,setProducts:d,products:r}),t("div",{children:t(x,{products:r,setProducts:d,categories:m})})]})};export{ot as default};