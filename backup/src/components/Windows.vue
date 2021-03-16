<template>
  <v-layout row wrap>
        <Subject v-for="subject in subjects" :key="subject.id" :subject="subject" />
  </v-layout>
    
</template>

<script>
import Subject from './Subject.vue'
export default {
  components: { Subject },
  computed: {
      subjects() {
          return this.$store.state.subjects;
      }
    },
    mounted() {
        this.getSubjects();
    },
    methods: {
        getSubjects() {
            this.$store.dispatch('bindSubjects', {filter: 'windows', limit: 10});
        }
    }

}
</script>

<style>

</style>