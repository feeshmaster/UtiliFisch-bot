const path = require('path')
const scrapeFolder = require('./scrapeFolder')


module.exports = (exceptions=[]) => {
    let localCommands = []

    const commandCategories = scrapeFolder(
        path.join(__dirname, '..', 'commands'),
        true
    )
    
    for (const commandCategory of commandCategories) {
        const commandFiles = scrapeFolder(commandCategory)
        for (const commandFile of commandFiles) {
            const commandObject = require(commandFile)
            if (exceptions.includes(commandObject.name)) {
                continue;
            }
            localCommands.push(commandObject)

        }
    }
    

    return localCommands
}