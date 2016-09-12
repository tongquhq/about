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
        this.args = [];
        this.flags = {};
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

    /**
     *
     * @param customArgs {Object} used for test
     */
    run(customArgs) {
        let args = {_: []};
        let flags = {};
        // TODO: handle invalid customArgs
        if (typeof customArgs !== 'undefined') {
            args = customArgs._;
            delete customArgs._;
            flags = customArgs;
        } else {
            args = argv._;
            delete argv._;
            flags = argv;
        }
        const app = this;
        app.args = args;
        app.flags = flags;

        // config logger
        logger.config(flags);
        logger.debug('args', args);
        logger.debug('flags', flags);
        // run all the registered commands
        // TODO: deal with promise failure that is not handled
        try {
            this.rootCmd.execute(app, args, flags);
        } catch (e) {
            logger.error('unhandled error in command', e);
        }
        // this.exit(0);
    }

    loadConfigOrExit() {
        // locate config file
        // TODO: store in the app object
        let configFilePath = configLocator.detectConfigFile(this.flags);
        if (configFilePath == '') {
            this.exit(1);
        }
    }

    /***
     *
     * @param code {number}
     */
    exit(code) {
        // TODO: run the exit hooks
        // TODO: proper exit code
        process.exit(code);
    }
}

module.exports = Cli;