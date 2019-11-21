<template>
  <div>
    <router-link to="/note/new">
      <button>New Note</button>
    </router-link>
    <div style="max-height: calc(100vh - 36px); overflow:auto">
      <div
        v-for="note in this.notes"
        :key="note.id"
        @click="selectNote(note.id)"
        style="border-bottom: ridge"
      >
        <NoteListItem :note="note" />
      </div>
    </div>
  </div>
</template>

<script>
import NoteListItem from "@/components/NoteListItem.vue";

export default {
  props: { notes: Array },
  components: {
    NoteListItem
  },
  methods: {
    selectNote: function(id) {
      this.$emit("selectNote", id);
    }
  }
};
</script>
