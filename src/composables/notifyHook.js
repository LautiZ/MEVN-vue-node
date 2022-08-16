import { useQuasar } from "quasar";

export const useNotify = () => {

  const $q = useQuasar();

  const showNotify = (message, color = 'blue-grey', icon) => {
    $q.notify({
      message,
      color,
      position: 'bottom-right',
      icon: icon ? icon : null
    })
  }
  return { showNotify };
}
