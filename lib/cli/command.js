/**
 * Created by at15 on 2016/9/9.
 */
'use strict';
const _ = require('lodash');
const logger = require('../logger');

/***
 * @property app {Cli}
 * @property name {string}
 * @property description {string}
 * @property subCommands {Object.<string, Command>}
 */
class Command {
    constructor() {
        this.app = {};
        this.name = '';
        this.description = '';
        this.subCommands = {};
    //     * @property supportedFlags {Object.<
    //     * @property flagAlias {Object.<string, string>}
    //     this.supportedFlags = {};
    //     // global flags will pass to its sub commands
    //     this.supportedGlobalFlags = {};
    //     this.flagAlias = {};
        this.func = (app, args, flags) => {
        };
    }

    /**
     *
     * @param cb {function}
     */
    setFunc(cb) {
        this.func = cb;
    }

    /**
     *
     * @param cmd {Command}
     */
    registerCommand(cmd) {
        if (!Command.isValidCommand(cmd)) {
            logger.warn('tried to register invalid command', {cmd: cmd});
            return false;
        }
        // simply overwrite the existing one without any check
        this.subCommands[cmd.name] = cmd;
        return true;
    }

    /**
     *
     * @param app {Cli}
     * @param args {string[]}
     * @param flags {Object.<string, string>}
     */
    execute(app, args, flags) {
        // Keep a reference to app, need use it when show help
        this.app = app;

        // slice the args when pass it to sub command
        // ie: about-cli people list sway
        // root command get [people list sway]
        // first command get [list sway]
        // second command (the sub command for people with name as list) got [sway]

        // No more args. Just execute current command
        if (args.length === 0) {
            this.executeCurrent(app, args, flags);
            // TODO: may try catch or return result
            return;
        }

        let name = args[0];
        /** @var {Command} **/
        let subCommandToExecute = _.find(this.subCommands, {name: name});
        if (_.isEmpty(subCommandToExecute)) {
            this.executeCurrent(app, args, flags);
        } else {
            args = args.slice(1);
            subCommandToExecute.execute(app, args, flags);
        }
    }

    executeCurrent(app, args, flags) {
        if (flags.help === true || flags.h === true) {
            this.showHelp();
            return;
        }
        this.func(app, args, flags);
    }

    showHelp() {
        let helpMessage =
`${this.description}
`;
        // TODO: need to take global flag and local flag into consideration
        // also flags need to have description
        console.log(helpMessage);
    }

    /**
     *
     * @param cmd {Command}
     * @returns {boolean}
     */
    static isValidCommand(cmd) {
        if (!_.isObject(cmd)) {
            return false;
        }
        // TODO: may use array and lodash if have multiple properties to check
        if (_.isEmpty(cmd.name)) {
            return false;
        }
        return true;
    }
}

module.exports = Command;