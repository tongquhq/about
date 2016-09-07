/**
 * Created by at15 on 2016/9/6.
 */
const logger = require('../logger');
const fsUtil = require('../util/fs');
const DEFAULT_CONFIG_FILE = '.about.yml';

// TODO: use sinon for test, I guess stub can handle the file problem
function detectConfigFile(flags) {
    if (typeof flags.config === 'string') {
        let configFile = flags.config;
        logger.debug(`config file set as ${configFile}`);
        if (fsUtil.fileExists(configFile)) {
            return configFile;
        }
        logger.warn(`specified config file can't be found`, {file: configFile});
    }
    logger.debug('try to use default config file');
    // TODO: may need to add cwd
    if (fsUtil.fileExists(DEFAULT_CONFIG_FILE)) {
        return DEFAULT_CONFIG_FILE;
    } else {
        logger.warn(`default config file can't be found`, {file: DEFAULT_CONFIG_FILE});
    }
    logger.error('no config file found');
    return '';
}

module.exports = {
    detectConfigFile
};