import{_ as S,z as k,j as h,k as u,l as _,m as a,A as m,w as f,a6 as $,a4 as v,a5 as w,p as I,F as O,n as y,J as p,x as c,a7 as q,a8 as x,r as E,v as T,aj as D,af as A}from"./index.ce57f93c.js";import{D as V}from"./KTDataTable.7689e812.js";import"./assets.64907595.js";const R={name:"AddCompraModal",components:{},data(){return{formInfo:{fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""},fornecedores:[],materiais:[],fornecedoresFiltered:[],materiaisFiltered:[],fornecedoresSearchOpen:!1,materiaisSearchOpen:!1}},mounted(){this.fornecedores=[],this.materiais=[],this.fornecedoresFiltered=[],this.materiaisFiltered=[],k({method:"get",url:"http://64.225.109.57:4000/api/fornecedores",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.fornecedores.forEach(e=>{e.estado=="Ativo"&&(this.fornecedores.push(e),this.fornecedoresFiltered.push(e))})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)}),k({method:"get",url:"http://64.225.109.57:4000/api/materiais",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.materiais.forEach(e=>{e.estado=="Ativo"&&(this.materiais.push(e),this.materiaisFiltered.push(e))})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},methods:{verifyCompraData(){let t=!1,e=!1;return this.fornecedores.forEach(o=>{o.nome==this.formInfo.fornecedor&&(t=!0,this.formInfo.idFornecedor=o.id)}),this.materiais.forEach(o=>{let l=o.produto+" "+o.material+" "+o.tipo;o.subtipo!=""&&(l+=" "+o.subtipo),l+=" "+o.liga+" "+o.dimensoes,l==this.formInfo.material&&(e=!0,this.formInfo.idMaterial=o.id)}),this.formInfo.dataUF.length>0&&(this.formInfo.data=this.formInfo.dataUF.split("-")[2]+"-"+this.formInfo.dataUF.split("-")[1]+"-"+this.formInfo.dataUF.split("-")[0]),this.formInfo.fornecedor.length==0||this.formInfo.material.length==0||this.formInfo.quantidade.length==0||this.formInfo.valor.length==0?(this.$emit("open-modal","Preencha todos os campos obrigat\xF3rios."),!1):this.formInfo.quantidade<=0?(this.$emit("open-modal","Introduza uma quantidade v\xE1lida."),!1):this.formInfo.valor<=0?(this.$emit("open-modal","Introduza um pre\xE7o v\xE1lido."),!1):t?e?!0:(this.$emit("open-modal","Introduza um material v\xE1lido da lista."),!1):(this.$emit("open-modal","Introduza um fornecedor v\xE1lido da lista."),!1)},createCompra(){this.verifyCompraData()&&(this.$emit("create-compra",this.formInfo),this.formInfo={fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""},this.fornecedoresSearchOpen=!1,this.materiaisSearchOpen=!1)},filterFornecedores(){let t=this.$refs.fornecedorSearchbar.value;this.fornecedoresFiltered=[],this.fornecedores.forEach(e=>{e.nome.includes(t)&&this.fornecedoresFiltered.push(e)})},chooseFornecedor(t){this.formInfo.fornecedor=t,this.fornecedoresSearchOpen=!1},openFornecedores(){this.fornecedoresSearchOpen=!0,this.materiaisSearchOpen=!1,this.filterFornecedores()},filterMateriais(){let t=this.$refs.materialSearchbar.value.split(" ");this.materiaisFiltered=[],this.materiais.forEach(e=>{let o=!0;t.forEach(l=>{e.tipo.includes(l)||e.subtipo.includes(l)||e.liga.includes(l)||e.dimensoes.includes(l)||e.produto.includes(l)||e.material.includes(l)||(o=!1)}),o&&this.materiaisFiltered.push(e)})},chooseMaterial(t){this.formInfo.material=t.produto+" "+t.material+" "+t.tipo,t.subtipo!=""&&(this.formInfo.material+=" "+t.subtipo),this.formInfo.material+=" "+t.liga+" "+t.dimensoes,this.materiaisSearchOpen=!1},openMateriais(){this.materiaisSearchOpen=!0,this.fornecedoresSearchOpen=!1,this.filterMateriais()},reset(t){(t.target.id=="kt_modal_add_compra"||t.target.id=="kt_modal_add_compra_close"||t.target.id=="kt_modal_add_compra_close_btn"||t.target.parentElement.id=="kt_modal_add_compra_close_btn")&&(this.formInfo={fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""}),this.fornecedoresSearchOpen=!1,this.materiaisSearchOpen=!1},getMatInfo(t){let e=t.produto+" "+t.material+" "+t.tipo;return t.subtipo!=""&&(e+=" "+t.subtipo),e+=" "+t.liga+" "+t.dimensoes,e}}},C=t=>(q("data-v-d32a117b"),t=t(),x(),t),z={class:"modal-dialog modal-dialog-centered mw-650px"},N={class:"modal-content"},L={class:"modal-header",id:"kt_modal_add_compra_header"},B=C(()=>a("h2",{class:"fw-bold"},"Criar Compra",-1)),W={class:"modal-body py-10 px-lg-17"},P={class:"scroll-y me-n7 pe-7",id:"kt_modal_add_compra_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_customer_header","data-kt-scroll-wrappers":"#kt_modal_add_customer_scroll","data-kt-scroll-offset":"300px"},K={class:"fv-row mb-8"},Q=C(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Fornecedor",-1)),j={class:"searchbar"},H=["onClick"],J={class:"fv-row mb-8"},G=C(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Material",-1)),X={class:"searchbar"},Y=["onClick"],Z={class:"fv-row mb-8"},ee=C(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Pre\xE7o total (\u20AC)",-1)),te={class:"fv-row mb-8"},oe=C(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Quantidade (kg)",-1)),ae={class:"fv-row mb-8"},se=C(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Data",-1)),re={class:"modal-footer flex-center"},ie=C(()=>a("button",{type:"reset",id:"kt_modal_add_compra_cancel",class:"btn btn-light me-3"}," Limpar ",-1));function le(t,e,o,l,s,i){const n=h("KTIcon"),g=h("el-input"),b=h("el-form-item"),M=h("el-form");return u(),_("div",{class:"modal fade",id:"kt_modal_add_compra",ref:"addCompraModalRef",tabindex:"-1","aria-hidden":"true",onClick:e[13]||(e[13]=(...r)=>i.reset&&i.reset(...r))},[a("div",z,[a("div",N,[a("div",L,[B,a("div",{id:"kt_modal_add_compra_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary",onClick:e[0]||(e[0]=(...r)=>i.reset&&i.reset(...r))},[m(n,{id:"kt_modal_add_compra_close_btn","icon-name":"cross","icon-class":"fs-1"})])]),m(M,{model:s.formInfo,ref:"formRef"},{default:f(()=>[a("div",W,[a("div",P,[a("div",K,[Q,a("div",{class:"searchbar-container",onClick:e[4]||(e[4]=$(()=>{},["stop"]))},[a("div",j,[v(a("input",{type:"text",ref:"fornecedorSearchbar","onUpdate:modelValue":e[1]||(e[1]=r=>s.formInfo.fornecedor=r),onClick:e[2]||(e[2]=(...r)=>i.openFornecedores&&i.openFornecedores(...r)),onInput:e[3]||(e[3]=(...r)=>i.openFornecedores&&i.openFornecedores(...r)),placeholder:"Fornecedor"},null,544),[[w,s.formInfo.fornecedor]])]),a("div",{ref:"fornecedorResults",class:I(["searchbar-results",{"d-none":!s.fornecedoresSearchOpen}])},[(u(!0),_(O,null,y(this.fornecedoresFiltered,r=>(u(),_("div",{key:r.id,onClick:d=>i.chooseFornecedor(r.nome)},[a("p",null,c(r.nome),1)],8,H))),128))],2)])]),a("div",J,[G,a("div",{class:"searchbar-container",onClick:e[8]||(e[8]=$(()=>{},["stop"]))},[a("div",X,[v(a("input",{type:"text",ref:"materialSearchbar","onUpdate:modelValue":e[5]||(e[5]=r=>s.formInfo.material=r),onClick:e[6]||(e[6]=(...r)=>i.openMateriais&&i.openMateriais(...r)),onInput:e[7]||(e[7]=(...r)=>i.openMateriais&&i.openMateriais(...r)),placeholder:"Material"},null,544),[[w,s.formInfo.material]])]),a("div",{ref:"materialResults",class:I(["searchbar-results",{"d-none":!s.materiaisSearchOpen}])},[(u(!0),_(O,null,y(this.materiaisFiltered,r=>(u(),_("div",{key:r.id,onClick:d=>i.chooseMaterial(r)},[a("p",null,c(this.getMatInfo(r)),1)],8,Y))),128))],2)])]),a("div",Z,[ee,m(b,{prop:"valor"},{default:f(()=>[m(g,{modelValue:s.formInfo.valor,"onUpdate:modelValue":e[9]||(e[9]=r=>s.formInfo.valor=r),type:"number",placeholder:"Pre\xE7o"},null,8,["modelValue"])]),_:1})]),a("div",te,[oe,m(b,{prop:"quantidade"},{default:f(()=>[m(g,{modelValue:s.formInfo.quantidade,"onUpdate:modelValue":e[10]||(e[10]=r=>s.formInfo.quantidade=r),type:"number",placeholder:"Quantidade"},null,8,["modelValue"])]),_:1})]),a("div",ae,[se,m(b,{prop:"quantidade"},{default:f(()=>[m(g,{modelValue:s.formInfo.dataUF,"onUpdate:modelValue":e[11]||(e[11]=r=>s.formInfo.dataUF=r),type:"date"},null,8,["modelValue"])]),_:1})])])]),a("div",re,[ie,a("div",{id:"kt_modal_add_compra_cancel",class:"btn btn-lg btn-primary",onClick:e[12]||(e[12]=(...r)=>i.createCompra&&i.createCompra(...r))},[p(" Criar "),m(n,{"icon-name":"arrow-right","icon-class":"fs-2 me-2 me-0",class:"override-mr0"})])])]),_:1},8,["model"])])])],512)}const de=S(R,[["render",le],["__scopeId","data-v-d32a117b"]]);const ne={name:"AlterCompraModal",components:{},props:{info:{type:Object,required:!0}},data(){return{formInfo:{fornecedor:"",idFornecedor:"",material:"",idMaterial:"",valor:"",quantidade:"",data:"",dataUF:""},fornecedores:[],materiais:[],fornecedoresFiltered:[],materiaisFiltered:[],fornecedoresSearchOpen:!1,materiaisSearchOpen:!1}},mounted(){this.formInfo=this.info,this.fornecedores=[],this.materiais=[],k({method:"get",url:"http://64.225.109.57:4000/api/fornecedores",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.fornecedores.forEach(e=>this.fornecedores.push(e))}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)}),k({method:"get",url:"http://64.225.109.57:4000/api/materiais",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.materiais.forEach(e=>this.materiais.push(e))}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},methods:{verifyCompraData(){let t=!1,e=!1;return this.fornecedores.forEach(o=>{o.nome==this.formInfo.fornecedor&&(t=!0,this.formInfo.idFornecedor=o.id)}),this.materiais.forEach(o=>{let l=o.produto+" "+o.material+" "+o.tipo;o.subtipo!=""&&(l+=" "+o.subtipo),l+=" "+o.liga+" "+o.dimensoes,l==this.formInfo.material&&(e=!0,this.formInfo.idMaterial=o.id)}),this.formInfo.dataUF.length>0&&(this.formInfo.data=this.formInfo.dataUF.split("-")[2]+"-"+this.formInfo.dataUF.split("-")[1]+"-"+this.formInfo.dataUF.split("-")[0]),this.formInfo.fornecedor.length==0||this.formInfo.material.length==0||this.formInfo.quantidade.length==0||this.formInfo.valor.length==0?(console.log("aqui"),this.$emit("open-modal","Preencha todos os campos obrigat\xF3rios."),!1):this.formInfo.quantidade<=0?(this.$emit("open-modal","Introduza uma quantidade v\xE1lida."),!1):this.formInfo.valor<0?(this.$emit("open-modal","Introduza um pre\xE7o v\xE1lido."),!1):t?e?(console.log(this.formInfo),!0):(this.$emit("open-modal","Introduza um material v\xE1lido da lista."),!1):(this.$emit("open-modal","Introduza um fornecedor v\xE1lido da lista."),!1)},alterarCompra(){this.verifyCompraData()&&this.$emit("alter-compra",this.formInfo)},filterFornecedores(){let t=this.$refs.fornecedorSearchbar.value;this.fornecedoresFiltered=[],this.fornecedores.forEach(e=>{e.nome.includes(t)&&this.fornecedoresFiltered.push(e)})},chooseFornecedor(t){this.formInfo.fornecedor=t,this.fornecedoresSearchOpen=!1},openFornecedores(){this.fornecedoresSearchOpen=!0,this.materiaisSearchOpen=!1,this.filterFornecedores()},filterMateriais(){let t=this.$refs.materialSearchbar.value.split(" ");this.materiaisFiltered=[],this.materiais.forEach(e=>{let o=!0;t.forEach(l=>{e.tipo.includes(l)||e.liga.includes(l)||e.produto.includes(l)||e.dimensoes.includes(l)||e.subtipo.includes(l)||e.material.includes(l)||(o=!1)}),o&&this.materiaisFiltered.push(e)})},chooseMaterial(t){this.formInfo.material=t.produto+" "+t.material+" "+t.tipo,t.subtipo!=""&&(this.formInfo.material+=" "+t.subtipo),this.formInfo.material+=" "+t.liga+" "+t.dimensoes,this.materiaisSearchOpen=!1},openMateriais(){this.materiaisSearchOpen=!0,this.fornecedoresSearchOpen=!1,this.filterMateriais()},closeSearches(){this.fornecedoresSearchOpen=!1,this.materiaisSearchOpen=!1},reset(){this.formInfo={...this.info},this.formInfo.dataUF=this.formInfo.data.split("-")[2]+"-"+this.formInfo.data.split("-")[1]+"-"+this.formInfo.data.split("-")[0]},getMatInfo(t){let e=t.produto+" "+t.material+" "+t.tipo;return t.subtipo!=""&&(e+=" "+t.subtipo),e+=" "+t.liga+" "+t.dimensoes,e}},watch:{info:function(t){this.formInfo={...t},this.formInfo.dataUF=this.formInfo.data.split("-")[2]+"-"+this.formInfo.data.split("-")[1]+"-"+this.formInfo.data.split("-")[0],this.filterFornecedores(),this.filterMateriais()}}},F=t=>(q("data-v-2e196f7d"),t=t(),x(),t),me={class:"modal-dialog modal-dialog-centered mw-650px"},ce={class:"modal-content"},fe={class:"modal-header",id:"kt_modal_alter_compra_header"},pe=F(()=>a("h2",{class:"fw-bold"},"Alterar Compra",-1)),he={id:"kt_modal_alter_compra_close","data-bs-dismiss":"modal",class:"btn btn-icon btn-sm btn-active-icon-primary"},ue={class:"modal-body py-10 px-lg-17"},_e={class:"scroll-y me-n7 pe-7",id:"kt_modal_alter_compra_scroll","data-kt-scroll":"true","data-kt-scroll-activate":"{default: false, lg: true}","data-kt-scroll-max-height":"auto","data-kt-scroll-dependencies":"#kt_modal_add_customer_header","data-kt-scroll-wrappers":"#kt_modal_add_customer_scroll","data-kt-scroll-offset":"300px"},ge={class:"fv-row mb-8"},be=F(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Fornecedor",-1)),ke={class:"searchbar"},ve=["onClick"],Ce={class:"fv-row mb-8"},Ie=F(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Material",-1)),Fe={class:"searchbar"},Me=["onClick"],$e={class:"fv-row mb-8"},we=F(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Pre\xE7o (\u20AC)",-1)),Oe={class:"fv-row mb-8"},ye=F(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Quantidade (kg)",-1)),Se={class:"fv-row mb-8"},Ae=F(()=>a("label",{class:"required fs-6 fw-semobold mb-2"},"Data",-1)),qe={class:"modal-footer flex-center"};function xe(t,e,o,l,s,i){const n=h("KTIcon"),g=h("el-input"),b=h("el-form-item"),M=h("el-form");return u(),_("div",{class:"modal fade",id:"kt_modal_alter_compra",ref:"alterCompraModalRef",tabindex:"-1","aria-hidden":"true",onClick:e[13]||(e[13]=(...r)=>i.closeSearches&&i.closeSearches(...r))},[a("div",me,[a("div",ce,[a("div",fe,[pe,a("div",he,[m(n,{"icon-name":"cross","icon-class":"fs-1"})])]),m(M,{model:s.formInfo,ref:"formRef"},{default:f(()=>[a("div",ue,[a("div",_e,[a("div",ge,[be,a("div",{class:"searchbar-container",onClick:e[3]||(e[3]=$(()=>{},["stop"]))},[a("div",ke,[v(a("input",{type:"text",ref:"fornecedorSearchbar","onUpdate:modelValue":e[0]||(e[0]=r=>s.formInfo.fornecedor=r),onClick:e[1]||(e[1]=(...r)=>i.openFornecedores&&i.openFornecedores(...r)),onInput:e[2]||(e[2]=(...r)=>i.openFornecedores&&i.openFornecedores(...r)),placeholder:"Fornecedor"},null,544),[[w,s.formInfo.fornecedor]])]),a("div",{ref:"fornecedorResults",class:I(["searchbar-results",{"d-none":!s.fornecedoresSearchOpen}])},[(u(!0),_(O,null,y(this.fornecedoresFiltered,r=>(u(),_("div",{key:r.id,onClick:d=>i.chooseFornecedor(r.nome)},[a("p",null,c(r.nome),1)],8,ve))),128))],2)])]),a("div",Ce,[Ie,a("div",{class:"searchbar-container",onClick:e[7]||(e[7]=$(()=>{},["stop"]))},[a("div",Fe,[v(a("input",{type:"text",ref:"materialSearchbar","onUpdate:modelValue":e[4]||(e[4]=r=>s.formInfo.material=r),onClick:e[5]||(e[5]=(...r)=>i.openMateriais&&i.openMateriais(...r)),onInput:e[6]||(e[6]=(...r)=>i.openMateriais&&i.openMateriais(...r)),placeholder:"Material"},null,544),[[w,s.formInfo.material]])]),a("div",{ref:"materialResults",class:I(["searchbar-results",{"d-none":!s.materiaisSearchOpen}])},[(u(!0),_(O,null,y(this.materiaisFiltered,r=>(u(),_("div",{key:r.id,onClick:d=>i.chooseMaterial(r)},[a("p",null,c(this.getMatInfo(r)),1)],8,Me))),128))],2)])]),a("div",$e,[we,m(b,{prop:"valor"},{default:f(()=>[m(g,{modelValue:s.formInfo.valor,"onUpdate:modelValue":e[8]||(e[8]=r=>s.formInfo.valor=r),type:"number",step:"any",placeholder:"Pre\xE7o"},null,8,["modelValue"])]),_:1})]),a("div",Oe,[ye,m(b,{prop:"quantidade"},{default:f(()=>[m(g,{modelValue:s.formInfo.quantidade,"onUpdate:modelValue":e[9]||(e[9]=r=>s.formInfo.quantidade=r),type:"number",placeholder:"Quantidade"},null,8,["modelValue"])]),_:1})]),a("div",Se,[Ae,m(b,{prop:"quantidade"},{default:f(()=>[m(g,{modelValue:s.formInfo.dataUF,"onUpdate:modelValue":e[10]||(e[10]=r=>s.formInfo.dataUF=r),type:"date"},null,8,["modelValue"])]),_:1})])])]),a("div",qe,[a("div",{onClick:e[11]||(e[11]=(...r)=>i.reset&&i.reset(...r)),class:"btn btn-light me-3"}," Repor "),a("div",{id:"kt_modal_add_customer_cancel",class:"btn btn-lg btn-primary",onClick:e[12]||(e[12]=(...r)=>i.alterarCompra&&i.alterarCompra(...r))},[p(" Alterar "),m(n,{"icon-name":"arrow-right","icon-class":"fs-2 me-2 me-0",class:"override-mr0"})])])]),_:1},8,["model"])])])],512)}const Ue=S(ne,[["render",xe],["__scopeId","data-v-2e196f7d"]]);const Ee={name:"ConfirmModal",methods:{confirm(){this.$emit("confirm-modal",!0)},cancel(){this.$emit("confirm-modal",!1)}}},Te=t=>(q("data-v-597bc67c"),t=t(),x(),t),De={class:"modal-wrapper"},Ve=Te(()=>a("p",null,"Tem a certeza que quer apagar esta compra?",-1)),Re={class:"button-wrapper"};function ze(t,e,o,l,s,i){return u(),_("div",De,[a("div",null,[Ve,a("div",Re,[a("button",{onClick:e[0]||(e[0]=(...n)=>i.confirm&&i.confirm(...n))},"Confirmar"),a("button",{onClick:e[1]||(e[1]=(...n)=>i.cancel&&i.cancel(...n))},"Cancelar")])])])}const Ne=S(Ee,[["render",ze],["__scopeId","data-v-597bc67c"]]);const Le={name:"Compras",components:{Datatable:V,AddCompraModal:de,AlterCompraModal:Ue,ConfirmModal:Ne},data(){return{compras:[],comprasFiltered:[],rangeOpen:!1,range:"Desde Sempre",createModalOpen:!1,alterModalOpen:!1,confirmModalOpen:!1,editCompra:{id:"",valor:"",quantidade:"",data:"",idFornecedor:"",idMaterial:""},deleteId:"",tableHeader:[]}},created(){this.$store.getters.getUser.id?this.getAllCompras():this.$router.push({name:"login"})},mounted(){let t=[{columnName:"Produto",columnLabel:"produto",sortEnabled:!0,columnWidth:100},{columnName:"Material",columnLabel:"material",sortEnabled:!0,columnWidth:100},{columnName:"Tipo",columnLabel:"tipo",sortEnabled:!0,columnWidth:100},{columnName:"Liga",columnLabel:"liga",sortEnabled:!0,columnWidth:100},{columnName:"Dimens\xF5es",columnLabel:"dimensoes",sortEnabled:!1,columnWidth:130},{columnName:"Fornecedor",columnLabel:"fornecedor",sortEnabled:!0,columnWidth:120},{columnName:"Quantidade",columnLabel:"quantidade",sortEnabled:!0,columnWidth:110},{columnName:"Pre\xE7o",columnLabel:"preco",sortEnabled:!0,columnWidth:100},{columnName:"Pre\xE7o/Kg",columnLabel:"precokg",sortEnabled:!0,columnWidth:100},{columnName:"Data",columnLabel:"data",sortEnabled:!0,columnWidth:110}];this.$store.getters.getUser.tipo!="user"&&t.push({columnName:"Actions",columnLabel:"actions",sortEnabled:!1,columnWidth:100}),this.tableHeader=E(t)},methods:{sort(t){switch(t.label){case"material":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.material.material>o.material.material?1:o.material.material>e.material.material?-1:0):this.comprasFiltered.sort((e,o)=>e.material.material<o.material.material?1:o.material.material<e.material.material?-1:0);break;case"liga":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.material.liga>o.material.liga?1:o.material.liga>e.material.liga?-1:0):this.comprasFiltered.sort((e,o)=>e.material.liga<o.material.liga?1:o.material.liga<e.material.liga?-1:0);break;case"produto":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.material.produto>o.material.produto?1:o.material.produto>e.material.produto?-1:0):this.comprasFiltered.sort((e,o)=>e.material.produto<o.material.produto?1:o.material.produto<e.material.produto?-1:0);break;case"tipo":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.material.tipo>o.material.tipo?1:o.material.tipo>e.material.tipo?-1:0):this.comprasFiltered.sort((e,o)=>e.material.tipo<o.material.tipo?1:o.material.tipo<e.material.tipo?-1:0);break;case"fornecedor":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.fornecedor.nome>o.fornecedor.nome?1:o.fornecedor.nome>e.fornecedor.nome?-1:0):this.comprasFiltered.sort((e,o)=>e.fornecedor.nome<o.fornecedor.nome?1:o.fornecedor.nome<e.fornecedor.nome?-1:0);break;case"preco":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.valor>o.valor?1:o.valor>e.valor?-1:0):this.comprasFiltered.sort((e,o)=>e.valor<o.valor?1:o.valor<e.valor?-1:0);break;case"precokg":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.precokg>o.precokg?1:o.precokg>e.precokg?-1:0):this.comprasFiltered.sort((e,o)=>e.precokg<o.precokg?1:o.precokg<e.precokg?-1:0);break;case"quantidade":t.order=="asc"?this.comprasFiltered.sort((e,o)=>e.quantidade>o.quantidade?1:o.quantidade>e.quantidade?-1:0):this.comprasFiltered.sort((e,o)=>e.quantidade<o.quantidade?1:o.quantidade<e.quantidade?-1:0);break;case"data":t.order=="asc"?this.comprasFiltered.sort((e,o)=>{let l=e.data.split("-")[1]+"-"+e.data.split("-")[0]+"-"+e.data.split("-")[2],s=o.data.split("-")[1]+"-"+o.data.split("-")[0]+"-"+o.data.split("-")[2];return new Date(l)>new Date(s)?1:new Date(s)>new Date(l)?-1:0}):this.comprasFiltered.sort((e,o)=>{let l=e.data.split("-")[1]+"-"+e.data.split("-")[0]+"-"+e.data.split("-")[2],s=o.data.split("-")[1]+"-"+o.data.split("-")[0]+"-"+o.data.split("-")[2];return new Date(l)<new Date(s)?1:new Date(s)<new Date(l)?-1:0});break}},searchFilter(){this.comprasFiltered=[];let t=this.$refs.searchBar.value.split(" ");if(t!=""?this.compras.forEach(s=>{let i=!1;t.forEach(n=>{(s.material.material.includes(n)||s.material.tipo.includes(n)||s.material.liga.includes(n)||s.material.produto.includes(n)||s.material.dimensoes.includes(n)||s.fornecedor.nome.includes(n))&&(i=!0)}),i&&this.comprasFiltered.push(s)}):this.compras.forEach(s=>this.comprasFiltered.push(s)),this.range!="Desde Sempre"){var e=[];this.comprasFiltered.forEach(n=>e.push(n)),this.comprasFiltered=[];let s=new Date;var l;switch(this.range){case"\xDAltimo M\xEAs":l=1;break;case"\xDAltimos 3 Meses":l=3;break;case"\xDAltimos 6 Meses":l=6;break;case"\xDAltimos 12 Meses":l=12;break;case"\xDAltimos 24 Meses":l=24;break}s.setMonth(s.getMonth()-l),e.forEach(n=>{let g=n.data.split("-")[1]+"-"+n.data.split("-")[0]+"-"+n.data.split("-")[2];new Date(g)>s&&this.comprasFiltered.push(n)})}let o=new Date;var l;switch(this.range){case"\xDAltimo M\xEAs":l=1;break;case"\xDAltimos 3 Meses":l=3;break;case"\xDAltimos 6 Meses":l=6;break;case"\xDAltimos 12 Meses":l=12;break;case"\xDAltimos 24 Meses":l=24;break}o.setMonth(o.getMonth()-l),this.comprasFiltered.filter(s=>{let i=s.data.split("-")[1]+"-"+s.data.split("-")[0]+"-"+s.data.split("-")[2];return new Date(i)>o}),this.comprasFiltered.forEach(s=>{let i=s.data.split("-")[1]+"-"+s.data.split("-")[0]+"-"+s.data.split("-")[2];new Date(i)<o&&this.comprasFiltered.remove(s)})},selectRange(t){this.range=t,this.rangeOpen=!1,this.searchFilter()},getCompraToEdit(t){this.alterModalOpen=!0,this.compras.forEach(e=>{e.id==t&&(this.editCompra={id:e.id,valor:e.valor,quantidade:e.quantidade,data:e.data,fornecedor:e.fornecedor.nome},this.editCompra.material=e.material.produto+" "+e.material.material+" "+e.material.tipo,e.material.subtipo!=""&&(this.editCompra.material+=" "+e.material.subtipo),this.editCompra.material+=" "+e.material.liga+" "+e.material.dimensoes)})},getAllCompras(){this.compras=[],this.comprasFiltered=[],this.range="Desde Sempre",k({method:"get",url:"http://64.225.109.57:4000/api/compras",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(t=>{t.data.access_token&&this.$store.commit("setAccessToken",t.data.access_token),t.data.compras.forEach(e=>{e.valor=(Math.round(parseFloat(e.valor)*100)/100).toFixed(2),e.precokg=(Math.round(parseFloat(e.valor)/parseFloat(e.quantidade)*100)/100).toFixed(2),this.compras.push(e),this.comprasFiltered.push(e)})}).catch(t=>{t.code?(console.log(t.response.data),this.$emit("open-modal",t.response.data.message),t.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(t)})},createCompra(t){this.createModalOpen=!1,this.$refs.hidemodal1.click(),k({method:"post",url:"http://64.225.109.57:4000/api/compras",headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken},data:t}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra criada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)})},alterCompra(t){this.createModalOpen=!1,this.$refs.hidemodal2.click(),k({method:"put",url:`http://64.225.109.57:4000/api/compras/${t.id}`,headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken},data:t}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra alterada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)})},deleteCompra(t){this.confirmModalOpen=!1,t&&k({method:"delete",url:`http://64.225.109.57:4000/api/compras/${this.deleteId}`,headers:{Authorization:`Bearer ${this.$store.getters.getAccessToken}`,refreshtoken:this.$store.getters.getRefreshToken}}).then(e=>{e.data.access_token&&this.$store.commit("setAccessToken",e.data.access_token),this.getAllCompras(),this.$emit("open-modal","Compra apagada com sucesso.")}).catch(e=>{e.code?(console.log(e.response.data),this.$emit("open-modal",e.response.data.message),e.response.status==401&&(this.$store.commit("resetUser"),this.$router.push({name:"login"}))):console.log(e)}),this.deleteId=""},openModal(t){this.$emit("open-modal",t)},closeConfirmModal(){this.confirmModalOpen=!1}}},Be={class:"card"},We={class:"card-header border-0 pt-6"},Pe={class:"card-title"},Ke={class:"d-flex align-items-center position-relative my-1"},Qe={class:"d-flex align-items-center position-relative my-1"},je={class:"custom-select"},He={class:"card-toolbar"},Je={class:"d-flex justify-content-end","data-kt-customer-table-toolbar":"base"},Ge={class:"card-body pt-0"},Xe=["onClick"],Ye=["onClick"],Ze={ref:"hidemodal1",style:{display:"none"},"data-bs-toggle":"modal","data-bs-target":"#kt_modal_add_compra"},et={ref:"hidemodal2",style:{display:"none"},"data-bs-toggle":"modal","data-bs-target":"#kt_modal_alter_compra"};function tt(t,e,o,l,s,i){const n=h("KTIcon"),g=h("Datatable"),b=h("AddCompraModal"),M=h("AlterCompraModal"),r=h("ConfirmModal");return u(),_("div",Be,[a("div",We,[a("div",Pe,[a("div",Ke,[m(n,{"icon-name":"magnifier","icon-class":"fs-1 position-absolute ms-6"}),a("input",{type:"text",onInput:e[0]||(e[0]=(...d)=>i.searchFilter&&i.searchFilter(...d)),ref:"searchBar",class:"form-control form-control-solid w-250px ps-15",placeholder:"Procurar compras"},null,544)]),a("div",Qe,[a("div",je,[a("div",{class:I(["selected",{open:s.rangeOpen}]),onClick:e[1]||(e[1]=d=>s.rangeOpen=!s.rangeOpen)},c(this.range),3),a("div",{class:I(["items",{selectHide:!s.rangeOpen}])},[a("div",{onClick:e[2]||(e[2]=d=>i.selectRange("Desde Sempre"))},c("Desde Sempre")),a("div",{onClick:e[3]||(e[3]=d=>i.selectRange("\xDAltimo M\xEAs"))},c("\xDAltimo M\xEAs")),a("div",{onClick:e[4]||(e[4]=d=>i.selectRange("\xDAltimos 3 Meses"))},c("\xDAltimos 3 Meses")),a("div",{onClick:e[5]||(e[5]=d=>i.selectRange("\xDAltimos 6 Meses"))},c("\xDAltimos 6 Meses")),a("div",{onClick:e[6]||(e[6]=d=>i.selectRange("\xDAltimos 12 Meses"))},c("\xDAltimos 12 Meses")),a("div",{onClick:e[7]||(e[7]=d=>i.selectRange("\xDAltimos 24 Meses"))},c("\xDAltimos 24 Meses"))],2),s.rangeOpen?(u(),_("div",{key:0,class:"select-closer",onClick:e[8]||(e[8]=d=>s.rangeOpen=!1)})):T("",!0)])])]),a("div",He,[a("div",Je,[a("button",{type:"button",class:"btn btn-primary","data-bs-toggle":"modal","data-bs-target":"#kt_modal_add_compra","data-backdrop":"false",onClick:e[9]||(e[9]=d=>this.createModalOpen=!0)},[m(n,{"icon-name":"plus","icon-class":"fs-2"}),p(" Adicionar Compra ")])])])]),a("div",Ge,[m(g,{onOnSort:i.sort,data:this.comprasFiltered,header:s.tableHeader,"enable-items-per-page-dropdown":!0,class:"datatable"},D({produto:f(({row:d})=>[p(c(d.material.produto),1)]),material:f(({row:d})=>[p(c(d.material.material),1)]),tipo:f(({row:d})=>[p(c(d.material.tipo)+" "+c(d.material.subtipo),1)]),liga:f(({row:d})=>[p(c(d.material.liga),1)]),dimensoes:f(({row:d})=>[p(c(d.material.dimensoes)+"mm ",1)]),fornecedor:f(({row:d})=>[p(c(d.fornecedor.nome),1)]),quantidade:f(({row:d})=>[p(c(d.quantidade)+"kg ",1)]),preco:f(({row:d})=>[p(c(d.valor)+"\u20AC ",1)]),precokg:f(({row:d})=>[p(c(d.precokg)+"\u20AC/kg ",1)]),data:f(({row:d})=>[p(c(d.data),1)]),_:2},[this.$store.getters.getUser.tipo!="user"?{name:"actions",fn:f(({row:d})=>[a("span",{title:"Alterar Compra",onClick:U=>i.getCompraToEdit(d.id),"data-bs-toggle":"modal","data-bs-target":"#kt_modal_alter_compra",class:"material-icons"},"edit",8,Xe),a("span",{title:"Apagar Compra",onClick:U=>{this.confirmModalOpen=!0,this.deleteId=d.id},onConfirmModal:e[10]||(e[10]=U=>i.deleteCompra(t.info)),class:"material-icons"},"delete",40,Ye)]),key:"0"}:void 0]),1032,["onOnSort","data","header"])]),v(m(b,{onCreateCompra:i.createCompra,onOpenModal:i.openModal},null,8,["onCreateCompra","onOpenModal"]),[[A,this.createModalOpen]]),v(m(M,{info:this.editCompra,onAlterCompra:i.alterCompra,onOpenModal:i.openModal},null,8,["info","onAlterCompra","onOpenModal"]),[[A,this.alterModalOpen]]),v(m(r,{onConfirmModal:i.deleteCompra},null,8,["onConfirmModal"]),[[A,this.confirmModalOpen]]),a("button",Ze,null,512),a("button",et,null,512)])}const rt=S(Le,[["render",tt],["__scopeId","data-v-9788c292"]]);export{rt as default};
