<template>
  <div class="modal fade" id="kt_modal_alter_material" ref="alterMaterialModalRef" tabindex="-1" aria-hidden="true" v-on:click="reset">
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content" v-on:click="this.produtosSearchOpen = false; this.materiaisSearchOpen = false; this.tiposSearchOpen = false; this.subtiposSearchOpen = false; this.ligasSearchOpen = false">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_alter_material_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Alterar Material</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_alter_material_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary" v-on:click="reset">
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
                    <p type="text" ref="produtosSearchbar" v-on:click="this.openProdutos">{{ this.formInfo.produto }}</p>
                  </div> 
                  <div ref="produtosResults" class="searchbar-results" :class="{ 'd-none': !produtosSearchOpen }">
                    <div v-for="prod in this.getProdutos" v-bind:key="prod" v-on:click="chooseProduto(prod)">
                      {{ prod }}
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
                    <p type="text" ref="materiaisSearchbar" v-on:click="this.openMateriais">{{ this.formInfo.material }}</p>
                  </div> 
                  <div ref="materiaisResults" class="searchbar-results" :class="{ 'd-none': !materiaisSearchOpen }">
                    <div v-for="mat in this.getMateriais" v-bind:key="mat" v-on:click="chooseMaterial(mat)">
                      {{ mat }}
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->
              
              <!--begin::Input group-->
              <div class="fv-row mb-8">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Tipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <p type="text" ref="tiposSearchbar" v-on:click="this.openTipos">{{ this.formInfo.tipo }}</p>
                  </div> 
                  <div ref="tiposResults" class="searchbar-results" :class="{ 'd-none': !tiposSearchOpen }">
                    <div v-for="tipo in this.getTipos" v-bind:key="tipo" v-on:click="chooseTipo(tipo)">
                      {{ tipo }}
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.tipo == 'OUTRO'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Tipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="tipo">
                  <el-input type="text" placeholder="Tipo" v-model="this.formInfo.tipoOutro" v-on:input="this.formInfo.tipoOutro = this.formInfo.tipoOutro.toUpperCase()"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.produto == 'TUBULAR' || this.formInfo.produto == 'PERFIL'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Subtipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <p type="text" ref="subtiposSearchbar" v-on:click="this.openSubtipos">{{ this.formInfo.subtipo }}</p>
                  </div> 
                  <div ref="subtiposResults" class="searchbar-results" :class="{ 'd-none': !subtiposSearchOpen }">
                    <div v-for="sub in this.getSubtipos" v-bind:key="sub" v-on:click="chooseSubtipo(sub)">
                      {{ sub }}
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.subtipo == 'OUTRO'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Subtipo</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="subtipo">
                  <el-input type="text" placeholder="Subtipo" v-model="this.formInfo.subtipoOutro" v-on:input="this.formInfo.subtipoOutro = this.formInfo.subtipoOutro.toUpperCase()"/>
                </el-form-item>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.getLigas.length > 0 || this.formInfo.tipo == ''">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Liga</label>
                <!--end::Label-->

                <!--begin::Input-->
                <div class="searchbar-container" v-on:click.stop>
                  <div class="searchbar">
                    <p type="text" ref="ligasSearchbar" v-on:click="this.openLigas">{{ this.formInfo.liga }}</p>
                  </div> 
                  <div ref="ligasResults" class="searchbar-results" :class="{ 'd-none': !ligasSearchOpen }">
                    <div v-for="liga in this.getLigas" v-bind:key="liga" v-on:click="chooseLiga(liga)">
                      {{ liga }}
                    </div>
                  </div>  
                </div>
                <!--end::Input-->
              </div>
              <!--end::Input group-->

              <!--begin::Input group-->
              <div class="fv-row mb-8" v-if="this.formInfo.liga == 'OUTRO'">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Liga</label>
                <!--end::Label-->

                <!--begin::Input-->
                <el-form-item prop="liga">
                  <el-input type="text" placeholder="Liga" v-model="this.formInfo.ligaOutro" v-on:input="this.formInfo.ligaOutro = this.formInfo.ligaOutro.toUpperCase()"/>
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
              <div class="fv-row mb-8" v-if="(this.formInfo.produto == 'TUBULAR' && this.formInfo.subtipo == 'RETANGULO') || (this.formInfo.produto == 'TUBULAR' && this.formInfo.subtipo == 'OUTRO') || (this.formInfo.produto == 'CANTONEIRA' && this.formInfo.tipo == 'ABAS DESIGUAIS')">
                <!--begin::Label-->
                <label class="required fs-6 fw-semobold mb-2">Dimensão B (mm)</label>
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
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->

          <!--begin::Modal footer-->
          <div class="modal-footer flex-center">

            <!--begin::Button-->
            <div id="alter_material_reset_btn" v-on:click="reset" class="btn btn-light me-3" >
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
        tipoOutro: "",
        subtipo: "",
        subtipoOutro: "",
        liga: "",
        ligaOutro: "",
        comprimento: "",
        largura: "",
        espessura: "",
        altura: "",
        dimensaoA: "",
        dimensaoB: ""
      },
      produtosSearchOpen: false,
      materiaisSearchOpen: false,
      tiposSearchOpen: false,
      subtiposSearchOpen: false,
      ligasSearchOpen: false,
      materialInfo: [
        {
          produto: "CHAPA",
          materiais: [
            {
              material: "AÇO",
              tipos: [
                {
                  tipo: "BRUTO",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"]
                },
                {
                  tipo: "ZINCOR",
                  ligas: ["N/A"]
                },
                {
                  tipo: "CORTEN",
                  ligas: ["N/A"]
                },
                {
                  tipo: "GALVA",
                  ligas: ["N/A"]
                },
                {
                  tipo: "LACADO",
                  ligas: ["N/A"]
                },
                {
                  tipo: "ANTIDERRAPANTE",
                  ligas: ["N/A"]
                },
                {
                  tipo: "OUTRO",
                  ligas: ["N/A"]
                }
              ]
            },
            {
              material: "INOX",
              tipos: [
                {
                  tipo: "2B",
                  ligas: ["304", "316", "OUTRO", "N/A"]
                },
                {
                  tipo: "LÂMINA A QUENTE",
                  ligas: ["304", "316", "OUTRO", "N/A"]
                },
                {
                  tipo: "ESCOVADO",
                  ligas: ["304", "316", "OUTRO", "N/A"]
                },
                {
                  tipo: "POLIDO",
                  ligas: ["304", "316", "OUTRO", "N/A"]
                }
              ]
            },
            {
              material: "ALUMÍNIO",
              tipos: [
                {
                  tipo: "BRUTO",
                  ligas: ["1050", "1754", "N/A"]
                },
                {
                  tipo: "LACADO",
                  ligas: ["N/A"]
                },
                {
                  tipo: "ANTIDERRAPANTE",
                  ligas: ["N/A"]
                }
              ]
            }
          ]
        },
        {
          produto: "PERFIL",
          materiais: [
            {
              material: "AÇO",
              tipos: [
                {
                  tipo: "IPE",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["80", "100", "120", "140", "160", "180", "200", "220", "240", "270", "300", "330", "360", "400", "450", "500", "550", "600", "OUTRO"]
                },
                {
                  tipo: "HEA",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["100", "120", "140", "160", "180", "200", "220", "240", "260", "280", "300", "320", "340", "360", "400", "450", "500", "550", "600", "OUTRO"]
                },
                {
                  tipo: "HEB",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["100", "120", "140", "160", "180", "200", "220", "240", "260", "280", "300", "320", "340", "360", "400", "450", "500", "550", "600", "OUTRO"]
                },
                {
                  tipo: "HEM",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["100", "120", "140", "160", "180", "200", "220", "240", "260", "280", "300", "320", "340", "360", "400", "450", "500", "550", "600", "OUTRO"]
                },
                {
                  tipo: "UPN",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["80", "100", "120", "140", "160", "180", "200", "220", "240", "260", "280", "300", "320", "350", "380", "400", "OUTRO"]
                }
              ]
            }
          ]
        },
        {
          produto: "CANTONEIRA",
          materiais: [
            {
              material: "AÇO",
              tipos: [
                {
                  tipo: "ABAS IGUAIS",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"]
                },
                {
                  tipo: "ABAS DESIGUAIS",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"]
                }
              ]
            }
          ]
        },
        {
          produto: "TUBULAR",
          materiais: [
            {
              material: "AÇO",
              tipos: [
                {
                  tipo: "BRUTO",
                  ligas: ["S235", "S275", "S355", "OUTRO", "N/A"],
                  subtipos: ["QUADRADO", "REDONDO", "RETANGULO", "OUTRO"]
                },
                {
                  tipo: "GALVA",
                  ligas: ["N/A"],
                  subtipos: ["QUADRADO", "REDONDO", "RETANGULO", "OUTRO"]
                }
              ]
            },
            {
              material: "INOX",
              tipos: [
                {
                  tipo: "BRUTO",
                  ligas: ["304", "316", "OUTRO", "N/A"],
                  subtipos: ["QUADRADO", "REDONDO", "RETANGULO", "OUTRO"]
                },
                {
                  tipo: "ESCOVADO",
                  ligas: ["304", "316", "OUTRO", "N/A"],
                  subtipos: ["QUADRADO", "REDONDO", "RETANGULO", "OUTRO"]
                },
                {
                  tipo: "POLIDO",
                  ligas: ["304", "316", "OUTRO", "N/A"],
                  subtipos: ["QUADRADO", "REDONDO", "RETANGULO", "OUTRO"]
                }
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.formInfo = this.info;
  },
  computed: {
    getProdutos() {
      let produtos = [];

      this.materialInfo.forEach(prod => produtos.push(prod.produto));

      return produtos;
    },
    getMateriais() {
      let materiais = [];

      this.materialInfo.forEach(prod => {
        if(prod.produto == this.formInfo.produto) {
          prod.materiais.forEach(mat => materiais.push(mat.material));
        }
      });

      return materiais;
    },
    getTipos() {
      let tipos = [];

      this.materialInfo.forEach(prod => {
        if(prod.produto == this.formInfo.produto) {
          prod.materiais.forEach(mat => {
            if(mat.material == this.formInfo.material) {
              mat.tipos.forEach(tipo => tipos.push(tipo.tipo));
            }
          });
        }
      });

      return tipos;
    },
    getLigas() {
      let ligas = [];

      this.materialInfo.forEach(prod => {
        if(prod.produto == this.formInfo.produto) {
          prod.materiais.forEach(mat => {
            if(mat.material == this.formInfo.material) {
              mat.tipos.forEach(tipo => {
                if(tipo.tipo == this.formInfo.tipo) {
                  tipo.ligas.forEach(liga => ligas.push(liga));
                }
              });
            }
          });
        }
      });

      return ligas;
    },
    getSubtipos() {
      let subtipos = [];

      this.materialInfo.forEach(prod => {
        if(prod.produto == this.formInfo.produto && (this.formInfo.produto == "TUBULAR" || this.formInfo.produto == "PERFIL")) {
          prod.materiais.forEach(mat => {
            if(mat.material == this.formInfo.material) {
              mat.tipos.forEach(tipo => {
                if(tipo.tipo == this.formInfo.tipo) {
                  tipo.subtipos.forEach(sub => subtipos.push(sub));
                }
              });
            }
          });
        }
      });

      return subtipos;
    }
  },
  methods: {
    verifyMaterialData() {
      if(this.formInfo.produto.length == 0 || this.formInfo.material.length == 0 || this.formInfo.tipo.length == 0 || this.formInfo.liga.length == 0 || (this.formInfo.liga == "OUTRO" && this.formInfo.ligaOutro == "") || (this.formInfo.subtipo == "OUTRO" && this.formInfo.subtipoOutro == "") || (this.formInfo.tipo == "OUTRO" && this.formInfo.tipoOutro == "")) {
        this.$emit("open-modal", "Preencha todos os campos obrigatórios.");
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
            this.formInfo.altura = this.formInfo.subtipo;
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.altura;
            break;
        }
        
        if(this.verifyMaterialData()) {
          if(this.formInfo.liga == "OUTRO") this.formInfo.liga = this.formInfo.ligaOutro;
          if(this.formInfo.subtipo == "OUTRO") this.formInfo.subtipo = this.formInfo.subtipoOutro;
          if(this.formInfo.tipo == "OUTRO") this.formInfo.tipo = this.formInfo.tipoOutro;

          if(this.formInfo.produto == "PERFIL") {
            this.formInfo.altura = this.formInfo.subtipo;
            this.formInfo.dimensoes = this.formInfo.comprimento + "x" + this.formInfo.altura;
          } 

          this.$emit("alter-material", this.formInfo);

          this.produtosSearchOpen = false;
          this.materiaisSearchOpen = false;
          this.ligasSearchOpen = false;
          this.tiposSearchOpen = false;
          this.subtiposSearchOpen = false;
        }
    },
    chooseProduto(prod) {
      this.formInfo.produto = prod;
      this.produtosSearchOpen = false;
      
      this.formInfo.material = "";
      this.formInfo.tipo = "";
      this.formInfo.tipoOutro = "";
      this.formInfo.subtipo = "";
      this.formInfo.subtipoOutro = "";
      this.formInfo.liga = "";
      this.formInfo.ligaOutro = "";

      this.formInfo.espessura = "";
      this.formInfo.largura = "";
      this.formInfo.comprimento = "";
      this.formInfo.altura = "";
      this.formInfo.dimensaoA = "";
      this.formInfo.dimensaoB = "";
    },
    chooseMaterial(mat) {
      this.formInfo.material = mat;
      this.materiaisSearchOpen = false;

      this.formInfo.tipo = "";
      this.formInfo.tipoOutro = "";
      this.formInfo.subtipo = "";
      this.formInfo.subtipoOutro = "";
      this.formInfo.liga = "";
      this.formInfo.ligaOutro = "";
    },
    chooseTipo(tipo) {
      this.formInfo.tipo = tipo;
      this.tiposSearchOpen = false;

      this.formInfo.subtipo = "";
      this.formInfo.subtipoOutro = "";
      this.formInfo.liga = "";
      this.formInfo.ligaOutro = "";

      if(tipo != "ABAS DESIGUAIS" || tipo != "RETANGULO" || tipo != "OUTRO") this.formInfo.dimensaoB = "";

      if(tipo != "OUTRO") this.formInfo.tipoOutro = "";
    },
    chooseSubtipo(sub) {
      this.formInfo.subtipo = sub;
      this.subtiposSearchOpen = false;

      if(sub != "OUTRO") this.formInfo.subtipoOutro = "";
    },
    chooseLiga(liga) {
      this.formInfo.liga = liga;
      this.ligasSearchOpen = false;

      if(liga != "OUTRO") this.formInfo.ligaOutro = "";
    },
    reset(event) {
      if(event.target.id == "kt_modal_alter_material" || event.target.id == "kt_modal_alter_material_close" || event.target.id == "kt_modal_alter_material_close_btn" || event.target.parentElement.id == "kt_modal_alter_material_close_btn" || event.target.id == "alter_material_reset_btn") {
        this.formInfo = {...this.info};

        this.produtosSearchOpen = false;
        this.materiaisSearchOpen = false;
        this.ligasSearchOpen = false;
        this.tiposSearchOpen = false;
        this.subtiposSearchOpen = false;
      }
    },
    openProdutos() {
      this.produtosSearchOpen = true;
      this.materiaisSearchOpen = false;
      this.tiposSearchOpen = false;
      this.subtiposSearchOpen = false;
      this.ligasSearchOpen = false;
    },
    openMateriais() {
      this.produtosSearchOpen = false;
      this.materiaisSearchOpen = true;
      this.tiposSearchOpen = false;
      this.subtiposSearchOpen = false;
      this.ligasSearchOpen = false;
    },
    openTipos() {
      this.produtosSearchOpen = false;
      this.materiaisSearchOpen = false;
      this.tiposSearchOpen = true;
      this.subtiposSearchOpen = false;
      this.ligasSearchOpen = false;
    },
    openSubtipos() {
      this.produtosSearchOpen = false;
      this.materiaisSearchOpen = false;
      this.tiposSearchOpen = false;
      this.subtiposSearchOpen = true;
      this.ligasSearchOpen = false;
    },
    openLigas() {
      this.produtosSearchOpen = false;
      this.materiaisSearchOpen = false;
      this.tiposSearchOpen = false;
      this.subtiposSearchOpen = false;
      this.ligasSearchOpen = true;
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
    max-height: 200px;

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