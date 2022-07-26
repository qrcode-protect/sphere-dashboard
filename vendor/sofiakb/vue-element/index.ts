// import './assets/mdb.min.css'

import SsfIcon        from './components/icon/index.vue'
import SsfFormGroup   from './components/form-group/index.vue'
import SsfLoader      from './components/loader/index.vue'
import SsfContainer   from './components/container.vue'
import SsfRow         from './components/row.vue'
import SsfCol         from './components/col.vue'
import SsfCard        from './components/card.vue'
import SsfTable       from './components/table/index.vue'
import SsfNavbar      from './components/navbar.vue'
import SsfLogo        from './components/logo.vue'
import SsfModal       from './components/modal.vue'
import SsfTableColumn from './components/table/includes/column-bridge.vue'
import SsfParallax    from './components/parallax'
import SsfPagination    from './components/pagination.vue'
import SsfInitial     from './components/initial'
import SsfText        from './components/text.vue'
import SsfShape       from './components/shape.vue'
import SsfTitle       from './components/title.vue'
import SsfLine        from './components/line.vue'
import { h }          from "vue";

// import Message from './components/message/index.js'

export default {
    install(Vue: any, options: any) {
        Vue.component('ssf-icon', SsfIcon);
        Vue.component('ssf-form-group', SsfFormGroup);
        Vue.component('ssf-loader', SsfLoader);
        Vue.component('ssf-container', SsfContainer);
        Vue.component('ssf-row', SsfRow);
        Vue.component('ssf-col', SsfCol);
        Vue.component('ssf-card', SsfCard);
        Vue.component('ssf-table', SsfTable);
        Vue.component('ssf-table-column', SsfTableColumn);
        Vue.component('ssf-navbar', SsfNavbar)
        Vue.component('ssf-logo', SsfLogo)
        Vue.component('ssf-modal', SsfModal)
        Vue.component('ssf-parallax', SsfParallax)
        Vue.component('ssf-initial', SsfInitial)
        Vue.component('ssf-text', SsfText)
        Vue.component('ssf-shape', SsfShape)
        Vue.component('ssf-title', SsfTitle)
        Vue.component('ssf-line', SsfLine)
        Vue.component('ssf-pagination', SsfPagination)

        // Vue.config.globalProperties.$message = Message
    }
}

export {
    SsfIcon,
    SsfFormGroup,
    SsfLoader,
    SsfContainer,
    SsfRow,
    SsfCol,
}
