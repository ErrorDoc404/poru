const { Client, REST, Routes } = require("discord.js");
const fs = require("fs");
const path = require("path");

/**
 * Register slash commands for a guild
 * @param {require("./library/MusicBot")} client
 * @param {string} guild
 */

module.exports = (client) => {
    const commands = [];
    const categories = fs.readdirSync(__dirname + '/../commands/');
    categories.filter((cat) => !cat.endsWith('.js')).forEach((cat) => {
        const files = fs.readdirSync(__dirname + `/../commands/${cat}/`).filter((f) =>
            f.endsWith('.js')
        );
        files.forEach(async (file) => {
            let cmd = require(__dirname + `/../commands/${cat}/` + file);
            if (!cmd.SlashCommand) return;
            if (!cmd.SlashCommand || !cmd.SlashCommand.run)
                return client.warn(`Problem for loading ${cmd.name} Slash Command because it didn't found run body`);

            client.SlashCommands.set(cmd.name, cmd);

            client.warn(`Loading ${cmd.name} Slash Command`);

            let dataStuff = {
                name: cmd.name,
                description: cmd.description,
                options: cmd.SlashCommand.options,
            };

            commands.push(dataStuff);
        });
    });

    const rest = new REST({ version: '10' }).setToken(client.config.Token);

    (async () => {
        try {
            client.log('Started refreshing application Slash commands.');

            await rest.put(
                Routes.applicationCommands(client.config.Id),
                {
                    body: commands,
                    application_id: client.config.Id
                },
            );

            client.log('Successfully reloaded application Slash commands.');
        } catch (error) {
            client.error(error);
        }
    })();
};
