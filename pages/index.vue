<template>
  <v-card>
    <v-app-bar>
      <v-app-bar-nav-icon />

      <v-toolbar-title>myWabak</v-toolbar-title>

      <template #extension>
        <v-tabs
          v-model="tab"
          grow
          align-with-title
        >
          <v-tabs-slider color="blue" />

          <v-tab
            v-for="tabitem in tabitems"
            :key="tabitem"
          >
            {{ tabitem }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-container
      fluid
      fill-height
    >
      <v-tabs-items v-model="tab">
        <v-tab-item
          v-for="tabitem in tabitems"
          :key="tabitem"
        >
          <v-card
            class="mx-auto"
            min-height="800px"
          >
            <v-card-title>
              Tabbar
            </v-card-title>
            <v-card-text v-text="text" />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </v-card>
</template>

<script>

export default {
  components: {
    //
  },

  data () {
    return {
      tab: null,
      tabitems: ['tab1', 'tab2', 'tab3'],
      text: 'Lorem ipsum'
    }
  }
}
</script>
