var express = require('express');
//for parsing url-encoded data(HTML forms)
var bodyParser = require('body-parser');
//for parsing multipart/form-data(files)
var multer = require('multer');
var upload = multer();
var app = express();
// for document modeling using mongoose
var mongoose = require('mongoose');
// connect app to my_db mongo database
mongoose.connect('mongodb://localhost/my_db', {
  useMongoClient: true,
});
// cookie-parser
var cookieParser = require('cookie-parser');
// sessions
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

//for rendering pug templates
app.set('view engine', 'pug');
app.set('views', './views');

//for parsing application/json
app.use(bodyParser.json());

//for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//for parsing multipart/form-data
app.use(upload.array());

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.cookie('name', 'express', {maxAge: 360000}); //sets name =
  res.render('form');
  console.log('Cookies: ', req.cookies);
});

/* app.post('/', function(req, res) {
  console.log(req.body);
  res.send("received your request!");
}); */

// creating a schema for a model named person
var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});

// creation of model
var Person = mongoose.model("Person", personSchema);

app.get('/person', function(req, res){
   res.render('person');
});

app.post('/person', function(req, res){
   var personInfo = req.body; //Get the parsed information

   if(!personInfo.name || !personInfo.age || !personInfo.nationality){
      res.render('show_message', {
         message: "Sorry, you provided wrong info", type: "error"});
   } else {
      var newPerson = new Person({
         name: personInfo.name,
         age: personInfo.age,
         nationality: personInfo.nationality
      });

      newPerson.save(function(err, Person){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
   }
});

// for creating static files
//app.use(express.static('public')); //public folder will now be searched for src
//app.use('/static', express.static('public2')); // path prefexing to distinguish between multiple directories

//using modules example
var things = require('./things.js');
app.use('/things', things);

app.get('/things/:id([0-9]{5})', function(req, res) {
  res.send('id: ' + req.params.id);
});

//using templates examples
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
