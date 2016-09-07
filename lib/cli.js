/**
 * Created by at15 on 2016/9/6.
 */
'use strict';
const logger = require('./logger');
const configLocator = require('./config/locator');

const meow = require('meow');
const cli = meow(`
    Usage
      $ about <input>

    Options
      --verbose, -v verbose log
      --config, -c  Specify config file

    Examples
      $ about --config ./example/config.yaml
      $ about -c ./example/config.yaml
`, {
    alias: {
        c: 'config',
        v: 'verbose'
    }
});

module.exports = {
    flags: cli.flags,
    run: () => {
        // reconfigure the logger
        logger.config(cli.flags);

        logger.debug('cli input', cli.input);
        logger.debug('cli flags', cli.flags);

        let configFilePath = configLocator.detectConfigFile(cli.flags);
        if (configFilePath === '') {
            process.exit(1);
        }

        logger.debug('keep moving!');
    }
};