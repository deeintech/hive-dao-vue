<template>
  <div>
    <!-- Benefits -->
    <div id="features-features-3">
      <section class="slice">
        <div class="container">
          <div class="row row-grid justify-content-around align-items-center">
            <div class="col-lg-5">
              <div class>
                <h5 class="h3">A modern way of funding your projects</h5>
                <p class="lead my-4">
                  With Steem Proposals System you get financial, as well as professional support from
                  the biggest blockchain community.
                </p>
                <ul class="list-unstyled">
                  <li class="py-2">
                    <div class="d-flex align-items-center">
                      <div>
                        <div class="icon icon-shape icon-danger icon-sm rounded-circle mr-3">
                          <i class="fab fa-angellist"></i>
                        </div>
                      </div>
                      <div>
                        <span class="h6 mb-0">Perfect for modern startups</span>
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
                        <span class="h6 mb-0">Built with security in mind</span>
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
                        <span class="h6 mb-0">Quality feedback from likeminded entrepreneurs</span>
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
                class="img-fluid img-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- The process -->
    <div id="features-features-23">
      <section class>
        <div class="container">
          <h3 class="d-inline-block mt-0 mb-5 border-bottom border-warning border-md">The process</h3>
          <div class="row">
            <div class="col-lg-3">
              <div
                class="card bg-gradient-primary border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg"
              >
                <div class="card-body">
                  <h5 class="h4 text-white">Research</h5>
                  <p
                    class="mt-4 mb-0 text-white"
                  >Make a research on how you can help Steem blockchain to grow. You can start with your current skillset.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="card bg-dark border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg"
              >
                <div class="card-body">
                  <h5 class="h4 text-white">Explain</h5>
                  <p
                    class="mt-4 mb-0 text-white"
                  >Compose a detailed post about your proposal with milestones, deadlines and your team background.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="card bg-gradient-primary border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg"
              >
                <div class="card-body">
                  <h5 class="h4 text-white">Receive votes</h5>
                  <p
                    class="mt-4 mb-0 text-white"
                  >Submit your proposal to the Steem blockchain. Engage with community to get enough votes and funding.</p>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="card bg-dark border-0 text-center py-4 hover-translate-y-n10 hover-shadow-lg"
              >
                <div class="card-body">
                  <h5 class="h4 text-white">Build</h5>
                  <p
                    class="mt-4 mb-0 text-white"
                  >Create what you envisioned. Share the results with Steem community. Improve and experiment.</p>
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
            <h1>It's time to change your life</h1>
            <div class="fluid-paragraph mt-4">
              <p class="lead text-muted lh-180">
                Steem has helped dozens of entrepreneurs to create unique business models and attract thousands of active users to Steem-based
                applications.
              </p>
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
          <h3 class="text-white mt-4">Recent proposals</h3>
          <div class="fluid-paragraph mt-3">
            <p
              class="lead lh-180 text-white"
            >Check the most recent proposals to get inspired to create your own</p>
          </div>
        </div>
        <div class="container">
          <div class="table-responsive-lg">
            <table class="table table-padded align-items-center">
              <tbody>
                <tr v-for="proposal in proposals" :key="proposal.id" class="mb-3">
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
                    <span class="h6">{{proposal.daily_pay.amount | numeric}} TBD</span>
                  </td>
                  <td>
                    <span
                      class="h6"
                    >{{proposal.start_date | moment("MMM D, YYYY")}}-{{proposal.end_date | moment("MMM D, YYYY")}}</span>
                  </td>
                  <td>
                    <span class="h6">{{proposal.total_votes | numeric2}} votes</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="text-center mt-5">
          <router-link to="/proposals" class="text-white">
            <i class="fas fa-angle-right mr-2"></i>View all proposals
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
            <span class="d-block mt-2 h6">Total Proposals</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center mb-5 mb-lg-0">
            <div class="icon icon-lg text-warning">
              <i class="fas fa-thumbs-up"></i>
            </div>
            <span class="d-block mt-4 h3 text-warning">{{completedProposals}}</span>
            <span class="d-block mt-2 h6">Completed Proposals</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center">
            <div class="icon icon-lg text-primary">
              <i class="fas fa-hand-holding-usd"></i>
            </div>
            <span class="d-block mt-4 h3 text-primary">{{totalBudget | numeric}} TBD</span>
            <span class="d-block mt-2 h6">Total Budget</span>
          </div>
        </div>
        <div class="col-lg-3 col-6 mb-5 mb-lg-0">
          <div class="text-center">
            <div class="icon icon-lg text-danger">
              <i class="fas fa-user-friends"></i>
            </div>
            <span class="d-block mt-4 h2 text-danger">{{dailyBudget | numeric}} TBD</span>
            <span class="d-block mt-2 h6">Daily Budget</span>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <div class="container">
      <div class="mb-5">
          <h3 class=" mt-4 mb-5 text-center">FAQ</h3>
          <div class="accordion accordion-spaced col-xl-8 offset-md-2">
             <div class="card">
                <div v-b-toggle.collapse-0 class="card-header py-4">
                  <h6 class="mb-0">What is a Steem Blockchain?</h6>
                </div>
                <b-collapse id="collapse-0">
                  <div class="card-body">
                    <p>
                      Steem is a social blockchain that grows communities and makes immediate revenue streams possible for users by rewarding
                      them for sharing content. It’s currently the only blockchain that can power real applications via social apps like Steemit.
                    </p>
                  </div>
                </b-collapse>
              </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-1>
                <h6 class="mb-0">What is a Steem Worker Proposal System?</h6>
              </div>
              <b-collapse id="collapse-1">
                <div class="card-body">
                  <p>
                    A worker proposal system allows Steem users to publicly propose work that they are willing to do in exchange
                    for pay. Steem users can then vote on these proposals in almost the same way they vote for witnesses
                    (stake weighted votes, but voters can vote for as many proposals as they want). The proposals that get a sufficient
                    amount of vote weight get funded from a special Steem account controlled by the blockchain.
                  </p>
                </div>
              </b-collapse>
            </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-2>
                <h6 class="mb-0">Where does the funding come from?</h6>
              </div>
              <b-collapse id="collapse-2">
                <div class="card-body">
                  <p>
                    The funding is generated directly from Steem blockchain creating a true decentralized autonomous organization.
                  </p>
                </div>
              </b-collapse>
            </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-3>
                <h6 class="mb-0">Is it free to submit a proposal?</h6>
              </div>
              <b-collapse id="collapse-3">
                <div class="card-body">
                  <p>
                    There's a 10 SBD fee that is charged before you submit a proposal. This prevents spamming and creation of projects with no value.
                  </p>
                </div>
              </b-collapse>
            </div>
            <div class="card">
              <div class="card-header py-4" v-b-toggle.collapse-4>
                <h6 class="mb-0">What is steemproposals.com?</h6>
              </div>
              <b-collapse id="collapse-4">
                <div class="card-body">
                  <p>
                    Steemproposals.com is one of the interfaces that diplays proposal system for a Steem blockchain.
                  </p>
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
          <h1>It's time to create your proposal</h1>
          <div class="fluid-paragraph mt-4">
            <p
              class="lead text-muted lh-180"
            >You never know how great your idea is until you make it happen. You can always go back to your job, you can't always make somethign worthwhile for the people around you. Don't wait.</p>
            <router-link
              to="/createproposal"
              class="btn btn-dark btn-icon rounded-pill hover-scale-110 mt-5"
            >
              <span class="btn-inner--text">Create proposal</span>
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
export default {
  name: 'Header',
  computed: {
    proposals () {
      return this.$store.getters.proposalsByStatus('active').slice(0, 5)
    },
    totalProposals () {
      return this.$store.getters.totalProposals
    },
    completedProposals () {
      return this.$store.getters.totalProposalsByStatus('expired')
    },
    activeProposals () {
      return this.$store.getters.totalProposalsByStatus('active')
    },
    totalBudget () {
      return this.$store.getters.totalBudget
    },
    dailyBudget () {
      return this.$store.getters.dailyBudget
    },
    faq () {
      return this.$store.getters.faq.slice(0, 4)
    }
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
