<template>
  <v-container />
</template>

<script>
export default {
  beforeCreate: function() {
    // 新規ノートを作成後、新規ノートのidを取得して/editへ飛ばす
    const db = this.$db;
    const Note = db.getSchema().table("Note");

    const row = Note.createRow({
      title: "",
      content: "",
      created_at: new Date(),
      updated_at: new Date()
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
