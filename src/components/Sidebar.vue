<template>
  <div>
    <v-btn to="/note/new">New Note</v-btn>
    <v-text-field Label="Search" placeholder="Search" />
    <v-list-item-group>
      <v-list-item
        v-for="note in this.notes"
        v-bind:key="note.id"
        v-on:click="selectNote(note.id)"
      >
        <NoteItem :row="note" />
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";

export default {
  name: "Sidebar",
  props: { notes: Array },
  components: {
    NoteItem
  },
  methods: {
    selectNote: function(id) {
      this.$emit("selectNote", id);
    }
  }
};
</script>
