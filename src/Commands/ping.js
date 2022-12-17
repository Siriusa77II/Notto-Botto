const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("reply with the latency between the bot and discord."),
    async execute(client, interaction) {
        const latency = client.ws.ping;
        interaction.reply(`Pong! Latency: ${latency}ms`);
    }
}