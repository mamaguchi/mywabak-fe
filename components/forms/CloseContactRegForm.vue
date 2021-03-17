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
            Pendaftaran Kontak Rapat {{ mode }}
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
            class="my-2 mx-1"
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
                      v-model="address"
                      label="Alamat tempat tinggal"
                      :error-messages="requiredProfErrMsg.address"
                      autofocus
                      @change="requiredProfErrMsg.address=''"
                    />
                  </v-col>

                  <!-- LOCALITY -->
                  <v-col
                    v-if="mode!=='1'"
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
                    v-if="mode!=='1'"
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
                    v-if="mode!=='1'"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="profileState"
                      v-model="editedProfile.state"
                      :items="states"
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
                      :disabled="!address"
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
                  {{ hse }}
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
            :outlined="editedIdx!==i"
            :color="editedIdx===i? 'teal accent-4' : 'blue-grey darken-2'"
            class="ma-1"
            close
            @click="showCCDetail(i, people)"
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

    <!-- 3RD SHEET -->
    <v-sheet
      color="blue-grey lighten-5"
      class="px-4 py-8 mx-n3"
    >
      <v-row dense>
        <!-- V-ICON: TO DISPLAY NEW CC FORM -->
        <v-col
          cols="12"
          md="5"
          sm="5"
          class="ml-auto mt-6 text-left"
        >
          <!-- DISABLED MODE -->
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

          <!-- ADD MODE -->
          <div
            v-else-if="selectedHse!==undefined && editedIdx===undefined"
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

          <!-- EDIT MODE -->
          <div
            v-else-if="selectedHse!==undefined && editedIdx!==undefined"
          >
            <span
              class="text-subtitle-2 font-weight-medium"
            >
              3.
            </span>
            <span
              class="ml-2 mb-n2 text-subtitle-1 font-weight-light"
            >
              Edit Penghuni Rumah
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
          md="5"
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
          xs="10"
          class="mx-auto mt-2"
        >
          <v-card
            v-show="newPeopleInHseCard && selectedHse!==undefined"
            ref="form"
            color="white"
            class="my-2 mx-1"
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

                  <!-- COMORBID -->
                  <v-col
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="comorbid"
                      ref="comorbid"
                      v-model="editedProfile.comorbid"
                      :items="comorbids"
                      item-text="name"
                      item-value="value"
                      multiple
                      :label="masalahKesihatanLabel"
                      validate-on-blur
                      :rules="comorbidRequiredRule"
                      required
                      @change="clearNoMasalahKesihatan"
                    >
                      <template #prepend-item>
                        <v-list-item
                          ripple
                          @click="toggleNoMasalahKesihatan"
                        >
                          <v-list-item-action>
                            <v-icon
                              v-if="!toTickNoMasalahKesihatanIcon"
                            >
                              mdi-checkbox-blank-outline
                            </v-icon>
                            <v-icon
                              v-else-if="toTickNoMasalahKesihatanIcon"
                              color="teal accent-4"
                            >
                              mdi-close-box
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              Tiada masalah kesihatan
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2" />
                      </template>
                    </v-select>
                  </v-col>

                  <!-- CONTACTTO -->
                  <v-col
                    v-if="mode!=='1'"
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="contactto"
                      ref="contactto"
                      v-model="editedProfile.contactto"
                      label="Kontak Kepada Siapa"
                      validate-on-blur
                      :rules="identRules"
                      required
                    />
                  </v-col>

                  <!-- LASTCONTACT -->
                  <v-col
                    v-if="mode!=='1'"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-menu
                      v-model="lastcontactMenu"
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
                          id="lastcontact"
                          ref="lastcontact"
                          :value="lastcontactVal"
                          label="Tarikh Last Kontak"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="requiredRule"
                          :error-messages="requiredProfErrMsg.lastcontact"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedProfile.lastcontact"
                        :allowed-dates="checkNotAfterToday"
                        locale="en-in"
                        no-title
                        scrollable
                        @input="refreshLastcontact"
                      />
                    </v-menu>
                  </v-col>

                  <!-- SYMPTOMS -->
                  <v-col
                    v-if="mode!=='1'"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-select
                      id="symptoms"
                      ref="symptoms"
                      v-model="editedProfile.symptoms"
                      :items="symptoms"
                      item-text="name"
                      item-value="value"
                      multiple
                      :label="symptomsLabel"
                      validate-on-blur
                      :rules="symptomsRequiredRule"
                      required
                      @change="clearNoSymptoms"
                    >
                      <template #prepend-item>
                        <v-list-item
                          ripple
                          @click="toggleNoSymptoms"
                        >
                          <v-list-item-action>
                            <v-icon
                              v-if="!toTickNoSymptomsIcon"
                            >
                              mdi-checkbox-blank-outline
                            </v-icon>
                            <v-icon
                              v-else-if="toTickNoSymptomsIcon"
                              color="teal accent-4"
                            >
                              mdi-close-box
                            </v-icon>
                          </v-list-item-action>
                          <v-list-item-content>
                            <v-list-item-title>
                              Tiada simtom
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                        <v-divider class="mt-2" />
                      </template>
                    </v-select>
                  </v-col>

                  <!-- ONSET -->
                  <v-col
                    v-if="mode!=='1'"
                    cols="12"
                    md="4"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-menu
                      v-model="onsetMenu"
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
                          id="onset"
                          ref="onset"
                          :disabled="editedProfile.symptoms[0]==='nosx'"
                          :value="onsetVal"
                          label="Tarikh Onset Simtom"
                          prepend-icon="mdi-calendar"
                          readonly
                          :rules="requiredRule"
                          :error-messages="requiredProfErrMsg.onset"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="editedProfile.onset"
                        :allowed-dates="checkNotAfterToday"
                        locale="en-in"
                        no-title
                        scrollable
                        @input="refreshOnset"
                      />
                    </v-menu>
                  </v-col>

                  <!-- WORKLOC -->
                  <v-col
                    v-if="mode!=='1'"
                    cols="12"
                    md="6"
                    sm="11"
                    class="text-center mx-auto"
                  >
                    <v-text-field
                      id="workloc"
                      ref="workloc"
                      v-model="editedProfile.workloc"
                      label="Lokasi Tempat Kerja"
                      validate-on-blur
                      :rules="requiredRule"
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
                      v-if="editedIdx===undefined"
                      :disabled="!editedProfile.ident"
                      @click="addPeople"
                    >
                      Tambah
                    </v-btn>
                    <v-btn
                      v-else
                      :disabled="!editedProfile.ident"
                      @click="saveEdit"
                    >
                      Edit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
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
      // Wbkcase Metadata
      // mode: '',
      locality: '',
      district: 'Maran',
      state: 'Pahang',
      casename: 'bandarjengka-2021-02-01-hospjengka',
      assignedToIk: '880601101111',
      // hasBeenVerified: false,
      // verifiedBy: '',

      // Input Form
      newHseAddressCard: false,
      newPeopleInHseCard: false,
      selectedHse: undefined,
      address: '',
      hseAddresses: [],
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
        //
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
        //
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

  async created () {
    if (this.mode === '2') {
      const payload = {
        casename: this.casename,
        assignedToIk: this.assignedToIk
      }

      try {
        let response
        if (process.env.NODE_ENV === 'production') {
          response = await this.$axios.post(
            'https://mywabak.com/cc/new/get',
            payload
          )
        } else {
          response = await this.$axios.post(
            'http://localhost:8080/cc/new/get',
            payload
          )
        }
        if (!response.data.closeContacts ||
          response.data.closeContacts.length === 0) {
          alert('Tiada pendaftaran kontak rapat baru untuk kes ini')
          return
        }

        const addresses = []
        const ccInHse = {}
        for (let i = 0; i < response.data.closeContacts.length; i++) {
          const cc = response.data.closeContacts[i]
          if (!cc.contactto) { cc.contactto = '' }
          if (!cc.lastcontact) { cc.lastcontact = '' }
          if (!cc.symptoms) { cc.symptoms = [] }
          if (!cc.onset) { cc.onset = '' }
          if (!cc.workloc) { cc.workloc = '' }

          let addIdx = addresses.indexOf(cc.address)
          if (addIdx === -1) {
            addresses.push(cc.address)
            addIdx = addresses.indexOf(cc.address)
            ccInHse[addIdx] = [cc]
          } else {
            ccInHse[addIdx].push(cc)
          }
        }
        this.hseAddresses = [...addresses]
        this.peopleInHse = Object.assign({}, ccInHse)
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

    refreshLastcontact () {
      this.requiredProfErrMsg.lastcontact = ''
      this.lastcontactMenu = false
    },

    refreshOnset () {
      this.requiredProfErrMsg.onset = ''
      this.onsetMenu = false
    },

    addAddress () {
      this.hseAddresses.push(this.address)
      this.newHseAddressCard = false
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

    showCCDetail (idx, people) {
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
        this.peopleInHse[this.selectedHse][this.editedIdx] = Object.assign({}, this.editedProfile)
        // reloadPeople() will reset editedProfile, editedIdx, requiredProfErrMsg.
        // reloadPeople() then copy the updated this.peopleInHse back to this.peoples.
        this.reloadPeople()
        // this.newPeopleInHseCard = false
      }
    },

    removePeopleVchip (idx) {
      this.peopleInHse[this.selectedHse].splice(idx, 1)
      this.$nextTick(this.reloadPeople())
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

    reloadPeople () {
      this.clearEditedProfileAndIdx()
      this.newPeopleInHseCard = false

      if (this.selectedHse === undefined) {
        this.peoples.length = 0
        this.peoples = []
        return
      }

      if (Array.isArray(this.peopleInHse[this.selectedHse])) {
        this.peoples = [...this.peopleInHse[this.selectedHse]]
      } else {
        this.peoples = []
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
      if (this.validateCCForm()) {
        this.editedProfile.hasbeenreviewed = true
        const newPeople = Object.assign({}, this.editedProfile)

        if (!this.checkIfIdentConflict(newPeople.ident)) {
          alert('ID ini sudah ditambah tadi, anda tidak boleh tambah ID yang sama lebih sekali.')
          return
        }

        if (Array.isArray(this.peopleInHse[this.selectedHse])) {
          this.peopleInHse[this.selectedHse].push(newPeople)
        } else {
          this.peopleInHse[this.selectedHse] = [newPeople]
        }
        this.editedProfile = Object.assign({}, this.defaultProfile)
        this.$refs.dob.reset() // manually clearing dob field validation error
        this.newPeopleInHseCard = false
        this.reloadPeople()
      }
    },

    hseAddressNotEmpty () {
      return this.hseAddresses.length > 0
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

      for (let i = 0; i < this.hseAddresses.length; i++) {
        if (Array.isArray(this.peopleInHse[i])) {
          if (this.peopleInHse[i].length > 0) {
            const ccReg = {
              address: this.hseAddresses[i],
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
      for (let i = 0; i < this.hseAddresses.length; i++) {
        if (Array.isArray(this.peopleInHse[i])) {
          if (this.peopleInHse[i].length > 0) {
            for (let j = 0; j < this.peopleInHse[i].length; j++) {
              // eslint-disble-next-line
              if (this.peopleInHse[i][j].hasbeenreviewed === false) {
                return {
                  res: false,
                  address: this.hseAddresses[i],
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
