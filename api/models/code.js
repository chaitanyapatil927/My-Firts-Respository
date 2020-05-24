const mongoose = require('mongoose');

const codeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String,
    code: String,
    author: {type :String, required: true},
    codeImage: String
});


module.exports = mongoose.model('Code',codeSchema);