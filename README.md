# ExpressJs guide from Tutorialspoint

ExpressJs introductory concepts from the tutorialspoint website

## Concepts

### NPM
NPM or node package manager used as a source of packages for javascript development.

NPMs can be installed globally or locally.

```sh
Global
npm install -g <package-name>
```
```sh
Local
npm install --save <package-name>
```

Local installations will include the NPM package as a dependency inside a JSON file.

### Routing
```sh
app.method(path, handler)
```

Html methods can be used in the method field.
```sh
Get
Post
Put
Delete
```

For path, it is up to the user to create a path name. This can be used to access pages on a web app.

### URL Building
Paths preceded by a ':' can be used as params within a page.
```sh
app.get('/:id', function (req, res) {
res.send('The id you specified is ' + req.params.id);
});
```

### Middleware
These are simply functions that make use of request(req), response(res), and next.

It is important to note that middleware run in the order in which they are written or included in the file.

There are also third party middleware which can be used by installing and requiring:
```sh
Install
npm install --save body-parser
```

```sh
Require
var bodyParser = require('body-parser');
```

### Templating
Using the PUG engine to create and render html with ease. PUG uses syntax that is easier for developers to write.

Developers can also create a custom 'views' folder to store PUG files to be rendered in pages.

```sh
app.set('view engine', 'pug');
app.set('views', './views');
```

```sh
Rendering:
app.get('/view', function(req, res) {
  res.render('nameofPUGfile')
});
```

Values can also be passed through this:
```sh
app.get('/view', function(req, res) {
  res.render('nameofPUGfile' {
    name: "TutorialsPoint"
    url:"http://www.tutorialspoint.com"
  });
});
```

Sample of PUG syntax to grab passed values
```sh
html
    head
        title=name
    body
        h1=name
        a(href = url) URL
```

Sample of  includeing PUG in html

```sh
html
    head
        title Simple template
    body
        include ./header.pug
```

### Static Files
Static files are files that clients download as they are from the server.
This is enabled by creating a folder for static files
```sh
app.use(express.static('public'));
```

With this, urls within the "src" attribute will search the public folder for static files.

Multiple static directories can also be created. It would be useful for developers to make use of virtual path prefixes to make it easier for computers to search static file directories

```sh
app.use('/static', express.static('public'));
```

Src attributes should now include this prefix before the filename

```sh
src = "/static/main.js"
```

### Processing form data
Two types of form data need to be taken into account. One is url-encoded data which is a data submitted through HTML forms. The other is multipart/form data such as pictures and files.

In order for ExpressJS to read these data the use of the following middleware is necessary:

body-parser for url-encoded data
multer for multipart/form data

```sh
Requiring body-parse and multer
var bodyParser = require('body-parse');
var multer = require('multer');
var upload = multer();
```

```sh
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for url-encoded data
app.use(upload.array()); //for parsing multipart/form-data
```

### Database
The tutorial introduces a popular NOSQL database called mongodb. It stores JSON files. Interacting with mongodb through express can be made easier by using a module called mongoose.

It can be required by:
```sh
// for document modeling using mongoose
var mongoose = require('mongoose');
// connect app to my_db mongo database
mongoose.connect('mongodb://localhost/my_db', {
  useMongoClient: true,
});
```

Mongoose allows the creation of schemas when creating an object model

```sh
// creating a schema for a model named person
var personSchema = mongoose.Schema({
  name: String,
  age: Number,
  nationality: String
});
// creation of model
var Person = mongoose.model("Person", personSchema);
```

### CRUD
```sh
Create = use .save(callback)
  app.post('/person', function(req,res) {
    newPerson.save(function(err, Person)
  });
Post = use .find(conditions, callback)
  app.get('/people', function(req, res){
   Person.find(function(err, response){
      res.json(response);
   });
  });
Update = use .update(conditions, updates, callback)
  app.put('/people/:id', function(req, res){
    Person.update({age: 25}, {nationality: "American"}, function(err, response){console.log(response);
    });
  });
Delete = use .remove(condition, [callback])
  app.delete('/people/:id', function(req, res){
    Person.remove({age:20});
  });
```
