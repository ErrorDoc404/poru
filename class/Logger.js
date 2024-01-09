const colors = require("colors");

class Logger {

    log(Text) {
        let d = new Date();
        console.log(
            colors.green(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.green(" | " + Text)
        );
    }

    warn(Text) {
        let d = new Date();
        console.log(
            colors.yellow(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.yellow(" | " + Text)
        );
    }

    error(Text) {
        let d = new Date();
        console.error(
            colors.red(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.yellow(" | " + Text)
        );
    }

    commands(Text) {
        let d = new Date();
        console.log(
            colors.brightMagenta(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.brightMagenta(" | " + Text)
        );
    }

    events(Text) {
        let d = new Date();
        console.log(
            colors.cyan(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.cyan(" | " + Text)
        );
    }

    playSong(song, queueLength) {
        let d = new Date();
        console.error(
            colors.yellow(
                `[${d.getDate()}:${d.getMonth()}:${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}]`
            ) + colors.yellow(" | In Queue [" + queueLength + "] | Current Track [") + colors.cyan(`${song}`) + colors.yellow(']')
        );
    }
}

module.exports = Logger;
