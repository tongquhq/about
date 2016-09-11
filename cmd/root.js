/**
 * Created by at15 on 2016/9/11.
 */
'use strict';

const Command = require('../lib/cli/command');
const versionCmd = require('./version');

let rootCmd = new Command();
rootCmd.name = 'about-cli';
rootCmd.registerCommand(versionCmd);
rootCmd.setFunc(() => {
    console.log('I should show some help');
});

module.exports = rootCmd;