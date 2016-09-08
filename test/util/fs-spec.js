'use strict';
const expect = require('chai').expect;
const fsUtil = require('../../lib/util/fs');

describe('fs util', ()=> {
    it('resolve partial path to current folder', () => {
        expect(fsUtil.fullPath('test/util/fs-spec.js')).to.eql(__filename);
    });

    it('leave path with current folder prefix as it is', () => {
        expect(fsUtil.fullPath(__filename)).to.eql(__filename);
    });

    it('has shortcut for get file directory', () => {
        expect(fsUtil.dir(__filename)).to.eql(__dirname);
    })
});