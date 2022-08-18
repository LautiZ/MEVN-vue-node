<script setup>
import { ref } from "vue";
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "../composables/notifyHook";

const useLink = useLinkStore();
const { showNotify } = useNotify();

const formAdd = ref(null);

const link = ref("");
const loading = ref(false);

const addLink = async () => {
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify("Link created", "green", "tag_faces");
    link.value = "";
    formAdd.value.resetValidation();
  } catch (error) {
    if (error.errors) {
      return error.errors.forEach((item) => {
        showNotify(item.msg, "negative", "report_problem");
      });
    }
    showNotify("Error when adding link", "negative", "report_problem");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div bordered class="my-card" style="width: 60%; margin: auto">
    <div>
      <h4 class="text-center q-mb-xs">Add link</h4>
    </div>
    <div>
      <q-form @submit.prevent="addLink" ref="formAdd">
        <q-input
          v-model="link"
          label="Enter link"
          :rules="[
            (val) => (val && val.trim() !== '') || 'Please write something',
          ]"
          lazy-rules
        ></q-input>
        <q-btn
          class="q-mt-sm full-width"
          label="Agregar"
          color="blue-grey-8"
          type="submit"
          :loading="loading"
        ></q-btn>
      </q-form>
    </div>
  </div>
</template>
