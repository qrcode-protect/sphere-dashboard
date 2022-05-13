import { createApp }                                  from 'vue'
// import Vue2Filters   from 'vue2-filters' // no longer supported ?
import { createMetaManager, plugin as vueMetaPlugin } from 'vue-meta'
// import VueJsModal    from 'vue-js-modal' // vue-final-modal
import VueSsfElement                                  from '@sofiakb/vue-element'
import vfmPlugin                                      from 'vue-final-modal'

import VueApp from '@/App.vue'


const Vue = createApp(VueApp)
  .use(createMetaManager())
  .use(vueMetaPlugin)
  .use(vfmPlugin)
  .use(VueSsfElement);

export default Vue
