<template>
  <div>
    <div class="container mt-5">
      <h3>{{$t('createProposal.submitProposalTitle')}}</h3>
      <div class="card">
        <div class="card-body">
          <b-form @submit.prevent="createProposalKeychain">
            <b-form-group
              id="subject_group"
              :label="`${$t('createProposal.titleInputLabel')}`"
              label-for="subject">
              <b-form-input
                id="subject"
                v-model="form.subject"
                type="text"
                required
                :placeholder="`${$t('createProposal.titleInputPlaceholder')}`">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="dailypay_group"
              :label="`${$t('createProposal.dailypayInputLabel')}`"
              label-for="dailypay"
              :description="`${$t('createProposal.dailypayInputDescription')}`">
              <b-form-input
                id="dailypay"
                v-model="form.dailypay"
                type="number"
                required
               :placeholder="`${$t('createProposal.dailypayInputPlaceholder')}`">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="permlink_group"
              :label="`${$t('createProposal.permlinkInputLabel')}`"
              label-for="permlink"
              :description="`${$t('createProposal.permlinkInputDescription')}`">
              <b-form-input
                id="permlink"
                v-model="form.permlink"
                type="text"
                required
                :placeholder="`${$t('createProposal.permlinkInputPlaceholder')}`">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="creator_group"
              :label="`${$t('createProposal.creatorInputLabel')}`"
              label-for="creator"
              :description="`${$t('createProposal.creatorInputDescription')}`">
              <b-form-input
                id="creator"
                v-model="form.creator"
                type="text"
                required
                :placeholder="`${$t('createProposal.creatorInputPlaceholder')}`">
              </b-form-input>
            </b-form-group>
            <b-form-group
              id="receiver_group"
              :label="`${$t('createProposal.receiverInputLabel')}`"
              label-for="receiver"
              :description="`${$t('createProposal.receiverInputDescription')}`">
              <b-form-input
                id="receiver"
                v-model="form.receiver"
                type="text"
                required
                :placeholder="`${$t('createProposal.receiverInputPlaceholder')}`">
              </b-form-input>
            </b-form-group>
            <label for="start_date">{{$t('createProposal.startdateLabel')}}</label>
            <date-picker class="mb-3" name="start_date" id="start_date" v-model="form.start_date" :config="options" required></date-picker>
            <label for="end_date">{{$t('createProposal.enddateLabel')}}</label>
            <date-picker class="mb-3" name="end_date" v-model="form.end_date" :config="options" required></date-picker>
            <p class="text-danger"><small>{{$t('createProposal.feeLabel')}}</small></p>
            <button type="sumbit" class="btn btn-primary">{{$t('common.submitWithButton')}}<img class="icon-small ml-1" src="../assets/img/random/keychain.png"/></button>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateProposal',
  data () {
      return {
        form: {
          dailypay: 0,
          subject: '',
          permlink: '',
          creator: '',
          receiver: '',
          start_date: '',
          end_date: ''
        },
        options: {
          format: 'YYYY-MM-DDTHH:mm:ss',
          useCurrent: true
        }
      }
  },
  methods: {
    createProposalSteemconnect () {
      event.target.reset()
      this.$router.push('/proposals')
      window.open(`https://beta.steemconnect.com/sign/create-proposal?start_date=${this.form.start_date}&end_date=${this.form.end_date}&daily_pay=${this.form.dailypay}&subject=${this.form.subject}&permlink=${this.form.permlink}&creator=${this.form.creator}&receiver=${this.form.receiver}`)
    },
    createProposalKeychain (event) {
      if (window.steem_keychain) {
        steem_keychain.requestBroadcast(this.form.creator, [["create_proposal",{"creator":this.form.creator,"receiver":this.form.receiver,"start_date":this.form.start_date,"end_date":this.form.end_date,"daily_pay":Number(this.form.dailypay).toFixed(3)+' SBD',"subject":this.form.subject,"permlink":this.form.permlink}]], 'Active', function (response) {
          if (response.success) {
            event.target.reset()
          } else {
            event.target.reset()
          }
        })
      } else {
        return []
      }
    }
  }
}
</script>
