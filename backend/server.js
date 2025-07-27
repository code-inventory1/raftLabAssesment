const jsonGraphqlExpress = require('json-graphql-server').default;
const express = require('express');
const cors = require('cors');
const data = require('./db.js');

const app = express();
app.use(cors());
app.use('/graphql', jsonGraphqlExpress(data));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`GraphQL server running on http://localhost:${PORT}/graphql`);
});