/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const _ = require('lodash');
const dust = require('dustjs-linkedin');

const fsUtil = require('../util/fs');

/**
 *
 * @param path {string}
 * @param data {Object}
 * @returns {Promise}
 */
function renderByFile(path, data) {
    let src = fsUtil.readAsString(path);
    return renderBySource(src, data);
}

/**
 *
 * @param src {string}
 * @param data {Object}
 * @returns {Promise}
 */
function renderBySource(src, data) {
    let name = 't_' + _.random(100);
    let compiled = dust.compile(src, name);
    dust.loadSource(compiled);
    return renderByName(name, data);
}

/**
 * Promise wrapper for dust's render function
 * based on http://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises
 *
 * @param name {string}
 * @param data {Object}
 * @returns {Promise}
 *
 */
function renderByName(name, data) {
    // Promise is already in node
    return new Promise((resolve, reject) => {
        dust.render(name, data, function (err, out) {
            if (err != null) {
                reject(err);
            } else {
                resolve(out);
            }
        });
    });
}

// let p = renderBySource('my title is {title}', {title:'jack'});
// p.then((out) => {
//     console.log(out);
// }).catch((e) => {
//     console.error(e);
// });

module.exports = {
    renderByFile,
    renderBySource,
    renderByName
};