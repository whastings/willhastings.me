const broccoli = require('broccoli');
const copyDereferenceSync = require('copy-dereference').sync;
const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');
const rollup = require('./rollup');
const webpack = require('./webpack');

const { Builder: TreeBuilder } = broccoli;

module.exports = class Builder {
  constructor(tree, options) {
    this.treeBuilder = new TreeBuilder(tree, {
      tmpdir: path.join(options.tmpDir, 'trees')
    });
    this.options = options;
  }

  run() {
    this.clean();
    return Promise.all([this.buildClient(), this.buildTrees()]);
  }

  buildClient() {
    let {
      appDir, clientEntry, disableRollup, disableWebpack, distDir, tmpDir
    } = this.options;
    let clientTmpDir = path.join(tmpDir, 'client');
    let clientTmpEntry = path.join(clientTmpDir, path.basename(clientEntry));
    let scriptsDistDir = path.join(distDir, 'scripts');

    let promise = disableRollup ? Promise.resolve() :
      rollup({
        appDir,
        destDir: disableWebpack ? scriptsDistDir : clientTmpDir,
        entryFile: clientEntry
      });

    if (!disableWebpack) {
      promise = promise.then(webpack({
        destDir: scriptsDistDir,
        entryFile: disableRollup ? clientEntry : clientTmpEntry,
        useBabel: disableRollup
      }));
    }

    return promise;
  }

  buildTrees() {
    return this.treeBuilder.build()
      .then((output) => writeOutput(output, this.options.distDir));
  }

  clean() {
    let { tmpDir, distDir } = this.options;
    let clientTmpDir = path.join(tmpDir, 'client');

    [clientTmpDir, distDir].forEach((dir) => {
      if (fs.existsSync(dir)) {
        rimraf.sync(dir);
      }
      mkdirp.sync(dir);
    });
  }

  watch() {
    // TODO
  }
};

function writeOutput(output, destination) {
  let srcDir = output.directory;

  return new Promise((resolve, reject) => {
    fs.readdir(srcDir, (error, dirs) => {
      if (error) {
        return reject(error);
      }

      dirs.forEach(
        (dir) => copyDereferenceSync(
          path.join(srcDir, dir),
          path.join(destination, dir)
        )
      );
      resolve();
    });
  });
}
