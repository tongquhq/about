/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const Command = require('../lib/cli/command');
const logger = require('../lib/logger');

let renderCmd = new Command();
renderCmd.name = 'render';
renderCmd.description = 'render template to html with data from config file and markdown';
renderCmd.setFunc((app, args, flags) => {
    logger.info('try to render file', {file: args[0]});
});

module.exports = renderCmd;