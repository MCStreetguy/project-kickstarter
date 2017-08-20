#!/usr/bin/env node

const fs = require('fs');
const os = require('os');
const path = require('path')
const _console = require('./logger.js');
const targz = require('targz');
const git_clone = require('git-clone');
const current_dir = process.cwd();
const config_dir = path.join(os.homedir(),'.kickstarter');
const util = require('./util.js');
util.mkdir(config_dir);
util.mkdir(path.join(config_dir,'blueprints'));
util.mkdir(path.join(config_dir,'git-links'));

process.argv.splice(0,2);
if(process.argv.length > 0) {

  var name = process.argv.splice(0,1).toString();
  if(process.argv.length > 0) {
    var dir = process.argv.splice(0,1).toString();
    if(!path.isAbsolute(dir)) {
      dir = path.join(process.cwd(),dir);
    }
  } else {
    var dir = process.cwd();
  }

  var archives = fs.readdirSync(path.join(config_dir,'blueprints'));
  var links = fs.readdirSync(path.join(config_dir,'git-links'));
  if(archives.indexOf(name+'.tar.gz') >= 0) {

    targz.decompress({
      src: path.join(config_dir,'blueprints',name+'.tar.gz'),
      dest: dir,
      gz: {
        level: 9
      }
    }, function(err) {
      if(err) {
        _console.err(err);
      } else {
        _console.log('Wroom Wroooom. Project has been kickstarted and is ready to go ;)');
      }
    });

  } else if(links.indexOf(name+'.link') >= 0) {

    var repo = JSON.parse(fs.readFileSync(path.join(config_dir,'git-links',name+'.link'))).repo;
    try {
      git_clone(repo, dir, function(err) {
        _console.log('Wroom Wroooom. Project has been kickstarted and is ready to go ;)');
      });
    } catch (e) {
      _console.err('Something went wrong while cloning your repo: '+repo);
    }

  } else {

    _console.warn('No blueprints or links are available.');

  }

} else {
  _console.err('No blueprint or link specified.');
}
