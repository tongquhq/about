#!/usr/bin/env node
'use strict';
const meow = require('meow');
const chalk = require('chalk');
const error = chalk.bold.red;
console.log(error('Error!'));

const cli = meow(`
    Usage
      $ foo <input>

    Options
      --rainbow, -r  Include a rainbow

    Examples
      $ foo unicorns --rainbow
      🌈 unicorns 🌈
`, {
    alias: {
        r: 'rainbow'
    }
});
/*
 {
 input: ['unicorns'],
 flags: {rainbow: true},
 ...
 }
 */
// node about.js unicorns --rainbow
// unicorns { rainbow: true, r: true }
console.log(cli.input[0], cli.flags);