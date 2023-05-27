const mongoose = require('mongoose');

const Todoschema = mongoose.Schema({
    taskname: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', Todoschema);

