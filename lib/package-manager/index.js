const ora = require('ora');
const { MESSAGES } = require('../ui');
const execa = require("execa");
const chalk = require('chalk');
const { join } = require('path');
const { normalizeToKebabOrSnakeCase } = require('../utils/formatting');
class PackageManager {
    constructor() {
        this.cli = {
            install: 'install',
            add: 'install',
            update: 'update',
            remove: 'uninstall',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--silent',
        }
        this.runner = {
            run: async (command, args, options) => {
                const subprocess = execa('npm ' + command, [...args], options);
                return subprocess;
            }
        }
    }
    // 安装命名
    async install(packageName) {
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: MESSAGES.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        })
        spinner.start();
        try {
            const commandArgs = `${this.cli.install} ${this.cli.silentFlag}`;
            // const collect = true;
            // const normalizedDirectory = normalizeToKebabOrSnakeCase(directory);
            await this.runner.run(
                commandArgs,
                [packageName],
                {

                },
            );
            spinner.succeed();
            console.info(MESSAGES.SUCCESS_INSTALL_PACKAGE(packageName));
        } catch (e) {
            spinner.fail();
            const commandArgs = this.cli.install;
            console.error(e);
            // const commandToRun = this.runner.rawFullCommand(commandArgs);
            // console.error(
            //     chalk.red(
            //         MESSAGES.PACKAGE_MANAGER_INSTALLATION_FAILED(
            //             chalk.bold(commandToRun),
            //         ),
            //     ),
            // );

        }
    }
}
module.exports = PackageManager