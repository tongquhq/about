/**
 * Created by at15 on 2016/9/6.
 */
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const logger = require('../logger');

/** @param path {string} */
function fileExists(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Return false if error occurs
 * @param path {string}
 * @returns {boolean|string}
 */
function readAsString(path) {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (e) {
        logger.warn('can\'t read file', {file: path});
        return false;
    }
}

function fullPath(p) {
    if (_.startsWith(p, process.cwd())) {
        return p;
    }
    return path.resolve(process.cwd(), p);
}

function dir(p) {
    return path.dirname(p);
}

module.exports = {
    fileExists,
    readAsString,
    fullPath,
    dir
};