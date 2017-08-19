#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path')
const _console = require('./logger.js');
const current_dir = process.cwd();
const config_dir = path.join(os.homedir(),'.kickstarter');

try {
  fs.statSync(config_dir);
} catch(e) {
  fs.mkdirSync(config_dir);
}

if(!fs.existsSync(path.join(config_dir,'config.json'))) {
  fs.writeFileSync(path.join(config_dir,'config.json'),fs.readFileSync(path.join(__dirname,'..','conf','default.json')));
}
const config = JSON.parse(fs.readFileSync(path.join(config_dir,'config.json')));

_console.log('TODO: everything..');
