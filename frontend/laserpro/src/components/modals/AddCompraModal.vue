<template>
  <div class="modal fade" id="kt_modal_add_compra" ref="addCompraModalRef" tabindex="-1" aria-hidden="true" v-on:click="reset">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_compra_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Criar Compra</h2>
          <!--end::Modal title-->
          

          <!--begin::Close-->
          <div id="kt_modal_add_compra_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary" v-on:click="reset">
            <KTIcon id="kt_modal_add_compra_close_btn" icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form :model="formInfo" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_compra_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">

            <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Fornecedor</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <input type="text" ref="fornecedorSearchbar" v-model="formInfo.fornecedor" v-on:click="openFornecedores" v-on:input="openFornecedores" placeholder="Fornecedor">
                  </div> 
                  <div ref="fornecedorResults" class="searchbar-results" :class="{ 'd-none': !fornecedoresSearchOpen }">
                    <div v-for="forn in this.fornecedoresFiltered" :key="forn.id" v-on:click="chooseFornecedor(forn.nome)">
                      <p>{{ forn.nome }}</p>
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Material</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <input type="text" ref="materialSearchbar" v-model="formInfo.material" v-on:click="openMateriais" v-on:input="openMateriais" placeholder="Material">
                  </div> 
                  <div ref="materialResults" class="searchbar-results" :class="{ 'd-none': !materiaisSearchOpen }">
                    <div v-for="mat in this.materiaisFiltered" :key="mat.id" v-on:click="chooseMaterial(mat)">
                      <p>{{ this.getMatInfo(mat) }}</p>
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Preço total (€)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="valor">
                  <el-input v-model="formInfo.valor" type="number" placeholder="Preço"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Quantidade (kg)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="quantidade">
                  <el-input v-model="formInfo.quantidade" type="number" placeholder="Quantidade"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Data</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="quantidade">
                  <el-input v-model="formInfo.dataUF" type="date"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">
            <!--begin::Button-->
            <button type="reset" id="kt_modal_add_compra_cancel" class="btn btn-light me-3" >
              Limpar
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <div id="kt_modal_add_compra_cancel" class="btn btn-lg btn-primary" v-on:click="createCompra" >
              Criar
              <KTIcon icon-name="arrow-right" icon-class="fs-2 me-2 me-0" class="override-mr0" />
            </div>
            <!--end::Button-->
          </div>
          <!--end::Modal footer-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddCompraModal",
  components: {},
  data() {
    return {
      formInfo: {
        fornecedor: "",
        idFornecedor: "",
        material: "",
        idMaterial: "",
        valor: "",
        quantidade: "",
        data: "",
        dataUF: ""
      },
      fornecedores: [],
      materiais: [],
      fornecedoresFiltered: [],
      materiaisFiltered: [],
      fornecedoresSearchOpen: false,
      materiaisSearchOpen: false
    }
  },
  mounted() {
    this.fornecedores = [];
    this.materiais = [];
    this.fornecedoresFiltered = [];
    this.materiaisFiltered = [];

    axios({
      method: 'get',
      url: `${import.meta.env.VITE_HOST}/fornecedores`,
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        refreshtoken: this.$store.getters.getRefreshToken,
      },
    })
    .then(value => {
      if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
      value.data.fornecedores.forEach(f => {
        if(f.estado == 'Ativo') {
          this.fornecedores.push(f);
          this.fornecedoresFiltered.push(f);
        }
      });
    })
    .catch(error => {
      if (error.code) {
        console.log(error.response.data);
        this.$emit("open-modal", error.response.data.message);
        if(error.response.status == 401) {
          this.$store.commit('resetUser');
          this.$router.push({ name: "login" });
        }
      } else console.log(error);
    });

    axios({
      method: 'get',
      url: `${import.meta.env.VITE_HOST}/materiais`,
      headers: {
        Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
        refreshtoken: this.$store.getters.getRefreshToken,
      },
    })
    .then(value => {
      if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
      value.data.materiais.forEach(m => {
        if(m.estado == 'Ativo') {
          this.materiais.push(m);
          this.materiaisFiltered.push(m);
        }
      });
    })
    .catch(error => {
      if (error.code) {
        console.log(error.response.data);
        this.$emit("open-modal", error.response.data.message);
        if(error.response.status == 401) {
          this.$store.commit('resetUser');
          this.$router.push({ name: "login" });
        }
      } else console.log(error);
    });
  },
  methods: {
    verifyCompraData() {
      let existeFor = false;
      let existeMat = false;

      this.fornecedores.forEach(f => {
        if(f.nome == this.formInfo.fornecedor) {
          existeFor = true;
          this.formInfo.idFornecedor = f.id;
        }
      });

      this.materiais.forEach(m => {
        let info = m.produto + " " + m.material + " " + m.tipo;
        if(m.subtipo != "") info += " " + m.subtipo;
        info += " " + m.liga + " " + m.dimensoes;

        if(info == this.formInfo.material) {
          existeMat = true;
          this.formInfo.idMaterial = m.id;
        }
      });

      if(this.formInfo.dataUF.length > 0) this.formInfo.data = this.formInfo.dataUF.split("-")[2] + "-" + this.formInfo.dataUF.split("-")[1] + "-" + this.formInfo.dataUF.split("-")[0];
      
      if(this.formInfo.fornecedor.length == 0 || this.formInfo.material.length == 0 || this.formInfo.quantidade.length == 0 || this.formInfo.valor.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.quantidade <= 0) {
        this.$emit("open-modal", "Introduza uma quantidade válida.");
        return false;
      } else if(this.formInfo.valor <= 0) {
        this.$emit("open-modal", "Introduza um preço válido.");
        return false;
      } else if(!existeFor) {
        this.$emit("open-modal", "Introduza um fornecedor válido da lista.");
        return false;
      } else if(!existeMat) {
        this.$emit("open-modal", "Introduza um material válido da lista.");
        return false;
      } else {
        return true;
      }
    },
    createCompra() {
      if(this.verifyCompraData()) {
        this.$emit("create-compra", this.formInfo);

        this.formInfo = {
          fornecedor: "",
          idFornecedor: "",
          material: "",
          idMaterial: "",
          valor: "",
          quantidade: "",
          data: "",
          dataUF: ""
        }

        this.fornecedoresSearchOpen = false;
        this.materiaisSearchOpen = false;
      }
    },
    filterFornecedores() {
      let search = this.$refs.fornecedorSearchbar.value;
      this.fornecedoresFiltered = [];
      
      this.fornecedores.forEach(f => {
        if(f.nome.toUpperCase().includes(search.toUpperCase())) this.fornecedoresFiltered.push(f);
      });
    },
    chooseFornecedor(forn) {
      this.formInfo.fornecedor = forn;
      this.fornecedoresSearchOpen = false;
    },
    openFornecedores() {
      this.fornecedoresSearchOpen = true;
      this.materiaisSearchOpen = false;
      this.filterFornecedores();
    },
    filterMateriais() {
      let search = this.$refs.materialSearchbar.value.split(" ");
      this.materiaisFiltered = [];
      
      this.materiais.forEach(m => {
        let check = true;
        search.forEach(s => {
          if(!(m.tipo.toUpperCase().includes(s.toUpperCase()) || m.subtipo.toUpperCase().includes(s.toUpperCase()) || m.liga.toUpperCase().includes(s.toUpperCase()) || m.dimensoes.toUpperCase().includes(s.toUpperCase()) || m.produto.toUpperCase().includes(s.toUpperCase()) || m.material.toUpperCase().includes(s.toUpperCase()))) check = false;
        });

        if(check) this.materiaisFiltered.push(m);
      });
    },
    chooseMaterial(mat) {
      this.formInfo.material = mat.produto + " " + mat.material + " " + mat.tipo;
      if(mat.subtipo != "") this.formInfo.material += " " + mat.subtipo;
      this.formInfo.material += " " + mat.liga + " " + mat.dimensoes;
      this.materiaisSearchOpen = false;
    },
    openMateriais() {
      this.materiaisSearchOpen = true;
      this.fornecedoresSearchOpen = false;
      this.filterMateriais();
    },
    reset(event) {
      if(event.target.id == "kt_modal_add_compra" || event.target.id == "kt_modal_add_compra_close" || event.target.id == "kt_modal_add_compra_close_btn" || event.target.parentElement.id == "kt_modal_add_compra_close_btn") {
        this.formInfo = {
          fornecedor: "",
          idFornecedor: "",
          material: "",
          idMaterial: "",
          valor: "",
          quantidade: "",
          data: "",
          dataUF: ""
        }
      }

      this.fornecedoresSearchOpen = false;
      this.materiaisSearchOpen = false;
    },
    getMatInfo(mat) {
      let info = mat.produto + " " + mat.material + " " + mat.tipo;
      if(mat.subtipo != "") info += " " + mat.subtipo;
      info += " " + mat.liga + " " + mat.dimensoes;

      return info;
    }
  }
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }

  .searchbar-container {
    position: relative;
  }

  .searchbar {
    padding: 1px 11px;
    height: 32px;
    border-radius: 0.475rem;
    box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
  }

  .searchbar input {
    background: none;
    border: none;
    color: var(--light) !important;
    width: 100%;
    height: 30px;
  }

  .searchbar input:focus {
    outline: none;
  }

  .searchbar-results {
    position: absolute;
    left: 0px;
    top: 36px;
    width: 100%;
    max-height: 300px;

    overflow-y: scroll;

    background-color: rgb(30, 30, 45);
    opacity: 1 !important;
    z-index: 1000;
    box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
    border-top: 1px solid var(--el-border-color);
  }

  .searchbar-results > div {
    padding: 1px 11px;
    height: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: var(--bs-gray-100);
    border-left: 1px solid var(--el-border-color);
    border-bottom: 1px solid var(--el-border-color);
    border-right: 1px solid var(--el-border-color);
  }

  .searchbar-results > div > p {
    margin-bottom: 0px;
  }

  .searchbar-results::-webkit-scrollbar {
    width: 0px;
  }
</style>