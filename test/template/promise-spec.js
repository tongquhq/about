/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const expect = require('chai').expect;

describe('Promise', ()=> {
    it('can reject directly', (done)=> {
        function rejectYou() {
            return Promise.reject(new Error('ha ha'));
        }

        rejectYou().then(()=> {
        }, (err)=> {
            expect(err.message).to.eql('ha ha');
            done();
        })

    });
});