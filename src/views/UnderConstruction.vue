<template>
  <section class="slice slice-lg vh-100 bg-gradient-primary overflow-hidden" data-offset-top="#header-main">
      <div class="container h-100 d-flex align-items-center position-relative zindex-100">
          <div class="col">
              <div class="row justify-content-center">
                  <div class="col-lg-7 text-center">
                      <h6 class="h1 mb-5 font-weight-400 text-white">This page is under construction!</h6>
                      <router-link class="btn btn-white btn-icon rounded-pill hover-translate-y-n3" to="/">
                        <span class="btn-inner--icon">
                              <i class="fas fa-home"></i>
                          </span>
                          <span class="btn-inner--text">Return home?</span>
                      </router-link>
                  </div>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
export default {
  name: 'UnderConstruction'
}
</script>
