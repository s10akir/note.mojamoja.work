<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>moja-note</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/"><span class="mr-2">Home</span></v-btn>
      <v-btn text to="/about"><span class="mr-2">About</span></v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';

export default Vue.extend({
  name: 'App',
  components: {
    HelloWorld,
  },
  data: () => ({
    //
  }),
});
</script>
