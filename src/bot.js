const discord = require("discord.js");
const config = require("../config/botConfig.json")

const serve = require('./proxy/serve')
const client = new discord.Client({ intents: [discord.IntentsBitField.Flags.Guilds, discord.IntentsBitField.Flags.GuildMessages, discord.IntentsBitField.Flags.GuildPresences] });
const eventHandler = require('./handlers/eventHandler')
//const { Commands } = require('./commands/')

serve()
require('dotenv').config()



eventHandler(client);




client.login(process.env.TOKEN)