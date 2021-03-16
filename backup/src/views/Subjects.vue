<template>
<div>

      <v-tabs class="mt-5">
        <v-tab @click="subject = 'Linux'">Linux</v-tab>
        <v-tab @click="subject = 'Windows' ">Windows</v-tab>
        <v-tab @click="subject = 'Others'">Outros</v-tab>
    </v-tabs>
    <component :is="subject" />
</div>
</template>

<script>
import Linux from '../components/Linux.vue';
import Windows from '../components/Windows.vue';
import Others from '../components/Others.vue';

export default {
    components: {
        Linux,
        Windows,
        Others
    },
    data() {
        return {
            subject: 'Linux'
        }
    }
}
</script>

<style>

</style>