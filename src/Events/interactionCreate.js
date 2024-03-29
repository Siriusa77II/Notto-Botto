module.exports = {
    name: "interactionCreate",
    execute(client, interaction) {

        // Modals Submit
        if(interaction.type == InteractionType.ModalSubmit) {
            const inputMessage = interaction.fields.getTextInputValue("inputMessage");
            const channel = interaction.guild.channels.cache.get(interaction.channelId);
            channel.send(inputMessage);
            interaction.reply({ content: "Message Sent!", ephemeral: true });
        }
        // Select Menu Submit
        if(interaction.isSelectMenu()){
            const selection = interaction.values[0];
            
            return interaction.update({ content: `You have selected ${selection}`, components: []})
        }
        // Slash commands Handler
        if(!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    const command = client.commands.get(commandName);
    if(!command) return;
    try {
         command.execute(client, interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply(`An error occured while executing this command\n\`\`\`${error.message}\`\`\``);
    }
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
    }
}