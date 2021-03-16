<template>
<v-row class="mt-3">  
    
   <v-col class="mt-6" cols="12" sm="4" lg="4" v-for="topic in topics" :key="topic.id"> 
     
  <v-skeleton-loader
            class="mx-auto"
            max-width="600"
            type="card"
            
          >

            <v-card
                
                width="400"
                elevation="2"
                shaped
                
            >
                <v-list-item three-line>
                <v-list-item-content>
                    <div class="overline mb-4">
                    {{ topic.type }}
                    </div>
                    <v-list-item-title class="headline mb-1">
                    {{ topic.content }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ topic.desc }} </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="80"
                    
                >
                <img :src="topic.photo" alt="">
                </v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                >
                    Editar
                </v-btn>
                </v-card-actions>
            </v-card>
    </v-skeleton-loader>
    </v-col>
    </v-row>
</template>

<script>
export default {
    props: ['id'], // Subject
    watch: {
        $route() {
            if (this.topics.length > 0){
                this.$store.dispatch('unbindTopics');
            }
            this.$store.dispatch('bindTopics', {filter: this.id, limit: 10})
        }
    },
    computed: {
        topics() {
            return this.$store.state.topics;
        }  
    },
    mounted() {
        this.$store.dispatch('bindTopics', {filter: this.id, limit: 10}) // Filter only subject (id) topics
    },
    beforeDestroy() {
    this.$store.dispatch('unbindTopics');

    }
}
</script>

<style>

</style>