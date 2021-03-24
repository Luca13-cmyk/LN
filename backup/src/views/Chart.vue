<template>


      <canvas @click="createChart" id="myChart"  width="300" height="150"></canvas>

    
        
</template>

<script>
import {chart} from '../chart';
export default {
    mounted (){

    setTimeout(() => {
        this.createChart();

    }, 100)
        
    },
    computed: {
      dataChart() {
        // console.log(this.$store.state.subjects.length, 'chart')
      return [this.$store.state.subjects.length];
      }
    },
    methods: {
        createChart() {
        var ctx = document.getElementById('myChart');
        new chart(ctx, {
       type: 'bar', // doughnut
        data: {
        labels: ['Assuntos', 'Contatos'],
        datasets: [{
            label: '# of Votes',
            data: [this.dataChart[0], 6],
            backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(241, 15, 15, 0.747)',
                // 'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                // 'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        // scales: {
        //     yAxes: [{
        //         ticks: {
        //             beginAtZero: true
        //         }
        //     }]
        // }
    }
    });
        }
    }
}
</script>

<style>

</style>