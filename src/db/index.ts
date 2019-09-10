import lf from 'lovefield';

const dbName = 'moja-note';
const version = 1;
const schemaBuilder = lf.schema.create(dbName, version);

export default schemaBuilder;
