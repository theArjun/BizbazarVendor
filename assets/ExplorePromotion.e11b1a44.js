import{u as h,r,b as s,b0 as c,a$ as i}from"./index.b239cc55.js";import{t as B,u as b}from"./index.b6374920.js";import{c as k}from"./PromotionApi.ec92f311.js";import{B as E}from"./button.1e90f6e6.js";import"./apiConfig.446075fe.js";import"./axios.0a901153.js";import"./config.79883511.js";import"./render.1622182d.js";import"./useNotification.49a3f20c.js";import"./useMutation.esm.61ea1354.js";import"./utils.esm.408cb86b.js";import"./useInfiniteQuery.esm.0432f70d.js";import"./useQuery.esm.3c1c4f21.js";import"./Compact.d9f155a2.js";import"./LoadingOutlined.97101298.js";const V=()=>{var n,m;const l=JSON.parse(localStorage.getItem("userinfo")),f=h(),[e,d]=r.exports.useState(""),[g,x]=r.exports.useState(""),{isLoading:a,isError:P,error:o,data:t}=k(f.id);r.exports.useEffect(()=>{S()},[t]);const S=async()=>{var p,u;try{((p=t==null?void 0:t.data)==null?void 0:p.promotions.length)==0&&x(t==null?void 0:t.status),d((u=t==null?void 0:t.data)==null?void 0:u.promotions[0])}catch(y){console.log("something went wrong, ",y)}};return P?s(c,{status:(n=o==null?void 0:o.response)==null?void 0:n.status,title:(m=o==null?void 0:o.response)==null?void 0:m.status,subTitle:o==null?void 0:o.message,extra:s(E,{type:"primary",onClick:()=>navigate("/"),children:"Back Home"})}):g?s(c,{status:"404",title:"404",subTitle:"Sorry, Requested promotion does not found !",extra:s("a",{href:"/",children:"Back Home"})}):a?s(i,{}):(e==null?void 0:e.company_id)==l.id?e?s(B,{data:e}):s(i,{}):e?s(b,{data:e,loading:a}):s(i,{})};export{V as default};