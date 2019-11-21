<template>
  <v-app id="main">
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="sass">
// これを書いておかないと常にスクロールバーが出てしまう(Vuetify起因？）
html
  overflow-y: visible !important

#main, main
  height: 100vh
</style>
