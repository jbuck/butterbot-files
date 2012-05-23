var botio = require(process.env['BOTIO_MODULE']),
    fs = require('fs');
require('shelljs/global');

// Search for a server already previewing the pull request and stop it
var key = 'pr' + botio.issue + '.butyr.org';
console.log("Current proxy configuration (looking for " + key + "):");
var config = JSON.parse(exec('configurator list').output);
if (config[key]) {
  var port = config[key].match(/:(\d+)$/)[1];
  var pid = exec("lsof -i :" + port + " | grep node").output.split(/\s+/, 2);
  if (pid && pid.length == 2) {
    pid = pid[1];
    exec('kill ' + pid);
  }

  exec('configurator remove ' + key);
}
