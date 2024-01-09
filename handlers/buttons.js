const fs = require('fs');

module.exports = (client) => {
    fs.readdir('./buttons/', async (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith('.js')) return;
            const button = require(`../buttons/${file}`)
            let btnName = file.split('.')[0];
            client.Buttons.set(btnName, button);
            client.logger.log(`Loaded button '${btnName}'`);
        });
    });
}