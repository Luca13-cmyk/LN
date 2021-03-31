<template>
  <div>
    <v-tabs class="mt-5">
      <v-tab
        :to="{ name: 'Subject', params: { id: subject.id } }"
        v-for="subject in subjects"
        :key="subject.id"
        >{{ subject.id }}</v-tab
      >
    </v-tabs>
    <v-divider></v-divider>

    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    subjects() {
      return this.$store.state.subjects;
    },
  },
};
</script>

<style></style>
