<template>
  <div class="d-flex flex-row mb-12">
    <Sidebar v-bind:notes="notes" @selectNote="selectNote" />
    <div class="float-left flex-column">
      <MarkdownPreview
        v-if="notes[searchIndex(activeNote)] != undefined"
        :title="notes[searchIndex(activeNote)].title"
        :content="notes[searchIndex(activeNote)].content"
      />
      <NoteMenu v-bind:activeNote="activeNote" :class="`justify-end`" />
    </div>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import NoteMenu from "../components/NoteMenu.vue";
import MarkdownPreview from "../components/MarkdownPreview.vue";

export default {
  name: "Main",
  components: {
    Sidebar,
    NoteMenu,
    MarkdownPreview
  },
  created: async function() {
    const db = this.$db;
    const Note = db.getSchema().table("Note");

    db.select()
      .from(Note)
      .exec()
      .then(res => {
        this.notes = res;
      });
  },
  data: () => ({
    notes: [],
    activeNote: 0
  }),
  methods: {
    selectNote(id) {
      this.activeNote = id;
    },
    searchIndex(id) {
      return this.notes.findIndex(v => v.id == id);
    }
  }
};
</script>
