<template>
  <div>
    <v-btn :to="{ name: 'edit', params: { id: activeNote } }">edit</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    activeNote: Number
  }
};
</script>
