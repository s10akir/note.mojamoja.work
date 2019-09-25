<template>
  <div class="preview">
    <h1>{{ title }}</h1>
    <p v-html="render(content)" />
  </div>
</template>

<script>
import marked from "marked";

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
