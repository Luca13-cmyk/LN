<template>
  <v-col align="center" cols="12" sm="12" lg="12">
    <v-col cols="12" lg="4" sm="7">
      <v-text-field
        append-outer-icon="mdi-card-search-outline"
        v-model="filterTopicField"
        @click:append-outer="filterTopic"
        label="Filtrar conteúdo..."
      ></v-text-field>
    </v-col>

    <v-skeleton-loader
      v-for="topic in topics"
      :key="topic.id"
      class="mx-auto mt-6"
      max-width="800"
      type="card"
    >
      <v-card width="800" align="left" elevation="4" shaped min-height="180">
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
          <v-btn outlined rounded text @click="showInfoTopic(topic)">
            Info/Edit
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
    <v-btn class="mt-6" @click="loadPlus" elevation="6">Carregar +</v-btn>
  </v-col>
</template>

<script>
import { FirebaseActions } from "../utils/FirebaseActions";
export default {
  props: ["id"],
  watch: {
    $route() {
      if (this.topics.length > 0) {
        this.$store.dispatch("unbindTopics");
      }
      this.$store.dispatch("bindTopics", {
        filter: this.id,
        limit: this.limit,
      });
    },
  },
  computed: {
    topics() {
      return this.$store.state.topics;
    },
  },
  data() {
    return {
      limit: 10,
      filterTopicField: "",
    };
  },
  methods: {
    showInfoTopic(topic) {
      this.$store.dispatch("initEdit", { id: this.id, topic, type: "topic" });
    },
    filterTopic() {
      this.$store.dispatch("unbindTopics");
      this.$store.dispatch("bindTopics", {
        filter: this.id,
        limit: this.limit,
        topic: this.filterTopicField,
      });
    },
    loadPlus() {
      this.$store.dispatch("unbindTopics");
      this.limit += 10;
      this.$store.dispatch("bindTopics", {
        filter: this.id,
        topic: this.filterTopicField,
        limit: this.limit,
      });
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
  mounted() {
    this.$store.dispatch("bindTopics", { filter: this.id, limit: this.limit }); // Filter only subject (id) topics
  },
  beforeDestroy() {
    this.$store.dispatch("unbindTopics");
  },
};
</script>

<style></style>
