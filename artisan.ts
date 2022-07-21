// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue          from '@app/packages/vue'
import { App, Npm } from '@app/packages'
import prototypes   from "@config/prototype";

import { CustomWindow } from './types/custom.window'

declare let window: CustomWindow

window._ = require('lodash');
window.$ = require('jquery')

import './app/vue/utils/native/string.extension'
import './app/vue/utils/native/window.extension'
// import 'app/vue/register/serviceWorker'

// import './public/static/css/main.css'
// import './public/static/css/colors.css'

Vue.use(Npm.Storage, { prefix: App.store.getters.storage.prefix });

if (App.store.getters.APP_ENV === 'dev') {
    // Vue.config.devtools = true;
    Vue.config.performance = true
} /*else if (App.store.getters.APP_ENV === 'production') {
    Vue.config.productionTip = false;
    Vue.config.silent = true;
}*/

Vue.config.globalProperties = prototypes(Vue, App, Npm);

Vue.use(App.store)
    .use(App.router)
    .mount('#app');

/*new Vue({
    el    : '#app',
    store : App.store,
    router: App.router(Vue),
    render: h => h(VueApp)
}).$mount('#app');*/
