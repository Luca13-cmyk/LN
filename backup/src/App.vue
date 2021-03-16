<template>
	<v-app v-if="login">
		<Header :user="user"/>
		<v-main>
			<v-container>
				<router-view>

				</router-view>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import Header from './components/Header';
import { firebase, db } from './firebase';

export default {
components: {
        Header
    },
	created() {
      var provider = new firebase.auth.GoogleAuthProvider();
  
      firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
  
        this.$store.state.userAuth = {
            token: result.credential.token,
            user: result.user
          }

        this.addUser(result.user);

        this.getUser();

        this.login = true;

      }).catch((error) => {

        this.login = false;
        console.log(error);
      });
	},
  data() {
    return {
      login: false
    }
  },
  computed: {
    user() {
      return this.$store.state.userBind;
    }
  },
  methods: {
    getUser  () {
      this.$store.dispatch("bindUser");
    },
    addUser(user) {
      db.collection('users').doc(user.email).set({
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
        online: true,
        inadmin: user.email == 'lucanegresco@gmail.com' ? true : false
      })
    }
  }
}
</script>

<style>
body {
  height: 500vh
}

</style>

