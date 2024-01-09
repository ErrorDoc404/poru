module.exports = {
    name: 'play',
    inVc: true,
    sameVc: true,
    args: true,
    run: async (client, message, { MusicDB }) => {
        if (!message.member.voice.channel) return message.channel.send(`❌ | **You must be in a voice channel to play something!**`);
        // if (player && interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)
        //     return message.channel.send(`❌ | **You must be in the same voice channel as me to use music!**`);
        const player = client.poru.createConnection({
            guildId: message.guild.id,
            voiceChannel: message.member.voice.channel.id,
            textChannel: message.channel.id,
            deaf: true
        });

        // Fetch the music message from the database
        client.musicMessage[message.guild.id] = await message.channel.messages.fetch(MusicDB.musicMessageId);

        const resolve = await client.poru.resolve({ query: message.content, source: "ytsearch", requester: message.author });
        const { loadType, tracks, playlistInfo } = resolve;

        if (!client.currentSong[player.guildId]) client.currentSong[player.guildId] = tracks.shift();

        if (loadType === 'PLAYLIST_LOADED') {
            for (const track of resolve.tracks) {
                track.info.requester = message.author;
                player.queue.add(track);
            }

            message.channel.send(
                `Added: \`${tracks.length} from ${playlistInfo.name}\``,
            );
            if (!player.isPlaying && !player.isPaused) player.play();
        } else if (loadType === 'SEARCH_RESULT' || loadType === 'TRACK_LOADED') {
            const track = tracks.shift();
            track.info.requester = message.author;

            player.queue.add(track);
            if (!player.isPlaying && !player.isPaused) player.play();
        } else {
            return message.channel.send('There are no results found.');
        }

        if (player.queue.length >= 1) {
            client.guildQueue[message.guild.id] = player.queue.length;

            if (player.queue.length === 1) {
                content = `**[ Now Playing ]**\n${client.currentSong[player.guildId].info.title}.\n**[ ${player.queue.length} Songs in Queue ]**`;
                client.musicMessage[message.guild.id].edit({ content: content });
            } else if (player.queue.length > 1) {
                content = client.musicMessage[message.guild.id].content.replace(`${player.queue.length - 1} Songs in Queue`, `${player.queue.length} Songs in Queue`);
                client.musicMessage[message.guild.id].edit({ content: content });
            }
        }


        return;
    },
};