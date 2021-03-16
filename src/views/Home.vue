<template>
  <v-layout row wrap>
      <Slider />
      <v-divider></v-divider>
      <!-- <Subject v-for="topic in topics" :key="topic.id" :topic="topic" /> -->
      
  </v-layout>
</template>

<script>
import Slider from '../components/Slider.vue';
// import Subject from '../components/Subject.vue';
  export default {
    components: { Slider },
    computed: {
      topics() {
      return this.$store.state.topics;
    }
  },
  mounted () {
    this.getDatas();
    console.log(this.topics);
  },
  
  methods: {
    getDatas  () {
      this.$store.dispatch("bindTopics", {filter: 'linux', limit: 4});
    },
  }
}
</script>

<style>

</style>