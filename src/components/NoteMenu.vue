<template>
  <div>
    <router-link :to="{ name: 'edit', params: { id: activeNote } }">
      <button class="btn btn-primary">edit</button>
    </router-link>
    <button class="btn btn-danger" @click="deleteNote">delete</button>
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
