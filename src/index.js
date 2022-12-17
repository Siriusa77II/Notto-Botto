const { Client, GatewayIntentBits, Collection } = require("discord.js");
const token = require("../config.json");
const client = new Client({
    allowedMention: { parse: [ "users", "roles" ]},
    intents: [ GatewayIntentBits.Guilds ]
});

client.on("ready", (client) => {
    console.log(`Logged in as ${client.user.tag}!`)
});

client.on("interactionCreate", async (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    switch (commandName) {
        case "ping":
            interaction.reply("Pong!")
            break;
        case "server":
            interaction.reply(`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount}members!`)
            break
        case "user": 
        interaction.reply(`You are ${interaction.author.tag} and you are ${interaction.author.bot ? "a bot" : "not a bot" }!`)
            break
        default:
            interaction.reply(`Unkinown Command \`${commandName}\``)
            break;
    }
})


client.login(token)