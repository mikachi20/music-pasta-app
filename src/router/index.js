import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AfterSignIn from "@/views/AfterSignIn.vue";
import BeforeSignIn from "@/views/BeforeSignIn.vue";
import Osusume from "../components/osusumeSearch.vue";
import Playlist from "../components/anythingSearch.vue";
// import store from "@/store";
import DisplayPlaylist from "../views/DisplayPlaylist.vue";
import CreatePlaylist from "../views/CreatePlaylist.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: Home,
  },

  {
    path: "/displayPlaylist",
    name: "DisplayPlaylist",
    component: DisplayPlaylist,
  },

  {
    path: "/osusume",
    name: "Osusume",
    component: Osusume,
  },
  {
    path: "/playlist",
    name: "playlist",
    component: Playlist,
  },
  {
    path: "/createPlaylist",
    name: "createPlaylist",
    component: CreatePlaylist,
  },
  {
    path: "/playlist",
    name: "Playlist",
    component: () => import("../views/Playlist.vue"),
  },
  {
    path: "/",
    redirect: "/BeforeSignIn",
  },
  {
    path: "/beforeSignIn",
    name: "BeforeSignIn",
    component: BeforeSignIn,
  },
  {
    path: "/afterSignIn",
    name: "AfterSignIn",
    component: AfterSignIn,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

const isSignedIn = async () => {
  return await new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          unsubscribe();
          resolve(true);
        } else {
          unsubscribe();
          resolve(false);
        }
      },
      (error) => {
        unsubscribe();
        reject(error);
      }
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const auth = await isSignedIn();
  if (to.name !== "BeforeSignIn" && !auth) {
    next("/BeforeSignIn");
  } else {
    next();
  }
});

export default router;
