<template>
  <div class="modal fade" id="kt_modal_alter_user" ref="alterUserModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_alter_user_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Alterar Utilizador</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_alter_user_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
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
            <div class="scroll-y me-n7 pe-7" id="kt_modal_alter_user_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.tipo != 'superadm'">
                <!--begin::Label-->
                <div class="tipo-label-wrapper">
                  <label class="required fs-6 fw-semobold mb-2">Tipo</label>
                  <span :title="this.helpText" class="material-icons">help</span>
                </div>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="custom-select">
                  <div class="selected" :class="{ open: tipoOpen }" v-on:click="this.tipoOpen = !this.tipoOpen">{{ this.formInfo.tipo }}</div>
                  <div class="items" :class="{ 'd-none': !tipoOpen }">
                    <div v-if="this.$store.getters.getUser.tipo == 'superadm'" v-on:click="selectTipo('Administrador')">{{ "Administrador" }}</div>
                    <div v-on:click="selectTipo('Utilizador')">{{ "Utilizador" }}</div>
                  </div>
                </div> 
                <!--end::Input-->
              </div>
              <!--end::Input group-->

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
                <label class="fs-6 fw-semobold mb-2">Palavra-passe</label>
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
                <label class="fs-6 fw-semobold mb-2">Confirmação da palavra-passe</label>
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
            <div v-on:click="reset" class="btn btn-light me-3" >
              Repor
            </div>
            <!--end::Button-->

            <!--begin::Button-->
            <div id="kt_modal_add_user_cancel" class="btn btn-lg btn-primary" v-on:click="alterarUser" >
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
  name: "AlterUserModal",
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
        id: "",
        username: "",
        password: "",
        passwordConf: "",
        tipo: ""
      },
      tipoOpen: false,
      help: {
        user: `Utilizadores podem:
              -Ver informações da dashboard definidas como visíveis pelos administradores
              -Ver listagem de materiais, fornecedores e compras
              -Registar compras`,
        adm: `Administradores podem:
              -Ver todas as informações da dashboard
              -Definir informações da dashboard como visíveis/invisíveis para utilizadores normais
              -Ver listagem de materiais, fornecedores, compras e utilizadores
              -Registar compras, materiais e fornecedores
              -Alterar registos de compras, materiais e fornecedores
              -Ativar/desativar materiais e fornecedores
              -Ativar/desativar e alterar dados de utilizadores normais`
      }
    }
  },
  mounted() {
    this.formInfo = this.info;

    if(this.info.tipo == "user") this.formInfo.tipo = "Utilizador";
    else if(this.info.tipo == "adm") this.formInfo.tipo = "Administrador";
    else this.formInfo.tipo = "superadm";
  },
  methods: {
    verifyUserData() {
      if(this.formInfo.username.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.username.length > 50) {
        this.$emit("open-modal", "O nome de utilizador não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.password && this.formInfo.password.length > 100) {
        this.$emit("open-modal", "A palavra-passe não pode exceder 100 caracteres.");
        return false;
      } else if(this.formInfo.password != this.formInfo.passwordConf) {
        this.$emit("open-modal", "As palavras-passe não são iguais.");
        return false;
      }  else {
        return true;
      }
    },
    alterarUser() {
      let tipo;
      if(this.formInfo.tipo == "Administrador") tipo = "adm";
      else if(this.formInfo.tipo == "superadm") tipo = "superadm";
      else tipo = "user";

      let info = {
        id: this.formInfo.id,
        username: this.formInfo.username,
        tipo: tipo
      }
      
      if(this.formInfo.password) info.password = this.formInfo.password;

      if(this.verifyUserData()) this.$emit("alter-user", info);
    },
    reset() {
      this.formInfo = {...this.info};

      if(this.info.tipo == "user") this.formInfo.tipo = "Utilizador";
      else if(this.info.tipo == "adm") this.formInfo.tipo = "Administrador";
      else this.formInfo.tipo = "superadm";
    },
    selectTipo(tipo) {
      this.formInfo.tipo = tipo;
      this.tipoOpen = false;
    }
  },
  watch: {
    info: function(info) {
      this.formInfo = {...info};

      if(this.info.tipo == "user") this.formInfo.tipo = "Utilizador";
      else if(this.info.tipo == "adm") this.formInfo.tipo = "Administrador";
      else this.formInfo.tipo = "superadm";
    }
  },
  computed: {
    helpText() {
      if(this.formInfo.tipo == "Utilizador") return this.help.user;
      else if(this.formInfo.tipo == "Administrador") return this.help.adm;
      return "";
    }
  }
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }

  .tipo-label-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .tipo-label-wrapper span {
    font-size: 18px;
    cursor: help;
  }

  .custom-select {
    position: relative;
    text-align: left;
    height: 32px;
    line-height: 32px;
    font-size: var(--el-font-size-base);
    border-radius: 0.475rem;
  }

  .custom-select .selected {
    background-color: var(--bs-modal-bg);
    border-radius: 0.475rem;
    color: var(--light);
    border: 1px solid var(--el-border-color);
    padding: 0px 11px;
    cursor: pointer;
    margin-bottom: 8px;
    color: var(--el-input-text-color);
  }

  .custom-select .selected:after {
    position: absolute;
    content: "";
    top: 15px;
    right: 1em;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-color: var(--bs-text-dark) transparent transparent transparent;
  }

  .custom-select .items {
    color: var(--bs-gray-700);
    position: absolute;
    background-color: var(--bs-gray-100);
    left: 0;
    right: 0;
    z-index: 1;
    max-height: 300px;
    border-radius: 0.475rem;
  }

  .custom-select .items div {
    padding-left: 1em;
    cursor: pointer;
  }

  .custom-select .items div:hover {
    background-color: var(--bs-gray-300);
  }

  .selectHide {
    display: none;
  }
</style>