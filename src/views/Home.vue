<template>
  <div class="home">
    <div class="main-content">
      <section class="slice bg-gradient-primary" data-offset-top="#header-main">
        <div
          class="container py-6 py-lg-0 d-flex align-items-center position-relative zindex-100"
        >
          <div class="row row-grid justify-content-between align-items-center">
            <div class="col-lg-6 align-self-end">
              <div class="py-6 py-lg-8 text-center text-lg-left">
                <h2 class="h1 text-white mb-4">{{ $t("home.title") }}</h2>
                <p class="lead lh-180 text-white">{{ $t("home.subtitle") }}</p>
                <div class="mt-5">
                  <router-link
                    to="/proposals/createproposal"
                    class="btn btn-soft-info rounded-pill mr-lg-4 mb-4 mb-md-0"
                    data-toggle="tab"
                    >{{ $t("common.createProposalLabel") }}</router-link
                  >
                  <router-link
                    to="/proposals"
                    class="btn btn-outline-white btn-icon rounded-pill"
                    data-toggle="tab"
                  >
                    <span class="btn-inner--icon">
                      <i class="fas fa-play"></i>
                    </span>
                    <span class="btn-inner--text">{{ $t("home.browse") }}</span>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Features />
    </div>
  </div>
</template>

<script>
import Features from "@/views/Features.vue";

export default {
  name: "Home",
  components: {
    Features
  }
};
</script>
