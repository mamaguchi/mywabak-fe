<template>
  <div>
    <!-- color="cyan darken-3" -->
    <!-- color="blue-grey lighten-5" -->
    <v-toolbar
      color="teal accent-4"
      class="elevation-2"
    >
      <v-toolbar-title>
        <!-- TITLE -->
        <span
          class="ml-2 white--text text-h5 font-weight-regular"
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
      style="height: 1000px;"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="tabitem in tabItems"
          :key="tabitem"
        >
          <v-card
            flat
          >
            <v-list two-line>
              <v-virtual-scroll
                :items="officersDisp"
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
                    class="mt-3"
                  >
                    <v-divider
                      :inset="item.inset"
                    />
                  </v-subheader>

                  <!-- LIST OF OFFICERS -->
                  <v-list-item
                    v-else
                  >
                    <v-list-item-avatar>
                      <v-avatar
                        color="teal lighten-5"
                        size="40"
                        class="teal--text text--accent-4"
                      >
                        {{ item.initials }}
                      </v-avatar>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="ml-4">
                        {{ item.name }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <!-- :input-value="active"  -->
                    <v-list-item-action>
                      <v-checkbox
                        v-model="item.tick"
                        color="teal accent-4"
                        @change="addRemoveOfficer(item)"
                      />
                    </v-list-item-action>
                  </v-list-item>
                </template>
              </v-virtual-scroll>
            </v-list>
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
      tabItems: ['overview', 'cases', 'others'],

      // Wbkcase Form
      selectedCase: undefined,
      cases: [],
      officersPerCase: {
        0: [],
        1: [],
        2: []
      },
      officers: [],
      staffsDisp: {},
      officersDisp: [
        { header: 'Unit Tibi' },
        { initials: 'A', name: 'personA', ident: '1', tick: false },
        { divider: true, inset: true, idx: 0 },
        { initials: 'B', name: 'personB', ident: '2', tick: false },
        { divider: true, inset: true, idx: 1 },
        { initials: 'C', name: 'personC', ident: '3', tick: false }
      ],
      casenameErrMsg: '',
      editedCase: {
        casename: '',
        description: '',
        district: '',
        state: '',
        begindt: '',
        enddt: ''
      },
      defaultCase: {
        casename: '',
        description: '',
        district: '',
        state: '',
        begindt: '',
        enddt: ''
      },
      begindtMenu: false,
      enddtMenu: false,
      editedIdx: undefined, // KIV to use/remove it.

      // v-select Selections
      states: [
        'Perlis',
        'Kedah',
        'Pulau Pinang',
        'Perak',
        'Selangor',
        'Kuala Lumpur',
        'Negeri Sembilan',
        'Melaka',
        'Johor',
        'Kelantan',
        'Terengganu',
        'Pahang',
        'Sabah',
        'Sarawak',
        'Pulau Labuan'
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
        healthOrg: this.healthOrg
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
      if (response.data.getStatus && response.data.getStatus==='NOROWS') {
        //
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
    addRemoveOfficer (officer) {
      if (officer.tick) {
        this.officersPerCase[this.tab].push({
          name: officer.name,
          ident: officer.ident,
          menu: false
        })
      } else {
        this.removeOfficerFromCase(officer)
      }
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
