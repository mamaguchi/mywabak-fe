<template>
  <div>
    <wbk-case-form
      mode="2"
      :health-org="healthOrg"
      :casename-to-edit="casename"
    />
  </div>
</template>

<script>
import WbkCaseForm from '@/components/forms/WbkCaseForm'

export default {

  components: {
    WbkCaseForm
  },

  data () {
    return {
      healthOrg: '',
      casename: ''
    }
  },

  created () {
    this.healthOrg = this.$route.query.healthOrg
    this.casename = this.$route.query.casename
  }

}
</script>
