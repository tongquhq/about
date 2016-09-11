/**
 * Created by at15 on 2016/9/9.
 */
'use strict';

const expect = require('chai').expect;
const Command = require('../../lib/cli/command');

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
});