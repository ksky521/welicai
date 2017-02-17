import Vue from 'vue'
import Router from 'vue-router'
import Fulisy from 'components/Fulisy'
import Fulidt from 'components/Fulidt'
import Fulini from 'components/Fulini'
import Licai from 'components/Licai'
import Baoxian from 'components/Baoxian'

import Fangtq from 'components/Fangtq'
import Fangtz from 'components/Fangtz'
import Fangdai from 'components/Fangdai'

import Index from 'components/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: Index
  }, {
    path: '/fuli/shouyi',
    name: 'fulisy',
    component: Fulisy
  }, {
    path: '/licai',
    name: 'licai',
    component: Licai
  }, {
    path: '/fuli/ni',
    name: 'fulini',
    component: Fulini
  }, {
    path: '/fuli/dingtou',
    name: 'fulidt',
    component: Fulidt
  },
  // 买房还贷投资
  {
    path: '/fang/tiqian',
    name: 'fangtq',
    component: Fangtq
  }, {
    path: '/fang/touzi',
    name: 'fangtz',
    component: Fangtz
  }, {
    path: '/fang/dai',
    name: 'fangdai',
    component: Fangdai
  },
  // 保险
  {
    path: '/baoxian',
    name: 'baoxian',
    component: Baoxian
  }]
})
