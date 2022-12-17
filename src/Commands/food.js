const { SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("food")
        .setDescription("Select menu test"),
    async execute(client, interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
            .setCustomId("FavFood")
            .setPlaceholder("Select your favorite food")
            .addOptions(
                {
                    label: "Pizza",
                    value: "pizza",
                    description: "One steaming hot one topping pizza from dominos pizza"
                },
                {
                    label: "Burger",
                    value: "burger",
                    description: "One delicious burger from McDonalds aka just a bigmac tbh."
                },
                {
                    label: "Ramen",
                    value: "ramen",
                    description: "One delicious ramen from Sushiya."
                }
            )
        )
        interaction.reply({ content: "Select your favorite food", components: [row] });
    }
}