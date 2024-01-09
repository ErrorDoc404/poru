const MusicBot = require('./MusicBot.js');

const bot = new MusicBot();

bot.build();

bot.MongooseConnect();

module.exports = bot;