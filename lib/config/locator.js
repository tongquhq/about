/**
 * Created by at15 on 2016/9/6.
 */
const logger = require('../logger');
const fsUtil = require('../util/fs');

function detectConfigFile(flags) {
    if (typeof flags.config === 'string') {
        let configFile = flags.config;
        logger.debug(`config file set as ${configFile}`);
        // it must exist, if not we fallback to the default one and throw a warning
        if (!fsUtil.fileExists(configFile)) {
            logger.warn(`config file can't be found ${configFile}`);
        }
    }
    logger.debug('using default config file');
}

module.exports = {
    detectConfigFile
};