import lf from 'lovefield';

const dbName = 'moja-note';
const version = 1;
const schemaBuilder = lf.schema.create(dbName, version);

schemaBuilder.createTable('note').
  addColumn('id', lf.Type.INTEGER).
  addColumn('title', lf.Type.STRING).
  addColumn('content', lf.Type.STRING).
  addColumn('created_at', lf.Type.DATE_TIME).
  addColumn('updated_at', lf.Type.DATE_TIME).
  addPrimaryKey(['id'], true);

export default schemaBuilder;
