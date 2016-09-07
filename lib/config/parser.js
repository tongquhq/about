/**
 * Created by at15 on 2016/9/6.
 *
 * Enhanced yaml parser that support $ref
 */
'use strict';
const logger = require('../logger');
const fsUtil = require('../util/fs');
const yaml = require('js-yaml');

/**
 * @property files {Array}
 * @property parsed {Object}
 */
class Parser {
    constructor() {
        // all the files this parser has loaded
        // TODO: may use object for faster lookup
        this.files = [];
        // Set of file -> parsed pairs
        this.parsed = {};
        this.mainEntryFile = '';
    }

    /** @param filePath {string} */
    addFile(filePath) {
        if (!fsUtil.fileExists(filePath)) {
            logger.warn('file not found', {file: filePath});
            return false;
        }
        // TODO: check if parse fail
        this.parsed[filePath] = Parser.shallowParse(filePath);
        return true;
    }

    /**
     * Use specified file as main config entry, call this before call entry
     *
     * @param filePath {string}
     */
    setMainEntry(filePath) {

    }

    /**
     * shallowParse does not resolve $ref
     * It doesn't check file existence and will return empty object when fail
     */
    static shallowParse(filePath) {
        try {
            return yaml.safeLoad(fsUtil.readAsString(filePath));
        } catch (e) {
            logger.error('error when parse file', e);
            return {};
        }
    }
}

module.exports = Parser;