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
        class="list-group"
      >
        <NoteListItem
          :note="note"
          class="list-group-item list-group-item-action"
        />
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

<style lang="sass" scoped>
.ma-0
  margin: 0
</style>
