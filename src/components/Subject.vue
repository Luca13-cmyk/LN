<template>
  <v-row class="mt-3">
    <v-col
      class="mt-6"
      cols="12"
      sm="4"
      lg="6"
      v-for="topic in topics"
      :key="topic.id"
    >
      <v-skeleton-loader class="mx-auto" max-width="800" type="card">
        <v-card width="800" elevation="4" shaped>
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

            <v-list-item-avatar tile size="80">
              <img :src="topic.photo" alt="" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn outlined rounded text @click="showInfo(topic)">
              Info
            </v-btn>
            <v-btn
              outlined
              rounded
              text
              color="red"
              @click="deleteTopic(topic.id)"
            >
              Excluir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-skeleton-loader>
    </v-col>

    <BottomSheets
      v-if="sheet == true"
      :sheet="{ sheet, config: { subject } }"
      @closeBottomSheets="sheet = $event"
    />

    <v-btn
      class="animate__animated animate__bounce"
      elevation="6"
      x-large
      color="red"
      fab
      fixed
      bottom
      right
      dark
      @click="snackbar = true"
      ><v-icon>mdi-delete</v-icon></v-btn
    >

    <!-- Snack Bar confirm delete -->

    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        {{ text }}
        {{ id }} ?

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="deleteSubject">
            Excluir
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-row>
</template>

<script>
import { FirebaseActions } from "../utils/FirebaseActions";
import BottomSheets from "./BottomSheets.vue";

export default {
  props: ["id"], // Subject
  components: { BottomSheets },
  watch: {
    $route() {
      if (this.topics.length > 0) {
        this.$store.dispatch("unbindTopics");
      }
      this.$store.dispatch("bindTopics", { filter: this.id, limit: 100 });
      this.subject = { id: this.id };
    },
  },
  data() {
    return {
      snackbar: false,
      text: `Tem certeza que deseja excluir `,
      sheet: false,
      subject: { id: this.id },
    };
  },
  computed: {
    topics() {
      return this.$store.state.topics;
    },
  },
  mounted() {
    this.$store.dispatch("bindTopics", { filter: this.id, limit: 100 }); // Filter only subject (id) topics
  },
  methods: {
    deleteSubject() {
      FirebaseActions.deleteSubject(this.id)
        .then(() => {
          this.$store.dispatch("initInfo", "Assunto deletado");
          this.snackbar = false;
        })
        .catch((error) => {
          this.$store.dispatch("initInfo", error);
        });
    },
    showInfo(topic) {
      this.sheet = true;
      this.subject.topic = topic;
    },
    deleteTopic(id) {
      FirebaseActions.deleteTopic(this.id, id)
        .then(() => {
          this.$store.dispatch("initInfo", "Tópico deletado");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  beforeDestroy() {
    this.$store.dispatch("unbindTopics");
  },
};
</script>

<style></style>
