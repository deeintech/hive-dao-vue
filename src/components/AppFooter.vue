<template>
  <footer class="footer p-0 footer-dark bg-gradient-primary" id="footer-main">
    <div class="container">
      <div class="py-4">
        <div class="row align-items-md-center">
          <div class="col-sm-12 col-md-4 mb-4 mb-md-0">
            <div class="d-flex align-items-center">
              <p class="text-sm mb-0">© Steem Proposals, 2020</p>
            </div>
          </div>
          <div class="col-sm-12 col-md-5 mb-4 mb-sm-0">
            <ul class="nav justify-content-center">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://discord.gg/eXxA5BN"
                  target="_blank"
                  >{{ $t("common.supportLabel") }}</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://steempeak.com/@dmitrydao"
                  target="_blank"
                  >Steempeak</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="https://dmitrydao.com"
                  target="_blank"
                  >{{ $t("common.contactsLabel") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name: "AppFooter"
};
</script>
<style scoped>
.footer {
  margin-top: 10%;
}
</style>
