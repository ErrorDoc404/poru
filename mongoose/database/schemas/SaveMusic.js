const mongoose = require('mongoose');

const SaveMusicSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.String,
        require: true,
    },
    trackId: {
        type: mongoose.SchemaTypes.String,
        require: false,
    },
    track: {
        type: mongoose.SchemaTypes.Array,
        require: false,
    },
});

module.exports = mongoose.model('SaveMusic', SaveMusicSchema);