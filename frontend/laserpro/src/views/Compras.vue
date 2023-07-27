<template>
  <div class="card">
    <div class="card-header border-0 pt-6">
      <!--begin::Card title-->
      <div class="card-title">
        <!--begin::Search-->
        <div class="d-flex align-items-center position-relative my-1">
          <KTIcon icon-name="magnifier" icon-class="fs-1 position-absolute ms-6" />
          <input type="text" @input="searchFilter" ref="searchBar" class="form-control form-control-solid w-250px ps-15" placeholder="Procurar compras" />
        </div>
        <!--end::Search-->
        <!--begin::Filter-->
        <div class="d-flex align-items-center position-relative my-1">
          <div class="custom-select">
            <div class="selected" :class="{ open: rangeOpen }" v-on:click="rangeOpen=!rangeOpen">{{ this.range }}</div>
            <div class="items" :class="{ selectHide: !rangeOpen }">
              <div v-on:click="selectRange('Desde Sempre')">{{ "Desde Sempre" }}</div>
              <div v-on:click="selectRange('Último Mês')">{{ "Último Mês" }}</div>
              <div v-on:click="selectRange('Últimos 3 Meses')">{{ "Últimos 3 Meses" }}</div>
              <div v-on:click="selectRange('Últimos 6 Meses')">{{ "Últimos 6 Meses" }}</div>
              <div v-on:click="selectRange('Últimos 12 Meses')">{{ "Últimos 12 Meses" }}</div>
              <div v-on:click="selectRange('Últimos 24 Meses')">{{ "Últimos 24 Meses" }}</div>
            </div>
            <div v-if="rangeOpen" class="select-closer" v-on:click="rangeOpen = false"></div>
          </div>    
        </div>
        <!--end::Filter-->
      </div>
      <!--begin::Card title-->
      <!--begin::Card toolbar-->
      <div class="card-toolbar">
        <!--begin::Toolbar-->
        <div class="d-flex justify-content-end" data-kt-customer-table-toolbar="base" >
          <!--begin::Add customer-->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#kt_modal_add_compra" data-backdrop="false" v-on:click="this.createModalOpen = true">
            <KTIcon icon-name="plus" icon-class="fs-2" />
            Adicionar Compra
          </button>
          <!--end::Add customer-->
        </div>
        <!--end::Toolbar-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <div class="card-body pt-0">
      <Datatable @on-sort="sort" :data="this.comprasFiltered" :header="tableHeader" :enable-items-per-page-dropdown="true" class="datatable">
        <template v-slot:produto="{ row: compra }">
          {{ compra.material.produto }}
        </template>
        <template v-slot:material="{ row: compra }">
          {{ compra.material.material }}
        </template>
        <template v-slot:tipo="{ row: compra }">
          {{ compra.material.tipo }} {{ compra.material.subtipo }}
        </template>
        <template v-slot:liga="{ row: compra }">
          {{ compra.material.liga }}
        </template>
        <template v-slot:dimensoes="{ row: compra }">
          {{ compra.material.dimensoes }}mm
        </template>
        <template v-slot:fornecedor="{ row: compra }">
          {{ compra.fornecedor.nome }}
        </template>
        <template v-slot:quantidade="{ row: compra }">
          {{ compra.quantidade }}kg
        </template>
        <template v-slot:preco="{ row: compra }">
          {{ compra.valor }}€
        </template>
        <template v-slot:precokg="{ row: compra }">
          {{ compra.precokg }}€/kg
        </template>
        <template v-slot:data="{ row: compra }">
          {{ compra.data }}
        </template>
        <template v-if="this.$store.getters.getUser.tipo != 'user'" v-slot:actions="{ row: compra }">
          <span title="Alterar Compra" v-on:click="getCompraToEdit(compra.id)" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_compra" class="material-icons">edit</span>
          <span title="Apagar Compra" v-on:click="this.confirmModalOpen = true; this.deleteId = compra.id" v-on:confirm-modal="deleteCompra(info)" class="material-icons">delete</span>
        </template>
      </Datatable>
    </div>
    <AddCompraModal v-show="this.createModalOpen" v-on:create-compra="createCompra" v-on:open-modal="openModal"></AddCompraModal>
    <AlterCompraModal v-show="this.alterModalOpen" v-bind:info="this.editCompra" v-on:alter-compra="alterCompra" v-on:open-modal="openModal"></AlterCompraModal>
    <ConfirmModal v-show="this.confirmModalOpen" v-on:confirm-modal="deleteCompra"></ConfirmModal>
    <button ref="hidemodal1" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_add_compra"></button>
    <button ref="hidemodal2" style="display: none" data-bs-toggle="modal" data-bs-target="#kt_modal_alter_compra"></button>
  </div>
</template>

<script>
import { ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import AddCompraModal from "@/components/modals/AddCompraModal.vue";
import AlterCompraModal from "@/components/modals/AlterCompraModal.vue";
import ConfirmModal from "@/components/modals/ConfirmModal.vue";
import axios from "axios";

export default {
  name: "Compras",
  components: {
    Datatable,
    AddCompraModal,
    AlterCompraModal,
    ConfirmModal
  },
  data() {
    return {
      compras: [],
      comprasFiltered: [],
      rangeOpen: false,
      range: "Desde Sempre",
      createModalOpen: false,
      alterModalOpen: false,
      confirmModalOpen: false,
      editCompra: {
        id: "",
        valor: "",
        quantidade: "",
        data: "",
        idFornecedor: "",
        idMaterial: ""
      },
      deleteId: "",
      tableHeader: []
    }
  },
  created() {
    if(!this.$store.getters.getUser.id) {
      this.$router.push({ name: "login" });
    } else {
      this.getAllCompras();
    }
  },
  mounted() {
    let headerInfo = [
      {
        columnName: "Produto",
        columnLabel: "produto",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Material",
        columnLabel: "material",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Tipo",
        columnLabel: "tipo",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Liga",
        columnLabel: "liga",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Dimensões",
        columnLabel: "dimensoes",
        sortEnabled: false,
        columnWidth: 130,
      },
      {
        columnName: "Fornecedor",
        columnLabel: "fornecedor",
        sortEnabled: true,
        columnWidth: 120,
      },
      {
        columnName: "Quantidade",
        columnLabel: "quantidade",
        sortEnabled: true,
        columnWidth: 110,
      },
      {
        columnName: "Preço",
        columnLabel: "preco",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Preço/Kg",
        columnLabel: "precokg",
        sortEnabled: true,
        columnWidth: 100,
      },
      {
        columnName: "Data",
        columnLabel: "data",
        sortEnabled: true,
        columnWidth: 110,
      }
    ]

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
        case "material":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.material.material > b.material.material ? 1 : b.material.material > a.material.material ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.material.material < b.material.material ? 1 : b.material.material < a.material.material ? -1 : 0);
          break;
        case "liga":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.material.liga > b.material.liga ? 1 : b.material.liga > a.material.liga ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.material.liga < b.material.liga ? 1 : b.material.liga < a.material.liga ? -1 : 0);
          break;
        case "produto":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.material.produto > b.material.produto ? 1 : b.material.produto > a.material.produto ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.material.produto < b.material.produto ? 1 : b.material.produto < a.material.produto ? -1 : 0);
          break;
        case "tipo":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.material.tipo > b.material.tipo ? 1 : b.material.tipo > a.material.tipo ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.material.tipo < b.material.tipo ? 1 : b.material.tipo < a.material.tipo ? -1 : 0);
          break;
        case "fornecedor":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.fornecedor.nome > b.fornecedor.nome ? 1 : b.fornecedor.nome > a.fornecedor.nome ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.fornecedor.nome < b.fornecedor.nome ? 1 : b.fornecedor.nome < a.fornecedor.nome ? -1 : 0);
          break;
        case "preco":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.valor > b.valor ? 1 : b.valor > a.valor ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.valor < b.valor ? 1 : b.valor < a.valor ? -1 : 0);
          break;
        case "precokg":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.precokg > b.precokg ? 1 : b.precokg > a.precokg ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.precokg < b.precokg ? 1 : b.precokg < a.precokg ? -1 : 0);
          break;
        case "quantidade":
          if(sort.order == "asc") this.comprasFiltered.sort((a, b) => a.quantidade > b.quantidade ? 1 : b.quantidade > a.quantidade ? -1 : 0);
          else this.comprasFiltered.sort((a, b) => a.quantidade < b.quantidade ? 1 : b.quantidade < a.quantidade ? -1 : 0);
          break;
        case "data":
          if(sort.order == "asc"){
            this.comprasFiltered.sort((a, b) => {
              let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
              let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
              return new Date(data1) > new Date(data2) ? 1 : new Date(data2) > new Date(data1) ? -1 : 0;
            });
          } else {
            this.comprasFiltered.sort((a, b) => {
              let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
              let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
              return new Date(data1) < new Date(data2) ? 1 : new Date(data2) < new Date(data1) ? -1 : 0;
            });
          }
          break;
      }
    },
    searchFilter() {
      this.comprasFiltered = [];
      let search = this.$refs.searchBar.value.split(" ");

      if(search != "") {
        this.compras.forEach(c => {
          let check = false;
          search.forEach(s => {
            if(c.material.material.toUpperCase().includes(s.toUpperCase()) || c.material.tipo.toUpperCase().includes(s.toUpperCase()) || c.material.liga.toUpperCase().includes(s.toUpperCase()) || c.material.produto.toUpperCase().includes(s.toUpperCase()) || c.material.dimensoes.toUpperCase().includes(s.toUpperCase()) || c.fornecedor.nome.toUpperCase().includes(s.toUpperCase())){
              check = true;
            }
          });

          if(check) this.comprasFiltered.push(c);
        });
      } else {
        this.compras.forEach(c => this.comprasFiltered.push(c));
      }

      if(this.range != "Desde Sempre") {
        var comprasTemp = [];
        
        this.comprasFiltered.forEach(c => comprasTemp.push(c));
        this.comprasFiltered = [];

        let dataComp = new Date();
        var months;

        switch(this.range) {
          case "Último Mês": 
            months = 1;
            break;
          case "Últimos 3 Meses": 
            months = 3;
            break;
          case "Últimos 6 Meses":
            months = 6; 
            break;
          case "Últimos 12 Meses": 
            months = 12;
            break;
          case "Últimos 24 Meses": 
            months = 24;
            break;        
        }

        dataComp.setMonth(dataComp.getMonth() - months);

        comprasTemp.forEach(c => {
          let data = c.data.split("-")[1] + "-" + c.data.split("-")[0] + "-" + c.data.split("-")[2];
          if(new Date(data) > dataComp) {
            this.comprasFiltered.push(c);
          }
        });
      }
      
      let dataComp = new Date();
      var months;

      switch(this.range) {
        case "Último Mês": 
          months = 1;
          break;
        case "Últimos 3 Meses": 
          months = 3;
          break;
        case "Últimos 6 Meses":
          months = 6; 
          break;
        case "Últimos 12 Meses": 
          months = 12;
          break;
        case "Últimos 24 Meses": 
          months = 24;
          break;        
      }

      dataComp.setMonth(dataComp.getMonth() - months);

      this.comprasFiltered.filter(c => {
        let data = c.data.split("-")[1] + "-" + c.data.split("-")[0] + "-" + c.data.split("-")[2];
        return new Date(data) > dataComp;
      });

      this.comprasFiltered.forEach(c => {
        let data = c.data.split("-")[1] + "-" + c.data.split("-")[0] + "-" + c.data.split("-")[2];
        if(new Date(data) < dataComp) {
          this.comprasFiltered.remove(c);
        }
      });
    },
    selectRange(range) {
      this.range = range;
      this.rangeOpen = false;
      this.searchFilter();
    },
    getCompraToEdit(id){
      this.alterModalOpen = true;
      this.compras.forEach(c => {
        if(c.id == id) {
          this.editCompra = {
            id: c.id,
            valor: c.valor,
            quantidade: c.quantidade,
            data: c.data,
            fornecedor: c.fornecedor.nome
          }

          this.editCompra.material = c.material.produto + " " + c.material.material + " " + c.material.tipo;
          if(c.material.subtipo != "") this.editCompra.material += " " + c.material.subtipo;
          this.editCompra.material += " " + c.material.liga + " " + c.material.dimensoes;
        }
      });
    },
    getAllCompras() {
      this.compras = [];
      this.comprasFiltered = [];
      this.range = "Desde Sempre";

      axios({
        method: 'get',
        url: `${import.meta.env.VITE_HOST}/compras`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        value.data.compras.forEach(c =>{
          c.valor = (Math.round(parseFloat(c.valor) * 100) / 100).toFixed(2);
          c.precokg = (Math.round((parseFloat(c.valor) / parseFloat(c.quantidade)) * 100) / 100).toFixed(2);
          this.compras.push(c);
          this.comprasFiltered.push(c);
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
    createCompra(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal1.click();
      
      axios({
        method: 'post',
        url: `${import.meta.env.VITE_HOST}/compras`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllCompras();
        this.$emit("open-modal", "Compra criada com sucesso.");
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
    alterCompra(info) {
      this.createModalOpen = false;
      this.$refs.hidemodal2.click();
      
      axios({
        method: 'put',
        url: `${import.meta.env.VITE_HOST}/compras/${info.id}`,
        headers: {
          Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
          refreshtoken: this.$store.getters.getRefreshToken,
        },
        data: info
      })
      .then(value => {
        if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
        this.getAllCompras();
        this.$emit("open-modal", "Compra alterada com sucesso.");
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
    deleteCompra(del) {
      this.confirmModalOpen = false;
      
      if(del) {
        axios({
          method: 'delete',
          url: `${import.meta.env.VITE_HOST}/compras/${this.deleteId}`,
          headers: {
            Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
            refreshtoken: this.$store.getters.getRefreshToken,
          }
        })
        .then(value => {
          if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
          this.getAllCompras();
          this.$emit("open-modal", "Compra apagada com sucesso.");
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
      }

      this.deleteId = "";
    },
    openModal(msg) {
      this.$emit("open-modal", msg);
    },
    closeConfirmModal() {
      this.confirmModalOpen = false;
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
    max-height: 300px;
    border-radius: 0.475rem;
    z-index: 1000;
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