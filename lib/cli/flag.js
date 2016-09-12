/**
 * Created by at15 on 2016/9/11.
 */
'use strict';

/**
 * @property name {string}
 * @property description {string}
 * @property defaultValue {string|number|boolean}
 * @property alias {string}
 */
class Flag {
    constructor(name, description, defaultValue) {
        this.name = name;
        this.description = description;
        this.defaultValue = defaultValue;
        this.alias = '';
        this.global = false;
    }

    setAlias(alias) {
        this.alias = alias;
    }
}

module.exports = Flag;