<template>
  <v-card max-width="450" class="mx-auto">
    <v-toolbar color="white">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Contatos</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list three-line>
      <v-subheader> Todos os contatos </v-subheader>
      <template v-for="(contact, index) in contacts">
        <v-divider :key="index" :inset="true"></v-divider>

        <v-list-item
          :key="contact.email"
          :to="{ name: 'Contact', params: { id: contact.email } }"
        >
          <v-list-item-avatar>
            <v-img :src="contact.photo"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ contact.name }} </v-list-item-title>
            <v-list-item-subtitle>{{ contact.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.state.contacts;
    },
  },
  mounted() {
    this.getContacts();
  },
  beforeDestroy() {
    this.$store.dispatch("unbindContacts");
  },
  methods: {
    getContacts() {
      this.$store.dispatch("bindContacts");
    },
  },
};
</script>
