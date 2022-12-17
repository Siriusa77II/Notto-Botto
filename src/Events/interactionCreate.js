module.exports = {
    name: "interactionCreate",
    execute(client, interaction) {
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
    }
}