import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import vueLocalStorage from'vue-localstorage'

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.use(vueLocalStorage);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    this.$localStorage.set('token', 'CREATEDTOKEN')
  }
})
