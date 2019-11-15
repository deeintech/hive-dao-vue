import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import { i18n } from "@/utils/plugins/i18n.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () => import(/* webpackChunkName: "Home" */ "./pages/HomePage.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "About" */ "./pages/AboutPage.vue")
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () => import(/* webpackChunkName: "FAQ" */ "./pages/FAQPage.vue")
    },
    {
      path: "/proposal/:id",
      name: "ProposalVote",
      props: true,
      component: () => import(/* webpackChunkName: "Vote" */ "./pages/VotePage.vue")
    },
    {
      path: "/proposals",
      component: () =>
        import(/* webpackChunkName: "Dashboard" */ "./pages/DashboardPage.vue"),
      children: [
        {
          path: "/",
          component: () =>
            import(/* webpackChunkName: "Proposals" */ "./pages/ProposalsPage.vue")
        },
        {
          path: "workers",
          component: () =>
            import(/* webpackChunkName: "Workers" */ "./pages/WorkersPage.vue")
        },
        {
          path: "createproposal",
          component: () =>
            import(
              /* webpackChunkName: "CreateProposal" */ "./pages/CreateProposalPage.vue"
            )
        }
      ]
    },
    {
      path: "/proposals/:worker",
      name: "WorkerProposalsPage",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "WorkerProposals" */ "./pages/WorkerProposalsPage.vue"
        )
    },
    {
      path: "*",
      name: "NotFound",
      component: () =>
        import(
          /* webpackChunkName: "PageNotFound" */ "./pages/PageNotFound.vue"
        )
    }
  ]
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // }
});
router.beforeEach((to, from, next) => {
  if (store.state.language !== i18n.locale) {
    store.dispatch("setLanguage", i18n.locale);
  }
  next();
});
export default router;
