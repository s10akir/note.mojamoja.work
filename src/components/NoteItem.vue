<template>
  <p>{{ this.row.title }}</p>
</template>

<script>
export default {
  name: "noteItem",
  props: ["row"]
};
</script>
