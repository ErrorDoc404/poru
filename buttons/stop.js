const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField } = require("discord.js");

module.exports = {
  name: 'stop',
  run: async (client, interaction, parms, { MusicDB }) => {
    return interaction.reply({ content: `Work In progress` }).catch(err => { client.error(err) });
  }
}
