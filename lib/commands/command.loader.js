
let createCommand = require("./create.command")
let generateCommand = require("./generate.command")
const chalk = require('chalk');
const { ERROR_PREFIX } = require('../ui');

module.exports =  class CommandLoader {
      load(program){
        //混入某些功能,像是组装，但是更像 expand fn
        // new NewCommand(new NewAction()).load(program);
        createCommand.load(program);
        generateCommand.load(program);
        this.handleInvalidCommand(program);
    }

     handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(
                `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
                program.args.join(' '),
            );
            console.log(
                `See ${chalk.red('--help')} for a list of available commands.\n`,
            );
            process.exit(1);
        });
    }
}
