<template>
  <div>
    <!-- TOOLBAR -->
    <v-toolbar
      color="teal accent-4"
      class="elevation-2"
    >
      <!-- GO BACK ONE PAGE -->
      <v-icon
        left
        style="cursor: pointer"
        color="white"
        @click="goBackOnePage"
      >
        mdi-arrow-left
      </v-icon>

      <!-- TITLE -->
      <v-toolbar-title>
        <span
          class="white--text text-h5 font-weight-medium"
        >
          Pengurusan Kes COVID
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
        <!-- ADD MODE TABS -->
        <v-tabs
          v-if="mode==='1'"
          v-model="tbTab"
          grow
          color="white"
          class="ml-1"
        >
          <v-tabs-slider color="white" />

          <v-tab
            v-for="tbTabitem in tbTabItemsAddMode"
            :key="tbTabitem"
          >
            {{ tbTabitem.toUpperCase() }}
          </v-tab>
        </v-tabs>

        <!-- EDIT MODE TABS -->
        <v-tabs
          v-else
          v-model="tbTab"
          grow
          color="white"
          class="ml-1"
        >
          <v-tabs-slider color="white" />

          <v-tab
            v-for="tbTabitem in tbTabItemsEditMode"
            :key="tbTabitem"
          >
            {{ tbTabitem.toUpperCase() }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <!-- 1ST SHEET -->
    <v-sheet
      id="form"
      color="blue-grey lighten-5"
      class="px-4 py-8 mt-n3 mx-n3"
    >
      <v-row dense>
        <!-- TITLE -->
        <!-- <v-col
          cols="12"
          md="10"
          sm="10"
          class="mx-auto text-left"
        >
          <span
            class="text-h3 font-weight-regular grey--text text--darken-3"
          >
            Pengurusan Kes COVID  {{ mode }}
          </span>
        </v-col> -->

        <!-- V-ICON: TO DISPLAY NEW CASE FORM -->
        <v-col
          cols="12"
          md="3"
          sm="5"
          xs="5"
          class="ml-auto mt-16 text-left"
        >
          <!-- MODE 1 -->
          <div v-if="mode==='1'">
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              1.
            </span>
            <v-icon
              small
              left

              class="ml-2 mt-n1"
            >
              mdi-plus
            </v-icon>
            <span
              class="ml-n3 mb-n2 text-subtitle-1 font-weight-light"
            >
              Tambah Kes Baru
            </span>
            <v-icon
              right
              color="blue-grey darken-2"
              class="mt-n1"
            >
              mdi-file-plus
            </v-icon>
          </div>

          <!-- MODE 2 -->
          <div v-else-if="mode!=='1'">
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              1.
            </span>
            <span
              class="ml-2 mb-n2 text-subtitle-1 font-weight-light"
            >
              Edit Kes
            </span>
            <v-icon
              right
              color="blue-grey darken-2"
              class="mt-n1"
            >
              mdi-file-edit
            </v-icon>
          </div>
        </v-col>

        <!-- DUMMY COLUMN -->
        <v-col
          cols="5"
          md="7"
          sm="5"
          xs="5"
          class="mr-auto"
        >
          <div v-show="false" />
        </v-col>

        <!-- V-CARD: TO ADD NEW CASE FORM -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          class="mx-auto mt-2 text-left"
        >
          <v-card
            text
            class="my-2 mx-1"
            max-width="600px"
          >
            <v-card-text>
              <v-form @submit.prevent="submit">
                <v-row>
                  <!-- CASENAME -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="casename"
                      v-model="editedCase.casename"
                      label="*Nama kes"
                      color="teal accent-4"
                      autofocus
                      :error-messages="casenameErrMsg"
                      @change="casenameErrMsg=''"
                    />
                  </v-col>

                  <!-- CASEDESC -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="description"
                      v-model="editedCase.description"
                      label="Deskripsi kes"
                      color="teal accent-4"
                    />
                  </v-col>

                  <!-- BEGINDT -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-menu
                      v-model="begindtMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on }">
                        <v-text-field
                          id="begindt"
                          ref="begindt"
                          :value="begindtVal"
                          label="*Tarikh Mula Kes"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedCase.begindt"
                        locale="en-in"
                        no-title
                        scrollable
                        @input="begindtMenu=false"
                      />
                    </v-menu>
                  </v-col>

                  <!-- ENDDT -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-menu
                      v-model="enddtMenu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      max-width="290px"
                      min-width="290px"
                    >
                      <template #activator="{ on }">
                        <v-text-field
                          id="enddt"
                          ref="enddt"
                          :value="enddtVal"
                          label="Tarikh Akhir Kes"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedCase.enddt"
                        locale="en-in"
                        no-title
                        scrollable
                        @input="enddtMenu=false"
                      />
                    </v-menu>
                  </v-col>

                  <!-- LOCALITY -->
                  <!-- <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="profileLocality"
                      v-model="editedCase.locality"
                      label="Locality/Taman"
                      color="teal accent-4"
                      :error-messages="requiredProfErrMsg.locality"
                      @change="requiredProfErrMsg.locality=''"
                    />
                  </v-col> -->

                  <!-- DISTRICT -->
                  <v-col
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="district"
                      v-model="editedCase.district"
                      label="*Daerah"
                      color="teal accent-4"
                    />
                  </v-col>

                  <!-- STATE -->
                  <v-col
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="state"
                      v-model="editedCase.state"
                      :items="states"
                      label="*Negeri"
                      color="teal accent-4"
                    />
                  </v-col>

                  <!-- V-BTN: ADD ADDRESS -->
                  <!-- <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-btn
                      :disabled="!editedCase.casename ||
                        !editedCase.district ||
                        !editedCase.state"
                      @click="addCase"
                      @keydown.enter="addCase"
                    >
                      Tambah
                    </v-btn>
                  </v-col> -->
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- 2ND SHEET -->
    <v-sheet
      color="white"
      class="px-4 pb-6 mx-n3"
    >
      <v-row dense>
        <!-- TITLE: LANGKAH KE-2 -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          xs="12"
          class="mx-auto mt-10 text-left"
        >
          <span
            class="text-subtitle-2 font-weight-medium"
          >
            2.
          </span>
          <span
            class="ml-2 text-subtitle-1 font-weight-light"
          >
            Pilih Pegawai Bertugas
          </span>
          <v-icon
            right
            color="blue-grey darken-2"
          >
            {{ pegawaiBertugasIcon }}
          </v-icon>
        </v-col>

        <!-- TITLE: PEGAWAI BERTUGAS -->
        <v-col
          cols="12"
          md="10"
          sm="12"
          xs="12"
          class="mx-auto mt-8"
        >
          <v-row
            justify="start"
            class="ml-5"
          >
            <v-btn
              small
              disabled
              style="cursor:default"
              text
              class="rounded-pill teal lighten-5"
            >
              <span
                class="teal--text text--accent-4"
              >
                Pegawai Bertugas
              </span>
            </v-btn>
          </v-row>
        </v-col>

        <!-- V-CHIP: PEGAWAI (OFFICER) -->
        <v-col
          style="height:100px"
          cols="12"
          md="10"
          sm="10"
          xs="10"
          class="mx-auto mt-8 text-left"
        >
          <div class="ml-4">
            <v-menu
              v-for="(officer, i) in officersPerCase[tab]"
              :key="officer.ident"
              v-model="officer.menu"
              :close-on-content-click="false"
              :nudge-width="200"
              offset-x
            >
              <template #activator="{ on, attrs }">
                <v-chip
                  :outlined="editedIdx!==i"
                  :color="editedIdx===i? 'teal accent-4' : 'blue-grey darken-2'"
                  class="ma-1"
                  close
                  v-bind="attrs"
                  @click:close="removeOfficerVchip(i)"
                  v-on="on"
                >
                  <span
                    class="text-caption font-weight-medium"
                  >
                    {{ officer.name }}
                  </span>
                </v-chip>
              </template>

              <v-card>
                <v-list>
                  <!-- URL -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon large>
                        mdi-file-link
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>URL</v-list-item-title>
                      <v-list-item-subtitle>Borang Daftar Kontak Rapat</v-list-item-subtitle>
                      <span>some url here...</span>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          color="teal accent-4"
                        >
                          mdi-clipboard-file
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>

                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          color="teal accent-4"
                        >
                          mdi-share
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>

                  <!-- DIVIDER -->
                  <v-subheader>
                    <v-divider
                      inset
                    />
                  </v-subheader>

                  <!-- QR CODE -->
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon large>
                        mdi-file
                      </v-icon>
                      <v-icon
                        small
                        color="white"
                        class="ml-n7 mb-n2 mr-3"
                      >
                        mdi-qrcode
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>QR Code</v-list-item-title>
                      <v-list-item-subtitle>Borang Daftar Kontak Rapat</v-list-item-subtitle>
                      <span>some url here...</span>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          color="teal accent-4"
                        >
                          mdi-clipboard-file
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>

                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon
                          color="teal accent-4"
                        >
                          mdi-share
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-menu>
          </div>
        </v-col>
      </v-row>
    </v-sheet>

    <!-- 3RD SHEET -->
    <v-sheet
      color="blue-grey lighten-5"
      class="px-4 pt-n2 pb-8 mx-n3"
    >
      <v-row dense>
        <!-- APP BAR: ASSIGN CASE TO OFFICER -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          xs="12"
          class="mx-auto text-left"
        >
          <v-app-bar
            flat
            height="10"
            color="blue-grey lighten-5"
            class="ml-n4"
          >
            <!-- <v-toolbar-title> -->
            <!-- TITLE -->
            <!-- <span
                class="text-subtitle-2 font-weight-medium"
              >
                3.
              </span>
              <span
                class="ml-2 text-subtitle-1 font-weight-light"
              >
                Pilih Pegawai Bertugas
              </span> -->
            <!-- </v-toolbar-title> -->

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
                color="teal accent-4"
                class="ml-1"
              >
                <v-tabs-slider color="teal accent-4" />

                <v-tab
                  v-for="tabitem in tabItems"
                  :key="tabitem"
                >
                  {{ tabitem.toUpperCase() }}
                </v-tab>
              </v-tabs>
            </template>
          </v-app-bar>

          <!-- TAB-ITEM -->
          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="tabitem in tabItems"
              :key="tabitem"
            >
              <v-card
                flat
                class="mt-2 mx-1"
              >
                <v-list two-line>
                  <v-virtual-scroll
                    :items="staffsDisp[tabitem]"
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
        </v-col>
      </v-row>
    </v-sheet>

    <!-- 4TH SHEET -->
    <v-sheet
      color="white"
      class="px-4 pb-16 mx-n3"
    >
      <v-row dense>
        <!-- TITLE: LANGKAH KE-4 -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          xs="12"
          class="mx-auto mt-10 text-left"
        >
          <span
            class="text-subtitle-2 font-weight-medium"
          >
            3.
          </span>
          <span
            class="ml-2 text-subtitle-1 font-weight-light"
          >
            Siap
          </span>
        </v-col>

        <!-- V-BTN: SUBMIT REGISTRATION -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          xs="12"
          class="mx-auto mt-10"
        >
          <v-row justify="center">
            <v-btn
              color="blue-grey lighten-2"
              @click="submitRegistration"
            >
              <span
                class="blue-grey--text text--lighten-5 font-weight-bold"
              >
                Save
              </span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {
  name: 'WbkCaseForm',

  props: {
    mode: {
      type: String,
      default: '1'
    },
    healthOrg: {
      type: String,
      required: true
    },
    casenameToEdit: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      // healthOrg: 'PKD Maran',
      tbTabItemsAddMode: ['kes baru'],
      tbTabItemsEditMode: ['rumusan', 'edit'],
      tbTab: null,
      tab: null,
      tabItems: ['ik', 'ma', 'sn'],

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
    begindtVal () {
      return this.editedCase.begindt
    },

    enddtVal () {
      return this.editedCase.enddt
    },

    pegawaiBertugasIcon () {
      if (this.tab === 0) {
        return 'mdi-account-tie'
      } else if (this.tab === 1) {
        return 'mdi-doctor'
      } else if (this.tab === 2) {
        return 'mdi-mother-heart'
      } else {
        return ''
      }
    }

  },

  async created () {
    try {
      let response

      if (this.mode === '1') {
        const payload = {
          healthOrg: this.healthOrg
        }

        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/staff/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/staff/get',
            payload
          )
        }
        if (!response.data.staffs || Object.keys(response.data.staffs).length === 0) {
          alert('Tiada senarai pegawai untuk jabatan ini')
          return
        }
      } else {
        const payload = {
          healthOrg: this.healthOrg,
          casename: this.casenameToEdit
        }

        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/staff/assigned/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/staff/assigned/get',
            payload
          )
        }
        if (!response.data.staffs || Object.keys(response.data.staffs).length === 0) {
          alert('Tiada senarai pegawai untuk jabatan ini')
          return
        }
        this.editedCase.casename = this.casenameToEdit
        this.editedCase.begindt = response.data.begindt
        this.editedCase.description = response.data.description
        this.editedCase.district = response.data.district
        this.editedCase.state = response.data.state
      }

      const staffsDisp = {}
      const posKeys = Object.keys(response.data.staffs)
      for (let i = 0; i < posKeys.length; i++) {
        const posKey = posKeys[i]
        staffsDisp[posKey] = []
        const staffsByPos = response.data.staffs[posKey]
        const unitKeys = Object.keys(staffsByPos)
        for (let j = 0; j < unitKeys.length; j++) {
          const unitKey = unitKeys[j]
          staffsDisp[posKey].push({ header: unitKey })
          const staffsByUnit = staffsByPos[unitKey]
          for (let k = 0; k < staffsByUnit.length; k++) {
            const staff = staffsByUnit[k]
            staffsDisp[posKey].push({
              initials: staff.name[0].toUpperCase(),
              name: staff.name,
              ident: staff.ident,
              tick: this.mode === '1' ? false : staff.assigned
            })

            if (this.mode !== '1' && staff.assigned) {
              const posNumericKey = this.tabItems.indexOf(posKey)
              this.officersPerCase[posNumericKey].push({
                name: staff.name,
                ident: staff.ident,
                menu: false
              })
            }

            staffsDisp[posKey].push({
              divider: true,
              inset: true,
              idx: k + (staffsByUnit.length * j)
            })
          }
        }
        staffsDisp[posKey].pop()
      }

      this.staffsDisp = Object.assign({}, staffsDisp)
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
    goBackOnePage () {
      // this.$router.push('/home')
      this.$router.go(-1)
    },

    addCase () {
      const newCase = Object.assign({}, this.editedCase)
      this.cases.push(newCase)
      this.editedCase = Object.assign({}, this.defaultCase)
    },

    removeOfficerVchip (idx) {
      const ti = this.tabItems[this.tab]
      const identToRemove = this.officersPerCase[this.tab][idx].ident
      for (let i = 0; i < this.staffsDisp[ti].length; i++) {
        const item = this.staffsDisp[ti][i]
        if (item.ident && item.ident === identToRemove) {
          item.tick = false
          break
        }
      }
      this.officersPerCase[this.tab].splice(idx, 1)
    },

    removeOfficerFromCase (officer) {
      for (let i = 0; i < this.officersPerCase[this.tab].length; i++) {
        if (this.officersPerCase[this.tab][i].ident === officer.ident) {
          this.officersPerCase[this.tab].splice(i, 1)
          return
        }
      }
    },

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
        state: this.editedCase.state,
        district: this.editedCase.district,
        assignedStaffs: this.prepareOfficersPerCasePayload()
      }

      try {
        let response

        if (this.mode === '1') {
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
        } else {
          if (process.env.NODE_ENV === 'production') {
            response = await this.$axios.post(
              'https://mywabak.com/wbkcase/staff/assigned/set',
              payload
            )
          } else {
            response = await this.$axios.post(
              'http://localhost:8080/wbkcase/staff/assigned/set',
              payload
            )
          }

          alert('Kes berjaya dikemaskinikan')
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
