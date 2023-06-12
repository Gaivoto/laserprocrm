<template>
    <div class="section-wrapper">
        <pre><span>Tipo:</span>   {{ this.ultimaCompra.material.tipo }}</pre>
        <pre><span>Liga:</span>   {{ this.ultimaCompra.material.liga }}</pre>
        <pre><span>Acabamento:</span>   {{ this.ultimaCompra.material.acabamento }}</pre>
        <pre><span>Dimensões:</span>   {{ this.ultimaCompra.material.dimensoes }}</pre>
        <pre><span>Fornecedor:</span>   {{ this.ultimaCompra.fornecedor.nome }}</pre>
        <pre><span>Data:</span>   {{ this.ultimaCompra.data }}</pre>
        <pre><span>Quantidade:</span>   {{ this.ultimaCompra.quantidade }}kg</pre>
        <pre><span>Preço por unidade:</span>   {{ (Math.round((parseFloat(this.ultimaCompra.valor) / parseFloat(this.ultimaCompra.quantidade)) * 100) / 100).toFixed(2) }}€</pre>
        <pre><span>Preço Total:</span>   {{ (Math.round(parseFloat(this.ultimaCompra.valor) * 100) / 100).toFixed(2) }}€</pre>
    </div>
</template>

<script>
export default {
    name: "LastCompraSection",
    props: {
        ultimaCompra: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>
    .section-wrapper {
        padding: 12px;
    }

    .section-wrapper pre {
        font-size: 15px;
        font-family: Inter, Helvetica, "sans-serif";
    }

    .section-wrapper span {
        color: grey;
    }
</style>