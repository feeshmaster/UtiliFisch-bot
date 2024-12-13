class Command {
    constructor(name, aliases=[], args, handler, cd) {
       this.triggers = []
       this.triggers.push(name, ...aliases)
       this.args = args
       this.handler = handler
       this.cd = cd
    }
    process(...args) {
       this.handler(args)
    }
}


module.exports = {
    Command: Command
}

//currently unused command temp