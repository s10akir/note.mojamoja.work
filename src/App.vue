<template>
  <div id="main">
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="sass">
#main, main
  height: 100vh
</style>
