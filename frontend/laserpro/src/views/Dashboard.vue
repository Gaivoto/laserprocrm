<template>
    <div class="row">
        <div class="col-xl-8 dash-left" v-if="this.gastosVisi || this.comprasVisi || this.$store.getters.getUser.tipo != 'user'">
            <div class="card left-top" v-if="this.gastosVisi || this.$store.getters.getUser.tipo != 'user'">
                <div class="card-top">
                    <p>Gastos</p>
                    <div class="card-top-right" v-if="this.$store.getters.getUser.tipo != 'user'">
                        <span title="Mostrar a todos os utilizadores" class="material-icons">visibility</span>
                        <label class="container">
                            <input type="checkbox" :checked="this.gastosVisi">
                            <span class="checkmark" v-on:click="toggleVisi('1', $event)"></span>
                        </label>
                    </div>
                </div>
                <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:change-gastos="changeGastos"/>
            </div>
            <div class="card left-bottom" v-if="this.comprasVisi || this.$store.getters.getUser.tipo != 'user'">
                <div class="card-top">
                    <p>Valores das compras</p>
                    <div class="card-top-right" v-if="this.$store.getters.getUser.tipo != 'user'">
                        <span title="Mostrar a todos os utilizadores" class="material-icons">visibility</span>
                        <label class="container">
                            <input type="checkbox" :checked="this.comprasVisi">
                            <span class="checkmark" v-on:click="toggleVisi('2', $event)"></span>
                        </label>
                    </div>
                </div>
                <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:change-gastos="changeCompras"/>
            </div>
        </div>

        <div class="col-xl-4 dash-right" v-if="this.ultimaVisi || this.$store.getters.getUser.tipo != 'user'">
            <div class="card">
                <div class="card-top">
                    <p>Última compra</p>
                    <div class="card-top-right" v-if="this.$store.getters.getUser.tipo != 'user'">
                        <span title="Mostrar a todos os utilizadores" class="material-icons">visibility</span>
                        <label class="container">
                            <input type="checkbox" :checked="this.ultimaVisi">
                            <span class="checkmark" v-on:click="toggleVisi('3', $event)"></span>
                        </label>
                    </div>
                </div>
                <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:change-gastos="changeUltima"/>
                <LastCompraSection v-bind:ultimaCompra="this.ultimaCompra"/>
            </div>
        </div>
    </div>
</template>

<script>
import CustomMateriaisSelect from "@/components/dashboard/CustomSelect.vue";
import LastCompraSection from "@/components/dashboard/LastCompraSection.vue";
import axios from "axios";

export default {
    name: "Dashboard",
    data() {
        return {
            gastosVisi: false,
            comprasVisi: false,
            ultimaVisi: false,
            materiais: [],
            compras: [],
            ultimaCompra: {
                material: {},
                fornecedor: {}
            },
            gastosList: [],
            comprasList: []
        }
    },
    components: {
        CustomMateriaisSelect,
        LastCompraSection
    },
    mounted() {
        if(!this.$store.getters.getUser.id) {
            this.$router.push({ name: "login" });
        } else {
            this.getAllInfo();
        }
    },
    methods: {
        getAllInfo() {
            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/dashboards`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then(value => {
                if(value.data.access_token) this.$store.commit('setAccessToken', value.data.access_token);
                value.data.dashboards.forEach(d => {
                    switch(d.id){
                        case "1":
                            if(d.estado == 'Ativo') this.gastosVisi = true;
                            else this.gastosVisi = false;
                            break;
                        case "2":
                            if(d.estado == 'Ativo') this.comprasVisi = true;
                            else this.comprasVisi = false;
                            break;
                        case "3":
                            if(d.estado == 'Ativo') this.ultimaVisi = true;
                            else this.ultimaVisi = false;
                            break;
                    }
                });
                console.log(this.gastosVisi, this.comprasVisi, this.ultimaVisi)
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

            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/materiais`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then(value => {
                value.data.materiais.forEach(m => this.materiais.push(m));
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

            axios({
                method: 'get',
                url: `${import.meta.env.VITE_HOST}/compras`,
                headers: {
                    Authorization: `Bearer ${this.$store.getters.getAccessToken}`,
                    refreshtoken: this.$store.getters.getRefreshToken,
                },
            })
            .then(value => {
                value.data.compras.forEach(c => this.compras.push(c));
                value.data.compras.forEach(c => this.gastosList.push(c));
                value.data.compras.forEach(c => this.comprasList.push(c));
                this.compras.sort((a, b) => {
                    let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
                    let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
                    return new Date(data1) < new Date(data2) ? 1 : new Date(data2) < new Date(data1) ? -1 : 0;
                });
                this.ultimaCompra = {...this.compras[0]};
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
        toggleVisi(id, e) {
            e.preventDefault();
            let estado;

            switch(id) {
                case "1":
                    if(this.gastosVisi) estado = "Inativo";
                    else estado = "Ativo";
                    this.gastosVisi = !this.gastosVisi;
                    break;
                case "2":
                    if(this.comprasVisi) estado = "Inativo";
                    else estado = "Ativo";
                    this.comprasVisi = !this.comprasVisi;
                    break;
                case "3":
                    if(this.ultimaVisi) estado = "Inativo";
                    else estado = "Ativo";
                    this.ultimaVisi = !this.ultimaVisi;
                    break;
            }

            axios({
                method: 'put',
                url: `${import.meta.env.VITE_HOST}/dashboards/${id}/toggle`,
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
        changeGastos(mat) {
            if(mat != "Todos os materiais"){
                let comprasMat = this.compras.filter(c => c.material.id == mat);

                comprasMat.sort((a, b) => {
                    let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
                    let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
                    return new Date(data1) < new Date(data2) ? 1 : new Date(data2) < new Date(data1) ? -1 : 0;
                });

                this.gastosList = [...this.compras];
            } else {
                this.gastosList = [...this.compras];
            }
        },
        changeCompras(mat) {
            if(mat != "Todos os materiais"){
                let comprasMat = this.compras.filter(c => c.material.id == mat);

                comprasMat.sort((a, b) => {
                    let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
                    let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
                    return new Date(data1) < new Date(data2) ? 1 : new Date(data2) < new Date(data1) ? -1 : 0;
                });

                this.comprasList = [...this.compras];
            } else {
                this.comprasList = [...this.compras];
            }
        },
        changeUltima(mat) {
            if(mat != "Todos os materiais"){
                let comprasMat = this.compras.filter(c => c.material.id == mat);

                comprasMat.sort((a, b) => {
                    let data1 = a.data.split("-")[1] + "-" + a.data.split("-")[0] + "-" + a.data.split("-")[2];
                    let data2 = b.data.split("-")[1] + "-" + b.data.split("-")[0] + "-" + b.data.split("-")[2];
                    return new Date(data1) < new Date(data2) ? 1 : new Date(data2) < new Date(data1) ? -1 : 0;
                });

                this.ultimaCompra = {...comprasMat[0]};
            } else {
                this.ultimaCompra = {...this.compras[0]};
            }
        }
    }
}
</script>

<style scoped>
    .card {
        padding: 16px 24px;
    }

    .left-top, .left-bottom {
        margin-bottom: 24px;
    }

    .card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 24px;
    }

    .card-top p {
        margin-bottom: 0px;
        color: var(--bs-primary);
        font-weight: 500;
        font-size: 20px;
        font-family: Inter, Helvetica, "sans-serif";
    }

    .card-top-right {
        display: flex;
    }

    .card-top-right span {
        font-size: 20px;
    }

    /*

    CUSTOM CHECKBOX

    */

    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 4px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 16px;
        height: 20px;
        width: 20px;
        background-color: white;
        border-radius: 4px;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: var(--bs-primary);
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 6px;
        top: 0px;
        width: 8px;
        height: 16px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>