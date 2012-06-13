var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

exec('npm install', {silent: true});

var o = exec('node make check').output;
if (!o.match(/^### Linting JS files\s### Linting CSS files\s$/)) {
  exit(1);
}

