const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("user")
        .setDescription("reply with information about the user"),
    async execute(client, interaction) {
        interaction.reply(`You are ${interaction.author.tag} and you are ${interaction.author.bot ? "a bot" : "not a bot" }!`)
    }
}