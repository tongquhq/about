/**
 * Created by at15 on 2016/9/8.
 */
'use strict';

const expect = require('chai').expect;
const People = require('../../lib/model/people');

describe('People', () => {
    it('have address', () => {
        let mie = new People();
        mie.name = 'arrowrowe';
        mie.fullName = 'Cheng Zhu';
        mie.github = 'arrowrowe';
        expect(mie).to.have.property('currentAddress');
    });

    it('have priority', () => {
        let mie = new People();
        let cece = new People();
        mie.priority = 1;
        expect(People.higher(mie, cece)).to.eql(mie);
        expect(People.higher(cece, mie)).to.eql(mie);
        cece.priority = 2;
        expect(People.higher(mie, cece)).to.eql(cece);
    });
});