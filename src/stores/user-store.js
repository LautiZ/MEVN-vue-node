import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async () => {
    await api
      .post("/auth/login", {
        email: "lauti@gmail.com",
        password: "onepiece",
      })
      .then((res) => {
        token.value = res.data.token;
        expiresIn.value = res.data.expiresIn;
        sessionStorage.setItem('user', true);
        setTime();
      })
      .catch((e) => console.log(e));
  };

  const logout = async () => {
    try {
      await api.get('/auth/logout');
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem('user');
    }
  }

  const setTime = () => {
    setTimeout(() => {
      console.log("Token refreshed");
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    console.log('Token refreshed')
    try {
      const res = await api.get("/auth/refresh");
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', true);
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('user');
    }
  };

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout
  };
});
