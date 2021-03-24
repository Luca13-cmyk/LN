<template>
	<v-app v-if="login">
		<Header :user="user"/>
    
		<v-main>
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
        alert(error);
      });
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
@keyframes slide-in {
	from { transform: translateY(-30px); opacity: 0; }
	to { transform: translateY(0px); opacity: 1; }
}
@keyframes slide-out {
	from { transform: translateY(0px); opacity: 1; }
	to { transform: translateY(-30px); opacity: 0; }
}
.slide-enter-active {
	animation: slide-in 0.3s ease;
}
.slide-leave-active {
	animation: slide-out 0.3s ease;
}
</style>

