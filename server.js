var express = require('express');
var engine = require('ejs-locals');
var error = require('./app/util/error');
var fs = require('fs');
var app = express();
var controllers = require('controllers-js')();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.use(require('compression')());
app.use(require('body-parser')());
app.use(require('method-override')());
app.use('/', express.static(__dirname + '/public'));
app.use(controllers);
app.use(error.logErrors);
app.use(error.clientErrorHandler);
app.use(error.errorHandler);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Listening on port ' + port);
