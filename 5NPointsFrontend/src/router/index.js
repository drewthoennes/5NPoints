import Vue from 'vue'
import Router from 'vue-router'
import Points from '@/components/Points'
import Earn from '@/components/Earn'
import Rewards from '@/components/Rewards'
import Login from '@/components/Login'
import Admin from '@/components/Admin'

Vue.use(Router)

export default new Router({
  hashbang: false,
  history: true,
  mode: 'history',
  routes: [
    {
      path: '/points',
      name: 'Points',
      component: Points
    },
    {
      path: '/earn',
      name: 'Earn',
      component: Earn
    },
    {
      path: '/rewards',
      name: 'Rewards',
      component: Rewards
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '*',
      redirect: '/points'
    }
  ]
})
