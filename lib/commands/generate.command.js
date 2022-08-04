const program = require('commander');
// const clone = require('./cloneTemplate');
const exp = require('constants');
const fs = require('fs');
const logger = require('../utils/logger');
const generateAction = require('../actions/generate.action');
const { packagePayloadInCommand, getCommandPrompt } = require('../utils/adpater');
//获取模板生成项目 cgt generate [schematic] [name]
let names = ['schematic','name']
let commandPrompt = getCommandPrompt(names);
//get the payload

module.exports = {
    load: function (program) {
        program.command(`generate ${commandPrompt}`)
            // .option('-d, --dir <dir>', '项目目录')
            // .option('-p, --preset', '使用预设配置')
            .description('generate a template code file')
            .action(function (...args) {
                // generate|g [options] <schematic> [name] <path> 
                let command = args.slice(-1)[0];
                    // 获取names 对应的值
                    let payload = packagePayloadInCommand(command,names);
                    let options = args.slice(-2, -1);
                    // console.log(payload,options);
                    /** payload:{
                     *   project-name: '',
                     *    repository: ''
                     * } 
                     * options:{
                     *   preset: true
                     *   dir: ''
                     * }
                     * 
                     * 
                     * */
                    generateAction.handle(payload, options[0]);
            })
    }
}