import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
 state: {
   admin: null
 },
 mutations: {
   setAdmin(state, isAdmin) {
     state.admin = isAdmin;
   }
 },
 getters: {
   isAdmin: state => {
     return state.admin;
   }
 }
});

export default store;
