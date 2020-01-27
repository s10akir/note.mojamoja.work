<template>
  <div>
    <b-button
      id="new-note-btn"
      variant="success"
      class="fill-width"
      @click="createNote"
      >New Note
    </b-button>
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
    },
    createNote() {
      const db = this.$db;
      const Note = db.getSchema().table("Note");

      const now = new Date();
      const row = Note.createRow({
        title: String(now.toLocaleString("ja-JP", { timeTone: "JST" })),
        content: "",
        created_at: now,
        updated_at: now
      });

      db.insert()
        .into(Note)
        .values([row])
        .exec()
        .then(res => {
          const id = res[0].id;
          this.$router.push({ name: "edit", params: { id } });
        });
    }
  }
};
</script>

<style lang="sass" scoped>
#new-note-btn
  height: 48px

#note-list
  max-height: calc(100vh - 48px)
  overflow: auto

.fill-width
  width: 100%
</style>
