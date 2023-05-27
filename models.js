const mongoose = require('mongoose');

const Todoschema = mongoose.Schema({
    taskname: String,
    singer: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', Todoschema);

