<template>
  <div>
    <v-navigation-drawer app v-model="drawer" fixed temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-badge
            bordered
            bottom
            :color="online"
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
        <v-list-item v-if="user.inadmin" link to="/users">
          <v-list-item-icon>
            <v-icon>mdi-account-box-multiple-outline</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Usuários</v-list-item-title>
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
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"> </v-app-bar-nav-icon>

      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>LN</span>
        <span class="font-weight-light">APP</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <Modal />

      <v-btn @click="drawerRight = !drawerRight" icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      temporary
      app
      min-width="300"
    >
      <Contacts />
    </v-navigation-drawer>
  </div>
</template>

<script>
import Modal from "./Modal.vue";
import Contacts from "./Contacts.vue";

export default {
  props: ["user"],
  components: {
    Modal,
    Contacts,
  },
  data() {
    return {
      drawer: null,
      drawerRight: false,
    };
  },
  computed: {
    online() {
      return this.user.online ? "green accent-4" : "deep-purple accent-4";
    },
  },
};
</script>

<style></style>
