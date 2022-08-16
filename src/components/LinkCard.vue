<script setup>
import { useLinkStore } from "../stores/link-store";
import { useNotify } from "../composables/notifyHook";
import { useQuasar } from "quasar";

const useLink = useLinkStore();
const { showNotify } = useNotify();
const $q = useQuasar();

defineProps({
  link: Object,
});

const deleteLink = async (_id) => {
  $q.dialog({
    title: "❌ Warning ❌",
    dark: true,
    message: "Are you sure you want to remove this link?",
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      try {
        await useLink.removeLink(_id);
        showNotify("Deleted link", "warning", "report_problem");
      } catch (error) {
        if (error.errors) {
          return error.errors.forEach((item) => {
            showNotify(item.msg, "negative", "report_problem");
          });
        }
      }
    })
    .onCancel(() => {
      showNotify("Link has not been deleted", "cyan-4", "thumb_up");
    });
};

const updateLink = async (link) => {
  $q.dialog({
    dark: true,
    title: "Update link",
    message: "Enter new link",
    prompt: {
      model: link.longLink,
      type: "text",
    },
    cancel: true,
    persistent: true,
  })
    .onOk(async (data) => {
      try {
        const newLink = { ...link, longLink: data };
        await useLink.modifyLink(newLink);
        showNotify("Modified link", "green", "thumb_up");
      } catch (error) {
        if (error.errors) {
          return error.errors.forEach((item) => {
            showNotify(item.msg, "negative", "report_problem");
          });
        }
      }
    })
    .onCancel(() => {
      showNotify("Link has not been changed", "orange", "report_problem");
    });
};

const copyLink = async (nanolink) => {
  try {
    const path = `${process.env.FRONT_URI}/${nanolink}`;
    await navigator.clipboard.writeText(path);
    showNotify("Short link copied to clipboard", "cyan-4");
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <q-card dark bordered class="bg-grey-9 my-card">
    <q-card-section>
      <div class="text-h6">Link</div>
      <div class="text-subtitle2">ID: {{ link._id }}</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
      <div class="text-subtitle2">Original link:</div>
      {{ link.longLink }}
      <div class="text-subtitle2 q-mt-sm">Nanolink:</div>
      {{ link.nanoLink }}
    </q-card-section>
    <q-separator />

    <q-card-actions class="flex-center">
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        color="red"
        class="q-mx-sm"
        @click="deleteLink(link._id)"
      />
      <q-btn
        flat
        round
        icon="mdi-pencil-outline"
        color="cyan"
        class="q-mx-sm"
        @click="updateLink(link)"
      />
      <q-btn flat color="grey-4" @click="copyLink(link.nanoLink)"> Copy </q-btn>
    </q-card-actions>
  </q-card>
</template>
