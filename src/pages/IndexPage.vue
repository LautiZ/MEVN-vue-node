<template>
  <q-page padding>
    <h2>Home page</h2>
    <AddLink></AddLink>
    <div class="row" style="width: 90%; margin: auto">
      <h4 class="q-my-md full-width">Your links</h4>
      <LinkCard
        class="col-3"
        v-for="link in useLink.links"
        :key="link._id"
        :link="link"
      />
    </div>
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";

// Components
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";

const useLink = useLinkStore();
</script>
