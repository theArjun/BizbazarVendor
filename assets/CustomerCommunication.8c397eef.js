import{r as i,j as u,b as m}from"./index.774ea3ea.js";import{p as I,q as S}from"./index.ed194364.js";import{g as j}from"./MessageCenterApi.05764445.js";import{u as M}from"./useDebounce.1afc85d0.js";import{B as s}from"./Breadcrumb.97460a59.js";import"./apiConfig.2a32373e.js";import"./axios.0a901153.js";import"./config.54eb1656.js";import"./render.66f9535e.js";import"./useNotification.934e0e3b.js";import"./useInfiniteQuery.esm.23b2a444.js";import"./useQuery.esm.ae6f238b.js";import"./utils.esm.82fab7d4.js";import"./useMutation.esm.c151e619.js";import"./dropdown.adcd444c.js";import"./RightOutlined.e389cfa8.js";import"./Dropdown.9bafc5f9.js";import"./useMergedState.18b5b371.js";import"./Overflow.bc908490.js";import"./index.40d7e5d1.js";import"./motion.300408ad.js";import"./isEqual.4659e5de.js";import"./PurePanel.f27248d0.js";import"./index.26751f43.js";import"./collapse.bedc836d.js";import"./button.1c6eda25.js";import"./Compact.c162d62d.js";import"./LoadingOutlined.732e1375.js";import"./useFlexGapSupport.f6cd5e9f.js";import"./DownOutlined.719ce519.js";const P={time_from:"",time_to:"",customer_name:""},ot=()=>{const[a,g]=i.exports.useState(P),[p,d]=i.exports.useState(!1),{data:o,isLoading:l,fetchNextPage:f,isFetchingNextPage:h}=j(a);let C=i.exports.useMemo(()=>{var r;let t=[];return(r=o==null?void 0:o.pages)==null||r.map(e=>{var n,c;(c=Object.values(((n=e==null?void 0:e.data)==null?void 0:n.threads)||{}))==null||c.map(b=>{t.push(b)})}),t||[]},[o]);const x=t=>{const r=t.target.scrollTop+t.target.offsetHeight+100>t.target.scrollHeight;d(r)};return M(()=>{!p||f()},300,[p]),u("div",{children:[u(s,{children:[m(s.Item,{children:"Message Center"}),m(s.Item,{children:"Customer Communications"})]}),m(I,{setParams:g,params:a}),m(S,{loading:l||h,handleScroll:x,data:C})]})};export{ot as default};
