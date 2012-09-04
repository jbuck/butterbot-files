var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

exec('npm install', {silent: true});
exec('git submodule update --init', {silent: true});

var expectedOutput = "### Linting JS files\n" +
                     "### Building CSS using LESS for css/butter.ui.less (without compression)\n" +
                     "### Building CSS using LESS for css/transitions.less (without compression)\n" + 
                     "### Building CSS using LESS for css/embed.less (without compression)\n" +
                     "### Building CSS using LESS for css/embed-shell.less (without compression)\n" + 
                     "### Linting CSS files\n" +
                     "### Linting HTML - requires network access\n\n";

var o = exec('node make check').output;
if (o === expectedOutput) {
  exit(1);
}

