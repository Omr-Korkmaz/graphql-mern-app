const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
    name: String
});

module.exports = mongoose.model('Library', librarySchema);