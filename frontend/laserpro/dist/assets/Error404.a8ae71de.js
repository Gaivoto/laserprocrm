import{g as o,a as r}from"./assets.dd6f9e4a.js";import{L as n}from"./LayoutService.0c55a4b2.js";import{u as d}from"./body.14adfb28.js";import{f as c,al as l,o as m,_ as i,j as u,k as h,l as p,m as e,A as _,w as f,J as g}from"./index.3c1e3b15.js";const b=c({name:"error-404",components:{},setup(){const t=d(),s=l.value!=="dark"?o("media/auth/bg1.jpg"):o("media/auth/bg1-dark.jpg");return m(()=>{n.emptyElementClassesAndAttributes(document.body),t.addBodyClassname("bg-body"),t.addBodyAttribute({qualifiedName:"style",value:`background-image: url("${s}")`})}),{getIllustrationsPath:r,bgImage:s,getAssetPath:o}}}),x={class:"d-flex flex-column flex-center flex-column-fluid"},y={class:"d-flex flex-column flex-center text-center p-10"},v={class:"card card-flush w-lg-650px py-5"},k={class:"card-body py-15 py-lg-20"},w=e("h1",{class:"fw-bolder fs-2hx text-gray-900 mb-4"},"Oops!",-1),A=e("div",{class:"fw-semibold fs-6 text-gray-500 mb-7"}," We can't find that page. ",-1),B={class:"mb-3"},C=["src"],$=["src"],N={class:"mb-0"};function P(t,s,j,E,V,I){const a=u("router-link");return h(),p("div",x,[e("div",y,[e("div",v,[e("div",k,[w,A,e("div",B,[e("img",{src:t.getAssetPath("media/auth/404-error.png"),class:"mw-100 mh-300px theme-light-show",alt:""},null,8,C),e("img",{src:t.getAssetPath("media/auth/404-error-dark.png"),class:"mw-100 mh-300px theme-dark-show",alt:""},null,8,$)]),e("div",N,[_(a,{to:"/",class:"btn btn-sm btn-primary"},{default:f(()=>[g("Return Home")]),_:1})])])])])])}const H=i(b,[["render",P]]);export{H as default};
