const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");


const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

app.use('/graphql', graphqlHTTP({

}));



app.listen(PORT, () => console.log('Server running on port ' + PORT));