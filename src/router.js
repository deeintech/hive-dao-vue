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
import FAQ from './views/FAQ.vue'
import Vote from './views/Vote.vue'
import store from './store/store'
import { i18n } from './plugins/i18n.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/faq',
      name: 'FAQ',
      component: FAQ
    },
    {
      path: '/proposal/:id',
      name: 'ProposalVote',
      props: true,
      component: Vote
    },
    {
      path: '/proposals',
      component: Dashboard,
      children: [{
        path: '/',
        component: Proposals
      },{
        path: 'workers',
        component: Workers
      }, {
        path: 'createproposal',
        component: CreateProposal
      }]
    },
    {
      path: '/proposals/:worker',
      name: 'WorkerProposals',
      props: true,
      component: WorkerProposals
    },
    {
      path: '*',
      name: 'NotFound',
      component: PageNotFound
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