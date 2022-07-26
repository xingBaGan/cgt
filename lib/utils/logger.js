//https://juejin.cn/post/6973102969076219941
const chalk = require('chalk');
const DEBUG = false;
// 普通日志
const info = (str) => {
    console.log(chalk.green(`[INFO]： ${str}`));
}

// 警告日志
const warring = (str) => {
    console.log(chalk.yellowBright(`[WARRING]： ${str}`));
}

// 成功日志
const success = (str) => {
    console.log(chalk.greenBright(`[SUCCESS]： ${str}`));
}

// 报错日志
const error = (str) => {
    console.log(chalk.redBright(`[ERROR]： ${str}`));
}

// debug日志
const debug = (...args) => {
    if(!DEBUG) return;
    let objs = JSON.parse(JSON.stringify(Array.from(args)));
    objs.forEach(obj => {
        if(typeof obj === 'object'){
            obj = JSON.stringify(obj,null,4);
        }
    })
    console.log(chalk.blueBright(`[DEBUG]`, ...objs));
}
module.exports = {
    info,
    warring,
    success,
    error,
    debug
}