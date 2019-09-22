<template>
  <div>
    <!-- Benefits -->
    <div id="features-features-3">
      <section class="slice">
        <div class="container">
          <div class="row row-grid justify-content-around align-items-center">
            <div class="col-lg-5">
              <div class>
                <h5 class="h3">{{$t('features.title')}}</h5>
                <p class="lead my-4">{{$t('features.subtitle')}}</p>
                <ul class="list-unstyled">
                  <li class="py-2">
                    <div class="d-flex align-items-center">
                      <div>
                        <div class="icon icon-shape icon-danger icon-sm rounded-circle mr-3">
                          <i class="fab fa-angellist"></i>
                        </div>
                      </div>
                      <div>
                        <span class="h6 mb-0">{{$t('features.benefit1')}}</span>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="d-flex align-items-center">
                      <div>
                        <div class="icon icon-shape icon-warning icon-sm rounded-circle mr-3">
                          <i class="fas fa-code"></i>
                        </div>
                      </div>
                      <div>
                        <span class="h6 mb-0">{{$t('features.benefit2')}}</span>
                      </div>
                    </div>
                  </li>
                  <li class="py-2">
                    <div class="d-flex align-items-center">
                      <div>
                        <div class="icon icon-shape icon-success icon-sm rounded-circle mr-3">
                          <i class="fas fa-user-friends"></i>
                        </div>
                      </div>
                      <div>
                        <span class="h6 mb-0">{{$t('features.benefit3')}}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-6">
              <img
                alt="Image placeholder"
                src="../assets/img/random/mockup.png"
                class="img-fluid img-center"/>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- The process -->
    <div id="features-features-23">
      <section class>
        <div class="container">
          <h3 class="d-inline-block mt-0 mb-5 border-bottom border-warning border-md">{{$t('features.process')}}</h3>
          <div class="row">
            <div class="col-lg-3">
              <div class="card bg-gradient-primary border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg">
                <div class="card-body">
                  <h5 class="h4 text-white">{{$t('features.processStep1Title')}}</h5>
                  <p class="mt-4 mb-0 text-white">{{$t('features.processStem1Info')}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card bg-dark border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg">
                <div class="card-body">
                  <h5 class="h4 text-white">{{$t('features.processStep2Title')}}</h5>
                  <p class="mt-4 mb-0 text-white">{{$t('features.processStem2Info')}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card bg-gradient-primary border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg">
                <div class="card-body">
                  <h5 class="h4 text-white">{{$t('features.processStep3Title')}}</h5>
                  <p class="mt-4 mb-0 text-white">{{$t('features.processStem3Info')}}</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card bg-dark border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg">
                <div class="card-body">
                  <h5 class="h4 text-white">{{$t('features.processStep4Title')}}</h5>
                  <p class="mt-4 mb-0 text-white">{{$t('features.processStem4Info')}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Bold text -->
    <div id="call-to-action-call-to-action-2">
      <section class="slice slice-lg">
        <div class="container">
          <div class="text-center">
            <h1>{{$t('features.cta1Title')}}</h1>
            <div class="fluid-paragraph mt-4">
              <p class="lead text-muted lh-180">{{$t('features.cta1Subtitle')}}</p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Recent proposals -->
    <div id="tables-table-1" v-if="totalProposals>0">
      <section class="slice slice-lg bg-gradient-primary">
        <span class="tongue tongue-top">
          <i class="fas fa-angle-up"></i>
        </span>
        <div class="mb-5 text-center">
          <h3 class="text-white mt-4">{{$t('features.recentProposalTitle')}}</h3>
          <div class="fluid-paragraph mt-3">
            <p class="lead lh-180 text-white">{{$t('features.recentProposalSubtitle')}}</p>
          </div>
        </div>
        <div class="container">
          <div class="table-responsive-lg">
            <table class="table table-padded align-items-center">
              <tbody>
                <tr v-for="proposal in proposals('active').slice(0, 5)" :key="proposal.id" class="mb-3">
                  <td scope="row">
                    <div class="media align-items-center">
                      <div>
                        <span class="avatar rounded-circle mr-4">
                          <router-link class="text-muted" :to="'/proposals/' + proposal.creator">
                            <img :src="`https://steemitimages.com/u/${proposal.creator}/avatar`" />
                          </router-link>
                        </span>
                      </div>
                      <div class="media-body">
                        <a
                          class="h5 mb-0"
                          :href="`https://steemit.com/@${proposal.creator}/${proposal.permlink}`"
                          target="_blank"
                        >{{ (proposal.subject.length > 30) ? (proposal.subject.slice(0,30) + '..') : proposal.subject }}</a>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="h6">{{proposal.daily_pay | numeric}} SBD</span>
                  </td>
                  <td>
                    <span class="h6">{{proposal.duration | numeric3}} {{$t('common.days')}}</span>
                  </td>
                  <td>
                    <span class="h6">{{proposal.total_votes | numeric3}} SP</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link to="/proposals" class="text-white">
            <i class="fas fa-angle-right mr-2"></i>{{$t('features.viewAllProposalsLabel')}}
          </router-link>
        </div>
      </section>
    </div>

    <!-- Stats -->
    <section class="slice bg-section-secondary">
      <div class="row align-items-md-center slice">
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center mb-5 mb-lg-0">
            <div class="icon icon-lg text-info">
              <i class="fas fa-bullseye"></i>
            </div>
            <span class="d-block mt-4 h3 text-info">{{totalProposals}}</span>
            <span class="d-block mt-2 h6">{{$t('common.totalProposals')}}</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center mb-5 mb-lg-0">
            <div class="icon icon-lg text-warning">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <span class="d-block mt-4 h3 text-warning">{{totalProposalsByStatus('expired')}}</span>
            <span class="d-block mt-2 h6">{{$t('common.completedProposals')}}</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center">
            <div class="icon icon-lg text-primary">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
            <span class="d-block mt-4 h3 text-primary">{{totalBudget | numeric3}} SBD</span>
            <span class="d-block mt-2 h6">{{$t('common.totalBudget')}}</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center">
            <div class="icon icon-lg text-danger">
              <i class="fas fa-user-friends"></i>
            </div>
            <span class="d-block mt-4 h2 text-danger">{{dailyBudget | numeric3}} SBD</span>
            <span class="d-block mt-2 h6">{{$t('common.dailyBudget')}}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <div class="container">
      <div class="mb-5">
          <h3 class=" mt-4 mb-5 text-center">{{$t('faq.title')}}</h3>
          <div class="accordion accordion-spaced">
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-1>
                <h6 class="mb-0">{{$t('faq.faqQuestion1')}}</h6>
              </div>
              <b-collapse id="collapse-1">
                <div class="card-body">
                  <p>{{$t('faq.faqAnswer1')}}</p>
                </div>
              </b-collapse>
            </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-2>
                <h6 class="mb-0">{{$t('faq.faqQuestion2')}}</h6>
              </div>
              <b-collapse id="collapse-2">
                <div class="card-body">
                  <p>{{$t('faq.faqAnswer2')}}</p>
                </div>
              </b-collapse>
            </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-3>
                <h6 class="mb-0">{{$t('faq.faqQuestion3')}}</h6>
              </div>
              <b-collapse id="collapse-3">
                <div class="card-body">
                  <p>{{$t('faq.faqAnswer3')}}</p>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
    </div>

    <!-- CTA -->
    <section class="slice slice-lg delimiter-top bg-section-secondary">
      <div class="container">
        <div class="text-center">
          <h1>{{$t('features.cta2Title')}}</h1>
          <div class="fluid-paragraph mt-4">
            <p class="lead text-muted lh-180">{{$t('features.cta2Subtitle')}}</p>
            <router-link to="/proposals/createproposal" class="btn btn-dark btn-icon rounded-pill hover-scale-110 mt-5">
              <span class="btn-inner--text">{{$t('common.createProposalLabel')}}</span>
              <span class="btn-inner--icon">
                <i class="fas fa-angle-right"></i>
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'Header',
  computed: {
    ...mapState(['dailyBudget', 'totalBudget', 'globalProperties']),
    ...mapGetters({
      proposals: 'proposalsByStatus',
      totalProposals: 'totalProposals',
      totalProposalsByStatus: 'totalProposalsByStatus'
    }),
  },
  methods: {
    avatarName (value) {
      return value.substring(0, 2)
    }
  }
}
</script>

<style scoped>
</style>
