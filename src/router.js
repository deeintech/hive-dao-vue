import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store";
import { i18n } from "@/utils/plugins/i18n.js";
import ProposalsPage from "@/pages/Proposals/ProposalsPage.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: () =>
        import(/* webpackChunkName: "Home" */ "@/pages/Home/HomePage.vue")
    },
    {
      path: "/about",
      name: "About",
      component: () =>
        import(/* webpackChunkName: "About" */ "@/pages/About/AboutPage.vue")
    },
    {
      path: "/faq",
      name: "FAQ",
      component: () =>
        import(/* webpackChunkName: "FAQ" */ "@/pages/FAQ/FAQPage.vue")
    },
    // {
    //   path: "/login",
    //   name: "Login",
    //   component: () =>
    //     import(/* webpackChunkName: "Login" */ "@/pages/Login/LoginPage.vue")
    // },
    {
      path: "/proposal/:id",
      name: "ProposalVote",
      props: true,
      component: () =>
        import(/* webpackChunkName: "Vote" */ "@/pages/Vote/VotePage.vue")
    },
    {
      path: "/proposals",
      component: () =>
        import(
          /* webpackChunkName: "Dashboard" */ "@/components/DashboardSection.vue"
        ),
      children: [
        {
          path: "/",
          name: "Proposals",
          component: ProposalsPage
        },
        {
          path: "workers",
          component: () =>
            import(
              /* webpackChunkName: "Workers" */ "@/pages/Workers/WorkersPage.vue"
            )
        },
        {
          path: "createproposal",
          component: () =>
            import(
              /* webpackChunkName: "CreateProposal" */ "@/pages/CreateProposal/CreateProposalPage.vue"
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
          /* webpackChunkName: "WorkerProposals" */ "@/pages/WorkerProposals/WorkerProposalsPage.vue"
        )
    },
    {
      path: "*",
      name: "NotFound",
      component: () =>
        import(
          /* webpackChunkName: "PageNotFound" */ "@/pages/PageNotFound/PageNotFound.vue"
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
