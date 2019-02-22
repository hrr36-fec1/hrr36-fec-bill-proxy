const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// define location of static files
app.use(express.static('public'));

// app.all('/*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
//   });

app.use(function(req, res, next) {
  // allow CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Request for trailers. Route to Trailer's Server
app.get('/api/movies/:movie_slug/trailers', function(req,res) {
  console.log('routing movie trailer request');
  //modify the url in any way you want
  var newurl = `http://localhost:3333/api/movies/${req.params.movie_slug}/trailers`;
  console.log(newurl);
  request(newurl).pipe(res);
});

// Request for reviews. Route to Reviewss Server
app.get('/api/movies/:movieId/reviews', function(req,res) {
  console.log('routing movie reviews request');
  //modify the url in any way you want
  var newurl = `http://localhost:4444/api/movies/${req.params.movieId}/reviews`;
  console.log(newurl);
  request(newurl).pipe(res);
});

// Request for banner info. Route to Banner's Server
app.get('/api/movies/banner', function (req, res) {
  console.log('routing movie banner request');
  var newurl = `http://localhost:8082/api/movies/banner`;
  console.log(newurl);
  request(newurl).pipe(res);
});

// Request for banner info. Route to Details's Server
app.get('/api/movies/details/jurassic-park', function (req, res) {
  console.log('routing movie details request - jp');
  var newurl = `http://localhost:3002/api/movies/details/jurassic-park`;
  console.log(newurl);
  request(newurl).pipe(res);
});

app.get('/api/movies/details', function (req, res) {
  console.log('routing movie details request');
  var newurl = `http://localhost:3002/api/movies/details`;
  console.log(newurl);
  request(newurl).pipe(res);
});


const PORT = 3336;

app.listen(PORT, function() {
  console.log(`Proxy Server listening on port ${PORT}`);
});