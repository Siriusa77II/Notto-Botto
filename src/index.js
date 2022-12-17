const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { readFileSync, readdirSync } = require("fs");
const path = require("path");
const token = require("../config.json");
const client = new Client({
    allowedMention: { parse: [ "users", "roles" ]},
    intents: [ GatewayIntentBits.Guilds ]
});

// Event Handler
const eventPath = path.join(__dirname, "Events");
const eventFiles = readFileSync(eventPath).filter(file => file.endsWith(".js"));
for (const file of eventFiles) {
    const filePath = path.join(eventPath, file);
    const event = require(filePath);
    if(event.once) {
        client.once(event.name, (...args) => execute(client, ...args))
    } else {
        client.on(event.name, (...args) => execute(client, ...args));
    }
}

// Command Handler
client.commands = new Collection();
const commandPath = path.join(__dirname, "Commands");
const commandFiles = readdirSync(commandPath).filter(file => file.endsWith(".js"));
for (const file of commandFiles) {
    const filePath = path.join(commandPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

client.login(token)