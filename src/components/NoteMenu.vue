<template>
  <div>
    <router-link :to="{ name: 'edit', params: { id: activeNote } }"
      ><button>edit</button></router-link
    >
    <button @click="deleteNote">delete</button>
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
