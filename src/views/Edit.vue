<template>
  <v-container id="edit" fluid fill-height pa-0>
    <v-row no-gutters>
      <v-col xs="6">
        <codemirror v-model="note.content" :options="cmOption" />
      </v-col>
      <v-col xs="6" class="ma-3">
        <Preview :title="note.title" :content="note.content" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/markdown/markdown";
import "codemirror/theme/monokai.css";

import Preview from "@/components/MarkdownPreview";

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
    }
  }),
  watch: {
    // TODO: 毎更新保存を実行するとCPU負荷が重すぎるので要検討
    "note.content": function(value) {
      console.log(value);
      const db = this.$db;
      const Note = db.getSchema().table("Note");

      db.update(Note)
        .set(Note.content, value)
        .set(Note.updated_at, new Date())
        .where(Note.id.eq(this.note.id))
        .exec();
    }
  }
};
</script>

<style lang="scss">
.row {
  height: 100%;

  .vue-codemirror {
    height: 100%;
  }

  .CodeMirror {
    height: 100%;
  }
}
</style>
