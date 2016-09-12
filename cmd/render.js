/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const Command = require('../lib/cli/command');
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
    // FIXME: the then and catch are not triggered
    render.renderByFile(args[0], {title: 'abc'}).then((out)=> {
        console.log('resolved!');
        logger.info(out);
    }).catch((e)=> {
        logger.error(e);
    });
});

module.exports = renderCmd;