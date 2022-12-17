const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("reply with information about the server."),
    async execute(client, interaction) {
        interaction.reply(`This server is called ${interaction.guild.name} and has ${interaction.guild.memberCount}members!`)
    }
}