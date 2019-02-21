const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// define location of static files
app.use(express.static('public'));

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

// Endpoint for requesting trailers for a particular movie
// movieId is currently the mc_slug value 
// app.get('/api/movies/:movie_slug/trailers', (req, res) => {
//   Movies.find({ mc_slug: req.params.movie_slug })
//     .then(data => res.json(data));
// });


const PORT = 3336;

app.listen(PORT, function() {
  console.log(`Proxy Server listening on port ${PORT}`);
});