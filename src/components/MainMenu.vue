<template>
  <div>
    <router-link to="/note/new">
      <b-button id="new-note" variant="success" class="fill-width"
        >New Note
      </b-button>
    </router-link>
    <div id="note-list">
      <div class="list-group">
        <div
          v-for="note in this.notes"
          :key="note.id"
          @click="selectNote(note.id)"
        >
          <NoteListItem
            :note="note"
            class="list-group-item list-group-item-action"
            :class="{ active: isActive(note.id) }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteListItem from "@/components/NoteListItem.vue";

export default {
  props: { notes: Array, activeNote: Number },
  components: {
    NoteListItem
  },
  methods: {
    selectNote: function(id) {
      this.$emit("selectNote", id);
    },
    isActive(id) {
      return this.activeNote === id;
    }
  }
};
</script>

<style lang="sass" scoped>
#new-note
  height: 48px

#note-list
  max-height: calc(100vh - 48px)
  overflow: auto

.ma-0
  margin: 0

.fill-width
  width: 100%
</style>
