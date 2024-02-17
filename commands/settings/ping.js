const Discord = require("discord.js"),
    os = require('os');

const cpuStat = require("cpu-stat");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    name: "ping",
    description: "Get information about the bot",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["about", "stats", "info"],
    category: "info",
    SlashCommand: {
        /**
       *
       * @param {import("../library/DiscordModerationBot")} client
       * @param {import("discord.js").Message} message
       * @param {string[]} args
       * @param {*} param3
       */
        run: async (client, interaction) => {
            const { version, EmbedBuilder } = require("discord.js");
            cpuStat.usagePercent(async function (err, percent, seconds) {
                if (err) {
                    return console.log(err);
                }
                const duration = moment
                    .duration(client.uptime)
                    .format(" D[d], H[h], m[m]");

                const embed = new EmbedBuilder();
                embed.setTitle(`Stats from \`${client.user.username}\``);
                embed.addFields(
                    {
                        name: ":ping_pong: Ping",
                        value: `┕\`${Math.round(client.ws.ping)}ms\``,
                        inline: true,
                    },
                    {
                        name: ":clock1: Uptime",
                        value: `┕\`${duration}\``,
                        inline: true,
                    },
                    {
                        name: ":file_cabinet: Memory",
                        value: `┕\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
                            2
                        )}mb\``,
                        inline: true,
                    }
                );

                embed.addFields(
                    {
                        name: ":desktop: Operating System",
                        value: `┕\`${os.platform()}\``,
                        inline: true,
                    },
                    {
                        name: ":control_knobs: API Latency",
                        value: `┕\`${client.ws.ping}ms\``,
                        inline: true,
                    },
                    {
                        name: ":rocket:  Processor",
                        value: `┕\`${os.cpus().map(i => `${i.model}`)[0]}\``,
                        inline: false,
                    }
                );
                embed.addFields(
                    {
                        name: ":robot: Version",
                        value: `┕\`v${require("../../package.json").version}\``,
                        inline: true,
                    },
                    {
                        name: ":blue_book: Discord.js",
                        value: `┕\`v${Discord.version}\``,
                        inline: true,
                    },
                    {
                        name: ":green_book: Node",
                        value: `┕\`${process.version}\``,
                        inline: true,
                    }
                );

                return interaction.reply({ embeds: [embed] }).catch((err) => client.error(err));
            });
        }
    },
};