function packagePayloadInCommand(command,names) {
    let payload = {}
    let values = command.args;
    for (let i = 0; i < names.length; i++) {
        //只有存在值，才放入payload ,接下来会根据此处来决定执行的流程
        if (values[i]) {
            payload[names[i]] = values[i]
        }
    }
    return payload;
}
/**
 * @param {Array} names 命令的参数名称 例如 ['project-name', 'repository']
 * @return {string}  commandPrompt 命令的参数提示 例如 '[project-name] [repository]'
 */
function getCommandPrompt(names){
    let commandPrompt = names.reduce((acc, name) => {
        return acc + `[${name}]`
    }, '')
    return commandPrompt
}

module.exports = {
    packagePayloadInCommand,
    getCommandPrompt
}

