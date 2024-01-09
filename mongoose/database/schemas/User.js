const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  discordId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  discordTag: {
    type: mongoose.SchemaTypes.String,
    require: true,
  },
  premium: {
    type: mongoose.SchemaTypes.Boolean,
    require: true,
    default: false,
  },
  premiumExpiration: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: '1990-01-01T00:00:00.000+00:00',
  },
  perms: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: 'none',
  },
  avatar: {
    type: mongoose.SchemaTypes.String,
    require: false,
  },
  guilds: {
    type: mongoose.SchemaTypes.Array,
    require: true,
  },
  badges: {
    type: Array,
    default: []
  },
  rep: {
    type: Number,
    required: false,
  },
  lastVoted: { type: Number },
  votes: { type: Number }
});

module.exports = mongoose.model('User', UserSchema);