module.exports = (interaction) => {
    if (!interaction.isButton()) {
        let slashCommands = global.client.slashCommands;
        let command = slashCommands.get(interaction.commandName)
        if (!command) return;
        command.execute(interaction)
    }
}


module.exports.config = {
    event: "interactionCreate"
}