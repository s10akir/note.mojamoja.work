<template>
  <div>
    <v-btn :to="{ name: 'edit', params: { id: activeNote } }">edit</v-btn>
    <v-btn @click="deleteNote">delete</v-btn>
  </div>
</template>

<script>
export default {
  props: {
    activeNote: Number
  },
  methods: {
    deleteNote() {
      this.$emit("deleteNote", this.activeNote);
    }
  }
};
</script>
