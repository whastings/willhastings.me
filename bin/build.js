#!/usr/bin/env node

const build = require('../lib/build');
const parser = require('yargs-parser');

const args = parser(process.argv.slice(2));
const options = {
  disableRollup: args['disable-rollup'] !== undefined,
  disableWebpack: args['disable-webpack'] !== undefined
};

build(options)
  .then(
    () => console.log('Build complete!'),
    (error) => console.log(`Build error: ${error}`)
  );
