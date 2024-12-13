import('node-fetch')
const { ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js');



async function ping(interaction, message) {
    let links = []
    let ownerNames = []
    for (let i = 0; i<3;i++) {
      if (interaction.options.get(`link${(i+1)}`)) {
        links.push(interaction.options.get(`link${(i+1)}`).value)
        ownerNames.push(interaction.options.get(`name${(i+1)}`).value)
      } else break;  
    }

    const placeId = 16732694052

    let msg = "- __LEETS PUBLIC AURORA DROP  __"

    try {
      const res1 = await fetch(`http://localhost:3000/proxy/private-servers?gameId=${placeId}`);
      const data = await res1.json();
      for (const server of data.data) {
        for (let i = 0; i < ownerNames.length; i++) {
          if (server.owner.name === ownerNames[i]) {
            msg += `\n\n> - **Server ${i+1} **\n> -Currently ${server.players.length}/${server.maxPlayers} Players-\n`;
            msg += `link: <${links[i]}>\n`; 
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
    if (msg === "- __LEETS PUBLIC AURORA DROP  __") msg = "there was an error with the req ig"
    await message.edit(msg);
    setTimeout( async ()=>{await ping(interaction, message)}, 5000)
}


module.exports = {
  name: 'sendlinks',
  description: 'send the private server links(the player numbers will get updated)',
  options: [
    {
      name: 'link1',
      description: 'link1',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
    {
      name: 'name1',
      description: 'private server owner name1',
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.Administrator],

  callback: async (client, interaction) => {
    let links = []
    let ownerNames = []
    for (let i = 0; i<3;i++) {
      if (interaction.options.get(`link${(i+1)}`)) {
        links.push(interaction.options.get(`link${(i+1)}`).value)
        ownerNames.push(interaction.options.get(`name${(i+1)}`).value)
      } else break;  
    }

    const placeId = 16732694052

    let msg = "- __LEETS PUBLIC AURORA DROP  __"

    try {
      const res1 = await fetch(`http://localhost:3000/proxy/private-servers?gameId=${placeId}`);
      const data = await res1.json();
      for (const server of data.data) {
        for (let i = 0; i < ownerNames.length; i++) {
          if (server.owner.name === ownerNames[i]) {
            msg += `\n\n> - **Server ${i+1} **\n> -Currently ${server.players.length}/${server.maxPlayers} Players-\n`;
            msg += `link: <${links[i]}>\n`; 
          }
        }
      }
    } catch (err) {
      console.error(err);
    }
    if (msg === "- __LEETS PUBLIC AURORA DROP  __") msg = "there was an error with the req ig"
    const message = await interaction.reply({ content: msg, fetchReply: true });
    setTimeout( async ()=>{await ping(interaction, message)}, 5000)
  }
}
