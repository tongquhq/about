/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const expect = require('chai').expect;
const render = require('../../lib/template/render');

describe('Template', ()=> {
    it('can wrap dust\'s render function', (done) => {
        render.renderBySource('I am {name}', {name: 'jack'})
            .then((out)=> {
                expect(out).to.eql('I am jack');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
});