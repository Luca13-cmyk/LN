<template>
  <v-layout row wrap>
      <Slider />
      <v-divider></v-divider>
      <Subject v-for="subject in subjects" :key="subject.id" :subject="subject" />
      
  </v-layout>
</template>

<script>
import Slider from '../components/Slider.vue';
import Subject from '../components/Subject.vue';
  export default {
    components: { Slider, Subject },
    computed: {
      subjects() {
      return this.$store.state.subjects;
    }
  },
  mounted () {
    this.getSubjects();
  },
  beforeDestroy (){
    console.log('destroyed')
    // this.$store.dispatch('unbindUsers');
  },
  methods: {
    getSubjects  () {
      this.$store.dispatch("bindSubjects", {filter: '', limit: 4});
    },
  }
}
</script>

<style>

</style>