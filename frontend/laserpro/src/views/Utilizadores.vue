<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title" :class="{ 'superadm': this.$store.getters.getUser.tipo == 'superadm' }">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" @input="searchFilter" ref="searchBar" class="form-control form-control-solid w-250px ps-15" placeholder="Procurar utilizadores" />
        </div>
        <!--end::Search-->
        <div class="filter-wrapper">
          <!--begin::Filter-->
          <div class="d-flex align-items-center position-relative my-1">
            <div class="custom-select">
              <div class="selected" :class="{ open: typeOpen }" v-on:click="typeOpen=!typeOpen; stateOpen = false">{{ this.type }}</div>
              <div class="items" :class="{ selectHide: !typeOpen }">
                <div v-on:click="selectType('Todos')">{{ "Todos" }}</div>
                <div v-on:click="selectType('user')">{{ "Utilizadores" }}</div>
                <div v-on:click="selectType('admin')">{{ "Administradores" }}</div>
              </div>
            </div>    
          </div>
          <!--end::Filter-->
          <!--begin::Filter-->
          <div class="d-flex align-items-center position-relative my-1">
            <div class="custom-select">
              <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen; typeOpen = false">{{ this.state }}</div>
              <div class="items" :class="{ selectHide: !stateOpen }">
                <div v-on:click="selectState('Ativo')">{{ "Ativo" }}</div>
                <div v-on:click="selectState('Inativo')">{{ "Inativo" }}</div>
              </div>
            </div>    
          </div>
          <!--end::Filter-->
        </div>
      </div>
      <!--begin::Card title-->
      <div class="create-wrapper" :class="{ 'superadm': this.$store.getters.getUser.tipo == 'superadm' }">
        <!--begin::Card toolbar-->
        <div class="card-toolbar" v-if="this.$store.getters.getUser.tipo == 'superadm'">
          <!--begin::Toolbar-->
          <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base" >
            <!--begin::Add customer-->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_adm" data-backdrop="false" v-on:click="this.createAdmModalOpen = true">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Adicionar Administrador
            </button>
            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card toolbar-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar" v-if="this.$store.getters.getUser.tipo != 'user'">
          <!--begin::Toolbar-->
          <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base" >
            <!--begin::Add customer-->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user" data-backdrop="false" v-on:click="this.createUserModalOpen = true">
              <KTIcon icon-name="plus" icon-class="fs-2" />
              Adicionar Utilizador
            </button>
            <!--end::Add customer-->
          </div>
          <!--end::Toolbar-->
        </div>
        <!--end::Card toolbar-->  
      </div>
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" :data="this.usersFiltered" :header="tableHeader" :enable-items-per-page-dropdown="true" class="datatable">
        <template v-slot:username="{ row: user }">
          {{ user.username }}
        </template>
        <template v-slot:tipo="{ row: user }">
          {{ user.tipo }}
        </template>
        <template v-slot:estado="{ row: user }">
          {{ user.estado }}
        </template>
        <template v-slot:actions="{ row: user }">
          <div v-if="user.tipo == 'user'">
            <span title="Alterar Utilizador" v-if="this.$store.getters.getUser.tipo != 'user'" v-on:click="getUserToEdit(user.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_user" class="material-icons">edit</span>
            <span title="Ativar Utilizador" v-if="user.estado == 'Inativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleUser(user.id, 'Ativo')" class="material-icons">check_circle</span>
            <span title="Desativar Utilizador" v-if="user.estado == 'Ativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleUser(user.id, 'Inativo')" class="material-icons">cancel</span>
          </div>
          <div v-else-if="user.tipo == 'adm'">
            <span title="Alterar Administrador" v-if="this.$store.getters.getUser.tipo == 'superadm'" v-on:click="getAdmToEdit(user.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_adm" class="material-icons">edit</span>
            <span title="Ativar Administrador" v-if="user.estado == 'Inativo' && this.$store.getters.getUser.tipo == 'superadm'" v-on:click="toggleAdm(user.id, 'Ativo')" class="material-icons">check_circle</span>
            <span title="Desativar Administrador" v-if="user.estado == 'Ativo' && this.$store.getters.getUser.tipo == 'superadm'" v-on:click="toggleAdm(user.id, 'Inativo')" class="material-icons">cancel</span>
          </div>
          <div v-else>
            <span title="Alterar Administrador" v-if="this.$store.getters.getUser.tipo == 'superadm'" v-on:click="getAdmToEdit(user.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_adm" class="material-icons">edit</span>
          </div>
        </template>
      </Datatable>
    </div>
    <AddUserModal v-show="this.createUserModalOpen" v-on:create-user="createUser" v-on:open-modal="openModal"></AddUserModal>
    <AlterUserModal v-show="this.alterUserModalOpen" v-bind:info="this.editUser" v-on:alter-user="alterUser" v-on:open-modal="openModal"></AlterUserModal>
    <AddAdmModal v-show="this.createAdmModalOpen" v-on:create-adm="createAdm" v-on:open-modal="openModal"></AddAdmModal>
    <AlterAdmModal v-show="this.alterAdmModalOpen" v-bind:info="this.editAdm" v-on:alter-adm="alterAdm" v-on:open-modal="openModal"></AlterAdmModal>
    <button ref="hidemodal1" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_add_user"></button>
    <button ref="hidemodal2" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_user"></button>
    <button ref="hidemodal3" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_add_adm"></button>
    <button ref="hidemodal4" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_adm"></button>
  </div>
</template>

<script>
import { ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddUserModal from "@/components/modals/AddUserModal.vue";
import AlterUserModal from "@/components/modals/AlterUserModal.vue";
import AddAdmModal from "@/components/modals/AddAdmModal.vue";
import AlterAdmModal from "@/components/modals/AlterAdmModal.vue";
import axios from "axios";

export default {
  name: "Utilizadores",
  components: {
    Datatable,
    AddUserModal,
    AlterUserModal,
    AddAdmModal,
    AlterAdmModal
  },
  data() {
    return {
      users: [],
      usersFiltered: [],
      stateOpen: false,
      typeOpen: false,
      state: "Estado",
      type: "Todos",
      createUserModalOpen: false,
      alterUserModalOpen: false,
      createAdmModalOpen: false,
      alterAdmModalOpen: false,
      editUser: {
        id: "",
        username: ""
      },
      editAdm: {
        id: "",
        username: ""
      }
    }
  },
  setup() {
    const tableHeader = ref([
      {
        columnName: "Username",
        columnLabel: "username",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Tipo",
        columnLabel: "tipo",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Estado",
        columnLabel: "estado",
        sortEnabled: true,
        columnWidth: 135,
      },
      {
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 135,
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
      this.getAllUsers();
    }
  },
  methods: {
    sort(sort) {
      switch(sort.label) {
        case "username":
          if(sort.order == "asc") this.usersFiltered.sort((a, b) => a.username > b.username ? 1 : b.username > a.username ? -1 : 0);
          else this.usersFiltered.sort((a, b) => a.username < b.username ? 1 : b.username < a.username ? -1 : 0);
          break;
        case "tipo":
          if(sort.order == "asc") this.usersFiltered.sort((a, b) => a.tipo > b.tipo ? 1 : b.tipo > a.tipo ? -1 : 0);
          else this.usersFiltered.sort((a, b) => a.tipo < b.tipo ? 1 : b.tipo < a.tipo ? -1 : 0);
          break;
        case "estado":
          if(sort.order == "asc") this.usersFiltered.sort((a, b) => a.estado > b.estado ? 1 : b.estado > a.estado ? -1 : 0);
          else this.usersFiltered.sort((a, b) => a.estado < b.estado ? 1 : b.estado < a.estado ? -1 : 0);
          break;
      }
    },
    searchFilter() {
      this.usersFiltered = [];
      let search = this.$refs.searchBar.value;

      if(search != "") {
        this.users.forEach(u => {
          if(u.username.includes(search)) this.usersFiltered.push(u);
        });
      } else {
        this.users.forEach(u => this.usersFiltered.push(u));
      }

      if(this.state != "Estado") {
        this.usersFiltered = this.usersFiltered.filter(u => u.estado == this.state);
      }

      if(this.type != "Todos") {
        if(this.type == "user") {
          this.usersFiltered = this.usersFiltered.filter(u => u.tipo == "user");
        } else {
          this.usersFiltered = this.usersFiltered.filter(u => u.tipo != "user");
        }
      }
    },
    selectState(state) {
      this.state = state;
      this.stateOpen = false;
      this.searchFilter();
    },
    selectType(type) {
      this.type = type;
      this.typeOpen = false;
      this.searchFilter();
    },
    getUserToEdit(id){
      this.alterUserModalOpen = true;
      this.users.forEach(u => {
        if(u.id == id) this.editUser = u;
      });
    },
    getAdmToEdit(id){
      this.alterAdmModalOpen = true;
      this.users.forEach(u => {
        if(u.id == id) this.editAdm = u;
      });
    },
    getAllUsers() {
      this.users = [];
      this.usersFiltered = [];
      this.state = "Estado";
      this.type = "Todos";

      axios({
        method: 'get',
        url: `${import.meta.env.VITE_HOST}/users`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        value.data.users.forEach(u => this.users.push(u));
        value.data.users.forEach(u => this.usersFiltered.push(u));
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
    createUser(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal1.click();
      
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/users`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllUsers();
        this.$emit("open-modal", "Utiilizador criado com sucesso.");
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
    createAdm(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal3.click();
      
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/users/adms`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllUsers();
        this.$emit("open-modal", "Administrador criado com sucesso.");
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
    toggleUser(id, estado) {
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/users/${id}/toggle`,
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
        this.users.forEach(u => {
          if(u.id == id) u.estado = estado;
        });
        this.usersFiltered.forEach(u => {
          if(u.id == id) u.estado = estado;
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
    toggleAdm(id, estado) {
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/users/adms/${id}/toggle`,
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
        this.users.forEach(u => {
          if(u.id == id) u.estado = estado;
        });
        this.usersFiltered.forEach(u => {
          if(u.id == id) u.estado = estado;
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
    alterUser(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal2.click();

      this.editUser = {
        id: "",
        username: ""
      }
      
      this.editAdm = {
        id: "",
        username: ""
      }
      
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/users/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllUsers();
        this.$emit("open-modal", "Utilizador alterado com sucesso.");
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
    alterAdm(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal4.click();

      this.editUser = {
        id: "",
        username: ""
      }
      
      this.editAdm = {
        id: "",
        username: ""
      }
      
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/users/adms/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllUsers();
        this.$emit("open-modal", "Administrador alterado com sucesso.");
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

  @media (max-width: 1250px) {
    .create-wrapper.superadm {
      display: flex !important;
      margin-right: auto;
      margin-left: 0px !important; 
      margin-top: 12px;
    }
  }

  @media (max-width: 860px) {
    .card-title {
      display: block !important;
    }

    .custom-select {
      margin-left: 0px;
      margin-right: 16px;
      margin-top: 16px;
    }
  }

  .datatable :last-child * {
    margin-left: 8px;
    cursor: pointer;
  }

  .card-title .filter-wrapper {
    display: flex !important;
  }

  .card-title.superadm {
    display: block !important;
  }

  .card-title.superadm .filter-wrapper {
    display: flex !important;
    margin-left: -16px;
  }

  .create-wrapper.superadm {
    display: flex !important;
    margin-left: auto;
  }

  .create-wrapper.superadm > * {
    margin-right: 16px !important;
  }
</style>