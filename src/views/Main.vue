<template>
  <div class="row content">
    <MainMenu
      id="menu-bar"
      class="col-3 col-sm-3 col-md-2 p-0"
      :notes="notes"
      :activeNote="activeNote"
      @selectNote="selectNote"
    />
    <div class="col-9 col-sm-9 col-md-10 p-0 vh-100">
      <MarkdownPreview
        class="px-2"
        v-if="notes[searchIndex(activeNote)] != undefined"
        :title="notes[searchIndex(activeNote)].title"
        :content="notes[searchIndex(activeNote)].content"
      />
      <b-nav small id="note-controller">
        <NoteMenu :activeNote="activeNote" @deleteNote="deleteNote" />
      </b-nav>
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
  top: 0rem
  height: 100vh

#note-content
  max-height: 100vh

#note-controller
  position: absolute
  bottom: 0

.content
  margin: 0px

.preview
  height: calc(100vh - 48px)
  overflow-y: auto
</style>
