<template>
  <div>
     <AppHeaderSection
      :title="`${$t('dashboard.title')}`"
      :subtitle="`${$t('dashboard.subtitle')}`"
    />
    <!-- Pages -->
    <div class="alert-light text-center p-2 proptabs">
      <div class="container">
        <div class="row">
          <div class="col-md-8">
            <b-tabs>
              <template v-slot:tabs-end>
                <b-nav-item
                  ><router-link to="/proposals" class="text-dark">{{
                    $t("common.proposalsLabel2")
                  }}</router-link></b-nav-item
                >
                <b-nav-item
                  ><router-link to="/proposals/workers" class="text-dark">{{
                    $t("common.workersLabel")
                  }}</router-link></b-nav-item
                >
                <b-nav-item
                  ><router-link
                    to="/proposals/createproposal"
                    class="text-dark"
                    >{{ $t("common.createProposalLabel") }}</router-link
                  ></b-nav-item
                >
              </template>
            </b-tabs>
          </div>
          <div class="col-md-4 text-muted d-none d-sm-block">
            <div class="alert my-0" style="cursor:pointer" v-b-modal.modal-dev>
              {{ $t("dashboard.newsText")
              }}<span class="badge badge-warning ml-2">{{
                $t("dashboard.newsBadge")
              }}</span>
            </div>
            <b-modal
              id="modal-dev"
              :title="`${$t('dashboard.devsupport')}`"
              centered
              hide-footer
            >
            <WitnessVoteModal :user="user" :voteStatus="voteStatus" />
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import WitnessVoteModal from "@/components/WitnessVoteModal";
import AppHeaderSection from "@/components/AppHeaderSection";

export default {
  name: "DashboardSection",
  components: {
    WitnessVoteModal,
    AppHeaderSection
  },
  data() {
    return {
      voteStatus: true,
      user: ""
    };
  }
};
</script>
