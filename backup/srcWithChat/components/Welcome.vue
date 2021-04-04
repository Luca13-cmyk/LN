<template>
  <div class="bgcoverper">
    <section id="version-per">
      <b><a rel="noopener noreferrer">Bem Vindo(a)</a> </b>
    </section>
    <v-container>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center" cols="12">
          <main role="main">
            <div class="content-terminal">
              <div class="header-top">
                <i class="fas fa-cog"></i>
                <div
                  class="icons-per-terminal"
                  style="position:absolute;right: 5px;top:50%;transform: translateY(-50%)"
                >
                  <i class="fas fa-circle" style="color: orange"></i>
                  <i class="fas fa-circle" style="color: rgb(6, 248, 6)"></i>
                  <i class="fas fa-circle" style="color: red"></i>
                </div>
              </div>
              <div class="box-code-per">
                <section class="content-terminal-type">
                  <b style="color: white;"
                    ><span style="color: rgba(255, 0, 0, 0.562)"
                      >ln-app@ln-app-OEM</span
                    >:<span style="color:rgba(0, 255, 255, 0.658)">~</span>$</b
                  >
                  <p class="bash-per" style="padding-left: 10px"></p>
                </section>
              </div>
            </div>
          </main>
        </v-col>
        <footer class="mt-12">
          <div>
            <p class="footer-p">
              Desenvolvido por
              <a href="mailto:lucanegrette1303@gmail.com">Luca Negrette</a>
            </p>
          </div>
        </footer>
      </v-row>
    </v-container>
    <v-speed-dial
      v-model="fab"
      :top="top"
      :bottom="bottom"
      :right="right"
      :left="left"
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      fixed
    >
      <template v-slot:activator>
        <v-btn v-model="fab" color="blue darken-2" dark fab>
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-account-circle
          </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark small color="red" @click="initAuth">
        <v-icon>mdi-google</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import Typed from "typed.js";
import { FirebaseActions } from "@/utils/FirebaseActions";

export default {
  data: () => ({
    direction: "top",
    fab: false,
    fling: false,
    hover: false,
    tabs: null,
    top: false,
    right: true,
    bottom: true,
    left: false,
    transition: "slide-y-reverse-transition",
  }),
  methods: {
    initAuth() {
      FirebaseActions.AuthUser()
        .then(() => {
          this.$emit("userAuth", true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    new Typed(".bash-per", {
      strings: [
        "apt update",
        "ls -la",
        "apt install",
        "ifconfig",
        "msfconsole",
      ],
      smartBackspace: true, // Default value
      typeSpeed: 100,
      backDelay: 1000,
      backSpeed: 100,
      loop: true,
    });
  },
};
</script>

<style scoped>
.bgcoverper {
  height: 100%;
  width: 100%;
  background-image: url("../assets/desktop.jpg");
  background-size: cover;
  text-shadow: 0 0.05rem 0.1rem rgb(0 0 0 / 50%);
  box-shadow: inset 0 0 5rem rgb(0 0 0 / 50%);
}
/* terminal */
main {
  max-height: 500px;
  height: 450px;
  margin-top: 150px;
  max-width: 800px;
}
.content-terminal {
  height: 100%;
  max-width: 80%;
  background-color: #000c;
  position: relative;
  border-radius: 11px;
  box-shadow: 0 0 38px #000;
}
.content-terminal .header-top {
  position: relative;
  top: 0;
  width: 100%;
  height: 30px;
  background: #333;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 11px;
  border-top-right-radius: 11px;
}
.content-terminal .header-top .fa-cog {
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  color: #ccc;
  font-size: 14px;
}
.content-terminal-type {
  display: flex;
}
.bash-per {
  color: #fff;
}

span.typed-cursor {
  color: #fff;
}
#version-per {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: -45px;
  width: 300px;
  height: 30px;
  background: rgba(255, 255, 255, 0.452);
  transform: rotate(40deg);
  /* opacity: 0.6; */
}
#version-per b a {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(+20%, -50%);
  color: black;
}

@media screen and (max-width: 1000px) {
  #version-per {
    /* bottom: 0; */
    display: none;
    top: 97%;
    left: -50%;
    width: 380px;
    transform: rotate(0deg);
  }
}

.footer-p {
  color: rgba(255, 255, 255, 0.5);
}
a {
  text-decoration: none;
}
.footer-p a {
  color: white;
}
</style>
