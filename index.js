var babelConfig = require('./config/babel-node'),
    dotenv = require('dotenv'),
    path = require('path');

dotenv.config();
// Process all further dependencies through Babel.
require('babel-core/register')(babelConfig);

var command = process.argv[2] || 'start';

if (command === 'start') {
  require('./start');
} else if (command === 'repl') {
  require('./lib/repl');
} else if (command.startsWith('db')) {
  command = command.split(':')[1];
  require(`./server/db/${command}`);
} else {
  console.log('Command not supported.');
}
