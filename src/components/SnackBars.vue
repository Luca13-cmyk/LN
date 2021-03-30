<template>
  <div class="text-center">
    <v-snackbar
      v-model="snack"
      :timeout="4000"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="close"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
      computed: {
          snack: {
            get: function() {

              return this.$store.getters.snack
            },
            set: function() {
              this.$store.dispatch("setSnackFalse");
            }
              
          },
          text() {
              return this.$store.getters.info
          }
      },
      methods: {
          close() {
              this.$store.dispatch("setSnackFalse"); 
          }
      },
  }
</script>