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
const download = require('download-git-repo');
const { resolve } = require('path')
const logger = require('../utils/logger');

const templates = require('../../configs/templates.json')
const spinner = ora('downloading template...');


//从预设模板下载模式
let presetMode = false;
let currentTemplateInfo = {
    url: "https://github.com/easy-wheel/ts-vue",
    description: "",
    name: "",
}
const arg_input_map = {
    'project-name': {
        type: 'input',
        name: 'project-name',
        default: 'startup',
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
    'repository': {
        // GitHub - github:owner/name or simply owner/name
        // GitLab - gitlab:owner/name
        // Bitbucket - bitbucket:owner/name
        type: 'input',
        message: 'please input the repository(owner/name) or repository url address:',
        name: 'repository',
        default: 'xingBaGan/jest_boilerplate',
        validate(val) {
            // if(val.indexOf('https://') !== -1){
            //     return 'please input the repository(owner/name)'
            // }
            return true
        }
    }
    //todo: version , repo, license, 
}

const downloadTemplate = function ({ projectName, repository = 'xingBaGan/jest_boilerplate' }) {
    currentTemplateInfo.url = repository
    currentTemplateInfo.name = repository.split('/') && repository.split('/').slice(-1)[0];
    download(repository, projectName, function (err) {
        if (err) {
            logger.error("模板加载失败，请重试")
            spinner.fail();
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
        currentTemplateInfo.description = _data.description
        let str = JSON.stringify(_data, null, 4);
        // 写入文件
        fs.writeFile(`${process.cwd()}/${projectName}/package.json`, str, function (err) {
            if (err) throw err;
        })
        spinner.succeed();
        if (!presetMode) {
            let questions = [
                {
                    type: 'confirm',
                    name: 'shouldPreset',
                    message: 'Do you want to set it to preset value?',
                    default: false
                }
            ]
            //下载成功，询问是否缓存模板
            inquirer.prompt(questions).then(answers => {
                let shouldPreset = answers.shouldPreset
                cachePreset(shouldPreset)
            })
        }
    });
}

function cachePreset(shouldPreset) {
    //不是从预设下载，并且希望缓存
    if (shouldPreset && !presetMode) {
        //写入配置文件
        let setPresetQuestions = [
            {
                type: 'input',
                name: 'presetName',
                message: 'please input the preset name:',
                default: () => {
                    return currentTemplateInfo.name
                }
            },
            {
                type: 'input',
                name: 'description',
                message: 'please input the preset description:',
                default: () => {
                    return currentTemplateInfo.description
                }
            }
        ]
        inquirer.prompt(setPresetQuestions).then(answers => {
            let presetName = answers.presetName
            currentTemplateInfo.description = answers.description
            delete currentTemplateInfo.name
            templates[presetName] = currentTemplateInfo
            let data = JSON.stringify(templates, null, 4);
            // console.log(answers,data)
            fs.writeFile(`${resolve(process.cwd(), './configs/templates.json')}`, data, function (err, data) {
                if (err) throw err;
            })
        })

    }
}
module.exports = {
    /**
     * 
     * @param {Input} inputs 
     * @param {Input} options 
     */
    handle: function (inputs, options) {
        logger.debug(JSON.stringify(inputs, null, 4), JSON.stringify(options, null, 4));
        //如果没有传入参数，提示输入
        for (let key in inputs) {
            if (key in arg_input_map) {
                delete arg_input_map[key];
            }
        }
        if ('repository' in inputs) {
            delete arg_input_map['repository'];
        }
        let questions = Object.values(arg_input_map);
        ///存在预设值，就不需要重复输入仓库地址了
        if (options.preset) {//如果是预设模式
            presetMode = true;
            questions.push({
                type: 'list',
                name: 'preset',
                choices: Object.keys(templates),
                message: 'Please select a preset:',
            })
        }

        // console.log(questions);
        inquirer.prompt(questions).then(answers => {
            logger.debug(JSON.stringify(answers, null, 4));
            const projectName = answers['project-name'] || inputs['project-name'];
            let repository = answers.repository || inputs.repository;
            const preset = answers.preset;
            //如果输入 -p preset，则使用preset模板
            if (preset) {
                const tpl = templates[preset];
                repository = tpl.url;
            }
            logger.debug(projectName, repository);
            //https://jestjs.io/docs/environment-variables
            if (process.env.NODE_ENV === 'test') {
                console.info('test mode:', projectName, repository);
                spinner.succeed();
                return;
            }else{
                try{
                    spinner.start();
                    downloadTemplate({ projectName, repository })
                }catch{
                    logger.error("下载模板失败，请检查url")
                    spinner.fail();
                }
            }
        })
    }
}