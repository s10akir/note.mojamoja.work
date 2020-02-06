<template>
  <div>
    <router-link :to="{ name: 'edit', params: { id: activeNote } }">
      <b-button :disabled="menuButton" variant="primary">edit</b-button>
    </router-link>
    <b-button :disabled="menuButton" variant="danger" @click="deleteNote"
      >delete</b-button
    >
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
  },
  computed: {
    menuButton() {
      if (this.activeNote == 0) {
        return true;
      }
      return false;
    }
  }
};
</script>
