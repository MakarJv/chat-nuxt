<template>
  <v-app app dark>
    <v-navigation-drawer app></v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Chat room {{user.room}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div>
        <nuxt />
      </div>
    </v-content>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: mapState(['user'])
};
</script>
