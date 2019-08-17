import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

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
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/createproposal',
      name: 'CreateProposal',
      component: () => import(/* webpackChunkName: "create proposal" */ './views/CreateProposal.vue')
    },
    {
      path: '/proposals',
      name: 'TestnetProposals',
      component: () => import(/* webpackChunkName: "testnetproposals" */ './views/TestnetProposals.vue')
    },
    {
      path: '/proposals/:worker',
      name: 'WorkerProposals',
      props: true,
      component: () => import(/* webpackChunkName: "proposal details" */ './views/WorkerProposals.vue')
    },
    {
      path: '/workers',
      name: 'Workers',
      component: () => import(/* webpackChunkName: "testnetproposals" */ './views/Workers.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notfound" */ './views/PageNotFound.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
