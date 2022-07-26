const program = require('commander');
const CommandLoader = require('./commands/command.loader');


const bootstrap = ()=>{
  program
      .version(`cgt@${require("../package.json").version}`);
  let commandLoader = new CommandLoader();
  commandLoader.load(program);
  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

bootstrap();
