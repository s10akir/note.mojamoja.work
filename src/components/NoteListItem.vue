<template>
  <div class="note-list-item-header">{{ this.note.title }}</div>
</template>

<script>
export default {
  props: ["note"]
};
</script>

<style scoped lang="sass">
.note-list-item-header
  font-size: 1.2rem
</style>
