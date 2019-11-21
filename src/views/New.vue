<template>
  <v-container />
</template>

<script>
export default {
  beforeCreate: function() {
    // 新規ノートを作成後、新規ノートのidを取得して/editへ飛ばす
    const db = this.$db;
    const Note = db.getSchema().table("Note");

    const now = new Date();
    const row = Note.createRow({
      title: String(now.toLocaleString("ja-JP", { timeXone: "JSC" })),
      content: "",
      created_at: now,
      updated_at: now
    });

    db.insert()
      .into(Note)
      .values([row])
      .exec()
      .then(res => {
        const id = res[0].id;
        this.$router.push({ name: "edit", params: { id } });
      });
  }
};
</script>
