/**
 * Created by at15 on 2016/9/9.
 */
'use strict';
const argv = require('minimist')(process.argv.slice(2));

const Command = require('./command');
const logger = require('../logger');
const configLocator = require('../config/locator');

/**
 * @property rootCmd {Command}
 */
class Cli {
    constructor() {
        this.rootCmd = {};
    }

    /**
     *
     * @param cmd {Command}
     */
    setRootCmd(cmd) {
        if (!Command.isValidCommand(cmd)) {
            logger.error('root command invalid', {cmd: cmd});
            this.exit(1);
        }
        this.rootCmd = cmd;
    }

    run() {
        const args = argv._;
        delete argv._;
        const flags = argv;
        const app = this;
        // config logger
        logger.config(flags);
        logger.debug('args', args);
        logger.debug('flags', flags);

        // run all the registered commands
        // TODO: try catch and deal with promise failure that is not handled
        this.rootCmd.execute(app, args, flags);
    }

    loadConfigOrExit(){
        // locate config file
        // TODO: store in the app object
        let configFilePath = configLocator.detectConfigFile(flags);
        if (configFilePath == '') {
            this.exit(1);
        }
    }

    exit(code) {
        // TODO: run the exit hooks
        // TODO: proper exit code
        process.exit(code);
    }
}

module.exports = Cli;