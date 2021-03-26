<template>
  <v-layout row wrap>
          <!-- GRAPH -->
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
        <!-- ./GRAPH -->
<!-- BTN RELOAD GRAPH -->
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
<!-- ./BTN RELOAD -->
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

        <Links   v-for="link in bindLinks" :key="link.id" :link="link" />
      
  </v-layout>
</template>

<script>
import Links from '../components/Links.vue';
import { FirebaseActions } from '../utils/FirebaseActions';

const gradients = [
    ['#222'],
    ['#42b3f4'],
    ['red', 'orange', 'yellow'],
    ['purple', 'violet'],
    ['#00c6ff', '#F0F', '#FF0'],
    ['#f72047', '#ffd200', '#1feaea'],
  ]
  export default {
  components: { Links },
    data: () => ({
      width: 2,
      radius: 10,
      padding: 8,
      lineCap: 'round',
      gradient: gradients[5],
       labels: [
        'A',
        'L',
        'LB'
      ],
      value: [],
      gradientDirection: 'top',
      gradients,
      fill: true,
      type: 'trend',
      autoLineWidth: false,
    }),
    computed: {
      bindData() {
        return [{type: 'Assuntos (A)', size: this.$store.state.subjects.length}, 
          {type: 'Links (L)', size: this.$store.state.links.length}, 
          {type: 'Lembretes (LB)', size: this.$store.state.toDo.length}];
      },
      bindLinks() {
        return this.$store.state.links;
      },
    },
    methods: {
      graphData() {
        this.value = [];
        FirebaseActions.getCollectionUserAuth("subjects")
          .get().then((querySnapshot) => {
          console.log(querySnapshot.size);

          this.value.push(querySnapshot.size); 
        });
        FirebaseActions.getCollectionUserAuth("links")
          .get().then((querySnapshot) => {
          console.log(querySnapshot.size);
          this.value.push(querySnapshot.size); 
        });
        FirebaseActions.getCollectionUserAuth("ToDo")
          .get().then((querySnapshot) => {
          console.log(querySnapshot.size);
          this.value.push(querySnapshot.size); 
        });
      },
      getDatas  () {
        this.$store.dispatch("bindSubjects");
        this.$store.dispatch("bindLinks");
        this.$store.dispatch("bindTodo");
      },

    },

  mounted () {
    this.getDatas();
    this.graphData();
  },
  beforeDestroy (){
    this.$store.dispatch('unbindSubjects');
    this.$store.dispatch('unbindLinks');
    this.$store.dispatch('unbindTodo');

  },
}
</script>

<style>

</style>