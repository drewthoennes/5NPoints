import Vue from 'vue'
import App from './App'
import router from './router'
import vueresource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(vueresource);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
