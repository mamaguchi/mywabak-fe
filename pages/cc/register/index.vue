<template>
  <div>
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
            Pendaftaran Kontak Rapat
          </span>
        </v-col>

        <!-- V-ICON: TO DISPLAY NEW HSE ADDRESS FORM -->
        <v-col
          cols="12"
          md="3"
          sm="5"
          xs="5"
          class="ml-auto mt-16 text-left"
        >
          <div
            style="cursor: pointer"
            @click="newHseAddressCard = !newHseAddressCard"
          >
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              1.
            </span>
            <v-icon
              small
              left
              color="teal"
              class="ml-2 mt-n1"
            >
              mdi-plus
            </v-icon>
            <span
              class="ml-n3 mb-n2 text-subtitle-1 font-weight-light teal--text text--accent-4"
            >
              Tambah Tempat Tinggal
            </span>
            <v-icon
              right
              color="blue-grey darken-2"
              class="mt-n1"
            >
              mdi-home
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

        <!-- V-CARD: TO ADD NEW HSE ADDRESS FORM -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          class="mx-auto mt-2 text-left"
        >
          <v-card
            v-show="newHseAddressCard"
            text
            class="my-2"
            max-width="600px"
          >
            <v-card-text>
              <v-form @submit.prevent="submit">
                <!-- LOCATION -->
                <v-row>
                  <!-- ADDRESS -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="profileAddress"
                      v-model="editedProfile.address"
                      label="Alamat tempat tinggal"
                      :error-messages="requiredProfErrMsg.address"
                      autofocus
                      @change="requiredProfErrMsg.address=''"
                    />
                  </v-col>

                  <!-- LOCALITY -->
                  <v-col
                    v-if="false"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="profileLocality"
                      v-model="editedProfile.locality"
                      label="Locality/Taman"
                      :error-messages="requiredProfErrMsg.locality"
                      @change="requiredProfErrMsg.locality=''"
                    />
                  </v-col>

                  <!-- DISTRICT -->
                  <v-col
                    v-if="false"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="profileDistrict"
                      v-model="editedProfile.district"
                      label="District"
                      :error-messages="requiredProfErrMsg.district"
                      @change="requiredProfErrMsg.district=''"
                    />
                  </v-col>

                  <!-- STATE -->
                  <v-col
                    v-if="false"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="profileState"
                      v-model="editedProfile.state"
                      :items="state"
                      label="State"
                      :error-messages="requiredProfErrMsg.state"
                      @change="requiredProfErrMsg.state=''"
                    />
                  </v-col>

                  <!-- V-BTN: ADD ADDRESS -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-btn
                      :disabled="!editedProfile.address"
                      @click="addAddress"
                    >
                      Tambah
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>

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
            Pilih Alamat
          </span>
        </v-col>

        <!-- TITLE: ALAMAT -->
        <v-col
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
                Alamat
              </span>
            </v-btn>
          </v-row>
        </v-col>

        <!-- TITLE: ISI RUMAH (xs hidden, sm onwards visible)-->
        <v-col
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
                Isi Rumah
              </span>
            </v-btn>
          </v-row>
        </v-col>

        <!-- V-BTN: HOUSE ADDRESS DISPLAY -->
        <v-col
          cols="12"
          md="5"
          sm="6"
          xs="12"
          class="ml-auto mt-8 text-left"
        >
          <v-btn-toggle
            v-model="selectedHse"
            color="light-blue darken-3"
            class="d-flex flex-column"
            @change="reloadPeople"
          >
            <v-btn
              v-for="(hse, j) in hseAddresses"
              :key="j"
              :value="j"
              small
              class="elevation-1 mb-2 text-left"
            >
              <v-row justify="left">
                <v-icon
                  class="ml-1"
                >
                  mdi-home-outline
                </v-icon>
                <span

                  class="mt-1 text-caption font-weight-medium"
                >
                  {{ hse.address }}
                </span>
              </v-row>
            </v-btn>
          </v-btn-toggle>
        </v-col>

        <!-- TITLE: ISI RUMAH (xs only visible)-->
        <v-col
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
                Isi Rumah
              </span>
            </v-btn>
          </v-row>
        </v-col>

        <!-- V-DIVIDER-VERTICAL (xs hidden, sm onwards visible)-->
        <v-col
          style="height: 200px"
          cols="12"
          md="1"
          sm="1"
          xs="0"
          class="d-none d-sm-flex mt-8 mb-n2"
        >
          <v-divider vertical />
        </v-col>

        <!-- V-CHIP: PEOPLE -->
        <v-col
          cols="12"
          md="4"
          sm="3"
          xs="12"
          class="mr-auto mt-8 text-left"
        >
          <v-chip
            v-for="(people, i) in peoples"
            :key="people.ident"
            outlined
            color="blue-grey darken-2"
            class="ma-1"
            close
            @click:close="removePeopleVchip(i)"
          >
            <span
              class="text-caption font-weight-medium"
            >
              {{ people.name }}
            </span>
          </v-chip>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet
      color="blue-grey lighten-5"
      class="px-4 py-8 mx-n3"
      min-height="300px"
    >
      <v-row dense>
        <!-- V-ICON: TO DISPLAY NEW CC FORM -->
        <v-col
          cols="12"
          md="3"
          sm="5"
          class="ml-auto mt-6 text-left"
        >
          <div
            v-if="selectedHse===undefined"
            style="cursor:default"
          >
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              3.
            </span>
            <v-icon
              small
              left
              color="grey"
              class="ml-2 mt-n1"
            >
              mdi-plus
            </v-icon>
            <span
              class="ml-n3 mb-n2 text-subtitle-1 font-weight-light grey--text"
            >
              Tambah Penghuni Rumah
            </span>
            <v-icon
              right
              color="grey darken-2"
              class="mt-n2"
            >
              mdi-human-male
            </v-icon>
          </div>
          <div
            v-else
            style="cursor: pointer"
            @click="newPeopleInHseCard = !newPeopleInHseCard"
          >
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              3.
            </span>
            <v-icon
              small
              left
              color="teal"
              class="ml-2 mt-n1"
            >
              mdi-plus
            </v-icon>
            <span
              class="ml-n3 mb-n2 text-subtitle-1 font-weight-light teal--text"
            >
              Tambah Penghuni Rumah
            </span>
            <v-icon
              right
              color="blue-grey darken-2"
              class="mt-n2"
            >
              mdi-human-male
            </v-icon>
          </div>
        </v-col>

        <!-- DUMMY COLUMN -->
        <v-col
          cols="5"
          md="7"
          sm="5"
          class="mr-auto"
        >
          <div v-show="false" />
        </v-col>

        <!-- V-CARD: ADD NEW CC FORM -->
        <v-col
          cols="12"
          md="10"
          sm="10"
          class="mx-auto mt-2 text-left"
        >
          <v-card
            v-show="newPeopleInHseCard && selectedHse!==undefined"
            ref="form"
            color="white"
            class="my-2"
          >
            <v-card-text>
              <v-form @submit.prevent="submit">
                <v-row>
                  <!-- NAME -->
                  <v-col
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="name"
                      ref="name"
                      v-model="editedProfile.name"
                      label="Name"
                      validate-on-blur
                      :rules="nameRules"
                      required
                    />
                  </v-col>

                  <!-- ID -->
                  <v-col
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="ident"
                      ref="ident"
                      v-model="editedProfile.ident"
                      label="IC/Passport"
                      validate-on-blur
                      :rules="identRules"
                      required
                    />
                  </v-col>

                  <!-- DOB -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-menu
                      v-model="dobMenu"
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
                          id="dob"
                          ref="dob"
                          :value="dobVal"
                          label="Date Of Birth"
                          prepend-icon="mdi-calendar"
                          readonly

                          :rules="requiredRule"
                          :error-messages="requiredProfErrMsg.dob"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedProfile.dob"
                        :allowed-dates="checkNotAfterToday"
                        locale="en-in"
                        no-title
                        scrollable
                        @input="refreshDob"
                      />
                    </v-menu>
                  </v-col>

                  <!-- GENDER -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="gender"
                      ref="gender"
                      v-model="editedProfile.gender"
                      :items="gender"
                      label="Gender"
                      validate-on-blur
                      :rules="requiredRule"
                      required
                    />
                  </v-col>

                  <!-- RACE -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="race"
                      ref="race"
                      v-model="editedProfile.race"
                      :items="race"
                      label="Race"
                      validate-on-blur
                      :rules="requiredRule"
                      required
                    />
                  </v-col>

                  <!-- NATIONALITY -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="nationality"
                      ref="nationality"
                      v-model="editedProfile.nationality"
                      :items="nationality"
                      label="Nationality"
                      validate-on-blur
                      :rules="requiredRule"
                      required
                    />
                  </v-col>

                  <!-- OCCUPATION -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="occupation"
                      ref="occupation"
                      v-model="editedProfile.occupation"
                      label="Occupation"
                      validate-on-blur
                      :rules="requiredRule"
                      required
                    />
                  </v-col>

                  <!-- TELEPHONE -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="tel"
                      ref="tel"
                      v-model="editedProfile.tel"
                      label="Telephone"
                      validate-on-blur
                      :rules="profileTelRules"
                      required
                    />
                  </v-col>

                  <!-- V-BTN: ADD PEOPLE -->
                  <v-col
                    cols="12"
                    md="12"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-btn
                      :disabled="!editedProfile.ident"
                      @click="addPeople"
                    >
                      Tambah
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { compareAsc } from 'date-fns'

export default {

  data () {
    return {
      newHseAddressCard: false,
      newPeopleInHseCard: false,
      selectedHse: undefined,
      hseAddresses: [],
      // peopleInHse: [],
      peopleInHse: {},
      peoples: [],
      editedProfile: {
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        state: '',
        district: '',
        locality: '',
        occupation: '',
        comorbid: []
      },
      defaultProfile: {
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        state: '',
        district: '',
        locality: '',
        occupation: '',
        comorbid: []
      },
      requiredProfErrMsg: {
        name: '',
        gender: '',
        dob: '',
        race: '',
        ident: '',
        nationality: '',
        occupation: '',
        tel: '',
        address: '',
        locality: '',
        district: '',
        state: '',
        supportVac: ''
      },

      // New Close Contact(People) Form
      dobMenu: false,
      gender: ['Male', 'Female'],
      race: [
        'Malay',
        'Chinese',
        'Indian',
        'Others'
      ],
      nationality: ['Warganegara', 'Bukan Warganegara'],
      eduLvl: ['Primary', 'Secondary', 'Tertiary'],
      state: [
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
      /* FORM FIELD RULES */
      requiredRule: [v => !!v || 'This field is required'],
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
    dobVal () {
      return this.editedProfile.dob
    },

    form () {
      return {
        name: this.editedProfile.name,
        ident: this.editedProfile.ident,
        dob: this.editedProfile.dob,
        gender: this.editedProfile.gender,
        race: this.editedProfile.race,
        nationality: this.editedProfile.nationality,
        occupation: this.editedProfile.occupation,
        tel: this.editedProfile.tel
      }
    }

  },

  methods: {
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

    addAddress () {
      const newHse = {
        address: this.editedProfile.address,
        isSelected: false
      }
      this.hseAddresses.push(newHse)
      this.newHseAddressCard = false
      this.editedProfile.address = ''
    },

    removePeopleVchip (idx) {
      this.peopleInHse[this.selectedHse].splice(idx, 1)

      this.$nextTick(this.reloadPeople())
    },

    reloadPeople () {
      if (this.selectedHse === undefined) {
        this.peoples.length = 0
        this.peoples = []
      }

      if (Array.isArray(this.peopleInHse[this.selectedHse])) {
        this.peoples = [...this.peopleInHse[this.selectedHse]]
      } else {
        this.peoples = []
      }
    },

    validateSignInForm () {
      let isValid = true
      const formKeys = Object.keys(this.form)
      for (let i = 0; i < formKeys.length; i++) {
        if (!this.$refs[formKeys[i]].validate(true)) {
          isValid = false
          document.querySelector(`#${formKeys[i]}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
          break
        }
      }
      return isValid
    },

    checkIfIdentConflict (id) {
      const keys = Object.keys(this.peopleInHse)

      for (let j = 0; j < keys.length; j++) {
        const key = keys[j]
        if (Array.isArray(this.peopleInHse[key])) {
          for (let i = 0; i < this.peopleInHse[key].length; i++) {
            if (this.peopleInHse[key][i].ident === id) {
              return false
            }
          }
        }
      }

      return true
    },

    addPeople () {
      if (this.validateSignInForm()) {
        const newPeople = Object.assign({}, this.editedProfile)

        if (!this.checkIfIdentConflict(newPeople.ident)) {
          alert('ID ini sudah ditambah tadi, anda tidak boleh tambah ID yang sama lebih sekali.')
          return
        }

        if (Array.isArray(this.peopleInHse[this.selectedHse])) {
          this.peopleInHse[this.selectedHse].push(newPeople)
          // if (this.checkIfIdentConflict(newPeople.ident)) {
          //   this.peopleInHse[this.selectedHse].push(newPeople)
          // } else {
          //   alert('ID ini sudah ditambah tadi, anda tidak boleh tambah ID yang sama lebih sekali')
          //   return
          // }
        } else {
          this.peopleInHse[this.selectedHse] = [newPeople]
        }
        this.editedProfile = Object.assign({}, this.defaultProfile)
        this.$refs.dob.reset()
        this.newPeopleInHseCard = false
        this.reloadPeople()
      }
    }

  }

}
</script>
