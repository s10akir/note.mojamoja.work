<template>
  <div id="edit" class="container-fluid pa-0">
    <div class="row edit-main">
      <div id="editor" class="col-sm pa-0">
        <codemirror v-model="note.content" :options="cmOption" />
      </div>
      <div id="preview" class="col-sm pa-0">
        <Preview :title="note.title" :content="note.content" class="mx-10" />
      </div>
    </div>
    <div class="row">
      <router-link to="/"
        ><button @click="saveNote(note.content)" class="btn btn-primary">
          BACK
        </button></router-link
      >
      <b-button variant="primary" v-b-modal="'editor-setting-modal'"
        >Setting</b-button
      >
    </div>
    <b-modal id="editor-setting-modal">
      <EditorSetting :option="cmOption" />
    </b-modal>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";

import "codemirror/keymap/vim";
import "codemirror/keymap/emacs";
import "codemirror/keymap/sublime";

import Preview from "@/components/MarkdownPreview";
import EditorSetting from "@/components/EditorSetting";

let saveTimer;

export default {
  components: {
    codemirror,
    Preview,
    EditorSetting
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
      highlightDifferences: true,
      keyMap: "default"
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
.row
  margin: 0

#edit
  height: 100%

.edit-main
  height: calc(100% - 48px)

.vue-codemirror, .CodeMirror
  height: 100%

#preview, #editor
  height: 100%
  overflow-y: auto

.pa-0
  padding: 0

.mx-10
  margin-left: 10px
  margin-right: 10px
</style>
