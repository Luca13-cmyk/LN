<template>
  <v-layout row wrap>
      
      <!-- <Subject v-for="topic in topics" :key="topic.id" :topic="topic" /> -->
      
        <Chart v-if="2 > 3" />
          

          
          <v-card
    class="mx-auto text-center"
    color="white"
    min-width="100%"
          >
            <v-card-text>
              

              
              <v-sheet>

                  <v-sparkline
                    :labels="labels"
                    :value="value"
                    :gradient="gradient"
                    :smooth="radius || false"
                    :padding="padding"
                    :line-width="width"
                    :stroke-linecap="lineCap"
                    :gradient-direction="gradientDirection"
                    :fill="fill"
                    :type="type"
                    :auto-line-width="autoLineWidth"
                    auto-draw
                  >
                  
                  </v-sparkline>
              </v-sheet>
            </v-card-text>
        </v-card>

    <v-btn
   class="animate__animated animate__bounce" 
  elevation="6"
  x-large
  color="green"
  fab
  fixed
  bottom
  right
  dark
  @click="graphData"
><v-icon>mdi-reload</v-icon></v-btn>

  <v-sheet
    class="mx-auto mt-6 ml-3"
    min-width="90%"
  >
    <v-slide-group
      multiple
      show-arrows
    >
      <v-slide-item
        v-for="n in bindData"
        :key="bindData.indexOf(n)"
        
      >
      <v-alert
      class="ml-2"
      border="right"
      color="green"
      type="info"
      elevation="4"
      >
        {{ n.size }} {{ n.type }}
      </v-alert>
        
      </v-slide-item>
    </v-slide-group>
  </v-sheet>

        
        <v-item-group>
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
        <!-- V for in v-col -->
          <v-item>
            <v-card
    class="mx-auto mt-6"
    max-width="400"
    elevation="5"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>aaasa</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Number 10
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        Share
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
      
      
  </v-layout>
</template>

<script>
import Chart from './Chart.vue';
import {db} from '@/firebase.js';

// import Subject from '../components/Subject.vue';
const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default {
    components: { Chart},
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
       labels: [
        'A',
        'C',
        'F'
      ],
      value: [
        
      ],
      gradientDirection: 'top',
      gradients,
      fill: false,
      type: 'trend',
      autoLineWidth: false,
    }),
    computed: {
      bindData() {
        // console.log(this.$store.state.subjects.length);
        // sessionStorage.graphData = [this.$store.state.subjects.length, 4, 5];
        return [{type: 'Assuntos (A)', size: this.$store.state.subjects.length}, 
          {type: 'Contatos (C)', size: 50}, 
          {type: 'Favoritos (F)', size: 12}];
      }
    },
    methods: {
      graphData() {
        db.collection("users").doc('lucanegresco@gmail.com').collection("subjects").get().then((querySnapshot) => {
          console.log(querySnapshot.size);
          this.value = [querySnapshot.size, 50, 12]; // Refatorar
        })
      },
      getDatas  () {
      // this.$store.dispatch("bindTopics", {filter: 'linux', limit: 4});
        this.$store.dispatch("bindSubjects");
      },

    },

  mounted () {
    this.getDatas();
    this.graphData();
  },
  // methods: {
  //   getDatas  () {
  //     // this.$store.dispatch("bindTopics", {filter: 'linux', limit: 4});
  //     this.$store.dispatch("bindSubjects");
  //   },
  // }
}
</script>

<style>

</style>