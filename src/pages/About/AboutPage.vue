<template>
  <div class="main-content">
    <AppHeaderSection
      :title="`${$t('common.aboutLabel')}`"
      :subtitle="`${$t('about.subtitle')}`"
    />
    <section class="section-half-rounded pb-100 bg-section-secondary">
      <div class="section-inner bg-section-secondary"></div>
      <div class="container pt-6 py-lg-8" id="sps">
        <div class="row">
          <div class="col-lg-7">
            <div>
              <h2 class="display-4 mb-4 lh-110">{{ $t("about.header1") }}</h2>
              <div class="row">
                <div class="col-lg-10">
                  <p class="lead lh-180">{{ $t("about.description1") }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="slice slice-lg bg-section-secondary">
      <div class="container">
        <div class="row row-grid align-items-center mt--200">
          <div class="col-lg-6 order-lg-2 ml-lg-auto">
            <img
              alt="Community"
              src="@/assets/img/random/img-1-1000x900.jpg"
              class="img-center img-fluid rounded shadow-lg"
            />
          </div>
          <div class="col-lg-5">
            <div class="pt-lg-7">
              <h5 class="h3">{{ $t("about.header2") }}</h5>
              <p class="lead text-muted my-4">
                {{ $t("about.description2") }}
              </p>
              <a
                href="https://peakd.com/steem/@steemitblog/hf21-sps-and-eip-explained"
                target="_blank"
                class="link link-underline-info"
                >{{ $t("common.findOutMore") }}</a
              >
            </div>
          </div>
        </div>
        <div class="row row-grid align-items-center mt-8">
          <div class="col-lg-6">
            <img
              alt="Dmitry"
              src="https://avatars0.githubusercontent.com/u/5336968?s=460&v=4"
              class="img-center img-fluid rounded shadow"
            />
          </div>
          <div class="col-lg-5 ml-lg-auto">
            <div>
              <h5 class="h3">{{ $t("about.header3") }}</h5>
              <p class="lead text-muted my-4">
                {{ $t("about.description3") }}
              </p>
              <a
                href="https://dmitrydao.github.io"
                target="_blank"
                class="link link-underline-info"
                >{{ $t("common.findOutMore") }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import AppHeaderSection from "@/components/AppHeaderSection";
export default {
  name: "About",
  components: {
    AppHeaderSection
  }
};
</script>
