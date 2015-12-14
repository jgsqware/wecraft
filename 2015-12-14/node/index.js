var express = require('express'),
    http = require('http'),
    redis = require('redis'),
    path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));

// Using host entries created by Docker in /etc/hosts (RECOMMENDED)
var client = redis.createClient('6379', 'db');

app.get('/',function(req,res){
  client.incr('counter', function(err, counter) {
     if(err) return next(err);
    res.send('<!DOCTYPE html> <html lang="en"> <head> <meta charset="utf-8"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>WeCraft and Devops - DockerCon EU 2015 & 1.9</title> <meta name="description" content="Source code generated using layoutit.com"> <meta name="author" content="LayoutIt!"> <link href="css/bootstrap.min.css" rel="stylesheet"> <link href="css/style.css" rel="stylesheet"> </head> <body> <div class="container-fluid"> <div class="row"> <div class="col-md-12"> <h3 class="text-center"> This page has been viewed ' + counter + ' times! </h3> <p class="text-center"> <iframe src="//giphy.com/embed/QOMIDxwVWZHWM" width="480" height="253" frameBorder="0" class="giphy-embed" allowFullScreen></iframe> </p> </div> </div> </div> <script src="js/jquery.min.js"></script> <script src="js/bootstrap.min.js"></script> <script src="js/scripts.js"></script> </body> </html>');
  })
});

// app.get('/', function(req, res, next) {
//   client.incr('counter', function(err, counter) {
//     if(err) return next(err);
//     //res.send('This page has been viewed ' + counter + ' times </br></br>!');
//     


http.createServer(app).listen(process.env.PORT || 8080, function() {
  console.log('Listening on port ' + (process.env.PORT || 8080));
});