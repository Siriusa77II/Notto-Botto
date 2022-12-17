const { Client, GatewayIntentBits } = require("discord.js");
const { readFileSync } = require("fs");
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

client.login(token)