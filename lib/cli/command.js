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
 * @property supportedFlags {Object.<string, Flag>}
 * @property supportedGlobalFlags {Object.<string, Flag>}
 * @property flagAlias {Object.<string, string>}
 * @property flagAliasReverse {Object.<string, string>}
 */
class Command {
    constructor() {
        this.app = {};
        this.name = '';
        this.description = '';
        this.subCommands = {};
        this.supportedFlags = {};
        // global flags is only global to its sub commands
        this.supportedGlobalFlags = {};
        // for quick lookup alias
        this.flagAlias = {};
        this.flagAliasReverse = {};
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

    /***
     *
     * @param flag {Flag}
     */
    addFlag(flag) {
        if (flag.global === true) {
            this.supportedGlobalFlags[flag.name] = flag;
        } else {
            this.supportedFlags[flag.name] = flag;
        }
        if (typeof flag.alias === 'string' && flag.alias !== '') {
            this.flagAlias[flag.name] = flag.alias;
            this.flagAliasReverse[flag.alias] = flag.name;
        }
    }

    /***
     *
     * @param flags {Flag[]}
     */
    addFlags(flags) {
        _.forEach(flags, (flag) => {
            this.addFlag(flag);
        });
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
        flags = this.populateFlags(flags);
        if (flags.help === true || flags.h === true) {
            this.showHelp();
            return;
        }
        this.func(app, args, flags);
    }

    // populate the flags
    // - alias
    // - default value
    // flags is still plain Object.<string, string|number|boolean>
    populateFlags(flags) {
        // make a copy, and flags is a plain Object.<string, string|number|boolean>
        let newFlags = _.assign(flags);

        // default value
        _.forEach(this.supportedFlags, (flag, name)=> {
            if (!_.has(newFlags, name)) {
                newFlags[name] = flag.defaultValue;
            }
        });
        _.forEach(this.supportedGlobalFlags, (flag, name)=> {
            if (!_.has(newFlags, name)) {
                newFlags[name] = flag.defaultValue;
            }
        });

        // alias
        _.forEach(flags, (value, key) => {
            if (_.has(this.flagAlias, key)) {
                newFlags[this.flagAlias[key]] = value;
            }
            // TODO: what if --config abc.yml -c abd.yml
            if (_.has(this.flagAliasReverse, key)) {
                newFlags[this.flagAliasReverse[key]] = value;
            }
        });

        return newFlags;
    }

    showHelp() {
        let helpMessage =
            `${this.description}

Usage:
    Not supported
    
Available Commands:
    ${_.map(this.subCommands, (cmd)=> {
                // pad the command name for better output
                return `${_.padEnd(cmd.name, 10)}   ${cmd.description}`;
            }).join('\n')}

Flags:
    ${_.map(this.supportedFlags, (flag) => {
                // FIXME: not all flags have alias, a strange - will appear in that case
                return _.padEnd(`-${flag.alias}, --${flag.name}`, 20) + flag.description;
            })}

Global Flags:
    ${_.map(this.supportedGlobalFlags, (flag) => {
                return _.padEnd(`-${flag.alias}, --${flag.name}`, 20) + flag.description;
            })}

`;
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