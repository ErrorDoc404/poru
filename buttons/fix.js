const { ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageEmbed, PermissionsBitField } = require("discord.js");

module.exports = {
  name: 'fix',
  run: async (client, interaction, parms, { MusicDB }) => {
    return interaction.reply({ content: `Work In progress` }).catch(err => { client.error(err) });
  }
}