/**
 * Created by at15 on 2016/9/10.
 */
'use strict';

const Command = require('../lib/cli/command');
const version = require('../lib/constant').VERSION;

let versionCmd = new Command();
versionCmd.name = 'version';
versionCmd.description = 'show current version';
versionCmd.setFunc(() => {
    console.log(version);
});

module.exports = versionCmd;
