<template>
  <div class="modal fade" id="kt_modal_alter_material" ref="alterMaterialModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_alter_material_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Alterar Material</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_alter_material_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_alter_material_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Tipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="tipo">
                  <el-input v-model="formInfo.tipo" type="text" placeholder="Tipo" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Liga</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="liga">
                  <el-input v-model="formInfo.liga" type="text"  placeholder="Liga"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Acabamento</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="acabamento">
                  <el-input v-model="formInfo.acabamento" type="text" placeholder="Acabamento"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Comprimento</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="comprimento">
                  <el-input v-model="formInfo.comprimento" type="number" placeholder="Comprimento"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Largura</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="largura">
                  <el-input v-model="formInfo.largura" type="number" placeholder="Largura"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Espessura</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="espessura">
                  <el-input v-model="formInfo.espessura" type="number" placeholder="Espessura"/>
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
            <div id="kt_modal_add_customer_cancel" class="btn btn-lg btn-primary" v-on:click="alterarMaterial" >
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

export default {
  name: "AlterMaterialModal",
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
        tipo: "",
        liga: "",
        acabamento: "",
        comprimento: "",
        largura: "",
        espessura: ""
      }
    }
  },
  mounted() {
    this.formInfo = this.info;
  },
  methods: {
    verifyMaterialData() {
      if(this.formInfo.tipo.length == 0 || this.formInfo.liga.length == 0 || this.formInfo.acabamento.length == 0 || this.formInfo.espessura.length == 0 || this.formInfo.comprimento.length == 0 || this.formInfo.largura.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.tipo.length > 50) {
        this.$emit("open-modal", "O tipo não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.acabamento.length > 50) {
        this.$emit("open-modal", "O acabamento não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.liga.length > 200) {
        this.$emit("open-modal", "A liga não pode exceder 200 caracteres.");
        return false;
      } else if(this.formInfo.espessura <= 0 || this.formInfo.comprimento <= 0 || this.formInfo.largura <= 0) {
        this.$emit("open-modal", "Introduza valores válidos para as dimensões.");
        return false;
      } else {
        return true;
      }
    },
    alterarMaterial() {
      console.log("66")
        this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.largura + "x" + this.formInfo.espessura;
        if(this.verifyMaterialData()) this.$emit("alter-material", this.formInfo);
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