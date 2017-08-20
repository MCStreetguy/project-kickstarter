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

    var output = fs.createWriteStream(path.join(config_dir,'blueprints',name+'.tar.gz'));
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

    var contents = fs.readdirSync(dir);
    contents.forEach(function(e) {
      if(fs.statSync(path.join(dir,e)).isDirectory()) {
        if(e != 'node_modules' && e != '.git') {
          archive.directory(path.join(dir,e),e);
        }
      } else {
        archive.file(path.join(dir,e),{name: e});
      }
    });
    archive.finalize();

  } else if(type == 'link' && process.argv.length > 1) {

    var name = process.argv.splice(0,1);
    var repo = process.argv.splice(0,1);
    fs.writeFileSync(path.join(config_dir,'git-links',name+'.link'),JSON.stringify({repo: repo}));
    _console.log('Linking successful. New git-link available: '+name);

  } else if(type == 'list') {

    var archives = fs.readdirSync(path.join(config_dir,'blueprints'));
    var links = fs.readdirSync(path.join(config_dir,'git-links'));
    if(archives.length+links.length > 0) {
      archives.forEach(function(e,i,a) {
        _console.log('(Blueprint) '+path.basename(e,'.tar.gz'));
      });
      links.forEach(function(e,i,a) {
        _console.log('(Git-link) '+path.basename(e,'.link'));
      });
    } else {
      _console.warn('No blueprints or links are available.');
    }

  } else if(type == 'remove' && process.argv.length > 0) {

    var name = process.argv.splice(0,1);
    var archives = fs.readdirSync(path.join(config_dir,'blueprints'));
    var links = fs.readdirSync(path.join(config_dir,'git-links'));
    if(archives.indexOf(name+'.tar.gz') >= 0) {
      util.ask('Are you sure to remove the blueprint '+name+'? (YES) ',function(input) {
        if(input.toUpperCase() == 'YES' || input.toUpperCase() == 'Y') {
          fs.unlinkSync(path.join(config_dir,'blueprints',name+'.tar.gz'));
          _console.log(name+' was successfully deleted.');
        }
        process.stdin.pause();
      });
    } else if(links.indexOf(name+'.link') >= 0) {
      util.ask('Are you sure to remove the link '+name+'? (YES) ',function(input) {
        if(input.toLowerCase() == 'yes' || input.toLowerCase() == 'y') {
          fs.unlinkSync(path.join(config_dir,'git-links',name+'.link'));
          _console.log(name+' was successfully deleted.');
        }
        process.stdin.pause();
      });
    } else {
      _console.warn('No blueprint or link could be found for you query: '+name);
    }

  } else {
    _console.err('Invalid params.');
  }
} else {
  _console.err('No Arguments specified.');
}
