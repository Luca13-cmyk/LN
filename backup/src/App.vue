<template>
  <v-app>
    <Welcome v-if="!login" @userAuth="login = $event" />

    <Header v-if="login" :user="user" />

    <v-main v-if="login">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <SnackBar />
    <BottomSheet />
  </v-app>
</template>

<script>
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import SnackBar from "./components/modules/SnackBar";
import BottomSheet from "./components/modules/BottomSheet";

export default {
  components: {
    Header,
    Welcome,
    SnackBar,
    BottomSheet,
  },
  data() {
    return {
      drawerRight: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.userBind;
    },
    login() {
      return this.$store.state.login;
    },
  },
};
</script>

<style></style>
