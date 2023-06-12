<template>
    <div class="searchbar-container" v-on:click.stop>
        <div class="searchbar">
            <input type="text" ref="searchbar" v-model="selected" v-on:click="openSelect" v-on:input="openSelect">
        </div> 
        <div ref="result" class="searchbar-results" :class="{ 'd-none': !selectOpen }">
            <div v-on:click="chooseMaterial('Todos os materiais')">
                <p>Todos os materiais</p>
            </div>
            <div v-for="mat in this.materiaisFiltered" :key="mat.id" v-on:click="chooseMaterial(mat.id)">
                <p>{{ mat.tipo + " " + mat.liga + " " + mat.acabamento + " " + mat.dimensoes }}</p>
            </div>
        </div>  
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
            materiaisFiltered: []
        }
    },
    methods: {
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
            this.$emit('change-gastos', mat);
        },
        filterMateriais() {
            if(this.$refs.searchbar.value != "Todos os materiais") {
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
        margin-bottom: 24px;
    }

    .searchbar {
        padding: 2px 11px;
        height: 36px;
        border-radius: 0.475rem;
        box-shadow: 0px 0px 1px 2px var(--el-input-border-color,var(--el-border-color)) inset;
    }

    .searchbar input {
        background: none;
        border: none;
        color: var(--light) !important;
        width: 100%;
        height: 30px;
        font-size: 15px;
    }

    .searchbar input:focus {
        outline: none;
    }

    .searchbar-results {
        position: absolute;
        left: 0px;
        top: 36px;
        width: 100%;
        max-height: 300px;
        border-radius: 0px 0px 8px 8px;

        overflow-y: scroll;

        background-color: rgb(30, 30, 45);
        opacity: 1 !important;
        z-index: 1000;
        box-shadow: 0 0 0 1px var(--el-input-border-color,var(--el-border-color)) inset;
    }

    .searchbar-results > div {
        padding: 2px 11px;
        height: 36px;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .searchbar-results > div:nth-child(2n) {
        background-color: rgb(36, 36, 51);
    }

    .searchbar-results > div:nth-child(2n + 1) {
        background-color: rgb(41, 41, 60);
    }

    .searchbar-results > div > p {
        margin-bottom: 0px;
        font-size: 15px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .searchbar-results::-webkit-scrollbar {
        width: 0px;
    }
</style>