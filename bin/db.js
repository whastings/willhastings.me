#!/usr/bin/env node

const command = process.argv[2];

require('../lib/initEnv')();
require(`../server/db/${command}`);
