/* eslint-disable no-console */

import {register, unregister} from 'register-service-worker'
import swal  from 'sweetalert2'
import store from '@app/vue/store'

if (store.getters.APP_ENV === 'production') {
  register(`${process.env.PUBLIC_PATH}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registration: any) {
      console.log('New content is available; please refresh.')
      // @ts-ignore
      swal.fire({
        toast            : true, icon: 'info', text: "Mise à jour disponible", position: 'bottom-end',
        customClass      : {
          container    : 'swal2-update-sw',
          content      : 'px-2',
          popup        : 'bg-light rounded b-0',
          confirmButton: 'bg-transparent p-0 color-1 font-italic'
        },
        confirmButtonText: 'Rafraîchir'/*, timer: 10000, timerProgressBar: true,
        onOpen           : (toast) => {
          toast.addEventListener('mouseenter', swal.stopTimer)
          toast.addEventListener('mouseleave', swal.resumeTimer)
        }*/
      }).then((answer) => {
        if (answer) {
          registration.unregister()
          location.reload()
        }
      })
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
