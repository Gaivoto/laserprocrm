<template>
    <div class="modal-wrapper">
        <div>
            <p>Tem a certeza que quer apagar esta compra?</p>
            <div class="button-wrapper">
                <button v-on:click="confirm">Confirmar</button>
                <button v-on:click="cancel">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmModal',
    methods: {
        confirm() {
            this.$emit('confirm-modal', true);
        },
        cancel(){
            this.$emit('confirm-modal', false);
        }
    }
}
</script>
 
<style scoped>
    .modal-wrapper {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(60, 60, 60, 0.4);
        z-index: 10000;
    }

    .modal-wrapper > div {
        background-color: var(--bs-page-bg);
        width: 428px;
        padding: 64px;
        margin: auto;
        margin-top: 100px;
        border-radius: 8px;
        align-content: center;
        text-align: center;
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    .modal-wrapper p {
        color: var(--light);
        font-size: 22px;
        margin-bottom: 32px;
    }

    .modal-wrapper button {
        background: var(--bs-primary);
        color: white;
        height: 50px;
        width: 120px;
        border: none;
        border-radius: 8px;
        box-shadow: rgba(20, 14, 49, 0.6) 6px 6px 4px 4px;
        font-size: 16px;
    }

    .button-wrapper {
        display: flex;
        justify-content: space-evenly;
    }
</style>