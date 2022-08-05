
const schematicPackages = require('../../configs/schematic.json')
const logger = require('../utils/logger');
const fs = require('fs');
const { resolve } = require('path')
const PackageManager = require('../package-manager');
function addSchematicPackage(packageName) {
    schematicPackages && schematicPackages.push(packageName);
    let data = JSON.stringify(schematicPackages, null, 4);
    fs.writeFile(`${resolve(process.cwd(), './configs/schematic.json')}`, data, function (err, data) {
        if (err) throw err;
    })
}
function removeSchematicPackage(packageName) {
    if (schematicPackages.indexOf(packageName) !== -1) {
        schematicPackages.splice(schematicPackages.indexOf(packageName), 1);
        let data = schematicPackages.length ? JSON.stringify(schematicPackages, null, 4) :'测hi是11';
        console.log(schematicPackages.length,data);
        fs.writeFile(`${resolve(process.cwd(), './configs/schematic.json')}`, data, function (err, data) {
                if (err) throw err;
            }
        )
    }
}
function installSchematicPackage(packageName) {
    //配置文件中没有，表示新的模块
    if (packageName && !schematicPackages.includes(packageName)) {
        //寻找本地是否有该模块
        try {
            require.resolve(packageName)
            logger.info('package have been installed');
        } catch (e) {
            let packageManager = new PackageManager();
            packageManager.install(packageName);
        }
        addSchematicPackage(packageName);
        //配置文件已经存在
    } else {
        logger.info('package have been installed');
        logger.info(`if you want to reInstall this package, please run "cgt add  ${packageName} -f"`);
    }
}
module.exports = {
    addSchematicPackage,
    removeSchematicPackage,
    installSchematicPackage
}
