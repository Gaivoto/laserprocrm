<template>
  <div class="modal fade" id="kt_modal_add_fornecedor" ref="addFornecedorModalRef" tabindex="-1" aria-hidden="true" v-on:click="reset">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_fornecedor_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Criar Fornecedor</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_add_fornecedor_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary" v-on:click="reset">
            <KTIcon id="kt_modal_add_fornecedor_close_btn" icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->
        <!--begin::Form-->
        <el-form :model="formInfo" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body py-10 px-lg-17">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_fornecedor_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nome</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nome">
                  <el-input v-model="formInfo.nome" type="text" placeholder="Nome" v-on:input="this.formInfo.nome = this.formInfo.nome.toUpperCase()" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Email</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="email">
                  <el-input v-model="formInfo.email" type="email"  placeholder="Email"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Contacto</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="contacto">
                  <el-input v-model="formInfo.contacto" type="number" placeholder="Contacto"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Morada</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="morada">
                  <el-input v-model="formInfo.morada" type="text" placeholder="Morada" v-on:input="this.formInfo.morada = this.formInfo.morada.toUpperCase()"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">NIF</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="nif">
                  <el-input v-model="formInfo.nif" type="number" placeholder="NIF"/>
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
            <button type="reset" id="kt_modal_add_customer_cancel" class="btn btn-light me-3" >
              Limpar
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <div id="kt_modal_add_customer_cancel" class="btn btn-lg btn-primary" v-on:click="createFornecedor" >
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

export default {
  name: "AddFornecedorModal",
  components: {},
  data() {
    return {
      formInfo: {
        nome: "",
        email: "",
        contacto: "",
        nif: "",
        morada: ""
      }
    }
  },
  methods: {
    verifyFornecedorData() {
      if(this.formInfo.nome.length == 0 || this.formInfo.email.length == 0 || this.formInfo.contacto.length == 0 || this.formInfo.nif.length == 0 || this.formInfo.morada.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.nome.length > 50) {
        this.$emit("open-modal", "O nome não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.email.length > 50) {
        this.$emit("open-modal", "O email não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.morada.length > 200) {
        this.$emit("open-modal", "A morada não pode exceder 200 caracteres.");
        return false;
      } else if(this.formInfo.contacto.length > 13 || this.formInfo.contacto.length < 9) {
        this.$emit("open-modal", "Introduza um contacto válido.");
        return false;
      } else if(!(this.formInfo.email.includes("@") && this.formInfo.email.includes(".")) || this.formInfo.email.length < 8) {
        this.$emit("open-modal", "Introduza um email válido.");
        return false;
      } else if(this.formInfo.nif.length != 9) {
        this.$emit("open-modal", "Introduza um NIF válido.");
        return false;
      } else {
        return true;
      }
    },
    createFornecedor() {
      if(this.verifyFornecedorData()) {
        this.$emit("create-fornecedor", this.formInfo);

        this.formInfo = {
          nome: "",
          email: "",
          contacto: "",
          nif: "",
          morada: ""
        }
      }
    },
    reset(event) {
      if(event.target.id == "kt_modal_add_fornecedor" || event.target.id == "kt_modal_add_fornecedor_close" || event.target.id == "kt_modal_add_fornecedor_close_btn" || event.target.parentElement.id == "kt_modal_add_fornecedor_close_btn") {
        this.formInfo = {
          nome: "",
          email: "",
          contacto: "",
          nif: "",
          morada: ""
        }
      }
    }
  }
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }
</style>