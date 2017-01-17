var express = require('express');
var path = require('path');
var app = express();

// Define the port to run on
app.set('port', 8081);


app.use(express.static(path.join(__dirname, './')), function(req, res, next) {
	console.log("["+req.connection.remoteAddress+"]");
	next();
});


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});