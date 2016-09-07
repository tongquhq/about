/**
 * Created by at15 on 2016/9/5.
 */

const expect = require('chai').expect;
const foo = require('../lib/foo');

describe('foo', function () {

    it('equals to bar', function () {
        expect(foo).to.equal('bar');
    });

});
