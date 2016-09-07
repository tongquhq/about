/**
 * Created by at15 on 2016/9/5.
 */

const expect = require('chai').expect;
const foo = require('../lib/foo');

describe('foo', () => {

    it('equals to bar', () => {
        expect(foo).to.equal('bar');
    });

});
