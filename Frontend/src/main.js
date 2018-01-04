import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import vueCookie from 'vue-cookie'
import vueLocalStorage from 'vue-localstorage'
import store from './store'

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.use(vueCookie);
Vue.use(vueLocalStorage);

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App },
  mounted() {
    this.$localStorage.set('token', '')
  }
})
