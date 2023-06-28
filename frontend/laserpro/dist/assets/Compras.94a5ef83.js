import{_ as A,z as k,j as h,k as u,l as _,m as o,A as c,w as f,a6 as $,a4 as v,a5 as w,p as F,F as S,n as y,J as p,x as m,a7 as q,a8 as x,r as E,aj as T,af as O}from"./index.2ac018d5.js";import{D}from"./KTDataTable.65931e92.js";import"./assets.29d3af1e.js";const V={name:"AddCompraModal",components:{},data(){return{formInfo:{fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""},fornecedores:[],materiais:[],fornecedoresFiltered:[],materiaisFiltered:[],fornecedoresSearchOpen:!1,materiaisSearchOpen:!1}},mounted(){this.fornecedores=[],this.materiais=[],this.fornecedoresFiltered=[],this.materiaisFiltered=[],k({method:"get",url:"http://64.225.109.57:4000/api/fornecedores",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.fornecedores.forEach(e=>{e.estado=="Ativo"&&(this.fornecedores.push(e),this.fornecedoresFiltered.push(e))})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)}),k({method:"get",url:"http://64.225.109.57:4000/api/materiais",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.materiais.forEach(e=>{e.estado=="Ativo"&&(this.materiais.push(e),this.materiaisFiltered.push(e))})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},methods:{verifyCompraData(){let t=!1,e=!1;return this.fornecedores.forEach(a=>{a.nome==this.formInfo.fornecedor&&(t=!0,this.formInfo.idFornecedor=a.id)}),this.materiais.forEach(a=>{a.tipo+" "+a.liga+" "+a.acabamento+" "+a.dimensoes==this.formInfo.material&&(e=!0,this.formInfo.idMaterial=a.id)}),this.formInfo.dataUF.length>0&&(this.formInfo.data=this.formInfo.dataUF.split("-")[2]+"-"+this.formInfo.dataUF.split("-")[1]+"-"+this.formInfo.dataUF.split("-")[0]),this.formInfo.fornecedor.length==0||this.formInfo.material.length==0||this.formInfo.quantidade.length==0||this.formInfo.valor.length==0?(this.$emit("open-modal","Preencha todos os campos obrigat\xF3rios."),!1):this.formInfo.quantidade<=0?(this.$emit("open-modal","Introduza uma quantidade v\xE1lida."),!1):this.formInfo.valor<=0?(this.$emit("open-modal","Introduza um pre\xE7o v\xE1lido."),!1):t?e?!0:(this.$emit("open-modal","Introduza um material v\xE1lido da lista."),!1):(this.$emit("open-modal","Introduza um fornecedor v\xE1lido da lista."),!1)},createCompra(){this.verifyCompraData()&&(this.$emit("create-compra",this.formInfo),this.formInfo={fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""})},filterFornecedores(){let t=this.$refs.fornecedorSearchbar.value;this.fornecedoresFiltered=[],this.fornecedores.forEach(e=>{e.nome.includes(t)&&this.fornecedoresFiltered.push(e)})},chooseFornecedor(t){this.formInfo.fornecedor=t,this.fornecedoresSearchOpen=!1},openFornecedores(){this.fornecedoresSearchOpen=!0,this.materiaisSearchOpen=!1,this.filterFornecedores()},filterMateriais(){let t=this.$refs.materialSearchbar.value.split(" ");this.materiaisFiltered=[],this.materiais.forEach(e=>{let a=!0;t.forEach(n=>{e.tipo.includes(n)||e.liga.includes(n)||e.acabamento.includes(n)||e.dimensoes.includes(n)||(a=!1)}),a&&this.materiaisFiltered.push(e)})},chooseMaterial(t){this.formInfo.material=t,this.materiaisSearchOpen=!1},openMateriais(){this.materiaisSearchOpen=!0,this.fornecedoresSearchOpen=!1,this.filterMateriais()},closeSearches(){this.fornecedoresSearchOpen=!1,this.materiaisSearchOpen=!1}}},C=t=>(q("data-v-12997b36"),t=t(),x(),t),R={class:"modal-dialog modal-dialog-centered mw-650px"},z={class:"modal-content"},B={class:"modal-header",id:"kt_modal_add_compra_header"},L=C(()=>o("h2",{class:"fw-bold"},"Criar Compra",-1)),N={id:"kt_modal_add_compra_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary"},W={class:"modal-body py-10 px-lg-17"},P={class:"scroll-y me-n7 pe-7",id:"kt_modal_add_compra_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_customer_header","data-kt-scroll-wrappers":"#kt_modal_add_customer_scroll","data-kt-scroll-offset":"300px"},K={class:"fv-row mb-8"},Q=C(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Fornecedor",-1)),j={class:"searchbar"},H=["onClick"],J={class:"fv-row mb-8"},G=C(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Material",-1)),X={class:"searchbar"},Y=["onClick"],Z={class:"fv-row mb-8"},ee=C(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Pre\xE7o total (\u20AC)",-1)),te={class:"fv-row mb-8"},oe=C(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Quantidade (kg)",-1)),ae={class:"fv-row mb-8"},se=C(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Data",-1)),re={class:"modal-footer flex-center"},ie=C(()=>o("button",{type:"reset",id:"kt_modal_add_compra_cancel",class:"btn btn-light me-3"}," Limpar ",-1));function le(t,e,a,n,r,i){const d=h("KTIcon"),g=h("el-input"),b=h("el-form-item"),M=h("el-form");return u(),_("div",{class:"modal fade",id:"kt_modal_add_compra",ref:"addCompraModalRef",tabindex:"-1","aria-hidden":"true",onClick:e[12]||(e[12]=(...s)=>i.closeSearches&&i.closeSearches(...s))},[o("div",R,[o("div",z,[o("div",B,[L,o("div",N,[c(d,{"icon-name":"cross","icon-class":"fs-1"})])]),c(M,{model:r.formInfo,ref:"formRef"},{default:f(()=>[o("div",W,[o("div",P,[o("div",K,[Q,o("div",{class:"searchbar-container",onClick:e[3]||(e[3]=$(()=>{},["stop"]))},[o("div",j,[v(o("input",{type:"text",ref:"fornecedorSearchbar","onUpdate:modelValue":e[0]||(e[0]=s=>r.formInfo.fornecedor=s),onClick:e[1]||(e[1]=(...s)=>i.openFornecedores&&i.openFornecedores(...s)),onInput:e[2]||(e[2]=(...s)=>i.openFornecedores&&i.openFornecedores(...s)),placeholder:"Fornecedor"},null,544),[[w,r.formInfo.fornecedor]])]),o("div",{ref:"fornecedorResults",class:F(["searchbar-results",{"d-none":!r.fornecedoresSearchOpen}])},[(u(!0),_(S,null,y(this.fornecedoresFiltered,s=>(u(),_("div",{key:s.id,onClick:l=>i.chooseFornecedor(s.nome)},[o("p",null,m(s.nome),1)],8,H))),128))],2)])]),o("div",J,[G,o("div",{class:"searchbar-container",onClick:e[7]||(e[7]=$(()=>{},["stop"]))},[o("div",X,[v(o("input",{type:"text",ref:"materialSearchbar","onUpdate:modelValue":e[4]||(e[4]=s=>r.formInfo.material=s),onClick:e[5]||(e[5]=(...s)=>i.openMateriais&&i.openMateriais(...s)),onInput:e[6]||(e[6]=(...s)=>i.openMateriais&&i.openMateriais(...s)),placeholder:"Material"},null,544),[[w,r.formInfo.material]])]),o("div",{ref:"materialResults",class:F(["searchbar-results",{"d-none":!r.materiaisSearchOpen}])},[(u(!0),_(S,null,y(this.materiaisFiltered,s=>(u(),_("div",{key:s.id,onClick:l=>i.chooseMaterial(s.tipo+" "+s.liga+" "+s.acabamento+" "+s.dimensoes)},[o("p",null,m(s.tipo+" "+s.liga+" "+s.acabamento+" "+s.dimensoes),1)],8,Y))),128))],2)])]),o("div",Z,[ee,c(b,{prop:"valor"},{default:f(()=>[c(g,{modelValue:r.formInfo.valor,"onUpdate:modelValue":e[8]||(e[8]=s=>r.formInfo.valor=s),type:"number",placeholder:"Pre\xE7o"},null,8,["modelValue"])]),_:1})]),o("div",te,[oe,c(b,{prop:"quantidade"},{default:f(()=>[c(g,{modelValue:r.formInfo.quantidade,"onUpdate:modelValue":e[9]||(e[9]=s=>r.formInfo.quantidade=s),type:"number",placeholder:"Quantidade"},null,8,["modelValue"])]),_:1})]),o("div",ae,[se,c(b,{prop:"quantidade"},{default:f(()=>[c(g,{modelValue:r.formInfo.dataUF,"onUpdate:modelValue":e[10]||(e[10]=s=>r.formInfo.dataUF=s),type:"date"},null,8,["modelValue"])]),_:1})])])]),o("div",re,[ie,o("div",{id:"kt_modal_add_compra_cancel",class:"btn btn-lg btn-primary",onClick:e[11]||(e[11]=(...s)=>i.createCompra&&i.createCompra(...s))},[p(" Criar "),c(d,{"icon-name":"arrow-right","icon-class":"fs-2 me-2 me-0",class:"override-mr0"})])])]),_:1},8,["model"])])])],512)}const ne=A(V,[["render",le],["__scopeId","data-v-12997b36"]]);const de={name:"AlterCompraModal",components:{},props:{info:{type:Object,required:!0}},data(){return{formInfo:{fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""},fornecedores:[],materiais:[],fornecedoresFiltered:[],materiaisFiltered:[],fornecedoresSearchOpen:!1,materiaisSearchOpen:!1}},mounted(){this.formInfo=this.info,this.fornecedores=[],this.materiais=[],k({method:"get",url:"http://64.225.109.57:4000/api/fornecedores",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.fornecedores.forEach(e=>this.fornecedores.push(e))}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)}),k({method:"get",url:"http://64.225.109.57:4000/api/materiais",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.materiais.forEach(e=>this.materiais.push(e))}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},methods:{verifyCompraData(){let t=!1,e=!1;return this.fornecedores.forEach(a=>{a.nome==this.formInfo.fornecedor&&(t=!0,this.formInfo.idFornecedor=a.id)}),this.materiais.forEach(a=>{a.tipo+" "+a.liga+" "+a.acabamento+" "+a.dimensoes==this.formInfo.material&&(e=!0,this.formInfo.idMaterial=a.id)}),this.formInfo.dataUF.length>0&&(this.formInfo.data=this.formInfo.dataUF.split("-")[2]+"-"+this.formInfo.dataUF.split("-")[1]+"-"+this.formInfo.dataUF.split("-")[0]),this.formInfo.fornecedor.length==0||this.formInfo.material.length==0||this.formInfo.quantidade.length==0||this.formInfo.valor.length==0?(console.log("aqui"),this.$emit("open-modal","Preencha todos os campos obrigat\xF3rios."),!1):this.formInfo.quantidade<=0?(this.$emit("open-modal","Introduza uma quantidade v\xE1lida."),!1):this.formInfo.valor<0?(this.$emit("open-modal","Introduza um pre\xE7o v\xE1lido."),!1):t?e?(console.log(this.formInfo),!0):(this.$emit("open-modal","Introduza um material v\xE1lido da lista."),!1):(this.$emit("open-modal","Introduza um fornecedor v\xE1lido da lista."),!1)},alterarCompra(){this.verifyCompraData()&&this.$emit("alter-compra",this.formInfo)},filterFornecedores(){let t=this.$refs.fornecedorSearchbar.value;this.fornecedoresFiltered=[],this.fornecedores.forEach(e=>{e.nome.includes(t)&&this.fornecedoresFiltered.push(e)})},chooseFornecedor(t){this.formInfo.fornecedor=t,this.fornecedoresSearchOpen=!1},openFornecedores(){this.fornecedoresSearchOpen=!0,this.materiaisSearchOpen=!1,this.filterFornecedores()},filterMateriais(){let t=this.$refs.materialSearchbar.value.split(" ");this.materiaisFiltered=[],this.materiais.forEach(e=>{let a=!0;t.forEach(n=>{e.tipo.includes(n)||e.liga.includes(n)||e.acabamento.includes(n)||e.dimensoes.includes(n)||(a=!1)}),a&&this.materiaisFiltered.push(e)})},chooseMaterial(t){this.formInfo.material=t,this.materiaisSearchOpen=!1},openMateriais(){this.materiaisSearchOpen=!0,this.fornecedoresSearchOpen=!1,this.filterMateriais()},closeSearches(){this.fornecedoresSearchOpen=!1,this.materiaisSearchOpen=!1},reset(){this.formInfo={...this.info},this.formInfo.dataUF=this.formInfo.data.split("-")[2]+"-"+this.formInfo.data.split("-")[1]+"-"+this.formInfo.data.split("-")[0]}},watch:{info:function(t){this.formInfo={...t},this.formInfo.dataUF=this.formInfo.data.split("-")[2]+"-"+this.formInfo.data.split("-")[1]+"-"+this.formInfo.data.split("-")[0],this.filterFornecedores(),this.filterMateriais()}}},I=t=>(q("data-v-8428fb51"),t=t(),x(),t),ce={class:"modal-dialog modal-dialog-centered mw-650px"},me={class:"modal-content"},fe={class:"modal-header",id:"kt_modal_alter_compra_header"},he=I(()=>o("h2",{class:"fw-bold"},"Alterar Compra",-1)),pe={id:"kt_modal_alter_compra_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary"},ue={class:"modal-body py-10 px-lg-17"},_e={class:"scroll-y me-n7 pe-7",id:"kt_modal_alter_compra_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_customer_header","data-kt-scroll-wrappers":"#kt_modal_add_customer_scroll","data-kt-scroll-offset":"300px"},ge={class:"fv-row mb-8"},be=I(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Fornecedor",-1)),ke={class:"searchbar"},ve=["onClick"],Ce={class:"fv-row mb-8"},Fe=I(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Material",-1)),Ie={class:"searchbar"},Me=["onClick"],$e={class:"fv-row mb-8"},we=I(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Pre\xE7o (\u20AC)",-1)),Se={class:"fv-row mb-8"},ye=I(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Quantidade (kg)",-1)),Ae={class:"fv-row mb-8"},Oe=I(()=>o("label",{class:"required fs-6 fw-semobold mb-2"},"Data",-1)),qe={class:"modal-footer flex-center"};function xe(t,e,a,n,r,i){const d=h("KTIcon"),g=h("el-input"),b=h("el-form-item"),M=h("el-form");return u(),_("div",{class:"modal fade",id:"kt_modal_alter_compra",ref:"alterCompraModalRef",tabindex:"-1","aria-hidden":"true",onClick:e[13]||(e[13]=(...s)=>i.closeSearches&&i.closeSearches(...s))},[o("div",ce,[o("div",me,[o("div",fe,[he,o("div",pe,[c(d,{"icon-name":"cross","icon-class":"fs-1"})])]),c(M,{model:r.formInfo,ref:"formRef"},{default:f(()=>[o("div",ue,[o("div",_e,[o("div",ge,[be,o("div",{class:"searchbar-container",onClick:e[3]||(e[3]=$(()=>{},["stop"]))},[o("div",ke,[v(o("input",{type:"text",ref:"fornecedorSearchbar","onUpdate:modelValue":e[0]||(e[0]=s=>r.formInfo.fornecedor=s),onClick:e[1]||(e[1]=(...s)=>i.openFornecedores&&i.openFornecedores(...s)),onInput:e[2]||(e[2]=(...s)=>i.openFornecedores&&i.openFornecedores(...s)),placeholder:"Fornecedor"},null,544),[[w,r.formInfo.fornecedor]])]),o("div",{ref:"fornecedorResults",class:F(["searchbar-results",{"d-none":!r.fornecedoresSearchOpen}])},[(u(!0),_(S,null,y(this.fornecedoresFiltered,s=>(u(),_("div",{key:s.id,onClick:l=>i.chooseFornecedor(s.nome)},[o("p",null,m(s.nome),1)],8,ve))),128))],2)])]),o("div",Ce,[Fe,o("div",{class:"searchbar-container",onClick:e[7]||(e[7]=$(()=>{},["stop"]))},[o("div",Ie,[v(o("input",{type:"text",ref:"materialSearchbar","onUpdate:modelValue":e[4]||(e[4]=s=>r.formInfo.material=s),onClick:e[5]||(e[5]=(...s)=>i.openMateriais&&i.openMateriais(...s)),onInput:e[6]||(e[6]=(...s)=>i.openMateriais&&i.openMateriais(...s)),placeholder:"Material"},null,544),[[w,r.formInfo.material]])]),o("div",{ref:"materialResults",class:F(["searchbar-results",{"d-none":!r.materiaisSearchOpen}])},[(u(!0),_(S,null,y(this.materiaisFiltered,s=>(u(),_("div",{key:s.id,onClick:l=>i.chooseMaterial(s.tipo+" "+s.liga+" "+s.acabamento+" "+s.dimensoes)},[o("p",null,m(s.tipo+" "+s.liga+" "+s.acabamento+" "+s.dimensoes),1)],8,Me))),128))],2)])]),o("div",$e,[we,c(b,{prop:"valor"},{default:f(()=>[c(g,{modelValue:r.formInfo.valor,"onUpdate:modelValue":e[8]||(e[8]=s=>r.formInfo.valor=s),type:"number",step:"any",placeholder:"Pre\xE7o"},null,8,["modelValue"])]),_:1})]),o("div",Se,[ye,c(b,{prop:"quantidade"},{default:f(()=>[c(g,{modelValue:r.formInfo.quantidade,"onUpdate:modelValue":e[9]||(e[9]=s=>r.formInfo.quantidade=s),type:"number",placeholder:"Quantidade"},null,8,["modelValue"])]),_:1})]),o("div",Ae,[Oe,c(b,{prop:"quantidade"},{default:f(()=>[c(g,{modelValue:r.formInfo.dataUF,"onUpdate:modelValue":e[10]||(e[10]=s=>r.formInfo.dataUF=s),type:"date"},null,8,["modelValue"])]),_:1})])])]),o("div",qe,[o("div",{onClick:e[11]||(e[11]=(...s)=>i.reset&&i.reset(...s)),class:"btn btn-light me-3"}," Repor "),o("div",{id:"kt_modal_add_customer_cancel",class:"btn btn-lg btn-primary",onClick:e[12]||(e[12]=(...s)=>i.alterarCompra&&i.alterarCompra(...s))},[p(" Alterar "),c(d,{"icon-name":"arrow-right","icon-class":"fs-2 me-2 me-0",class:"override-mr0"})])])]),_:1},8,["model"])])])],512)}const Ue=A(de,[["render",xe],["__scopeId","data-v-8428fb51"]]);const Ee={name:"ConfirmModal",methods:{confirm(){this.$emit("confirm-modal",!0)},cancel(){this.$emit("confirm-modal",!1)}}},Te=t=>(q("data-v-597bc67c"),t=t(),x(),t),De={class:"modal-wrapper"},Ve=Te(()=>o("p",null,"Tem a certeza que quer apagar esta compra?",-1)),Re={class:"button-wrapper"};function ze(t,e,a,n,r,i){return u(),_("div",De,[o("div",null,[Ve,o("div",Re,[o("button",{onClick:e[0]||(e[0]=(...d)=>i.confirm&&i.confirm(...d))},"Confirmar"),o("button",{onClick:e[1]||(e[1]=(...d)=>i.cancel&&i.cancel(...d))},"Cancelar")])])])}const Be=A(Ee,[["render",ze],["__scopeId","data-v-597bc67c"]]);const Le={name:"Compras",components:{Datatable:D,AddCompraModal:ne,AlterCompraModal:Ue,ConfirmModal:Be},data(){return{compras:[],comprasFiltered:[],rangeOpen:!1,range:"Desde Sempre",createModalOpen:!1,alterModalOpen:!1,confirmModalOpen:!1,editCompra:{id:"",valor:"",quantidade:"",data:"",idFornecedor:"",idMaterial:""},deleteId:"",tableHeader:[]}},created(){this.$store.getters.getUser.id?this.getAllCompras():this.$router.push({name:"login"})},mounted(){let t=[{columnName:"Material",columnLabel:"material",sortEnabled:!0,columnWidth:100},{columnName:"Liga",columnLabel:"liga",sortEnabled:!0,columnWidth:100},{columnName:"Acabamento",columnLabel:"acabamento",sortEnabled:!0,columnWidth:130},{columnName:"Dimens\xF5es",columnLabel:"dimensoes",sortEnabled:!1,columnWidth:130},{columnName:"Fornecedor",columnLabel:"fornecedor",sortEnabled:!0,columnWidth:130},{columnName:"Quantidade",columnLabel:"quantidade",sortEnabled:!0,columnWidth:100},{columnName:"Pre\xE7o",columnLabel:"preco",sortEnabled:!0,columnWidth:100},{columnName:"Pre\xE7o/Kg",columnLabel:"precokg",sortEnabled:!0,columnWidth:100},{columnName:"Data",columnLabel:"data",sortEnabled:!0,columnWidth:130}];this.$store.getters.getUser.tipo!="user"&&t.push({columnName:"Actions",columnLabel:"actions",sortEnabled:!1,columnWidth:100}),this.tableHeader=E(t)},methods:{sort(t){switch(t.label){case"material":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.material.tipo>a.material.tipo?1:a.material.tipo>e.material.tipo?-1:0):this.comprasFiltered.sort((e,a)=>e.material.tipo<a.material.tipo?1:a.material.tipo<e.material.tipo?-1:0);break;case"liga":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.material.liga>a.material.liga?1:a.material.liga>e.material.liga?-1:0):this.comprasFiltered.sort((e,a)=>e.material.liga<a.material.liga?1:a.material.liga<e.material.liga?-1:0);break;case"acabamento":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.material.acabamento>a.material.acabamento?1:a.material.acabamento>e.material.acabamento?-1:0):this.comprasFiltered.sort((e,a)=>e.material.acabamento<a.material.acabamento?1:a.material.acabamento<e.material.acabamento?-1:0);break;case"fornecedor":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.fornecedor.nome>a.fornecedor.nome?1:a.fornecedor.nome>e.fornecedor.nome?-1:0):this.comprasFiltered.sort((e,a)=>e.fornecedor.nome<a.fornecedor.nome?1:a.fornecedor.nome<e.fornecedor.nome?-1:0);break;case"preco":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.valor>a.valor?1:a.valor>e.valor?-1:0):this.comprasFiltered.sort((e,a)=>e.valor<a.valor?1:a.valor<e.valor?-1:0);break;case"precokg":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.precokg>a.precokg?1:a.precokg>e.precokg?-1:0):this.comprasFiltered.sort((e,a)=>e.precokg<a.precokg?1:a.precokg<e.precokg?-1:0);break;case"quantidade":t.order=="asc"?this.comprasFiltered.sort((e,a)=>e.quantidade>a.quantidade?1:a.quantidade>e.quantidade?-1:0):this.comprasFiltered.sort((e,a)=>e.quantidade<a.quantidade?1:a.quantidade<e.quantidade?-1:0);break;case"data":t.order=="asc"?this.comprasFiltered.sort((e,a)=>{let n=e.data.split("-")[1]+"-"+e.data.split("-")[0]+"-"+e.data.split("-")[2],r=a.data.split("-")[1]+"-"+a.data.split("-")[0]+"-"+a.data.split("-")[2];return new Date(n)>new Date(r)?1:new Date(r)>new Date(n)?-1:0}):this.comprasFiltered.sort((e,a)=>{let n=e.data.split("-")[1]+"-"+e.data.split("-")[0]+"-"+e.data.split("-")[2],r=a.data.split("-")[1]+"-"+a.data.split("-")[0]+"-"+a.data.split("-")[2];return new Date(n)<new Date(r)?1:new Date(r)<new Date(n)?-1:0});break}},searchFilter(){this.comprasFiltered=[];let t=this.$refs.searchBar.value.split(" ");if(t!=""?this.compras.forEach(r=>{let i=!0;t.forEach(d=>{r.material.tipo.includes(d)||r.material.liga.includes(d)||r.material.acabamento.includes(d)||r.material.dimensoes.includes(d)||r.fornecedor.nome.includes(d)||(i=!1)}),i&&this.comprasFiltered.push(r)}):this.compras.forEach(r=>this.comprasFiltered.push(r)),this.range!="Desde Sempre"){var e=[];this.comprasFiltered.forEach(d=>e.push(d)),this.comprasFiltered=[];let r=new Date;var n;switch(this.range){case"\xDAltimo M\xEAs":n=1;break;case"\xDAltimos 3 Meses":n=3;break;case"\xDAltimos 6 Meses":n=6;break;case"\xDAltimos 12 Meses":n=12;break;case"\xDAltimos 24 Meses":n=24;break}r.setMonth(r.getMonth()-n),e.forEach(d=>{let g=d.data.split("-")[1]+"-"+d.data.split("-")[0]+"-"+d.data.split("-")[2];new Date(g)>r&&this.comprasFiltered.push(d)})}let a=new Date;var n;switch(this.range){case"\xDAltimo M\xEAs":n=1;break;case"\xDAltimos 3 Meses":n=3;break;case"\xDAltimos 6 Meses":n=6;break;case"\xDAltimos 12 Meses":n=12;break;case"\xDAltimos 24 Meses":n=24;break}a.setMonth(a.getMonth()-n),this.comprasFiltered.filter(r=>{let i=r.data.split("-")[1]+"-"+r.data.split("-")[0]+"-"+r.data.split("-")[2];return new Date(i)>a}),this.comprasFiltered.forEach(r=>{let i=r.data.split("-")[1]+"-"+r.data.split("-")[0]+"-"+r.data.split("-")[2];new Date(i)<a&&this.comprasFiltered.remove(r)})},selectRange(t){this.range=t,this.rangeOpen=!1,this.searchFilter()},getCompraToEdit(t){this.alterModalOpen=!0,this.compras.forEach(e=>{e.id==t&&(this.editCompra={id:e.id,valor:e.valor,quantidade:e.quantidade,data:e.data,fornecedor:e.fornecedor.nome,material:e.material.tipo+" "+e.material.liga+" "+e.material.acabamento+" "+e.material.dimensoes})})},getAllCompras(){this.compras=[],this.comprasFiltered=[],this.range="Desde Sempre",k({method:"get",url:"http://64.225.109.57:4000/api/compras",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.compras.forEach(e=>{e.valor=(Math.round(parseFloat(e.valor)*100)/100).toFixed(2),e.precokg=(Math.round(parseFloat(e.valor)/parseFloat(e.quantidade)*100)/100).toFixed(2),this.compras.push(e),this.comprasFiltered.push(e)})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},createCompra(t){this.createModalOpen=!1,this.$refs.hidemodal1.click(),k({method:"post",url:"http://64.225.109.57:4000/api/compras",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken},data:t}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra criada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)})},alterCompra(t){this.createModalOpen=!1,this.$refs.hidemodal2.click(),k({method:"put",url:`http://64.225.109.57:4000/api/compras/${t.id}`,headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken},data:t}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra alterada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)})},deleteCompra(t){this.confirmModalOpen=!1,t&&k({method:"delete",url:`http://64.225.109.57:4000/api/compras/${this.deleteId}`,headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra apagada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)}),this.deleteId=""},openModal(t){this.$emit("open-modal",t)},closeConfirmModal(){console.log("22"),this.confirmModalOpen=!1}}},Ne={class:"card"},We={class:"card-header border-0 pt-6"},Pe={class:"card-title"},Ke={class:"d-flex align-items-center position-relative my-1"},Qe={class:"d-flex align-items-center position-relative my-1"},je={class:"custom-select"},He={class:"card-toolbar"},Je={class:"d-flex justify-content-end","data-kt-customer-table-toolbar":"base"},Ge={class:"card-body pt-0"},Xe=["onClick"],Ye=["onClick"],Ze={ref:"hidemodal1",style:{display:"none"},"data-bs-toggle":"modal","data-bs-target":"#kt_modal_add_compra"},et={ref:"hidemodal2",style:{display:"none"},"data-bs-toggle":"modal","data-bs-target":"#kt_modal_alter_compra"};function tt(t,e,a,n,r,i){const d=h("KTIcon"),g=h("Datatable"),b=h("AddCompraModal"),M=h("AlterCompraModal"),s=h("ConfirmModal");return u(),_("div",Ne,[o("div",We,[o("div",Pe,[o("div",Ke,[c(d,{"icon-name":"magnifier","icon-class":"fs-1 position-absolute ms-6"}),o("input",{type:"text",onInput:e[0]||(e[0]=(...l)=>i.searchFilter&&i.searchFilter(...l)),ref:"searchBar",class:"form-control form-control-solid w-250px ps-15",placeholder:"Procurar compras"},null,544)]),o("div",Qe,[o("div",je,[o("div",{class:F(["selected",{open:r.rangeOpen}]),onClick:e[1]||(e[1]=l=>r.rangeOpen=!r.rangeOpen)},m(this.range),3),o("div",{class:F(["items",{selectHide:!r.rangeOpen}])},[o("div",{onClick:e[2]||(e[2]=l=>i.selectRange("Desde Sempre"))},m("Desde Sempre")),o("div",{onClick:e[3]||(e[3]=l=>i.selectRange("\xDAltimo M\xEAs"))},m("\xDAltimo M\xEAs")),o("div",{onClick:e[4]||(e[4]=l=>i.selectRange("\xDAltimos 3 Meses"))},m("\xDAltimos 3 Meses")),o("div",{onClick:e[5]||(e[5]=l=>i.selectRange("\xDAltimos 6 Meses"))},m("\xDAltimos 6 Meses")),o("div",{onClick:e[6]||(e[6]=l=>i.selectRange("\xDAltimos 12 Meses"))},m("\xDAltimos 12 Meses")),o("div",{onClick:e[7]||(e[7]=l=>i.selectRange("\xDAltimos 24 Meses"))},m("\xDAltimos 24 Meses"))],2)])])]),o("div",He,[o("div",Je,[o("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#kt_modal_add_compra","data-backdrop":"false",onClick:e[8]||(e[8]=l=>this.createModalOpen=!0)},[c(d,{"icon-name":"plus","icon-class":"fs-2"}),p(" Adicionar Compra ")])])])]),o("div",Ge,[c(g,{onOnSort:i.sort,data:this.comprasFiltered,header:r.tableHeader,"enable-items-per-page-dropdown":!0,class:"datatable"},T({material:f(({row:l})=>[p(m(l.material.tipo),1)]),liga:f(({row:l})=>[p(m(l.material.liga),1)]),acabamento:f(({row:l})=>[p(m(l.material.acabamento),1)]),dimensoes:f(({row:l})=>[p(m(l.material.dimensoes),1)]),fornecedor:f(({row:l})=>[p(m(l.fornecedor.nome),1)]),quantidade:f(({row:l})=>[p(m(l.quantidade)+" kg ",1)]),preco:f(({row:l})=>[p(m(l.valor)+" \u20AC ",1)]),precokg:f(({row:l})=>[p(m(l.precokg)+" \u20AC/kg ",1)]),data:f(({row:l})=>[p(m(l.data),1)]),_:2},[this.$store.getters.getUser.tipo!="user"?{name:"actions",fn:f(({row:l})=>[o("span",{title:"Alterar Compra",onClick:U=>i.getCompraToEdit(l.id),"data-bs-toggle":"modal","data-bs-target":"#kt_modal_alter_compra",class:"material-icons"},"edit",8,Xe),o("span",{title:"Apagar Compra",onClick:U=>{this.confirmModalOpen=!0,this.deleteId=l.id},onConfirmModal:e[9]||(e[9]=U=>i.deleteCompra(t.info)),class:"material-icons"},"delete",40,Ye)]),key:"0"}:void 0]),1032,["onOnSort","data","header"])]),v(c(b,{onCreateCompra:i.createCompra,onOpenModal:i.openModal},null,8,["onCreateCompra","onOpenModal"]),[[O,this.createModalOpen]]),v(c(M,{info:this.editCompra,onAlterCompra:i.alterCompra,onOpenModal:i.openModal},null,8,["info","onAlterCompra","onOpenModal"]),[[O,this.alterModalOpen]]),v(c(s,{onConfirmModal:i.deleteCompra},null,8,["onConfirmModal"]),[[O,this.confirmModalOpen]]),o("button",Ze,null,512),o("button",et,null,512)])}const rt=A(Le,[["render",tt],["__scopeId","data-v-2eff7c63"]]);export{rt as default};
