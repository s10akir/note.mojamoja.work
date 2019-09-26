<template>
  <v-container fluid fill-height pa-0>
    <v-row no-gutters class="fill-height">
      <v-col md="2">
        <Sidebar v-bind:notes="notes" @selectNote="selectNote" />
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
          <NoteMenu v-bind:activeNote="activeNote" />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import NoteMenu from "@/components/NoteMenu.vue";
import MarkdownPreview from "@/components/MarkdownPreview.vue";

export default {
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
    // 選択中のnoteのid
    activeNote: 0
  }),
  methods: {
    selectNote(id) {
      this.activeNote = id;
    },
    searchIndex(id) {
      // noteのidからnotesの要素番号を取得する
      return this.notes.findIndex(v => v.id == id);
    }
  }
};
</script>
