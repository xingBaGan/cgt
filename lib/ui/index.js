const chalk = require('chalk');

const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(
    ' Error ',
);
const INFO_PREFIX = chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(
    ' Info ',
);
module.exports = {
    ERROR_PREFIX,
    INFO_PREFIX,
};
