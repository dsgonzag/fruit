const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('fruit.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(router);

server.listen(port);

<<<<<<< HEAD
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
  
=======
      app.use(bodyParser.json()); // for parsing application/json
      app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      
      app.use(express.static('public'));
      app.use(permitirCrossDomain);
      
      
      app.get('/', function(req, res){
        res.send('hello world');
      });

      app.get('/listFruits', (req, res, next) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('SELECT * FROM usuario', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
        
                client.end();
                return res.json(result.rows);
                
            });
        });
    });
    
    app.get('/listFruit/:id',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.params.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query('SELECT * FROM usuario WHERE id=' + id + ';', function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result.rows);
            
            });
            
        });
    });
    app.put('/updateFruit',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
    
            client.query("UPDATE frutas SET nombre_fruta='"+req.body.nombre_fruta+"',cantidad='"+req.body.cantidad+"' WHERE id='" + id + "';", function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    });
    app.post('/SaveFruit', (req, res) => {
        var client = new pg.Client(conString);
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
            
            console.log("miau "+util.inspect(req,false,null));
            
            client.query("INSERT INTO  frutas  (nombre_fruta, cantidad) VALUES ('"+req.body.nombre_fruta+"', '"+req.body.cantidad+"');", function(err, result) {
                if(err) {
                    return console.error('error running query', err);
                }
            
                //console.log(result);
                client.end();
                return res.json(result.rows);
                
            });
            
        });
    });
    app.delete('/deleteFruit',(req,res)=>{
        var client = new pg.Client(conString);
        var id=req.body.id;
    
        client.connect(function(err) {
            if(err) {
                return console.error('could not connect to postgres', err);
                return res.status(500).json({success: false, data: err});
            }
        
            client.query('DELETE FROM usuario WHERE id=' + id + ';', function(err, result) {
                
                if(err) {
                    return console.error('error running query', err);
                }
                
                //console.log(result);
                    client.end();
                return res.json(result);
            });
        });
    
    
    });
    
    app.listen(process.env.PORT || 8080, function(){console.log("the server is running");});
>>>>>>> 384f74f00515a042c3238bdb21eb608efc832700
