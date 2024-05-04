const mongoose = require('mongoose');
const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
const TodoSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    text : {
        type: String,
        required: true
    },
    userId : {
        type: ObjectId,
        required: true
    }
} , { timestamps : true});

module.exports = TodoSchema;