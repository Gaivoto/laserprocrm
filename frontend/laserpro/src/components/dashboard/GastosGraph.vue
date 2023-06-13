<template>
    <div class="graph-wrapper">
        <Bar :data="graphData" :options="this.chartOptions"/>    
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
    name: "GastosGraph",
    components: {
        Bar
    },
    props: {
        info: {
            type: Array,
            required: true
        },
        dates: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            graphData: {
                labels: [],
                datasets: [
                    {
                        label: "Gastos",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: []
                    }
                ]
            },
            chartOptions: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }    
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: "Gastos em €"
                        }
                    }
                }
            }
        }
    },
    watch: {
        info: function() {
            this.rearrangeInfo();
        },
        dates: function(dates) {
            if(dates.display.length > 13 || dates.display.includes("Último")) this.rearrangeInfo();
            else this.resetGraph();
        }
    },
    methods: {
        resetGraph() {
            this.graphData.labels = [];
            this.graphData.datasets[0].data = [];
        },
        rearrangeInfo() {
            switch(this.dates.display) {
                case "Último mês":
                    this.setDatesDays();
                    break;
                case "Últimos 3 meses":
                    this.setDatesWeeks();
                    break;
                case "Últimos 6 meses":
                    this.setDatesWeeks();
                    break;
                case "Últimos 12 meses":
                    this.setDatesMonths();
                    break;
                case "Últimos 24 meses":
                    this.setDatesMonths();
                    break;
                default:
                    let inicio = new Date(this.dates.start);
                    let fim = new Date(this.dates.end);
                    
                    let rangeDays = (fim.getDate() - inicio.getDate()) + ((fim.getMonth() - inicio.getMonth()) * 30);

                    if(rangeDays < 32) this.setDatesDays();
                    else this.setDatesWeeks();
            }
        },
        setDatesDays() {
            this.graphData.labels = [];
            this.graphData.datasets[0].data = [];

            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];

            while(inicio <= fim) {
                labels.push(inicio.getDate() + "/" + inicio.getMonth() + "/" + inicio.getFullYear());
                data.push(8);

                inicio.setDate(inicio.getDate() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: data
                    }
                ]
            }
        },
        setDatesWeeks() {
            this.graphData.labels = [];
            this.graphData.datasets[0].data = [];

            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];

            while(inicio <= fim) {
                let weekStart = inicio.getDate() + "/" + inicio.getMonth();

                while(inicio.getDay() != 0) {
                    inicio.setDate(inicio.getDate() + 1);
                }

                let weekEnd = inicio.getDate() + "/" + inicio.getMonth();

                labels.push(weekStart + " - " + weekEnd);
                data.push(8);
                
                inicio.setDate(inicio.getDate() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: data
                    }
                ]
            }
        },
        setDatesMonths() {
            this.graphData.labels = [];
            this.graphData.datasets[0].data = [];

            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];

            inicio.setMonth(inicio.getMonth() + 1);

            while(inicio <= fim) {
                let label = inicio.toLocaleString('pt-PT', { month: 'long' });
                labels.push(label[0].toUpperCase() + label.slice(1) + " " + inicio.getFullYear());
                data.push(8);

                inicio.setMonth(inicio.getMonth() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: data
                    }
                ]
            }
        }
    }
}
</script>

<style scoped>
    .graph-wrapper {
        padding: 16px;
    }
</style>