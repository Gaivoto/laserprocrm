<template>
  <div class="modal fade" id="kt_modal_alter_compra" ref="alterCompraModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_alter_compra_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Alterar Compra</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_alter_compra_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form :model="formInfo" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_alter_compra_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Preço</label>
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
                <label class="required fs-6 fw-semobold mb-2">Quantidade</label>
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
                  <el-input v-model="formInfo.quantidade" type="date"/>
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
            <div id="kt_modal_add_customer_cancel" class="btn btn-lg btn-primary" v-on:click="alterarCompra" >
              Alterar
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
  name: "AlterCompraModal",
  components: {},
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
  data() {
    return {
      formInfo: {
        formInfo: {
        fornecedor: "",
        idFornecedor: "",
        material: "",
        idMaterial: "",
        valor: "",
        quantidade: "",
        data: ""
      },
      fornecedores: [],
      materiais: []
      }
    }
  },
  mounted() {
    this.formInfo = this.info;

    this.fornecedores = [];
    this.materiais = [];

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
      value.data.fornecedores.forEach(f => this.fornecedores.push(f));
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
      value.data.materiais.forEach(m => this.materiais.push(m));
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
          this.existeFor = true;
          this.idFornecedor = f.id;
        }
      });

      this.materiais.forEach(m => {
        if(m.tipo + " " + m.liga + " " + m.acabamento + " " + m.dimensoes == this.formInfo.material) {
          this.existeMat = true;
          this.idMaterial = m.id;
        }
      });

      this.formInfo.data = this.formInfo.data.split("-")[2] + "-" + this.formInfo.data.split("-")[1] + "-" + this.formInfo.data.split("-")[0];

      if(this.formInfo.fornecedor.length == 0 || this.formInfo.material.length == 0 || this.formInfo.quantidade.length == 0 || this.formInfo.valor.length == 0 || this.formInfo.data.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.quantidade <= 0) {
        this.$emit("open-modal", "Introduza uma quantidade válida.");
        return false;
      } else if(this.formInfo.valor < 0) {
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
    alterarCompra() {
      if(this.verifyCompraData()) this.$emit("alter-compra", this.formInfo);
    }
  },
  watch: {
    info: function(info) {
      this.formInfo = {...info};
    }
  },
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }
</style>