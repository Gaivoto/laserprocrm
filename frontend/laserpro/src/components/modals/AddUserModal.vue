<template>
  <div class="modal fade" id="kt_modal_add_user" ref="addUserModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_add_user_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Criar Utilizador</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_add_user_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_add_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Nome de utilizador</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="username">
                  <el-input v-model="formInfo.username" type="text" placeholder="Username" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Palavra-passe</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="password">
                  <el-input v-model="formInfo.password" type="password"  placeholder="Password"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Confirmação da palavra-passe</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="passwordConf">
                  <el-input v-model="formInfo.passwordConf" type="password" placeholder="Password"/>
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
            <button type="reset" id="kt_modal_add_user_cancel" class="btn btn-light me-3" >
              Limpar
            </button>
            <!--end::Button-->

            <!--begin::Button-->
            <div id="kt_modal_add_user_cancel" class="btn btn-lg btn-primary" v-on:click="createUser" >
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
  name: "AddUserModal",
  components: {},
  data() {
    return {
      formInfo: {
        username: "",
        password: "",
        passwordConf: ""
      }
    }
  },
  methods: {
    verifyUserData() {
      if(this.formInfo.username.length == 0 || this.formInfo.password.length == 0 || this.formInfo.passwordConf.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.username.length > 50) {
        this.$emit("open-modal", "O nome de utilizador não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.password.length > 100) {
        this.$emit("open-modal", "A palavra-passe não pode exceder 100 caracteres.");
        return false;
      } else if(this.formInfo.password != this.formInfo.passwordConf) {
        this.$emit("open-modal", "As palavras-passe não são iguais.");
        return false;
      }  else {
        return true;
      }
    },
    createUser() {
        let info = {
            username: this.formInfo.username,
            password: this.formInfo.password
        }

        if(this.verifyUserData()) this.$emit("create-user", info);
    }
  }
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }
</style>