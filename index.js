var express = require('express');
var app = express();



//for rendering pug templates
app.set('view engine', 'pug');
app.set('views', './views');

// for creating static files
app.use(express.static('public')); //public folder will now be searched for src
app.use('/static', express.static('public2')); // path prefexing to distinguish between multiple directories


var things = require('./things.js');
app.use('/things', things);

app.get('/things/:id([0-9]{5})', function(req, res) {
  res.send('id: ' + req.params.id);
});

app.get('/first_template', function(req, res) {
  res.render('first_view');
});

app.get('/dynamic_view', function(req, res) {
  res.render('dynamic', {
    name: "TutorialsPoint",
    url:"http://www.tutorialspoint.com"
  });
});

app.get('/components', function(req, res) {
  res.render('content');
});

app.get('*', function(req, res) {
  res.send('Sorry, this is an invalid URL.');
});
app.listen(3000);
console.log('port 3000!');
