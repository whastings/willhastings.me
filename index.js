const Builder = require('./lib/build/Builder');
const liveReload = require('./lib/liveReload');

// Run initial build and start server.
startBuilder()
  .then(startServer)
  .then(() => console.log(`Server started`))
  .catch((error) => console.log(`Error starting: ${error}`));

function startBuilder() {
  let builder = new Builder();

  if (process.env.NODE_ENV === 'production') {
    return builder.build()
      .then(() => console.log('Build complete!'))
  }

  let watcher = builder.watch();

  watcher.on('change', () => console.log('REBUILDING'));
  watcher.on('error', (error) => console.log('Watcher error ', error));
  liveReload(watcher);

  return watcher.then(() => console.log('Initial build complete!'));
}

function startServer() {
  // TODO: In prod, require startServer directly.
  const nodemon = require('nodemon');
  const nmConfig = require('./config/nodemon.json');

  nodemon(nmConfig)
    .on('restart', () => console.log('RESTARTING SERVER...'));
}
