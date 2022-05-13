import Swal from 'sweetalert2'

import SwalConfig from "../config";

let config = {
  icon             : 'warning',
  title            : "Attention",
  text             : "Êtes-vous sûr(e) de vouloir faire ça ?",
  customClass      : {
    title        : SwalConfig.customClass.title,
    content      : SwalConfig.customClass.content,
    popup        : SwalConfig.customClass.popup,
    confirmButton: `${SwalConfig.customClass.confirmButton} warning-color-dark`
  },
  confirmButtonText: "J'ai compris"
};

const MainSuccess = Swal.mixin(config);

export default MainSuccess
