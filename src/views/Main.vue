<template>
  <v-container fluid fill-height pa-0>
    <v-row no-gutters class="fill-height">
      <v-col md="2" style="height: 100%">
        <MainMenu :notes="notes" @selectNote="selectNote" />
      </v-col>
      <v-col
        xs="10"
        class="d-flex flex-column"
        style="height: calc(101% - 64px)"
      >
        <MarkdownPreview
          v-if="notes[searchIndex(activeNote)] != undefined"
          :title="notes[searchIndex(activeNote)].title"
          :content="notes[searchIndex(activeNote)].content"
          style="overflow-y: auto"
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
          <NoteMenu :activeNote="activeNote" />
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
    selectNote: function(id) {
      this.activeNote = id;
    },
    searchIndex: function(id) {
      // noteのidからnotesの要素番号を取得する
      return this.notes.findIndex(v => v.id == id);
    }
  }
};
</script>
