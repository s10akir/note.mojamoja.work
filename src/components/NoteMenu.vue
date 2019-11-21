<template>
  <div>
    <router-link :to="{ name: 'edit', params: { id: activeNote } }">
      <b-button>edit</b-button>
    </router-link>
    <b-button @click="deleteNote">delete</b-button>
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
