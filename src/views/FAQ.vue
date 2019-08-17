<template>
  <div>
    <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">FAQ</h2>
            <h5 class="mb-4 text-white">The most frequently asked questions about Steem Proposals</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="slice slice-lg bg-section-secondary" id="sct-faq">
      <div class="container">
        <div class="row row-grid">
          <div class="col-lg-3">
            <!-- Side menu -->
            <div data-toggle="sticky" data-sticky-offset="30">
              <div class="card">
                <div class="list-group list-group-flush">
                  <a
                    href="#steem-101"
                    data-scroll-to
                    data-scroll-to-offset="50"
                    class="list-group-item list-group-item-action d-flex justify-content-between"
                  >
                    <div>
                      <span>Steem Blockchain 101</span>
                    </div>
                    <div>
                      <i class="fas fa-angle-right"></i>
                    </div>
                  </a>
                  <a
                    href="#steem-proposals-101"
                    data-scroll-to
                    data-scroll-to-offset="50"
                    class="list-group-item list-group-item-action d-flex justify-content-between"
                  >
                    <div>
                      <span>Steem Proposals 101</span>
                    </div>
                    <div>
                      <i class="fas fa-angle-right"></i>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8 ml-lg-auto">
            <div class="mb-5">
              <h4 class="mb-4" id="steem-proposals-101">Steem Proposals 101</h4>
              <div class="accordion accordion-spaced">
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
                        The funding is generated from an extra inflation that was established during the hardfork 21.
                        Since then 10% of all newly generated tokens are going to SteemDAO account.
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
              </div>
            </div>
            <div class="mb-5">
              <h4 class="mb-4">Steem Blockchain 101</h4>
              <div class="accordion accordion-spaced">
                <div class="card">
                  <div v-b-toggle.collapse-100 class="card-header py-4">
                    <h6 class="mb-0">What is a Steem Blockchain?</h6>
                  </div>
                  <b-collapse id="collapse-100">
                    <div class="card-body">
                      <p>
                        Steem is a social blockchain that grows communities and makes immediate revenue streams possible for users by rewarding
                        them for sharing content. It’s currently the only blockchain that can power real applications via social apps like Steemit.
                      </p>
                    </div>
                  </b-collapse>
                </div>
                <div class="card">
                  <div class="card-header py-4" v-b-toggle.collapse-101>
                    <h6 class="mb-0">What is steemit.com?</h6>
                  </div>
                  <b-collapse id="collapse-101">
                    <div class="card-body">
                      <p>
                        Steemit has redefined social media by building a living, breathing, and growing social economy - a community where users
                        are rewarded for sharing their voice. It's a new kind of attention economy.
                      </p>
                      <p>
                        Steemit.com is one of the many websites (including Busy.org, DTube, and Utopian.io) that are powered by the Steem blockchain
                        and STEEM cryptocurrency.
                      </p>
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
export default {
  name: 'FAQ'
}
</script>
