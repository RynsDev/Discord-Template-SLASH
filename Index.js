const Discord = require('discord.js')
let config = require("./config.json")
const Client = new Discord.Client({
    intents: [Object.keys(Discord.Intents.FLAGS)]
})
const {
    Message,
    Intents,
    Permissions,
    MessageEmbed,
    Collection,
    Interaction,
    BaseCommandInteraction
} = require("discord.js")
const db = require("quick.db")
global.db = db
Client.commands = new Discord.Collection()
Client.slashCommands = new Discord.Collection();
global.client = Client
let fs = require('fs');
function registerSlashCommands() {
    let slashCommandsDirs = fs.readdirSync('./slashCommands')
    slashCommandsDirs.forEach(slashCommandsDir => {
        let slashCommands = fs.readdirSync(`./slashCommands/${slashCommandsDir}`)
        slashCommands.forEach(slashCommand => {
            let slashCommandFile = require(`./slashCommands/${slashCommandsDir}/${slashCommand}`)
            Client.slashCommands.set(slashCommandFile.data.name, slashCommandFile)
            console.log("Registered slash command: " + slashCommandFile.data.name)
        })
    })
}

function registerDiscordEvents() {
    let discordEventsDir = fs.readdirSync('./Events')
    for (let i = 0; i < discordEventsDir.length; i++) {
        let discordEvent = require('./Events/' + discordEventsDir[i])
        Client.on(discordEvent.config.event, discordEvent)
        console.log("Registered event: " + discordEvent.config.event)
    }
}

Client.once('ready', () => {
    let commands = []
    let commandFiles = fs.readdirSync(`./SlashCommands`).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const command = require(`./SlashCommands/${file}`);
        commands.push(command.data.toJSON())
        Client.slashCommands.set(command.data.name, command);
    }
})


Client.login(config.token)
registerSlashCommands()
registerDiscordEvents()
console.log("CLIENT LOGGED IN")
