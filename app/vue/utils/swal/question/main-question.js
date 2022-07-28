import Swal from 'sweetalert2'

import SwalConfig from "../config";

let config = {
    icon             : 'question',
    title            : "Attention",
    text             : "Êtes-vous sûr(e) de vouloir faire ça ?",
    customClass      : {
        title        : SwalConfig.customClass.title ?? '',
        content      : SwalConfig.customClass.content ?? '',
        popup        : SwalConfig.customClass.popup ?? '',
        confirmButton: `bg-danger`
    },
    confirmButtonText: "Oui, continuer",
    cancelButtonText: "Annuler",
    showCancelButton: true
};

const MainQuestion = Swal.mixin(config);

export default MainQuestion
