<template>
  <div>
    <div>
      <div id="menu-bar" style="height: 100%">
        <MainMenu :notes="notes" @selectNote="selectNote" />
      </div>
      <div>
        <MarkdownPreview
          class="preview px-2"
          v-if="notes[searchIndex(activeNote)] != undefined"
          :title="notes[searchIndex(activeNote)].title"
          :content="notes[searchIndex(activeNote)].content"
        />
        <div>
          <NoteMenu :activeNote="activeNote" @deleteNote="deleteNote" />
        </div>
      </div>
    </div>
  </div>
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
#menu-bar
  border-right: #ccc 1px solid

.preview
  overflow-y: auto
</style>
