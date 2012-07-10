var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');
var querystring = require('querystring');
var http = require('http');

var postData = querystring.stringify({
  commitId: botio.head_sha,
  url: botio.head_url,
  branch: botio.head_ref
});

var postOptions = {
  host: 'norway.proximity.on.ca',
  port: 80,
  path: '/content/receive.php',
  method: 'POST',
  headers: {
    'Content-Type': 'Application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};

var postRequest = http.request( postOptions, function( result ) {
  result.setEncoding( 'utf8' );
  result.on( 'data', function( chunk ) {
    botio.message( chunk );
    exit(0);
  });
});

postRequest.write( postData );
postRequest.end();

