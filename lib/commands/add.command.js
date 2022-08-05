const program = require('commander');
// const clone = require('./cloneTemplate');
const exp = require('constants');
const fs = require('fs');
const logger = require('../utils/logger');
const PackageManager = require('../package-manager');
const { resolve } = require('path')
// const addAction = require('../actions/add.action');
const { packagePayloadInCommand, getCommandPrompt } = require('../utils/adpater');
const { addSchematicPackage, installSchematicPackage } = require('../package-manager/schematicsManager');
//获取模板生成项目 cgt add [options] <app-name>
let names = ['packageName']
let commandPrompt = getCommandPrompt(names);

module.exports = {
    load: function (program) {
        program.command(`add ${commandPrompt}`)
            .alias('a')
            .option('-f, --force ', 'force install schematic module')
            .description('add a schematics package')
            .action(function (...args) {
                let command = args.slice(-1)[0];
                let payload = packagePayloadInCommand(command, names);
                let options = args.slice(-2, -1);
                if (fs.existsSync(payload['project-name'])) {
                    logger.error(`${payload['project-name']} file already exists`);
                    return;
                }
                /** payload:{
                 *  packageName: ''
                 * } 
                 * */
                // addAction.handle(payload, options[0]);
                
                if (!payload['packageName']) {
                    logger.error('packageName is required');
                    return;
                }
                if (options[0].force) {
                    let packageManager = new PackageManager();
                    packageManager.install(payload['packageName']);
                    return;
                }
                installSchematicPackage(payload['packageName'])
            })
    }
}

