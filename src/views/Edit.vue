<template>
  <v-container id="edit" fluid pa-0>
    <v-row no-gutters>
      <v-col xs="6" id="editor">
        <codemirror v-model="note.content" :options="cmOption" />
      </v-col>
      <v-col xs="6" class="pa-3" id="preview">
        <Preview :title="note.title" :content="note.content" />
      </v-col>
    </v-row>
    <v-toolbar bottom absolute flat width="100%">
      <v-btn @click="saveNote(note.content)" to="/">BACK</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/monokai.css";

import Preview from "@/components/MarkdownPreview";

let saveTimer;

export default {
  components: {
    codemirror,
    Preview
  },
  created: async function() {
    const db = this.$db;
    const Note = db.getSchema().table("Note");

    await db
      .select()
      .from(Note)
      .where(Note.id.eq(this.$route.params.id))
      .exec()
      .then(result => (this.note = result[0]));
  },
  data: () => ({
    note: {
      title: "",
      content: ""
    },
    // この辺をユーザが任意で設定できるユーティリティを提供する
    cmOption: {
      connect: "align",
      mode: "text/markdown",
      theme: "monokai",
      lineWrapping: true,
      lineNumbers: true,
      autoFocus: true,
      collapseIdentical: false,
      highlightDifferences: true
    },
    // 更新されてから何秒更新がなかった場合に保存するかをミリ秒で指定する
    autoSaveInterval: 2000
  }),
  methods: {
    saveNote: function(content) {
      console.log(content);
      const db = this.$db;
      const Note = db.getSchema().table("Note");

      db.update(Note)
        .set(Note.content, content)
        .set(Note.updated_at, new Date())
        .where(Note.id.eq(this.note.id))
        .exec();
    }
  },
  watch: {
    "note.content": function(value) {
      // autoSaveIntervalで指定された秒数更新がなかった場合にノートを保存する
      clearInterval(saveTimer);
      saveTimer = setTimeout(this.saveNote, this.autoSaveInterval, value);
    }
  }
};
</script>

<style lang="sass">
#edit
  height: calc(100% - 64px)

#editor, #preview, .row, .vue-codemirror
  height: 100%

.row
  .CodeMirror, #preview
    height: 100%
    overflow-y: auto
</style>
