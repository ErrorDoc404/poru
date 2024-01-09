const mongoose = require('mongoose');

const RedeemSchema = new mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.String,
        require: true,
        unique: false,
    },
    token: {
        type: mongoose.SchemaTypes.String,
        require: false,
        default: null,
        unique: true,
    },
    used: {
        type: mongoose.SchemaTypes.Boolean,
        require: true,
        default: false,
    },
    guildId: {
        type: mongoose.SchemaTypes.String,
        require: false,
        default: null,
    },
});

module.exports = mongoose.model('Redeem', RedeemSchema);