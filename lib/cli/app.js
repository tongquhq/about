/**
 * Created by at15 on 2016/9/9.
 */
'use strict';
const argv = require('minimist')(process.argv.slice(2));

const Command = require('./command');
const logger = require('../logger');

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
        // run all the registered commands
        // TODO: try catch and deal with promise failure that is not handled
        // TODO: pass cli, args, flags
        this.rootCmd.execute(app, args, argv);
    }

    exit(code) {
        // TODO: run the exit hooks
        // TODO: proper exit code
        process.exit(code);
    }
}

module.exports = Cli;