const mongoose = require('mongoose');

const StatsSchema = new mongoose.Schema({
    discordId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    discordName: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: true,
    },
    songsCounter: {
        type: mongoose.SchemaTypes.Number,
        require: false,
        default: 0,
    },

    commandsCounter: {
        type: mongoose.SchemaTypes.Number,
        require: false,
        default: 0,
    }
});

module.exports = mongoose.model('Stats', StatsSchema);