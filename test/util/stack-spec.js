/**
 * Created by at15 on 2016/9/7.
 */
'use strict';

const expect = require('chai').expect;
const Stack = require('../../lib/util/stack');

describe('Stack', ()=> {
    it('can push and pop', () => {
        let s = new Stack();
        s.push(1);
        expect(s.pop()).to.eqls(1);
    });

    it('use top to return last value', () => {
        let s = new Stack();
        s.push(1);
        s.push(2);
        expect(s.top()).to.eqls(2);
        expect(s.top()).to.eqls(2);
    });
});