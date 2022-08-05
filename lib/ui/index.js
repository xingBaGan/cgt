const chalk = require('chalk');
const { buildSchematicsListAsTable } = require('./table');
const { EMOJIS } = require('./emojis');
const ERROR_PREFIX = chalk.bgRgb(210, 0, 75).bold.rgb(0, 0, 0)(
    ' Error ',
);
const INFO_PREFIX = chalk.bgRgb(60, 190, 100).bold.rgb(0, 0, 0)(
    ' Info ',
);
const MESSAGES = {
    PROJECT_SELECTION_QUESTION: 'Which project would you like to generate to?',
    LIBRARY_PROJECT_SELECTION_QUESTION:
        'Which project would you like to add the library to?',
    DRY_RUN_MODE: 'Command has been executed in dry run mode, nothing changed!',
    PROJECT_INFORMATION_START: `${EMOJIS.ZAP}  We will scaffold your app in a few seconds..`,
    RUNNER_EXECUTION_ERROR: (command) =>
        `\nFailed to execute command: ${command}`,
    PACKAGE_MANAGER_QUESTION: `Which package manager would you ${EMOJIS.HEART}  to use?`,
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `Installation in progress... ${EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPDATE_IN_PROGRESS: `Installation in progress... ${EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_UPGRADE_IN_PROGRESS: `Installation in progress... ${EMOJIS.COFFEE}`,
    PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS: `Package installation in progress... ${EMOJIS.COFFEE}`,
    GIT_INITIALIZATION_ERROR: 'Git repository has not been initialized',
    PACKAGE_MANAGER_INSTALLATION_SUCCEED: (name) =>
        name !== '.'
            ? `${EMOJIS.ROCKET}  Successfully created project ${chalk.green(name)}`
            : `${EMOJIS.ROCKET}  Successfully created a new project`,
    GET_STARTED_INFORMATION: `${EMOJIS.POINT_RIGHT}  Get started with the following commands:`,
    CHANGE_DIR_COMMAND: (name) => `$ cd ${name}`,
    START_COMMAND: (name) => `$ ${name} run start`,
    PACKAGE_MANAGER_INSTALLATION_FAILED: (commandToRunManually) =>
        `${EMOJIS.SCREAM}  Packages installation failed!\nIn case you don't see any errors above, consider manually running the failed command ${commandToRunManually} to see more details on why it errored out.`,
    // tslint:disable-next-line:max-line-length
    NEST_INFORMATION_PACKAGE_MANAGER_FAILED: `${EMOJIS.SMIRK}  cannot read your project package.json file, are you inside your project directory?`,
    LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE: (name) =>
        `Unable to install library ${name} because package did not install. Please check package name.`,
    LIBRARY_INSTALLATION_FAILED_NO_LIBRARY: 'No library found.',
    LIBRARY_INSTALLATION_STARTS: 'Starting library setup...',
    SUCCESS_INSTALL_PACKAGE: (name) => `${EMOJIS.ROCKET} Successfully installed package ${name}`,
};

module.exports = {
    ERROR_PREFIX,
    INFO_PREFIX,
    MESSAGES, 
    buildSchematicsListAsTable
};
