exports.mkdir = function(dir) {
  var fs = fs || require('fs');
  try {
    fs.statSync(dir);
  } catch(e) {
    fs.mkdirSync(dir);
  }
}

var readDirRecursive = function(dir) {
  var fs = fs || require('fs');
  var path = path || require('path');
  var files = fs.readdirSync(dir);
  filelist = [];
  files.forEach(function(file) {
    if(fs.statSync(path.join(dir,file)).isDirectory()) {
      if(file != '.git' && file != 'node_modules') {
        filelist.concat(readDirRecursive(path.join(dir,file)));
        filelist.push(path.join(dir,file));
      }
    } else {
      filelist.push(path.join(dir,file));
    }
  });
  return filelist;
}
exports.readDirRecursive = readDirRecursive;
