const program = require('commander');
const CommandLoader = require('./commands/command.loader');


const bootstrap = (argv = process.argv)=>{
  program
      .version(`cgt@${require("../package.json").version}`);
  let commandLoader = new CommandLoader();
  commandLoader.load(program);
  program.parse(argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
