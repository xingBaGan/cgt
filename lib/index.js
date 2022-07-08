const program = require('commander');
const clone = require('./cloneTemplate');
const fs = require('fs');
const logger = require('./utils/logger');
//获取模板生成项目 cgt create [options] <app-name>
let names = ['project-name', 'repository']
let command = names.reduce((acc, name) => {
  return acc + `[${name}]`
},'')
program
  .command(`create ${command}`)
  .option('-d, --dir <dir>', '项目目录')
  .option('-p, --preset', '使用预设配置')
  .description('create a new project from a template')
  .action(function(...args) {
    let payload = {}
    let command = args.slice(-1)[0];
    // 获取names 对应的值
    let values = command.args ;
     for(let i = 0; i < names.length; i++){
      //只有存在值，才放入payload ,接下来会根据此处来决定执行的流程
        if(values[i]){
          payload[names[i]] = values[i]
        }
     }
     let options = args.slice(-2,-1);
     if (fs.existsSync(payload['project-name'])) {
          logger.error(`${payload['project-name']} file already exists`);
          return;
      }
      clone.run(payload,options[0]);
  })

program
  .version(`cgt@${require("../package.json").version}`);

program.parse(process.argv);
