<template>
  <v-item-group>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-item>
            <v-card
              class="mx-auto mt-6"
              max-width="400"
              elevation="5"
              min-height="350"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="link.imageUrl"
              >
                <v-card-title>{{ link.name }}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0"> </v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{ link.desc }}</div>
              </v-card-text>

              <v-card-actions>
                <v-btn text>
                  <a
                    class="links green--text"
                    target="blank"
                    :href="link.linkURL"
                    >Go</a
                  >
                </v-btn>
                <v-btn color="orange" text @click="showEdit(link)">
                  Editar
                </v-btn>
                <v-btn color="red" text @click="deleteLink(link.id)">
                  Deletar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-container>
  </v-item-group>
</template>

<script>
import { FirebaseActions } from "../utils/FirebaseActions";

export default {
  props: ["link"],
  methods: {
    deleteLink(id) {
      FirebaseActions.deleteLink(id)
        .then(() => {
          this.$store.dispatch("initInfo", "Link deletado");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    showEdit(link) {
      link.type = "link";
      this.$store.dispatch("initEdit", link);
    },
  },
  data() {
    return {
      sheet: false,
    };
  },
};
</script>

<style>
.links {
  text-decoration: none;
}
</style>
