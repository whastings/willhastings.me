const broccoli = require('broccoli');
const BroccoliWatcher = require('broccoli/lib/watcher');
const copyDereferenceSync = require('copy-dereference').sync;
const fs = require('fs');
const merge = require('broccoli-merge-trees');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');

// Trees:
const htmlTree = require('./trees/html');

const { Builder: TreeBuilder } = broccoli;

const DEFAULT_OPTIONS = {
  distDir: 'dist/client'
};

const TREES = [
  htmlTree,
];

module.exports = class Builder {
  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options);
    this._initTreeBuilder();
    this.watcher = null;
  }

  build() {
    this.clean();
    return this.treeBuilder.build(...arguments)
      .then((output) => writeOutput(output, this.options.distDir));
  }

  clean() {
    let { distDir } = this.options;

    if (fs.existsSync(distDir)) {
      rimraf.sync(distDir);
    }
    mkdirp.sync(distDir);
  }

  watch() {
    this.watcher = new BroccoliWatcher(this);
    return this.watcher;
  }

  _initTreeBuilder() {
    let { options } = this;

    this.treeBuilder = new TreeBuilder(
      merge(TREES.map((treeFn) => treeFn(options)))
    );
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
