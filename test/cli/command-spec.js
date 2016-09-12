/**
 * Created by at15 on 2016/9/9.
 */
'use strict';

const expect = require('chai').expect;
const Command = require('../../lib/cli/command');
const Flag = require('../../lib/cli/flag');

describe('Command', ()=> {
    it('can register command', () => {
        let rootCmd = new Command();
        // TODO: rootCmd name is displayed in help only, no other actual use
        rootCmd.name = 'ayi';
        let subCmd = new Command();
        subCmd.name = 'web';
        expect(rootCmd.registerCommand(subCmd)).to.eqls(true);
        // you can override registered command
        expect(rootCmd.registerCommand(subCmd)).to.eqls(true);
        expect(rootCmd.subCommands).to.have.property(subCmd.name);
        let subCmdWithoutName = new Command();
        expect(rootCmd.registerCommand(subCmdWithoutName)).to.eqls(false);
    });

    it('can execute callback function', (done) => {
        let cmd = new Command();
        cmd.name = 'test';
        cmd.setFunc((app, args, flags) => {
            expect(app).to.eql(null);
            expect(args).to.eql([]);
            expect(flags).to.eql({});
            done();
        });
        cmd.execute(null, [], {});
    });

    it('can execute sub command', (done) => {
        let rootCmd = new Command();
        rootCmd.name = 'dummy';
        let gitCmd = new Command();
        gitCmd.name = 'git';
        gitCmd.setFunc((app, args, flags)=> {
            expect(app).to.eql(null);
            expect(args).to.eql(['status']);
            expect(flags).to.eql({verbose: true});
            done();
        });
        rootCmd.registerCommand(gitCmd);
        rootCmd.execute(null, ['git', 'status'], {verbose: true});
    });

    it('non root cmd can have sub command', (done) => {
        let rootCmd = new Command();
        rootCmd.name = 'dummy';
        let gitCmd = new Command();
        gitCmd.name = 'git';
        let cloneCmd = new Command();
        cloneCmd.name = 'clone';
        let cloneURL = 'git@github.com/tongquhq/about.git';
        gitCmd.registerCommand(cloneCmd);
        rootCmd.registerCommand(gitCmd);
        cloneCmd.setFunc((app, args, flags) => {
            expect(app).to.eql(null);
            expect(args).to.eql([cloneURL]);
            expect(flags).to.eql({verbose: true});
            done();
        });
        rootCmd.execute(null, ['git', 'clone', cloneURL], {verbose: true});
    });

    it('help function is called when --help', (done) => {
        let rootCmd = new Command();
        rootCmd.name = 'dummy';
        rootCmd.showHelp = () => {
            done();
        };
        rootCmd.execute(null, [], {help: true});
    });

    it('help function is called when -h', (done) => {
        let rootCmd = new Command();
        rootCmd.name = 'dummy';
        rootCmd.showHelp = () => {
            done();
        };
        rootCmd.execute(null, [], {h: true});
    });

    it('can populate flag alias', ()=> {
        let rootCmd = new Command();
        rootCmd.name = 'dummy';
        let verboseFlag = new Flag('verbose', 'verbose logging', false);
        verboseFlag.alias = 'v';
        verboseFlag.global = true;
        verboseFlag.defaultValue = false;
        rootCmd.addFlag(verboseFlag);
        expect(rootCmd.supportedFlags).to.not.have.property('verbose');
        expect(rootCmd.supportedGlobalFlags).to.have.property('verbose');
        expect(rootCmd.flagAlias).to.eql({verbose: 'v'});
        expect(rootCmd.flagAliasReverse).to.eql({v: 'verbose'});

        // alias
        let flags = rootCmd.populateFlags({verbose: true});
        expect(flags).to.eql({verbose: true, v: true});
        flags = rootCmd.populateFlags({v: true});
        expect(flags).to.eql({verbose: true, v: true});
        // default
        expect(flags.vv).to.be.undefined;
        expect(flags.verbose).to.be.true;
        let configFlag = new Flag('config', 'config file location', '$HOME/.about.yml');
        rootCmd.addFlag(configFlag);
        flags = rootCmd.populateFlags({});
        expect(flags.verbose).to.be.false;
        // alias is also populated
        expect(flags.v).to.be.false;
        expect(flags.config).to.eql(configFlag.defaultValue);

    });
});