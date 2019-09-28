<template>
  <div>
    <v-btn to="/note/new">New Note</v-btn>
    <v-list-item-group>
      <v-list-item
        v-for="note in this.notes"
        :key="note.id"
        @click="selectNote(note.id)"
        style="border-bottom: ridge"
      >
        <NoteListItem :note="note" />
      </v-list-item>
    </v-list-item-group>
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
