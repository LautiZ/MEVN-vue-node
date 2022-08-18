<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user-store";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();

const userStore = useUserStore();

const router = useRouter();

const formRegister = ref(null);

const email = ref("");
const password = ref("");
const repassword = ref("");

const handleSubmit = async () => {
  try {
    await userStore.register(email.value, password.value, repassword.value);
    router.push("/");

    email.value = "";
    password.value = "";

    formRegister.value.resetValidation();
  } catch (error) {
    alertDialogBack(error.error);
  }
};

const alertDialogBack = (message = "Error en el servidor") => {
  $q.dialog({
    title: "Error",
    message,
  });
};
</script>

<template>
  <q-page padding class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form @submit.prevent="handleSubmit" ref="formRegister">
        <q-input
          v-model="email"
          label="Email address"
          type="text"
          :rules="[
            (val) => (val && val.length > 0) || 'Write an email',
            (val) =>
              /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val) ||
              'Incorrect email format',
          ]"
          lazy-rules
        >
        </q-input>
        <q-input
          v-model="password"
          label="Password"
          type="password"
          :rules="[
            (val) =>
              (val && val.length > 5) || 'Minimum 6 characters for password',
          ]"
          lazy-rules
        >
        </q-input>

        <q-input
          v-model="repassword"
          label="Repeat password"
          type="password"
          :rules="[
            (val) => (val && val === password) || 'Passwords do not match',
          ]"
          lazy-rules
        >
        </q-input>

        <div>
          <q-btn class="q-mt-sm" label="Register" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>
