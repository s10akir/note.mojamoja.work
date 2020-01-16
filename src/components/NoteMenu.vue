<template>
  <div>
    <router-link :to="{ name: 'edit', params: { id: activeNote } }">
      <b-button variant="primary">edit</b-button>
    </router-link>
    <b-button :disabled="deleteButton" variant="danger" @click="deleteNote"
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
    deleteButton() {
      if (!isNaN(this.activeNote)) {
        return "true";
      }
      return "false";
    }
  }
};
</script>
