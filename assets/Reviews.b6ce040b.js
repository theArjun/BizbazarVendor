import{r as o,j as a,b as e}from"./index.559c1fcf.js";import{n as R,o as b}from"./index.cfd97402.js";import{s as j}from"./Reviews.module.3fc73c85.js";import{a as S}from"./apicall.a45120ef.js";import{u as y}from"./useDebounce.34ba1d43.js";import{B as i}from"./Breadcrumb.a0c48c79.js";import"./axios.0a901153.js";import"./config.d6ac9ea8.js";import"./render.6e9f9fbc.js";import"./useNotification.530e6546.js";import"./dropdown.496de808.js";import"./RightOutlined.6508ce6f.js";import"./Dropdown.40e49efe.js";import"./useMergedState.e59004d6.js";import"./Overflow.0ae650b7.js";import"./index.800256bd.js";import"./motion.c94e2116.js";import"./isEqual.5b0c1f76.js";import"./PurePanel.4b452415.js";import"./index.02299b94.js";import"./collapse.4ef0eee8.js";import"./button.c49f6243.js";import"./Compact.e0a86bbb.js";import"./LoadingOutlined.65af6f9d.js";import"./useFlexGapSupport.39a8fd32.js";import"./DownOutlined.218b67e6.js";const X=()=>{const[s,c]=o.exports.useState({}),[n,f]=o.exports.useState([]),[d,m]=o.exports.useState(!1),h=Object.values(s).join("");o.exports.useEffect(()=>{p()},[]);const p=async t=>{m(!0);let r=await S({url:g(t)});r!=null&&r.data?(m(!1),f(Object.values(r.data.reviews).map((w,x)=>({...w,key:x})))):m(!1)},g=t=>{let r="ProductReview?";return t!=null&&t.customer&&(r=r+"name="+t.customer),t!=null&&t.rating&&(r=r+"&rating="+t.rating),t!=null&&t.message&&(r=r+"&message="+t.message),t!=null&&t.photo&&(r=r+"&has_images="+t.photo),r};return y(()=>{p(s)},500,[h]),a("div",{className:j.container,children:[a(i,{children:[e(i.Item,{children:"Home"}),e(i.Item,{children:e("a",{href:"",children:"Products"})}),e(i.Item,{children:"Reviews"})]}),e(R,{setSearchValue:c}),e(b,{loading:d,reviews:n})]})};export{X as default};