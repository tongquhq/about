/**
 * Created by at15 on 2016/9/9.
 */
'use strict';
const _ = require('lodash');
const logger = require('../logger');


/***
 * @property name {string}
 * @property subCommands {Object.<string, Command>}
 */
class Command {
    constructor() {
        this.name = '';
        this.subCommands = {};
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
        // slice the args when pass it to sub command
        // ie: about-cli people list sway
        // root command get [people list sway]
        // first command get [list sway]
        // second command (the sub command for people with name as list) got [sway]

        // Just execute it
        if (args.length === 0) {
            this.func(app, [], flags);
            // TODO: may try catch or return result
            return;
        }

        let name = args[0];
        /** @var {Command} **/
        let subCommandToExecute = _.find(this.subCommands, {name: name});
        if (_.isEmpty(subCommandToExecute)) {
            this.func(app, args, flags);
        } else {
            args = args.slice(1);
            subCommandToExecute.execute(app, args, flags);
        }
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