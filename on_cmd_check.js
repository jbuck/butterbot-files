var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

exec('npm install', {silent: true});
botio.message("Checking " + botio.head_sha + " of pull request #" + botio.issue);
exec('node make check');
exec('node make package');
cp('-R', 'dist/', botio.public_dir);

