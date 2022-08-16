<template>
  <q-page padding>
    <h3 class="text-center">Add link</h3>
    <AddLink></AddLink>
    <pre>
      {{ useLink.links }}
    </pre>
    <!-- <template> -->
    <div class="row">
      <LinkCard class="col-4" v-for="link in useLink.links" :key="link._id" />
    </div>
    <!-- </template> -->
  </q-page>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";

// Components
import AddLink from "src/components/AddLink.vue";
import LinkCard from "src/components/LinkCard.vue";

const useLink = useLinkStore();
</script>
