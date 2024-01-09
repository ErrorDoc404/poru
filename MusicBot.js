const { Client, Collection, GetewayIntentBits, GatewayIntentBits } = require('discord.js');
const { Poru } = require('poru');
const { AppleMusic } = require("poru-applemusic");
const { Spotify } = require("poru-spotify");
const ConfigFetcher = require('./config.js');
const Logger = require('./class/Logger.js');
const logger = new Logger();
const mongoose = require('mongoose');
const play = require("./music/play");
const GuildConfig = require("./mongoose/database/schemas/GuildConfig");
const BotStats = require("./mongoose/database/schemas/Stats");

class MusicBot extends Client {

    constructor(
        props = {
            failIfNotExists: true,
            allowedMentions: {
                parse: ['roles', 'users', 'everyone'],
                repliedUser: false,
            },
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        }
    ) {
        super(props);

        this.config = ConfigFetcher;

        this.musicMessage = [];

        this.skipSong = [];
        this.skipBy = [];
        this.twentyFourSeven = [];
        this.MusicPlayed = 0;
        this.CommandsRan = 0;
        this.InQueue = 0;
        this.guildQueue = [];
        this.currentSong = [];

        this.commands = new Collection();
        this.Buttons = new Collection();
        this.aliases = new Collection();
        this.SlashCommands = new Collection();

        var client = this;

        const applemusic = new AppleMusic({ contryCode: "in" }); // I dont know why its "contryCode" instead of "countryCode", ask paras for it xD.
        // const deezer = new Deezer();
        const spotify = new Spotify({
            clientID: this.config.Spotify.clientID,
            clientSecret: this.config.Spotify.clientSecret,
            clients: [{ clientID: this.config.Spotify.clientID, clientSecret: this.config.Spotify.clientSecret }], // its seem this is a bug from the plugin, so if u dont add this, it will throw an error.
        });

        client.poru = new Poru(client, client.config.lavalink, {
            library: 'discord.js',
            defaultPlatform: 'ytsearch',
            plugins: [spotify]
        });

        this.logger = logger;

        this.config.handlers.forEach((handler) => {
            require(`./handlers/${handler}`)(client);
        });

        this.commands.set('play', play);

    }

    log(Text) {
        logger.log(Text);
    }

    warn(Text) {
        logger.warn(Text);
    }

    error(Text) {
        logger.error(Text);
    }

    playSong(song, queueLength) {
        logger.playSong(song, queueLength);
    }

    build() {
        // TODO
        this.login(this.config.Token);
    }

    MongooseConnect() {
        mongoose.set('strictQuery', true);
        mongoose.connect(this.config.mongooseURL)
            .then(data => {
                this.warn(`Connected to ${data.connection.host}:${data.connection.port} database: ${data.connection.name}`);
            })
            .catch(err => { this.warn(err) });
    }

    GetMusic(GuildID) {
        return new Promise(async (res, rej) => {
            const findGuildConfig = await GuildConfig.findOne({ guildId: GuildID });
            res(findGuildConfig);
        });
    }

    RegisterSlashCommands() {
        require("./class/SlashCommand")(this);
    }

    DeRegisterGlobalSlashCommands() {
        require("./class/DeRegisterSlashGlobalCommands")(this);
    }

    DeRegisterGuildSlashCommands() {
        this.guilds.cache.forEach((guild) => {
            require("./class/DeRegisterSlashGuildCommands")(this, guild.id);
        });
    }
}

module.exports = MusicBot;