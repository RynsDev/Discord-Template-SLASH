const fs = require("fs");
const path = require("path");
let client = global.client
module.exports = (guild) => {
    console.log(`Registring guild ${guild.name} (${guild.id})`);
    let commandsDir = path.join("./slashCommands");
    fs.readdir(commandsDir, (err, files) => {
        if (err) throw err;
        files.forEach(async (file) => {
            let cmd = require(commandsDir + "/" + file);
            if (!cmd.data || !cmd.execute) return;
            let dataStuff = {
                name: cmd.data.name,
                description: cmd.data.description,
                options: cmd.data?.options,
            };

            let ClientAPI = client.api.applications(client.user.id);
            let GuildAPI = ClientAPI.guilds(guild.id);
            try {
                await GuildAPI.commands.post({ data: dataStuff });
            } catch (e) {
                console.log(e);
            }
        });
        console.log(`[POST] - GUILD.APPLICATION.COMMANDS (${guild.id}) - Response: 200 (OK)`)
    });
};


module.exports.config = {
    event: "guildCreate"
}