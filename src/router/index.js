import Vue from 'vue'
import Router from 'vue-router'
import Fulisy from 'components/Fulisy'
import Fulidt from 'components/Fulidt'
import Fulini from 'components/Fulini'

import Fangtq from 'components/Fangtq'
import Fangtz from 'components/Fangtz'
import Fangdai from 'components/Fangdai'

import Index from 'components/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/fuli/shouyi',
    name: 'Fulisy',
    component: Fulisy
  }, {
    path: '/fuli/ni',
    name: 'Fulini',
    component: Fulini
  }, {
    path: '/fuli/dingtou',
    name: 'Fulidt',
    component: Fulidt
  },
  // 买房还贷投资
  {
    path: '/fang/tiqian',
    name: 'Fangtq',
    component: Fangtq
  }, {
    path: '/fang/touzi',
    name: 'Fangtz',
    component: Fangtz
  }, {
    path: '/fang/dai',
    name: 'Fangdai',
    component: Fangdai
  }]
})
