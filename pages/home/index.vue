<template>
  <div>
    <!-- color="cyan darken-3" -->
    <!-- color="blue-grey lighten-5" -->

    <!-- TOOLBAR -->
    <v-toolbar
      color="teal accent-4"
      class="elevation-2"
    >
      <v-toolbar-title>
        <!-- TITLE -->
        <span
          class="ml-2 white--text text-h5 font-weight-medium"
        >
          myWabak
        </span>
      </v-toolbar-title>

      <!-- ICON -->
      <!-- <v-icon
        right
        color="blue-grey darken-2"
      >
        {{ pegawaiBertugasIcon }}
      </v-icon> -->

      <!-- TABS -->
      <template #extension>
        <v-tabs
          v-model="tab"
          grow
          color="white"
          class="ml-1"
        >
          <v-tabs-slider color="white" />

          <v-tab
            v-for="tabitem in tabItems"
            :key="tabitem"
          >
            {{ tabitem.toUpperCase() }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-container
      style="height: 800px;"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="tabitem in tabItems"
          :key="tabitem"
        >
          <v-card
            flat
          >
            <v-card-text style="position: relative">
              <v-list three-line>
                <v-virtual-scroll
                  :items="casesDisp"
                  :item-height="40"
                  height="500"
                >
                  <template #default="{ item }">
                    <!-- SUBHEADER -->
                    <v-subheader
                      v-if="item.header"
                      :key="item.header"
                      v-text="item.header"
                    />

                    <!-- DIVIDER -->
                    <v-subheader
                      v-else-if="item.divider"
                      :key="item.idx"
                      class="mt-5"
                    >
                      <v-divider
                        :inset="item.inset"
                      />
                    </v-subheader>

                    <!-- LIST OF OFFICERS -->
                    <v-list-item
                      v-else
                      three-line
                      @click="viewCase(item.casename)"
                    >
                      <!-- CASE AVATAR -->
                      <v-list-item-avatar>
                        <v-avatar
                          color="teal lighten-5"
                          size="40"
                          class="teal--text text--accent-4"
                        >
                          <span
                            class="font-weight-medium"
                          >
                            {{ item.initials }}
                          </span>
                        </v-avatar>
                      </v-list-item-avatar>

                      <!-- CASE INFO -->
                      <v-list-item-content>
                        <v-list-item-title
                          class="ml-4 font-weight-medium"
                        >
                          {{ item.casename }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="text-caption ml-4 mt-1">
                          {{ item.beginDt }}
                        </v-list-item-subtitle>
                        <v-list-item-subtitle class="text-caption ml-4 mt-1">
                          {{ item.clustername }}
                        </v-list-item-subtitle>
                      </v-list-item-content>

                      <!-- NUMBER OF POS CASE & CC -->
                      <div class="d-flex flex-column ml-2 mt-n3">
                        <div class="mb-1">
                          <span
                            class="mt-n3 red--text text--accent-3 text-caption"
                          >
                            {{ item.resultDt }}
                          </span>

                          <!-- DISABLED -->
                          <v-avatar
                            v-if="item.numPosCase==='0'"
                            color="grey lighten-3"
                            size="22"
                            class="grey--text"
                          >
                            <span
                              class="text-caption font-weight-medium"
                            >
                              {{ item.numPosCase }}
                            </span>
                          </v-avatar>

                          <!-- ENABLED -->
                          <v-avatar
                            v-else
                            color="red lighten-5"
                            size="22"
                            class="red--text text--accent-4"
                          >
                            <span
                              class="text-caption font-weight-medium"
                            >
                              {{ item.numPosCase }}
                            </span>
                          </v-avatar>
                        </div>

                        <div class="text-right">
                          <!-- DISABLED -->
                          <v-avatar
                            v-if="item.numCC==='0'"
                            color="grey lighten-3"
                            size="22"
                            class="grey--text"
                          >
                            <span
                              class="text-caption font-weight-medium"
                            >
                              {{ item.numCC }}
                            </span>
                          </v-avatar>

                          <!-- ENABLED -->
                          <v-avatar
                            v-else
                            color="blue lighten-5"
                            size="22"
                            class="blue--text text--accent-4"
                          >
                            <span
                              class="text-caption font-weight-medium"
                            >
                              {{ item.numCC }}
                            </span>
                          </v-avatar>
                        </div>
                      </div>
                    </v-list-item>
                  </template>
                </v-virtual-scroll>
              </v-list>

              <!-- FAB -->
              <v-fab-transition>
                <v-btn
                  fab
                  color="teal accent-4"
                  fixed
                  right
                  bottom
                  @click="newCase"
                >
                  <v-icon
                    color="teal lighten-5"
                  >
                    mdi-plus
                  </v-icon>
                </v-btn>
              </v-fab-transition>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'WbkCaseForm',

  props: {
    mode: {
      type: String,
      default: '1'
    }
  },

  data () {
    return {
      healthOrg: 'PKD Maran',
      state: 'Pahang',
      district: 'Maran',
      tab: null,
      tabItems: ['keseluruhan', 'kes', 'lain'],

      // Cases List
      selectedCase: undefined,
      casesDisp: [],
      officersDisp: [
        { header: 'Unit Tibi' },
        { initials: 'A', name: 'personA', ident: '1', tick: false },
        { divider: true, inset: true, idx: 0 },
        { initials: 'B', name: 'personB', ident: '2', tick: false },
        { divider: true, inset: true, idx: 1 },
        { initials: 'C', name: 'personC', ident: '3', tick: false }
      ]
    }
  },

  computed: {
    //
  },

  async created () {
    try {
      let response

      const payload = {
        state: this.state,
        district: this.district
      }

      if (process.env.NODE_ENV === 'production') {
        response = await this.$axios.post(
          'https://mywabak.com/wbkcases/district/get',
          payload
        )
      } else {
        response = await this.$axios.post(
          'http://localhost:8080/wbkcases/district/get',
          payload
        )
      }
      if (response.data.getStatus && response.data.getStatus === 'NOROWS') {
        alert('Tiada kes di dalam daerah anda')
        return
      }

      const casesDisp = []
      for (let i = 0; i < response.data.cases.length; i++) {
        const wbkcase = response.data.cases[i]

        casesDisp.push({
          initials: wbkcase.casename[0].toUpperCase(),
          casename: wbkcase.casename,
          beginDt: wbkcase.beginDt,
          numPosCase: wbkcase.numPosCase.toString(),
          resultDt: wbkcase.resultDt,
          numCC: wbkcase.numCC.toString(),
          clustername: wbkcase.clustername
        })

        casesDisp.push({
          divider: true,
          inset: true,
          idx: i
        })
      }
      casesDisp.pop()
      this.casesDisp = [...casesDisp]
    } catch (error) {
      if (error.response) {
        alert('Masalah network, sila cuba sebentar lagi')
      } else if (error.request) {
        //
      } else {
        //
      }
    }
  },

  methods: {
    newCase () {
      this.$router.push({
        path: '/case/mode1',
        query: {
          healthOrg: this.healthOrg
        }
      })
    },

    viewCase (casename) {
      this.$router.push({
        path: '/case/mode2',
        query: {
          healthOrg: this.healthOrg,
          casename
        }
      })
    },

    prepareOfficersPerCasePayload () {
      const assignedStaffsIdent = [
        ...this.officersPerCase[0],
        ...this.officersPerCase[1],
        ...this.officersPerCase[2]
      ].map((staff, i) => staff.ident)
      return assignedStaffsIdent
    },

    async submitRegistration () {
      if (!this.editedCase.casename ||
          !this.editedCase.district ||
          !this.editedCase.state ||
          !this.editedCase.begindt) {
        alert('Sila isikan nama kes, tarikh mula kes, daerah dan negeri.')
        document.querySelector('#form').scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
      }

      const payload = {
        casename: this.editedCase.casename,
        begindt: this.editedCase.begindt,
        enddt: this.editedCase.enddt,
        description: this.editedCase.description,
        states: [this.editedCase.state],
        districts: [this.editedCase.district],
        assignedStaffs: this.prepareOfficersPerCasePayload()
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/wbkcase/add',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/wbkcase/add',
            payload
          )
        }
        if (response.data.addStatus === '1') {
          alert('Pendaftaran kes baru berjaya')
        } else if (response.data.addStatus === 'CASENAMEEXISTS') {
          this.casenameErrMsg = 'Nama ini telah wujud, sila pilih nama yang lain'
          document.querySelector('#casename').scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      } catch (error) {
        if (error.response) {
          alert('Masalah network, sila cuba sebentar lagi')
        } else if (error.request) {
          //
        } else {
          //
        }
      }
    }

  }

}
</script>
