const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
    Songname: String,
    singer: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Music', MusicSchema);

