
let Table = require('cli-table3');
const chalk = require('chalk');
function buildSchematicsListAsTable(schematics){
    const leftMargin = '    ';
    const tableConfig = {
        head: ['name', 'alias', 'description'],
        chars: {
            'left': leftMargin.concat('│'),
            'top-left': leftMargin.concat('┌'),
            'bottom-left': leftMargin.concat('└'),
            'mid': '',
            'left-mid': '',
            'mid-mid': '',
            'right-mid': '',
        },
    };
    const table = new Table(tableConfig);
    for (const schematic of schematics) {
        table.push([
            chalk.green(schematic.name),
            chalk.cyan(schematic.alias),
            schematic.description,
        ]);
    }
    return table.toString();
}
module.exports = {
    buildSchematicsListAsTable
}