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
if(!config.hasOwnProperty('blueprints')) {
  config.blueprints = new Array();
}

process.argv.splice(0,2);
if(process.argv.length > 0) {
  var type = process.argv.splice(0,1);
  _console.log(type);
  if(type === 'trace') {
    _console.log('TODO: Add code to create blueprint');
  } else if(type === 'list') {
    _console.log('TODO: Add code for listing all blueprints');
  } else if(type === 'remove') {
    _console.log('TODO: Add code for removing a blueprint');
  } else {
    _console.log('Invalid param.');
  }
} else {
  _console.err('No Arguments specified.');
}
