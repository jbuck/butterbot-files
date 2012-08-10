var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

exec('npm install', {silent: true});
exec('git submodule update --init', {silent: true});

var o = exec('node make check').output;
if (!o.match(/^### Linting JS files\s### Linting CSS files\s### Linting HTML - requires network access\s$/)) {
  exit(1);
}

