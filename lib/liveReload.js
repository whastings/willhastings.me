const path = require('path');
const tinylr = require('tiny-lr');
const watch = require('watch');

const PORT = 35729;
const WATCH_PATH = path.join(process.cwd(), 'dist/client');

let server = tinylr();
server.listen(PORT, startWatcher);

function startWatcher() {
  watch.watchTree(WATCH_PATH, {interval: 1000}, function(f, current, previous) {
    if (!(typeof f === "object" && previous === null && current === null)) {
      tinylr.changed('');
    }
  });
}
