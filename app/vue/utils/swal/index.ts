/*import MainError from "./errors/main-error";

 export {
 MainError
 }*/


import swal from "sweetalert2";

export const toast = (text, timer = 5000) => swal.fire({
    icon             : "success",
    text,
    toast            : true,
    position         : 'bottom-end',
    timer,
    timerProgressBar : true,
    showConfirmButton: false,
    customClass      : {
        icon: 'ssf-toast-icon-small'
    }
})
