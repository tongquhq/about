/**
 * Created by at15 on 2016/9/6.
 *
 */

const winston = require('winston');

let logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'debug', colorize: true })
    ]
});

module.exports = {
    // FIXME: got no type hint for the function parameters
    // TODO: add color using chalk, don't know if winston has color by default
    // winston is using colors instead of chalk (colors seems to have problems which are solved by chalk)
    debug: logger.debug,
    info: logger.info,
    warn: logger.warn,
    error: logger.error
};