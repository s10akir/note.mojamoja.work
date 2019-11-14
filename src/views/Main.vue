<template>
  <v-container fluid fill-height pa-0>
    <v-row no-gutters class="fill-height">
      <v-col md="2" style="height: 100%">
        <MainMenu :notes="notes" @selectNote="selectNote" />
      </v-col>
      <v-col
        xs="10"
        class="d-flex flex-column"
        style="height: calc(100% - 64px)"
      >
        <MarkdownPreview
          class="preview px-2"
          v-if="notes[searchIndex(activeNote)] != undefined"
          :title="notes[searchIndex(activeNote)].title"
          :content="notes[searchIndex(activeNote)].content"
        />
        <v-toolbar
          class="ma-0"
          :absolute="true"
          :bottom="true"
          :flat="true"
          :dark="true"
          width="100%"
          height="64px"
          max-height="64px"
        >
          <NoteMenu :activeNote="activeNote" @deleteNote="deleteNote" />
        </v-toolbar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import MainMenu from "@/components/MainMenu.vue";
import NoteMenu from "@/components/NoteMenu.vue";
import MarkdownPreview from "@/components/MarkdownPreview.vue";

export default {
  components: {
    MainMenu,
    NoteMenu,
    MarkdownPreview
  },
  created() {
    this.loadNotes();
  },
  data: () => ({
    notes: [],
    // 選択中のnoteのid
    activeNote: 0
  }),
  methods: {
    async loadNotes() {
      const db = this.$db;
      const Note = db.getSchema().table("Note");

      db.select()
        .from(Note)
        .exec()
        .then(res => {
          this.notes = res;
        });
    },
    selectNote(id) {
      this.activeNote = id;
    },
    searchIndex(id) {
      // noteのidからnotesの要素番号を取得する
      return this.notes.findIndex(v => v.id == id);
    },
    async deleteNote(id) {
      const isConfirm = window.confirm(
        "Do you want to delete the selected note?"
      );

      if (isConfirm) {
        const db = this.$db;
        const Note = db.getSchema().table("Note");

        db.delete()
          .from(Note)
          .where(Note.id.eq(id))
          .exec()
          .then(() => {
            this.selectNote(0);
            this.loadNotes();
          });
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.preview
  overflow-y: auto
</style>
