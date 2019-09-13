import lf from "lovefield";

const schemaBuilder = lf.schema.create("moja_note", 1);

// TODO:  テーブルが増えてきたらファイル分割する
schemaBuilder
  .createTable("Note", 1)
  .addColumn("id", lf.Type.INTEGER)
  .addColumn("title", lf.Type.STRING)
  .addColumn("content", lf.Type.STRING)
  .addColumn("created_at", lf.Type.DATE_TIME)
  .addColumn("updated_at", lf.Type.DATE_TIME)
  .addPrimaryKey(["id"], true);

export default schemaBuilder;
