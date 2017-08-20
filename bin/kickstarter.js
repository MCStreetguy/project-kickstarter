#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path')
const _console = require('./logger.js');
const archiver = require('archiver');
const current_dir = process.cwd();
const config_dir = path.join(os.homedir(),'.kickstarter');
const util = require('./util.js');
util.mkdir(config_dir);
util.mkdir(path.join(config_dir,'blueprints'));
util.mkdir(path.join(config_dir,'git-links'));

process.argv.splice(0,2);
if(process.argv.length > 0) {
  var type = process.argv.splice(0,1);
  _console.log(type);
  if(type == 'trace' && process.argv.length > 0) {

    var name = process.argv.splice(0,1);
    if(process.argv.length > 0) {
      var dir = process.argv.splice(0,1);
      if(!path.isAbsolute(dir)) {
        dir = path.join(process.cwd(),dir);
      }
    } else {
      var dir = process.cwd();
    }

    var temp2 = path.join(config_dir,'blueprints',name+'.tar.gz');
    _console.log(temp2);
    var output = fs.createWriteStream(temp2);
    var archive = archiver('tar',{
      gzip: true,
      zlib: {level: 9}
    });
    output.on('close',function() {
      _console.log('Tracing successful. New blueprint available: '+name);
    });
    archive.on('warning',function(err) {
      throw err;
    });
    archive.on('error',function(err) {
      throw err;
    });
    archive.pipe(output);

    var contents = util.readDirRecursive(dir);
    _console.log(contents);

  } else if(type == 'link') {
    _console.log('TODO: Add code for linking a git repo');
  } else if(type == 'list') {
    _console.log('TODO: Add code for listing all blueprints');
  } else if(type == 'remove') {
    _console.log('TODO: Add code for removing a blueprint');
  } else {
    _console.err('Invalid params.');
  }
} else {
  _console.err('No Arguments specified.');
}
