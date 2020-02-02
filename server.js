const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('fruit.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);

// Cargar modulos y crear nueva aplicacion
var express = require("express"); 
var cors = require('cors')
var app = express();
app.use(cors())
 
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
 
//GetAll
//Ejemplo: GET http://localhost:8080/item
app.get('/frutas', function(req, res, next) {
  if(req.query.filter) {
   next();
   return;
  }
  res.send('Get all');
  console.log('Get all');
});
 
//GetById
//Ejemplo: GET http://localhost:8080/item/10
app.get('/frutas/:id', function(req, res, next) {
  var id = req.params.id;
  res.send('Get ' + req.params.id);
  console.log('Get ' + req.params.id);
});
 
//GetFiltered
//Ejemplo: GET http://localhost:8080/item?filter=ABC
app.get('/frutas', function(req, res) {
  var filter = req.query.filter;
  res.send('Get filter ' + filter);
  console.log('Get filter ' + filter);
});
 
//Create
//Ejemplo: POST http://localhost:8080/item
app.post('/frutas', function(req, res) {
   var data = req.body.data;
   res.send('Add ' + data);
   console.log('Add ' + data);
});
 
//Replace
//Ejemplo: PUT http://localhost:8080/item/10
app.put('/frutas/:id', function(req, res) {
   var id = req.params.id;
   var data = req.body.data;
   res.send('Replace ' + id + ' with ' + data);
   console.log('Replace ' + id + ' with ' + data);
});
 
//Update
//Ejemplo: PATCH http://localhost:8080/item/10
app.patch('/frutas/:id', function(req, res) {
   var id = req.params.id;
   var data = req.body.data;
   res.send('Update ' + id + ' with ' + data);
   console.log('Update ' + id + ' with ' + data);
});
 
//Delete
//Ejemplo: DEL http://localhost:8080/items
app.delete('/frutas/:id', function(req, res) {
   var id = req.params.id;
   res.send('Delete ' + id);
   console.log('Delete ' + id);
});
  
