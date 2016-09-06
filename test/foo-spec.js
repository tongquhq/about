/**
 * Created by at15 on 2016/9/5.
 */

var expect = require('chai').expect;
var foo = require('../lib/foo');

describe('foo', function () {

    it('equals to bar', function () {
        expect(foo).to.equal('bar');
    });

});
