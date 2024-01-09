const { Client, REST, Routes } = require("discord.js");

/**
 * Register slash commands for a guild
 * @param {require("./library/MusicBot")} client
 * @param {string} guild
 */

module.exports = (client, guild) => {

    const rest = new REST({ version: '10' }).setToken(client.config.Token);

    (async () => {
        try {
            client.warn(`deleting ${guild} registed commands`);
            await rest.get(Routes.applicationGuildCommands(client.config.Id, guild))
                .then(data => {
                    const promises = [];
                    for (const command of data) {
                        const deleteUrl = `${Routes.applicationGuildCommands(client.config.Id, guild)}/${command.id}`;
                        promises.push(rest.delete(deleteUrl));
                    }
                    return Promise.all(promises);
                }).catch(err => { client.error(err) })
        } catch (error) {
            client.error(error);
        }
    })();
};
