import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
library.add( faUserAstronaut);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false


//axios base url definition
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
