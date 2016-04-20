var spawn = require('child_process').spawn;
var split = require('split')

var systemInfo = function (then) {
  var ret = {
    name:     "",
    version:  ""
  }
  var child = spawn('cmd.exe', ['/c', 'systeminfo'])
  child.stdout
  .pipe(split(/\r\n/))
  .on('data', function (d){
    if (d.toString().match(/^OS Name/i)) {
      ret.name = d.toString().match(/^OS Name:\s+(.+)/i)[1]
    } else if (d.toString().match(/^OS Version/i)) {
      ret.version = d.toString().match(/^OS Version:\s+([0-9.]+)/i)[1]
    }
  })
  child.on('exit', function () {
    then(null, ret);
  })
  child.on('error', function (err) {
    then(err)
  })
}

var ver = function (then) {
  var ret = {
    name:     "",
    version:  ""
  }
  var child = spawn('cmd.exe', ['/c', 'ver'])
  child.stdout
  .pipe(split(/\r\n/))
  .on('data', function (d){
    if (d.toString().match(/^Mic[^\[]+[\[]version\s([0-9.]+)[\]]/i)) {
      ret.name = d.toString().match(/^([^\[]+)/i)[1].replace(/\s+$/, '')
      ret.version = d.toString().match(/^Mic[^\[]+[\[]version\s([0-9.]+)[\]]/i)[1]
      // let s do some patch, when +/- possible
      if (!ret.name.match(/\s(xp|vista|2000)/)) {
        if (ret.version.match(/^5[.]0/))      ret.name = 'Windows 2000'
        else if (ret.version.match(/^5[.]1/)) ret.name = 'Windows XP'
        else if (ret.version.match(/^6[.]0/)) ret.name = 'Windows Vista'
      }
    }
  })
  child.on('exit', function () {
    then(null, ret);
  })
  child.on('error', function (err) {
    then(err)
  })
}

var whichwin = function (then) {
  var ret = {
    name:     "",
    version:  ""
  }
  return ver(then);
  systemInfo(function(err, ret) {
    if (err) return ver(then)
    then(err, ret)
  })
}

module.exports = whichwin;
