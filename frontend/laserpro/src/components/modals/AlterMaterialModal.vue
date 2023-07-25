<template>
  <div class="modal fade" id="kt_modal_alter_material" ref="alterMaterialModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content" v-on:click="this.produtosSearchOpen = false">
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
                <label class="required fs-6 fw-semobold mb-2">Produto</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <p type="text" ref="produtosSearchbar" v-on:click="this.produtosSearchOpen = true" placeholder="Produto">{{ this.formInfo.produto }}</p>
                  </div> 
                  <div ref="produtosResults" class="searchbar-results" :class="{ 'd-none': !produtosSearchOpen }">
                    <div v-on:click="chooseProduto('CHAPA')">
                      <p>CHAPA</p>
                    </div>
                    <div v-on:click="chooseProduto('PERFIL')">
                      <p>PERFIL</p>
                    </div>
                    <div v-on:click="chooseProduto('CANTONEIRA')">
                      <p>CANTONEIRA</p>
                    </div>
                    <div v-on:click="chooseProduto('TUBULAR')">
                      <p>TUBULAR</p>
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
                <el-form-item prop="material">
                  <el-input v-model="formInfo.material" type="text" placeholder="Material" v-on:input="this.formInfo.material = this.formInfo.material.toUpperCase()" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Tipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="tipo">
                  <el-input v-model="formInfo.tipo" type="text" placeholder="Tipo" v-on:input="this.formInfo.tipo = this.formInfo.tipo.toUpperCase()" />
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'TUBULAR'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Subtipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="subtipo">
                  <el-input v-model="formInfo.subtipo" type="text" placeholder="Subtipo" v-on:input="this.formInfo.subtipo = this.formInfo.subtipo.toUpperCase()" />
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
                  <el-input v-model="formInfo.liga" type="text" placeholder="Liga" v-on:input="this.formInfo.liga = this.formInfo.liga.toUpperCase()"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Comprimento (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="comprimento">
                  <el-input v-model="formInfo.comprimento" type="number" placeholder="Comprimento"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'CHAPA'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Largura (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="largura">
                  <el-input v-model="formInfo.largura" type="number" placeholder="Largura"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'TUBULAR' || this.formInfo.produto == 'CANTONEIRA'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Dimensão A (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="dimensaoA">
                  <el-input v-model="formInfo.dimensaoA" type="number" placeholder="Dimensão A"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'TUBULAR' || this.formInfo.produto == 'CANTONEIRA'">
                <!--begin::Label-->
                <label class="fs-6 fw-semobold mb-2">Dimensão B (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="dimensaoB">
                  <el-input v-model="formInfo.dimensaoB" type="number" placeholder="Dimensão B"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto != 'PERFIL'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Espessura (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="espessura">
                  <el-input v-model="formInfo.espessura" type="number" placeholder="Espessura"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'PERFIL'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Altura (mm)</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="altura">
                  <el-input v-model="formInfo.altura" type="number" placeholder="Altura"/>
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
        produto: "",
        material: "",
        tipo: "",
        subtipo: "",
        liga: "",
        comprimento: "",
        largura: "",
        espessura: "",
        altura: "",
        dimensaoA: "",
        dimensaoB: ""
      },
      produtosSearchOpen: false
    }
  },
  mounted() {
    this.formInfo = this.info;
  },
  methods: {
    verifyMaterialData() {
      if(this.formInfo.produto.length == 0 || this.formInfo.material.length == 0 || this.formInfo.liga.length == 0 || this.formInfo.tipo.length == 0) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
        return false;
      } else if(this.formInfo.material.length > 50) {
        this.$emit("open-modal", "O tipo não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.tipo.length > 50) {
        this.$emit("open-modal", "O tipo não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.subtipo.length > 50) {
        this.$emit("open-modal", "O tipo não pode exceder 50 caracteres.");
        return false;
      } else if(this.formInfo.liga.length > 200) {
        this.$emit("open-modal", "A liga não pode exceder 200 caracteres.");
        return false;
      } else {
        switch(this.formInfo.produto) {
          case "CANTONEIRA":
            if(this.formInfo.comprimento.length == 0 || this.formInfo.dimensaoA.length == 0 || this.formInfo.espessura.length == 0) {
              this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
              return false;
            } else if(this.formInfo.comprimento <= 0 || this.formInfo.dimensaoA <= 0 || (this.formInfo.dimensaoB <= 0 && this.formInfo.dimensaoB != "") || this.formInfo.espessura <= 0) {
              this.$emit("open-modal", "Introduza valores válidos para as dimensões.");
              return false;
            } else {
              return true;
            }
          case "PERFIL":
            if(this.formInfo.comprimento.length == 0 || this.formInfo.altura.length == 0) {
              this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
              return false;
            } else if(this.formInfo.comprimento <= 0 || this.formInfo.altura <= 0) {
              this.$emit("open-modal", "Introduza valores válidos para as dimensões.");
              return false;
            } else {
              return true;
            }
          case "CHAPA":
            if(this.formInfo.comprimento.length == 0 || this.formInfo.espessura.length == 0 || this.formInfo.largura.length == 0) {
              this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
              return false;
            } else if(this.formInfo.comprimento <= 0 || this.formInfo.largura <= 0 || this.formInfo.espessura <= 0) {
              this.$emit("open-modal", "Introduza valores válidos para as dimensões.");
              return false;
            } else {
              return true;
            }
          case "TUBULAR":
            if(this.formInfo.comprimento.length == 0 || this.formInfo.dimensaoA.length == 0 || this.formInfo.espessura.length == 0 || this.formInfo.subtipo.length == 0) {
              this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
              return false;
            } else if(this.formInfo.comprimento <= 0 || this.formInfo.dimensaoA <= 0 || (this.formInfo.dimensaoB <= 0 && this.formInfo.dimensaoB != "") || this.formInfo.espessura <= 0) {
              this.$emit("open-modal", "Introduza valores válidos para as dimensões.");
              return false;
            } else {
              return true;
            }
        }
      }
    },
    alterarMaterial() {
      switch(this.formInfo.produto) {
          case "CANTONEIRA":
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.dimensaoA;
            if(this.formInfo.dimensaoB != "") this.formInfo.dimensoes += "x" + this.formInfo.dimensaoB;
            this.formInfo.dimensoes += "x" + this.formInfo.espessura;
            break;
          case "TUBULAR":
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.dimensaoA;
            if(this.formInfo.dimensaoB != "") this.formInfo.dimensoes += "x" + this.formInfo.dimensaoB;
            this.formInfo.dimensoes += "x" + this.formInfo.espessura;
            break;
          case "CHAPA":
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.largura + "x" + this.formInfo.espessura;
            break;
          case "PERFIL":
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.altura;
            break;
        }
        
        if(this.verifyMaterialData()) {
          this.$emit("create-material", this.formInfo);

          this.produtosSearchOpen = false;
        }
    },
    chooseProduto(prod) {
      this.formInfo.produto = prod;
      this.produtosSearchOpen = false;

      this.formInfo.espessura = "";
      this.formInfo.largura = "";
      this.formInfo.comprimento = "";
      this.formInfo.altura = "";
      this.formInfo.dimensaoA = "";
      this.formInfo.dimensaoB = "";
    },
    reset() {
      this.formInfo = {...this.info};
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

  .searchbar-container {
    position: relative;
  }

  .searchbar {
    padding: 1px 11px;
    height: 32px;
    border-radius: 0.475rem;
    box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
  }

  .searchbar p {
    background: none;
    border: none;
    color: var(--light) !important;
    width: 100%;
    height: 30px;
    margin-bottom: 0px;
    font-size: var(--el-font-size-base);
    color: var(--el-input-text-color,var(--el-text-color-regular));
    display: flex;
    align-items: center;
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