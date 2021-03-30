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
    <SnackBars />
	</v-app>
</template>

<script>
import Header from './components/Header';
import Welcome from './components/Welcome';
import SnackBars from './components/SnackBars';

export default {
components: {
        Header,
        Welcome,
        SnackBars
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

