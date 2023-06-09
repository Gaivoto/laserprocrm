<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" @input="searchFilter" ref="searchBar" class="form-control form-control-solid w-250px ps-15" placeholder="Procurar fornecedores" />
        </div>
        <!--end::Search-->
        <!--begin::Filter-->
        <div class="d-flex align-items-center position-relative my-1">
          <div class="custom-select">
            <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen">{{ this.state }}</div>
            <div class="items" :class="{ selectHide: !stateOpen }">
              <div v-on:click="selectState('Ativo')">{{ "Ativo" }}</div>
              <div v-on:click="selectState('Inativo')">{{ "Inativo" }}</div>
            </div>
          </div>    
        </div>
        <!--end::Filter-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar" v-if="this.$store.getters.getUser.tipo != 'user'">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base" >
          <!--begin::Add customer-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_fornecedor" data-backdrop="false" v-on:click="this.createModalOpen = true">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Adicionar Fornecedor
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" :data="this.fornecedoresFiltered" :header="tableHeader" :enable-items-per-page-dropdown="true" class="datatable">
        <template v-slot:nome="{ row: fornecedor }">
          {{ fornecedor.nome }}
        </template>
        <template v-slot:email="{ row: fornecedor }">
          <a href="#" class="text-gray-600 text-hover-primary mb-1">
            {{ fornecedor.email }}
          </a>
        </template>
        <template v-slot:morada="{ row: fornecedor }">
          {{ fornecedor.morada }}
        </template>
        <template v-slot:contacto="{ row: fornecedor }">
          {{ fornecedor.contacto }}
        </template>
        <template v-slot:nif="{ row: fornecedor }">
          {{ fornecedor.nif }}
        </template>
        <template v-slot:estado="{ row: fornecedor }">
          {{ fornecedor.estado }}
        </template>
        <template v-slot:actions="{ row: fornecedor }">
          <span title="Alterar Fornecedor" v-if="this.$store.getters.getUser.tipo != 'user'" v-on:click="getFornecedorToEdit(fornecedor.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_fornecedor" class="material-icons">edit</span>
          <span title="Ativar Fornecedor" v-if="fornecedor.estado == 'Inativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleFornecedor(fornecedor.id, 'Ativo')" class="material-icons">check_circle</span>
          <span title="Desativar Fornecedor" v-if="fornecedor.estado == 'Ativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleFornecedor(fornecedor.id, 'Inativo')" class="material-icons">cancel</span>
          <span title="Ver Pessoas de Contacto" v-on:click="openPessoas(fornecedor.id, fornecedor.pessoas)" data-bs-toggle="modal" data-bs-target="#kt_modal_pessoas" class="material-icons">group</span>
        </template>
      </Datatable>
    </div>
    <AddFornecedorModal v-show="this.createModalOpen" v-on:create-fornecedor="createFornecedor" v-on:open-modal="openModal"></AddFornecedorModal>
    <AlterFornecedorModal v-show="this.alterModalOpen" v-bind:info="this.editFornecedor" v-on:alter-fornecedor="alterFornecedor" v-on:open-modal="openModal"></AlterFornecedorModal>
    <PersonListModal v-show="this.pessoasModalOpen" v-on:open-modal="openModal" v-on:refresh-pessoas="getAllFornecedores" v-bind:info="this.pessoas" v-bind:idFornecedor="this.fornPessId"></PersonListModal>
    <button ref="hidemodal1" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_add_fornecedor"></button>
    <button ref="hidemodal2" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_fornecedor"></button>
    <button ref="hidemodal3" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_pessoas"></button>
  </div>
</template>

<script>
import { ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddFornecedorModal from "@/components/modals/AddFornecedorModal.vue";
import AlterFornecedorModal from "@/components/modals/AlterFornecedorModal.vue";
import PersonListModal from "@/components/modals/PersonListModal.vue";
import axios from "axios";

export default {
  name: "Fornecedores",
  components: {
    Datatable,
    AddFornecedorModal,
    AlterFornecedorModal,
    PersonListModal
  },
  data() {
    return {
      fornecedores: [],
      fornecedoresFiltered: [],
      fornPessId: "",
      pessoas: [],
      stateOpen: false,
      state: "Estado",
      createModalOpen: false,
      alterModalOpen: false,
      pessoasModalOpen: false,
      editFornecedor: {
        id: "",
        nome: "",
        email: "",
        contacto: "",
        nif: "",
        morada: ""
      }
    }
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Fornecedor",
        columnLabel: "nome",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Email",
        columnLabel: "email",
        sortEnabled: true,
        columnWidth: 170,
      },
      {
        columnName: "Morada",
        columnLabel: "morada",
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
        columnName: "NIF",
        columnLabel: "nif",
        sortEnabled: true,
        columnWidth: 130,
      },
      {
        columnName: "Estado",
        columnLabel: "estado",
        sortEnabled: true,
        columnWidth: 80,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 130,
      },
    ]);

    return {
      tableHeader
    };
  },
  created() {
    if(!this.$store.getters.getUser.id) {
      this.$router.push({ name: "login" });
    } else {
      this.getAllFornecedores();
    }
  },
  methods: {
    sort(sort) {
      switch(sort.label) {
        case "nome":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.nome > b.nome ? 1 : b.nome > a.nome ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.nome < b.nome ? 1 : b.nome < a.nome ? -1 : 0);
          break;
        case "email":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.email > b.email ? 1 : b.email > a.email ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.email < b.email ? 1 : b.email < a.email ? -1 : 0);
          break;
        case "morada":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.morada > b.morada ? 1 : b.morada > a.morada ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.morada < b.morada ? 1 : b.morada < a.morada ? -1 : 0);
          break;
        case "nif":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.nif > b.nif ? 1 : b.nif > a.nif ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.nif < b.nif ? 1 : b.nif < a.nif ? -1 : 0);
          break;
        case "contacto":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.contacto > b.contacto ? 1 : b.contacto > a.contacto ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.contacto < b.contacto ? 1 : b.contacto < a.contacto ? -1 : 0);
          break;
        case "estado":
          if(sort.order == "asc") this.fornecedoresFiltered.sort((a, b) => a.estado > b.estado ? 1 : b.estado > a.estado ? -1 : 0);
          else this.fornecedoresFiltered.sort((a, b) => a.estado < b.estado ? 1 : b.estado < a.estado ? -1 : 0);
          break;
      }
    },
    searchFilter() {
      this.fornecedoresFiltered = [];
      let search = this.$refs.searchBar.value;

      if(search != "") {
        this.fornecedores.forEach(f => {
          if(f.nome.includes(search) || f.nif.includes(search) || f.morada.includes(search) || f.contacto.includes(search) || f.email.includes(search)){
            this.fornecedoresFiltered.push(f);
          }
        });
      } else {
        this.fornecedores.forEach(f => this.fornecedoresFiltered.push(f));
      }

      if(this.state != "Estado") {
        this.fornecedoresFiltered = this.fornecedoresFiltered.filter(f => f.estado == this.state);
      }
    },
    selectState(state) {
      this.state = state;
      this.stateOpen = false;
      this.searchFilter();
    },
    getFornecedorToEdit(id){
      this.alterModalOpen = true;
      this.fornecedores.forEach(f => {
        if(f.id == id) this.editFornecedor = f;
      });
    },
    openPessoas(id, pessoas){
      this.pessoasModalOpen = true;
      this.fornPessId = id;
      this.pessoas = [];
      pessoas.forEach(p => {
        this.pessoas.push(p);
      });
    },
    getAllFornecedores() {
      this.fornecedores = [];
      this.fornecedoresFiltered = [];
      this.state = "Estado";

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
        value.data.fornecedores.forEach(f => this.fornecedoresFiltered.push(f));
        this.fornecedores.forEach(f => {
          f.pessoas.sort((a, b) => a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
          if(f.id == this.fornPessId) {
            this.pessoas = [...f.pessoas];
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
    createFornecedor(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal1.click();
      
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/fornecedores`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllFornecedores();
        this.$emit("open-modal", "Fornecedor criado com sucesso.");
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
    toggleFornecedor(id, estado) {
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/fornecedores/${id}/toggle`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: {
          estado: estado
        }
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);;
        this.fornecedores.forEach(f => {
          if(f.id == id) f.estado = estado;
        });
        this.fornecedoresFiltered.forEach(f => {
          if(f.id == id) f.estado = estado;
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
    alterFornecedor(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal2.click();
      
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/fornecedores/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllFornecedores();
        this.$emit("open-modal", "Fornecedor alterado com sucesso.");
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
  }
}
</script>

<style scoped>
  .custom-select {
    position: relative;
    width: 250px;
    text-align: left;
    height: 43px;
    line-height: 43px;
    margin-left: 16px;
    font-size: 1.1rem;
    font-weight: 500;
    border-radius: 0.475rem;
  }

  .custom-select .selected {
    background-color: var(--bs-gray-100);
    border-radius: 0.475rem;
    color: var(--light);
    border-color: var(--bs-gray-100);
    padding-left: 1em;
    cursor: pointer;
    margin-bottom: 8px;
    color: var(--bs-gray-700);
  }

  .custom-select .selected:after {
    position: absolute;
    content: "";
    top: 22px;
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

  @media (max-width: 900px) {
    .card-title {
      display: block !important;
    }

    .custom-select {
      margin-left: 0px;
      margin-top: 16px;
    }
  }

  .datatable :last-child * {
    margin-left: 8px;
    cursor: pointer;
  }
</style>