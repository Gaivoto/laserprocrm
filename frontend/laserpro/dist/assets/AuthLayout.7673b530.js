import{g as s}from"./assets.29d3af1e.js";import{L as n}from"./LayoutService.7cf1699c.js";import{u as l}from"./body.e0fe2c26.js";import{f as a,o as d,_ as r,j as c,k as p,l as u,m as o,A as _}from"./index.2ac018d5.js";const m=a({name:"auth-layout",components:{},methods:{openModal(e){this.$emit("open-modal",e)}},setup(){const e=l();return d(()=>{n.emptyElementClassesAndAttributes(document.body),e.addBodyClassname("app-blank"),e.addBodyClassname("bg-body")}),{getAssetPath:s}}});const i={class:"d-flex flex-column flex-lg-row flex-column-fluid"},f={class:"d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1 login"},x={class:"d-flex flex-center flex-column flex-lg-row-fluid"},y={class:"w-lg-500px p-10"};function g(e,h,v,w,A,B){const t=c("router-view");return p(),u("div",i,[o("div",f,[o("div",x,[o("div",y,[_(t,{onOpenModal:e.openModal},null,8,["onOpenModal"])])])])])}const k=r(m,[["render",g],["__scopeId","data-v-85439e32"]]);export{k as default};