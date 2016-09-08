/**
 * Created by at15 on 2016/9/8.
 */
'use strict';
const Address = require('./address');

/**
 * @property name {string}
 * @property fullName {string}
 * @property github {string}
 * @property currentAddress {Address}
 * @property priority {number}
 */
class People {
    constructor() {
        this.name = '';
        // TODO: i18n
        this.fullName = '';
        this.github = '';
        this.currentAddress = new Address();
        this.priority = 0;
    }

    /**
     *
     * @param p1 {People}
     * @param p2 {People}
     */
    static higher(p1, p2) {
        if (p1.priority > p2.priority) {
            return p1;
        }
        return p2;
    }

    /**
     *
     * @param p1 {People}
     * @param p2 {People}
     */
    static lower(p1, p2) {
        if (p1.priority < p2.priority) {
            return p1;
        }
        return p2;
    }
}

module.exports = People;