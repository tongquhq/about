/**
 * Created by at15 on 2016/9/7.
 */
'use strict';
const expect = require('chai').expect;
const Parser = require('../../lib/config/parser');

describe('Parser', () => {

    it('can load yaml file', () => {
        expect(Parser.shallowParse('example/data/sway.yml')).to.eql({
            mail: 'lq@lq.com',
            github: 'swaylq',
            twitter: 'swaylq'
        });
    });

    it('can add file', () => {
        let parser = new Parser();
        let file = 'example/data/people.yml';
        parser.addFile(file);
        expect(parser.parsed).to.have.ownProperty(file);
    });

    it('can add several files', () => {
        let parser = new Parser();
        let file1 = 'example/data/people.yml';
        let file2 = 'example/data/sway.yml';
        parser.addFile(file1);
        parser.addFile((file2));
        expect(parser.parsed).to.have.all.keys(file1, file2);
    });

});