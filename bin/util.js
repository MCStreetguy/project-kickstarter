exports.mkdir = function(dir) {
  try {
    fs.statSync(dir);
  } catch(e) {
    fs.mkdirSync(dir);
  }
}

exports.readDirRecursive = function(dir) {
  var fs = fs || require('fs');
  var path = path || require('path');
  var files = fs.readdirSync(dir);
  filelist = [];
  files.forEach(function(file) {
    if(fs.statSync(path.join(dir,file)).isDirectory()) {
      filelist.concat(readDirRecursive(path.join(dir,file)));
    } else {
      filelist.push(path.join(dir,file));
    }
  });
  return filelist;
}
