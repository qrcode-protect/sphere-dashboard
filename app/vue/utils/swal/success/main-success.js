import Swal from 'sweetalert2'

import SwalConfig from "../config";

let config = {
  icon             : 'success',
  title            : "Réussi",
  text             : "L'action s'est terminée avec succès",
  customClass      : {
    title        : SwalConfig.customClass.title,
    content      : SwalConfig.customClass.content,
    popup        : SwalConfig.customClass.popup,
    confirmButton: `${SwalConfig.customClass.confirmButton} success-color-dark`
  },
  confirmButtonText: "J'ai compris"
};

const MainSuccess = Swal.mixin(config);

export default MainSuccess
