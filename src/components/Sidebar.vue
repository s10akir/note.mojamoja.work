<template>
  <div>
    <v-btn>New Note</v-btn>
    <v-text-field Label="Search" placeholder="Search" />
    <v-list-item-group>
      <v-list-item v-for="note in notes" v-bind:key="note.title">
        <NoteItem :row="note" />
      </v-list-item>
    </v-list-item-group>
  </div>
</template>

<script>
import NoteItem from "./NoteItem.vue";

export default {
  name: "Sidebar",
  data: function() {
    return {
      notes: [
        { title: "title1", content: "content1" },
        { title: "title2", content: "content2" }
      ]
    };
  },
  components: {
    NoteItem
  }
};
</script>
