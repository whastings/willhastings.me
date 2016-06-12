const Builder = require('./lib/build/Builder');

// Run initial build.
let builder = new Builder();
builder.run()
  .then(() => console.log('Build complete!'))
  .then(startServer)
  .then(() => console.log(`Server started`))
  .catch((error) => console.log(`Error starting: ${error}`));

function startServer() {
  // TODO: In prod, require startServer directly.
  const nodemon = require('nodemon');
  const nmConfig = require('./config/nodemon.json');

  nodemon(nmConfig)
    .on('restart', () => console.log('RESTARTING SERVER...'));
}
