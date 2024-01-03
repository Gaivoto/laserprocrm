<template>
    <div class="graph-wrapper">
        <Bar :data="this.graphData" :options="this.chartOptions"/>    
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
                        label: "Gastos (€)",
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
            this.graphData =  {
                labels: [],
                datasets: [
                    {
                        label: "Gastos (€)",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: []
                    }
                ]
            }
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
            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];
            let i = 0;

            while(i < this.info.length && new Date(this.info[i].data.split("-")[1] + "-" + this.info[i].data.split("-")[0] + "-" + this.info[i].data.split("-")[2]) < inicio) {
                i++;
            }

            while(inicio <= fim) {
                labels.push(inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear());

                let valor = 0;

                while(i < this.info.length && this.info[i].data.split("-")[2] == inicio.getFullYear() && this.info[i].data.split("-")[1] == (inicio.getMonth() + 1) && this.info[i].data.split("-")[0] == inicio.getDate()) {
                    valor += parseFloat(this.info[i].valor);
                    i++;
                }

                data.push(valor);

                inicio.setDate(inicio.getDate() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos (€)",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: data
                    }
                ]
            }
        },
        setDatesWeeks() {
            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];
            let i = 0;

            while(i < this.info.length && new Date(this.info[i].data.split("-")[1] + "-" + this.info[i].data.split("-")[0] + "-" + this.info[i].data.split("-")[2]) < inicio) {
                i++;
            }

            while(inicio <= fim) {
                let year = inicio.getFullYear();
                let weekStart = inicio.getDate() + "/" + (inicio.getMonth() + 1);

                while(inicio.getDay() != 0) {
                    inicio.setDate(inicio.getDate() + 1);
                }

                let weekEnd = inicio.getDate() + "/" + (inicio.getMonth() + 1);

                labels.push(weekStart + " - " + weekEnd);

                let valor = 0;

                while(i < this.info.length && new Date(this.info[i].data.split("-")[1] + "-" + this.info[i].data.split("-")[0] + "-" + this.info[i].data.split("-")[2]) >= new Date(weekStart.split("/")[1] + "-" + weekStart.split("/")[0] + "-" + year) && new Date(this.info[i].data.split("-")[1] + "-" + this.info[i].data.split("-")[0] + "-" + this.info[i].data.split("-")[2]) <= new Date(weekEnd.split("/")[1] + "-" + weekEnd.split("/")[0] + "-" + inicio.getFullYear())) {
                    valor += parseFloat(this.info[i].valor);
                    i++;
                }

                data.push(valor);
                
                inicio.setDate(inicio.getDate() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos (€)",
                        backgroundColor: ["#7239ea", "#777777", "#444444"],
                        data: data
                    }
                ]
            }
        },
        setDatesMonths() {
            let inicio = new Date(this.dates.start);
            let fim = new Date(this.dates.end);

            let labels = [];
            let data = [];
            let i = 0;

            inicio.setMonth(inicio.getMonth() + 1);

            while(i < this.info.length && new Date(this.info[i].data.split("-")[1] + "-" + this.info[i].data.split("-")[0] + "-" + this.info[i].data.split("-")[2]) < inicio) {
                i++;
            }

            while(inicio <= fim) {
                let label = inicio.toLocaleString('pt-PT', { month: 'long' });
                labels.push(label[0].toUpperCase() + label.slice(1) + " " + inicio.getFullYear());
                
                let valor = 0;

                while(i < this.info.length && this.info[i].data.split("-")[2] == inicio.getFullYear() && this.info[i].data.split("-")[1] == (inicio.getMonth() + 1)) {
                    valor += parseFloat(this.info[i].valor);
                    i++;
                }

                data.push(valor);

                inicio.setMonth(inicio.getMonth() + 1);
            }

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Gastos (€)",
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