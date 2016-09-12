/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const Command = require('../lib/cli/command');
const Flag = require('../lib/cli/flag');
const logger = require('../lib/logger');
const render = require('../lib/template/render');

let renderCmd = new Command();
renderCmd.name = 'render';
renderCmd.description = 'render template to html with data from config file and markdown';
renderCmd.setFunc((app, args, flags) => {
    if (args.length === 0) {
        logger.debug('render using config');
        app.loadConfigOrExit();
        logger.error('not implemented');
        app.exit(1);
    }
    logger.info('try to render file', {file: args[0]});
    render.renderByFile(args[0], {title: 'abc'}).then((out)=> {
        if (args.length === 1 || flags.o) {
            logger.info(out);
        }
        if (args.length == 2) {
            logger.warn('TODO: write output to file', {file: args[1]});
        }
    }).catch((e)=> {
        logger.error(e);
    });
});

// add flags
let outputFlag = new Flag('output', 'output content to console even if destination file is specified', false);
outputFlag.setAlias('o');
renderCmd.addFlag(outputFlag);

module.exports = renderCmd;