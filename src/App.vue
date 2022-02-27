<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/home">Home</router-link> | -->
      <router-link to="/beforeSignIn">Before Sign In Page</router-link> |
      <router-link to="/afterSignIn">After Sign In Page</router-link> |
      <router-link to="/createPlaylist">Create Playlist</router-link> |
      <!-- <router-link to="/displayPlaylist">Display Playlist</router-link> | -->
      <router-link to="/osusume">osusume</router-link> |
      <router-link to="/playlist">playlist</router-link> |
      <span class="sign-in">
        <button v-if="isLoggin" v-on:click="logOut">ログアウト</button>
        <button v-else v-on:click="logIn">ログイン</button>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      isLogin: false,
    };
  },
  methods: {
    logIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log({ result });
          if (result.user) {
            this.isLoggin = true;
          }
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.isLoggin = false;
        });
    },
  },
};
</script>

<style>
body {
  background-color: rgb(34, 34, 34);
  color: aliceblue;
  font-family: "MS Pゴシック", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: rgb(104, 104, 246);
}
</style>
