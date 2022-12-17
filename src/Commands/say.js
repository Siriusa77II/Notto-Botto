const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("reply with some user information"),
    async execute(client, interaction) {
        // create a modal
        const modal = new ModalBuilder()
        .setCustomId("modalSay")
        .setTitle("Say")

        // Create input field
        const messageInput = new TextInputBuilder()
        .setCustomId("inputMessage")
        .setLabel("Say Command!")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder("Say something!")

        // Create action row
        const actionRow = new ActionRowBuilder().addComponents(messageInput);
        // add action row to modal
        modal.addComponents(actionRow);

        // send modal
        await interaction.showModal(modal)
    }
}