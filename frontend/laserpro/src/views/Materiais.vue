<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" @input="searchFilter" ref="searchBar" class="form-control form-control-solid w-250px ps-15" placeholder="Procurar materiais" />
        </div>
        <!--end::Search-->
        <!--begin::Filter-->
        <div class="d-flex align-items-center position-relative my-1">
          <div class="custom-select">
            <div class="selected" :class="{ open: stateOpen }" v-on:click="stateOpen=!stateOpen">{{ this.state }}</div>
            <div class="items" :class="{ selectHide: !stateOpen }">
              <div v-on:click="selectState('Todos')">{{ "Todos" }}</div>
              <div v-on:click="selectState('Ativo')">{{ "Ativo" }}</div>
              <div v-on:click="selectState('Inativo')">{{ "Inativo" }}</div>
            </div>
            <div v-if="stateOpen" class="select-closer" v-on:click="stateOpen = false"></div>
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
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_material" data-backdrop="false" v-on:click="this.createModalOpen = true">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Adicionar Material
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" :data="this.materiaisFiltered" :header="tableHeader" :enable-items-per-page-dropdown="true" class="datatable">
        <template v-slot:produto="{ row: material }">
          {{ material.produto }}
        </template>
        <template v-slot:material="{ row: material }">
          {{ material.material }}
        </template>
        <template v-slot:tipo="{ row: material }">
          {{ material.tipo }}
        </template>
        <template v-slot:subtipo="{ row: material }">
          {{ material.subtipo }}
        </template>
        <template v-slot:liga="{ row: material }">
          {{ material.liga }}
        </template>
        <template v-slot:dimensoes="{ row: material }">
          {{ material.dimensoes }}mm
        </template>
        <template v-slot:estado="{ row: material }">
          {{ material.estado }}
        </template>
        <template v-slot:actions="{ row: material }">
          <span title="Alterar Material" v-if="this.$store.getters.getUser.tipo != 'user'" v-on:click="getMaterialToEdit(material.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_material" class="material-icons">edit</span>
          <span title="Ativar Material" v-if="material.estado == 'Inativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleMaterial(material.id, 'Ativo')" class="material-icons">check_circle</span>
          <span title="Desativar Material" v-if="material.estado == 'Ativo' && this.$store.getters.getUser.tipo != 'user'" v-on:click="toggleMaterial(material.id, 'Inativo')" class="material-icons">cancel</span>
          <span title="Eliminar Material" v-if="this.$store.getters.getUser.tipo == 'superadm' && material.delete" v-on:click="deleteMaterial(material.id)" class="material-icons">delete</span>
        </template>
      </Datatable>
    </div>
    <AddMaterialModal v-show="this.createModalOpen" v-on:create-material="createMaterial" v-on:open-modal="openModal"></AddMaterialModal>
    <AlterMaterialModal v-show="this.alterModalOpen" v-bind:info="this.editMaterial" v-on:alter-material="alterMaterial" v-on:open-modal="openModal"></AlterMaterialModal>
    <button ref="hidemodal1" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_add_material"></button>
    <button ref="hidemodal2" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_material"></button>
  </div>
</template>

<script>
import { ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddMaterialModal from "@/components/modals/AddMaterialModal.vue";
import AlterMaterialModal from "@/components/modals/AlterMaterialModal.vue";
import axios from "axios";

export default {
  name: "Materiais",
  components: {
    Datatable,
    AddMaterialModal,
    AlterMaterialModal
  },
  data() {
    return {
      materiais: [],
      materiaisFiltered: [],
      stateOpen: false,
      state: "Estado",
      createModalOpen: false,
      alterModalOpen: false,
      editMaterial: {
        id: "",
        liga: "",
        dimensoes: "",
        tipo: "",
        subtipo: "",
        material: "",
        produto: ""
      },
      tableHeader: []
    }
  },
  created() {
    if(!this.$store.getters.getUser.id) {
      this.$router.push({ name: "login" });
    } else {
      this.getAllMateriais();
    }
  },
  mounted() {
    let headerInfo = [
      {
        columnName: "Produto",
        columnLabel: "produto",
        sortEnabled: true,
        columnWidth: 140,
      },
      {
        columnName: "Material",
        columnLabel: "material",
        sortEnabled: true,
        columnWidth: 140,
      },
      {
        columnName: "Tipo",
        columnLabel: "tipo",
        sortEnabled: true,
        columnWidth: 140,
      },
      {
        columnName: "Subtipo",
        columnLabel: "subtipo",
        sortEnabled: true,
        columnWidth: 140,
      },
      {
        columnName: "Liga",
        columnLabel: "liga",
        sortEnabled: true,
        columnWidth: 140,
      },
      {
        columnName: "Dimensões",
        columnLabel: "dimensoes",
        sortEnabled: false,
        columnWidth: 170,
      },
      {
        columnName: "Estado",
        columnLabel: "estado",
        sortEnabled: true,
        columnWidth: 80,
      }
    ]

    if(this.$store.getters.getUser.tipo != 'user') {
      headerInfo.push({
        columnName: "Actions",
        columnLabel: "actions",
        sortEnabled: false,
        columnWidth: 160,
      });
    }

    this.tableHeader = ref(headerInfo);
  },
  methods: {
    sort(sort) {
      switch(sort.label) {
        case "produto":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.produto > b.produto ? 1 : b.produto > a.produto ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.produto < b.produto ? 1 : b.produto < a.produto ? -1 : 0);
          break;
        case "material":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.material > b.material ? 1 : b.material > a.material ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.material < b.material ? 1 : b.material < a.material ? -1 : 0);
          break;
        case "tipo":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.tipo > b.tipo ? 1 : b.tipo > a.tipo ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.tipo < b.tipo ? 1 : b.tipo < a.tipo ? -1 : 0);
          break;
        case "liga":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.liga > b.liga ? 1 : b.liga > a.liga ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.liga < b.liga ? 1 : b.liga < a.liga ? -1 : 0);
          break;
        case "subtipo":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.subtipo > b.subtipo ? 1 : b.subtipo > a.subtipo ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.subtipo < b.subtipo ? 1 : b.subtipo < a.subtipo ? -1 : 0);
          break;
        case "estado":
          if(sort.order == "asc") this.materiaisFiltered.sort((a, b) => a.estado > b.estado ? 1 : b.estado > a.estado ? -1 : 0);
          else this.materiaisFiltered.sort((a, b) => a.estado < b.estado ? 1 : b.estado < a.estado ? -1 : 0);
          break;
      }
    },
    searchFilter() {
      this.materiaisFiltered = [];
      let search = this.$refs.searchBar.value.split(" ");
 
      if(search != "") {
        this.materiais.forEach(m => {
          let check = false;
          search.forEach(s => {
            if(m.tipo.toUpperCase().includes(s.toUpperCase()) || m.liga.toUpperCase().includes(s.toUpperCase()) || m.subtipo.toUpperCase().includes(s.toUpperCase()) || m.dimensoes.toUpperCase().includes(s.toUpperCase()) || m.material.toUpperCase().includes(s.toUpperCase()) || m.produto.toUpperCase().includes(s.toUpperCase())) {
              check = true;
            }
          });
          if(check) this.materiaisFiltered.push(m);
        });
      } else {
        this.materiais.forEach(m => this.materiaisFiltered.push(m));
      }

      if(this.state != "Estado" && this.state != "Todos") {
        this.materiaisFiltered = this.materiaisFiltered.filter(m => m.estado == this.state);
      }
    },
    selectState(state) {
      this.state = state;
      this.stateOpen = false;
      this.searchFilter();
    },
    getMaterialToEdit(id){
      this.alterModalOpen = true;
      this.materiais.forEach(m => {
        if(m.id == id){
          this.editMaterial = m;
          let dimensoes = this.editMaterial.dimensoes.split("x");

          switch(this.editMaterial.produto) {
            case "TUBULAR":
              if(dimensoes.length == 3) {
                this.editMaterial.comprimento = dimensoes[0];
                this.editMaterial.dimensaoA = dimensoes[1];
                this.editMaterial.espessura = dimensoes[2];
              } else {
                this.editMaterial.comprimento = dimensoes[0];
                this.editMaterial.dimensaoA = dimensoes[1];
                this.editMaterial.dimensaoB = dimensoes[2];
                this.editMaterial.espessura = dimensoes[3];
              }
              break;
            case "CHAPA":
                this.editMaterial.comprimento = dimensoes[0];
                this.editMaterial.largura = dimensoes[1];
                this.editMaterial.espessura = dimensoes[2];
              break;
            case "CANTONEIRA":
              if(dimensoes.length == 3) {
                this.editMaterial.comprimento = dimensoes[0];
                this.editMaterial.dimensaoA = dimensoes[1];
                this.editMaterial.espessura = dimensoes[2];
              } else {
                this.editMaterial.comprimento = dimensoes[0];
                this.editMaterial.dimensaoA = dimensoes[1];
                this.editMaterial.dimensaoB = dimensoes[2];
                this.editMaterial.espessura = dimensoes[3];
              }
              break;
            case "PERFIL":
              this.editMaterial.comprimento = dimensoes[0];
              this.editMaterial.altura = dimensoes[1];
              break;
          }
        }
      });
    },
    getAllMateriais() {
      this.materiais = [];
      this.materiaisFiltered = [];
      this.state = "Estado";

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
        value.data.materiais.forEach(m => this.materiaisFiltered.push(m));
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
    createMaterial(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal1.click();
      
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/materiais`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllMateriais();
        this.$emit("open-modal", "Material criado com sucesso.");
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
    toggleMaterial(id, estado) {
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/materiais/${id}/toggle`,
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
        this.materiais.forEach(m => {
          if(m.id == id) m.estado = estado;
        });
        this.materiaisFiltered.forEach(m => {
          if(m.id == id) m.estado = estado;
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
    alterMaterial(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal2.click();
      
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/materiais/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllMateriais();
        this.$emit("open-modal", "Material alterado com sucesso.");
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
    deleteMaterial(id) {      
      axios({
        method: 'delete',
        url: `${import.meta.env.VITE_HOST}/materiais/${id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        }
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllMateriais();
        this.$emit("open-modal", "Material eliminado com sucesso.");
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
    z-index: 1000;
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

  .select-closer {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 999;
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