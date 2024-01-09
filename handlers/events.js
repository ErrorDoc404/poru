const fs = require('fs');

module.exports = (client) => {
    fs.readdir('./events/', async (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            const evt = require(`../events/${file}`);
            let evtName = file.split('.')[0];
            client.on(evtName, evt.bind(null, client));
            client.logger.events(`Loaded event '${evtName}'`);
        });
    });
}