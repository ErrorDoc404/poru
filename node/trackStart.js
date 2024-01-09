const GuildConfig = require("../mongoose/database/schemas/GuildConfig");
const BotStats = require("../mongoose/database/schemas/Stats");
const { EmbedBuilder } = require("discord.js");

module.exports.run = async (client, player, track) => {
    this.MusicPlayed++;
    let content;
    const guildData = await GuildConfig.findOne({ guildId: player.guildId });
    const language = require(`../language/${guildData.language}`);
    const musicMsg = client.musicMessage[player.guildId];
    if (player.queue.length === 0) {
        content = ` ${language.nowPlaying} \n${track.info.title}.`;
    } else {
        content = `\n ${language.title} \n${track.info.title}.\n**[ ${player.queue.length} ${language.songsInQueue} ]**`;
        musicMsg.edit({ content });
    }

    client.playSong(track.info.title, player.queue.length);
    client.guildQueue[player.guildId] = player.queue.length;

    const thumbnail = track.info.image ? track.info.image.replace('maxresdefault', 'default') : 'https://c.tenor.com/eDVrPUBkx7AAAAAd/anime-sleepy.gif';
    const image = track.info.image ? track.info.image.replace('maxresdefault', 'hqdefault') : 'https://c.tenor.com/eDVrPUBkx7AAAAAd/anime-sleepy.gif';

    const msgEmbed = {
        title: track.info.title,
        color: 0xd43790,
        image: {
            url: image,
        },
        thumbnail: {
            url: thumbnail,
        },
        footer: {
            text: `🔊 ${language.volume}: ${player.volume}`,
            iconURL: `${client.user.avatarURL()}`,
        },
    };
    const playEmbed = new EmbedBuilder(msgEmbed);

    // Creating stats
    try {
        const statsQuery = { discordId: track.info.requester.id };
        const statsUpdate = {
            discordName: track.info.requester.username,
            $inc: { songsCounter: 1 },
        };
        const updateOptions = { new: true, upsert: true };

        const updatedStats = await BotStats.findOneAndUpdate(
            statsQuery,
            statsUpdate,
            updateOptions
        );
    } catch (error) {
        this.error(`Error updating/creating stats: ${error}`);
    }

    playEmbed.addFields({ name: `${language.requestedBy}`, value: `${track.info.requester.username}`, inline: true });

    if (client.skipSong[player.guildId] && client.skipBy[player.guildId]) {
        playEmbed.addFields({ name: `${language.skipBy}`, value: `${client.skipBy[player.guildId].username}`, inline: true });
        client.skipSong[player.guildId] = false;
        client.skipBy[player.guildId] = false;
    }

    musicMsg.edit({ content, embeds: [playEmbed] });

}