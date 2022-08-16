<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-blue-grey-9">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> App with nodejs and vue </q-toolbar-title>

        <q-btn class="q-mr-sm" color="green" to="/login" v-if="!userStore.token"
          >Login</q-btn
        >
        <q-btn color="cyan-7" to="/register" v-if="!userStore.token"
          >Register</q-btn
        >
        <q-btn class="q-mr-sm" color="cyan-7" to="/" v-if="userStore.token"
          >Inicio</q-btn
        >
        <q-btn
          class="q-mr-sm"
          color="orange-6"
          to="/protected"
          v-if="userStore.token"
          >Protected</q-btn
        >
        <q-btn color="red-10" @click="logout" v-if="userStore.token"
          >Logout</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> More info </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { useUserStore } from "../stores/user-store";
import { useRouter } from "vue-router";

const leftDrawerOpen = ref(false);
const userStore = useUserStore();
const router = useRouter();

const logout = async () => {
  await userStore.logout();
  router.push("/login");
};

const accessUser = async () => {
  await userStore.access();
  router.push("/");
};

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const essentialLinks = [
  {
    title: "Github",
    caption: "github.com",
    icon: "code",
    link: "https://github.com/LautiZ",
  },
  {
    title: "Studies",
    caption: "linkedin",
    icon: "public",
    link: "https://www.linkedin.com/in/lautaro-zullo-961288195/",
  },
  {
    title: "FreeCodeCamp",
    caption: "Cerfificate",
    icon: "school",
    link: "https://www.freecodecamp.org/espanol/certification/fcc45fe620d-30f9-4c48-ac8b-361fca74a7d7/javascript-algorithms-and-data-structures",
  },
  {
    title: "Social media",
    caption: "Instagram",
    icon: "favorite",
    link: "https://www.instagram.com/lautizullo/",
  },
];
</script>
