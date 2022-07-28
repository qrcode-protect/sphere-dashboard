/*import MainError from "./errors/main-error";

 export {
 MainError
 }*/


import swal from "sweetalert2";

// @ts-ignore
import MainSuccess from './success/main-success'
// @ts-ignore
import MainError from './errors/main-error'
// @ts-ignore
import MainWarning from './warning/main-warning'
// @ts-ignore
import MainQuestion from './question/main-question'

export {
    MainSuccess,
    MainError,
    MainWarning,
    MainQuestion
}

export const toast = (text: string, timer: number = 5000) => swal.fire({
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
