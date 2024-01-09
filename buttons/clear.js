const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'clear',
  run: async (client, interaction, parms, { MusicDB }) => {
    return interaction.reply({ content: `Work In progress` }).catch(err => { client.error(err) });
  }
}
