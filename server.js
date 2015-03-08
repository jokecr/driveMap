var fs = require('fs'),
  path = require('path'),
  async = require('async'),
  db = require('diskdb'),
  express = require('express'),
  expressHbs = require('express-handlebars'),
  sprintf = require('sprintf-js')
  .sprintf,
  _ = require('underscore'),
  md5 = require('MD5'),
  armrest = require('armrest');
var vosApi = armrest.client('http://10.1.5.37:8087');
var app = express();
// var httpProxy = require('http-proxy');
// var proxy = httpProxy.createProxyServer();
db = db.connect(path.join(__dirname, 'data'));
app.engine('hbs', expressHbs({
  extname: 'hbs'
}));
app.set('view engine', 'hbs');
app.get('/driveMap', init);
app.use(express.static(__dirname));
var server = app.listen(8089, function() {
  var host = server.address()
    .address;
  var port = server.address()
    .port;
  console.log('Example app listening at http://%s:%s', host, port);
});
server.on('error', function() {
  console.log(arguments);
});

function init(req, res) {
  res.render('index', req.params);
}

function request(req, res) {
  var found = [],
    hash = md5(req.url.toLowerCase());
  db.loadCollections([hash]);
  found = db[hash].find();
  if (found && found.length) {
    // console.log('return cache found ', found);
    res.send(found);
  }
  //TODO: Rate limit this by url hash
  vosApi.get({
    url: 'api/driveMap/' + req.params.episodeId + '/' + _.last(req.url.split('/')),
    success: function(data) {
      if (!res.headersSent) {
        res.send(data);
      } else {
        console.log('You have the cache already');
      }
      console.log('Save cache %s %s %d', hash, req.url, data.length);
      db[hash].remove();
      db.loadCollections([hash]);
      db[hash].save(data);
      return;
    }
  });
}