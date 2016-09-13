# about

[![Build Status](https://travis-ci.org/tongquhq/about.svg?branch=master)](https://travis-ci.org/tongquhq/about)
[![Coverage Status](https://coveralls.io/repos/github/tongquhq/about/badge.svg?branch=master)](https://coveralls.io/github/tongquhq/about?branch=master)

The about page and its generator for Tongqu (most functionality are not implemented)

## Develop

- run `npm link` in current folder to have the cli installed to your npm bin path
- run `about-cli` you should see some help

````
$ about-cli
A static about us/me & blog site generator, build with delay by @tongquhq

Usage:
  Not supported

Available Commands:
  version      show current version
  render       render template to html with data from config file and markdown

Flags:


Global Flags:
  -v, --verbose       debug level log
````

### Features

- [cobra](https://github.com/spf13/cobra) like [cli framework](https://github.com/tongquhq/about/issues/5)
- yaml parser with external file reference (like js-pointer) support, [code](https://github.com/tongquhq/about/blob/master/lib/config/parser.js) [issue](https://github.com/tongquhq/about/issues/4) [example](https://github.com/tongquhq/about/blob/master/example/data/people.yml)