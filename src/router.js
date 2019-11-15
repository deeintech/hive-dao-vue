import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store'
import { i18n } from './plugins/i18n.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ './views/Home.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "About" */ './views/About.vue')
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: () => import(/* webpackChunkName: "FAQ" */ './views/FAQ.vue')
    },
    {
      path: '/proposal/:id',
      name: 'ProposalVote',
      props: true,
      component: () => import(/* webpackChunkName: "Vote" */ './views/Vote.vue')
    },
    {
      path: '/proposals',
      component: () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue'),
      children: [{
        path: '/',
        component: () => import(/* webpackChunkName: "Proposals" */ './views/Proposals.vue')
      },{
        path: 'workers',
        component: () => import(/* webpackChunkName: "Workers" */ './views/Workers.vue')
      }, {
        path: 'createproposal',
        component: () => import(/* webpackChunkName: "CreateProposal" */ './views/CreateProposal.vue')
      }]
    },
    {
      path: '/proposals/:worker',
      name: 'WorkerProposals',
      props: true,
      component: () => import(/* webpackChunkName: "WorkerProposals" */ './views/WorkerProposals.vue')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "PageNotFound" */ './views/PageNotFound.vue')
    }
 ]
// scrollBehavior (to, from, savedPosition) {
//   return { x: 0, y: 0 }
// }
})
router.beforeEach((to, from, next) => {
  if (store.state.language !== i18n.locale) {
    store.dispatch('setLanguage', i18n.locale)
  }
  next()
})
export default router