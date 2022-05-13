import SwalConfig from "../config";
import Swal       from 'sweetalert2'

let config = {
  icon             : 'error',
  title            : 'Oups...',
  text             : "Une erreur est survenue, merci de réessayer plus tard",
  customClass      : {
    title        : SwalConfig.customClass.title,
    content      : SwalConfig.customClass.content,
    popup        : SwalConfig.customClass.popup,
    confirmButton: `${SwalConfig.customClass.confirmButton} danger-color-dark`
  },
  confirmButtonText: "J'ai compris"
};

const MainError = Swal.mixin(config);

export default MainError
