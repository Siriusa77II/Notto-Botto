const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("ban a user")
        .addMentionableOption(option => 
            option
            .setName("user")
            .setDescription("The user you want to ban")
            .setRequired(true))
            .addStringOption(option => 
                option
                .setName("reason")
                .setDescription("The reason for the ban")
                .setRequired(false)
                ),
    async execute(client, interaction) {
        // permissions check
        if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({ content: "You don't have the permissions to ban members!", ephemeral: true });
        const myself = interaction.guild.members.cache.get(client.user.id);
        if(myself.permissions.has(PermissionFlagsBits.BanMembers)) return interaction.reply({content: "I dont have the permissions to ban anyone!", ephemeral: true});
        const user = interaction.options.getMentionable("user");
        const reason = interaction.options.getString("reason");
        if(!user) return interaction.reply({ content: "An error happened, I was unable to find the user you want to ban", ephemeral: true });
        if(user.id == client.user.id) return interaction.reply({ content: "I can't ban myself.", ephemeral: true });
        if(!user.bannable) return interaction.reply({ content: "I can't ban this user!", ephemeral: true });
        interaction.guild.members.ban(user, { reason: reason });
    }
}