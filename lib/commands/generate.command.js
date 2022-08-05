const program = require('commander');
// const clone = require('./cloneTemplate');
const exp = require('constants');
const fs = require('fs');
const logger = require('../utils/logger');
const generateAction = require('../actions/generate.action');
const schematicPackages = require('../../configs/schematic.json')
const { packagePayloadInCommand, getCommandPrompt } = require('../utils/adpater');
const chalk = require('chalk');
//获取模板生成项目 cgt generate [schematic] [name]
let names = ['schematic', 'name']
let commandPrompt = getCommandPrompt(names);
const { buildSchematicsListAsTable } = require('../ui');
const { removeSchematicPackage } = require('../package-manager/schematicsManager');
module.exports = {
    load: function (program) {
        program.command(`generate ${commandPrompt}`)
            .alias('g')
            // .option('-d, --dir <dir>', '项目目录')
            // .option('-p, --preset', '使用预设配置')
            .description(buildDescription())
            .action(function (...args) {
                // generate|g [options] <schematic> [name] <path> 
                let command = args.slice(-1)[0];
                // 获取names 对应的值
                let payload = packagePayloadInCommand(command, names);
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
function buildDescription() {
    let packageNames;
    try {
        packageNames = require('../../configs/schematic.json');
    } catch (e) {
        logger.error('please check the configs/schematic file');
    }
    if (!packageNames.length) {
        return chalk.redBright(
            'No schematic packages found. please use "cgt add <packageName>" to install the schematic package,for example: "cgt add @nestjs/schematics"'
        );
    }
    return (
        'generate a template code file.\n' +
        packageNames.map(packageName => {
            //  尝试 获取package ，失败就移除，配置文件中的package
            try {
                require(`${packageName}`);
                return `  Schematics available on ${chalk.bold(
                    packageName,
                )} collection:\n` + buildSchematicsListAsTable(getSchematicInPackageName(packageName)) + '\n';
            } catch (e) {
                // removeSchematicPackage(packageName);
                // console.log(chalk.red(`${packageName} is not a valid package, please check the configs/schematic file`));
                return ''
            }
        })
    )
}

function getSchematicInPackageName(packageName) {
    let collection;
    try {
        collection = require(`${packageName}/dist/collection.json`);
    } catch (e) {
        collection = require(`${packageName}/src/collection.json`);
        logger.error(`${packageName} is not a valid package`);
    }
    /** schematics :
     *  {
     *    "application": {
                "factory": "./lib/application/application.factory#main",
                "description": "Create a Nest application.",
                "schema": "./lib/application/schema.json",
                "aliases": []
            },
            ....
     *  }
     */
    let schematics = [];
    if (collection) {
        for (let key in collection.schematics) {
            schematics.push({
                name: key,
                alias: collection.schematics[key].aliases ? collection.schematics[key].aliases[0] : '',
                description: collection.schematics[key].description
            });
        }
    }
    return schematics;
}
