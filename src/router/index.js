import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUserStore } from '../stores/user-store'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();

    // Si existe el token en memoria
    if (userStore.token) {
      return next();
    }

    // Version corta
    if (requiredAuth || sessionStorage.getItem('user')) {
      await userStore.refreshToken();
      if (userStore.token) {
        return next();
      }
      return next('/login');
    }
    return next();

    // Si no existe el token version larga
    // if (sessionStorage.getItem('user')) {
    //   await userStore.refreshToken();

    //   if (requiredAuth) {
    //     // Validar usuario o token
    //     if (sessionStorage.getItem('user')) {
    //       if (userStore.token) {
    //         return next();
    //       };
    //     };
    //     if (userStore.token) {
    //       return next();
    //     }
    //     return next('/login');
    //   } else {
    //     return next();
    //   }
    // } else {
    //   if (requiredAuth) {
    //     // Validar usuario o token
    //     if (sessionStorage.getItem('user')) {
    //       if (userStore.token) {
    //         return next();
    //       };
    //     };
    //     if (userStore.token) {
    //       return next();
    //     }
    //     return next('/login');
    //   }
    //   next();
    // }
  })

  return Router
})
