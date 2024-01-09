const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema({
  guildId: {
    type: mongoose.SchemaTypes.String,
    require: true,
    unique: true,
  },
  prefix: {
    type: mongoose.SchemaTypes.String,
    require: true,
    default: '!',
  },
  twentyFourSeven: {
    type: mongoose.SchemaTypes.Boolean,
    require: false,
    default: false,
  },
  musicChannelId: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  musicMessageId: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: null,
  },
  language: {
    type: mongoose.SchemaTypes.String,
    require: false,
    default: 'english',
  }
});

module.exports = mongoose.model('GuildConfig', GuildConfigSchema);
