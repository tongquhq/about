/**
 * Created by at15 on 2016/9/6.
 *
 * Enhanced yaml parser that support $ref
 */
'use strict';
const path = require('path');

const _ = require('lodash');
const yaml = require('js-yaml');

const logger = require('../logger');
const fsUtil = require('../util/fs');
const Stack = require('../util/stack');

// FIXME: use full path for all internal file path, input as relative path is still supported

/**
 * @property files {Array}
 * @property parsed {Object}
 */
class Parser {
    constructor() {
        // all the files this parser has loaded
        // TODO: may use object for faster lookup
        this.files = [];
        // file -> parsed pairs, shallow parsed
        this.parsed = {};
        // file -> parsed pairs, $ref has been resolved
        this.resolved = {};
        this.resolving = new Stack();
        this.mainEntryFile = '';
    }

    /**
     * @param filePath {string}
     */
    getParsed(filePath) {
        filePath = fsUtil.fullPath(filePath);
        if (!_.isEmpty(this.parsed[filePath])) {
            return this.parsed[filePath];
        }
        logger.warn('file not loaded or empty but get queried', {file: filePath});
        return {};
    }

    /**
     * NOTE: You MUST pass ref with full file path!
     * @param ref {string}
     */
    getParsedPartial(ref) {
        let filePath = Parser.getRefFilePath(ref);
        let parsed = this.getParsed(filePath);
        // TODO: check result
        return _.get(parsed, Parser.getRefPartial(ref));
    }

    /**
     * @param filePath {string}
     */
    getResolved(filePath) {
        filePath = fsUtil.fullPath(filePath);
        if (!_.isEmpty(this.resolved[filePath])) {
            return this.resolved[filePath];
        }
        logger.warn('file not resolved or empty but get queried', {file: filePath});
        return {};
    }

    /**
     *
     * @param filePath {string}
     * @param obj {Object}
     */
    setResolved(filePath, obj) {
        filePath = fsUtil.fullPath(filePath);
        this.resolved[filePath] = obj;
    }

    /**
     * @param filePath {string}
     */
    addFile(filePath) {
        filePath = fsUtil.fullPath(filePath);
        // the file is already loaded
        if (!_.isEmpty(this.parsed[filePath])) {
            return true;
        }
        if (!fsUtil.fileExists(filePath)) {
            logger.warn('file not found', {file: filePath});
            return false;
        }
        // TODO: check if parse fail
        this.parsed[filePath] = Parser.shallowParse(filePath);
        return true;
    }

    /**
     *
     * @param filePath {string}
     * @returns {boolean}
     */
    resolveFile(filePath) {
        filePath = fsUtil.fullPath(filePath);
        this.resolving.push(filePath);
        // add this file if it does not exist
        this.addFile(filePath);
        let resolved = this.resolveObject(this.getParsed(filePath));
        this.setResolved(filePath, resolved);
        // TODO: should assert the pop return same value as we pushed
        this.resolving.pop();
        return true;
    }

    /**
     *
     * @param obj {Object}
     * @returns {Object}
     */
    resolveObject(obj) {
        let resolved = this.resolveExternal(obj);
        return this.resolveInner(resolved);
    }

    /**
     *
     * @param obj {Object}
     * @returns {Object}
     */
    resolveExternal(obj) {
        // loop and find all the $ref
        _.forEach(obj, (value, key) => {
            if (!_.has(value, '$ref')) {
                // resolve inner
                if (_.isObject(value)) {
                    this.resolveExternal(value);
                }
                return;
            }
            // This is a ref
            let ref = value['$ref'];
            if (Parser.isInnerRef(ref)) {
                return;
            }
            // now load the file
            // use correct path
            let dir = fsUtil.dir(this.resolving.top());
            let filePath = '';
            if (Parser.isExternalRefPartial(ref)) {
                filePath = path.resolve(dir, Parser.getRefFilePath(ref));
            } else {
                filePath = path.resolve(dir, ref);
            }
            this.addFile(filePath);
            // TODO: may use getResolved, should I resolve the external one
            // TODO: check result
            if (Parser.isExternalRefPartial(ref)) {
                // NOTE: we use the full path
                obj[key] = this.getParsedPartial(filePath + '/#/' + Parser.getRefPartial(ref));
            } else {
                obj[key] = this.getParsed(filePath);
            }
        });
        return obj;
    }

    /**
     *
     * @param obj {Object}
     * @return {Object}
     */
    resolveInner(obj) {
        logger.warn('resolve inner is not supported');
        return obj;
    }

    /**
     * Use specified file as main config entry, call this before call entry
     *
     * @param filePath {string}
     */
    setMainEntry(filePath) {
        if (_.isEmpty(this.parsed[filePath])) {
            logger.warn('must add file before set it as main entry', {file: filePath});
            return false;
        }
        this.mainEntryFile = filePath;
        return this.resolveFile(filePath);
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

    /**
     * isInnerRef only checks if the syntax is for inner reference in current document,
     * it does NOT check if the reference exists
     *
     * - #/definitions/cat inner reference
     * - cat.yaml external reference
     * - animal.yaml/#/cat partial external reference
     *
     * @param ref {string}
     * @returns {boolean}
     */
    static isInnerRef(ref) {
        return _.startsWith(ref, '#/');
    }

    /**
     *
     * @param ref {string}
     * @returns {boolean}
     */
    static isExternalRefPartial(ref) {
        if (Parser.isInnerRef(ref)) {
            return false;
        }
        return ref.indexOf('/#/') != -1;
    }

    /**
     *
     * @param ref {string}
     * @returns {string}
     */
    static getRefFilePath(ref) {
        return ref.substring(0, ref.indexOf('/#/'));
    }

    /**
     *
     * @param ref {string}
     * @returns {string}
     */
    static getRefPartial(ref) {
        return ref.substring(ref.indexOf('/#/') + '/#/'.length);
    }
}

module.exports = Parser;