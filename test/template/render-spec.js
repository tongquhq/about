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

    it('can render file', (done) => {
        render.renderByFile('example/tmpl/index.html', {title: 'abc'})
            .then((out)=> {
                console.log('I got out!', out);
                done();
            })
            .catch((e)=> {
                done(e);
            });
    });

    // TODO: use sinon to test render by file
});