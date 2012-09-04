var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

exec('npm install', {silent: true});
exec('git submodule update --init', {silent: true});
var o = exec('node make check').output;

// Unless we get any console spew, and therefore an error,
// this run passed.
if (o === "") {
  exit(1);
}
