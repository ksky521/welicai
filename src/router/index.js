import Vue from 'vue'
import Router from 'vue-router'
import Fulisy from 'components/Fulisy'
import Fulidt from 'components/Fulidt'
import Index from 'components/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/fuli/sy',
    name: 'Fulisy',
    component: Fulisy
  }, {
    path: '/fuli/dt',
    name: 'Fulidt',
    component: Fulidt
  }]
})
