<template>
  <v-flex class="pr-3 pb-3 mt-5" xs12 md6 lg4>
       <v-skeleton-loader
      class="mx-auto"
      max-width="400"
      type="card"
    >
    

      <v-card
    elevation="4"
    width="400"
    shaped
    >
        <v-img
        height="200px"
        src="https://cdn.pixabay.com/photo/2020/07/12/07/47/bee-5396362_1280.jpg"
        >
            <v-app-bar flat color="rgba(0, 0, 0, 0">
                <v-spacer></v-spacer>
                <v-btn
                color="white"
                icon
                >
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            
            </v-app-bar>

            <v-card-title class="white--text mt-8">
                <v-avatar size="56">
                    <img :src="user.photo" alt="user">
                </v-avatar>
                <p class="ml-3">
                    {{ user.name }}
                </p>
            </v-card-title>
        </v-img>
            <v-card-text>
                <div class="font-weight-bold ml-8 mb-2">
                    Dados
                </div>

                <v-timeline
                    align-top
                    dense
                >
                    <v-timeline-item
                    color="deep-purple lighten-1"
                    small
                    >
                    <div>
                        <div class="font-weight-normal">
                        <strong>Admin:</strong> @{{ user.inadmin  ? 'administrador' : 'usuario comum' }}
                        </div>
                        <div>{{ user.email }}</div>
                    </div>
                    </v-timeline-item>
                    
                </v-timeline>
        </v-card-text>

        
    </v-card>
    </v-skeleton-loader>
  </v-flex>
</template>

<script>
  export default {
      props: ['user'],
  }
</script>

<style>

</style>