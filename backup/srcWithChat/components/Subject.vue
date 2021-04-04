<template>
  <v-row align="center" justify="center" class="mt-3">
    <Topic :id="id" />

    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      fixed
      class="animate__animated animate__bounce"
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-file-document-edit-outline
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="red" @click="snackbar = true">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <v-btn fab dark small color="green" @click="showEditSubject">
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-speed-dial>

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
import Topic from "./Topic.vue";

export default {
  components: { Topic },
  props: ["id", "subject"], // Subject
  watch: {
    $route() {
      this.subjectData = this.subject;
    },
  },
  data() {
    return {
      snackbar: false,
      text: `Tem certeza que deseja excluir `,
      sheet: false,
      subjectData: [],
      direction: "top",
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: true,
      bottom: true,
      left: false,
      transition: "slide-y-reverse-transition",
    };
  },

  mounted() {
    this.subjectData = this.subject;
  },
  methods: {
    deleteSubject() {
      FirebaseActions.deleteSubject(this.id)
        .then(() => {
          this.$store.dispatch("initInfo", "Assunto deletado");
          this.snackbar = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    showEditSubject() {
      this.subjectData.type = "subject";
      this.$store.dispatch("initEdit", this.subjectData);
    },
  },
};
</script>

<style></style>
