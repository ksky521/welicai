import Vue from 'vue'
import Router from 'vue-router'
import Fuli from 'components/Fuli'
import Index from 'components/Index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/fuli',
    name: 'Fuli',
    component: Fuli
  }]
})
