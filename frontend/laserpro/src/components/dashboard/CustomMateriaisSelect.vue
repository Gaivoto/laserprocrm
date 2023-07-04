<template>
    <div class="searchbar-container" v-on:click.stop>
        <div class="searchbar">
            <input type="text" ref="searchbar" v-model="selected" v-on:click="openSelectClick" v-on:input="openSelect">
        </div> 
        <div ref="result" class="searchbar-results" :class="{ 'd-none': !selectOpen }">
            <div v-on:click="chooseMaterial('Todos os materiais')">
                <p>Todos os materiais</p>
            </div>
            <div v-for="mat in this.materiaisFiltered" :key="mat.id" v-on:click="chooseMaterial(mat.id)">
                <p>{{ mat.tipo + " " + mat.liga + " " + mat.acabamento + " " + mat.dimensoes }}</p>
            </div>
        </div>
        <div v-if="selectOpen" class="select-closer" v-on:click="closeSelect"></div>
    </div>
</template>

<script>
export default {
    name: "CustomMateriaisSelect",
    props: {
        materiais: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectOpen: false,
            selected: "Todos os materiais",
            materiaisFiltered: [],
            isToReset: false,
            tempSelect: ""
        }
    },
    methods: {
        openSelectClick() {
            this.isToReset = true;
            this.tempSelect = this.selected;

            this.selected = "";
            this.$refs.searchbar.value = "";
            this.selectOpen = true;
            this.filterMateriais();
        },
        openSelect() {
            this.selectOpen = true;
            this.filterMateriais();
        },
        chooseMaterial(mat) {
            this.selectOpen = false;
            if(mat != "Todos os materiais"){
                this.materiais.forEach(m => {
                    if(m.id == mat) this.selected = m.tipo + " " + m.liga + " " + m.acabamento + " " + m.dimensoes;
                });
            } else this.selected = mat;
            this.$emit('choose-mat', mat);

            this.isToReset = false;
            this.tempSelect = "";
        },
        filterMateriais() {
            if(this.$refs.searchbar.value != "Todos os materiais" && this.$refs.searchbar.value != "") {
                let search = this.$refs.searchbar.value.split(" ");
                this.materiaisFiltered = [];
                
                this.materiais.forEach(m => {
                    let check = true;
                    search.forEach(s => {
                        if(!(m.tipo.includes(s) || m.liga.includes(s) || m.acabamento.includes(s) || m.dimensoes.includes(s))) check = false;
                    });

                    if(check) this.materiaisFiltered.push(m);
                });    
            } else {
                this.materiaisFiltered = [...this.materiais];
            }
        },
        closeSelect() {
            if(this.isToReset) this.selected = this.tempSelect;
            this.selectOpen = false;
        }
    },
    watch: {
        materiais: function(materiais) {
            this.materiaisFiltered = [...materiais];
            console.log(this.materiaisFiltered)
        }
    }
}
</script>

<style scoped>
    .searchbar-container {
        position: relative;
        width: 60%;
        min-width: 300px;
        margin-bottom: 16px;
    }

    .searchbar {
        padding-left: 1em;
        height: 42px;
        line-height: 42px;
        border-radius: 0.475rem;
        background-color: var(--bs-gray-100);
        border-color: var(--bs-gray-100);
        cursor: pointer;
        color: var(--bs-gray-700);
        margin-bottom: 8px;
    }

    .searchbar input {
        background: none;
        border: none;
        color: var(--light) !important;
        width: 100%;
        font-size: 1.1rem;
        font-weight: 500;
        background-color: var(--bs-gray-100);
        border-color: var(--bs-gray-100);
        color: var(--bs-gray-700);
        border-radius: 0.475rem;
        height: 42px;
        line-height: 42px;
    }

    .searchbar input:focus {
        outline: none;
    }

    .searchbar-results {
        position: absolute;
        left: 0px;
        width: 100%;
        max-height: 300px;

        overflow-y: scroll;

        background-color: rgb(30, 30, 45);
        opacity: 1 !important;
        z-index: 1000;

        color: var(--bs-gray-700);
        background-color: var(--bs-gray-100);
        left: 0;
        right: 0;
    }

    .searchbar-results > div {
        padding-left: 1em;
        height: 43px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .searchbar-results > div:hover {
        background-color: var(--bs-gray-300);
    }

    .searchbar-results > div > p {
        margin-bottom: 0px;
        font-size: 1.1rem;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .searchbar-results::-webkit-scrollbar {
        width: 0px;
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
</style>