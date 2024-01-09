const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: 'play',
  run: async (client, interaction, parms, { MusicDB }) => {
    return interaction.reply({ content: `Work In progress` }).catch(err => { client.error(err) });
  }
}
