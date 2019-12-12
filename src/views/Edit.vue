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

// codemirror themes
import "codemirror/theme/3024-day.css";
import "codemirror/theme/3024-night.css";
import "codemirror/theme/abcdef.css";
import "codemirror/theme/ambiance.css";
import "codemirror/theme/ambiance-mobile.css";
import "codemirror/theme/base16-dark.css";
import "codemirror/theme/base16-light.css";
import "codemirror/theme/bespin.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/cobalt.css";
import "codemirror/theme/colorforth.css";
import "codemirror/theme/darcula.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/duotone-dark.css";
import "codemirror/theme/duotone-light.css";
import "codemirror/theme/eclipse.css";
import "codemirror/theme/elegant.css";
import "codemirror/theme/erlang-dark.css";
import "codemirror/theme/gruvbox-dark.css";
import "codemirror/theme/hopscotch.css";
import "codemirror/theme/icecoder.css";
import "codemirror/theme/idea.css";
import "codemirror/theme/isotope.css";
import "codemirror/theme/lesser-dark.css";
import "codemirror/theme/liquibyte.css";
import "codemirror/theme/lucario.css";
import "codemirror/theme/material.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/mdn-like.css";
import "codemirror/theme/midnight.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/neat.css";
import "codemirror/theme/neo.css";
import "codemirror/theme/night.css";
import "codemirror/theme/nord.css";
import "codemirror/theme/oceanic-next.css";
import "codemirror/theme/panda-syntax.css";
import "codemirror/theme/paraiso-dark.css";
import "codemirror/theme/paraiso-light.css";
import "codemirror/theme/pastel-on-dark.css";
import "codemirror/theme/railscasts.css";
import "codemirror/theme/rubyblue.css";
import "codemirror/theme/seti.css";
import "codemirror/theme/shadowfox.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/ssms.css";
import "codemirror/theme/the-matrix.css";
import "codemirror/theme/tomorrow-night-bright.css";
import "codemirror/theme/tomorrow-night-eighties.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/twilight.css";
import "codemirror/theme/vibrant-ink.css";
import "codemirror/theme/xq-dark.css";
import "codemirror/theme/xq-light.css";
import "codemirror/theme/yeti.css";
import "codemirror/theme/yonce.css";
import "codemirror/theme/zenburn.css";

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
