import{A as r}from"./apiConfig.819e96ae.js";import{u as s}from"./useMutation.esm.3622c9ad.js";import{n as a}from"./config.d6ac9ea8.js";const m=()=>s({mutationFn:o=>r.post("ImageUploads",o),onError:o=>{a.error({message:"Error!",description:o.message})}});export{m as u};