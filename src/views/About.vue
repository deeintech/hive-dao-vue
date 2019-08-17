<template>
  <div class="main-content">
     <section class="slice slice-lg bg-gradient-primary" data-offset-top="#header-main">
      <div class="container pt-5">
        <div class="row">
          <div class="col-lg-8">
            <h2 class="display-4 text-white">About</h2>
            <h5
              class="mb-4 text-white"
            >Some basic info on Steem Proposals</h5>
          </div>
        </div>
      </div>
    </section>
    <section class="section-half-rounded pb-100 bg-section-secondary" data-offset-top="#header-main">
      <div class="section-inner bg-section-secondary"></div>
      <div class="container pt-6 py-lg-8" id="sps">
        <div class="row">
          <div class="col-lg-7">
            <div>
              <h2 class="display-4 mb-4 lh-110">What is Steem Ppoposals?</h2>
              <div class="row">
                <div class="col-lg-10">
                  <p
                    class="lead lh-180"
                  >Steem Proposals is a budgeting system for Steem blockchain. It’s a basic UI that shows the latest proposals that entrepreneurs, companies and individuals publish to receive funding for projects that can help to grow and improve Steem ecosystem.</p>
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
              src="../assets/img/random/img-1-1000x900.jpg"
              class="img-center img-fluid rounded shadow-lg"
            />
          </div>
          <div class="col-lg-5">
            <div class="pt-lg-7">
              <h5 class="h3">Developed for Community</h5>
              <p class="lead text-muted my-4">
                Worker Proposal System (SPS) was developed by a community member
                <a
                  class="text-muted"
                  href="https://steemit.com/@blocktrades"
                  target="_blank"
                >@blocktrades</a> for community members and implemented during HF21.
                This website represents only one of the potenital interfaces of proposals on the Steem blockchain.
              </p>
              <a
                href="https://steemit.com/steem/@steemitblog/hf21-sps-and-eip-explained"
                target="_blank"
                class="link link-underline-info"
              >Find out more</a>
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
              <h5 class="h3">Supported by Community</h5>
              <p class="lead text-muted my-4">
                <a class="text-muted" target="_blank" href="/">Steem Proposals</a> is supported by
                <a
                  class="text-muted"
                  target="_blank"
                  href="https://steemit.com/@dmitrydao"
                >@dmitrydao</a>, a front-end dev, blockchain consultant and a Steem Witness.
                For any questions please reach out to the
                <a
                  class="text-muted"
                  href="https://discord.gg/eXxA5BN"
                  target="_blank"
                >official discord channel</a>.
              </p>
              <a
                href="https://steemit.com/@dmitrydao"
                target="_blank"
                class="link link-underline-info"
              >Find out more</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'About'
}
</script>
