#!/usr/bin/env node

'use strict';
const meow = require('meow');
const configLocator = require('../lib/config/locator');

const cli = meow(`
    Usage
      $ about <input>

    Options
      --config, -c  Specify config file

    Examples
      $ about --config ./example/config.yaml
      $ about -c ./example/config.yaml
`, {
    alias: {
        c: 'config'
    }
});
console.log(cli.input[0], cli.flags);
configLocator.detectConfigFile(cli.flags);