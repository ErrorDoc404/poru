const GuildConfig = require("../mongoose/database/schemas/GuildConfig");
const premium = require("../mongoose/database/schemas/Premium");
const BotStats = require("../mongoose/database/schemas/Stats");

module.exports = async (client, interaction) => {
    let MusicDB = await client.GetMusic(interaction.guildId);
    let PremiumCMD = await premium.findOne({ guildId: interaction.guildId }); // Use findOne instead of find

    // Initialize GuildDB
    if (!MusicDB) {
        MusicDB = await GuildConfig.create({
            guildId: interaction.guildId,
            prefix: '!',
        });
    }

    if (interaction.isButton()) {
        const [name, ...params] = interaction.customId.split("-");

        const button = client.Buttons.get(name);

        if (!button) return;
        button.run(client, interaction, params, { MusicDB });
    }

    const command = interaction.commandName;

    let cmd = client.SlashCommands.get(command);
    if (!cmd) return;

    const args = interaction.options._hoistedOptions[0];

    if (cmd.SlashCommand && cmd.SlashCommand.run) {
        if (cmd.premium) {
            if (!PremiumCMD || PremiumCMD.expire || PremiumCMD.time < Date.now()) {
                return interaction.reply({ content: `**This command requires you to have Premium**` });
            } else {
                cmd.SlashCommand.run(client, interaction, args, { MusicDB });
            }
        } else {
            cmd.SlashCommand.run(client, interaction, args, { MusicDB });
        }
    }

    try {
        const statsQuery = { discordId: interaction.user.id };
        const statsUpdate = { discordName: interaction.user.username, $inc: { commandsCounter: 1 } };
        const updateOptions = { new: true, upsert: true };

        const updatedStats = await BotStats.findOneAndUpdate(statsQuery, statsUpdate, updateOptions);
    } catch (error) {
        client.error(`Error updating/creating stats: ${error}`);
    }

    client.CommandsRan++;
};