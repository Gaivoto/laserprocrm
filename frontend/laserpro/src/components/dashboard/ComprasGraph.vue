<template>
    <div class="graph-wrapper">
        <Line :data="graphData" :options="this.chartOptions"/>    
    </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, TimeScale, LinearScale } from 'chart.js';
import { Line } from 'vue-chartjs';
import 'chartjs-adapter-date-fns';
import { pt } from 'date-fns/locale';

ChartJS.register(CategoryScale, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default {
    name: "ComprasGraph",
    components: {
        Line
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
                        label: "Preço (€)",
                        backgroundColor: "#7239ea",
                        borderColor: "#555555",
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
                            text: "Preço em €"
                        }
                    },
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                            adapters: {
                                date: {
                                    locale: pt
                                }
                            },
                            displayFormats: {
                                day: "dd/MM/yyyy",
                                week: "dd/MM/yyyy ",
                                month: "MM/yyyy"
                            },
                            tooltipFormat: 'dd/MM/yyyy' 
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 8
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
            this.graphData = {
                labels: [],
                datasets: [
                    {
                        label: "Preço (€)",
                        backgroundColor: "#7239ea",
                        borderColor: "#555555",
                        data: []
                    }
                ]
            }
        },
        rearrangeInfo() {
            this.updateOptions(1, "day");

            let timeUnit;

            switch(this.dates.display) {
                case "Último mês":
                    timeUnit = "day";
                    break;
                case "Últimos 3 meses":
                    timeUnit = "week";
                    break;
                case "Últimos 6 meses":
                    timeUnit = "week";
                    break;
                case "Últimos 12 meses":
                    timeUnit = "month";
                    break;
                case "Últimos 24 meses":
                    timeUnit = "month";
                    break;
                default:
                    let inicio = new Date(this.dates.start);
                    let fim = new Date(this.dates.end);
                    
                    let rangeDays = (fim.getDate() - inicio.getDate()) + ((fim.getMonth() - inicio.getMonth()) * 30);

                    if(rangeDays < 32) timeUnit = "day";
                    else timeUnit = "week";
            }

            let labels = [];
            let data = [];
            let max = 0;

            this.info.forEach(c => {

                let novaData = new Date(c.data.split("-")[1] + "-" + c.data.split("-")[0] + "-" + c.data.split("-")[2]);
                if(novaData >= this.chartOptions.scales.x.min && novaData <= this.chartOptions.scales.x.max) {
                    labels.push(new Date(c.data.split("-")[1] + "-" + c.data.split("-")[0] + "-" + c.data.split("-")[2])); 
                    data.push(c.valor);
                    if(c.valor > max) max = Math.ceil(parseFloat(c.valor));
                }
            });

            this.graphData = {
                labels: labels,
                datasets: [
                    {
                        label: "Preço (€)",
                        backgroundColor: "#7239ea",
                        borderColor: "#555555",
                        data: data
                    }
                ]
            }
            
            this.updateOptions(parseInt(max + 5), timeUnit);
        },
        updateOptions(max, unit) {
            this.chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }    
                },
                scales: {
                    y: {
                        min: 0,
                        max: max,
                        title: {
                            display: true,
                            text: "Preço em €"
                        }
                    },
                    x: {
                        min: new Date(this.dates.start),
                        max: new Date(this.dates.end),
                        type: "time",
                        time: {
                            unit: unit,
                            adapters: {
                                date: {
                                    locale: pt
                                }
                            },
                            displayFormats: {
                                day: "dd/MM/yyyy",
                                week: "dd/MM/yyyy ",
                                month: "MM/yyyy"
                            },
                            tooltipFormat: 'dd/MM/yyyy'
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 8
                    }
                }
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