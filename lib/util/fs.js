/**
 * Created by at15 on 2016/9/6.
 */
var fs = require('fs');

/** @param path {string} */
function fileExists(path) {
    try {
        fs.accessSync(path, fs.constants.F_OK)
        return true;
    } catch (e) {
        return false;
    }
}

/** @param path {string} */
function readAsString(path) {
    return fs.readFileSync(path, 'utf8');
}

module.exports = {
    fileExists,
    readAsString
};