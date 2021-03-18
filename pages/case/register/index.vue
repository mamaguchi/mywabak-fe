<template>
  <div>
    <!-- 1ST SHEET -->
    <v-sheet
      color="blue-grey lighten-5"
      class="px-4 py-8 mt-n3 mx-n3"
    >
      <v-row dense>
        <!-- TITLE -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          class="mx-auto text-left"
        >
          <span
            class="text-h3 font-weight-regular grey--text text--darken-3"
          >
            Pengurusan Kes COVID  {{ tab }}
          </span>
        </v-col>

        <!-- V-ICON: TO DISPLAY NEW CASE FORM -->
        <v-col
          cols="12"
          md="3"
          sm="5"
          xs="5"
          class="ml-auto mt-16 text-left"
        >
          <div>
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
                      label="Nama kes baru"
                      autofocus
                    />
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
                      label="Daerah"
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
                      label="Negeri"
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
        <!-- <v-col
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
            Pilih Kes
          </span>
        </v-col> -->

        <!-- TITLE: KES -->
        <!-- <v-col
          cols="12"
          md="5"
          sm="6"
          xs="12"
          class="ml-auto mt-8"
        >
          <v-row justify="center">
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
                Kes
              </span>
            </v-btn>
          </v-row>
        </v-col> -->

        <!-- TITLE: PEGAWAI BERTUGAS (xs hidden, sm onwards visible)-->
        <!-- <v-col
          cols="12"
          md="5"
          sm="4"
          xs="10"
          class="d-none d-sm-flex mr-auto mt-8"
        >
          <v-row justify="center">
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
        </v-col> -->

        <!-- V-BTN: KES DISPLAY -->
        <!-- <v-col
          cols="12"
          md="5"
          sm="6"
          xs="12"
          class="ml-auto mt-8 text-left"
        >
          <v-btn-toggle
            v-model="selectedCase"
            color="light-blue darken-3"
            class="d-flex flex-column"
            @change="reloadPegawai"
          >
            <v-btn
              v-for="(c, j) in cases"
              :key="j"
              :value="j"
              small
              class="elevation-1 mb-2 text-left"
            >
              <v-row justify="left">
                <v-icon
                  color="blue-grey darken-2"
                  class="ml-1"
                >
                  mdi-file-document
                </v-icon>
                <span

                  class="mt-1 text-caption font-weight-medium"
                >
                  {{ c.casename }}
                </span>
              </v-row>
            </v-btn>
          </v-btn-toggle>
        </v-col> -->

        <!-- TITLE: PEGAWAI BERTUGAS (xs only visible)-->
        <!-- <v-col
          cols="12"
          md="5"
          sm="4"
          xs="12"
          class="d-flex d-sm-none mr-auto mt-8"
        >
          <v-row justify="center">
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
                Pegawait Bertugas
              </span>
            </v-btn>
          </v-row>
        </v-col> -->

        <!-- V-DIVIDER-VERTICAL (xs hidden, sm onwards visible)-->
        <!-- <v-col
          style="height: 200px"
          cols="12"
          md="1"
          sm="1"
          xs="0"
          class="d-none d-sm-flex mt-8 mb-n2"
        >
          <v-divider vertical />
        </v-col> -->

        <!-- V-CHIP: PEGAWAI (OFFICER) -->
        <!-- <v-col
          cols="12"
          md="4"
          sm="3"
          xs="12"
          class="mr-auto mt-8 text-left"
        >
          <v-chip
            v-for="(officer, i) in officers"
            :key="officer.ident"
            :outlined="editedIdx!==i"
            :color="editedIdx===i? 'teal accent-4' : 'blue-grey darken-2'"
            class="ma-1"
            close
            @click="showOfficerDetail(i, officer)"
            @click:close="removeOfficerVchip(officer)"
          >
            <span
              class="text-caption font-weight-medium"
            >
              {{ officer.name }}
            </span>
          </v-chip>
        </v-col> -->

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
            justify="left"
            class="ml-4"
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
                Pegawait Bertugas
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
            <v-chip
              v-for="(officer, i) in officers"
              :key="officer.ident"
              :outlined="editedIdx!==i"
              :color="editedIdx===i? 'teal accent-4' : 'blue-grey darken-2'"
              class="ma-1"
              close
              @click="showOfficerDetail(i, officer)"
              @click:close="removeOfficerVchip(i)"
            >
              <span
                class="text-caption font-weight-medium"
              >
                {{ officer.name }}
              </span>
            </v-chip>
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
                  {{ tabitem }}
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
                v-if="tabitem === 'IK'"
                flat
                class="mt-2 mx-1"
              >
                <v-list two-line>
                  <v-virtual-scroll
                    :items="officersDisp"
                    :item-height="40"
                    height="300"
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
                            @change="toggleOfficer(item)"
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
            4.
          </span>
          <span
            class="ml-2 text-subtitle-1 font-weight-light"
          >
            Siap dan hantar
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
                Submit
              </span>
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { compareAsc } from 'date-fns'

export default {
  name: 'CloseContactRegForm',

  props: {
    mode: {
      type: String,
      default: '1'
    }
  },

  data () {
    return {
      // Wbkcase Form
      newCaseRegForm: false,
      selectedCase: undefined,
      cases: [],
      // officersPerCase: {},
      officersPerCase: [],
      officers: [],
      officersDisp: [
        { header: 'Unit Tibi' },
        { initials: 'A', name: 'personA', ident: '1', tick: false },
        { divider: true, inset: true, idx: 0 },
        { initials: 'B', name: 'personB', ident: '2', tick: false },
        { divider: true, inset: true, idx: 1 },
        { initials: 'C', name: 'personC', ident: '3', tick: false }
      ],
      editedCase: {
        casename: '',
        district: '',
        state: ''
      },
      defaultCase: {
        casename: '',
        district: '',
        state: ''
      },
      tab: null,
      tabItems: ['IK', 'MA', 'SN'],
      // locality: '',
      // district: 'Maran',
      // state: 'Pahang',
      // casename: 'bandarjengka-2021-02-01-hospjengka',
      assignedToIk: '880601101111',
      // hasBeenVerified: false,
      // verifiedBy: '',

      // Input Form
      newPeopleInHseCard: false,
      address: '',
      // cases: [],
      peopleInHse: {},
      peoples: [],
      editedIdx: undefined,
      editedProfile: {
        hasbeenreviewed: '',
        name: '',
        ident: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        occupation: '',
        comorbid: [],
        contactto: '',
        lastcontact: '',
        symptoms: [],
        onset: '',
        workloc: ''
      },
      defaultProfile: {
        hasbeenreviewed: '',
        name: '',
        ident: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        occupation: '',
        comorbid: [],
        contactto: '',
        lastcontact: '',
        symptoms: [],
        onset: '',
        workloc: ''
      },
      requiredProfErrMsg: {
        dob: '',
        address: '',
        locality: '',
        district: '',
        state: '',
        lastcontact: '',
        onset: ''
      },
      defaultProfErrMsg: {
        dob: '',
        address: '',
        locality: '',
        district: '',
        state: '',
        lastcontact: '',
        onset: ''
      },

      // New Close Contact(People) Form
      dobMenu: false,
      lastcontactMenu: false,
      onsetMenu: false,
      gender: ['Male', 'Female'],
      race: [
        'Malay',
        'Chinese',
        'Indian',
        'Others'
      ],
      nationality: ['Warganegara', 'Bukan Warganegara'],
      eduLvl: ['Primary', 'Secondary', 'Tertiary'],
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
      ],
      comorbids: [
        { name: 'Darah Tinggi', value: 'hpt' },
        { name: 'Kencing Manis', value: 'dm' },
        { name: 'Masalah Jantung', value: 'cvd' },
        { name: 'Asma', value: 'asthma' },
        { name: 'COPD', value: 'copd' },
        { name: 'Penyakit Buah Pinggang', value: 'ckd' },
        { name: 'Kanser', value: 'cancer' }
      ],
      symptoms: [
        { name: 'Deman', value: 'fever' },
        { name: 'Batuk', value: 'cough' },
        { name: 'Selsema', value: 'runnynose' },
        { name: 'Sakit Tekak', value: 'sorethroat' },
        { name: 'Muntah', value: 'vomiting' },
        { name: 'Cirit-birit', value: 'diarhoea' },
        { name: 'Hilang Deria Baru', value: 'anosmia' },
        { name: 'Hilang Deria Rasa', value: 'ageusia' },
        { name: 'Kurang Selera Makan', value: 'loa' }
      ],

      /* FORM FIELD RULES */
      requiredRule: [v => !!v || 'This field is required'],
      comorbidRequiredRule: [v => !(v.length === 0) || 'Comorbid field is required'],
      symptomsRequiredRule: [v => !(v.length === 0) || 'Symptoms field is required'],
      profileNameRules: [
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'Name must contain alphabet characters only'
      ],
      profileIdentRules: [
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_-]/g) > -1) || 'IC/Passport is not allowed to contain space and special characters'
      ],
      profileOccupationRules: [
        v => !(v.search(/[0-9!@#$%^&*)(<>+=,.?_-]/g) > -1) || 'Occupation must contain alphabet characters only'
      ],
      profileTelRules: [
        v => !!v || 'Telephone is required',
        v => !((v.match(/-/g) || []).length > 1) || 'Telephone number can contain only 1 hyphen character',
        v => !(v.search(/[!@#$%^&* )(<>+=,.?_]/g) > -1) || 'Telephone number not allowed to contain space and special characters',
        v => !(v.search(/[a-zA-Z]/g) > -1) || 'Telephone number not allowed to contain alphabet characters'
      ],
      //
      identRules: [
        v => !!v || 'IC is required',
        v => (
          /^[0-9]{6,6}[-]{1,1}[0-9]{2,2}[-]{1,1}[0-9]{4,4}$/.test(v) ||
          /^[0-9]{6,6}[0-9]{2,2}[0-9]{4,4}$/.test(v) ||
          /^[a-zA-Z]{1,2}[0-9]{6,8}[a-zA-Z]{0,1}$/.test(v) ||
          'Invalid IC/Passport'
        )
      ],
      pwdRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Passsword must be at least 8 characters long',
        v => !(/^.*[ ]+.*$/.test(v)) || 'Passsword is not allowed to contain space character'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        v => !(v.search(/[0-9!#$%^&*)(<>+=,.?_-]/g) > -1) || 'Name must contain alphabet characters only'
      ]

    }
  },

  computed: {
    pegawaiBertugasIcon () {
      if (this.tab === 0) {
        return 'mdi-human-male'
      } else if (this.tab === 1) {
        return 'mdi-doctor'
      } else if (this.tab === 2) {
        return 'mdi-mother-heart'
      } else {
        return ''
      }
    },

    dobVal () {
      return this.editedProfile.dob
    },

    lastcontactVal () {
      return this.editedProfile.lastcontact
    },

    onsetVal () {
      return this.editedProfile.onset
    },

    formMode1 () {
      return {
        name: this.editedProfile.name,
        ident: this.editedProfile.ident,
        dob: this.editedProfile.dob,
        gender: this.editedProfile.gender,
        race: this.editedProfile.race,
        nationality: this.editedProfile.nationality,
        occupation: this.editedProfile.occupation,
        tel: this.editedProfile.tel,
        comorbid: this.editedProfile.comorbid
      }
    },

    formMode2 () {
      return {
        contactto: this.editedProfile.contactto,
        lastcontact: this.editedProfile.lastcontact,
        symptoms: this.editedProfile.symptoms,
        onset: this.editedProfile.onset,
        workloc: this.editedProfile.workloc
      }
    },

    toTickNoMasalahKesihatanIcon () {
      if (this.editedProfile.comorbid.includes('nkmi')) {
        // return 'mdi-close-box'
        return true
      } else {
        // return 'mdi-checkbox-blank-outline'
        return false
      }
    },

    toTickNoSymptomsIcon () {
      if (this.editedProfile.symptoms.includes('nosx')) {
        // return 'mdi-close-box'
        return true
      } else {
        // return 'mdi-checkbox-blank-outline'
        return false
      }
    },

    masalahKesihatanLabel () {
      if (this.editedProfile.comorbid.includes('nkmi')) {
        return 'Tiada Masalah Kesihatan'
      } else {
        return 'Masalah Kesihatan'
      }
    },

    symptomsLabel () {
      if (this.editedProfile.symptoms.includes('nosx')) {
        return 'Tiada simtom'
      } else {
        return 'Simtom'
      }
    }

  },

  methods: {
    addCase () {
      const newCase = Object.assign({}, this.editedCase)
      this.cases.push(newCase)
      this.newCaseRegForm = false
      this.editedCase = Object.assign({}, this.defaultCase)
    },

    // ============================

    checkNotAfterToday (date) {
      if (compareAsc(new Date(), new Date(date)) < 0) {
        return false
      } else {
        return true
      }
    },

    refreshDob () {
      this.requiredProfErrMsg.dob = ''
      this.dobMenu = false
    },

    refreshLastcontact () {
      this.requiredProfErrMsg.lastcontact = ''
      this.lastcontactMenu = false
    },

    refreshOnset () {
      this.requiredProfErrMsg.onset = ''
      this.onsetMenu = false
    },

    addAddress () {
      this.cases.push(this.address)
      this.newCaseRegForm = false
      this.address = ''
    },

    toggleNoMasalahKesihatan () {
      if (this.editedProfile.comorbid.includes('nkmi')) {
        this.editedProfile.comorbid = []
      } else {
        this.editedProfile.comorbid.length = 0
        this.editedProfile.comorbid = ['nkmi']
      }
    },

    clearNoMasalahKesihatan () {
      const idx = this.editedProfile.comorbid.indexOf('nkmi')
      if (idx === -1) { return }
      // Remove 'nkmi' from 'this.editedProfile.comorbid
      this.editedProfile.comorbid.splice(idx, 1)
    },

    toggleNoSymptoms () {
      if (this.editedProfile.symptoms.includes('nosx')) {
        this.editedProfile.symptoms = []
      } else {
        this.editedProfile.symptoms.length = 0
        this.editedProfile.symptoms = ['nosx']
        this.editedProfile.onset = ''
      }
    },

    clearNoSymptoms () {
      const idx = this.editedProfile.symptoms.indexOf('nosx')
      if (idx === -1) { return }
      // Remove 'nosx' from 'this.editedProfile.symptoms
      this.editedProfile.symptoms.splice(idx, 1)
    },

    showOfficerDetail (idx, people) {
      if (this.mode === '1') {
        return
      }
      if (this.editedIdx === undefined) {
        // Start Edit Mode
        this.editedIdx = idx
        this.editedProfile = Object.assign({}, people)
        this.newPeopleInHseCard = true
      } else {
        // End Edit Mode
        this.saveEdit()
      }
    },

    saveEdit () {
      if (this.validateCCForm()) {
        this.editedProfile.hasbeenreviewed = true
        this.peopleInHse[this.selectedCase][this.editedIdx] = Object.assign({}, this.editedProfile)
        // reloadPegawai() will reset editedProfile, editedIdx, requiredProfErrMsg.
        // reloadPegawai() then copy the updated this.peopleInHse back to this.peoples.
        this.reloadPegawai()
        // this.newPeopleInHseCard = false
      }
    },

    clearEditedProfileAndIdx () {
      this.editedIdx = undefined
      this.editedProfile = Object.assign({}, this.defaultProfile)
      this.requiredProfErrMsg = Object.assign({}, this.defaultProfErrMsg)

      let form = {}
      if (this.mode === '1') {
        form = this.formMode1
      } else {
        form = { ...this.formMode1, ...this.formMode2 }
      }
      const formKeys = Object.keys(form)
      for (let i = 0; i < formKeys.length; i++) {
        this.$refs[formKeys[i]].reset()
      }
    },

    validateCCForm () {
      let isValid = true

      let form = {}
      if (this.mode === '1') {
        form = this.formMode1
      } else {
        form = { ...this.formMode1, ...this.formMode2 }
      }

      const formKeys = Object.keys(form)
      for (let i = 0; i < formKeys.length; i++) {
        if (formKeys[i] === 'onset' &&
            this.editedProfile.symptoms[0] === 'nosx') {
          continue
        }
        if (!this.$refs[formKeys[i]].validate(true)) {
          isValid = false
          document.querySelector(`#${formKeys[i]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          break
        }
      }
      return isValid
    },

    reloadPegawai () {
      // this.clearEditedProfileAndIdx()
      // this.newPeopleInHseCard = false

      // if (this.selectedCase === undefined) {
      //   this.officers.length = 0
      //   this.officers = []
      //   this.tab = undefined
      //   return
      // }

      if (Array.isArray(this.officersPerCase[this.selectedCase])) {
        this.officers = [...this.officersPerCase[this.selectedCase]]
      } else {
        this.officers = []
      }
      this.tab = 0
    },

    // checkIfIdentConflict (officer) {
    //   for (let i = 0; i < this.officersPerCase[this.selectedCase].length; i++) {
    //     const o = this.officersPerCase[this.selectedCase][i]
    //     if (o.ident === officer.ident) {
    //       return {
    //         res: false,
    //         case: this.cases[i],
    //         name: o.name
    //       }
    //     }
    //   }
    //   return { res: true }
    // },

    removeOfficerVchip (idx) {
      this.officers.splice(idx, 1)
    },

    removeOfficerFromCase (officer) {
      for (let i = 0; i < this.officers.length; i++) {
        if (this.officers[i].ident === officer.ident) {
          this.officers.splice(i, 1)
          return
        }
      }
    },

    toggleOfficer (officer) {
      if (officer.tick) {
        // if (Array.isArray(this.officersPerCase[this.selectedCase])) {
        //   this.officersPerCase[this.selectedCase].push(
        //     { name: officer.name, ident: officer.ident }
        //   )
        // } else {
        //   this.officersPerCase[this.selectedCase] = [
        //     { name: officer.name, ident: officer.ident }
        //   ]
        // }
        // this.reloadPegawai()

        this.officers.push(
          { name: officer.name, ident: officer.ident }
        )
      } else {
        this.removeOfficerFromCase(officer)
      }
    },

    addPeople () {
      if (this.validateCCForm()) {
        if (this.mode !== '1') {
          this.editedProfile.hasbeenreviewed = true
        }

        const identConflictCheck = this.checkIfIdentConflict(this.editedProfile.ident)
        if (!identConflictCheck.res) {
          alert('ID ini sudah diberi kepada ' +
              identConflictCheck.name + ' dari ' +
              identConflictCheck.add + ' tadi. Anda tidak boleh tambah ID yang sama lebih daripada sekali.')
          return
        }

        const newPeople = Object.assign({}, this.editedProfile)

        if (Array.isArray(this.peopleInHse[this.selectedCase])) {
          this.peopleInHse[this.selectedCase].push(newPeople)
        } else {
          this.peopleInHse[this.selectedCase] = [newPeople]
        }
        this.editedProfile = Object.assign({}, this.defaultProfile)
        this.$refs.dob.reset() // manually clearing dob field validation error
        this.newPeopleInHseCard = false
        this.reloadPegawai()
      }
    },

    hseAddressNotEmpty () {
      return this.cases.length > 0
    },

    peopleInHseNotEmpty () {
      const keys = Object.keys(this.peopleInHse)
      if (keys.length === 0) { return false }

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i]
        if (Array.isArray(this.peopleInHse[key])) {
          if (this.peopleInHse[key].length > 0) {
            return true
          }
        }
      }
      return false
    },

    prepareCCDataForPayload () {
      const ccRegs = []

      for (let i = 0; i < this.cases.length; i++) {
        if (Array.isArray(this.peopleInHse[i])) {
          if (this.peopleInHse[i].length > 0) {
            const ccReg = {
              address: this.cases[i],
              locality: this.locality,
              district: this.district,
              state: this.state,
              closeContacts: [...this.peopleInHse[i]]
            }
            ccRegs.push(ccReg)
          }
        }
      }
      return ccRegs
    },

    checkAllNewCCHasBeenReviewed () {
      for (let i = 0; i < this.cases.length; i++) {
        if (Array.isArray(this.peopleInHse[i])) {
          if (this.peopleInHse[i].length > 0) {
            for (let j = 0; j < this.peopleInHse[i].length; j++) {
              // eslint-disble-next-line
              if (this.peopleInHse[i][j].hasbeenreviewed === false) {
                return {
                  res: false,
                  address: this.cases[i],
                  name: this.peopleInHse[i][j].name
                }
              }
            }
          }
        }
      }
      return { res: true }
    },

    async submitRegistration () {
      if (this.editedIdx !== undefined) {
        alert('Sila habiskan edit penghuni rumah dulu')
        return
      }
      if (!this.hseAddressNotEmpty()) {
        alert('Sila tambah tempat tinggal')
        return
      }
      if (!this.peopleInHseNotEmpty()) {
        alert('Sila tambah penghuni rumah')
        return
      }
      const reviewCheck = this.checkAllNewCCHasBeenReviewed()
      if (!reviewCheck.res) {
        alert(reviewCheck.name + ' dari ' +
            reviewCheck.address + ' masih belum diperiksa')
        return
      }

      const payload = {
        wbkcase: {
          mode: this.mode,
          casename: this.casename,
          assignedToIk: this.assignedToIk,
          hasBeenVerified: this.mode !== '1',
          verifiedBy: this.mode === '1' ? '' : this.assignedToIk
        }
      }
      payload.closeContactRegs = this.prepareCCDataForPayload()
      // eslint-disable-next-line
      // console.log(payload)

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/wbkcase/people/reg',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/wbkcase/people/reg',
            payload
          )
        }
        if (response.data.ccRegStatus === '1') {
          alert('Pendaftaran berjaya')
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
