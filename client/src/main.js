import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
// noty
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'
// Font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFacebook ,faGithub, faInstagram, faGooglePlusG, faLinkedin, faSnapchat, faFacebookMessenger,   } from '@fortawesome/free-brands-svg-icons'
library.add(faFacebook, faGithub, faInstagram, faGooglePlusG, faLinkedin, faSnapchat, faFacebookMessenger, )
// Css import
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VuejsDialog from "vuejs-dialog"
// import VuejsDialogMixin from 'vuejs-dialog/dist/vuejs-dialog-mixin.min.js'; // only needed in custom components

// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css';

import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueNoty)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDoFl8M_lXel1Lhw2VvyOq1Dblp1-frH_M'
  }
})
// NPM installed modules
Vue.use(Vuetify)
Vue.use(BootstrapVue)
Vue.use(VuejsDialog)


// Important css
require('./assets/css/template.css')
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
