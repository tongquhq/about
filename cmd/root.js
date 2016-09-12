/**
 * Created by at15 on 2016/9/11.
 */
'use strict';

const Command = require('../lib/cli/command');
const Flag = require('../lib/cli/flag');
const versionCmd = require('./version');
const renderCmd = require('./render');

let rootCmd = new Command();
rootCmd.name = 'about-cli';
rootCmd.description = 'A static about us/me & blog site generator, build with delay by @tongquhq';
rootCmd.setFunc((app, args, flags) => {
    if (flags.version) {
        versionCmd.executeCurrent(app, args, flags);
        return;
    }
    rootCmd.showHelp();
});
// add global flags
let verboseFlag = new Flag('verbose','debug level log', false);
verboseFlag.setAlias('v');
verboseFlag.global = true;
rootCmd.addFlag(verboseFlag);

// register commands
rootCmd.registerCommand(versionCmd);
rootCmd.registerCommand(renderCmd);

module.exports = rootCmd;