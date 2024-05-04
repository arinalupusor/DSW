const todoSchema = require("./schemas/todoSchema");
const mongoose = require("mongoose");
const Todo = mongoose.model("todo", todoSchema)

module.exports = Todo;
