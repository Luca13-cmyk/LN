<template>
  <div class="text-center">
    <v-snackbar
      v-model="snack"
      :timeout="400000"
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
          snack() {

            return this.$store.getters.snack;
              
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
      mounted() {
          this.cl = setInterval(() => {       

              if (this.$store.getters.snack){
                
                  this.close();
              }
              
          }, 8000)
      },
      destroyed() {
          clearInterval(this.cl);
      }
  }
</script>