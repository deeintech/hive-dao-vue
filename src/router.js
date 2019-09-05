import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'
import Proposals from './views/Proposals.vue'
import Workers from './views/Workers.vue'
import CreateProposal from './views/CreateProposal.vue'
import WorkerProposals from './views/WorkerProposals.vue'
import PageNotFound from './views/PageNotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About,
    },
    {
      path: '/proposals',
      component: Dashboard,
      children: [{
        path: '/',
        component: Proposals,
      },{
        path: 'workers',
        component: Workers,
      }, {
        path: 'createproposal',
        component: CreateProposal,
      }]
    },
    {
      path: '/proposals/:worker',
      name: 'WorkerProposals',
      props: true,
      component: WorkerProposals,
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound,
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
})
