<template>
  <q-page padding>
    <q-btn @click="access">Login!</q-btn>
    <q-btn @click="createLink">Create link</q-btn>
    <br />
    <br />
    {{ token }} {{ expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from "src/boot/axios";
import { ref } from "vue";

const token = ref("");
const expiresIn = ref("");

const access = () => {
  api
    .post("/auth/login", {
      email: "lauti@gmail.com",
      password: "onepiece",
    })
    .then((res) => {
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      setTime();
    })
    .catch((e) => console.log(e));
};

const createLink = async () => {
  try {
    const res = await api({
      method: "POST",
      url: "/links",
      headers: {
        Authorization: "Bearer " + token.value,
      },
      data: {
        longLink:
          "https://bluuweb.github.io/desarrollo-web-bluuweb/21-04-mevn/#api-rest",
      },
    });
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

const setTime = () => {
  setTimeout(() => {
    console.log("Token refreshed");
    refreshToken();
  }, expiresIn.value * 1000 - 6000);
};

const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh");
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime();
  } catch (error) {
    console.log(error);
  }
};
refreshToken();
</script>
