/**
 * Created by at15 on 2016/9/7.
 */
'use strict';
const expect = require('chai').expect;
const fsUtil = require('../../lib/util/fs');
const Parser = require('../../lib/config/parser');

describe('Parser', () => {

    it('can load yaml file', () => {
        expect(Parser.shallowParse('example/data/sway.yml')).to.eql({
            mail: 'lq@lq.com',
            github: 'swaylq',
            twitter: 'swaylq'
        });
    });

    it('can check inner reference syntax', ()=> {
        expect(Parser.isInnerRef('#/people/sway')).to.eql(true);
        expect(Parser.isInnerRef('sway.yml')).to.eql(false);
    });

    it('can check partial external reference syntax', ()=> {
        expect(Parser.isExternalRefPartial('address.yml/#/SJTU')).to.eql(true);
    });

    it('can add file', () => {
        let parser = new Parser();
        let file = 'example/data/people.yml';
        parser.addFile(file);
        expect(parser.parsed).to.have.ownProperty(fsUtil.fullPath(file));
    });

    it('can add several files', () => {
        let parser = new Parser();
        let file1 = 'example/data/people.yml';
        let file2 = 'example/data/sway.yml';
        parser.addFile(file1);
        parser.addFile((file2));
        expect(parser.parsed).to.have.all.keys(fsUtil.fullPath(file1), fsUtil.fullPath(file2));
    });

    // FIXME: relative file path is not handled
    it('can resolve external file', () => {
        let parser = new Parser();
        let entry = 'example/data/people.yml';
        parser.addFile(entry);
        parser.resolveFile(entry);
        expect(parser.getResolved(entry).sway).to.eql(Parser.shallowParse('example/data/sway.yml'));
    });

    it('can get file path from partial external ref', () => {
        expect(Parser.getRefFilePath('sway.yml/#/address')).to.eql('sway.yml');
    });

    it('can get partial from partial external ref', () => {
        expect(Parser.getRefPartial('sway.yml/#/address')).to.eql('address');
    });

    it('can resolve partial external ref', () => {
        let parser = new Parser();
        let entry = 'example/data/people.yml';
        parser.addFile(entry);
        parser.resolveFile(entry);
        expect(parser.getResolved(entry).arrowrowe.currentAddress).to.eql({zipCode: 200240});
    })

});