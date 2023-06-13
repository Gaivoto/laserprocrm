<template>
  <div class="modal fade" id="kt_modal_pessoas" ref="pessoasModalRef" tabindex="-1" aria-hidden="true" >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered person-list-size">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header" id="kt_modal_pessoas_header">
          <!--begin::Modal title-->
          <h2 class="fw-bold">Lista de Pessoas de Contacto</h2>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div id="kt_modal_pessoas_close" data-bs-dismiss="modal" class="btn btn-icon btn-sm btn-active-icon-primary">
            <KTIcon icon-name="cross" icon-class="fs-1" />
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Card toolbar-->
          <div class="card-toolbar modal-add-btn" v-if="this.$store.getters.getUser.tipo != 'user'">
            <!--begin::Toolbar-->
            <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base" >
              <!--begin::Add customer-->
              <button type="button" class="btn btn-primary" v-on:click="this.createModalOpen = true">
                <KTIcon icon-name="plus" icon-class="fs-2" />
                Adicionar Pessoa de Contacto
              </button>
              <!--end::Add customer-->
            </div>
            <!--end::Toolbar-->
          </div>
        <!--end::Card toolbar-->

        <!--begin::Form-->
        <el-form :model="formInfo" ref="formRef">
          <!--begin::Modal body-->
          <div class="modal-body">
            <!--begin::Scroll-->
            <div class="scroll-y me-n7 pe-7" id="kt_modal_pessoas_scroll" data-kt-scroll="true" data-kt-scroll-activate="{default: false, lg: true}" data-kt-scroll-max-height="auto" data-kt-scroll-dependencies="#kt_modal_add_customer_header" data-kt-scroll-wrappers="#kt_modal_add_customer_scroll" data-kt-scroll-offset="300px">
              <div class="card-body pt-0">
                <Datatable @on-sort="sort" :data="this.pessoas" :header="tableHeader" :enable-items-per-page-dropdown="true" class="datatable">
                  <template v-slot:nome="{ row: pessoa }">
                    {{ pessoa.nome }}
                  </template>
                  <template v-slot:email="{ row: pessoa }">
                    {{ pessoa.email }}
                  </template>
                  <template v-slot:cargo="{ row: pessoa }">
                    {{ pessoa.cargo }}
                  </template>
                  <template v-slot:contacto="{ row: pessoa }">
                    {{ pessoa.contacto }}
                  </template>
                  <template v-slot:estado="{ row: pessoa }">
                    {{ pessoa.estado }}
                  </template>
                  <template v-slot:actions="{ row: pessoa }">
                    <span title="Alterar Pessoa de Contacto" v-if="this.$store.getters.getUser.tipo != 'user'" v-on:click="getPessoaToEdit(pessoa.id)" class="material-icons">edit</span>
                    <span title="Ativar Pessoa de Contacto" v-if="pessoa.estado == 'Inativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="togglePessoa(pessoa.id, 'Ativo')" class="material-icons">check_circle</span>
                    <span title="Desativar Pessoa de Contacto" v-if="pessoa.estado == 'Ativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="togglePessoa(pessoa.id, 'Inativo')" class="material-icons">cancel</span>
                  </template>
                </Datatable>
              </div>
            </div>
            <!--end::Scroll-->
          </div>
          <!--end::Modal body-->
        </el-form>
        <!--end::Form-->
      </div>
    </div>
    <AddPessoaModal :class="{ 'show': this.createModalOpen }" v-on:create-pessoa="createPessoa" v-on:open-modal="openModal" v-on:close-create-pessoa="this.createModalOpen = false"></AddPessoaModal>
    <AlterPessoaModal :class="{ 'show': this.alterModalOpen }" v-on:alter-pessoa="alterPessoa" v-on:open-modal="openModal" v-on:close-alter-pessoa="this.alterModalOpen = false" v-bind:info="this.editPessoa"></AlterPessoaModal>
  </div>
</template>

<script>
import { ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddPessoaModal from "@/components/modals/AddPessoaModal.vue";
import AlterPessoaModal from "@/components/modals/AlterPessoaModal.vue";
import axios from "axios";

export default {
  name: "PersonListModal",
  components: {
    Datatable,
    AddPessoaModal,
    AlterPessoaModal
  },
  props: {
    idFornecedor: {
      type: String,
      required: true
    },
    info: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tableHeader: [],
      pessoas: [],
      createModalOpen: false,
      alterModalOpen: false,
      editPessoa: {
        id: "",
        nome: "",
        email: "",
        cargo: "",
        contacto: ""
      }
    }
  },
  mounted() {
    let headerInfo = [
      {
        columnName: "Nome",
        columnLabel: "nome",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 200,
      },
      {
        columnName: "Cargo",
        columnLabel: "cargo",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Contacto",
        columnLabel: "contacto",
        sortEnabled: true,
        columnWidth: 130,
      },
      {
        columnName: "Estado",
        columnLabel: "estado",
        sortEnabled: true,
        columnWidth: 80,
      }
    ];

    if(this.$store.getters.getUser.tipo != 'user') {
      headerInfo.push({
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 100,
      });
    }

    this.tableHeader = ref(headerInfo);
  },
  methods: {
    sort(sort) {
      switch(sort.label) {
        case "nome":
          if(sort.order == "asc") this.pessoas.sort((a, b) => a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0);
          else this.pessoas.sort((a, b) => a.nome < b.nome ? 1 : b.nome < a.nome ? -1 : 0);
          break;
        case "email":
          if(sort.order == "asc") this.pessoas.sort((a, b) => a.email > b.email ? 1 : b.email > a.email ? -1 : 0);
          else this.pessoas.sort((a, b) => a.email < b.email ? 1 : b.email < a.email ? -1 : 0);
          break;
        case "cargo":
          if(sort.order == "asc") this.pessoas.sort((a, b) => a.cargo > b.cargo ? 1 : b.cargo > a.cargo ? -1 : 0);
          else this.pessoas.sort((a, b) => a.cargo < b.cargo ? 1 : b.cargo < a.cargo ? -1 : 0);
          break;
        case "contacto":
          if(sort.order == "asc") this.pessoas.sort((a, b) => a.contacto > b.contacto ? 1 : b.contacto > a.contacto ? -1 : 0);
          else this.pessoas.sort((a, b) => a.contacto < b.contacto ? 1 : b.contacto < a.contacto ? -1 : 0);
          break;
        case "estado":
          if(sort.order == "asc") this.pessoas.sort((a, b) => a.estado > b.estado ? 1 : b.estado > a.estado ? -1 : 0);
          else this.pessoas.sort((a, b) => a.estado < b.estado ? 1 : b.estado < a.estado ? -1 : 0);
          break;
      }
    },
    getPessoaToEdit(id){
      this.alterModalOpen = true;
      this.pessoas.forEach(p => {
        if(p.id == id) {
          this.editPessoa = p;
          this.editPessoa.idFornecedor = this.idFornecedor;
        }
      });
    },
    createPessoa(info) {
      info.idFornecedor = this.idFornecedor;

      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/pessoas/`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.$emit('refresh-pessoas');
        this.$emit('open-modal', "Pessoa de contacto criada com sucesso.");
        this.createModalOpen = false;
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
    togglePessoa(id, estado) {
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/pessoas/${id}/toggle`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: {
          estado: estado
        }
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.$emit('refresh-pessoas');
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
    alterPessoa(info){
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/pessoas/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.$emit('refresh-pessoas');
        this.$emit('open-modal', "Pessoa de contacto alterada com sucesso.");
        this.alterModalOpen = false;
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
    openModal(msg) {
      this.$emit("open-modal", msg);
    }
  },
  watch: {
    info: function(info) {
      this.pessoas = [...info];
    }
  }
}
</script>

<style scoped>
  .override-mr0 {
    margin-right: 0px !important;
  }

  .person-list-size {
    max-width: 80%;
  }

  .datatable :last-child * {
    margin-left: 8px;
    cursor: pointer;
  }

  .modal-add-btn {
    margin-right: 54px;
    margin-top: 16px;
  }

  .row {
    margin-top: 32px !important;
  }
</style>