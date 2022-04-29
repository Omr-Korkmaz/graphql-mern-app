const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const schema = require('./schema/schema');



const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));



app.listen(PORT, () => console.log('Server running on port ' + PORT));