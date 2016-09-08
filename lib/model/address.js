/**
 * Created by at15 on 2016/9/8.
 */
'use strict';

/**
 * @property zipCode {string}
 */
class Address {
    constructor() {
        this.zipCode = '';
        this.city = '';
        // State or province
        this.state = '';
        this.country = '';
        // TODO: address line 1 & 2 & 3?
        this.addressLine = '';
    }

    toString() {
        return `${this.addressLine} ${this.zipCode} ${this.city} ${this.state} ${this.country}`.replace('  ', ' ');
    }

    /**
     *
     * @param str {string}
     * @return {Address}
     */
    static parse(str) {
        // TODO: impl
    }
}

module.exports = Address;