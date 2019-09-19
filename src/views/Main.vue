<template>
  <div class="d-flex flex-row mb-6">
    <Sidebar noteTitles="notes" />
    <div class="float-left">
      <MarkdownPreview title="title" content="content" />
      <NoteMenu />
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

    await console.log(Note);
  },
  data: () => ({
    notes: []
  })
};
</script>
