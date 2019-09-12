<template>
  <div class="preview">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: "MarkdownPreview",
  props: {
    title: String,
    content: String
  }
};
</script>
