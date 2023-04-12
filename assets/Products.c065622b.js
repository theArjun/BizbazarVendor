import{r as a,a as R,b as t,b0 as j,j as m,bq as G}from"./index.b239cc55.js";import{a as B}from"./index.esm.681134e4.js";import{P as D,e as F}from"./index.b6374920.js";import{u as z}from"./ProductApi.eb176513.js";import{u as O}from"./useDebounce.d6117fcd.js";import{u as J}from"./CategoryApi.d1c14213.js";import{B as K}from"./button.1e90f6e6.js";import{R as Q,C as x}from"./row.7108879f.js";import{B as l}from"./Breadcrumb.d9f90a7e.js";import{D as U}from"./dropdown.989042eb.js";import"./apiConfig.446075fe.js";import"./axios.0a901153.js";import"./config.79883511.js";import"./render.1622182d.js";import"./useNotification.49a3f20c.js";import"./useMutation.esm.61ea1354.js";import"./utils.esm.408cb86b.js";import"./useInfiniteQuery.esm.0432f70d.js";import"./useQuery.esm.3c1c4f21.js";import"./Compact.d9f155a2.js";import"./LoadingOutlined.97101298.js";import"./useFlexGapSupport.1cb3c05a.js";import"./responsiveObserve.99027935.js";import"./DownOutlined.69351dd6.js";import"./RightOutlined.47ed9d6c.js";import"./Dropdown.3bbb202b.js";import"./useMergedState.a28f7e87.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./PurePanel.ffcb695e.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";const V="_container_q39q6_1",W="_icons_q39q6_23",X="_icons1_q39q6_35",Y="_save_btn_q39q6_47",Z="_new_add_btn_q39q6_55",$="_productAsset_q39q6_103",tt="_dropdown_setting_q39q6_113",et="_openSearch_q39q6_139",ot="_closeSearch_q39q6_149",rt="_search_btn_q39q6_155",st="_forMargin_q39q6_195",n={container:V,icons:W,icons1:X,save_btn:Y,new_add_btn:Z,productAsset:$,dropdown_setting:tt,openSearch:et,closeSearch:ot,search_btn:rt,forMargin:st};const at={product_name:"",price_from:"",price_to:"",category:"",status:"",sort_order:"",sort_by:""},Dt=()=>{var f,g;const[P,S]=a.exports.useState([]),[_,k]=a.exports.useState(!1),[e,N]=a.exports.useState(""),[w,A]=a.exports.useState(""),d=R(),[u,h]=a.exports.useState(at),{data:c,isLoading:C}=J(),{data:p,isLoading:y,isFetchingNextPage:v,fetchNextPage:I,isError:L,error:r}=z(u);a.exports.useEffect(()=>{var i;let o=[];(i=p==null?void 0:p.pages)==null||i.map(s=>{var b,q;(q=(b=s==null?void 0:s.data)==null?void 0:b.products)==null||q.map(E=>{o.push(E)})}),S(o||[])},[p]);let M=a.exports.useMemo(()=>{var o;return c!=null&&c.data?(o=c==null?void 0:c.data)==null?void 0:o.categories:[]},[c]);const T=o=>{const i=o.target.scrollTop+o.target.offsetHeight+100>o.target.scrollHeight;k(i)};a.exports.useEffect(()=>{let o={...u};if(e!=null&&e.order){const i=(e==null?void 0:e.order)==="ascend"?"asc":"desc";o.sort_order=i;let s="";switch(e==null?void 0:e.field){case"price":s="price";break;case"amount":s="amount";break}(e==null?void 0:e.field[1])==="product"&&(s="product"),o.sort_by=s}h(o)},[e]),O(()=>{!_||I()},300,[_]);const H=[{key:"1",label:t("a",{target:"_blank",rel:"noopener noreferrer",href:"/products/products/delete",children:"Global update"})},{key:"2",label:t("a",{onClick:()=>d("../BulkProductAddition"),className:n.action_items,children:"Bulk product addition"})},{key:"3",label:t("a",{onClick:()=>d("../ProductsOnModeration"),className:n.action_items,children:"Product on moderation"})},{key:"4",label:t("a",{target:"_blank",rel:"noopener noreferrer",href:"/products/products/delete",className:n.action_items,children:"Export found products"})}];return L?t(j,{status:(f=r==null?void 0:r.response)==null?void 0:f.status,title:(g=r==null?void 0:r.response)==null?void 0:g.status,subTitle:r==null?void 0:r.message,extra:t(K,{type:"primary",onClick:()=>d("/"),children:"Back Home"})}):m("div",{className:n.container,children:[t("div",{className:"product_header",children:m(Q,{children:[t(x,{span:8,children:m(l,{children:[t(l.Item,{children:"Home"}),t(l.Item,{children:t("a",{href:"",children:"Products"})}),t(l.Item,{children:"Products"})]})}),t(x,{span:8,offset:8,children:m("div",{className:n.productAsset,children:[t(U,{menu:{items:H},className:n.dropdown_setting,arrow:!0,trigger:["click"],children:t(B,{className:n.icons1})}),t("div",{className:n.new_add_btn,onClick:()=>d("Add Product"),children:t(G,{style:{margin:0,padding:0},size:20})})]})})]})}),t(D,{params:u,categories:M,setParams:h}),t(F,{handleScroll:T,products:P,setSortBy:N,sortColum:w,setSortingColum:A,loading:y||v||C})]})};export{Dt as default};