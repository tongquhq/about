/**
 * Created by at15 on 2016/9/11.
 */
'use strict';

const Command = require('../lib/cli/command');
const versionCmd = require('./version');

let rootCmd = new Command();
rootCmd.name = 'about-cli';
rootCmd.description = 'A static about us/me & blog site generator, build with delay by @tongquhq';
rootCmd.registerCommand(versionCmd);
rootCmd.setFunc((app, args, flags) => {
    if (flags.version) {
        versionCmd.executeCurrent(app, args, flags);
        return;
    }
    rootCmd.showHelp();
});

module.exports = rootCmd;