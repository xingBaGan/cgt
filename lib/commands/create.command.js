const program = require('commander');
// const clone = require('./cloneTemplate');
const exp = require('constants');
const fs = require('fs');
const logger = require('../utils/logger');
const createAction = require('../actions/create.action');
const { packagePayloadInCommand, getCommandPrompt } = require('../utils/adpater');

//获取模板生成项目 cgt create [options] <app-name>
let names = ['project-name', 'repository']
let commandPrompt = getCommandPrompt(names);

module.exports = {
    load:function(program){
        program.command(`create ${commandPrompt}`)
            .option('-d, --dir <dir>', '项目目录')
            .option('-p, --preset', '使用预设配置')
            .description('create a new project from a template')
            .action(function (...args) {
                let command = args.slice(-1)[0];
                if (command._name === 'create') {
                    // 获取names 对应的值
                    let payload = packagePayloadInCommand(command, names);
                    let options = args.slice(-2, -1);
                    if (fs.existsSync(payload['project-name'])) {
                        logger.error(`${payload['project-name']} file already exists`);
                        return;
                    }
                   /** payload:{
                    *   project-name: '',
                    *    repository: ''
                    * } 
                    * options:{
                    *   preset: true
                    *   dir: ''
                    * }
                    * */
                    createAction.handle(payload, options[0]);
                }
            })
    }
}