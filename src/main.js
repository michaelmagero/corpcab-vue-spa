import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
import moment from 'moment'

import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';


Vue.config.productionTip = false
require('@/store/subscriber');


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
//use notifications plugin
Vue.use(VueToast, {
  position: 'top'
});



//axios base url definition
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';


//use import js to pass dates format
Vue.prototype.moment = moment;

store.dispatch('auth/attempt', localStorage.getItem('token')).then(() => {

  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')

})

