<template>
  <div>
    <v-row align="center" justify="center" class="mt-3">
        <User  v-for="user in users" :key="user.id" :user="user"/>
    </v-row>
      
  </div>
</template>

<script>
import User from '../components/User.vue'
export default {
  components: { User },
  computed: {
    users() {
      return this.$store.state.users;
    }
  },
  mounted () {
    this.getUsers();
  },
  beforeDestroy (){
    this.$store.dispatch('unbindUsers');
  },
  methods: {
    getUsers  () {
      this.$store.dispatch("bindUsers");
    },
  }

}
</script>

<style>

</style>