const path = require('path');
const scrapeFolder = require('../utils/scrapeFolder');

module.exports = (client) => {
  const eventFolders = scrapeFolder(path.join(__dirname, '..', 'events'), true);

  for (const eventFolder of eventFolders) {
    const eventFiles = scrapeFolder(eventFolder);
    eventFiles.sort((a, b) => a > b);
    const eventName = eventFolder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async (arg) => {
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile);
        await eventFunction(client, arg);
      }
    });
  }
};