/**
 * Created by at15 on 2016/9/12.
 */
'use strict';

const dust = require('dustjs-linkedin');
let compiled = dust.compile('this {title}', 'hello');
dust.loadSource(compiled);

// based on http://stackoverflow.com/questions/22519784/how-do-i-convert-an-existing-callback-api-to-promises
function renderAsync() {
    // Promise is already in node
    return new Promise((resolve, reject) => {
        dust.render('hello', {title: 'foo'}, function (err, out) {
            if (err != null) {
                // TODO: is return necessary and which position should it be?
                // return reject(err);
                reject(err);
                return;
            }
            resolve(out);
        });
    });
}

let p = renderAsync();
p.then((out) => {
    console.log(out);
}).catch((e) => {
    console.error(e);
});
