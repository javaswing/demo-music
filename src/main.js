import Vue from 'vue'
import App from './App'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueResource from 'vue-resource'
Vue.use(MuseUI)
Vue.use(VueResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
