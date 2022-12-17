const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("kick a user")
        .addMentionableOption(option => 
            option
            .setName("user")
            .setDescription("The user you want to kick")
            .setRequired(true))
            .addStringOption(option => 
                option
                .setName("reason")
                .setDescription("The reason for the kick")
                .setRequired(false)
                ),
    async execute(client, interaction) {
        // permissions check
        if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({ content: "You don't have the permissions to kick members!", ephemeral: true });
        const myself = interaction.guild.members.cache.get(client.user.id);
        if(myself.permissions.has(PermissionFlagsBits.KickMembers)) return interaction.reply({content: "I dont have the permissions to kick anyone!", ephemeral: true});
        const user = interaction.options.getMentionable("user");
        const reason = interaction.options.getString("reason");
        if(!user) return interaction.reply({ content: "An error happened, I was unable to find the user you want to kick", ephemeral: true });
        if(user.id == client.user.id) return interaction.reply({ content: "I can't kick myself.", ephemeral: true });
        if(!user.kickable) return interaction.reply({ content: "I can't kick this user!", ephemeral: true });
        interaction.guild.members.kick(user, { reason: reason });
    }
}