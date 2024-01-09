module.exports = async (client, message) => {
    let MusicDB = await client.GetMusic(message.guild.id);
    if (!MusicDB) return;
    if (!MusicDB.musicChannelId) return;
    if (message.channel.id == MusicDB.musicChannelId) {
        if (message.author.bot) {
            try {
                setTimeout(() => message.delete(), 3000);
            } catch (e) {
                message.channel.send(`Error: ${e}`);
            }
        } else {
            try {
                message.delete();
            } catch (e) {
                message.channel.send(`Error: ${e}`);
            }
            const play = client.commands.get('play');
            play.run(client, message, { MusicDB });
        }
        // const msg = await message.channel.messages.fetch(MusicDB.musicMessageId);
    }
}