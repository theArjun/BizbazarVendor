import{r as d,a as z,aU as K,ao as Q,b as o,b0 as F,j as l,X as G}from"./index.b239cc55.js";import{u as U,a as V,b as W}from"./PromotionApi.ec92f311.js";import{u as X}from"./useDebounce.d6117fcd.js";import{B as h}from"./button.1e90f6e6.js";import{B as b}from"./Breadcrumb.d9f90a7e.js";import{S as Y}from"./index.3c397a1c.js";import{T as Z}from"./Table.4059dce2.js";import{T as p}from"./index.0c91c947.js";import"./apiConfig.446075fe.js";import"./axios.0a901153.js";import"./config.79883511.js";import"./render.1622182d.js";import"./useNotification.49a3f20c.js";import"./useMutation.esm.61ea1354.js";import"./utils.esm.408cb86b.js";import"./useInfiniteQuery.esm.0432f70d.js";import"./useQuery.esm.3c1c4f21.js";import"./Compact.d9f155a2.js";import"./LoadingOutlined.97101298.js";import"./dropdown.989042eb.js";import"./RightOutlined.47ed9d6c.js";import"./Dropdown.3bbb202b.js";import"./useMergedState.a28f7e87.js";import"./Overflow.8b34a4db.js";import"./index.282ea7d3.js";import"./motion.0d7a897e.js";import"./isEqual.21fc3aef.js";import"./PurePanel.ffcb695e.js";import"./index.4bbb7811.js";import"./collapse.4a0a3d30.js";import"./useFlexGapSupport.1cb3c05a.js";import"./DownOutlined.69351dd6.js";import"./pickAttrs.f011bab2.js";import"./statusUtils.ab472cb9.js";import"./CheckOutlined.bf68ea45.js";import"./SearchOutlined.8331e38c.js";import"./styleChecker.98fd75c2.js";import"./css.d6e3059f.js";import"./Pagination.c3c3f66a.js";import"./LeftOutlined.cd9ac35f.js";import"./useForceUpdate.5b188f49.js";import"./responsiveObserve.99027935.js";import"./index.2d340b5d.js";import"./index.cd55466f.js";import"./index.d91339a4.js";import"./index.6bb695c7.js";import"./index.4af21018.js";import"./TextArea.6c3ac8fe.js";import"./EyeOutlined.a43f77a8.js";const J="_container_moat3_1",O="_breadcumb_moat3_17",$="_buttonAddCatalog_moat3_35",tt="_promotion_name_moat3_45",ot="_action_buttons_moat3_51",i={container:J,breadcumb:O,buttonAddCatalog:$,promotion_name:tt,action_buttons:ot};function Ot(){var y,C;const[_,v]=d.exports.useState(!1),[n,x]=d.exports.useState([]),{isLoading:P,mutate:k}=U(),{isLoading:N,mutate:A}=V(),{isLoading:D,data:s,fetchNextPage:H,isFetchingNextPage:I,isError:B,error:a}=W(),u=z(),E=K(),S=Q(),g=t=>{const e=t.target.scrollTop+t.target.offsetHeight+100>t.target.scrollHeight;v(e)};d.exports.useEffect(()=>{var t;return(t=document.querySelector("#product > div > div.ant-table-body"))==null||t.addEventListener("scroll",g),()=>{var e;(e=document.querySelector("#product > div > div.ant-table-body"))==null||e.removeEventListener("scroll",g)}},[g]),X(()=>{!_||H()},300,[_]);let L=d.exports.useMemo(()=>{var e;let t=[];return(e=s==null?void 0:s.pages)==null||e.map(r=>{var m,c;(c=(m=r==null?void 0:r.data)==null?void 0:m.promotions)==null||c.map(q=>{t.push(q)})}),t||[]},[s]);const T=t=>{switch(t){case"H":return o(p,{color:"purple",children:"Hidden"});case"A":return o(p,{color:"green",children:"Active"});case"D":return o(p,{color:"orange",children:"Disabled"});default:return o(p,{color:"magenta",children:"Pending"})}},w=()=>{let e={promotion_ids:{...n.reduce((r,m,c)=>(r[c]=m,r),{})}};k(e,{onSuccess:r=>{S.invalidateQueries(["promotions"]),console.log(r,"promotion updated success")},onError:r=>{console.log("error on updating promotion, ",r)}})},M=t=>{A({table_name:"promotions",status:t,id_name:"promotion_id",ids:n},{onSuccess:r=>{S.invalidateQueries(["promotions"]),console.log(r,"promotion updated success")},onError:r=>{console.log("error on updating promotion, ",r)}})},R=[{title:"Name",key:"name",dataIndex:"name",render:(t,e)=>o(G.Fragment,{children:o("a",{onClick:()=>u("../Marketing/Promotions/"+(e==null?void 0:e.promotion_id)),className:i.promotion_name,children:t})})},{title:"Stop other rules",dataIndex:"stop_other_rules",key:"rules",render:t=>t=="N"?"No":"Yes"},{title:"Priority",dataIndex:"priority",key:"4"},{title:"Zone",dataIndex:"zone",key:"5"},{title:"Status",dataIndex:"status",key:"5",render:t=>o("a",{children:T(t)})}],j={selectedRowKeys:n,onChange:t=>{x(t)}},f=n.length>0;return B?o(F,{status:(y=a==null?void 0:a.response)==null?void 0:y.status,title:(C=a==null?void 0:a.response)==null?void 0:C.status,subTitle:a==null?void 0:a.message,extra:o(h,{type:"primary",onClick:()=>u("/"),children:"Back Home"})}):l("div",{className:i.container,children:[o("div",{className:i.breadcumb,children:l(b,{children:[o(b.Item,{children:"Marketing"}),o(b.Item,{children:o("a",{href:"",children:"Promotions"})})]})}),l("div",{className:i.container,children:[l("div",{className:i.action_buttons,children:[o(h,{disabled:!f,onClick:w,children:"Delete"}),o(Y,{disabled:!f,defaultValue:"Status",style:{width:170},onChange:M,options:[{label:"Change to Active",value:"A"},{label:"Change to Hidden",value:"H"},{label:"Change to Disabled",value:"D"}]})]}),o(Z,{id:"product",rowKey:"promotion_id",rowSelection:j,pagination:!1,loading:D||N||P||I,columns:R,dataSource:L,scroll:{y:E.height>670?500:300,x:700}})]}),o(h,{className:i.buttonAddCatalog,onClick:()=>u("/Marketing/Add Catalog Promotion"),children:"Add Catalog Promotion"})]})}export{Ot as default};
