<template>
<v-flex class="pr-3 pb-3 mt-5" xs12 md6 lg4>
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
                    {{ subject.type }}
                    </div>
                    <v-list-item-title class="headline mb-1">
                    {{ subject.content }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{ subject.desc }} </v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-avatar
                    tile
                    size="80"
                    color="grey"
                ></v-list-item-avatar>
                </v-list-item>

                <v-card-actions>
                <v-btn
                    outlined
                    rounded
                    text
                >
                    Button
                </v-btn>
                </v-card-actions>
            </v-card>
    </v-skeleton-loader>
    </v-flex>
</template>

<script>
export default {
    props: ['subject'],

    created() {
        console.log(this.subject.content);
    }
}
</script>

<style>

</style>