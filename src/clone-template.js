#!/usr/bin/env node
const fs = require('fs');
//https://github.com/SBoudrias/Inquirer.js#documentation
var inquirer = require('inquirer');
//https://segmentfault.com/q/1010000012493731/a-1020000015334943
const ora = require('ora');// 版本取6.0.0 之前的版本，6.0.0之后的版本为 esm 版本
var download = require('download-git-repo');

const spinner = ora('downloading template...');
const arg_input_map = {
    name:{
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate(val) {
            if (!val) {
                return 'Please enter a name';
            }
            if (fs.existsSync(val)) {
                return `${val} already exists`;
            } else {
                return true;
            }
        }
    },
    repository:{
        // GitHub - github:owner/name or simply owner/name
        // GitLab - gitlab:owner/name
        // Bitbucket - bitbucket:owner/name
        type: 'input',
        message: '请输入仓库名称(owner/name):',
        name: 'tplUrl',
        default: 'xingBaGan/jest_boilerplate'
    }
    //todo: version , repo, license, 
}

const downloadTemplate = function ({ projectName,repository = 'xingBaGan/jest_boilerplate' }) {
    download(repository, projectName, function (err) {
        if (err) {
            console.log("模板加载失败，请重试")
            return;
        }
        editFile({ projectName })
    })
}
const editFile = function ({ version = '0.0.1', projectName }) {
    // 读取文件
    fs.readFile(`${process.cwd()}/${projectName}/package.json`, (err, data) => {
        if (err) throw err;
        // 获取json数据并修改项目名称和版本号
        let _data = JSON.parse(data.toString())
        _data.name = projectName
        _data.version = version
        let str = JSON.stringify(_data, null, 4);
        // 写入文件
        fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function (err) {
            if (err) throw err;
        })
        spinner.succeed();
    });
}


module.exports = {
    run : function(payload){
        //如果没有传入参数，提示输入
        for(let key in payload){
            if(key in arg_input_map){
                delete arg_input_map[key];
            }
        }
        let questions = Object.values(arg_input_map);
        // console.log(questions);
        inquirer.prompt(questions).then(answers => {
            const projectName = answers.name || payload.name;
            const repository = answers.repository || payload.repository;
            spinner.start();
            downloadTemplate({ projectName,repository })
        })        
    }
}