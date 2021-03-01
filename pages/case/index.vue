<template>
  <v-card
    class="mx-auto"
    min-height="800px"
  >
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-toolbar-title>myWabak - Case</v-toolbar-title>

      <template #extension>
        <v-tabs
          v-model="tab"
          grow
          align-with-title
        >
          <v-tabs-slider color="blue" />

          <v-tab
            v-for="tabitem in tabItems"
            :key="tabitem"
          >
            {{ tabitem }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="tabitem in tabItems"
        :key="tabitem"
      >
        <!-- ============================================= -->
        <!-- HERE IS WHERE U PLACE THE CONTENT OF EACH TAB -->
        <!-- ============================================= -->

        <v-container
          fluid
          fill-height
        >
          <!-- POSITIVE CASES -->
          <v-row
            v-if="tabitem === 'Positive Cases'"
            justify="center"
            class="mt-10 mx-4"
          >
            <v-col
              cols="12"
              md="6"
              sm="6"
              class="mx-auto"
            >
              <v-data-table
                v-if="posCases.length"
                dense
                style="cursor:pointer"
                :headers="pcHeaders"
                :items="posCases"
                item-key="ident"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                multi-sort
                hide-default-footer
                class="elevation-3 white"
                @page-count="pageCount = $event"
                @click:row="tblRowClicked"
              >
                <!-- TABLE HEADER CONFIGURATION -->
                <template #[`header.name`]="{ header }">
                  <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                </template>
                <template #[`header.ident`]="{ header }">
                  <span class="white--text font-weight-medium">{{ header.text }}</span>
                </template>

                <!-- TOOLBAR -->
                <template #top>
                  <v-toolbar flat style="cursor:default">
                    <v-spacer />

                    <v-btn
                      small
                      color="primary"
                      dark
                      @click="exportXlsx"
                    >
                      <v-icon class="ml-n2">
                        mdi-plus
                      </v-icon>
                      Export Table
                    </v-btn>
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-col>

            <v-col cols="12" class="mx-auto">
              <v-pagination
                v-if="posCases.length"
                v-model="page"
                :length="pageCount"
              />
            </v-col>
          </v-row>

          <!-- CLOSE CONTACTS -->
          <v-row
            v-if="tabitem === 'Close Contacts'"
            justify="center"
            class="mt-10 mx-4"
          >
            <v-col
              cols="12"
              md="6"
              sm="6"
              class="mx-auto"
            >
              <v-data-table
                v-if="cc.length"
                dense
                style="cursor:pointer"
                :headers="ccHeaders"
                :items="cc"
                item-key="ident"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                multi-sort
                hide-default-footer
                class="elevation-3 white"
                @page-count="pageCount = $event"
                @click:row="tblRowClicked"
              >
                <!-- TABLE HEADER CONFIGURATION -->
                <template #[`header.name`]="{ header }">
                  <span class="mb-n6 white--text font-weight-black">{{ header.text }}</span>
                </template>
                <template #[`header.ident`]="{ header }">
                  <span class="white--text font-weight-medium">{{ header.text }}</span>
                </template>

                <!-- TOOLBAR -->
                <template #top>
                  <v-toolbar flat style="cursor:default">
                    <v-spacer />

                    <!-- EDIT DIALOG -->
                    <v-dialog
                      v-model="editDialog"
                      max-width="700px"
                      @keydown.enter="saveCC"
                      @click:outside="closeCCEditDialog"
                    >
                      <template #activator="{ on, attrs }">
                        <v-btn
                          small
                          color="amber"
                          dark
                          v-bind="attrs"
                          class="mr-2"
                          v-on="on"
                          @click="addCC"
                        >
                          <v-icon class="ml-n2">
                            mdi-plus
                          </v-icon>
                          Add Contact
                        </v-btn>
                      </template>

                      <!-- <v-form @submit.prevent="submit"> -->
                      <v-card>
                        <v-card-title>
                          <span class="headline">{{ formTitle }}</span>
                        </v-card-title>

                        <v-card-text>
                          <v-form @submit.prevent="submit">
                            <v-container>
                              <v-row>
                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    id="profileName"
                                    v-model="editedProfile.name"
                                    label="Name"
                                    :rules="profileNameRules"
                                    :error-messages="requiredProfErrMsg.name"
                                    @change="requiredProfErrMsg.name=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="6"
                                >
                                  <v-text-field
                                    id="profileIdent"
                                    v-model="editedProfile.ident"
                                    label="IC/Passport"
                                    :rules="profileIdentRules"
                                    :error-messages="requiredProfErrMsg.ident"
                                    @change="requiredProfErrMsg.ident=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-menu
                                    id="profileDob"
                                    ref="dobMenu"
                                    v-model="dobMenu"
                                    :close-on-content-click="false"
                                    :return-value.sync="editedProfile.dob"
                                    transition="scale-transition"
                                    offset-y
                                    min-width="auto"
                                  >
                                    <template #activator="{ on, attrs }">
                                      <v-text-field
                                        v-model="editedProfile.dob"
                                        label="Date Of Birth"
                                        prepend-icon="mdi-calendar"
                                        readonly
                                        v-bind="attrs"
                                        :error-messages="requiredProfErrMsg.dob"
                                        v-on="on"
                                      />
                                    </template>
                                    <v-date-picker
                                      v-model="editedProfile.dob"
                                      no-title
                                      scrollable
                                      @change="requiredProfErrMsg.dob=''"
                                    >
                                      <v-spacer />
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="dobMenu = false"
                                      >
                                        Cancel
                                      </v-btn>
                                      <v-btn
                                        text
                                        color="primary"
                                        @click="$refs.dobMenu.save(editedProfile.dob)"
                                      >
                                        OK
                                      </v-btn>
                                    </v-date-picker>
                                  </v-menu>
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileGender"
                                    v-model="editedProfile.gender"
                                    :items="gender"
                                    label="Gender"
                                    :error-messages="requiredProfErrMsg.gender"
                                    @change="requiredProfErrMsg.gender=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileRace"
                                    v-model="editedProfile.race"
                                    :items="race"
                                    label="Race"
                                    :error-messages="requiredProfErrMsg.race"
                                    @change="requiredProfErrMsg.race=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileNationality"
                                    v-model="editedProfile.nationality"
                                    :items="nationality"
                                    label="Nationality"
                                    :error-messages="requiredProfErrMsg.nationality"
                                    @change="requiredProfErrMsg.nationality=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileEduLvl"
                                    v-model="editedProfile.eduLvl"
                                    :items="eduLvl"
                                    label="Education Level"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileOccupation"
                                    v-model="editedProfile.occupation"
                                    label="Occupation"
                                    :rules="profileOccupationRules"
                                    :error-messages="requiredProfErrMsg.occupation"
                                    @change="requiredProfErrMsg.occupation=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-file-input
                                    v-model="profilePic"
                                    style="cursor:pointer"
                                    show-size
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    label="Profile Picture"
                                    @change="processProfilePic"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileTel"
                                    v-model="editedProfile.tel"
                                    label="Telephone"
                                    :rules="profileTelRules"
                                    :error-messages="requiredProfErrMsg.tel"
                                    @change="requiredProfErrMsg.tel=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <v-text-field
                                    id="profileAddress"
                                    v-model="editedProfile.address"
                                    label="Address"
                                    :error-messages="requiredProfErrMsg.address"
                                    @change="requiredProfErrMsg.address=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profilePostalCode"
                                    v-model="editedProfile.postalCode"
                                    label="Postal Code"
                                    :error-messages="requiredProfErrMsg.postalCode"
                                    @change="requiredProfErrMsg.postalCode=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileLocality"
                                    v-model="editedProfile.locality"
                                    label="Locality/Taman"
                                    :error-messages="requiredProfErrMsg.locality"
                                    @change="requiredProfErrMsg.locality=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-text-field
                                    id="profileDistrict"
                                    v-model="editedProfile.district"
                                    label="District"
                                    :error-messages="requiredProfErrMsg.district"
                                    @change="requiredProfErrMsg.district=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
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

                                <v-col
                                  cols="12"
                                >
                                  <div v-show="false" />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="4"
                                >
                                  <v-select
                                    id="profileSupportVac"
                                    v-model="editedProfile.supportVac"
                                    :items="supportVac"
                                    item-text="name"
                                    item-value="value"
                                    label="Support Vaccine"
                                    :rules="supportVacRule"
                                    :error-messages="requiredProfErrMsg.supportVac"
                                    @change="requiredProfErrMsg.supportVac=''"
                                  />
                                </v-col>

                                <v-col
                                  cols="12"
                                  md="8"
                                >
                                  <div v-show="false" />
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="closeCCEditDialog"
                            @keydown.esc="closeCCEditDialog"
                          >
                            Cancel
                          </v-btn>
                          <v-btn
                            color="blue darken-1"
                            text
                            @click="saveCC"
                          >
                            Save
                          </v-btn>
                          <v-btn
                            color="yellow darken-3"
                            text
                            :disabled="editedIndex===-1"
                            @click="deleteItem"
                          >
                            Delete
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                      <!-- </v-form> -->
                    </v-dialog>

                    <!-- DELETE DIALOG -->
                    <v-dialog v-model="removeDialog" max-width="500px">
                      <v-card>
                        <v-card-title class="headline">
                          Are you sure you want to remove this person from close contact list?
                        </v-card-title>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn color="blue darken-1" text @click="closeDelete">
                            Cancel
                          </v-btn>
                          <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                            OK
                          </v-btn>
                          <v-spacer />
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <v-btn
                      small
                      color="primary"
                      dark
                      @click="exportXlsx"
                    >
                      <v-icon class="ml-n2">
                        mdi-plus
                      </v-icon>
                      Export Table
                    </v-btn>
                  </v-toolbar>
                </template>
              </v-data-table>
            </v-col>

            <v-col cols="12" class="mx-auto">
              <v-pagination
                v-if="cc.length"
                v-model="page"
                :length="pageCount"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {

  data () {
    return {
      // GENERAL
      tab: null,
      tabItems: ['Positive Cases', 'Close Contacts', 'HSO'],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,

      // TAB: POSITIVE CASES
      pcHeaders: [
        { text: 'Name', value: 'name', align: 'start', sortable: true, class: 'success', width: '160px' },
        { text: 'No', value: 'ident', sortable: true, class: 'success', width: '100px' }
      ],
      posCases: [
        { name: 'patient1', ident: '123' },
        { name: 'patient2', ident: '456' }
      ],

      // TAB: CLOSE CONTACTS
      ccHeaders: [
        { text: 'Name', value: 'name', align: 'start', sortable: true, class: 'success', width: '160px' },
        { text: 'No', value: 'ident', sortable: true, class: 'success', width: '100px' }
      ],
      cc: [
        { name: 'patient3', ident: '12345' },
        { name: 'patient4', ident: '67890' }
      ],
      ccEditedIndex: -1,
      editDialog: false,
      removeDialog: false,
      dobMenu: false,
      profilePic: null,
      editedProfile: {
        role: '',
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        postalCode: '',
        state: '',
        district: '',
        locality: '',
        eduLvl: '',
        occupation: '',
        comorbids: []
      },
      defaultProfile: {
        role: '',
        ident: '',
        name: '',
        gender: '',
        dob: '',
        nationality: '',
        race: '',
        tel: '',
        address: '',
        postalCode: '',
        state: '',
        district: '',
        locality: '',
        eduLvl: '',
        occupation: '',
        comorbids: []
      },
      requiredProfErrMsg: {
        name: '',
        gender: '',
        // dob: '',
        race: '',
        ident: '',
        nationality: '',
        occupation: '',
        tel: '',
        address: '',
        locality: '',
        district: '',
        postalCode: '',
        state: '',
        supportVac: ''
      }
    }
  },

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Vaccination' : 'Edit Vaccination'
    }
  },

  methods: {
    tblRowClicked () {
      //
    },

    exportXlsx () {
      //
    },

    addCC () {
      //
    },

    saveCC () {
      //
    },

    closeCCEditDialog () {
      //
    },

    processProfilePic () {
      if (!this.profilePic) { return }

      const _this = this

      const reader = new FileReader()
      reader.readAsDataURL(this.profilePic)

      reader.onload = function (readerEvt) {
        const imgElement = document.createElement('img')
        imgElement.src = readerEvt.target.result // result is the base64-encoded image

        imgElement.onload = function (e) {
          const canvas = document.createElement('canvas')
          // const MAX_WIDTH = 400 // produces base64 string len: ~252866
          const MAX_WIDTH = 100 // produces base64 string len: ~26486
          // const MAX_WIDTH = 50 // produces base64 string len: ~8038

          const scaleSize = MAX_WIDTH / e.target.width
          canvas.width = MAX_WIDTH
          canvas.height = e.target.height * scaleSize

          const ctx = canvas.getContext('2d')

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height)

          const picResizedEncoded = ctx.canvas.toDataURL(e.target, 'image/png')
          _this.profile.profilePicData = picResizedEncoded

          // you can send picResizedEncoded to the server
          document.querySelector('#output').src = picResizedEncoded
        }
      }
    }

  }
}
</script>
