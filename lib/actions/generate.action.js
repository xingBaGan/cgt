/**
 * create 
 * @param {String} projectName project name
 * @param {String} repository template git url
 * @option {Boolean}  preset 是否设置预设
 */

const fs = require('fs');
//https://github.com/SBoudrias/Inquirer.js#documentation
const inquirer = require('inquirer');
//https://segmentfault.com/q/1010000012493731/a-1020000015334943
const ora = require('ora');// 版本取6.0.0 之前的版本，6.0.0之后的版本为 esm 版本
// const execa = require("execa")
const { cli } = require("../utils/cli")
const logger = require('../utils/logger');
const packageNames = require("../../configs/schematic.json")
/**
 * @nestjs\schematics\dist\collection.json
 * 获取当前项目的的schematics
 **/
function getSchematicsThroughPackage(packageName) {
    let collection;
    try{
        collection = require(`${packageName}/dist/collection.json`);
    }catch(e){
        collection = require(`${packageName}/src/collection.json`);
    }
    let schematics = collection&&Object.keys(collection.schematics);
    //增加alias
    if (collection&&collection.schematics){
        Object.keys(collection.schematics).forEach(key=>{
            if (collection.schematics[key].aliases){
                schematics.push(...collection.schematics[key].aliases);
            }
        })
    }
    return collection?schematics:[];
}

const arg_input_map = {
    'schematic': {
        type: 'select',
        name: 'schematic',
        message: 'please select the schematic:',
    },
    'name': {
        // GitHub - github:owner/name or simply owner/name
        // GitLab - gitlab:owner/name
        // Bitbucket - bitbucket:owner/name
        type: 'input',
        message: 'please input the files name(unique):',
        name: 'name',
        validate(val) {
            // if(val.indexOf('https://') !== -1){
            //     return 'please input the repository(owner/name)'
            // }
            return true
        }
    }
    //todo: version , repo, license, 
}



module.exports = {
    /**
     * 
     * @param {Input} inputs 
     * @param {Input} options 
     */
    handle: function (inputs, options) {
        //如果没有传入参数，提示输入
        for (let key in inputs) {
            if (key in arg_input_map) {
                delete arg_input_map[key];
            }
        }
        let questions = Object.values(arg_input_map);
        inquirer.prompt(questions).then(async (answers) => {
            const schematic = answers['schematic'] || inputs['schematic'];
            let name = answers.name || inputs.name;
            logger.debug(JSON.stringify(answers, null, 4), JSON.stringify(inputs, null, 4), JSON.stringify(options, null, 4));
            // 对应的schematic的package name
            let currentPackage;
            let schematicAll = packageNames.reduce((per,currName,index)=>{
                let schematics = getSchematicsThroughPackage(currName)
                //找到对应的package
                if(schematic&&schematics.includes(schematic)){
                    currentPackage = currName
                }
                per[currName] = schematics
                return per;
            },{})
            logger.debug(schematicAll, currentPackage)
            if(!currentPackage){
                logger.error('can not found the schematic')
                logger.info('please use "cgt add <packageName>" to install the schematic package,for example: "cgt add @nestjs/schematics"')
                return;
            }
            await cli(`${findClosestSchematicsBinary()} ${currentPackage}:${schematic} --name=${name}`, `node`)
        })
    }
}
function findClosestSchematicsBinary() {
    try {
        return require.resolve(
            '@angular-devkit/schematics-cli/bin/schematics.js',
            { paths: module.paths },
        );
    } catch {
        throw new Error("'schematics' binary path could not be found!");
    }
}