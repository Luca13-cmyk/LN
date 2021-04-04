<template>
  <div>
    <v-navigation-drawer dark app v-model="drawer" fixed>
      <v-list-item>
        <v-list-item-avatar>
          <v-badge
            bordered
            bottom
            color="green"
            dot
            offset-x="11"
            offset-y="11"
          >
            <v-avatar size="40">
              <v-img :src="user.photo"></v-img>
            </v-avatar>
          </v-badge>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ user.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>

      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/to-do">
          <v-list-item-icon>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Lembretes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/subjects">
          <v-list-item-icon>
            <v-icon>mdi-text-subject</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Assuntos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/logout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>LN</span>
        <span class="font-weight-light">APP</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <Modal />
    </v-app-bar>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  components: {
    Modal,
  },
  data() {
    return {
      drawer: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.userBind;
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    getUser() {
      this.$store.dispatch("bindUser");
    },
  },
};
</script>

<style></style>
