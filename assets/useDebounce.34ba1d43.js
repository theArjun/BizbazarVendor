import{r as e}from"./index.559c1fcf.js";function n(s,u){const c=e.exports.useRef(s),t=e.exports.useRef();e.exports.useEffect(()=>{c.current=s},[s]);const r=e.exports.useCallback(()=>{t.current=setTimeout(()=>c.current(),u)},[u]),o=e.exports.useCallback(()=>{t.current&&clearTimeout(t.current)},[]);return e.exports.useEffect(()=>(r(),o),[u,r,o]),{reset:e.exports.useCallback(()=>{o(),r()},[o,r]),clear:o}}function x(s,u,c){const{reset:t,clear:r}=n(s,u);e.exports.useEffect(t,[...c,t]),e.exports.useEffect(r,[])}export{x as u};