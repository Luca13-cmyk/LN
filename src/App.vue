<template>
	<v-app >

    <Welcome v-if="!login" @userAuth="login = $event"/>

    
		<Header v-if="login" :user="user"/>
    
		<v-main v-if="login">
			<v-container>
        <!-- <transition name="slide" mode="out-in"> -->
				<router-view />
        <!-- </transition> -->
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Header from './components/Header';
import Welcome from './components/Welcome.vue';

export default {
components: {
        Header,
        Welcome
    },
  data() {
    return {
      login: false,
      drawerRight: null
    }
  },
  computed: {
    user() {
      return this.$store.state.userBind;
    }
  },
  
}
</script>

<style>

</style>

