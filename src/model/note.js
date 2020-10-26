const mongoose = require('mongoose');

const Note = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        required : true
    },
    updatedAt : {
        type : Date,
        default : null
    }
});

module.exports = mongoose.model('Note', Note);