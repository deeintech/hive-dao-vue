<template>
  <div>
    <AppHeaderSection
      :title="`${$t('faq.title')}`"
      :subtitle="`${$t('faq.subtitle')}`"
    />
    <section class="slice slice-lg bg-section-secondary" id="sct-faq">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="mb-5">
              <h4 class="mb-4">{{ $t("faq.category1") }}</h4>
              <div class="accordion accordion-spaced">
                <div class="card">
                  <div class="card-header py-4" v-b-toggle.collapse-1>
                    <h6 class="mb-0">{{ $t("faq.faqQuestion1") }}</h6>
                  </div>
                  <b-collapse id="collapse-1">
                    <div class="card-body">
                      <p>{{ $t("faq.faqAnswer1") }}</p>
                    </div>
                  </b-collapse>
                </div>
                <div class="card">
                  <div class="card-header py-4" v-b-toggle.collapse-2>
                    <h6 class="mb-0">{{ $t("faq.faqQuestion2") }}</h6>
                  </div>
                  <b-collapse id="collapse-2">
                    <div class="card-body">
                      <p>{{ $t("faq.faqAnswer2") }}</p>
                    </div>
                  </b-collapse>
                </div>
                <div class="card">
                  <div class="card-header py-4" v-b-toggle.collapse-3>
                    <h6 class="mb-0">{{ $t("faq.faqQuestion3") }}</h6>
                  </div>
                  <b-collapse id="collapse-3">
                    <div class="card-body">
                      <p>{{ $t("faq.faqAnswer3") }}</p>
                    </div>
                  </b-collapse>
                </div>
              </div>
            </div>
            <div class="mb-5">
              <h4 class="mb-4">{{ $t("faq.category2") }}</h4>
              <div class="accordion accordion-spaced">
                <div class="card">
                  <div v-b-toggle.collapse-100 class="card-header py-4">
                    <h6 class="mb-0">{{ $t("faq.faqQuestion4") }}</h6>
                  </div>
                  <b-collapse id="collapse-100">
                    <div class="card-body">
                      <p>{{ $t("faq.faqAnswer4") }}</p>
                    </div>
                  </b-collapse>
                </div>
                <div class="card">
                  <div class="card-header py-4" v-b-toggle.collapse-101>
                    <h6 class="mb-0">{{ $t("faq.faqQuestion5") }}</h6>
                  </div>
                  <b-collapse id="collapse-101">
                    <div class="card-body">
                      <p>{{ $t("faq.faqAnswer5") }}</p>
                    </div>
                  </b-collapse>
                </div>
              </div>
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
  name: "FAQ",
  components: {
    AppHeaderSection
  }
};
</script>
