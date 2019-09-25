<template>
  <div class="preview">
    <h1>{{ title }}</h1>
    <p v-html="render(content)" />
  </div>
</template>

<script>
import marked from "marked";
import hljs from "highlightjs";
import "highlight.js/styles/github.css";

marked.setOptions({
  langPrefix: "",
  highlight: function(code, lang) {
    return hljs.highlightAuto(code, [lang]).value;
  }
});

export default {
  name: "MarkdownPreview",
  props: {
    title: String,
    content: String
  },
  methods: {
    render: text => {
      return marked(text);
    }
  }
};
</script>
