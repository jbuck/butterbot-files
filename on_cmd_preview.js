var botio = require(process.env['BOTIO_MODULE']),
    fs = require('fs');
require('shelljs/global');

// Install dependencies, update submodules, and store in a non-temporary directory
exec('npm install', {silent: true});
exec('git submodule update --init', {silent: true});
exec('rsync -a --exclude=".git" . '+ botio.public_dir);

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
}

// Start the server asynchronously
cd(botio.public_dir);
cd('cornfield');
exec('PORT=0 nohup node app.js < /dev/null > nohup.out 2>&1 &');

// Check to see if the server started successfully
// If it did, then set up a url for it
setTimeout(function() {
  var output = fs.readFileSync('nohup.out', 'utf8');
  var m = output.match(/HTTP Server started on http:\/\/localhost:(\d+)/);
  if (!m) {
    botio.message('Server failed to start');
    exit(1);
  }
  
  var port = m[1];
  exec('configurator add pr' + botio.issue + '.butyr.org=localhost:' + port);
  botio.message('Server is running on http://pr' + botio.issue + '.butyr.org');
  exit(0);
}, 2000);
