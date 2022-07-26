
let createCommand = require("./create.command")
// import { ERROR_PREFIX } from '../lib/ui';

module.exports =  class CommandLoader {
      load(program){
        //混入某些功能,像是组装，但是更像 expand fn
        // new NewCommand(new NewAction()).load(program);
        //   createAction.handle(program);
        createCommand.load(program);
        // this.handleInvalidCommand(program);
    }

    //  handleInvalidCommand(program) {
    //     program.on('command:*', () => {
    //         console.error(
    //             `\n${ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`,
    //             program.args.join(' '),
    //         );
    //         console.log(
    //             `See ${chalk.red('--help')} for a list of available commands.\n`,
    //         );
    //         process.exit(1);
    //     });
    // }
}
