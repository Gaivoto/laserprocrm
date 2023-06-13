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
                <div class="selects">
                    <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:change-gastos="changeGastos"/>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: dateGastosOpen }" v-on:click="dateGastosOpen=!dateGastosOpen">{{ this.gastosDates.display }}</div>
                        <div class="items" :class="{ selectHide: !dateGastosOpen }">
                            <div v-on:click="selectDateGastos(1, 'Último mês')">{{ "Último mês" }}</div>
                            <div v-on:click="selectDateGastos(3, 'Últimos 3 meses')">{{ "Últimos 3 meses" }}</div>
                            <div v-on:click="selectDateGastos(6, 'Últimos 6 meses')">{{ "Últimos 6 meses" }}</div>
                            <div v-on:click="selectDateGastos(12, 'Últimos 12 meses')">{{ "Últimos 12 meses" }}</div>
                            <div v-on:click="selectDateGastos(24, 'Últimos 24 meses')">{{ "Últimos 24 meses" }}</div>
                        </div>
                    </div> 
                </div>
                <GastosGraph v-bind:info="this.gastosList" v-bind:dates="this.gastosDates"/>
                <div class="date-inputs">
                    <label for="dataInicioGastos">Desde: <input ref="dataInicioGastos" name="dataInicioGastos" type="date" v-on:change="changeDataIGastos"/></label>
                    <label for="dataFimGastos">Até: <input ref="dataFimGastos" name="dataFimGastos" type="date" v-on:change="changeDataFGastos"/></label>
                </div>
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
                <div class="selects">
                    <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:choose-mat="changeCompras"/>
                    <div class="custom-select">
                        <div class="selected" :class="{ open: dateComprasOpen }" v-on:click="dateComprasOpen=!dateComprasOpen">{{ this.comprasDates.display }}</div>
                        <div class="items" :class="{ selectHide: !dateComprasOpen }">
                            <div v-on:click="selectDateCompras(1, 'Último mês')">{{ "Último mês" }}</div>
                            <div v-on:click="selectDateCompras(3, 'Últimos 3 meses')">{{ "Últimos 3 meses" }}</div>
                            <div v-on:click="selectDateCompras(6, 'Últimos 6 meses')">{{ "Últimos 6 meses" }}</div>
                            <div v-on:click="selectDateCompras(12, 'Últimos 12 meses')">{{ "Últimos 12 meses" }}</div>
                            <div v-on:click="selectDateCompras(24, 'Últimos 24 meses')">{{ "Últimos 24 meses" }}</div>
                        </div>
                    </div> 
                </div>
                <ComprasGraph v-bind:info="this.comprasList" v-bind:dates="this.comprasDates"/>
                <div class="date-inputs">
                    <label for="dataInicioCompras">Desde: <input ref="dataInicioCompras" name="dataInicioCompras" type="date" v-on:change="changeDataICompras"/></label>
                    <label for="dataFimCompras">Até: <input ref="dataFimCompras" name="dataFimCompras" type="date" v-on:change="changeDataFCompras"/></label>
                </div>
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
                <CustomMateriaisSelect v-bind:materiais="this.materiais" v-on:choose-mat="changeUltima"/>
                <LastCompraSection v-bind:ultimaCompra="this.ultimaCompra"/>
            </div>
        </div>
    </div>
</template>

<script>
import CustomMateriaisSelect from "@/components/dashboard/CustomMateriaisSelect.vue";
import LastCompraSection from "@/components/dashboard/LastCompraSection.vue";
import GastosGraph from "@/components/dashboard/GastosGraph.vue";
import ComprasGraph from "@/components/dashboard/ComprasGraph.vue";
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
            comprasList: [],
            gastosDates: {
                start: new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
                end: (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
                display: "Último mês"
            },
            comprasDates: {
                start: new Date().getMonth() + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
                end: (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear(),
                display: "Último mês"
            },
            dateGastosOpen: false,
            dateComprasOpen: false
        }
    },
    components: {
        CustomMateriaisSelect,
        LastCompraSection,
        GastosGraph,
        ComprasGraph
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
                this.compras = [...value.data.compras];
                this.gastosList = [...value.data.compras];
                this.comprasList = [...value.data.compras];
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

                this.gastosList = [...comprasMat];
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

                this.comprasList = [...comprasMat];
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
        },
        changeDataIGastos() {
            let inicio = new Date(this.$refs.dataInicioGastos.value);
            let fim = new Date(this.$refs.dataFimGastos.value);

            let monthDiff = ((fim.getFullYear() - inicio.getFullYear()) * 12) + (fim.getMonth() - inicio.getMonth());

            if(monthDiff == 6 && fim.getDate() > inicio.getDate()) monthDiff++;

            if(inicio > fim){
                this.$emit("open-modal", "A data de início deve ser antes da de fim.");
                this.$refs.dataInicioGastos.value = "";
            } else if(monthDiff > 6) {
                this.$emit("open-modal", "O intervalo máximo permitido são 6 meses.");
                this.$refs.dataInicioGastos.value = "";
            } else {
                let startTemp = (inicio.getMonth() + 1) + "/" + inicio.getDate() + "/" + inicio.getFullYear();

                let displayTemp = inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear() + " - ";
                if(this.$refs.dataFimGastos.value != "") displayTemp += fim.getDate() + "/" + (fim.getMonth() + 1) + "/" + fim.getFullYear();

                this.gastosDates = {
                    start: startTemp,
                    end: this.gastosDates.end,
                    display: displayTemp
                }
            }
        },
        changeDataFGastos() {
            let inicio = new Date(this.$refs.dataInicioGastos.value);
            let fim = new Date(this.$refs.dataFimGastos.value);

            let monthDiff = ((fim.getFullYear() - inicio.getFullYear()) * 12) + (fim.getMonth() - inicio.getMonth());

            if(monthDiff == 6 && fim.getDate() > inicio.getDate()) monthDiff++;

            if(fim < inicio){
                this.$emit("open-modal", "A data de fim deve ser depois da de início.");
                this.$refs.dataFimGastos.value = "";
            } else if(monthDiff > 6) {
                this.$emit("open-modal", "O intervalo máximo permitido são 6 meses.");
                this.$refs.dataFimGastos.value = "";
            } else {
                let endTemp = (fim.getMonth() + 1) + "/" + fim.getDate() + "/" + fim.getFullYear();
                let displayTemp;

                if(this.$refs.dataInicioGastos.value != "") displayTemp = inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear();
                else displayTemp = "";
                displayTemp = displayTemp + " - " + fim.getDate() + "/" + (fim.getMonth() + 1) + "/" + fim.getFullYear();

                this.gastosDates = {
                    start: this.gastosDates.start,
                    end: endTemp,
                    display: displayTemp
                }
            }
        },
        selectDateGastos(months, display){
            let fim = new Date();
            let inicio = new Date();
            
            inicio.setMonth(inicio.getMonth() - months);

            this.gastosDates = {
                start: (inicio.getMonth() + 1) + "/" + inicio.getDate() + "/" + inicio.getFullYear(),
                end: (fim.getMonth() + 1) + "/" + fim.getDate() + "/" + fim.getFullYear(),
                display: display
            }

            this.$refs.dataInicioGastos.value = "";
            this.$refs.dataFimGastos.value = "";
            this.dateGastosOpen = false;
        },
        changeDataICompras() {
            let inicio = new Date(this.$refs.dataInicioCompras.value);
            let fim = new Date(this.$refs.dataFimCompras.value);

            let monthDiff = ((fim.getFullYear() - inicio.getFullYear()) * 12) + (fim.getMonth() - inicio.getMonth());

            if(monthDiff == 6 && fim.getDate() > inicio.getDate()) monthDiff++;

            if(inicio > fim){
                this.$emit("open-modal", "A data de início deve ser antes da de fim.");
                this.$refs.dataInicioCompras.value = "";
            } else if(monthDiff > 6) {
                this.$emit("open-modal", "O intervalo máximo permitido são 6 meses.");
                this.$refs.dataInicioCompras.value = "";
            } else {
                let startTemp = (inicio.getMonth() + 1) + "/" + inicio.getDate() + "/" + inicio.getFullYear();

                let displayTemp = inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear() + " - ";
                if(this.$refs.dataFimCompras.value != "") displayTemp += fim.getDate() + "/" + (fim.getMonth() + 1) + "/" + fim.getFullYear();

                this.comprasDates = {
                    start: startTemp,
                    end: this.gastosDates.end,
                    display: displayTemp
                }
            }
        },
        changeDataFCompras() {
            let inicio = new Date(this.$refs.dataInicioCompras.value);
            let fim = new Date(this.$refs.dataFimCompras.value);

            let monthDiff = ((fim.getFullYear() - inicio.getFullYear()) * 12) + (fim.getMonth() - inicio.getMonth());

            if(monthDiff == 6 && fim.getDate() > inicio.getDate()) monthDiff++;

            if(fim < inicio){
                this.$emit("open-modal", "A data de fim deve ser depois da de início.");
                this.$refs.dataFimCompras.value = "";
            } else if(monthDiff > 6) {
                this.$emit("open-modal", "O intervalo máximo permitido são 6 meses.");
                this.$refs.dataFimCompras.value = "";
            } else {
                let endTemp = (fim.getMonth() + 1) + "/" + fim.getDate() + "/" + fim.getFullYear();
                let displayTemp;

                if(this.$refs.dataInicioCompras.value != "") displayTemp = inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear();
                else this.comprasDates.display = "";
                displayTemp = displayTemp + " - " + fim.getDate() + "/" + (fim.getMonth() + 1) + "/" + fim.getFullYear();

                this.comprasDates = {
                    start: this.gastosDates.start,
                    end: endTemp,
                    display: displayTemp
                }
            }
        },
        selectDateCompras(months, display){
            let fim = new Date();
            let inicio = new Date();
            
            inicio.setMonth(inicio.getMonth() - months);

            this.comprasDates = {
                start: (inicio.getMonth() + 1) + "/" + inicio.getDate() + "/" + inicio.getFullYear(),
                end: (fim.getMonth() + 1) + "/" + fim.getDate() + "/" + fim.getFullYear(),
                display: display
            }

            this.$refs.dataInicioCompras.value = "";
            this.$refs.dataFimCompras.value = "";
            this.dateComprasOpen = false;
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

    .dash-left .searchbar-container {
        width: 50%;
    }

    .selects {
        display: flex;
        align-items: flex-start;
        gap: 32px;
    }

    .date-inputs {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .date-inputs input {
        background: none;
        border: none;
        color: var(--light) !important;
        box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
        width: 140px;
        height: 30px;
        padding: 1px 11px;
        border-radius: 8px;
        margin-left: 8px;
    }

    .date-inputs input:focus {
        outline: none;
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

    /*

    CUSTOM SELECT

    */

    .custom-select {
        position: relative;
        width: 250px;
        text-align: left;
        height: 43px;
        line-height: 43px;
        font-size: 1.1rem;
        font-weight: 500;
        border-radius: 0.475rem;
        margin-bottom: 16px;
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
</style>