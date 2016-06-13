const tinylr = require('tiny-lr');

const PORT = 35729;
let server;

module.exports = function liveReload(watcher) {
  server = tinylr();

  watcher.on('change', () => {
    watcher.then(() => tinylr.changed(''));
  });

  server.listen(PORT, () => console.log(`Livereload listening on ${PORT}.`));
}

process.on('SIGTERM', () => {
  if (server) {
    server.close();
  }
})
