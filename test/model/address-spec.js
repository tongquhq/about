/**
 * Created by at15 on 2016/9/8.
 */
'use strict';

const expect = require('chai').expect;
const Address = require('../../lib/model/address');

describe('Address', ()=> {
    it('Can be turned into a string', () => {
        let addr = new Address();
        addr.city = 'Shanghai';
        addr.addressLine = '800 Dongchuan Road Minghang District Shanghai Jiao Tong University';
        addr.zipCode = '200240';
        addr.country = 'China';
        expect(addr.toString()).to.eql('800 Dongchuan Road Minghang District Shanghai Jiao Tong University 200240 Shanghai China');
    });
});