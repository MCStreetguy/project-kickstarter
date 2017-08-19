var prefix = '[Kickstarter] ';

exports.log = function(data) {
  var date = new Date();
  console.log(prefix+data);
}

exports.warn = function(data) {
  var date = new Date();
  console.warn(prefix+data);
}

exports.err = function(data) {
  var date = new Date();
  console.error(prefix+data);
}
