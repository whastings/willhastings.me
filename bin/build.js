#!/usr/bin/env node

const Builder = require('../lib/build/Builder');
const parser = require('yargs-parser');

const args = parser(process.argv.slice(2));
const options = {};

if (args['disable-rollup'] !== undefined) {
  options.disableRollup = true;
}
if (args['disable-webpack'] !== undefined) {
  options.disableWebpack = true;
}

let builder = new Builder(options);

builder.run(options)
  .then(
    () => console.log('Build complete!'),
    (error) => console.log(`Build error: ${error}`)
  );
