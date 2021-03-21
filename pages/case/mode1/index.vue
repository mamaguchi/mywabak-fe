<template>
  <div>
    <wbk-case-form
      mode="1"
      :health-org="healthOrg"
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
      healthOrg: ''
    }
  },

  created () {
    this.healthOrg = this.$route.query.healthOrg
  }

}
</script>
