const Discord = require(`discord.js`)
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Your Description'),
    async execute(message) {
        message.channel.send({
            content: "Pong!"
        });
    }
}