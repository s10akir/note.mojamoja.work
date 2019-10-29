<template>
  <v-container fluid fill-height pa-0>
    <v-row no-gutters class="fill-height">
      <v-col md="2">
        <MainMenu :notes="notes" @selectNote="selectNote" />
      </v-col>
      <v-col md="10" class="d-flex flex-column" fill-height>
        <v-col class="ma-0">
          <MarkdownPreview
            v-if="notes[searchIndex(activeNote)] != undefined"
            :title="notes[searchIndex(activeNote)].title"
            :content="notes[searchIndex(activeNote)].content"
          />
        </v-col>
        <v-row class="ma-0">
          <NoteMenu :activeNote="activeNote" @deleteNote="deleteNote" />
        </v-row>
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
  created: function() {
    this.loadNote();
  },
  data: () => ({
    notes: [],
    // 選択中のnoteのid
    activeNote: 0
  }),
  methods: {
    loadNote: async function() {
      const db = this.$db;
      const Note = db.getSchema().table("Note");

      db.select()
        .from(Note)
        .exec()
        .then(res => {
          this.notes = res;
        });
    },
    selectNote: function(id) {
      this.activeNote = id;
    },
    searchIndex: function(id) {
      // noteのidからnotesの要素番号を取得する
      return this.notes.findIndex(v => v.id == id);
    },
    deleteNote: async function(id) {
      if (window.confirm("Do you want to delete the selected note?")) {
        const db = this.$db;
        const Note = db.getSchema().table("Note");

        db.delete()
          .from(Note)
          .where(Note.id.eq(id))
          .exec()
          .then(() => {
            this.selectNote(0);
            this.loadNote();
          });
      }
    }
  }
};
</script>
