require("dotenv").config();
const express = require("express");
const {graphqlHTTP} = require('express-graphql');
const cors = require("cors");
const schema = require('./schema/schema');
const mongoose = require("mongoose");




const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => app.listen(PORT, console.log(`Listening on port ${PORT}...`)))
    .catch((error) => console.log(error, "Could not connect database!"));

// app.listen(PORT, () => console.log('Server running on port ' + PORT));